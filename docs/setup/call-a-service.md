---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to Call a SingularityNET Service
description: How to interact with services on the SingularityNET platform

# extralink box
extralink:
    title: All Docs
    title_url: '/docs/'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true
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

Luckily for test networks you can [go to a faucet to request some Ether for free]({{ site.data.faucets.eth }}).

To use the faucet you need to [create a wallet](/docs/setup/create-a-wallet), and then provide them with your wallet's public address.

## Step 2. Get some AGI

We provide a faucet to get AGI for either Ropsten or Kovan networks: [{{ site.data.faucets.agi }}]({{ site.data.faucets.agi }})

You'll need a github account to authenticate, and there after you can request AGI every 24 hours.

## Step 3. Make a Call from the Marketplace

Follow this [video tutorial](https://www.youtube.com/watch?v=j_9yLRQ1bE4).

## Step 4. Setup the `snet` CLI tool

The `snet` CLI tool is your swiss army knife for working with SingularityNET. It lets you publish services, manage your identities, and query what AI services are available to use. If you are familar with cloud providers like Amazon or Google, this is our decentralised equivalent of their `aws` or `gcloud` respectively.

You can install the CLI with pip:

```
sudo pip3 install snet-cli
```

You then need to create an identity that matches your metamask account, since this is where the faucets sent all your test tokens too.

```
snet identity create YOURNAME key
```

You will be prompted for the private key for your wallet. To get this, click "Show your account details" on metamask, and "export your private key". This will ask for your metamask password. Once you enter it, you can then copy your private key and paste it into the snet cli. Next, you should probably copy some meaningless text to your clipboard to avoid accidentally pasting the key somewhere it shouldn't go.

WARNING: Your private key is like the password to your online banking. Be very careful with it. Anyone who has it can control where your funds go. 

SingularityNET takes your security seriously and any vulnerabilities can be reported on our Github (if minor), or emailed to [security@singularitynet.io](mailto:security@singularitynet.io)

## Step 5. Make a Call from the Command Line

TODO

```
snet client call ...
```

## Step 6. Congratulations!

You've managed to set up your environment to interact with SingularityNET and call services via the marketplace and the command line.

While these ways of working with SingularityNET are very powerful (we've barely touched on all the things the CLI is used for),
this isn't how you'd necessarily want to build an application that is integrated with SingularityNET. To do that, we recommend 
that you learn about our SDK which is the next article in our Getting Started series.
