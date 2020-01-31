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

## Introduction to MPE
The Multi-Party Escrow smart contract (“MPE”), combined with our atomic unidirectional payment channels, allows scalable payments in the platform, resulting in minimum number of on-blockchain to accomplish desired transactions between clients and AI service owners. 

The MPE contract has two main functionalities which includes:
Documentation for AI Consumers

1.	A wallet with a deposit and withdraw function. 
2. A set of the simple (“atomic”) unidirectional payment channels between clients and service providers and support functions for controlling of these channels.

Note: Each one can deposit and withdraw their AGI tokens into a Multi-Party Escrow, (which have not been escrowed at the moment).

## Atomic unidirectional payment channel
You can ignore this section, if you are familiar with the concept of payment channels.
The core logical building block of the Multi-Party Escrow is a simple (“Atomic”) unidirectional payment channel. To learn more about the details of how to implement the Escrow contract for unidirectional payment channel, click on this link SimpleEscrow.sol file here. 

## What is Payment Channel?

It is understood that the payment channel is on the Blockchain. So, in order to prevent direct updating on the Blockchain regularly, the payment channel state is maintained in the storage, For example, whenever the sender and the receiver enter into an contract, a channel should be created first on the Blockchain. So, if Kevin is buying services from the Jack, Kevin has to put some tokens in the channel and specify the expiration period.

A payment channel is a tool that allows payment channel is an on chain, daemon maintains the channel state off chain as block operations involve gas cost and are slowbetween parties without imposing any delay by the blockchain block formation times and compromising on transactional security. 
There are several kinds of payment channels. 

Let us consider the simple unidirectional payment channel, the main logic is as follows:

1.	The sender creates an Escrow contract with a given expiration date, and funds it with a desired amount of tokens.
2.	The sender then needs to send a small amount of tokens to the recipient each time (to the recipient) with signed authorization, to close the channel, and thereafter, withdraws from the channel when the total amount of the tokens becomes due.
3.	The recipient must verify whether the signed authorization and the amount required is correct, and that amount specified does not exceed the funds being escrowed.
4.	The channel nonce is incremented, whenever a claim happens,
Actually, the channel is not closed and the task can still continue off line, but a new nonce need to be used.
5.	The sender can perform the following:
- Close the channel after the expiration date and collect all funds.
      -or-
- Extend the expiration date and add funds to the contract at any moment in time.

Note: The receiver can withdraw from the channel (same as claim) only using the authorized amount by the sender.  Whenever a signature is made on a certain format which should be signed by the private key of Kevin, Jack then verifies whether the signature was authentic to Kevin, based on the agreed format. 

### Use case for Claims and Nonce

1.	Kevin (Buyer) and Jack (Service provider) enter into a contract for the first time, they create a channel details in the Blockchain is as follows: 

|Channel ID       | 1       |The channel ID created is 1|
|---------------- |----     |----------------------------------|
|Nonce            | 0       |Initially the Nonce is 0|
|Full amount      | 100 Cogs|Amount Kevin has put into the channel is 100 Cogs|
|Authorized Amount|	0       |The Authorized amount is zero, because no services has been used for the first time.|
|Signature        |	Nil     |No signature is required to be sent.|


2.	Kevin makes a call and authorizes for 1 cog, to Jack, now the status changes as follows:


You can jump directly to the thing you'd like to know more about, or use the navigation on each page to read through them in turn.

* [**SingularityNET Marketplace**](/docs/concepts/marketplace) - The SingularityNET Marketplace is a DApp ("Distributed App") and provides a front-end for exploring AI services available on the network. Users can interact with and call them through a web interface, and rate them afterwards. This allows the community to provide feedback and to get a sense of the level of quality that can expected from a service, and will eventually feed into our reputation engine.
* [**Service**](/docs/concepts/service) - A Service is published to the SingularityNET network and provides a [grpc](https://grpc.io)-based API for calling it. The service API specification, the IP address where it can be accessed, and the pricing information is published to IPFS as service metadata. This location of this metadata is then advertised in the SingularityNet Registry.
    * [Service Metadata](/docs/concepts/service-metadata) - The metadata describes the service's API, payment method, and where to find the service.
    * [Naming Standards](/docs/concepts/naming-standards) - We ask that people follow various guidelines for how to name their services.
* [**Software**](/docs/concepts/software)
    * [**snet-cli**](/docs/concepts/snet-cli) - The `snet` command line tool lets you interact with the platform: whether that's to call and query services, or publish your own. It allows crucial tasks such as: registering and managing identities, publishing services, updating registration information, notifying the platform of new endpoints, managing payment channels and balances, and calling services.
    * [**SDK**](/docs/concepts/sdk) - The software development kit (SDK) helps you integate SingularityNET services with your own software.
    * [**SNET Daemon**](/docs/concepts/daemon) - A developer exposes their service to the network by running the SNET Daemon alongside their service. The SNET Daemon interacts with the blockchain to facilitate authorization and payment for services and acts as a passthrough for making API calls to the service. This isolates the payment and blockchain interaction so a developer can focus on deploying and improving their service.
        * [Daemon API](/docs/concepts/daemon-api)
        * [Daemon Channel Storage](/docs/concepts/daemon-channel-storage)
* [**Blockchain Contracts**](/docs/concepts/blockchain-contracts)
    * [**AGI Token**](/docs/concepts/agi-token) - Our utility token to be exchanged for AI service, it is an ERC20 token hosted on Ethereum.
    * [**Registry**](/docs/concepts/registry) - Services are published to a publicly-accessible central registry on the blockchain. The registry maintains a list of active services on the network and where to find a services corresponding metadata. The Registry has support for grouping services by organisation or team, along with access control for organisation members.
    * [**Escrow**](/docs/concepts/multi-party-escrow) - The escrow contract on the blockchain holds AGI funds in escrow during interaction between an end-user and a service. An end-user places funds in escrow before a service can be called, and remain there until the service has been delivered or the escrow funds timeout.
        * [MPE Stateless Client](/docs/concepts/mpe-stateless-client)
* **The Request for AI Portal (RFAI):** is a DApp through which end users and application developers can request specific AI services they would like added to the network and stake AGI tokens as a reward for high-quality solutions.


## How to use MPE

## Reading MPE
