# Quick Start for AI Developers

Ready to publish your AI service? This guide will help you onboard your service to the Decentralized AI Platform.

## Overview

As an AI developer, you can publish and monetize your AI services on the platform. Choose from multiple onboarding methods based on your workflow preference:

1. **[Publisher Portal](./onboarding-via-publisher/)** - 🌟 Best for beginners (Web UI)
2. **[Command Line (CLI)](./onboarding-via-cli/)** - For automation and scripting
3. **[Terminal UI (TUI)](./onboarding-via-tui/)** - Interactive terminal interface

---

## Quick Start Path

### Step 1: Get Ready (10-15 minutes)

[→ Complete the Getting Ready Checklist](./getting-ready-to-onboard/)

- Create an Ethereum wallet
- Get ETH for gas fees
- Acquire ASI (FET) tokens
- Prepare your service
- Set up development environment

### Step 2: Choose Your Onboarding Method

Not sure which method to use? Check our detailed comparison:

[→ Publishing Methods Comparison](./publishing-methods-comparison/)

#### 🌐 Publisher Portal (Recommended for beginners)
**Best for**: First-time publishers, visual interface, step-by-step guidance
**Setup time**: 20-30 minutes
**Technical level**: No command-line knowledge required

[Start with Publisher Portal →](./onboarding-via-publisher/)

#### 💻 Command Line Interface (CLI)
**Best for**: Automation, CI/CD, experienced developers
**Setup time**: 15-25 minutes
**Technical level**: Comfortable with terminals

[Start with CLI →](./onboarding-via-cli/)

#### 🖥️ Terminal User Interface (TUI)
**Best for**: Interactive terminal users, full control
**Setup time**: 15-25 minutes
**Technical level**: Terminal proficiency

[Start with TUI →](./onboarding-via-tui/)

### Step 3: Follow Complete Onboarding Guide

For a comprehensive, step-by-step walkthrough covering all aspects of service publishing:

[→ Complete Onboarding Guide](./complete-onboarding-guide/)

This guide covers:
- Organization setup
- Service metadata configuration
- Daemon configuration
- Service publishing
- Testing and deployment

### Step 4: Integrate Your Service

Choose your service type and follow the integration guide:

#### gRPC Services
**Most common**: Standard communication protocol for AI services

[→ GRPC Service Integration](./grpc-service-integration/)

#### HTTP Services
**For REST APIs**: If your service uses HTTP/REST

[→ HTTP Service Integration](./http-service-integration/)

#### Training Services
**For ML training**: If you offer model training capabilities

[→ Training Service Integration](./training-service-integration/)

### Step 5: Create Service UI

Make your service user-friendly with a custom interface:

[→ Creating UI for Service](./creating-ui-for-service/)

- Use UI Sandbox for quick prototyping
- Create custom interfaces with Boilerplate
- Test in the marketplace before publishing

---

## Publishing Flow Overview

```
1. Create Organization → Register on blockchain
2. Configure Service → Metadata, pricing, endpoints  
3. Set Up Daemon → Payment channel handler
4. Publish Service → Deploy to blockchain
5. Add Service UI → Custom interface (optional)
6. Test & Launch → Verify everything works
```

---

## Quick Reference

### Organization Requirements

- Valid organization metadata
- Ethereum address for payments
- At least one payment group configured
- Organization must be published on blockchain

### Service Requirements

- Working AI service (gRPC, HTTP, or training)
- Configured daemon for payment handling
- Service metadata with pricing
- IPFS-hosted proto files (for gRPC)
- Service endpoint accessible from internet

### Cost Structure

**One-time blockchain fees (ETH gas):**
- Organization creation
- Service publication
- Metadata updates

**Ongoing:**
- Daemon hosting costs
- Service infrastructure costs

---

## Development Tools

The platform provides powerful tools to streamline development:

### Daemon
Payment channel handler for your service
[→ Daemon Documentation](/docs/products/DecentralizedAIPlatform/Daemon/)

### CLI
Command-line tool for service management
[→ CLI Documentation](/docs/products/DecentralizedAIPlatform/CLI/)

### TUI
Interactive terminal interface
[→ TUI Documentation](/docs/products/DecentralizedAIPlatform/TUI/)

### Publisher Portal
Web-based publishing interface
[→ Publisher Documentation](/docs/products/DecentralizedAIPlatform/PublisherPortal/)

### SDK
Build custom tooling and integrations
[→ SDK Documentation](/docs/products/DecentralizedAIPlatform/SDK/)

---

## Service UI Development

Create engaging user interfaces for your services:

### UI Sandbox
Browser-based development environment
[→ UI Sandbox Guide](/docs/products/DecentralizedAIPlatform/ServiceUI/sandbox/)

### UI Boilerplate
Template for building custom UIs
[→ UI Boilerplate Guide](/docs/products/DecentralizedAIPlatform/ServiceUI/boilerplate/)

---

## Best Practices

**Organization Setup**
- Use descriptive organization names
- Provide complete contact information
- Set up payment groups properly

**Service Configuration**
- Write clear service descriptions
- Set competitive, fair pricing
- Test thoroughly before publishing
- Provide example inputs/outputs

**Daemon Configuration**
- Use SSL/TLS for production
- Configure proper logging
- Set reasonable free call limits
- Monitor payment channel state

**Service UI**
- Keep interfaces simple and intuitive
- Provide clear input validation
- Show example inputs
- Handle errors gracefully

---

## Need Help?

- 📖 [Core Concepts](/docs/products/DecentralizedAIPlatform/CoreConcepts/) - Platform architecture
- 🛠️ [Tools Documentation](/docs/products/DecentralizedAIPlatform/Tools/) - Daemon, CLI, TUI, SDK
- 🤝 [Community Forum](https://community.singularitynet.io/) - Get help from developers
- 💬 [Developer Resources](/docs/products/AIMarketplace/ForConsumers/) - Tutorials and examples

---

## What's Next?

After publishing your first service:

- **Monitor Usage**: Track service calls and revenue
- **Iterate & Improve**: Update based on user feedback
- **Expand Services**: Publish additional AI capabilities
- **Engage Community**: Support users and gather feedback
- **Optimize Pricing**: Adjust based on usage patterns

[Explore Advanced Topics →](/docs/products/DecentralizedAIPlatform/CoreConcepts/)
