---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: snetd - SingularityNET Daemon
description: Learn about the daemon - how it interacts with the SingularityNET Marketplace and the Ethereum Blockchain.

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

#Daemon
The SingularityNET daemon is an adapter that a service uses to interface with the SingularityNET platform. In software architecture lingo, the daemon is referred to sidecar proxy, — a process deployed next to a core application (the AI service, in this case) to abstract architectural details, such as logging and configuration, and the platform - interaction with smart contracts or even the decision to use the Ethereum blockchain. 
The two key responsibilities of the daemon are as follows:
- Payments transaction and 
- Request translation. 

The daemon interacts with the Multi-Party Escrow contract to authorize payments,.
The consumer must meet the following requirements before invoking a service through SingularityNET,
1.	The Multi-Party Escrow contract is appropriately funded (see section on payments below) and
2.	Ensure the payment channel is opened with the recipient as specified by the service definition With each invocation the daemon checks that
3.	Signature is authentic,
4.	Payment channel contains sufficient funds, 
5.	Payment channel expiry time is beyond a specified threshold (to ensure that the developer can claim the accrued funds).
After meeting successful verifying the above requirements, the request is proxied to the service. 

**Note**: The daemon keeps track of payment states of different clients.

image

Once the daemon has validated the requests, translates them into the format expected by the AI service. The daemon exposes a gRPC, so that all the requests are based on gRPC and protocol buffers, 

**Note**:  Daemon can translate requests to a few additional formats, as expected by the service: in addition to gRPC/Protobuf, JSON-RPC and process fork–based services (executables to be executed on a per-call basis with the input parameters on standard input) are supported. This translation enables one consistent protocol to be used to communicate with any service on SingularityNET. 

The daemon and CLI uses gRPC and Protobuf for communication. You can deploy multiple instances of an AI service. Each instance contains own sidecar daemon, and all daemons are registered as endpoints in the Registry. 
When multiple instances co-exist, the instances can also be stored as an instance groups (to group instances in the same data center or cloud region). Daemons in the same group coordinate to share payment status information through etcd. 

The daemon provides some additional deployment and administration-oriented features:
- Secure Socket Layer (SSL) termination. 
    Perform either with a certificate and keyfile shared by the service developer or with automatic certificates provided by Let’s Encrypt.

- Logging to files, with log rotation and pluggable log hooks. 
    Currently an email hook is provided, and an easy-to-use API is available for other hooks.

- Metrics, monitoring, and alerts. 
    The service owners can optimize their resource usage by utilizing the daemon collected metrics about the request calls. Besides, monitoring the daemon and the service events, and configuring alerts through email or web services.

- Rate limiting to prevent Denial-Of-Service (DoS) attacks
    To allow service owners to perform  efficiently through speed and ability. The daemon uses the token bucket algorithm.

- Heartbeat. 
    A pull-based heartbeat service uses gRPC health checking protocol. The daemon checks the heartbeat of the configured service by monitoring services as well as the Marketplace DApp.

The latest version is {{ data.versions.snet-daemon }}, and can be downloaded from the release page.

## Supported Service Types

The daemon is created to support a variety of service implementations. 
Currently, the daemon exposes the following services:

- gRPC endpoint,
- JSON-RPC endpoint, 
  - or -
    Executables called on a per-request basis with the input parameters on stdin
    Note:  Daemon exposes a gRPC/gRPC-Web endpoint regardless of the type of service paired with the daemon. This creates one consistent protocol to communicate with any service on the SingularityNET network, while allowing service authors to remain flexible during the implementations. Some gRPC features, such as streaming, expects the service to expose a gRPC endpoint with streaming RPCs (streaming is also a work in progress, see here). Bi-directional streaming RPCs are compatible with some gRPC clients (not gRPC-Web i.e. browser clients).

##Service Models

As noted when discussing Services, the service API is defined using protobuf.

## SSL
The daemon supports SSL termination using a developer-supplied certificate and keyfile. For more information, refer to the SSL guide . For step-by-step procedure on how to implement, refer to Let's Encrypt.

## Authorisation and Payment

Before invoking a service through the SingularityNET platform, a consumer must meet the following requirement: 

 - Opened a payment channel with the recipient as specified by the Organization metadata.

With each invocation the daemon verifies the following:
- Multi-Party Escrow contract is sufficiently funded. For more information, refer to  Multi-Party Escrow contract
- Payment channel is opened with the recipient based on service definition 

With each invocation the daemon checks the following:
- Signature is authentic,
- Payment channel contains sufficient funds, 
- Payment channel expiry time is beyond a specified threshold (to ensure that the developer can claim the accrued funds).

After meeting successful verifying the above requirements, the request is proxied to the service.

## Configuration

The performance of daemon with respect to  service type, SSL, blockchain interactions, etc. can be controlled through the following methods:
- Configuration file
- Environment variables
- Executable flags. 

For more information about how to configure daemon for efficient performance using the available configuration keys, mapping to environment variables and handling runtime flags., click on this link  the daemon's README  

## Payment channel state
The daemon stores the payment channel state in an etcddb cluster. 

This cluster can either be one of the following:
- embedded etcd instance that runs in connection with each snetd replica (default)
- externally configured cluster. 

For more information, click on this link here. ETCD cluster
