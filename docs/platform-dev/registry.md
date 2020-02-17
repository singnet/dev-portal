---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: SingularityNET Registry
description: This guide will teach you how the registry is used to expose information about AI services to the outside world so consumers can find and buy these services.

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: AGI Token
        url: '/docs/concepts/agi-token'
    next:
        content: Multi-Party Escrow
        url: '/docs/concepts/multi-party-escrow'

---

The SingularityNET Registry is an [ERC-165](https://eips.ethereum.org/EIPS/eip-165)–compliant smart contract on the Ethereum Blockchain that stores organizations, services, and type repositories. AI developers use the Registry to announce details of their services, and consumers use the Registry to find the services they need. When a user searches for a service in the [Marketplace DApp](https://beta.singularitynet.io/), it reads details of the services from the Registry, which also allows tagging of services and type repositories to enable searching and filtering.
The Registry provides all the information needed to find and interact with AI services on the
platform, either by listing the information in full or, when it is too long, by listing the IPFS hash. The source, ABI, and deployment information for the Registry is located in the [`singnet/platform-contracts`](https://github.com/singnet/platform-contracts) repo.

## Interface
The Registry interface, IRegistry, is a full specification of the functionality of the Registry. The Registry is published alongside its interface located in [`IRegistry.sol`](https://github.com/singnet/platform-contracts/blob/master/contracts/IRegistry.sol). The interface contains [natspec](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format)-compliant documentation on all functions and developers should import and target the interface instead of the implementation. The registry implements the interface and also fully supports [ERC-165](https://eips.ethereum.org/EIPS/eip-165).

## Data Model
The Registry stores four main pieces of data: Organizations, Services, Type Repositories, and Tags. It supports CRUD on all of these and contains a number of view functions for retrieving data.

### Organization
An organization is an umbrella for services to be grouped under and is at the top of the
Registry’s data hierarchy. Service developers can (and should) register an organization and then
put all of their services underneath it.

An organization registration record has a name, an owner address (in the identity sense), a collection of member addresses, a collection of services. Its Registry entry contains a name,members, and IPFS hash. the IPFS hash is the link to the metadata file on IPFS , this file has all the necessary information about the recipient address for payment and the storage details to keep track of all off-chain channel state. Services and type repositories registered under a given organization are said to be owned by that organization. The list of members is a primitive access-management structure. Members of an organization cannot change the organization owner or delete the organization or even update the metadata, members can however create , update and delete services under an organization.
Organization metadata is described in detail [here](/docs/ai-consumers/organization).

### Service
A service represents a single AI algorithm. Its Registry entry contains all the necessary
information for a consumer to call that AI service. The entry contains a name, tags, and IPFS
hash. The name is an identifier for discoverability, the tags help a customer find a service
without knowing its name, and the IPFS hash is the link to the metadata file on IPFS. DApps and smart contracts can use the `listServicesForTag` view function to discover Services.

### Contract Addresses
[Click here](https://github.com/singnet/platform-contracts#deployed-contracts-npm-version-033)

### Service Metadata
All service metadata is stored off-chain in IPFS for performance and gas-cost reasons. This
metadata includes
* basic information such as version number, service name, description, etc.;
* code-level information for calling the service, such as encoding (protobuf or JSON) and
request format (gRPC, JSON-RPC or process);
* A list of daemon endpoints, aggregated into one or more groups;
* pricing information; and
* an IPFS hash for the service API model.
* Service metata is described in detail [here](/docs/ai-consumers/service).

### Type Repository
A type repository is a Registry entry where a service developer lists service metadata, such as
the service model and the data types used. The entry contains a name, some tags, a path, and a
URI. The name and tags are for discoverability, the path is an optional identifier for the
organization’s internal management, and the URI allows the client (whether an end user or an
application making calls through the SingularityNET SDK) to find the metadata. DApps and
smart contracts can use the `listTypeRepositoriesForTag` view function to discover AI services.
The URI is an IPFS hash, and the hosting itself can be done by either SingularityNET, the
service developer, or any IPFS pinning service, such as [Infura](https://infura.io/).

### Tags
Tags are completely optional but recommended for discoverability. Services and Type Repositories can be associated with tags by using the relevant Registry methods such as `addTagToServiceRegistration`. After that, the tags are displayed and searchable on the DApp. Thanks to a reverse index built into the Registry contract, other smart contracts can also search the Registry directly. This is the foundation for the “API of APIs” functionality discussed below.

## DApp Integration
The SingularityNET DApp is essentially a rich Registry explorer. It loads the Registry and generates UI for playing with the Services and Type Repositories registered in it.

## CLI Integration
The SingularityNET CLI has all the tooling necessary to call any of the Registry methods. Please see the[CLI documentation](http://snet-cli-docs.singularitynet.io/)
