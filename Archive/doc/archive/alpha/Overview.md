# Overview

The current codebase represents an early version of the SingularityNET Platform and Network. 
AI developers can use the platform to publish AI services onto the SingularityNET 
Network where they can be listed and discovered from a central blockchain Registry on the 
Ethereum testnet. End users can call AI services published onto the Network by using 
the DApp, the CLI, or by interacting with the blockchain to facilitate calling a service directly.

As this is software under active development, it is still undergoing regular development improvements. There will 
likely be bugs as well as future backward-incompatible changes.

The platform currently also has significant limitations in its capabilities as compared to our production
platform which is in development for a Beta release this year. We will continue to augment
some of the capabilities in the current platform but not others. Below is a short list of some of the existing
shortcomings.

* **Simple Escrow [1]:** Each API interaction with a Service requires a separate Job. One API call == one Job.
* **Simple Escrow [2]:** There is no way to cancel a Job or claim a refund for undelivered services.
* **Simple Pricing [1]:** Each Agent exposes a single price. If a Service exposes multiple methods these all use the same pricing.
* **Simple Pricing [2]:** The only implemented pricing model is per-API-call. No mechanism for per-byte or per-item exists.
* **Testnet Only:** The Alpha is only deployed on Kovan and will not be deployed onto the Ethereum mainnet (We may deploy onto other testnets)  

## Glossary

* **Agent:** An Agent is an AI service that has been published onto the SingularityNET network. It has an 
associated Agent contract that manages pricing and exposes metadata such as the service endpoint.
End users interact with the Agent contract on-chain to purchase access to a service using 
SingularityNET's native AGI token.

* **Registry**: AI services are published onto a publicly accessible central registry on the
blockchain. The registry maintains a list of active Agents on the network that expose services
which can be called using the AGI token.

* **SNET Daemon:** An AI service developer exposes their service to the network by running
the SNET Daemon alongside their service. The SNET Daemon interacts with the blockchain to 
facilitate authorization and payment for services and acts as a passthrough for making API
calls to the service.

* **Escrow:** Currently exposed as a *Job* contract on the blockchain, AGI funds are held 
in escrow during interaction between an end-user and an Agent The escrow is funded before a
service can be called and funds are not released from escrow until the services have been
delivered.

* **SNET DApp:** The SingularityNET DApp is a front-end for exploring available AI services 
and inetracting with them through a web-UI. 

## On-Chain Components
The following contracts (in combination with the SingularityNET ERC-20 token) comprise the on-chain components of the alpha SingularityNET implementation.

### AgentFactory
* [Code](https://github.com/singnet/alpha-blockchain/blob/master/contracts/AgentFactory.sol)
* Network singleton (one instance per network)
* Creates all Agent instances on the network
* Maintains a list of all Agent instances that have been created

### Agent
* [Code](https://github.com/singnet/alpha-blockchain/blob/master/contracts/Agent.sol)
* Service singleton (one instance per service)
* Creates all Job instances associated with a given service on the network
* Authority on the current price of each service invocation
* Authority on the current endpoint for the service
* Authority on the pointer to the current version of the service's metadata located in IPFS
* Maintains an index of all Job instances that have been created for the given service
* Exposes events that are utilized by the Daemon to track Job state
* Daemon's primary callee for blockchain interactions and transactions (e.g. validateJobInvocation, completeJob)

### Registry
* [Code](https://github.com/singnet/alpha-blockchain/blob/master/contracts/Registry.sol)
* Network singleton
* TODO: Lev
* Not strictly required; a consumer can interact with a service using a known Agent instance address

### Job
* [Code](https://github.com/singnet/alpha-blockchain/blob/master/contracts/Job.sol)
* One instance per service invocation
* Acts as escrow for payment for the given service invocation
* Authority on the price for the given service invocation
* Consumer's primary callee for blockchain interactions and transactions (e.g. fundJob)

Below is a diagram of the interaction between the On-Chain components of the Alpha:

![Contracts1](../assets/img/contracts1.png)

## Off-Chain Components
The following components provide the off-chain functionality of the alpha SingularityNET implementation.

### Daemon
* [Code](https://github.com/singnet/snet-daemon)
* Associated with a given Agent instance on the network and a given wallet to use for transacting on the blockchain
* Acts as passthrough or proxy between consumer and service
* Passes requests through to service if they are accompanied by a valid Job instance address and consumer signature (valid meaning the Job instance is in the FUNDED state and the signature validates against the Job instance address)
* Completes each Job invocation on-chain after a valid service invocation and response (updating Job instance state to COMPLETED and transferring AGI from the Job instance to the service owner)
* Utilizes events emitted from Agent instance to maintain a local cache of known Job instances associated with this service and their states

### DApp
* [Code](https://github.com/singnet/alpha-dapp)
* Provides a user interface for exploring the list of named services in the Registry
* Enables interaction with the services using MetaMask and service models

### Service
* [Example code](https://github.com/singnet/example-service)
* Handles consumer's requests passed through to the Service by the Daemon
* Need not be aware of the blockchain for any reason

Below is a diagram of the interaction between the Off-Chain components of the platform:

![Structure1](../assets/img/structure1.png)

## End-to-End
Below is a diagram that illusrates the end-to-end operation of a client interoperating with a published Service on the 
SingularityNET Network

![Structure2](../assets/img/structure2.png)