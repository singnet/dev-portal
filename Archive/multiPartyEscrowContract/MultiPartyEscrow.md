# MultiPartyEscrow contract
### Overview
- [Introduction](#Introduction)
- [Stateless Client](MultiPartyEscrow_stateless_client.md)

### Introduction

The MultiPartyEscrow contract (hereafter MPE) have two main functionalities:

1. Very simple wallet with deposit and withdraw functions. Everybody can deposit AGI
tokens into MPE, via deposit function, and everybody can withdraw
their funds (which have not been escrowed at the moment).
2. The set of the simple ("atomic") unidirectional payment channels
between clients and services providers and functions for manipulation
of these channels. 


### Atomic unidirectional payment channel

You can skip this section if you are familiar with the concept of payment channels.

 The main logical building block of MPE is a simple ("atomic")
unidirectional payment channel. You can find the implementation of
escrow contract for such a channel in
[SimpleEscrow.sol](https://github.com/astroseger/escrow_contracts/blob/master/contracts/SimpleEscrow.sol).

The main logic is following. 

* The sender creates escrow contract with given expiration date and he funds it with
  desired amount of tokens.
* Each time the sender needs to send a small amount of tokens to
  the recipient he
  sends (to the recipient) the signed authorization to close the channel and
  take from the channel the commutative amount of the tokens which are due.
* The recipient must check that authorization is correctly signed and
  that the amount is correct, and that this amount is not exceed the funds being
  escrowed. 
* The recipient can close the channel at any moment by presenting a
  signed amount from the sender.  Of course it is better for recipient to
  close the channel with the last authorization (with highest amount).
  The recipient will be sent that amount, and the remainder will go back
  to the sender.
* The sender can close the channel after expiration date and take all
  funds back.
* The sender can extend the expiration date and add funds to the contract at any moments. 

### The set of channels and functions to manipulate them

##### PaymentChannel structure

Each "atomic" payment channel in MPE is represented by the following structure 

```Solidity
       //the full ID of "atomic" payment channel = "[this, channel_id, nonce]"
    struct PaymentChannel {
        address sender;      // The account sending payments.
        address recipient;   // The account receiving the payments.
        bytes32 groupId;     // id of group of replicas who share the same payment channel
                             // You should generate groupId randomly in order to prevent
                             // two PaymentChannel with the same [recipient, groupId]
        uint256 value;       // Total amount of tokens deposited to the channel. 
        uint256 nonce;       // "nonce" of the channel (by changing nonce we effectivly close the old channel ([this, channelId, oldNonce])
                             //  and open the new channel [this, channelId, newNonce])
                             //!!! nonce also prevents race conditon between channelClaim and channelExtendAndAddFunds 
        uint256 expiration;  // Timeout (in block numbers) in case the recipient never closes.
                             // if block.number > expiration then sender can call channelClaimTimeout
        address signer;     // signer on behalf of sender
   }

mapping (uint256 => PaymentChannel) public channels;

```

Comments are selfexplanatory, but few clarifications migth be useful. 

* The full ID of "atomic" payment channel is "[MPEContractAddress, channelId, nonce]". The MPEContractAdress is the address of MPE contract,
   which is needed to prevent the multi contracts attacks. channelId is a index in the channels mapping. nonce is a part of close/reopen logic.
* by changing the nonce we effectively close the old channel [MPEContractAddress, channelId, oldNonce]
  and open the new one [MPEContractAddress, channelId, newNonce]. More explanations will be given later.
* nonce also prevents race condition between between channelClaim and channelExtendAndAddFunds.
* The full ID of the recipient is [recipient_ethereum_address, groupId]. By doing this we allow service provider to use the
  same ethereum wallet for different replicas.

##### Functions 

The following function open the new "atomic" channel, assuming that the caller is the sender.

```Solidity
function openChannel(address  recipient, uint256 value, uint256 expiration, bytes32 groupId, address signer)
```

This function simply create new PaymentChannel structure and add it to the channels list.


By the following function the recipient can claim funds from the channel.

```Solidity
function channelClaim(uint256 channelId, uint256 amount, uint8 v, bytes32 r, bytes32 s, bool isSendback)
```

It should be noted that v,r,s are parts of the signature.
The recipent should present the signature for the following message [MPEContractAdress, channelId, nonce, amount].
It should be noted that [MPEContractAdress, channel_id, nonce] is the full ID of "atomic" channel. 

The recipient has two possibility:
* (is_sendback==true)  "close" the channel and send remainder back to the sender.
* (is_sendback==false) "close/reopen". We transfer the claimed amount to the recipient, but instead of sending remainder back to the sender we
  simple change the nonce of the channel. By doing this we close the old atomic channel [MPEContractAdress, channel_id, old_nonce] 
  and open the new one [MPEContractAdress, channel_id, new_nonce]


By the following functions the client can extend expiration time and he can add funds to the channel at any time.
He also can claim all funds from the channel after the expiration time reached.

```Solidity
function channelExtend(uint256 channel_id, uint256 new_expiration);
function channelAddFunds(uint256 channel_id, uint256 amount);
function channelExtendAndAddFunds(uint256 channel_id, uint256 new_expiration, uint256 amount);
function channelClaimTimeout(uint256 channel_id);
```

  
### Usercases 

#### Simple usercase 

Informal description:

* Client deposit tokens to the MPE. We could propose to everybody to use MPE as a wallet for all theirs AGI tokens
* Client select service provider.
* Client open with choosen payment group. 
* It should be noted that the client can send requests to any replica from the selected payment group (replicas in one payment groups should share state of the payment channel amoung them)
* Client starts to send requests to the replicas. With each call he send the signed authorization for the server to "withdraw" the commutative amount of the tokens which are due.
* At some point server can decide to close/reopen channel in order to fix the profit. At the next call from the client, the server should inform the client that 
that "nonce" of the channel has been changed (see [state-less logic](MultiPartyEscrow_stateless_client.md) ). 
* At some point the client can decide to extend expiration or/and escrow more funds.
* It should be noted that because of two previous items the channel can exist forever.

Formal example:

Let's assume that the price for one call is 1 AGI. Also we assume that server and client perform all required validations on each call. 
For example server check that signature is authentic, that amount is correct, that this amount doesn't exceed value of the channel, that expiration data is tolerable etc.
We assume that REPLICA1 is from payment group with groupId=group1


* CLIENT1 call: openChannel(recipient=SERVER1, value=10 AGI, expiration=expiration0, groupId=group1, signer=CLIENT1)
* MPE create the PaymentChanel: [channel_id = 0, sender=CLIENT1, recipient=SERVER1, groupId=group1, value=10 AGI, nonce=0, expiration=expiration0, signer=CLIENT1]
* MPE subtract 10 AGI from the balance of the CLIENT1 
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=1)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=2)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=3)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=4)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=5)
* Server desides to close/reopen the channel (fix the 5 AGI of the profit)
* SERVER1 call: channelClaim(channel_id = 0, amount=5, signature = SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=5), is_sendback=false)
* MPE add 5 AGI to the balance of SERVER1
* MPE change the nonce (nonce +=1) and value (value -= 5) in the PaymentChannel: [channel_id = 0, sender=CLIENT1, recipient=SERVER1, replicaId=REPLICA1, value=5 AGI, nonce=1, expiration=expiration0]  
* Client recieve information that channel has been reopen, and nonce has been changed (see [state-less logic](MultiPartyEscrow_stateless_client.md) )
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=1)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=2)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=3)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=4)
* Client decides to put more funds in the channel and extend it expiration datas.
* CLEINT1 calls channelExtendAndAddFunds(channel_id=0, new_expiration = now + 1day, amount=10 AGI)
* MPE change the value and expiration data in the PaymentChannel: [channel_id = 0, sender=CLIENT1, recipient=SERVER1, groupId=group1, value=15 AGI, nonce=1, expiration=expiration1, signer=CLIENT1]
* MPE subtract 10 AGI from the balance of the CLIENT1
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=5)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=6)
* .....
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=10)
* Server decides to close/reopen the channel (fix 10 AGI of profit)
* .....
* Client decides to put more funds in the channel and extend it expiration date.
* ....
* Server decides to close/reopen the channel 
* .... 
* This can goes forever
* If server decides to stop working with this client he could close the channel with channelClaim(...., is_sendback=true)
* If server fails to claim funds before timeout (for example he goes offline forever), then the client can claim all funds after the expiration date


