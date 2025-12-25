# Introduction to MPE

An Escrow contract defines the conditional transaction between two transacting parties through an Escrow account.

The Multi-party Escrow (MPE) smart contract API and the payment channel together enable payments in the SingularityNET platform with a minimal number of on-Blockchain interactions between AI Consumers and AI service providers.

The MPE contract comprises two main functions, which includes:

1. A wallet with a deposit and withdraw function.
2. A set of the simple ("atomic") unidirectional payment channels between clients and service providers and support functions for controlling these channels.

**Note:** Any one can deposit and withdraw their ASI (FET) tokens into a Multi-Party Escrow, (which have not been escrowed at the moment).

## What is Payment Channel?

Whenever the sender and the receiver enter into an contract, a channel is created.

A [payment channel](http://super3.org/introduction-to-micropayment-channels/) is a tool that enables off-chain transactions between parties without the delay imposed by Blockchain block formation and without compromising the transactional security.

## Atomic Unidirectional Payment Channel

If you are familiar with the concept of payment channels, ignore this section.

The core logical building block of the Multi-Party Escrow is a simple ("Atomic") unidirectional payment channel. To learn more about the details of how to implement the Escrow contract for unidirectional payment channel, click on this link [SimpleEscrow.sol](https://github.com/astroseger/escrow_contracts/blob/master/contracts/SimpleEscrow.sol) file here.

It is understood that the payment channel is on the Blockchain. So, in order to prevent direct updating on the Blockchain regularly, the payment channel state is maintained in the storage.

Daemon maintains the channel state off chain as block operations involve gas cost and are slow between parties without imposing any delay by the Blockchain block formation times and compromising on transactional security.

Let us consider the simple unidirectional payment channel, the main logic is as follows:

1. The sender creates an Escrow contract with a given expiration date, and funds it with a desired amount of tokens.
2. The sender then needs to send a small amount of tokens to the recipient each time (to the recipient) with signed authorization
3. The recipient must verify whether the signed authorization and the amount required is correct, and that amount specified does not exceed the funds being escrowed.
4. The channel nonce is incremented, whenever a claim happens. Actually, the channel is not closed and the task can still continue off line, but a new nonce need to be used.
5. The sender can perform the following:
    - Can collect all funds remaining after the expiration date
    - **-or-**
    - Extend the expiration date and add funds to the contract at any moment in time

**Note:** The receiver can withdraw from the channel (same as claim) only using the authorized amount by the sender. Whenever a signature is made on a certain format which should be signed by the private key of Kevin, Jack then verifies whether the signature was authentic to Kevin, based on the agreed format.

## MPE Use Cases

Consider the following:

- **Kevin** - is our Client **Consumer**/**Buyer**
- **Jack** - is our Service **Provider**/**Seller**

If Kevin is buying services from Jack, they both need to enter in to a formal agreement with each other. A channel is created.

**Note:** Each channel is unique to a combination of client identity (sender), service identity (recipient), Organization Id and the daemon group identity.

### Transaction Flow

1. **Kevin deposits tokens** to the Multi-Party Escrow account and uses this as a wallet for their ASI (FET) tokens.

2. **Kevin creates and opens a Payment Channel.**
   
   **Note:** Kevin is the sender of tokens and Jack is the receiver of tokens. Every channel created has a unique ID, which begins from 0.

3. **Kevin funds the channel.** Kevin suggests Jack to deposit a bare amount (cost of the service) and mentions that the amount can never been withdrawn for a predetermined period of time. This period is configurable.
   
   Based on how much Jack wants to use a service, Jack deposits the amount in to the channel accordingly, so if the cost is 1 AFET, and Jack needs to use it 10 times, he will deposit 10 AFET. Nonce is always zero when you create the channel for the first time.
   
   **Note:** Unless and until Jack authorises, Kevin cannot withdraw the money. Kevin and Jack come in to agreement to perform operation Off chain. The daemon manages the off chain state of the channel.

4. **Kevin needs to authorize** using the signature (using his private key to sign) to let Jack withdraw

5. **Jack verifies the following:**
    - Signature is authentic
    - Amount of ASI (FET) tokens specified is correct (last Authorized Amount from Kevin + Cost of the Service being called)
    - Amount does not exceed the value of the channel
    - Channel is not very close to expiring or has expired

6. **Kevin makes a call;** Jack now sends the signed authorization to Kevin to "withdraw". The effective balance is 1.

7. **Jack can now make a claim** with the amount authorized.
   
   **Note:** Nonce increments to 1, when claim is performed.

## Diagram Showcasing How Kevin and Jack Communicate

<ImageViewer src="/assets/images/products/AIMarketplace/core-concepts/persona.png" alt="How sellers and buyers interact"/>

## State Management of the Channel

### Initial Channel Creation

Kevin (Buyer) and Jack (Service provider) enter into a contract for the first time, they create a channel details in the Blockchain as follows:

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Channel ID** | 1 | The channel ID created is 1 on Chain |
| **Nonce** | 0 | Initially the Nonce is 0 |
| **Full amount** | 100 AFET | Amount Kevin has put into the channel is 100 AFET |
| **Authorized Amount** | 0 | The Authorized amount is zero, because no services has been used for the first time |
| **Signature** | Nil | No signature is required to be sent |

---

### First Service Call

Kevin makes a call and authorizes for 1 AFET to Kevin, (assuming the cost of the service is 1 AFET), the status of the channel is now maintained offchain by the storage mechanism used by Daemon:

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Channel ID** | 1 | The channel ID 1 is now updated off chain |
| **Nonce** | 0 | Initially the Nonce is 0 |
| **Full amount** | 100 AFET | Amount Kevin has put into the channel is 100 AFET |
| **Authorized Amount** | 1 | The Authorized amount is one AFET |
| **Signature** | 1 | Signature is required for one AFET |

---

### Second Service Call

Kevin makes a call and authorizes for 2 AFET to Kevin, now the status changes as follows:

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Channel ID** | 1 | The channel ID 1 is now updated off chain |
| **Nonce** | 0 | Initially the Nonce is 0 |
| **Full amount** | 100 AFET | Amount Kevin has put into the channel is 100 AFET |
| **Authorized Amount** | 2 AFET | The Authorized amount is two |
| **Signature** | 2 AFET | Signature is required for two |

---

### Claim Transaction

Jack makes a claim using the signature from Jack, this transaction is considered on-chain transaction. Please note the effective balance in Blockchain for this channel is now 98 and its nonce is 1. The same channel state is updated as follows even in the off chain state:

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Channel ID** | 1 | The channel ID created is 1 |
| **Nonce** | 1 | Initially the Nonce was 0 but now it is 1 |
| **Full amount** | 98 AFET | Amount signed by Jack was for two AFET. The full amount in the channel is 98 |
| **Authorized Amount** | 0 | The Authorized amount is zero after claim |
| **Signature** | 0 | No signature is required to be sent |

**Note:** Claims are always on-chain transaction and the Nonce gets incremented when claims are made.

The same process follows for future calls authorizations of AFET.

## Channel Management Functions

### Postponing the Expiration Time of the Channel

With the following functions the client can postpone the expiration time of the channel and can add funds to the channel at any time and can also claim all funds from the channel after the expiration time is reached.

```solidity
function channelExtend(uint256 channel_id, uint256 new_expiration);
function channelAddFunds(uint256 channel_id, uint256 amount);
function channelExtendAndAddFunds(uint256 channel_id, uint256 new_expiration, uint256 amount);
function channelClaimTimeout(uint256 channel_id);
```

---

### Claiming Your Funds Back After Expiration

The Sender can claim the funds after the expiry date:

```solidity
function channelClaimTimeout(uint256 channel_id);
```

## How the Recipient Claims Funds from the Channel

With the following function, the recipient can claim funds from the channel:

```solidity
function channelClaim(uint256 channelId, uint256 amount, uint8 v, bytes32 r, bytes32 s, bool isSendback)
```

It should be noted that `v`, `r`, `s` are parts of the signature. The recipient should present the signature for the following message `[MPEContractAdress, channelId, nonce, amount]`. It should be noted that `[MPEContractAdress, channel_id, nonce]` is the full ID of the "atomic" channel.

The recipient has two possibilities:

- **`(is_sendback==true)`** - "close" the channel and send the remainder back to the sender.
- **`(is_sendback==false)`** - "close/reopen". We transfer the claimed amount to the recipient, but instead of sending the remainder back to the sender we simple change the nonce of the channel. By doing this we close the old atomic channel `[MPEContractAdress, channel_id, old_nonce]` and open the new one `[MPEContractAdress, channel_id, new_nonce]`.

## Important Remarks

### Service Provider Flexibility

The service provider can use the same Ethereum address for all payment groups or can use a different address. In any case, the daemons very rarely need to send an on-chain transaction. This means that we actually don't need to provide the daemons with direct access to the private key. Instead, a centralized server could sign the transactions from the daemons (in some cases it even can be done in semi-manual manner by the service owner). We call such a server a treasurer server.

---

### Client Signing

In the current implementation, the client signs off-chain authorization messages with the signer's private key. This means that the client doesn't necessarily need to sign transactions with his Ethereum identity. Instead, he can use other key pairs.

---

### Non-blocking Operations

The server does not need to wait for a confirmation from the Blockchain after it sends on-chain requests to close/reopen channels (`channelClaim`). It can inform the client that the `nonce` of the channel has changed, and it can start accepting calls from the client with a new `nonce`. It can be shown that it is secure for both the client and the server if the transaction is accepted by the Blockchain before the expiration date of the channel. Similarly, the client doesn't need to wait for a confirmation from the Blockchain after sending the `channelExtendAndAddFunds` call. It makes the Multi-Party Escrow functional, even on a very slow Ethereum network.

---

### Race Condition Prevention

The `nonce` in the channel prevents a race between the `channelExtendAndAddFunds` and `channelClaim`. If the client sends the `channelExtendAndAddFunds` request and at the same time the server sends a `channelClaim` request, they can continue to work without receiving confirmation from the Blockchain. In this case it also does not matter which request will be accepted first (as `channelClaim` can only change the `nonce`, and cannot create a new Payment Channel structure).

## Contract Addresses

For deployed contract addresses, please refer to: [Platform Contracts Repository](https://github.com/singnet/platform-contracts#deployed-contracts-npm-version-033)

---

# MPE Stateless Client

The Client does not have to maintain the state of the last amount it had signed. The client can request the last state of the given payment channel from the server.

Key benefits:
- The server is not able to forge this state, because it was signed by the client (of course the client should check its own signature)
- The server is obviously interested in saving and sending the last state, otherwise it loses money

This section describes how the client communicates with the SingularityNET services using the Multi-Party Escrow payment channels without storing state of the payment channel.

## Client Workflow

The client needs to store the Ethereum identity as follows:

1. **Obtain payment channels list** - The client obtains the list of payment channels (payment channels with "sender==client") from the Multi-Party Escrow (see EventChannelOpen). This considers the situation in which the request to open the channel had been sent, but not yet mined. This can occur when the client request has not received any acknowledgement or the session is disconnected (it "lost" its state).

2. **Request channel state** - The client requests the last state of the given payment channel from the server:
   - The server can never duplicate the state of the payment channel signed by the client (of course the client should check its own signature)
   - The server saves and sends the last state, otherwise the money is lost

**Note:** A unique gRPC method is available in the daemon that helps return the state of the channel (see: https://github.com/singnet/snet-cli/blob/master/snet_cli/resources/proto/state_service.proto).

## Channel State Information

The client receives the following information from the daemon:

### Current State Parameters

- **`current_nonce`**
  
  Current nonce of the payment channel.

- **`current_signed_amount`**
  
  Last amount which were signed by client with current_nonce. If no messages were signed with the current_nonce, then this value is an empty byte string (b''), which we should interpret as 0.

- **`current_signature`**
  
  Last signature sent by the client with current_nonce, it could be absent (empty string) if no message was signed with current nonce.

### Previous State Parameters

- **`oldnonce_signed_amount`**
  
  Last amount which was signed by client with nonce=current_nonce - 1.

- **`oldnonce_signature`**
  
  Last signature sent by client with nonce = current_nonce - 1.

**Note:** The two last values are not available in current version, if implemented, can calculate the unspent_amount in the case that current_nonce != Blockchain_nonce.

## Example Scenario

Assume that the server performs a close/reopen procedure for the channel. The client can proceed without confirmation from the Blockchain, because the server does not need to be dependent, or the client ensures that the request is mined before expiration of the channel.

### Definitions

Before considering the above scenario, define the following parameters:

- **`Blockchain_nonce`** - nonce of the channel in the Blockchain
- **`Blockchain_value`** - value of the channel in the Blockchain

It is known that the daemon starts the close/reopen procedure only after the previous channelClaim request was mined. This means that the current_nonce, at maximum, is one point ahead of the Blockchain_nonce.

### Calculations

In each case, the client can verify their signature is authentic and considers the following two numbers:

#### Next Amount Calculation

Next amount which has to be signed (`next_signed_amount`), taking into account the price for the current call (`price`). This value can be easily calculated as we interpret current_signed_amount = b'' as 0:

```
next_signed_amount = current_signed_amount + price
```

#### Unspent Amount Calculation

The amount of tokens which haven't been already spent (`unspent_amount`):

**Simple case: `current_nonce == Blockchain_nonce`**

```
unspent_amount = Blockchain_value - current_signed_amount
```

**Complex case: `current_nonce != Blockchain_nonce`**

Taking into account our assumptions, we know that `current_nonce = Blockchain_nonce + 1`:

```
unspent_amount = Blockchain_value - oldnonce_signed_amount - current_signed_amount
```

**Security Note:** The server can send smaller oldnonce_signed_amount (not the actually last one which was used for channelClaim), but the server trust that the money available is actually more in the channel, which means that a likely attack has occurred through unspent_amount, which lead us believe that there are less tokens than the actuals, and therefore the future calls need be rejected instantly (or force us to call channelAddFunds).