---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Wallet

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
    prev:
        content: Software
        url: '/docs/concepts/software'
    next:
        content: SDK
        url: '/docs/concepts/sdk'
---


## Step 1. Metamask
                                                                                                                
[Metamask](https://metamask.io/) is a browser extension for interacting with B enabled websites, such as marketplace.
         
Install Metamask now from their website.
                                                                                                                
## Step 2. Create an Identity
                                                                                                                
In the initial startup, metamask should prompt you to create an identity which can be used in Blockchain transactions and for storing tokens.
                                                                                                                
To learn more about this, watch the video uploaded on the website or  read about how to us the extensions.

You can also create an identity using the snet-cli commands
for further details [click here](http://snet-cli-docs.singularitynet.io/identity.html)
``` editorconfig
snet identity create [-h] [--mnemonic MNEMONIC] [--private-key PRIVATE_KEY]
                     [--keystore-path KEYSTORE_PATH] [--network NETWORK]
                     [--wallet-index WALLET_INDEX]
                     IDENTITY_NAME IDENTITY_TYPE                                                                     
```                     
                     
## Step 3. What are the different networks?
                                                                                                                
All real value transactions occur in either "Main Ethereum Network" or "Mainnet Network". The other available networks are for testing purposes, and
the tokens on those networks are essentially value-less and are only useful for testing code and software.
                                                                                                                
**Note**: SingularityNet began using  Kovan in order for testing, but this network is likely to be deprecated soon in favour of Ropsten network.
                                                                                                                
 **Important** The major releases will be over the main network. Beginning with the Beta testing in Feb/Mar 2019.

>NOTE: Use the SingularityNET Marketplace in Mainnet Mode whenever you want to integrate an AI service into your software. Use the SingularityNET Marketplace in Ropsten Mode whenever you want to test the platform as a developer. Do not integrate AI services from the Ropsten Network in your software, as their continuous availability is not guaranteed.

## Step 4. Ethereum Faucet (Ropsten Test Network Only)

Ethereum Ropsten coins are free to claim and can be used to test the platform. Ropsten Ethereum is needed to cover the Gas costs associated with transactions on the platform. Users are required to visit a [Ropsten Faucet](https://faucet.metamask.io/), which is a per-request Ropsten Ethereum distribution hub. Users provide their Ropsten Ethereum wallet address from MetaMask to the faucet and it issues a set amount of Ropsten Ethereum to the requesting wallet.

## Step 5. AGI Faucet (Ropsten Test Network Only)

In order to have Ropsten AGI to test the platform, users are required to visit the [AGI Faucet](https://faucet.singularitynet.io/), which is a per-request Ropsten AGI distribution hub. In this case, users provide their Ropsten Ethereum wallet addresses to the Faucet, and a set amount of Ropsten AGI will be transferred to the requesting wallet. In order to receive these tokens, the user must log in via [GitHub](https://github.com/) to access the AGI Ropsten Faucet. 