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

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: SDK
        url: '/docs/concepts/sdk'
    next:
        content: The Daemon API 
        url: '/docs/concepts/daemon-api'
        
---
The [SingularityNET daemon](https://github.com/singnet/snet-daemon) is the adapter that a service can use to interface with the SingularityNET platform.
In software architecture lingo, the daemon is a [sidecar proxy](https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar), —a process deployed next to a core application (the AI service, in this case) to abstract away some architectural concerns such as logging and configuration as well as entire platform aspects, such as the interaction with smart contracts or even the decision to use the Ethereum Blockchain.
The two key abstraction responsibilities of the daemon are payments and request translation. In order to authorize payments, the daemon interacts with the Multi-Party Escrow contract.
Before invoking a service through SingularityNET, a consumer must have
1. funded the Multi-Party Escrow contract (see section on payments below) and
2. opened a payment channel with the recipient as specified by the service definition
With each invocation the daemon checks that
1. the signature is authentic,
2. the payment channel has sufficient funds, and
3. the payment channel expiry is beyond a specified threshold (to ensure that the developer can claim the accrued funds).

After these successful checks, the request is proxied to the service. The daemon also keeps track of payment states of different clients.
