---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: AI Consumers

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
## Introduction to SingularityNET Marketplace

The [The SingularityNET Marketplace](http://beta.singularitynet.io)  is a decentralized application (DApp), which lists the available AI services and helps you to interact with those services through web interface abstracting all the complexity in invoking a service. It also processes payment for services (through MetaMask/General Wallet)  and conduct service ratings.
Whenever transaction happens on Blockchain, an event is created. The marketplace monitors all those events. 
For example, if you publish a new organization, a new service, the marketplace receives an alert notification about published information in the Blockchain. The marketplace reads the organization metadata, the service metadata and the stores this into its database. This application efficiently displays all the details quickly without relying on the slow performance of the Blockchain
The following image shows the contents from the marketplace.  

![marketplace](/assets/img/dapp/dapp_landing_page.png)

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

**Note:** Although, the SingularityNET platform is open and decentralized, the Marketplace is the SingularityNET Foundation's curated view. This allows the foundation to adhere to legal requirements of different legislative regions. Currently, the Marketplace and SingularityNET is in beta stage. For more information about the current status, refer to  current status page for changes, or follow the [git-repo](https://github.com/singnet/snet-dapp)

