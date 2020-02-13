---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: Introduction

# Micro navigation
micro_nav: true

---

## Overview

SingularityNET (SNET) is an open and decentralized network of AI services made accessible through the Blockchain. Developers publish their services to the SingularityNET network, where they can be used by anyone with an internet connection. Developers are able to charge for the use of their services using the native AGI token.

Services can span the entire gamut of offerings in artificial intelligence and machine learning. Services can provide inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. The services can be as simple as wrapping a well-known algorithm such as A* path planning, a complete end-to-end solution for an industry problem, or a standalone AI application. Developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform contains a number of critical components that work together to enable a decentralized network of AI services to flourish. The core components are designed to allow for a functional, scalable, and extensible system. We arrived at the current architecture through a careful process, guided by a few key decisions governing Blockchain
interactions, AI service integration, and abstraction and by the goal of building an AI marketplace that is both open and compliant with regulatory and legal requirements.

First, we made the conscious choice to minimize our dependence on our current Blockchain, Ethereum. Both conceptual and practical issues motivated this decision. Conceptually, we desire to be Blockchain-agnostic and, if necessary, will consider building our own consensus algorithm based on reputation. The speed, reliability, and costs of Ethereum Blockchain interactions dictate that any
scalable system built on top of it must minimize gas costs and the delays introduced by block-mining time. These decisions are reflected in our use of tools to abstract away all Blockchain interactions (the daemon, CLI, and SDK) and in our use of a multi-party escrow contract and atomic unidirectional channels for payments.

Second, on AI services integration, we wanted to abstract away as much of the network as possible, in order to reduce the learning curve and minimize the overhead associated with providing AI services via the network. This abstraction is achieved with a single flexible tool, the daemon, that will help us provide scalability, robustness, distribution, and management features to the entire community.

Finally, to make our marketplace compliant with regulations without compromising on openness, we implemented it separately from our fully decentralized registry of AI services currently available on the Blockchain.

## Concepts and Components

Here we've broken down the SingularityNET platform and network into its core components. The diagram below depicts the key components along with auxiliary components and their
roles.

![components](/assets/img/platform_components.jpg)
  
 You can jump directly to the thing you'd like to know more about, or use the navigation on each page to read through them in turn. 

**The Request for AI Portal (RFAI):** is a DApp through which end users and application developers can request specific AI services they would like added to the network and stake AGI tokens as a reward for high-quality solutions.






