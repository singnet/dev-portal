---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Daemon API


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

page_nav:
    prev:
        content: The Daemon
        url: '/docs/concepts/daemon'
    next:
        content: Daemon Payment Channel Storage
        url: '/docs/concepts/daemon-channel-storage'
---

`snetd`, the SingularityNET daemon, provides an API to call service methods using [multi-party escrow contract](/docs/ai-developers/mpe) payment channels.

To call a published service's method, the client sends payment details via gRPC metadata, as described in the section [gRPC metadata](#grpc-metadata). The server will return one of the [gRPC error codes](#grpc-error-codes) in response.

There are two situations where the client may want to get the payment channel state from the service: an `IncorrectNonce` in response, or when starting an service interaction for the first time. The payment channel state can be retrieved via the [payment channel state API](#payment-channel-state-api).

A sequence diagram of a typical client/service interaction can be found in the [Sequence of Calls](#sequence-of-calls) section.

## gRPC metadata

To pass payment data to the server when making a request, the client fills in the following gRPC metadata fields:

- `snet-payment-type` - payment protocol type; currently "escrow" is the only supported value, it means that MultiPartyEscrow (MPE) contract is used for payments;
- `snet-payment-channel-id` - id of the payment channel in MPE contract ([decimal number string](#using-decimal-numbers))
- `snet-payment-channel-nonce` - nonce of the payment channel ([decimal number string](#using-decimal-numbers))
- `snet-payment-channel-amount` - payment amount authorized by the client ([decimal number string](#using-decimal-numbers))
- `snet-payment-channel-signature-bin` - client payment signature ([65 bytes in base64](#binary-data-encoding))

### Using decimal numbers

Some values are represented as decimal numbers printed to a string. The reason is that by their nature, these values are incremental counters. Representing them as `uint256` value in hex string requires sending 64 bytes for a relatively small value. To make the representation more compact and clear, we have decided to keep them as decimal number represented as strings. The client should expect that this number can be as big as `uint256`, so the best type to represent such values in code is `BigInteger`.

### Binary data encoding

gRPC supports sending binary data in metadata fields. To use this feature, the metadata key should have a `-bin` postfix. The caller should pass values for such keys as a byte array casted to string (some implementations may allow passing byte arrays without casting). The gRPC library encodes such values using `base64`. [Click to see what the gRPC documentation says about this for reference](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md#storing-binary-data-in-metadata).

## gRPC error codes

The SingularityNET daemon uses both standard and custom gRPC error codes to provide client with information when an error occurrs. In the case that the service itself returns an error, it will be passed to the client without transformation.

gRPC error codes:
- `Unauthenticated` - payment details are incorrect;
- `IncorrectNonce` (custom code **1000**) - payment nonce is incorrect, possible
  reason is that service provider claimed funds and incremented the channel nonce;
- `FailedPrecondition` - call cannot be done because another call is in progress
  or rate restriction is applied;
- `InvalidArgument` - payment details format is incorrect;
- `Internal` - unexpected error, daemon state is incorrect or some subsystem is
  unavailable, the service provider needs to resolve the issue;

Full list of expected error messages:
- `Unauthenticated`:
  - "payment signature is not valid"
  - "payment is not signed by channel signer"
  - "payment channel is near to be expired, expiration time: %v, current block: %v, expiration threshold: %v"
  - "not enough tokens on payment channel, channel amount: %v, payment amount: %v"
  - "payment channel \"%v\" not found"
  - "income %d does not equal to price %d"
- `IncorrectNonce`:
  - "incorrect payment channel nonce, latest: %v, sent: %v"
- `FailedPrecondition`:
  - "another transaction on channel: %v is in progress"
- `InvalidArgument`:
  - "missing metadata"
  - "unexpected \"snet-payment-type\", value: \"%v\""
  - "incorrect format \"%v\": \"%v\""
  - "incorrect binary key name \"%v\""
  - "missing \"%v\""
  - "too many values for key \"%v\": %v"

## Payment Channel State API

The client can get the latest payment channel state from the service using PaymentChannelStateService via gRPC. See [state_service.proto](https://github.com/singnet/snet-daemon/blob/master/escrow/state_service.proto) for the API description.

## Sequence of Calls

Sequence diagram of calls during client/daemon interaction:
[![Client/daemon interaction sequence diagram](/assets/img/mpe/clientDaemonInteractionSequenceDiagram.svg "Client/daemon interaction sequence diagram")](/assets/img/mpe/clientDaemonInteractionSequenceDiagram.svg)
