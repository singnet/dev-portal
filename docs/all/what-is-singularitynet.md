---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: What is SingularityNET?

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

SingularityNET is an open and decentralized network of AI services made accessible through the blockchain. AI developers publish their services onto the SingularityNET network where they can be used by anyone with an internet connection. AI developers are able to charge for the use of their services using the native AGI token -- an ERC20 token hosted on Ethereum.

AI services span the entire gamut of offerings in artificial intelligence and machine learning. AI developers can provide services for inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. AI services can be as small as individual algorithms or large as end-to-end solutions and standalone AI applications. AI developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform contains a number of critical components that work together to enable a decentralized network of AI services to flourish. The core components include many architectural components that allow for a functional, scalable, and extensible system. We arrived at this architecture through a careful process guided by a few key decisions governing blockchain
interactions, AI service integration, and abstraction and by the goal of building an AI marketplace that is both open and compliant with regulatory and legal requirements.

First, we made the conscious choice to minimize our dependence on our current blockchain, Ethereum. Both conceptual and practical issues motivated this decision. Conceptually, we desire to be blockchain-agnostic and will consider building our own consensus algorithm based on reputation. The speed, reliability, and costs of Ethereum blockchain interactions dictate that any
scalable system built on top of it must minimize gas costs and the delays introduced by block-mining time. These decisions are reflected in our use of tools to abstract away all blockchain interactions (the daemon, CLI, and SDK) and in our use of a multi-party escrow contract and atomic unidirectional channels for payments.

Second, on AI services integration, we wanted to abstract away as much of the network as possible, from an AI developer's perspective, in order to reduce the learning curve and minimize the overhead associated with providing AI services via the network. Moreover, we wanted to achieve this abstraction with a single flexible tool, the daemon, that also helps us provide scalability, robustness, distribution and management features.

Finally, to make our marketplace compliant with regulations without compromising on openness, we implemented a fully decentralized registry of AI services available on the platform.

The SingularityNET platform and network can be broken down into several core components:
* **Agents:** An Agent is an AI service that has been published onto the SingularityNET network. It has an associated Agent contract that manages pricing and exposes metadata such as the service endpoint. End users interact with the Agent contract on-chain to purchase access to a service using SingularityNET's native AGI token.

* **Registry**: The Registry is where AI service providers register on the platform, which involves
providing text descriptions and tags to allow users to discover their service, pricing information,
and information such as gRPC models and endpoint locations to allow users to call their services using the AGI token.

* **SNET Daemon:** An AI service developer exposes their service to the network by running the SNET Daemon alongside their service. The SNET Daemon interacts with the blockchain to facilitate authorization and payment for services and acts as a passthrough for making API calls to the service.

* **Escrow:** The escrow contract on the blockchain holds AGI funds in escrow during interaction between an end-user and an Agent. An end-user places funds in Escrow before a service can be called, and there are not released from escrow until the services have been delivered or the they timeout.

* **SNET DApp:** The SingularityNET DApp is a front-end for exploring available AI services and interacting with them through a web-UI. It also handles payment for services (through MetaMask integration) and service ratings. The DApp
  * reads data from the on-chain Registry and pairs it with off-chain metadata, allowing AI
services to be searched, filtered, and discovered;
  * integrates the SingularityNET curation service, displaying from the Registry only those
services that have been vetted and whose owners have undergone due diligence and
signed legal agreements that protect user privacy and data;
  * allows AI services to display custom UI components for user interactions (gathering
inputs for service execution and displaying results);
  * integrates with Multi-Party Escrow, enabling the user to pay for service usage;
  * allows consumers to rate services they have used; this is a simple rating component that
will eventually be replaced by SingularityNET's Reputation System (currently under
development); and
  * captures usage metrics at a consumer level.

* **SingularityNET SDK:** The software development kit was designed for application developers who want to use the network’s intelligence in their applications. It automatically compiles client-side code for interacting with the platform and with specific services, allowing service requests to be coded in a straightforward way and supporting payment and interactions with the blockchain.

Those are the core components of the platform. Two key support components are also worth
mentioning:
* **The CLI:** provides command line APIs for a number of crucial service developer and service owner tasks: registering and managing identities, publishing services, updating registration information, notifying the platform of new endpoints, managing payment channels and balances, and calling services.

* **The Request for AI Portal (RFAI):** is a DApp through which end users and application
developers can request specific AI services they would like added to the network and
stake AGI tokens as a reward for high-quality solutions.

The diagram below depicts the key components along with auxiliary components and their
roles.

<img src="docs/all/mpe/img/platform_components.jpg" width="400">


## Current state of development

SingularityNET raised funds to build out our platform during our Token Generation Event (TGE) in December 2017. Since then we've been working quickly to build upon our platform and finalize designs for our production platform which will go into Beta in February 2019.

Active development on our platform is still continuing as we add additional capabilities to enable AI developers to begin launching services onto the network. Our goal is to help the community build out a vibrant network of useful AI services.

To keep abreast of SingularityNET development and platform design changes, follow the pinned repos on our [github account](https://github.com/singnet).

## Find out more
To get started with the SingularityNET platform review the [Getting Started](/docs/all/getting-started) and [Fact Sheet](/sheet) pages.
