---
layout: default
keywords: agi token
comments: false

# Hero section
title: AGI Token
description:

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: true
    description: Find an overview of our full documentation here.

# Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Blockchain Contracts
        url: '/docs/concepts/Blockchain-contracts'
    next:
        content: Registry Contract
        url: '/docs/concepts/registry'
    
---

SingularityNET uses the AGI Token for its marketplace. The AGI Token is an ERC-20 token hosted on the Ethereum Blockchain. Right now, we are in the `beta` phase of the SingularityNET Marketplace. That means that you will need to use Kovan or Ropsten Testnet AGI to work with our tools. You can get Kovan or Ropsten Testnet AGI by following the instructions [here](#agi-faucet).

## Testnet AGI vs Mainnet AGI
For those new to Ethereum, it may be a bit confusing what exactly the difference between Testnet and Mainnet tokens are. In principle, you can distinguish them as follows:
* Testnet tokens are used to test software applications with, try out demos, or in our case the Beta.
* Mainnet tokens are used for officially deployed software.
* Testnet tokens never have a monetary value.
* Mainnet tokens could have a monetary value.
* Both tokens can be used to add extra utility to the software.

Since we are currently in the Beta stage, we only use Kovan and Ropsten Testnet AGI. You can find our Mainnet AGI Token (to be used in a later stage) [here](https://etherscan.io/address/0x8eb24319393716668d768dcec29356ae9cffe285) with the address `0x8eb24319393716668d768dcec29356ae9cffe285`.

<div class="callout callout--warning">
    <p><strong>NOTE</strong> While we are aware that the AGI token is currently being traded on some exchanges, we do not encourage or facilitate this exchange trading in any manner. Speculative secondary trading is against the spirit of the AGI token and SingularityNET project. We strongly discourage speculative secondary trading and officially ask AGI token holders to act accordingly.</p>
</div>


## AGI Faucet
We have an automated faucet for distributing Kovan and Ropsten Testnet AGI Tokens [here]({{ site.data.faucets.agi }}). You will need to login using your GitHub account and input the Ethereum address where you want to receive the AGI token. Make sure this address is a Kovan Ethereum Address. You can request 1 AGI token every 24 hours.

In order to add the Kovan Testnet AGI you may need the following details:
* Symbol: AGI
* Decimals: 8
* Kovan Token Address: [0x3b226ff6aad7851d3263e53cb7688d13a07f6e81](https://kovan.etherscan.io/address/0x3b226ff6aad7851d3263e53cb7688d13a07f6e81)

You can request Kovan or Ropsten Testnet Ether [here]({{ site.data.faucets.eth }}).