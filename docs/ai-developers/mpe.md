---
# Page settings
layout: default
keywords: AI Consumers
comments: false

# Hero section
title: AI Consumers

# Micro navigation
micro_nav: true

---

## Introduction to MPE

An Escrow contract defines the conditional transaction between two transacting parties through an Escrow account. 
The Multi-party Escrow (MPE) smart contract API and the payment channel together enable payments in the SingularityNet platform with a minimal number of on-Blockchain interactions between AI Consumers and AI service providers.
 

The MPE contract has two main functionalities which includes:

1. A wallet with a deposit and withdraw function. 
2. A set of the simple (“atomic”) unidirectional payment channels between clients and service providers and support functions for controlling these channels.

    **Note:** Any one can deposit and withdraw their AGI tokens into a Multi-Party Escrow, (which have not been escrowed at the moment).


## What is Payment Channel?
Whenever the sender and the receiver enter into an contract, a channel is created on the Blockchain.
A [payment channel](http://super3.org/introduction-to-micropayment-channels/) is a tool that enables off-chain transactions between parties without the delay imposed by blockchain block formation and without compromising the transactional security.


## Atomic unidirectional payment channel
You can ignore this section, if you are familiar with the concept of payment channels.
The core logical building block of the Multi-Party Escrow is a simple (“Atomic”) unidirectional payment channel. To learn more about the details of how to implement the Escrow contract for unidirectional payment channel, click on this link [SimpleEscrow.sol](https://github.com/astroseger/escrow_contracts/blob/master/contracts/SimpleEscrow.sol) file here. 

It is understood that the payment channel is on the Blockchain. So, in order to prevent direct updating on the Blockchain regularly, the payment channel state is maintained in the storage.

Daemon maintains the channel state off chain as block operations involve gas cost and are slow between parties without imposing any delay by the blockchain block formation times and compromising on transactional security. 


Let us consider the simple unidirectional payment channel, the main logic is as follows:

1.	The sender creates an Escrow contract with a given expiration date, and funds it with a desired amount of tokens.
2.	The sender then needs to send a small amount of tokens to the recipient each time (to the recipient) with signed authorization
3.	The recipient must verify whether the signed authorization and the amount required is correct, and that amount specified does not exceed the funds being escrowed.
4.	The channel nonce is incremented, whenever a claim happens,
Actually, the channel is not closed and the task can still continue off line, but a new nonce need to be used.
5.	The sender can perform the following:
      - Can collect all funds remaining after the expiration date.
      <br>-or-
      - Extend the expiration date and add funds to the contract at any moment in time.

Note: The receiver can withdraw from the channel (same as claim) only using the authorized amount by the sender.  Whenever a signature is made on a certain format which should be signed by the private key of Kevin, Jack then verifies whether the signature was authentic to Kevin, based on the agreed format. 

## MPE Use cases

Consider the following 
- Jack  - is our Client  **Consumer**/**Buyer** 
- Kevin - is our Service **Provider**/**Seller**

If Jack is buying services from the Kevin, they both need to enter in to a formal agreement with each other.A channel is created.
**Note:** Each channel is unique to a combination of client identity (sender), service identity (recipient),Organization Id and the daemon group identity. 

1.	Jack deposits tokens to the Multi-Party Escrow account and uses this as a wallet for their AGI tokens.
2.	Jack creates and opens a Payment Channel. 
    **Note:** Jack is the sender of tokens and Kevin is the receiver of tokens. Every channel created has a unique ID, which begins from 0. 
3.	Jack funds the channel
    Kevin suggests Jack to deposit a bare amount ( cost of the service) and mentions that the amount can never been withdrawn for a predetermined period of time. This period is configurable. 
    Based on how much Jack wants to use a service , Jack deposits the amount in to the channel accordingly, so if the cost is 1 cog, and Jack needs to use it 10 times, he will deposit 10 cogs. Nonce is always zero when you create the channel for the first time.
    **Note:** Unless and until Jack authorises, the Kevin cannot withdraw the money.
    Jack and Kevin come in to agreement to perform operation Off chain. The daemon manages the off chain state of the channel. 
4.	Jack needs to authorize using the signature (using his private key to sign) to let Kevin withdraw
5.	Kevin verifies the following
    - Signature is authentic;
    - Amount of AGI tokens specified is correct (last Authorized Amount from Jack + Cost of the Service being called) ;
    - Amount does not exceed the value of the channel
    - Channel is not very close to expiring or has expired.
6.	Jack makes a call; Jack now sends the signed authorization to Kevin to “withdraw”. The effective balance is 1.
7.	Kevin can now make a claim with the amount authorized.
    **Note:** Nonce increments to 1, when claim is performed.
    
### State management of the channel 

1. Jack (Buyer) and Kevin (Service provider) enter into a contract for the first time, they create a channel details in the Blockchain is as follows: 

|Channel ID       | 1       |The channel ID created is 1 on Chain|
|---------------------|-------- |----------------------------------|
|**Nonce**            | 0       |Initially the Nonce is 0|
|**Full amount**      | 100 Cogs|Amount Jack has put into the channel is 100 Cogs|
|**Authorized Amount**|	0       |The Authorized amount is zero, because no services has been used for the first time.|
|**Signature**        |	Nil     |No signature is required to be sent.|


<br>
<br>

2. Jack makes a call and authorizes for 1 cog to Kevin, (assuming the cost of the service is 1 cog) ,the status of the channel is now maintained offchain by the storage mechanism used by Daemon :

|**Channel ID**       | 1       |The channel ID 1 is now updated off chain|
|-------------------- |-------- |----------------------------------|
|**Nonce**            | 0       |Initially the Nonce is 0|
|**Full amount**      | 100 Cogs|Amount Jack has put into the channel is 100 Cogs|
|**Authorized Amount**|	1       |The Authorized amount is zero.|
|**Signature**        |	1       |No signature is required to be sent.|

3.	Jack makes a call and authorizes for 2 cogs, to Kevin, now the status changes as follows:

|**Channel ID**       | 1       |The channel ID 1 is now updated off chain|
|---------------------|---------|----------------------------------|
|**Nonce**            | 0       |Initially the Nonce is 0|
|**Full amount**      | 100 Cogs|Amount Kevin has put into the channel is 100 Cogs|
|**Authorized Amount**|	2 Cogs  |The Authorized amount is two.|
|**Signature**        |	2 Cogs  |Signature is required for two.|

4.	Kevin makes a claim using the signature from Jack, this transaction is considered on-chain transaction.  please note the effective balance in Blockchain for this channel is now 98 and its nonce is 1,The same channel state is updated as follows even in the off chain state:

|**Channel ID**       | 1       |The channel ID created is 1|
|---------------------|---------|----------------------------------|
|**Nonce**            | 1       |Initially the Nonce was 0 but now it is 1|
|**Full amount**      | 98 Cogs|Amount signed by Jack was for two cogs. The full amount in in the channel is 98. This is the channel current balance in the channel after two cogs has been claimed and moved into Kevin’s account.|
|**Authorized Amount**|	0       |The Authorized amount is two.|
|**Signature**        |	0       |No signature is required to be sent|

**Note:** Claims are always on-chain transaction and the Nonce gets incremented when claims are made. 

The same process follows for future calls authorizations of cogs.

### Withdraw funds from the Channel
A new feature (simple, textbook solution) known as nonce has be incorporated. Each time the recipient claims through the channel, a nonce is added to the message that the sender signs, and the nonce periodically changes each time when the recipient makes a claim. The payment channels in the MPE includes the following properties:

Channel between sender and recipient can persist indefinitely. The sender can extend the expiration time and add funds to the channel. The recipient can claim the amount signed at any time before the expiration of the channel ideally , after the expiration, the sender can withdraw the funds anytime. You can jump directly to the thing you’d like to know more about, or use the navigation on each page to read through them in turn.
System continues to be operational for a longer period of time, even when the Ethereum network is congested and waiting for confirmation.
The likely scenario for such delayed response can be due to the following reason:

Neither the sender nor recipient needs any confirmation from the blockchain.
Kevin can continue to add funds, and Jack can continue to claim them in the channel, with no confirmation from the blockchain. For example, after Jack claims the funds and informs Kevin that the nonce of the channel has changed, and Jack can start sending messages with the new nonce. At this stage it appears safe for both the sender and the recipient. There is only one condition that applies: the recipient should make sure that the transaction is performed before the expiry time of the channel.
There is no race condition between claiming (from the recipient side) and extending or adding funds (from the sender side).
The parties can use these functions at any time, but the end result depends on the order in which these transactions took place.
When a user wants to call to a particular service, the user must ensure to open a channel, add sufficient funds, and set an expiry date, so that it would provide sufficient time for the user to consume the service.
Note: Each channel is unique to a combination of client identity (sender), service identity (recipient),Organization Id and the daemon group identity.

This combination allows daemons in the same group to share payment information through ETDC, reducing the liability on the number of open channels and benefiting clients.
   
### Postponing the Expiration Time of the Channel
With the following functions the client can postpone the expiration time of the channel and can add funds to the channel at any time and can also claim all funds from the channel after the expiration time is reached.

```
function channelExtend(uint256 channel_id, uint256 new_expiration);
function channelAddFunds(uint256 channel_id, uint256 amount);
function channelExtendAndAddFunds(uint256 channel_id, uint256 new_expiration, uint256 amount);
function channelClaimTimeout(uint256 channel_id);
```


### Claiming your funds back after Expiration 
The Sender can claim the funds after the expiry date
```
function channelClaimTimeout(uint256 channel_id);
```

## How the recipient Claims funds from the Channel
With the following function, the recipient can claim funds from the channel

ith the following function, the recipient can claim funds from the channel.

```
function channelClaim(uint256 channelId, uint256 amount, uint8 v, bytes32 r, bytes32 s, bool isSendback)
```

It should be noted that `v`, `r`, `s` are parts of the signature. The recipent should present the signature for the following message `[MPEContractAdress, channelId, nonce, amount]`. It should be noted that `[MPEContractAdress, channel_id, nonce]` is the full ID of the "atomic" channel.

The recipient has two possibilities:
* `(is_sendback==true)` - "close" the channel and send the remainder back to the sender.
* `(is_sendback==false)` - "close/reopen". We transfer the claimed amount to the recipient, but instead of sending the remainder back to the sender we simple change the nonce of the channel. By doing this we close the old atomic channel `[MPEContractAdress, channel_id, old_nonce]` and open the new one `[MPEContractAdress, channel_id, new_nonce]`.

## Remarks

* The service provider can use the same Ethereum address for all payment groups or she/he can use a different address. In any case, the daemons very rarely need to send an on-chain transaction. This means that we actually don't need to provide the daemons with direct access to the private key. Instead, a centralized server could sign the transactions from the daemons (in some cases it even can be done in semi-manual manner by the service owner). We call such a server a treasurer server.
* In the current implementation, the client signs off-chain authorization messages with the signer's private key. This means that the client doesn't necessarily need to sign transactions with his Ethereum identity. Instead, he can use other key pairs.
* The server does not need to wait for a confirmation from the blockchain after it sends on-chain requests to close/reopen channels (`channelClaim`). It can inform the client that the `nonce` of the channel has changed, and it can start accepting calls from the client with a new `nonce`. It can be shown that it is secure for both the client and the server if the transaction is accepted by the blockchain before the expiration date of the channel. Similarly, the client doesn't need to wait for a confirmation from the blockchain after sending the `channelExtendAndAddFunds` call. It makes the Multi-Party Escrow functional, even on a very slow Ethereum network.  
* The `nonce` in the channel prevents a race between the `channelExtendAndAddFunds` and `channelClaim`. If the client sends the `channelExtendAndAddFunds` request and at the same time the
server sends a `channelClaim` request, they can continue to work without receiving confirmation from the blockchain. In this case it also does not matter which request will be accepted first (as `channelClaim` can only change the `nonce`, and cannot create a new Payment Channel structure).

#MPE-stateless-client
This section describes how the client communicates with the SingularityNET services using the Multi-Party Escrow payment channels without storing state of the payment channel. 
The client needs to store the Ethereum identity as follows:
1.	The client obtains the list of payment channels (payment channels with "sender==client") from the Multi-Party Escrow (see EventChannelOpen). 
    Considering the situation in which the request to open the channel had been sent, but not yet mined. This can occur when the client request has not received any acknowledgement or the session is disconnected (it "lost" its state).
2.	The client requests the last state of the given payment channel from the server
    
 - The server can never duplicate the state of the payment channel signed by the client (off course the client should check its own signature).
 - The server saves and sends the last state, otherwise the money lost.
 
 **Note:** A unique gRPC method is available in the daemon helps return the state of the channel (see: https://github.com/singnet/snet-cli/blob/master/snet_cli/resources/proto/state_service.proto). 
 
 The client does not necessarily require a special call request to know the last state of the channel from the daemon. 
 
 The daemon can return the state of the channel in the response to any non-authorized call.
 
 The client receives the following information from the daemon:

- **current_nonce** 
  <br>Current nonce of the payment channel.
- **current_signed_amoun**t
  <br>Last amount which were signed by client with current_nonce. If no messages were signed with the current_nonce, then this value is an empty byte string (b''), which we should interpret as 0.
- **current_signature **
  <br>Last signature sent by the client with current_nonce, it could be absent (empty string) if no message was signed with current nonce.
- **oldnonce_signed_amount**  
  <br>last amount which was signed by client with nonce=current_nonce - 1.
- **oldnonce_signature** 
  <br>last signature sent by client with nonce = current_nonce - 1.

**Note:** The two last values are not available in current version, if implemented, can calculate the unspent_amount in the case that current_nonce != blockchain_nonce.

**Example**
Assume that the server performs a close/reopen procedure for the channel. The client can proceed without confirmation from the blockchain, because the server does not need to be dependent, or the client ensures that the request is mined before expiration of the channel.

Before considering the above scenario, define the following parameters
- blockchain_nonce - nonce of the channel in the blockchain
- blockchain_value - value of the channel in the blockchain

It is known that the daemon starts the close/reopen procedure only after the previous channelClaim request was mined. This means that the current_nonce, at maximum, is one point ahead of the blockchain_nonce.

In each case, the client can verify their signature is authentic and considers the following two numbers:

- Next amount which has to be signed (next_signed_amount), taking into account the price for the current call (price). This value can be easily calculated as we interpret current_signed_amount = b'' as 0.
    - next_signed_amount = current_signed_amount + price
- The amount of tokens which haven't been already spent (unspent_amount).

**Simple case** current_nonce == blockchain_nonce
- unspent_amount = blockchain_value - current_signed_amount

**Complex case**current_nonce != blockchain_nonce
Taking into account our assumptions, we know that current_nonce = blockchain_nonce + 1.
- unspent_amount = blockchain_value - oldnonce_signed_amount - current_signed_amount

**Note:** The server can send smaller oldnonce_signed_amount (not the actually last one which was used for channelClaim), But the server trust that the money available is actually more in the channel, which means that a likely attack has occurred through unspent_amount, which lead us  believe that there are less tokens than the actuals, and therefore the future calls need be rejected instantly (or force us to call channelAddFunds).