---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Stateless Client with the Multi-Party Escrow
description: Calling SingularityNET services with the stateless method.

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
        content: The Request for AI portal
        url: '/docs/concepts/rfai'
    prev:
        content: Multi-Party Escrow
        url: '/docs/concepts/multi-party-escrow'

---

In this document we demonstrate that the client that communicates with SingularityNET services using the Multi-Party Escrow payment channels does not require to store the state of the payment channel. The client only needs to store its Ethereum identity.  

1. The client can easily obtain the list of its payment channels (payment channels with "sender==client") from the Multi-Party Escrow (see EventChannelOpen). However, we need to take into account the situation in which the request to open the channel has been already sent, but not yet mined. This can happen when the client has sent this request and died (it "lost" its state).
2. The client can request the last state of the given payment channel from the server.
    * The server is not able to forge this state, because it was signed by the client (of course the client should check its own signature).
    * The server is obviously interested in saving and sending the last state, otherwise it loses money.

We have a special gRPC method in the daemon which returns the state of the channel (see: [https://github.com/singnet/snet-cli/blob/master/snet_cli/resources/proto/state_service.proto](https://github.com/singnet/snet-cli/blob/master/snet_cli/resources/proto/state_service.proto)). The client actually does not even need to use a special call to request the last state of the channel from the daemon. The daemon can return the state of the channel in the response to any non-authorized call.

The client receives the following information from the daemon:
* `current_nonce` - current nonce of the payment channel.
* `current_signed_amount` -  a last amount which were signed by client with current_nonce. If no messages were signed with the `current_nonce`, then this value is an empty byte string (b''), which we should interpret as 0.
* `current_signature` - a last signature sent by the client with current_nonce, it could be absent (empty string) if no message was signed with current nonce.
* (not implemented yet) `oldnonce_signed_amount` - last amount which was signed by client with `nonce=current_nonce - 1`.
* (not implemented yet) `oldnonce_signature` - last signature sent by client with nonce = current_nonce - 1.

**It should be noted that the two last values are not in the current version, and we need them only to calculate `unspent_amount` in the case that `current_nonce != |Blockchain_nonce`**

We should consider a complex situation where the server starts a close/reopen procedure for the channel. The client doesn't need to wait for a confirmation from the Blockchain, because it is not in the interest of the server to lie. At the same time, the server also doesn't need to wait for a confirmation from the Blockchain if he makes sure that the request is mined before expiration of the channel.

Before considering all possible cases, let's define the following parameters
* `|Blockchain_nonce` - nonce of the channel in the Blockchain
* `|Blockchain_value` - value of the channel in the Blockchain

We also assume that the daemon starts the close/reopen procedure only after the previous `channelClaim` request was mined. This means that the `current_nonce`, at maximum, is one point ahead of the `|Blockchain_nonce`. We can easily relax this assumption if necessary.   

In all cases we assume that the client can verify that it's own signature is authentic.  

In all cases we are interested in two numbers:
* Next amount which has to be signed (`next_signed_amount`), taking into account the price for the current call (`price`). This value can be easily calculated as we interpret `current_signed_amount = b''` as 0.
    * `next_signed_amount = current_signed_amount + price`
* The amount of tokens which haven't been already spent (`unspent_amount`).

#### Simple case `current_nonce == |Blockchain_nonce`
* `unspent_amount = |Blockchain_value - current_signed_amount`

#### Complex case `current_nonce != |Blockchain_nonce`
Taking into account our assumptions, we know that `current_nonce = |Blockchain_nonce + 1`.
* `unspent_amount = |Blockchain_value - oldnonce_signed_amount - current_signed_amount`

It should be noted that in this case the server could send us smaller `oldnonce_signed_amount` (not the actually last one which was used for `channelClaim`). In this case, the server can only make us believe that we have more money in the channel then we actually have. That means that one possible attack via `unspent_amount` is to make us believe that we have less tokens than we truly have, and therefore reject future calls (or force us to call `channelAddFunds`).
