# Glossary

A comprehensive guide to key terms and concepts used in the SingularityNET ecosystem.

## Blockchain & Smart Contracts

### Smart Contract

Smart contracts are self-executing programs stored on the blockchain that automatically execute when predetermined conditions are met. In SingularityNET, smart contracts manage service registration, payments, and organizational governance.

---

### Registry

The SingularityNET Registry is an ERC-165 compliant smart contract on the Ethereum blockchain that stores and manages:
- Organizations and their metadata
- AI services and their configurations
- Type repositories for service interfaces

The Registry provides all information needed to discover and interact with AI services on the platform, either by storing the information directly or by referencing IPFS hashes for larger data.

---

### MultiPartyEscrow (MPE) Contract

The MPE contract enables secure, conditional transactions between service consumers and providers through an escrow mechanism. It manages payment channels and ensures that funds are only released when services are successfully delivered.

---

### Payment Channel

A payment channel is an off-chain scaling solution that enables multiple transactions between parties without requiring each transaction to be recorded on the blockchain. This reduces gas costs and eliminates blockchain confirmation delays while maintaining security.

---

### On-Chain & Off-Chain Transactions

**On-chain transactions:**
- Occur directly on the blockchain
- Permanently recorded in blockchain history
- Require gas fees for execution
- Subject to block confirmation times

**Off-chain transactions:**
- Occur outside the blockchain
- Near-zero transaction costs
- Instant execution
- Periodically settled on-chain for security

## Platform Components

### Daemon

The SingularityNET daemon is a sidecar proxy that interfaces between AI services and the platform. It handles:
- Payment channel state management
- Request authentication and authorization
- Off-chain transaction processing
- Communication with smart contracts
- Service monitoring and logging

The daemon abstracts blockchain complexity from service developers, allowing them to focus on AI functionality.

---

### SDK (Software Development Kit)

SDKs are libraries that simplify integration with SingularityNET services. They provide:
- Automated payment channel management
- Service discovery and connection
- Request signing and authentication
- Multiple language support (Python, JavaScript, Java)

Available SDKs streamline the process of calling AI services and handling platform-specific requirements.

---

### CLI (Command Line Interface)

The SingularityNET CLI is the primary tool for:
- Managing organizations and services
- Interacting with smart contracts
- Handling payment channels and funds
- Service deployment and configuration
- Identity and wallet management

## Storage & Infrastructure

### IPFS (InterPlanetary File System)

IPFS is a distributed, peer-to-peer protocol for storing and sharing data. SingularityNET uses IPFS to store:
- Service metadata
- Organization details
- Model files and artifacts
- Documentation and specifications

Content is addressed by cryptographic hash, ensuring data integrity and availability.

---

### ETCD

ETCD is a distributed key-value store used by SingularityNET for:
- Payment channel state storage
- Service configuration management
- Distributed coordination
- Event logging and tracking

ETCD nodes can be managed by daemon replicas, providing high availability and consistency.

## Tokens & Payments

### ASI (FET) Token

ASI (FET) is the native utility token of the SingularityNET platform:
- ERC-20 compliant token on Ethereum
- Used for all service payments
- Enables governance participation
- Can be staked for network benefits

---

### COGS

COGS are the smallest unit of measurement for transactions on the platform, similar to how wei relates to Ether. Service pricing and payments are calculated in COGS.

---

### Gas and Gas Costs

**Gas** represents the computational effort required to execute blockchain operations:
- **Gas Limit:** Maximum gas units willing to consume
- **Gas Price:** Price per gas unit in Gwei
- **Gas Strategy:** 
  - Fast (~1 minute confirmation)
  - Medium (~5 minute confirmation)
  - Slow (~60 minute confirmation)

## User Interface & Tools

### DApp (Decentralized Application)

The SingularityNET DApp is a web-based marketplace and service explorer that:
- Displays available AI services
- Enables service discovery and testing
- Manages user accounts and payments
- Provides service analytics and ratings

---

### MetaMask

MetaMask is a browser extension wallet that:
- Stores cryptocurrency and tokens
- Signs transactions
- Connects to Ethereum networks
- Interfaces with DApps

MetaMask serves as the primary gateway for interacting with SingularityNET on both mainnet and testnet.

---

### Publisher Portal

A web interface for service providers to:
- Register organizations
- Deploy and manage services
- Monitor usage and earnings
- Handle team permissions

## Security & Authentication

### Signature

A cryptographic proof that validates:
- Transaction authorization
- Message authenticity
- Identity verification
- Payment channel updates

Signatures ensure that only authorized parties can execute actions on the platform.

---

### Wallet/Address

**Wallet:** A software application that stores private keys and manages cryptocurrency holdings.

**Address:** A unique identifier derived from a public key that:
- Receives tokens and payments
- Identifies accounts on the blockchain
- Serves as a user's public identity

## Development & Integration

### gRPC

A high-performance RPC framework used for service communication:
- Language-agnostic protocol
- Efficient binary serialization
- Streaming support
- Used by all SingularityNET services

---

### Protocol Buffers (Protobuf)

A method for serializing structured data:
- Defines service interfaces
- Specifies message formats
- Generates client/server code
- Ensures type safety across languages

## Infrastructure Providers

### Infura/Alchemy

Managed Ethereum node services that provide:
- Blockchain API access
- Reliable network connectivity
- Eliminates need for running own nodes
- Scalable infrastructure for DApps

These services enable users to interact with the blockchain without maintaining their own Ethereum nodes.

## Network Concepts

### Mainnet

The primary Ethereum network where:
- Real transactions occur
- Actual value is exchanged
- Services operate in production
- Permanent records are maintained

---

### Testnet (Sepolia)

A test network that mirrors mainnet functionality:
- Free test tokens available
- Safe environment for development
- No real value at risk
- Used for testing and demonstration

## Quick Reference

| Term | Category | Description |
|------|----------|-------------|
| ASI (FET) | Token | Platform utility token |
| Daemon | Infrastructure | Service-platform interface |
| ETCD | Storage | Distributed state storage |
| IPFS | Storage | Distributed file system |
| MPE | Smart Contract | Payment escrow contract |
| Registry | Smart Contract | Service directory contract |
| SDK | Development | Integration libraries |
| CLI | Tools | Command-line management tool |