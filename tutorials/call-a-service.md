---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: How to Call a SingularityNET Service
description: How to interact with services on the SingularityNET platform

# extralink box
extralink:
    title: All Docs
    title_url: '/docs/all'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Back to Create A Wallet
        url: '/tutorials/create-a-wallet'
    next:
        content: Call a Service via the SDK
        url: '/tutorials/sdk'
---

## Step 1. Get some Ether

Ether is used to pay for interactions on the block chain (known as gas).

The transactions you make a call to SingularityNET are:
- Transfer AGI into the multi-party escrow account,
- Create a payment channel for a service published in the SingularityNET registry, and
- Transfer AGI into the payment channel and set the timeout

After that, you interact with the service directly and won't need to pay for further transactions unless you want add more AGI
or extend the timeout for the payment channel.

So how do you get Ether? The mainnet requires you to buy or mine it, but we're going to use a test net for now. Specifically Ropsten.

Luckily for test networks you can [go to a faucet to request some Ether for free](https://faucet.ropsten.be/).

To use the faucet you need to [TODO: create a wallet](tutorials/create-a-wallet), and then provide them with your wallets public address.
If you are following the Getting Started guide, this was the previous page.

## Step 2. Get some AGI

We provide a faucet to get AGI for either Ropsten or Kovan networks: https://faucet.singularitynet.io/

You'll need a github account to authenticate, and there after you can request AGI every 24 hours. (TODO confirm this timeout period is correct)

## Step 3. Make a Call from the Marketplace

TODO someone needs to step through with the final beta UI taking screenshots

## Step 4. Setup the `snet` CLI tool

The `snet` CLI tool is your swiss army knife for working with SingularityNET. It lets you publish services, manage your identities, and query what AI services are available to use. If you are familar with cloud providers like Amazon or Google, this is our decentralised equivalent of their `aws` or `gcloud` respectively.

## Step 5. Make a Call from the Command Line

```
snet client call ...
```

## Step 6. Congratulations!

You've managed to set up your environment to interact with SingularityNET.

While these ways of working with SingularityNET are very powerful (we've barely touched on all the things the CLI is used for),
this isn't how you'd necessarily build an application that is integrated with SingularityNET services. To do that, we recommend 
that you expore our SDK. Which is the 
