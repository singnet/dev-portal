# What is the AI Services Marketplace?

[SingularityNET (SNET) Marketplace](https://marketplace.singularitynet.io/) is a decentralized application (DApp), which lists the available AI services and helps you to interact with those services through web interface abstracting all the complexity in invoking a service. It also processes payment for services (through MetaMask/General Wallet) and conduct service ratings. Whenever transaction happens on Blockchain, an event is created. The marketplace monitors all those events. For example, if you publish a new organization, a new service, the marketplace receives an alert notification about published information in the Blockchain. The marketplace reads the organization metadata, the service metadata and stores this into its database. This application efficiently displays all the details quickly without relying on the slow performance of the Blockchain.

Developers can charge for the usage of their services using the native ASI (FET) token.

Services can span the entire gamut of offerings in artificial intelligence and machine learning. Services can provide inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. The services can be as simple as wrapping a well-known algorithm such as A* path planning, a complete end-to-end solution for an industry problem, or a standalone AI application. Developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform contains a number of critical components that work together to enable a decentralized network of AI services to flourish.

The core components are designed to allow for a functional, scalable, and extensible system.

We arrived at the current architecture through a careful process, guided by a few key decisions governing Blockchain interactions, AI service integration, abstraction and by the goal of building an AI marketplace that is open and compliant with regulatory and legal requirements.

Firstly, we made the conscious choice to minimize our dependence on our current Blockchain, Ethereum. Both conceptual and practical issues motivated this decision. Conceptually, we desire to be Blockchain-agnostic and, if necessary, will consider building our own consensus algorithm based on reputation. The speed, reliability, and costs of Ethereum Blockchain interactions dictate that any scalable system built on top of it must minimize gas costs and the delays introduced by block-mining time. These decisions are reflected in our use of tools to abstract away all Blockchain interactions (the daemon, CLI, and SDK) and in our use of a multi-party escrow contract and atomic unidirectional channels for payments.

Secondly, on AI services integration, we wanted to abstract away as much of the network as possible, in order to reduce the learning curve and minimize the overhead associated with providing AI services via the network. This abstraction is achieved with a single flexible tool, the daemon, that will help us provide scalability, robustness, distribution, and management features to the entire community.

Finally, to make our marketplace compliant with regulations without compromising on openness, we implemented it separately from our fully decentralized registry of AI services currently available on the Blockchain.

## Who Can Use the Marketplace?
### 1. Developers
Developers can find powerful AI services to integrate directly into their applications or products, accelerating time-to-market for AI-enabled solutions.

### 2. Integrators and Business Professionals
For those looking to enhance business processes or customer experiences with AI, the marketplace offers a diverse selection of ready-to-use services. Users can explore options that match specific needs, from machine learning models to natural language processing tools, making it easier to bring AI-driven insights and automation to their operations. For such users, we have [guides](/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToCallAICheckUp/) on how to call services.

### 3. AI Service Providers
The marketplace is also an ideal environment for AI developers who create and provide AI solutions. By listing their services, developers can reach a broader audience, gain visibility, and connect directly with those looking for their specific expertise. The platform allows service providers to showcase their products and enables efficient distribution and management of their AI solutions. For such users, we have [guides](/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToOnboardCheckUp/) that you need to create your own service

## Why Use the Marketplace?
The AI Services Marketplace provides an accessible platform to quickly discover and implement AI technologies without the need for deep technical expertise. It serves as a bridge between AI service creators and those seeking to leverage AI capabilities, making it possible to innovate, scale, and personalize AI solutions across industries and fields.

## Marketplace Requirements
If you are a service author, for the service to be visible to others and listed on the marketplace you must:

1. Build and publish your service
2. Use SSL with the snet-daemon. 

Note: if you don't already have an SSL certificate for your domain, it is recommended you use certbot and letsencrypt.

3. Fork the snet-dapp repo, build a react component as the user interface for your service, and submit a pull request. Note: Identify the services on your networks, organization and service names being used. For more details, refer to dapp repo README.md.
4. Last is some paperwork that we are still finalising, and we'll update this list when we have that. If you are itching to get your service listed, reach out to us via one of our community groups. Note: your service can be published to SingularityNET without being listed on the marketplace, but your service may be less discoverable to potential customers if it is not listed.