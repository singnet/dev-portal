---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to Create a Wallet
description: Create a wallet so you can interact with the Ethereum blockchain

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

## Step 1. MetaMask

[MetaMask](https://metamask.io/) is an internet browser [extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) that allows users to interact with the Ethereum blockchain and its decentralized applications. MetaMask serves as your access portal for both the Ethereum Mainnet and Ropsten.

## Step 2. Create an Identity

On first start up, MetaMask should ask you to create an identity which will be used for blockchain transactions and storing tokens. You will need to create a password for MetaMask, and then save the generated seed phrase for your wallet.

>NOTE: The seed phrase is like a pin code to your MetaMask account and helps you recover it in case you lose access to it. Never ever show, or give, this seed phrase to someone, and save it somewhere safe.

For complete instructions on how to use MetaMask, check their [instructional video](https://www.youtube.com/watch?time_continue=6&v=ZIGUC9JAAw8).

After you create your wallet, you can transfer funds to it and start using the [SingularityNET DApp](https://beta.singularitynet.io/) on Mainnet! You can check our [video tutorial](https://www.youtube.com/watch?v=j_9yLRQ1bE4) to learn how to use the DApp!
If you are interested in using the Ropsten network for testing the platform with testnet tokens, please continue reading the next steps.

## Step 3. What are the different networks?

Deploying decentralized applications on the Ethereum main network requires the use of real Ethereum coins. Real Ethereum coins are valuable. Developers want to test their software before launching on the Ethereum main network to minimize catastrophic consequences arising from oversights in coding. Thus, the Ethereum Test Networks allow developers to simulate how their DApps would perform, before launching in a more risky situation.

SingularityNET previously used the Kovan and Ropsten network for the Alpha and Beta Test Net version of our platform, but we will now be switching to the Ethereum Mainnet. The Ropsten version of the marketplace will still be accessible for now for testing purposes but may be disabled in the future. The Ropsten network works with PoW (proof-of-work) and is more similar to the environment used in Ethereum’s main network. The Kovan Network will completely be disabled.

You can change the Ethereum network on the top of the MetaMask extension.

>NOTE: Use the SingularityNET Marketplace in Mainnet Mode whenever you want to integrate an AI service into your software. Use the SingularityNET Marketplace in Ropsten Mode whenever you want to test the platform as a developer. Do not integrate AI services from the Ropsten Network in your software, as their continuous availability is not guaranteed.

## Step 4. Ethereum Faucet (Ropsten Test Network Only)

Ethereum Ropsten coins are free to claim and can be used to test the platform. Ropsten Ethereum is needed to cover the Gas costs associated with transactions on the platform. Users are required to visit a [Ropsten Faucet]({{ site.data.faucets.eth }}), which is a per-request Ropsten Ethereum distribution hub. Users provide their Ropsten Ethereum wallet address from MetaMask to the faucet and it issues a set amount of Ropsten Ethereum to the requesting wallet.

## Step 5. AGI Faucet (Ropsten Test Network Only)

In order to have Ropsten AGI to test the platform, users are required to visit the [AGI Faucet]({{ site.data.faucets.agi }}), which is a per-request Ropsten AGI distribution hub. In this case, users provide their Ropsten Ethereum wallet addresses to the Faucet, and a set amount of Ropsten AGI will be transferred to the requesting wallet. In order to receive these tokens, the user must log in via [GitHub](https://github.com/) to access the AGI Ropsten Faucet.