### Remarks

* Service provider can use the same ethereum address for all payment goups or he can use different address. 
In any case, the daemons very rarely need to send on-chain transactions. It means, that we actually don't need to provide the demons with direct access to the private key. 
Instead it could be some centralized server to sign the transactions from the daemons (in some cases it even can be done in semi-manual manner by the service owner). We call such server a treasurer server.
* In the current implementation the client sign off-chain authorization messages with the "signer" private key. It means that the client don't necessary need to sign transaction with his ethereum identity, instead he can use another key pairs.
* Server do not need to wait the confirmation from the blockchain after he sends on-chain request to close/reopen the channel
  (channelClaim). He can inform the client that nonce of the channel have changed, and start accepting calls from the client with a new nonce. It can be shown that it is secure for both the client and the server, of course only if transaction is accepted by blockchain before expiration date of the channel. Similarly the client don't need to wait the confirmation from the blockchain after sending channelExtendAndAddFunds. It makes MPE functional even on very slow Ethereum network.  
* nonce in the channel prevent race condition between channelExtendAndAddFunds and channelClaim. If the client send channelExtendAndAddFunds request and at the same time the
server sends channelClaim request. Then, as have been said before, they can continue to work without receiving confirmation from blockchain. 
But it is also doesn't matter which request will be accepted first (because channelClaim only change the nonce, and not create new PaymentChannel structure).

