# SingularityNET Daemon

## Overview

The daemon is the adapter with which an otherwise SingularityNET-unaware service implementation can be exposed to the SingularityNET network. It is designed to be deployed as a sidecar process alongside the service on a given host. The daemon takes care of authenticating callers and authorizing their invocations of the service, terminating transport encryption, issuing blockchain transactions on behalf of the service owner (e.g. to retrieve funds held in escrow after successful completion of a call), translating incoming requests from a universal gRPC interface exposed by the daemon to proxy them in the format expected by the service, and more.

## Supported Service Types

The daemon has been written to support a variety of service implementations. Currently, services that either expose a JSON-RPC endpoint, a gRPC endpoint, or are implemented as executables to be executed on a per-call basis with the input parameters on STDIN can be used with the SingularityNET daemon.

## Daemon API

The daemon itself exposes a gRPC/gRPC-Web endpoint regardless of what type of service is paired with the daemon. This enables one consistent protocol to be used to communicate with any service on the SingularityNET network. Note that certain gRPC features such as streaming require the service itself to expose a gRPC endpoint with streaming RPCs. Note also that bi-directional streaming RPCs are only compatible with gRPC clients (not gRPC-Web i.e. browser clients).

## Service Models

Services are encouraged to define their API surface using [protobuf](https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition) as an IDL. This allows SingularityNET clients to determine the request/response schema programmatically. See [this](Platform-How-Tos.md#create-a-service-model) for an example of how to create a service model for any of the [supported service types](#supported-service-types), and [this](Platform-How-Tos.md#publish-service-metadata) for directions on how to publish the service model to the network.

## SSL

The daemon supports SSL termination using either a service developer-supplied certificate and keyfile or automatic certificates provided by [Let's Encrypt](https://letsencrypt.org/).

## Auth

Prior to invoking a service through the SingularityNET platform, a consumer must have created and funded a Job contract with the Agent contracted associated with the service. With each invocation, the request is paired with custom HTTP2 headers that indicate the address of the funded Job contract and a signature generated with the private key associated with the address that created and funded the Job contract. The daemon ensures that the funds have been successfully locked into escrow and that the signature is valid as a token to claim the funds after processing the request prior to proxying the request to the service.

## Blockchain

The daemon uses a blockchain identity/wallet to transact on the blockchain. This identity need not have any relation to the identity that owns the Agent contract for the service. It is important that the daemon's configured blockchain identity remains funded with ETH in order for funds to be moved from escrow to the service owner's wallet.

## Configuration

The daemon's behavior with respect to [service type](#supported-service-types), [SSL](#ssl), [blockchain interactions](#blockchain), etc. is configurable via a configuration file, environment variables, and executable flags. See [this](Platform-How-Tos.md#configure-singularitynet-daemon) for a description of the available configuration keys.
