---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: SingularityNET Marketplace

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Market Place
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Concepts Overview
        url: '/docs/concepts'
    next:
        content: SingularityNET Services
        url: '/docs/concepts/service'
---

The [The SingularityNET Marketplace](http://beta.singularitynet.io)  is a decentralized application (DApp), which lists the available AI services and helps you to interact with those services through web interface. It also processes payment for services (through MetaMask) and conduct service ratings.
Whenever transaction happens on Blockchain, an event is created. The marketplace monitors all those events. 
For example, if you publish a new organization, a new service, the marketplace receives an alert notification about published information in the Blockchain. The Blockchain reads the organization metadata, the service and the stores the data into the local database. This application efficiently displays allt the details in the marketplace quickly without relying on the slow performance of the Blockchain
The following image shows the contents from the marketplace database.  

![marketplace](/assets/img/marketplace.png)

The decentralized application (DApp) does the following:
- Reads data from the on-chain Registry and pairs it with off-chain metadata.
    This allows for searching, filtering, and discovering AI services.
    
- Integrates the SingularityNET curation service, and displays from the registry.
    Whenever an event comes from Blockchain, the details are stored in the local database, the review process is done on that data, and then when approved, the information is made available in the marketplace. 
    **Note:** Displays those services that have been vetted, and owners who have experienced due diligence and signed legal agreements that protects user and data privacy.
    
- Displays custom UI components for interactions with AI services.
    It enables you to quickly build the UI components and host the component on the platform, and also you can determine what inputs need to be chosen for service execution, and is the expected output, without understanding the complexity of knowing the gRPC protocol, the proto that is associated with the service and how to call the service and so on.
    
- Integrates with Multi-Party Escrow, to allow consumers to pay for service usage;
    Allows consumers to rate about the utilized services
    **Note:** This rating services will be part of the SingularityNET's Reputation System (currently under development). Currently, it is very difficult to rate services on Blockchain. Therefore all rating mechanism are performed off chain and managed in the market place. So you can share your opinion and reviews at marketplace.
    
- Captures usage metrics at a consumer level.

**Note:** Although, the SingularityNET platform is open and decentralized, the Marketplace is the SingularityNET Foundation's curated view. This allows the foundation to adhere to legal requirements of different legislative regions. Currently, the Marketplace and SingularityNET is in beta stage. For more information about the current status, refer to  current status page for changes, or follow the github repo. Page.

## Calling a Service

The Marketplace offers a free trial version, where registered users can access service(s) for a specified time period. After the expiration time period of the trial version, install an Ethereum browser extension, such as MetaMask. This extension mediates with the blockchain on behalf, helping you in transferring of tokens between wallets, and invoke contracts.
Example: The sample service below shows the SingularityNET  platform can authorize Metamask:

Image to be included

- Select a Wallet -
- General Account Wallet
- Metamask

**Important**: Metamask is a plugin which is available in SingularityNET platform. 

This extension, allows you to perform the following in the context of the marketplace:
- query what services are available
- transfer AGI funds into escrow, 
- setup payment channels to enable calls to any of the listed services.
To learn more about how to get your wallet and install browser extension, see our Setup Guide.

## Marketplace Requirements

If you are a service author, need the service to be visible to others and listed on the marketplace you must:
1.	Build and publish your service 
2.	Use SSL with the snet-daemon. 
    **Note:** if you don't already have an SSL certificate for your domain, it is recommend you use certbot and letsencrypt .
3.	Fork the snet-dapp repo, build a react component as the user interface for your service, and submit a pull request. 
    **Note:** Identify the services on your networks, organization and service names being used. For more details, refer to dapp repo README.md.
4.	Last is some paperwork that we are still finalising, and we'll update this list when we have that. If you are itching to get your service listed, reach out to us via one of our community groups.
    **Note** that your service can be published to SingularityNET without being listed on the marketplace, but your service may be less discoverable to potential customers if it is not listed. 
