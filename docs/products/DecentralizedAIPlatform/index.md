# What is Decentralized AI Platform?

**SingularityNET (SNET)** is an open and decentralized network of AI services made accessible through the Blockchain. Developers publish their services to the SingularityNET network, and anyone on the network can use the service using the internet connection.

Developers can charge for the usage of their services using the native **AGIX** token.

Services can span the entire gamut of offerings in artificial intelligence and machine learning. Services can provide inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. The services can be as simple as wrapping a well-known algorithm such as A\* path planning, a complete end-to-end solution for an industry problem, or a standalone AI application. Developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform contains a number of critical components that work together to enable a decentralized network of AI services to flourish. The core components are designed to allow for a functional, scalable, and extensible system.

In general we have 2 main “roles” on the Platform:

<span style="font-weight: 700">Service Provider (AI Developer)</span> - is an author of an AI service who publishes their service on the Platform and provides access to it for use by other users.

<span style="font-weight: 700">Service Consumer (AI Consumer, Application Developer)</span> - is any user (a user of the AI ​​Marketplace, an application developer where AI services can be integrated, or even another AI developer who wants to interact with other AI services within their AI service) who will call the AI ​​services presented on the Platform in any format.

The platform is a **decentralized solution** built on the basis of **smart contracts**, a decentralized storage of AI service metadata files and a special Daemon component that allows AI Providers to manage calls to AI services and record the calls made. Payment for services is regulated by the settings of the **Multi-Party Escrow smart contract**, where a payment channel is created for each user, where the user's funds invested to call the AI ​​service are stored.

<span style="font-weight: 700">At first glance</span>, the system may seem complicated, but it contains only the necessary elements that we have developed in order to minimize the costs of users and developers on the blockchain, while maintaining the security of payments. Both conceptual and practical issues motivated this decision.

<span style="font-weight: 700">Secondly</span>, on AI services integration, we wanted to abstract away as much of the network as possible, in order to reduce the learning curve and minimize the overhead associated with providing AI services via the network. This abstraction is achieved with a single flexible tool, the daemon, that will help us provide scalability, robustness, distribution, and management features to the entire community.

<span style="font-weight: 700">Finally</span>, to make our marketplace compliant with regulations without compromising on openness, we implemented it separately from our fully decentralized registry of AI services currently available on the Blockchain.

## Platform components explained

<p style="font-weight: 700">Publisher portal</p> - this service allows to publish services on AI Marketplace
CLI/TUI - Tools for publish orgs and services without marketplace displays, for calls to services
SDK - Tool for integrating calls AI Services to another programs 
AI Marketplace - the service allows using AI services via web interface

<p style="font-weight: 700">Blockchain</p> - Ethereum is now used to implement platform contracts, but other blockchain will be used as well Cardano and other

<p style="font-weight: 700">MPE Contract</p> - smart contract used to implementation of on-chain payments for AI service calls

<p style="font-weight: 700">Registry Contract</p> - smart contract used for store information about organizations and services

<p style="font-weight: 700">DSN</p> - decentralized storage, where metadata about organizations and services are stored, now used: IPFS and Filecoin

<p style="font-weight: 700">Daemon</p> - A daemon is an adapter between an AI service and a client, tracking service calls, calculating costs, and redirecting requests to the AI

<p style="font-weight: 700">AI Service</p> - an artificial intelligence service that processes user requests through Daemon

![Basic scheme](/assets/images/products/AIMarketplace/Marketplace/BasicScheme.webp)

<p style="text-align: center; font-weight: 700">Basic scheme</p>

You can always check the extended version of the Decentralized AI Platform scheme if you want to know more details and check our other documentation provided in the appropriate sections on the Developer Portal!

![Extended scheme](/assets/images/products/AIMarketplace/Marketplace/ExtendedScheme.webp)

<p style="text-align: center; font-weight: 700">Extended scheme</p>

Service Provide needs to go through the OnBoarding process to Publish information about the service and data to call it (provide name, service matdata, wallet data for getting payments and data to connect to the up and running service). For this we have a short Checklist – what should be ready from the Service Provider side.

Service Consumers can use the services in several ways – via direct integration to applications using SDK (Python, JavaScript, Java) or using AI Marketplace. That means, that Service Provider can Publish the service in two ways:
only for SDK use (without their own UI interface) and in this case this service would not be visible on the AI Marketplace.
Or create UI interface for the interaction with the service in the AI Marketplace required design using UI Sandbox. In this case this service will be available not only via SDKs, but via AI Marketplace too.

