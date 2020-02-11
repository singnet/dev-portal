---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: AI Developers

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

#### IPFS:  
The Inter-Planetary File System (IPFS) is a peer-to-peer network and a network protocol used to
store and share data in a distributed file system. IPFS uses content-addressing to uniquely
identify each file in a global namespace connecting all computing devices. Organization details
and service details are stored in IPFS and the hash associated with them are stored in a
Blockchain.

#### Registry  
The SingularityNET Registry is an ERC-165–compliant smart contract on the Ethereum Blockchain that stores organizations, services, and type repositories.
Registry provides all the information needed to find and interact with AI services on the platform, either by listing the information in full, or  when it is too long, by listing the IPFS hash.
 
#### Contract 
Contract: Contracts are smart programs or algorithms, executes when certain conditions are met successfully.

 
#### MultipPartyEscrow Contract
 
An Escrow contract defines the conditional transaction between two transacting parties through an Escrow account.
 
#### Channel 
 
A payment channel is a tool that enables off-chain transactions between parties without the delay imposed by Blockchain block formation and without compromising the transactional security.
 
#### Daemon  
 
Daemon maintains the channel state off chain, so in order to  constrain operations involving gas cost (such as compensation or incentive or commission or any other facility charges levied) and allow transaction  between parties without imposing any delay by the Blockchain block formation times and compromising on transactional security.
 
The SingularityNET daemon is an adapter that a service uses to interface with the SingularityNET platform. In software architecture lingo, the daemon is referred to sidecar proxy, — a process deployed next to a core application (the AI service, in this case) to abstract architectural details, such as logging and configuration, and the platform - interaction with smart contracts or even the decision to use the Ethereum Blockchain. 
 
 
#### SDK
 
SDK is a tool for AI customers to make calls to service. The SDK simplifies the process of integrating with SingularityNET services and provides tooling to automatically augment gRPC client stubs with the necessary authorizations.  The SDK is available in NodeJS, Python and Java languages.
The 
 
#### Snet-Cli
The SingularityNET command line interface (CLI) is the primary tool for interacting with the platform’s smart contracts, managing deployed services, and managing funds. 

 
#### OffChain & On Chain Transaction
 
All transaction between the two parties are done in offchain mode in order to bring down the dependencies such as , gas cost, and disconnection from Blockchain.  Only when a claim is performed the nonce gets incremented the transaction becomes on Chai  transaction.
 
#### Signature
Authorization given by the signer  
 
#### Wallet/Address
Wallet is where you hold your crypto currencies , every wallet is associated to an address. 

#### Dapp 	
The SingularityNET DApp is essentially a rich Registry explorer. It loads the Registry and generates UI for managing the  Services and Type Repositories registered in it.
 
#### Metamask
 
MetaMask is an internet browser extension that allows users to interact with the Ethereum Blockchain and its decentralized applications. MetaMask serves as your access portal for both the Ethereum Mainnet and Ropsten.


#### AGI
 
AGI is the proprietary cryptocurrency token used by the SingularityNET platform. SingularityNET (AGI) is an Ethereum based token complying with ERC-20 standards. The AGI token will be used to settle a transaction over the Blockchain. 
 
#### AGI Token
 
Tokens can be staked for voting rights and to become an Agent or spent on goods and services on the platform.
 
#### Cogs
 
It is the unit of measurement transacted between parties. 
 
#### ETCD
 
ETCD is a local database that store all the events as table, when an event is triggered from Blockchain ETCD is also considered as a Deamon. ETCD was chosen because it is written in Go, and has out of the box embedded server support. This means that its nodes can be started and stopped by snet-daemon replicas
 
#### Gas and Gas Cost
 
The speed, reliability, and costs of Ethereum Blockchain interaction dictates that any system built on top of this must be scalable , and the block-mining time introduce minimize gas costs and delay. 
 
These decisions are used in tools to abstract away all Blockchain interactions (the daemon, CLI, and SDK) and in our use of a multi-party escrow contract and atomic unidirectional channels for payments.
 
#### Gas Strategy ( Slow , Medium and Fast) 

Ethereum gas price is a time based gas price strategy ('fast' ~1min, 'medium' ~5min or 'slow' ~60min) (defaults to session.default_gas_price).
Infura
DApps and smart contracts can use function to discover AI services. The Universal Resource Identifier (URI) is specified as a IPFS hash, - can be a file an image and so on, which points to the location in the IPFS system, and this hosting itself can be done by either SingularityNET, the service developer, or any IPFS pinning service, such as Infura.

#### Infura
DApps and smart contracts can use function to discover AI services. The Universal Resource Identifier (URI) is specified as a IPFS hash, - can be a file an image and so on, which points to the location in the IPFS system, and this hosting itself can be done by either SingularityNET, the service developer, or any IPFS pinning service, such as Infura.

