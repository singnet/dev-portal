# Getting Ready to Call AI

Before you can interact with AI services on the Decentralized AI Platform, you need to prepare your environment and get the necessary resources.

## Prerequisites Checklist

### 1. Create an Ethereum Wallet

To call services on the AI Marketplace, you need an Ethereum wallet. We recommend [MetaMask](https://metamask.io/download/).

**What you'll need:**
- Browser with MetaMask extension installed
- Secure backup of your wallet's recovery phrase

### 2. Get ETH for Gas Fees

Ether (ETH) is required to pay for blockchain transactions (gas fees).

**Transactions you'll make:**
- Transfer ASI (FET) tokens into the multi-party escrow
- Open payment channels and set timeout periods

**Where to get ETH:**
- **Mainnet**: Purchase from exchanges ([Find exchanges](https://coinmarketcap.com/currencies/ethereum/#Markets))
- **Testnet** (for development): Use faucets for free test ETH

**Note**: After opening a payment channel, you interact directly with services without additional gas fees until you need to add funds or extend the timeout.

### 3. Get ASI (FET) Tokens

ASI (FET) tokens are the payment currency for AI services on the platform.

**Where to get ASI tokens:**
- Purchase on exchanges ([Find exchanges](https://coinmarketcap.com/currencies/singularitynet/#Markets))
- For testing: Use the [ASI testnet faucet](/docs/products/DecentralizedAIPlatform/CoreConcepts/asi-token/)

### 4. Create Marketplace Account

An account on the AI Marketplace provides access to the web interface for calling services.

**Benefits:**
- Easy service discovery through the UI
- Transaction history and account management
- Works across the entire ASI Alliance ecosystem

[Create your account](https://marketplace.singularitynet.io/signup)

### 5. Set Up Development Environment

*Required only if you plan to call services programmatically (non-UI)*

**For Python SDK:**
```bash
# Python 3.10 or higher required
pip install snet.sdk
# or for CLI
pip install snet.cli
```

**For JavaScript SDK:**
```bash
# Node.js required
npm install snet-sdk
```

---

## Next Steps

Choose your preferred method to call AI services:

- [Calling via Marketplace UI](../calling-via-marketplace/) - Easiest way to get started
- [Calling via CLI](../calling-via-cli/) - Command-line interface for developers
- [Calling via TUI](../calling-via-tui/) - Terminal user interface
- [Calling via SDK](../calling-via-sdk/) - Programmatic access in Python or JavaScript
- [Service Training](../service-training/) - Train AI models with your data
