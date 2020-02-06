---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Consumers

# Micro navigation
micro_nav: true

---

## Introduction to Paypal, 

**Note**: You need to go the Marketplace and pay the price (set in AGI tokens) in equivalent USD through Paypal. In such case, the entire process is managed at the background automatically for you.

All complexity of invoking a service is abstracted from the users.

Foe example it becomes easy for the user to Input the values that need to be sent and view the computed expected result in the Output field, even without knowing the complexity of the gRPC call and the proto that is associated to the service and so.  

As an AI consumer you can choose to:
- Create a wallet
- Use Metamask

The Marketplace offers a free trial version, where registered users can access service(s) for a specified time period. After the expiration time period of the trial version, install an Ethereum browser extension, such as MetaMask. 

This extension mediates with the Blockchain on behalf, and helps you in transferring of tokens between wallets, and invoke contracts.

**Note**: Service metadata is a place where the price of the service is set and it is on the blockchain.

The service provider needs to publish the details about the service in the Blockchain.

As a consumer, you may go the Blockchain or the Marketplace portal where the services are deployed.

All service metadata details are stored in the the JSON file
- Create a JSON file - information about the image, service type, description, price of the service, the endpoint and how to make a request.
- Singularity platform works on gRPC. Whenever you need to call you need a protofile.
- File management system such as IPFS stores the location of the hash and points to the associated protofile
    The IPFS can include a file and the same file returns same hash. 

### How to use service by paying through PayPal

1.	Go to the Marketplace portal
2.	Pay for service through your Paypal account    
3.	If you dont have a wallet , the application will create a wallet and a channel for you.
    The application will then deposit the equivalent AGI tokens in to channel.
4.	Now you can make a call now - The Dapp components hide all the complexity on making these calls.
   
