---
# Page settings
layout: default
keywords:
comments: false

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
The [SingularityNET daemon](https://github.com/singnet/snet-daemon) is the adapter that a service can use to interface with the SingularityNET platform.

In software architecture lingo, the daemon is a [sidecar proxy](https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar), —a process deployed next to a core application (the AI service, in this case) to abstract away some architectural concerns such as logging and configuration as well as entire platform aspects, such as the interaction with smart contracts or even the decision to use the Ethereum Blockchain.

The two key abstraction responsibilities of the daemon are payments and request translation. In order to authorize payments, the daemon interacts with the Multi-Party Escrow contract.

Before invoking a service through SingularityNET, a consumer must have
1. funded the Multi-Party Escrow contract (see section on payments below) and
2. opened a payment channel with the recipient as specified by the service definition

With each invocation the daemon checks for the following:
1. the signature is authentic,
2. the payment channel has sufficient funds, and
3. the payment channel expiry is beyond a specified threshold (to ensure that the developer can claim the accrued funds).

After performing the above checks, the request is proxied to the service.

Besides, the daemon monitors the payment states of different clients.

<img src="/assets/img/daemon_diagram.jpg" width="400">

After the requests are validated by the daemon, they are translated into the format recognizable by AI service.

The daemon exposes a [gRPC](https://grpc.io/), so all requests are based on gRPC and [protocol buffers](https://developers.google.com/protocol-buffers/), but it can translate requests to a few different formats, as expected by the service: in addition to gRPC/Protobuf, JSON-RPC and process fork–based services (executables to be executed on a per-call basis with the input parameters on standard input) are supported.

This translation enables the usage of one consistent protocol  to communicate with any service on SingularityNET.

The daemon and CLI also use gRPC and Protobuf for communication.

One can deploy multiple instances of an AI service. Each instance can have its own sidecar daemon, and all daemons are registered as endpoints in the Registry.

When multiple instances are available, they can be grouped in to multiple instance groups (a typical reason for doing so would be to group instances in the same data center or cloud region).

Daemons within the group coordinate to share payment status information through [etcd](https://coreos.com/etcd/).

The daemon provides some additional deployment- and administration-oriented features:
* SSL termination. This can be done either with a certificate and keyfile supplied by the service developer or with automatic certificates provided by [Let’s Encrypt](https://letsencrypt.org).
* Logging to files, with log rotation and pluggable log hooks. Currently an email hook is
provided, and an easy-to-use API is available for other hooks.
* Metrics, monitoring, and alerts. The daemon collects metrics about request calls, which service owners can use to optimize their resource usage. It also monitors daemon and service events, providing configurable alerts via email or web services.
* Rate limiting to prevent DoS attacks and to allow service owners to scale at their own
speed and ability. The daemon uses the [token bucket](https://en.wikipedia.org/wiki/Token_bucket) algorithm.
* Heartbeat. A pull-based heartbeat service is provided, following the [gRPC health
checking protocol](https://github.com/grpc/grpc/blob/master/doc/health-checking.md). The daemon will check that the heartbeat of the service is configured; this is used by monitoring services as well as the Marketplace DApp.

The latest version is {{ data.versions.snet-daemon }}, and can be [downloaded from the release page](https://github.com/singnet/snet-daemon/releases).

## Supported Service Types

The daemon has been written to support a variety of service implementations. Currently, the daemon supports services that either:

- expose a gRPC endpoint,
- expose a JSON-RPC endpoint, or
- executables called on a per-request basis with the input parameters on `stdin`

Note however that the daemon exposes a gRPC/gRPC-Web endpoint regardless of what type of service is paired with the daemon.

This means we have one consistent protocol to be used to communicate with any service on the SingularityNET network, while still allowing service authors to have flexibility in their implementations. Certain gRPC features such as streaming require the service itself to expose a gRPC endpoint with streaming RPCs. Also note that bi-directional streaming RPCs are only compatible with some gRPC clients (not gRPC-Web i.e. browser clients).

### Service Models

As noted when discussing [Services](/docs/ai-developers/service), the service API is defined using [protobuf](https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition).

## SSL

The daemon supports SSL termination using a developer-supplied certificate and keyfile. See our [SSL guide](/tutorials/daemon-ssl-setup) for step-by-step instructions on how to set this up with [Let's Encrypt](https://letsencrypt.org/).

## Authorisation and Payment

Prior to invoking a service through the SingularityNET platform, a consumer must have:
- Funded the [Multi-Party Escrow contract](/docs/ai-developers/mpe); and
- Opened a payment channel with the recipient as specified by the [Organization metadata](/docs/ai-developers/organization).

With each invocation the daemon checks:
- that the signature is authentic;
- that the payment channel has sufficient funds; and
- that the payment channel expiry is beyond specified threshold (to ensure that the service author can claim the accrued funds after delivering the service).

After these checks are successful the request is proxied to the service.

## Configuration

The daemon's behavior with respect to the [service type](#supported-service-types), [SSL](#ssl), Blockchain interactions, etc. can be controlled via a configuration file, environment variables, and executable flags. See [the daemon's README](https://github.com/singnet/snet-daemon#configuration) for a description of the available configuration keys and how they map to environment variables and runtime flags.

## Payment channel state

The daemon stores the payment channel state in an etcddb cluster. This cluster can either be an embedded etcd instance that runs in connection with each snetd replica (default) or an externally configured cluster. This is detailed [here](/docs/ai-developers/daemon-channel-storage).
[ETCD cluster](/docs/ai-developers/etcdsetup).
