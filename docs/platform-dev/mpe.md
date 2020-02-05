---
# Page settings
layout: default
keywords: Multi-Party Escrow, MPE, Multi Party Escrow
comments: false

# Hero section
title: The Multi-Party Escrow Contract
description: An introduction to the deposit, withdrawal, and payment channel functionalities of the Multi-Party Escrow

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    next:
        content: MPE Stateless Client
        url: '/docs/concepts/mpe-stateless-client'
    prev:
        content: Registry
        url: '/docs/concepts/registry'

---

## Introduction
The Multi-Party Escrow smart contract (“MPE”), coupled with our atomic unidirectional
payment channels, enables scalable payments in the platform by minimizing the number of
on-Blockchain transactions needed between clients and AI service owners. The MPE contract has
two main functionalities:
1. A very simple wallet with a deposit and withdraw function. Everybody can deposit AGI tokens into a Multi-Party Escrow, and everybody can withdraw their AGI tokens (which have not been escrowed at the moment).
2. The set of the simple ("atomic") unidirectional payment channels between clients and service providers and functions for manipulation of these channels.


## Atomic unidirectional payment channel
> You can skip this section if you are familiar with the concept of payment channels.

The main logical building block of the Multi-Party Escrow is a simple ("atomic") unidirectional payment channel. You can find the implementation of the escrow contract for such a channel in the [SimpleEscrow.sol file here](https://github.com/astroseger/escrow_contracts/blob/master/contracts/SimpleEscrow.sol). A [payment channel](http://super3.org/introduction-to-micropayment-channels/) is a tool that enables off-chain transactions between parties without the delay imposed by blockchain block formation times and without compromising the transactional security. There are several kinds of payment channels. Let us consider the simple unidirectional payment channel, the main logic is as follows:

* The sender creates an escrow contract with a given expiration date and she/he funds it with
  a desired amount of tokens.
* Each time the sender needs to send a small amount of tokens to the recipient she/he sends (to the recipient) the signed authorization to close the channel and withdraws from the channel the total amount of the tokens that are due.
* The recipient must check that the authorization is correctly signed and that the amount is correct, and that this amount is not exceeding the funds being escrowed.
* The recipient can close the channel at any moment by presenting a signed amount from the sender.  Of course it is better for the recipient to close the channel with the last authorization (with highest amount). The recipient will be sent that amount, and the remainder will go back to the sender.
* The sender can close the channel after the expiration date and take all funds back.
* The sender can extend the expiration date and add funds to the contract at any moment in time.

In the model above, there is no way for the receiver to withdraw funds without closing the channel.
Otherwise, he could use the sender's signed authorization a second time and withdraw 5 more AGI
tokens.
Therefore, we added a feature that allows the receiver to withdraw funds from the channel without
closing it, while preventing this replay attack. We used a simple, textbook solution: a nonce. We
add a nonce to the message that the sender signs, and this nonce changes each time the recipient
claims the channel.
With this improvement, payment channels inside MPE have the following favorable
properties:
* The channel between sender and recipient can persist indefinitely. The sender can extend
the expiration time and add funds to the channel. The recipient can claim the amount
signed over to him at any time.
* The system is comfortably functional even when the Ethereum network is overloaded
with confirmation time of several hours or even more, for the following reasons:
  * Neither the sender nor recipient needs any confirmation from the Blockchain. Alice can continue to add funds, and Bob can continue to claim them in the channel, with no confirmation from the Blockchain. For example, after Bob claims his funds, he can inform Alice that the nonce of the channel has changed, and she can start to send messages with the new nonce. It is easy to demonstrate that this is safe for both the sender and the recipient. There is only one condition: the recipient should make sure that the transaction is mined before the expiry time of the channel.
  * There is no race condition between claiming (from the recipient side) and extending/adding funds (from the sender side). The parties can use these functions at any time, and the final result will not depend on the order in which these transactions are mined.
When a user wants to call a given service, they must open a channel, add funds to it, and set an
expiry date that allows sufficient time for the service to fulfill its function. Each channel is
unique to a combination of client identity (sender), service identity (recipient), and daemon
group identity. This allows daemons in the same group to share payment information via etdc,
reducing the overall number of channels and simplifying life on the client side. Clients can be
end users interacting with the platform via the [Marketplace DApp](https://beta.singularitynet.io/) or applications making calls
directly or through the SDK's generated code.

## The Set of Channels and Manipulation Functions
### Payment Channel Structure

Each "atomic" payment channel in MPE is represented by the following structure

```
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

Comments are self-explanatory, but few clarifications migth be useful.

* The full ID of an "atomic" payment channel is `[MPEContractAddress, channelId, nonce]`.
* The `MPEContractAdress` is the address of Multi-Party Escrow contract, which is needed to prevent a multi contract attack.
* `channelId` is an index in the channels mapping.
* `nonce` is a part of the close/reopen logic.
* By changing the `nonce` we effectively close the old channel `[MPEContractAddress, channelId, oldNonce]` and open the new one `[MPEContractAddress, channelId, newNonce]`. We will go more into details about this later.
* `nonce` also prevents a race condition between between `channelClaim` and `channelExtendAndAddFunds`.
* The full ID of the recipient is `[recipient_ethereum_address, groupId]`. By doing this we allow the service provider to use the same Ethereum wallet for different replicas.

### Functions

#### Opening a New Atomic Channel

The following function opens the new "atomic" channel, assuming that the caller is the sender:

```
function openChannel(address  recipient, uint256 value, uint256 expiration, bytes32 groupId, address signer)
```

This function simply creates a new `PaymentChannel` structure and adds it to the list of channels.

#### Claiming Funds from the Channel
With the following function, the recipient can claim funds from the channel.

```
function channelClaim(uint256 channelId, uint256 amount, uint8 v, bytes32 r, bytes32 s, bool isSendback)
```

It should be noted that `v`, `r`, `s` are parts of the signature. The recipent should present the signature for the following message `[MPEContractAdress, channelId, nonce, amount]`. It should be noted that `[MPEContractAdress, channel_id, nonce]` is the full ID of the "atomic" channel.

The recipient has two possibilities:
* `(is_sendback==true)` - "close" the channel and send the remainder back to the sender.
* `(is_sendback==false)` - "close/reopen". We transfer the claimed amount to the recipient, but instead of sending the remainder back to the sender we simple change the nonce of the channel. By doing this we close the old atomic channel `[MPEContractAdress, channel_id, old_nonce]` and open the new one `[MPEContractAdress, channel_id, new_nonce]`.

#### Postponing the Expiration Time of the Channel

With the following functions the client can postpone the expiration time of the channel and she/he can add funds to the channel at any time. She/he can also claim all funds from the channel after the expiration time is reached.

```
function channelExtend(uint256 channel_id, uint256 new_expiration);
function channelAddFunds(uint256 channel_id, uint256 amount);
function channelExtendAndAddFunds(uint256 channel_id, uint256 new_expiration, uint256 amount);
function channelClaimTimeout(uint256 channel_id);
```

## Use cases

### Description of a use case

* The client deposits tokens to the Multi-Party Escrow and uses this as a wallet for their AGI tokens.
* The client selects an AI service provider.
* The client opens a Payment Channel with the chosen payment group.
* It should be noted that the client can send requests to any replica from the selected payment group (replicas in one payment group should share the state of the payment channel amongst others in the payment group)
* The client starts to send requests to the replicas. With each call it sends the signed authorization for the server to "withdraw" the total amount of AGI tokens which are due.
* At some point, the server can decide to close/reopen channel in order to claim the AGI tokens due. At the next call from the client, the server should inform the client that the `nonce` of the channel has been changed (see [this topic on stateless clients](/docs/concepts/mpe-stateless-client)).
* At some point, the client can decide to postpone the expiration of the channel or to escrow more funds.
* It should be noted that because of the possibility to repeatedly postpone the expiration of the channel and/or to escrow more funds, the payment channel can exist forever.

### Formal example of the use case

Let's assume that one call requires 1 AGI. We also assume that the server and the client perform all required validations on each call. This means it at least checks:
* whether the signature is authentic;
* whether the amount of AGI tokens is correct;
* whether this amount does not exceed the value of the channel; and
* whether the expiration date is tolerable.

**We assume that** `REPLICA1` **is from the payment group identified with** `groupId=group1`.

* `CLIENT1` initiates a call: `openChannel(recipient=SERVER1, value=10 AGI, expiration=expiration0, groupId=group1, signer=CLIENT1)`
* Multi-Party Escrow creates the Payment Channel: `[channel_id = 0, sender=CLIENT1, recipient=SERVER1, groupId=group1, value=10 AGI, nonce=0, expiration=expiration0, signer=CLIENT1]`
* Multi-Party Escrow subtracts `10 AGI` from the balance of `CLIENT1`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=1)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=2)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=3)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=4)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=5)`
* Server decides to close/reopen the channel (and claims `5 AGI` that is due)
* `SERVER1` initiates a call: `channelClaim(channel_id = 0, amount=5, signature = SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=0, amount=5), is_sendback=false)`
* The Multi-Party Escrow adds `5 AGI` to the balance of `SERVER1`
* The Multi-Party Escrow changes the nonce (`nonce +=1`) and value (`value -= 5`) in the Payment Channel: `[channel_id = 0, sender=CLIENT1, recipient=SERVER1, replicaId=REPLICA1, value=5 AGI, nonce=1, expiration=expiration0]`
* The client is notified that the channel has been reopened, and that the `nonce` has been changed (see [this topic on stateless clients](/docs/concepts/mpe-stateless-client)).
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=1)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=2)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=3)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=4)`
* The client decides to deposit more AGI tokens in the channel and postpones its expiration date.
* `CLIENT1` calls `channelExtendAndAddFunds(channel_id=0, new_expiration = now + 1day, amount=10 AGI)`
* The Multi-Party Escrow changes the value and expiration date in the Payment Channel: `[channel_id = 0, sender=CLIENT1, recipient=SERVER1, groupId=group1, value=15 AGI, nonce=1, expiration=expiration1, signer=CLIENT1]`
* The Multi-Party Escrow subtracts `10 AGI` from the balance of `CLIENT1`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=5)`
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=6)`
* .....
* `CLIENT1` sends to `SERVER1/REPLICA1` the authorization `SIGNED_BY_CLIENT1(ContractAdress=MPEAdress, channel_id=0, nonce=1, amount=10)`
* The server decides to close/reopen the channel (claims 10 AGI that is due).
* .....
* Client decides to put more AGI tokens in the channel and postpones its expiration date.
* ....
* Server decides to close/reopen the channel.
* ....
* This can be repeated forever.
* ....
* If the server decides to stop working with this client he could close the channel with `channelClaim(...., is_sendback=true)`
* If the server fails to claim the tokens before timeout (for example if he goes offline forever), then the client can claim all remaining tokens after the expiration date.

## Remarks

* The service provider can use the same Ethereum address for all payment groups or she/he can use a different address. In any case, the daemons very rarely need to send an on-chain transaction. This means that we actually don't need to provide the daemons with direct access to the private key. Instead, a centralized server could sign the transactions from the daemons (in some cases it even can be done in semi-manual manner by the service owner). We call such a server a treasurer server.
* In the current implementation, the client signs off-chain authorization messages with the signer's private key. This means that the client doesn't necessarily need to sign transactions with his Ethereum identity. Instead, he can use other key pairs.
* The server does not need to wait for a confirmation from the Blockchain after it sends on-chain requests to close/reopen channels (`channelClaim`). It can inform the client that the `nonce` of the channel has changed, and it can start accepting calls from the client with a new `nonce`. It can be shown that it is secure for both the client and the server if the transaction is accepted by the blockchain before the expiration date of the channel. Similarly, the client doesn't need to wait for a confirmation from the blockchain after sending the `channelExtendAndAddFunds` call. It makes the Multi-Party Escrow functional, even on a very slow Ethereum network.  
* The `nonce` in the channel prevents a race between the `channelExtendAndAddFunds` and `channelClaim`. If the client sends the `channelExtendAndAddFunds` request and at the same time the
server sends a `channelClaim` request, they can continue to work without receiving confirmation from the Blockchain. In this case it also does not matter which request will be accepted first (as `channelClaim` can only change the `nonce`, and cannot create a new Payment Channel structure).
