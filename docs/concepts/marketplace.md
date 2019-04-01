---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: SingularityNET Marketplace

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
        content: Concepts Overview
        url: '/docs/concepts'
    next:
        content: 
        url: '/docs/concepts/service'
---

The [SingularityNET Marketplace](http://beta.singularitynet.io) provides an easy way for people browse available AI services and interact with them via a web interface.

![marketplace](/assets/img/marketplace.png)

While SingularityNET the platform is open and decentralised, the Marketplace is the SingularityNET Foundation's curated view of it. This allows the foundation to provide oversight and adhere to legal requirements requirements in different legislative regions.

Our marketplace is implemented as decentralized application (DApp), with AI services published on both the main Ethereum network and the Ropsten test network.

The Marketplace and SingularityNET is in beta, but still under heavy development. See our [current status](/docs/current-status) page for ways to to stay informed of changes, or follow the [github repo](https://github.com/singnet/snet-dapp).

# Calling a Service

The Marketplace is a DApp, which means in order to use it you need to install a ethereum browser extension like [MetaMask](https://metamask.io/). This extension carries out interactions with the blockchain on your behalf, allows you to transfer tokens between wallets, and invoke contracts.

In the context of the marketplace it lets you query what services are available, transfer AGI funds into escrow, and setup payment channels that allow you call any of the listed services.

For a full guide on getting your wallet and browser setup, see our [Setup Guide](/docs/setup).

# Marketplace Requirements

We mandate a number of requirements before your service is visible to others. To get your service listed on the marketplace you must:

0. Build and [publish your service](/tutorial/publish) ;-)
1. Ensure you are using SSL with the snet-daemon. We recommend using [certbot and letsencrypt](https://certbot.eff.org/) if you don't already have a SSL certificate.
3. Fork the snet-dapp repo, build a react component as the user interface for your service, and submit a pull request. Let us know what networks your service is on, and the organisation and service names used. More details are in the [dapp repo README.md](https://github.com/singnet/snet-dapp#ui-for-services).
4. Last is some paperwork that we are still finalising, and we'll update this list when we have that. If you are itching to get your service listed, reach out to us via one of our [community](/docs/community) groups.
