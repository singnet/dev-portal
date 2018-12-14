# SingularityNET Daemon

## Overview

The daemon is the adapter with which an otherwise SingularityNET-unaware service implementation can be exposed to the SingularityNET network. It is designed to be deployed as a sidecar process alongside the service on a given host. The daemon takes care of authenticating callers and authorizing their invocations of the service, terminating transport encryption, issuing blockchain transactions on behalf of the service owner (e.g. to retrieve funds held in escrow after successful completion of a call), translating incoming requests from a universal gRPC interface exposed by the daemon to proxy them in the format expected by the service, and more.

## Supported Service Types

The daemon has been written to support a variety of service implementations. Currently, services that either expose a JSON-RPC endpoint, a gRPC endpoint, or are implemented as executables to be executed on a per-call basis with the input parameters on STDIN can be used with the SingularityNET daemon.

## Daemon API

The daemon itself exposes a gRPC/gRPC-Web endpoint regardless of what type of service is paired with the daemon. This enables one consistent protocol to be used to communicate with any service on the SingularityNET network. Note that certain gRPC features such as streaming require the service itself to expose a gRPC endpoint with streaming RPCs. Note also that bi-directional streaming RPCs are only compatible with gRPC clients (not gRPC-Web i.e. browser clients).

## Service Models

Services are encouraged to define their API surface using [protobuf](https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition) as an IDL. This allows SingularityNET clients to determine the request/response schema programmatically. See [this](archive/alpha/Platform-How-Tos.md#create-a-service-model) for an example of how to create a service model for any of the [supported service types](#supported-service-types), and [this](archive/alpha/Platform-How-Tos.md#publish-service-metadata) for directions on how to publish the service model to the network.

## SSL

The daemon supports SSL termination using either a service developer-supplied certificate and keyfile or automatic certificates provided by [Let's Encrypt](https://letsencrypt.org/).

## Auth

Prior to invoking a service through the SingularityNET platform, a consumer must have 
- Funded  the multiparty escrow contract 
- Opened a payment channel with the recipient as specified by the service definition. 

With each invocation the daemon checks 
- That the signature is authentic
- The payment channel has sufficient funds
- The payment channel expiry is beyond specified threshold (to ensure that the developer can claim the accrued funds)
Post these successful checks the request is proxied to the service.

## Configuration

The daemon's behavior with respect to [service type](#supported-service-types), [SSL](#ssl), [blockchain interactions](#blockchain), etc. is configurable via a configuration file, environment variables, and executable flags. See [this](archive/alpha/Platform-How-Tos.md#configure-singularitynet-daemon) for a description of the available configuration keys.

## Payment channel state

The daemon stores payment channel state in a etcdb cluster. This is detailed [here](../payment-channel/PaymentChannelStorage.md)
