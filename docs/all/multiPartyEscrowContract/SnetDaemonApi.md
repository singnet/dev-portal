# Overview

SingularityNet daemon provides API to call service methods using
MultiPartyEscrow contract payment channels. In order to call service method
client should provide payment details via gRPC metadata as described in section
[gRPC metadata](#grpc-metadata). Server can return one of the [gRPC error
codes](#grpc-error-codes) in response. At least in two situations
(IncorrectNonce in response and starting for the first time) client may
want to get payment channel state from service. It can be done using [Payment
channel state API](#payment-channel-state-api). Sequence diagram of typical
client/service interaction can be found in [Sequence of
calls](#sequence-of-calls) section.

# gRPC metadata

To pass payment data to the server client should fill gRPC metadata fields
correctly.

gRPC request metadata fields:
- **snet-payment-type** - payment protocol type; "escrow" is only supported value,
  means that MultiPartyEscrow (MPE) contract is used for payments;
- **snet-payment-channel-id** - id of the payment channel in MPE contract (decimal
  number string see [below](#using-decimal-numbers))
- **snet-payment-channel-nonce** - nonce of the payment channel (decimal number
  string)
- **snet-payment-channel-amount** - payment amount authorized by client (decimal
  number string)
- **snet-payment-channel-signature-bin** - client payment signature (65 bytes in
  base64 see [below](#binary-data-encoding))

## Using decimal numbers

Some values are represented as decimal number printed to string. The reason is
that by their nature these values are incremental counters. Representing them
as ```unit256``` value in hex string requires sending 64 bytes for relatively
small value. To make representation more compact and clear we have decided
keeping them as plain decimal numbers. But client should expect that this
number can be as big as ```uint256```, so the best type to represent such
values in code is ```BigInteger```.

## Binary data encoding

gRPC supports sending binary data in metadata fields. To use this feature
metadata key should have ```-bin``` postfix. Caller should pass values for such
keys as byte array casted to the string (some implementations may allow passing
byte arrays without casting). gRPC library encodes such values using
```base64```. See
[grpc-metadata.md#storing-binary-data-in-metadata](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md#storing-binary-data-in-metadata)
for reference.

# gRPC error codes

SingularityNet daemon uses both standard and custom gRPC error codes to provide
client information about error happened. In case when service returned the
error it will be passed to client without transformations.

gRPC error codes:
- **Unauthenticated** - payment details are incorrect;
- **IncorrectNonce** (custom code **1000**) - payment nonce is incorrect, possible
  reason is that service provider claimed funds and incremented channel nonce;
- **FailedPrecondition** - call cannot be done because another call is in progress
  or rate restriction is applied;
- **InvalidArgument** - payment details format is incorrect;
- **Internal** - unexpected error, daemon state is incorrect or some subsystem is
  unavailable, service provider needs to resolve the issue;

Full list of expected error messages:
- Unauthenticated:
  - "payment signature is not valid"
  - "payment is not signed by channel signer"
  - "payment channel is near to be expired, expiration time: %v, current block: %v, expiration threshold: %v"
  - "not enough tokens on payment channel, channel amount: %v, payment amount: %v"
  - "payment channel \"%v\" not found"
  - "income %d does not equal to price %d"
- IncorrectNonce:
  - "incorrect payment channel nonce, latest: %v, sent: %v" 
- FailedPrecondition:
  - "another transaction on channel: %v is in progress"
- InvalidArgument:
  - "missing metadata"
  - "unexpected \"snet-payment-type\", value: \"%v\""
  - "incorrect format \"%v\": \"%v\"" 
  - "incorrect binary key name \"%v\"" 
  - "missing \"%v\""
  - "too many values for key \"%v\": %v"

# Payment channel state API

Client can get latest payment channel state from service using
PaymentChannelStateService via gRPC. See
[state_service.proto](https://github.com/singnet/snet-daemon/blob/master/escrow/state_service.proto) for API description.

# Sequence of calls

Sequence diagram of calls during client/daemon interaction:
![Client/daemon interaction sequence diagram](./img/clientDaemonInteractionSequenceDiagram.svg "Client/daemon interaction sequence diagram")