## Service Provide Details

For the OnBoarding process Service Provider can use CLI or TUI and this service would NOT be visible on the AI Marketplace.
For the OnBoarding process Service Provider can use Publisher Portal and this service WILL be visible on the AI Marketplace. It is NOT MANDATORY to publish UI at the same moment, it can be uploaded later. The main thing here is that OnBoarding via Publisher Portal provides this opportunity to appear on the AI Marketplace and CLI/ TUI does not.

## The general OnBoarding process requires from the Service Provider to:

1. Register on the Publisher Portal to publish organization and services.
2. The first step is to register an organization under which the published services will exist. As part of your organization registration, you will need to fill out organization information and fill out information to receive payment for services. The information will then be uploaded to a decentralized repository and stored in a smart contract. (See extended scheme)
3. After the organization is published, it can start publishing your AI services. Here you will need to upload details of the service and how to call the service. This data will also be stored in a decentralized storage and smart contract for constant access to up-to-date information about the service. Storing data in IPFS and in a smart contract preserves the decentralization principles.
4. After your service passes the automated publishing stage, it will appear on the AI Marketplace.

## Service Consumer Details

Service Consumers can call the AI services in a few ways. First of all using AI Marketplace UI or integrate it into the developer solutions via SDKs. For now SDK available on Python, JavaScript (Web and Node) and Java. General description of the SDK logic provides the opportunity to implement the same logic to call service on the other languages as well, which are not supported on the SDK ecosystem yet. Also AI service calling is accessible via CLI and TUI as well (see extended scheme) for Service Consumers, which is usually needed for tests, but can be useful for some other purposes of the Service Consumer.

To call the service there are several options:

<p style="font-weight: 700">Free calls</p> – the amount of these calls are configured by the Service Provider. The main idea is to use an AI service for free to try it. And in case of good and expected experience use it on a paid basis. It is always nice to try before buying!

<p style="font-weight: 700">Paid calls</p> – this is a paid option where Service Consumers can buy more calls. For now the Platform supports a pay per call system, but later we will present subscriptions and other billing options! 
This means that Service Consumer <span style="font-weight: 700">DOES NOT</span> need to make a paid transaction each time when the service is called! For the first time when Service Consumer starts paid interaction with the AI service this Service Consumer opens a payment channel via Multi Party Escrow contract for some period of time which is configured by Service Consumer. This channel can be replenished with any amount of AGIX at any moment (before the closing of the channel due to time period setting). After replenishment Service Consumer can call the AI service and a special component [Daemon](/docs/products/DecentralizedAIPlatform/Daemon/) will count the number of calls securely and check the payment channel for sufficient funds which requires no transaction and blockchain fee payment at the service calling moment. You can check more detailed information about payment channels in the documentation [here](/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe/).

To buy paid calls Service Consumer can do it in two ways:

Use <span style="font-weight: 700">crypto wallet</span> – payments can be done directly via crypto wallet using AGIX token in the Ethereum blockchain. Note, that it is a blockchain transaction which will also require some blockchain fee paid in ETH crypto.

Use <span style="font-weight: 700">paypal</span> to exchange fiat money to AGIX token (available only on the AI Marketplace now).

## Decentralized AI Platform documentation structure

In the section of Decentralized AI Platform of the Developer Portal you can find the following information:

- **Quick Start Guides** with no extra options and excessive info what to do to start interaction with the Platform from Service Provider and Service Consumer perspective.

- **The Daemon section** provides detailed explanations of the Daemon goal, scenarios and setup guides.

- **The CLI section** provides explanations on how to use CLI and CLI commands explained.

- **The TUI section** provides explanations on how to use TUI.

- **The Publisher Portal** section explains what is Publisher Portal and how to use it.

- **SDK section** provides basic language-isolated explanation of the main idea of the SDK itself and also explanations and guides on how to use existing Python, JavaScript and JAVA SDKs.

- **The UI Sandbox section** provides explanations on how the Service Provider creates an appropriate UI interface for the AI service to be used by Service Consumers on the AI Marketplace.

- **UI Boilerplate** is a UI template which can be used together with JS SDK to easily create some UIs apart from AI Marketplace, but some separate web-site with AI service integrated.

- **Used Technologies section** provides explanation of all the solutions we used to create the Platform and glossary of used Termins in context of the Platform.

Looking forward to assisting any time needed – just write us using feedback form on the Developer Portal in the right down corner.

Or you can email us directly where we will help you at any stage of going through the onboarding process: **onboarding-support@singularitynet.io**
