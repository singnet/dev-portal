# Stateless client with MPE
In this document we demonstrate that the client who communicate with SingularityNet services using MPE payment channels doesn't
require to store the state of the payment channel. He only need to store his Ethereum identity.  
 
1. The client can easily obtain the list of its payment channels (payment channels with "sender==client") from MPE (see EventChannelOpen). However, we need to take into account the situation in which the request to open the channel has been already sent, but not yet mined. It can happen when the client has sent this request and died ("lost" his state).
2. The client can ask the last state of the given payment channel from the server.
    * The server is not able to forge this state, because it was signed by the client (of course the client should check his own signature).
    * The server is obviously interested in saving and sending the last state, otherwise it loses money.

We have special grpc method in daemon which return state of the channel (https://github.com/singnet/snet-cli/blob/master/snet_cli/resources/proto/state_service.proto). Actually the client don't even need to use the special call to ask the server (=daemon) about the last state of the channel. The daemon could return the state of the channel in the response to any non-authorize call. 

The client receive the following information from the daemon
* current_nonce - current nonce of the payment channel
* current_signed_amount -  a last amount which were signed by client with current_nonce. If none messages was signed with the current_nonce then this value is empty byte string (b''), which we should interpret as 0.
* current_signature - a last signature sent by client with current_nonce it could be absent (empty string) if none message was signed with current nonce
* (not implemented yet) oldnonce_signed_amount - last amount which was signed by client with nonce=current_nonce - 1
* (not implemented yet) oldnonce_signature - last signature sent by client with nonce = current_nonce - 1

(It should be noted that two last values are not in the current version, and we need them only for calculate unspent_amount in the case then current_nonce != blockchain_nonce)

Here we should consider the difficult case, namely the situation in which the server starts close/reopen procedure for the channel.
The client doesn't need to wait (or recieve at all) confirmation from the blockchain, because it is not in the interest of the server to lie. But the server also doesn't need to wait the confirmation from the blockchain (if he makes sure that the request is mined before expiration of the channel).

Before considering all possible cases, let's define the following parameters
* blockchain_nonce - nonce of the channel in the blockchain
* blockchain_value - value of the channel in the blockchain

We also assume that the daemon starts close/reopen procedure only after previous channelClaim request was mined.
It means that the current_nonce, at maximum, one point ahead of blockchain_nonce. We can easily relax this assumption if necessary.   

In all cases we assume that client verify that it's own signature is authentic.  

In all cases we are interesting in two numbers:
* Next amount which has to be signed (next_signed_amount), taking into account the price for the current call (price). This value can be easily calculated, is we interpret current_signed_amount = b'' as 0.
    * next_signed_amount = current_signed_amount + price
* The amount of tokens which haven't been already spent (unspent_amount). 

#### Simple case current_nonce == blockchain_nonce
* unspent_amount = blockchain_value - current_signed_amount 

#### Difficulate case current_nonce != blockchain_nonce
Taking into account our assumption we know that current_nonce = blockchain_nonce + 1.
* unspent_amount = blockchain_value - oldnonce_signed_amount - current_signed_amount

It should be noted that in this case server could send us smaller "oldnonce_signed_amount" (not the actually last one which was used for channelClaim). But in this case server can only make us believe that we have more money in the channel then we actually have. But only one possible attack via "unspent_amount" is actually make us believe that we have less money which we actually have and reject future calls (or force us call channelAddFunds).

