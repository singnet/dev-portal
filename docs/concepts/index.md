---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: Introduction

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


## SingularityNET Introduction

SingularityNET(SNET) is an open and decentralized network of AI services made accessible
through the Blockchain. The core component design of the platform has several critical
components that allow for a functional, scalable, and extensible system.
We arrived at the current architecture on the basis of the following aspects:
* Few key decisions governing blockchain interactions, AI service integration, and
abstraction
* The goal of building an AI marketplace that is both open and compliant with regulatory
and legal requirements
At SingularityNET, we want to reduce dependency on our current blockchain, Ethereum. Both
conceptual and practical issues motivated this decision. Conceptually, we aim to be blockchain-
agnostic and can consider building our Consensus algorithm based on reputation. The speed,
reliability, and costs of Ethereum blockchain interactions dictate that any scalable system built
on top of it must minimize gas costs and the delays introduced by block-mining time. The tools
to abstract away all blockchain interactions (the daemon, CLI, and SDK), a multi-party escrow
contract, and atomic unidirectional channels for payments reflect these decisions.
At SingularityNET, we focus on AI services integration abstracting as much of the network as
possible, to reduce the learning curve and minimize the overhead associated with providing AI
services via the network. We achieve this abstraction using a tool, daemon, that provides
scalability, robustness, distribution, and management features to the entire community.
