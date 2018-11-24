# Overview

Below proposal describes changes in APIs of SingularityNet components. Main
goal is allowing step by step migration of the SingularityNet from Jobs to
MultiPartyEscrow contracts. It means that for some time it will be possible to
use both payment ways. At the end one can find development plan based on API
changes proposed.

# IPFS metadata changes

Current API:

- metadata
  - description
  - modelURI

Proposed API:

- metadata
  - version - used to track format changes
  - (old) description - service description
  - (old) modelURI - IPFS URI to the .tar archive of protobuf service specification
  - reference_price - price per operation;
  (!) can be replaced by invoices from server;
  (?) should it be different for each group?
  - group[] - group is the number of endpoints which shares same payment channel; grouping strategy is defined by service provider; for example service provider can use region name as group id
    - group_id - unique id of the group
    - payment_address - Ethereum address to recieve payments
  - endpoint[] - address in the off-chain network to provide a service
    - endpoint_uri - http://127.0.0.1:1234 - unique endpoint identifier
    - group_id

# Agent contract API changes:

## Introducing replicas and Multi Party Escrow (MPE)

As all payment related logic will be moved to the MPE contract and some
metadata will be moved to IPFS, most of the fields and methods will be
obsolete.

Fields to be removed:
- token - moved to MPE
- createdJobs - moved to MPE
- currentPrice - moved to IPFS metadata
- endpoint - moved to IPFS metadata

Methods to be removed:
- setPrice - replaced by Agent.setMetadataURI
- setEndpoint - same
- createJob - replaced by MPE.open_channel()
- fundJob - replaced by MPE.deposit()
- validateJobInvocation - replaced by payment validation in snet-daemon
- completeJob - replaced by MPE.channel_claim()

Proposed Agent API:

Fields:
- state - service state
- owner - address which can modify metadata
- metadataURI - IPFS metadata JSON URI

Methods:
- enable - enable service
- disable - disable service
- setMetadataURI - update metadata

## Replacing Agent by Registry plus metadata URI

We can move further and replace Agent contract by keeping metadataURI and service
state in Registry instead of using separate Agent contract.

# Daemon API changes

Sequence diagram of calls during client/daemon interaction:
![Client/daemon interaction sequence diagram](./img/clientDaemonInteractionSequenceDiagram.svg "Client/daemon interaction sequence diagram")

## RPC call API

Current API:

- GRPC request metadata fields:
  - snet-job-address
  - snet-job-signature

Proposed API:

- GRPC request metadata fields:
  - snet-payment-type - if this field is absent it is an old Job based protocol; if it is a string "escrow" then new MPE contracts protocol is used;
  - snet-payment-channel-id - id of the payment channel in MPE contract (decimal number string see [below](#using-decimal-numbers))
  - snet-payment-channel-nonce - nonce of the payment channel (decimal number string)
  - snet-payment-channel-amount - payment amount authorized by client (decimal number string)
  - snet-payment-channel-signature-bin - client payment signature (65 bytes in base64 see [below](#binary-data-encoding))
  - (old) snet-job-address - Job contract instance address to verity payment (32 bytes in hex string)
  - (old) snet-job-signature - Job payment signature (65 bytes in hex string)

### Using decimal numbers

Some values are represented as decimal number printed to string. The reason is that by their nature these values are incremental counters. Representing them as ```unit256``` value in hex string requires sending 64 bytes for relatively small value. To make representation more compact and clear we have decided keeping them as plain decimal numbers. But client should expect that this number can be as big as ```uint256```, so the best type to represent such values in code is ```BigInteger```.

### Binary data encoding

gRPC supports sending binary data in metadata fields. To use this feature metadata key should have ```-bin``` postfix. Caller should pass values for such keys as byte array casted to the string (some implementations may allow passing byte arrays without casting). gRPC library encodes such values using ```base64```. See [grpc-metadata.md#storing-binary-data-in-metadata](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md#storing-binary-data-in-metadata) for reference.

## Blockchain events API

New MPE events doesn't intersect with previous Job one. NewPaymentChannel
events should be polled from Ethereum blockchain and added to the distributed
payment channel cache.

# Development plan

Minimal payment channel implementation:
1. Add MultiPartyEscrow contract
2. Add separate snet-cli command ```mpe``` to interact with service using MPE
   payment channel:
   - deposit tokens to MPE
   - open payment channel
   - call service using opened channel
   - close channel after expiration
3. Implement separate request handler in snet-daemon to handle requests using
   MPE payment channels:
   - get new metadata from requests
   - verify payment authorization
   - listen channel related blockchain events
4. Implement console utility to claim money from the channel:
   - claim tokens from payment channel

Support replicas:
1. Add ```snet-cli``` command to manage replicas:
   - publish service using new IPFS format
   - add group of replicas
   - add replica
   - remove replica
2. Modify snet-daemon to share state within group of replicas

Migrate dApp to MPE:
1. Implement dApp using MPE contracts
2. Remove legacy API

