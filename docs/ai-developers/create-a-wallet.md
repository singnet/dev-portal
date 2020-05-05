---
# Page settings
layout: default
keywords: token
comments: false

# Hero section
title: Creating ethereum identity
description: Create a wallet so you can interact with the Ethereum Blockchain

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
## Creating ethereum identity

There are many ways to create an ethereum identity. A few a listed below. 
**In all cases the private key has to be stored securely as thats the only way to access the corresponding account.**

### Using snet-cli

snet-cli is the command line utility to interact with the SIngularityNet platform. The following command can be used to create an identity

```sh
snet identity create test-user key --private-key <PVT-KEY> --network mainnet
```
See the <a href="http://snet-cli-docs.singularitynet.io/organization.html" target="_blank">CLI documentation</a> for full details of actions the tool allows.

### Using Metamask

<a href="https://metamask.io/" target="_blank">Metamask</a> is a browser extension for interacting with Blockchain enabled websites, such as marketplace.  

#### Step 1. Metamask
                                                                                                                
[Metamask](https://metamask.io/) is a browser extension for interacting with Blockchain enabled websites, such as marketplace.
  
Install Metamask from their website.
                                                                                                                
#### Step 2. Create an Identity
                                                                                                                
In the initial startup, Metamask will prompt you to create an identity, which can be used in Blockchain transactions and for storing tokens.
                                                                                                                
To learn more about this, watch the video uploaded on the website or read about how to use the extension on their website.
                    

## What are the different networks?
                                                                                                                
All real value transactions occur in either "Main Ethereum Network" or "Mainnet Network". The other available networks are for testing purposes, and
the tokens on those networks are essentially value-less and are only useful for testing code and software.
                                                                                                                
**Note**: SingularityNet began using  Kovan for testing, but this network is likely to be deprecated soon in favour of Ropsten network.
                                                                                                                
 **Important** The major releases will be over the main network. Beginning with the Beta testing in Feb/Mar 2019.

>NOTE: Use the SingularityNET Marketplace in Mainnet Mode whenever you want to integrate an AI service into your software. Use the SingularityNET Marketplace in Ropsten Mode whenever you want to test the platform as a developer. Do not integrate AI services from the Ropsten Network in your software, as their continuous availability is not guaranteed.

### Ethereum Faucet (Ropsten Test Network Only)

Ethereum Ropsten coins are free to claim and can be used to test the platform. Ropsten Ethereum is needed to cover the Gas costs associated with transactions on the platform. Users are required to visit a [Ropsten Faucet](https://faucet.metamask.io/), which is a per-request Ropsten Ethereum distribution hub. Users provide their Ropsten Ethereum wallet address from MetaMask to the faucet and it issues a set amount of Ropsten Ethereum to the requesting wallet.

### AGI Faucet (Ropsten Test Network Only)

In order to have Ropsten AGI to test the platform, users are required to visit the [AGI Faucet](https://faucet.singularitynet.io/), which is a per-request Ropsten AGI distribution hub. In this case, users provide their Ropsten Ethereum wallet addresses to the Faucet, and a set amount of Ropsten AGI will be transferred to the requesting wallet. In order to receive these tokens, the user must log in via [GitHub](https://github.com/) to access the AGI Ropsten Faucet. 