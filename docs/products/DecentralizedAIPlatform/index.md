# What is Decentralized AI Platform?

**SingularityNET (SNET)** is an open and decentralized network of AI services made accessible through the Blockchain. Developers publish their services to the SingularityNET network, and anyone on the network can use the service using the internet connection.

Developers can charge for the usage of their services using the native **ASI (FET)** token.

::: tip Quick Access
| Environment | Publisher Portal | Marketplace |
|-------------|-----------------|-------------|
| **Mainnet** | [publisher.singularitynet.io](https://publisher.singularitynet.io) | [marketplace.singularitynet.io](https://marketplace.singularitynet.io) |
| **Testnet** | [testnet.publisher.singularitynet.io](https://testnet.publisher.singularitynet.io) | [testnet.marketplace.singularitynet.io](https://testnet.marketplace.singularitynet.io) |
:::

Services can span the entire gamut of offerings in artificial intelligence and machine learning. Services can provide inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. The services can be as simple as wrapping a well-known algorithm such as A\* path planning, a complete end-to-end solution for an industry problem, or a standalone AI application. Developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform contains a number of critical components that work together to enable a decentralized network of AI services to flourish. The core components are designed to allow for a functional, scalable, and extensible system.

## Main Roles on the Platform

The platform consists of two primary roles:

* **Service Provider (AI Developer):** An author of an AI service who publishes their service on the Platform and provides access to it for use by other users.
* **Service Consumer (AI Consumer, Application Developer):** Any user who calls AI services presented on the Platform. This includes:

  * Users of the AI Marketplace
  * Application developers integrating AI services
  * AI developers who want to interact with other AI services within their own service

## Platform Architecture

The platform is a **decentralized solution** built on:

* **Smart contracts** for trustless operations
* **Decentralized storage** for AI service metadata files
* **Daemon component** that allows AI Providers to manage and record service calls
* **Multi-Party Escrow smart contract** for secure payment channels

### Key Design Principles

* **Cost Efficiency:** While the system may seem complex at first glance, it contains only the necessary elements to minimize blockchain costs for users and developers while maintaining payment security.
* **Simplified Integration:** We abstract away network complexity to reduce the learning curve and minimize overhead for AI service providers. This is achieved through the daemon - a single flexible tool providing scalability, robustness, distribution, and management features.
* **Regulatory Compliance:** To ensure marketplace compliance without compromising openness, we implement it separately from our fully decentralized registry of AI services on the Blockchain.

## Platform Components Explained

To make the structure clearer, components are grouped into blocks with bold labels and separated for better readability.

### User Interface Components

* **Publisher Portal**
  Web service for publishing services on the AI Marketplace with a visual interface.

* **CLI/TUI**
  Command-line and terminal tools for:

  * Publishing organizations and services
  * Calling services programmatically
  * Managing platform operations without GUI

* **SDK**
  Libraries for integrating AI service calls into applications (Python, JavaScript, Java).

* **AI Marketplace**
  Web interface for browsing and using AI services directly in the browser.

---

### Blockchain Infrastructure

* **Blockchain Networks**
  Currently using Ethereum, with plans to support additional networks like Cardano.

* **MPE Contract**
  Multi-Party Escrow smart contract managing on-chain payments for AI service calls.

* **Registry Contract**
  Smart contract storing information about organizations and services on-chain.

---

### Storage and Processing

* **Decentralized Storage (DSN)**
  Distributed storage for metadata about organizations and services using:

  * IPFS (InterPlanetary File System)
  * Filecoin

* **Daemon**
  Adapter component between AI services and clients that:

  * Tracks service calls
  * Calculates costs
  * Redirects requests to AI services
  * Manages payment verification

* **AI Service**
  The actual artificial intelligence service that processes user requests through the Daemon.

<ImageViewer src="/assets/images/products/AIMarketplace/Marketplace/BasicScheme.webp" alt="Basic scheme" pictureTitle="Basic scheme"/>

You can always check the extended version of the Decentralized AI Platform scheme for more details in the appropriate sections of the Developer Portal.

<ImageViewer src="/assets/images/products/AIMarketplace/Marketplace/ExtendedScheme.webp" alt="Extended scheme" pictureTitle="Extended scheme"/>

## Service Provider Journey

Service Providers need to complete the onboarding process to publish their services. This includes providing:

* Service name and metadata
* Wallet information for receiving payments
* Connection details for the running service

We provide a comprehensive checklist to help Service Providers prepare for onboarding.

## Service Consumer Options

Service Consumers can access services through multiple channels:

* **Direct Integration**
  Using SDKs available for:

  * Python
  * JavaScript
  * Java

* **AI Marketplace**
  Web interface for direct service interaction.

## Publishing Options for Providers

* **SDK-Only Services**
  Services without UI interfaces are accessible only through SDKs and CLI/TUI, not visible on the AI Marketplace.

* **Full Marketplace Services**
  Services with custom UI interfaces created using UI Sandbox are available both through SDKs and the AI Marketplace web interface.

## Service Provider Publishing Methods — Overview

Below is a concise integration of the **Full Onboarding Guide** to help you choose the right method quickly. All methods publish to the same blockchain and produce services callable via CLI and SDK; only the **Publisher Portal** enables a Marketplace demo UI.

### Method Comparison

| Method                                                                                                     | Publishing Interface | Service Accessibility After Publishing | Marketplace UI Demo |
| ---------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | ------------------- |
| **[Publisher Portal](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaPublisher/)** | Web GUI              | Marketplace + CLI + SDK                | Yes (optional)      |
| **[CLI](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaCLI/)**                    | Command line         | CLI + SDK only                         | No                  |
| **[TUI](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaTUI/)**                    | Terminal menus       | CLI + SDK only                         | No                  |

### Quick Decision Guide

* **Choose Publisher Portal** if you want Marketplace visibility, a demo UI, and a visual workflow (team-friendly).
* **Choose CLI** for automation, CI/CD, and fine-grained control (SDK/CLI-only access).
* **Choose TUI** for guided terminal publishing on servers without GUI (no need to memorize commands).

> **Interoperability:** Organizations and services are on-chain entities. You can manage them later with any method and switch tools as needed. Only Publisher Portal supports creating a Marketplace demo UI.

For complete steps (prerequisites, daemon setup, ETCD, keys for metering and free calls, domain/SSL, organization/service creation, and launch), see the **Full Guide** in the Developer Tutorials. The brief summary above preserves the key distinctions without duplicating the full procedure.

## General Onboarding Process

1. **Registration**
   Register on the Publisher Portal to publish organizations and services.

2. **Organization Setup**
   Create an organization under which your services will be published:

   * Fill out organization information
   * Configure payment details
   * Data is uploaded to decentralized storage and smart contracts

3. **Service Publishing**
   Publish your AI services under the organization:

   * Upload service details and specifications
   * Configure service endpoints
   * Data is stored in IPFS and smart contracts for decentralized access

4. **Marketplace Listing**
   After automated publishing validation, your service appears on the AI Marketplace.

## Service Consumer Details

### Access Methods

Service Consumers can access AI services through:

* **AI Marketplace UI** - Web interface for direct interaction
  - Mainnet: [marketplace.singularitynet.io](https://marketplace.singularitynet.io)
  - Testnet: [testnet.marketplace.singularitynet.io](https://testnet.marketplace.singularitynet.io)
* **SDKs** - Integration into applications (Python, JavaScript, Java)
* **CLI/TUI** - Command-line access for testing and automation

### Payment Options

* **Free Calls**
  Service Providers configure a number of free trial calls allowing users to test services before purchasing.

* **Paid Calls**
  The platform uses a pay-per-call system with payment channels:

  * **No per-call transactions:** Consumers **do not** need blockchain transactions for each call.
  * **Payment channels:** One-time channel opening via Multi-Party Escrow contract.
  * **Flexible funding:** Channels can be replenished with ASI (FET) tokens anytime before expiration.
  * **Efficient processing:** The [Daemon](/docs/products/DecentralizedAIPlatform/Daemon/) tracks calls and verifies funds off-chain.

Learn more about [payment channels](/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe/).

### Payment Methods

* **Crypto Wallet**
  Direct payments using ASI (FET) tokens on Ethereum blockchain. Requires ETH for gas fees.

## Documentation Structure

The Decentralized AI Platform documentation is organized into the following sections:

* **Getting Started:** Quick Start Guides for Service Providers and Consumers.
* **Tools and Interfaces:** Daemon, CLI, TUI, Publisher Portal.
* **Development Resources:** SDK Documentation, UI Sandbox, UI Boilerplate.
* **Reference:** Used Technologies and terminology glossary.

## Support and Contact

We're here to help at every stage of your journey:

* **Feedback Form** - Available in the bottom right corner of the Developer Portal
* **Direct Email Support** - **[onboarding-support@singularitynet.io](mailto:onboarding-support@singularitynet.io)**

Our team will assist you throughout the onboarding process and answer any questions about the platform.
