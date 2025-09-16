# SingularityNET Platform Onboarding Checkup

<ImageViewer src="/assets/images/products/AIMarketplace/Marketplace/ReadyToOnboardingCheckUp.webp" alt="Checkup"/>

This document outlines the mandatory requirements for publishing your AI service on the Decentralized AI Platform and AI Marketplace.

## Quick Start

The fastest method for onboarding is via the [Publisher Portal](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaPublisher/). 

Alternative methods are also available for different use cases.

## Prerequisites Checklist

### 1. AI Service
You must have a service capable of:
- Accepting requests
- Processing data
- Returning responses

### 2. Protocol Buffer Definition (.proto file)
Create a [.proto file](https://protobuf.dev/) that describes:
- Service interfaces
- Request/response messages
- RPC method definitions

This enables communication between your service and the Daemon via gRPC protocol.

### 3. Ethereum Wallet
Required components:
- [MetaMask wallet](https://metamask.io/)
- Approximately 0.01 ETH for transaction fees
- Used for publishing organization and service

### 4. Publisher Portal Account (Optional for CLI/TUI)
Register at: [https://publisher.singularitynet.io/](https://publisher.singularitynet.io/)

### 5. Virtual Machine Requirements
Your hosting environment needs:
- **Python** version 3.10 or higher
- **Open port** for internet access
- **Public IP address** or domain name

### 6. Domain Name (Optional)
If you prefer domain-based access:
- Purchase from any domain provider
- Configure DNS settings
- Point to your service endpoint

### 7. ETCD Database Setup
Install and configure:
- [ETCD database](https://etcd.io/) for state management
- Security certificates for secure communication
- Detailed instructions provided during setup

### 8. Daemon Installation
Deploy the latest [Daemon](https://github.com/singnet/snet-daemon) version:
- Install and configure for your service
- Handles payment processing and request routing
- Manages service availability

## Infrastructure Options

You have flexibility in your deployment architecture:

- **Single Machine** - ETCD, Daemon, and AI service on one server
- **Distributed** - Components on separate machines for scalability
- **Cloud Native** - Containerized deployment on cloud platforms

## Testing Environment

Before mainnet deployment, test your service on:
- **Sepolia Testnet** - [https://testnet.publisher.singularitynet.io](https://testnet.publisher.singularitynet.io)
- Free test ETH and ASI available
- Identical workflow to mainnet

## Publishing Workflow

### Step 1: Registration
Create your account and connect your wallet:
- Publisher Portal: [https://publisher.singularitynet.io/](https://publisher.singularitynet.io/)
- MetaMask wallet required
- Small ETH balance for gas fees

### Step 2: Environment Setup
Configure your service infrastructure:
- Write proto interface definitions
- Install and configure ETCD
- Deploy and configure Daemon
- Verify connectivity

### Step 3: Testing
Validate your setup on testnet:
- Complete workflow on Sepolia network
- Test service calls
- Verify payment processing

### Step 4: Publishing
Deploy to mainnet:
- Collect all configuration data
- Complete publishing process on platform
- Verify service availability

## Alternative Publishing Methods

Besides Publisher Portal, you can also use:
- **CLI** - Command-line interface for automation
- **TUI** - Terminal user interface for interactive setup

Choose the method that best fits your workflow and technical requirements.

## Support Resources

Need help? We're here to assist:
- **Email**: onboarding-support@singularitynet.io
- **Documentation**: Browse our comprehensive guides
- **Community**: Join our developer discussions

Ready to publish? Start with the [Publisher Portal Guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaPublisher/)!
