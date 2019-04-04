---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: Concepts and Components

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
    next:
        content: Marketplace
        url: '/docs/concepts/marketplace'
---

## Overview

SingularityNET (SNET) is an open and decentralized network of AI services made accessible through the blockchain. Developers publish their services to the SingularityNET network, where they can be used by anyone with an internet connection. Developers are able to charge for the use of their services using the native AGI token.

Services can span the entire gamut of offerings in artificial intelligence and machine learning. Services can provide inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. The services can be as simple as wrapping a well-known algorithm such as A* path planning, a complete end-to-end solution for an industry problem, or a standalone AI application. Developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform contains a number of critical components that work together to enable a decentralized network of AI services to flourish. The core components are designed to allow for a functional, scalable, and extensible system. We arrived at the current architecture through a careful process, guided by a few key decisions governing blockchain
interactions, AI service integration, and abstraction and by the goal of building an AI marketplace that is both open and compliant with regulatory and legal requirements.

First, we made the conscious choice to minimize our dependence on our current blockchain, Ethereum. Both conceptual and practical issues motivated this decision. Conceptually, we desire to be blockchain-agnostic and, if necessary, will consider building our own consensus algorithm based on reputation. The speed, reliability, and costs of Ethereum blockchain interactions dictate that any
scalable system built on top of it must minimize gas costs and the delays introduced by block-mining time. These decisions are reflected in our use of tools to abstract away all blockchain interactions (the daemon, CLI, and SDK) and in our use of a multi-party escrow contract and atomic unidirectional channels for payments.

Second, on AI services integration, we wanted to abstract away as much of the network as possible, in order to reduce the learning curve and minimize the overhead associated with providing AI services via the network. This abstraction is achieved with a single flexible tool, the daemon, that will help us provide scalability, robustness, distribution, and management features to the entire community.

Finally, to make our marketplace compliant with regulations without compromising on openness, we implemented it separately from our fully decentralized registry of AI services currently available on the blockchain.

## Concepts and Components

Here we've broken down the SingularityNET platform and network into its core components. The diagram below depicts the key components along with auxiliary components and their
roles.

<img src="/assets/img/platform_components.jpg">

You can jump directly to the thing you'd like to know more about, or use the navigation on each page to read through them in turn.

* [**SingularityNET Marketplace**](/docs/concepts/marketplace) - The SingularityNET Marketplace is a DApp ("Distributed App") and provides a front-end for exploring AI services available on the network. Users can interact with and call them through a web interface, and rate them afterwards. This allows the community to provide feedback and to get a sense of the level of quality that can expected from a service, and will eventually feed into our reputation engine.
* [**Service**](/docs/concepts/service) - A Service is published to the SingularityNET network and provides a [grpc](https://grpc.io)-based API for calling it. The service API specification, the IP address where it can be accessed, and the pricing information is published to IPFS as service metadata. This location of this metadata is then advertised in the SingularityNet Registry.
    * [Service Metadata](/docs/concepts/service-metadata) - The metadata describes the service's API, payment method, and where to find the service.
    * [Naming Standards](/docs/concepts/naming-standards) - We ask that people follow various guidelines for how to name their services.
* [**Software**](/docs/concepts/software)
    * [**snet-cli**](/docs/concepts/snet-cli) - The `snet` command line tool lets you interact with the platform: whether that's to call and query services, or publish your own. It allows crucial tasks such as: registering and managing identities, publishing services, updating registration information, notifying the platform of new endpoints, managing payment channels and balances, and calling services.
    * [**SDK**](/docs/concepts/sdk) - The software development kit (SDK) helps you integate SingularityNET services with your own software.
    * [**SNET Daemon**](/docs/concepts/daemon) - A developer exposes their service to the network by running the SNET Daemon alongside their service. The SNET Daemon interacts with the blockchain to facilitate authorization and payment for services and acts as a passthrough for making API calls to the service. This isolates the payment and blockchain interaction so a developer can focus on deploying and improving their service.
        * [Daemon API](/docs/concepts/daemon-api)
        * [Daemon Channel Storage](/docs/concepts/daemon-channel-storage)
* [**Blockchain Contracts**](/docs/concepts/blockchain-contracts)
    * [**AGI Token**](/docs/concepts/agi-token) - Our utility token to be exchanged for AI service, it is an ERC20 token hosted on Ethereum.
    * [**Registry**](/docs/concepts/registry) - Services are published to a publicly-accessible central registry on the blockchain. The registry maintains a list of active services on the network and where to find a services corresponding metadata. The Registry has support for grouping services by organisation or team, along with access control for organisation members.
    * [**Escrow**](/docs/concepts/multi-party-escrow) - The escrow contract on the blockchain holds AGI funds in escrow during interaction between an end-user and a service. An end-user places funds in escrow before a service can be called, and remain there until the service has been delivered or the escrow funds timeout.
        * [MPE Stateless Client](/docs/concepts/mpe-stateless-client)
* **The Request for AI Portal (RFAI):** is a DApp through which end users and application developers can request specific AI services they would like added to the network and stake AGI tokens as a reward for high-quality solutions.

