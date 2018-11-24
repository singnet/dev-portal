# MultiPartyEscrow contract

### Introduction

The MultiPartyEscrow contract (hereafter MPE) have two main functionalities:

1. Very simple wallet with deposit and withdraw functions. Everybody can deposit AGI
tokens into MPE, via deposit function, and everybody can withdraw
their funds (which have not been escrowed at the moment).
2. The set of the simple ("atomic") unidirectional payment channels
between clients and services providers and functions for manipulation
of these channels. 


### Atomic unidirectional payment channel

You can skip this section if you are familiar with it.

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
        address recipient;    // The account receiving the payments.
        uint256 replicaId;  // id of particular service replica
        uint256 value;       // Total amount of tokens deposited to the channel. 
        uint256 nonce;       // "nonce" of the channel (by changing nonce we effectivly close the old channel ([this, channel_id, old_nonce])
                             //  and open the new channel [this, channel_id, new_nonce])
                             // nonce also prevents race conditon between channel_claim and channel_extend_and_add_funds
        uint256 expiration;  // Timeout in case the recipient never closes.
    }

mapping (uint256 => PaymentChannel) public channels;

```

Comments are selfexplanatory, but few clarifications migth be useful. 

* The full ID of "atomic" payment channel is "[MPEContractAddress, channel_id, nonce]". The MPEContractAdress is the address of MPE contract,
   which is needed to prevent the multi contracts attacks. channel_id is a index in the channels mapping. nonce is a part of close/reopen logic.
* by changing nonce we effectively close the old channel [MPEContractAddress, channel_id, old_nonce]
  and open the new one [MPEContractAddress, channel_id, new_nonce]. More explanations will be given later.
* nonce also prevents race condition between between channel_claim and channel_extend_and_add_funds.
* The full ID of the recipient is [recipient_ethereum_address, replicaId]. By doing this we allow service provider to use the
  same ethereum wallet for different replicas.

##### Functions 

The following function open the new "atomic" channel, assuming that the caller is the sender.
```Solidity
function openChannel(address  recipient, uint256 value, uint256 expiration, uint256 replicaId)
```
This function simply create new PaymentChannel structure and add it to the channels list.

The following function open the channel from the recipient side.
```Solidity
function openChannelByRecipient(address  sender, uint256 value, uint256 expiration, uint256 replicaId, bytes memory signature)
```
The recipient should have the singed permission from the sender to open a channel. 
This permission contains the following message signed by the sender [MPEContractAdress, recipient_address, replicaId, value, expiration].
The recipient should receive this message from the sender off-chain. See usercases for details.

By the following function the recipient can claim funds from the channel.
```Solidity
function channelClaim(uint256 channel_id, uint256 amount, bytes memory signature, bool is_sendback) 
```
The recipent should present the following message, signed by the sender [MPEContractAdress, channel_id, nonce, amount].
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

* Client deposit tokens to the MPE. We could propose to everybody to use MPE as a wallet for all theirs AGI tokens (I would have proposed to discuss the possibility of creating AGI tokens via MPE, if they hadn't been already created).
* Client select service provider.
* Client open the payment channel with one of replicas from the chosen region. 
* It should be noted that the client can send requests to any replica from the selected region, not only to the replica with which he has the channel (after we implement state-sharing between replicas of the same region)
* Client starts to send requests to the replicas. With each call he send the signed authorization to take the commutative amount of the tokens which are due.
* At some point server can decide to close/reopen channel in order to fix the profit. At the next call from the client, the server should inform the client that the channel has been
closed/reopend (that "nonce" of the channel has been changed). Client can also obtain this information by listening events from the MPE. 
Of course, the client should reset "the commutative amount".
* At some point the client can decide to extend expiration data or/and escrow more funds.
* It should be noted that because of two previous items the channel can exist forever.

Formal example:

Let's assume that the price for one call is 1 AGI. Also we assume that server and client perform all required validations on each call. 
For example server check that signature is authentic, that amount is correct, that this amount doesn't exceed value of the channel, that expiration data is tolerable etc.



* CLIENT1 call: openChannel(server=SERVER1, replica=REPLICA1, value=10 AGI, expiration=expiratoin0)
* MPE create the PaymentChanel: [channel_id = 0, sender=CLIENT1, recipient=SERVER1, replicaId=REPLICA1, value=10 AGI, nonce=0, expiration=expiration0]
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
* Client recieve information that channel have been reopen (either from the server either from listening the events from the blockchain)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=1)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=2)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=3)
* CLIENT1 send to SERVER1/REPLICA1 authorization SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=4)
* Client decides to put more funds in the channel and extend it expiration datas.
* CLEINT1 calls channelExtendAndAddFunds(channel_id=0, new_expiration = now + 1day, amount=10 AGI)
* MPE change the value and expiration data in the PaymentChannel: [channel_id = 0, sender=CLIENT1, recipient=SERVER1, replicaId=REPLICA1, value=15 AGI, nonce=1, expiration=expiration1]
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


#### Open the channel from the service side

The channel can be opened from the server side. The server should obtain the singed authorization from the client to open the channel.
If everything is done in the "secure" manner (server waits the confirmation that the channel has been opened) 
then it is simply a way to force the server to pay the gas for the channel creation.  

formal example:

* CLIENT1 calls the SERVER1/REPLICA1 without creating the channel.
* SERVER1/REPLICA1 replay to the CLIENT1: "You are very welcome to proceed, but please allow me to open the payment channel for us".
* CLIENT1 sends (off-chain) the signed message SIGNED_BY_CLIENT(ContractAdress=MPEAdress, recipient=SERVER1, replicaId=REPLICA1, value=some_amount, expiration=some_expiration)
* SERVER1 calls: openChannelByRecipient(sender=CLIENT1, value=some_amount, expiration=some_expiration, replicaId=REPLICA1, signature = SIGNED_BY_CLIENT(ContractAdress=MPEAdress, recipient=SERVER1, replicaId=REPLICA1, value=some_amount, expiration=some_expiration))
* MPE create the PaymentChanel: [channel_id = 0, sender=CLIENT1, recipient=SERVER1, replicaId=REPLICA1, value="some_amount" AGI, nonce=0, expiration="some_expiration"]
* MPE subtract "some_amount" AGI from the balance of the CLIENT1
* SERVER1 wait conformation from the blockchain that channel was created
* usual workflow can be started now.
* ......

### Remarks

* Service provider can use the same ethereum address for all replicas or he can use different address. 
In any case, the replicas very rarely need to send on-chain transactions. It means, that we actually don't need to provide the demons with direct access to the private key. 
Instead it could be some centralized server to sign the transactions from the daemons (in some cases it even can be done in semi-manual manner by the service owner). 
* openChannelByRecipient it is simply a way to force the server to pay the gas for channel creation.
* By the similar technique we could force the server to pay the gas for channelExtendAndAddFunds  (extend the expiration date and add funds to the channel)
* In the current version the client sign off-chain authorization messages with the ethereum private key. It means that, unlike the server, the client should have access to the privet key almost constantly. We could easily change it by using different key for signing off-chain messages, but I don't think that we should, because signing with the ethereum private key makes MPE much more compact.
* Server do not need to wait the confirmation from the blockchain after he sends on-chain request to close/reopen the channel
  (after he fix the profit and ask MPE to change the nonce of the channel). He can inform the client that nonce of the channel have changed
  (that old atomic  channel have been closed and new atomic chanel have been opened). The server can start accepting calls from the client with a new nonce. It can be shown that it is secure for both the client and the server, if transaction is accepted by blockchain before expiration date of the channel. Similary the client don't need to wait the confirmation from the blockchain after sending channelExtendAndAddFunds. It makes MPE functional even on very slow Ethereum network.  
* nonce in the channel prevent race condition between channelExtendAndAddFunds and channelClaim. If the client send channelExtendAndAddFunds request and at the same time the
server sends channelClaim request. Then, as have been said before, they can continue to work without receiving confirmation from blockchain. 
But it is also doesn't matter which request will be accepted first (because channelClaim only change the nonce, and not create new PaymentChannel structure).

