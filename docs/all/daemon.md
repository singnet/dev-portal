---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: An introduction to the SingularityNET Daemon
description: Learn about the functionalities of the daemon and how it interacts with the SingularityNET Marketplace and the Ethereum Blockchain.

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

---
The daemon is the adapter with which an otherwise SingularityNET-unaware service implementation can be exposed to the SingularityNET network. It is designed to be deployed as a sidecar process alongside the service on a given host. The daemon takes care of authenticating callers and authorizing their invocations of the service, terminating transport encryption, issuing blockchain transactions on behalf of the service owner (e.g. to retrieve funds held in escrow after successful completion of a call), translating incoming requests from a universal gRPC interface exposed by the daemon to proxy them in the format expected by the service, and more.

## Supported Service Types
The daemon has been written to support a variety of service implementations. Currently, services that either expose a JSON-RPC endpoint, a gRPC endpoint, or are implemented as executables to be executed on a per-call basis with the input parameters on STDIN can be used with the SingularityNET daemon.

## Daemon API
The daemon itself exposes a gRPC/gRPC-Web endpoint regardless of what type of service is paired with the daemon. This enables one consistent protocol to be used to communicate with any service on the SingularityNET network. Note that certain gRPC features such as streaming require the service itself to expose a gRPC endpoint with streaming RPCs. Also note that bi-directional streaming RPCs are only compatible with gRPC clients (not gRPC-Web i.e. browser clients).

## Service Models
Services are encouraged to define their API surface using [protobuf](https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition) as an IDL. This allows SingularityNET clients to determine the request/response schema programmatically. See [this](/docs/all/archive/alpha/Platform-How-Tos.md#create-a-service-model) for an example of how to create a service model for any of the [supported service types](#supported-service-types), and [this](/docs/all/archive/alpha/Platform-How-Tos.md#publish-service-metadata) for directions on how to publish the service model to the network.

## SSL
The daemon supports SSL termination using either a service developer-supplied certificate and keyfile or automatic certificates provided by [Let's Encrypt](https://letsencrypt.org/).

## Auth
Prior to invoking a service through the SingularityNET platform, a consumer must have:
- Funded the Multi-Party Escrow contract ([see this article](/docs/all/mpe/mpe)); and
- Opened a payment channel with the recipient as specified by the service definition ([see this article](/docs/all/mpe/payment-channel-storage)).

With each invocation the daemon checks:
- that the signature is authentic;
- that the payment channel has sufficient funds; and
- that the payment channel expiry is beyond specified threshold (to ensure that the developer can claim the accrued funds).

After these successful checks the request is proxied to the service.

## Configuration
The daemon's behavior with respect to the [service type](#supported-service-types), [SSL](#ssl), [blockchain interactions](#blockchain), etc. is configurable via a configuration file, environment variables, and executable flags. See [this](/docs/all/archive/alpha/Platform-How-Tos.md#configure-singularitynet-daemon) for a description of the available configuration keys.

## Payment channel state
The daemon stores the payment channel state in an etcddb cluster. This is detailed [here](/docs/all/mpe/payment-channel-storage). 
