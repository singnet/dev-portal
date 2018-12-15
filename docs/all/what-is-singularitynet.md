---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: What is SingularityNET?
description: A brief introduction.

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

## What is SingularityNET?
SingularityNET is an open and decentralized network of AI services made accessible through the blockchain. AI developers publish their services onto the SingularityNET network where they can be used by anyone with an internet connection. AI developers are able to charge for the use of their services using the native AGI token -- an ERC20 token hosted on Ethereum.

AI services span the entire gamut of offerings in artificial intelligence and machine learning. AI developers can provide services for inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. AI services can be as small as individual algorithms or large as end-to-end solutions and standalone AI applications. AI developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform and network can be broken down into several core components:
* **Agents:** An Agent is an AI service that has been published onto the SingularityNET network. It has an associated Agent contract that manages pricing and exposes metadata such as the service endpoint. End users interact with the Agent contract on-chain to purchase access to a service using SingularityNET's native AGI token.

* **Registry**: AI services are published onto a publicly accessible central registry on the blockchain. The registry maintains a list of active Agents on the network that expose services which can be called using the AGI token.

* **SNET Daemon:** An AI service developer exposes their service to the network by running the SNET Daemon alongside their service. The SNET Daemon interacts with the blockchain to facilitate authorization and payment for services and acts as a passthrough for making API calls to the service.

* **Escrow:** Currently exposed as a *Job* contract on the blockchain, AGI funds are held in escrow during interaction between an end-user and an Agent The escrow is funded before a service can be called and funds are not released from escrow until the services have been delivered.

* **SNET DApp:** The SingularityNET DApp is a front-end for exploring available AI services and interacting with them through a web-UI.

## Current state of development
SingularityNET raised funds to build out our platform during our Token Generation Event (TGE) in December 2017. Since then we've been working quickly to build upon our platform and finalize designs for our production platform which will go into Beta in February 2019.

Active development on our platform is still continuing as we add additional capabilities to enable AI developers to begin launching services onto the network. Our goal is to help the community build out a vibrant network of useful AI services.

Designs for our production platform and associated development roadmap will also be published to the wiki as they are finalized.

## Find out more
To get started with the SingularityNET platform review the [Getting Started](docs/getting-started) and [Fact Sheet](/sheet) pages.
