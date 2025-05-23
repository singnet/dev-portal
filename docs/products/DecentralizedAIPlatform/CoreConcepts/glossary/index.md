# Glossary

### IPFS

The Inter-Planetary File System (IPFS) is a peer-to-peer network and a network protocol used to
store and share data in a distributed file system. IPFS uses content-addressing to uniquely
identify each file in a global namespace connecting all computing devices. Organization details
and service details are stored in IPFS and the hash associated with them are stored in a
Blockchain.

### Registry

The SingularityNET Registry is an ERC-165–compliant smart contract on the Ethereum Blockchain that stores organizations, services, and type repositories.
Registry provides all the information needed to find and interact with AI services on the platform, either by listing the information in full, or when it is too long, by listing the IPFS hash.

### Smart Contract

Contract: Contracts are smart programs or algorithms, executes when certain conditions are met successfully.

### MultipPartyEscrow Contract

An Escrow contract defines the conditional transaction between two transacting parties through an Escrow account.

### Channel

A payment channel is a tool that enables off-chain transactions between parties without the delay imposed by Blockchain block formation and without compromising the transactional security.

### Daemon

Daemon maintains the channel state off chain, so in order to constrain operations involving gas cost (such as compensation or incentive or commission or any other facility charges levied) and allow transaction between parties without imposing any delay by the Blockchain block formation times and compromising on transactional security.

The SingularityNET daemon is an adapter that a service uses to interface with the SingularityNET platform. In software architecture lingo, the daemon is referred to sidecar proxy, — a process deployed next to a core application (the AI service, in this case) to abstract architectural details, such as logging and configuration, and the platform - interaction with smart contracts or even the decision to use the Ethereum Blockchain.

### SDK

SDK is a tool for AI customers to make calls to service. The SDK simplifies the process of integrating with SingularityNET services and provides tooling to automatically augment gRPC client stubs with the necessary authorizations. The SDK is available in NodeJS, Python and Java languages.

### Snet-Cli

The SingularityNET command line interface (CLI) is the primary tool for interacting with the platform’s smart contracts, managing deployed services, and managing funds.

### On-Chain & Off-Chain Transaction

On-chain transactions refer to those crypto currency transactions which occur on the Blockchain - that is, on the records of the Blockchain - and remain dependent on the state of the Blockchain for their validity
Off-chain transactions refer to those transactions occurring on a cryptocurrency network which move the value outside of the blockchain. Due to their zero/low cost, off-chain transactions are gaining popularity, especially among large participants

### Signature

Authorization given by the signer.

### Wallet/Address

Wallet is where you hold your crypto currencies , every wallet is associated to an address.

### Dapp

The SingularityNET DApp is essentially a rich Registry explorer. It loads the Registry and generates UI for managing the Services and Type Repositories registered in it.

### Metamask

MetaMask is an internet browser extension that allows users to interact with the Ethereum Blockchain and its decentralized applications. MetaMask serves as your access portal for both the Ethereum Mainnet and Sepolia.

### ASI (FET)

ASI (FET) is the proprietary cryptocurrency token used by the SingularityNET platform. SingularityNET (ASI (FET)) is an Ethereum based token complying with ERC-20 standards. The ASI (FET) token will be used to settle a transaction over the Blockchain.

### ASI (FET) Token

Tokens can be staked for voting rights and to become an Agent or spent on goods and services on the platform.

### Cogs

It is the unit of measurement transacted between parties.

### ETCD

ETCD is a local database that store all the events as table, when an event is triggered from Blockchain ETCD is also considered as a Deamon. ETCD was chosen because it is written in Go, and has out of the box embedded server support. This means that its nodes can be started and stopped by snet-daemon replicas

### Gas and Gas Cost

The Gas Limit is the maximum amount of Gas that a user is willing to pay for performing this action or confirming a transaction (a minimum of 21,000). The price of Gas (Gas Price) is the amount of Gwei that the user is willing to spend on each unit of Gas

### Gas Strategy ( Slow , Medium and Fast)

Ethereum gas price is a time based gas price strategy ('fast' ~1min, 'medium' ~5min or 'slow' ~60min) (defaults to session.default_gas_price).
Infura

### Infura

Infura is a hosted Ethereum node cluster that lets your users run your application without requiring them to set up their own Ethereum node.
