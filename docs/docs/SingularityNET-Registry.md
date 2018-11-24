# SingularityNET Registry

## Overview

The SingularityNET Registry is a smart contract on the Ethereum blockchain that stores Organizations, Services, and Type Repositories. Service developers use the Registry to expose information about their services to the outside world and consumers can use the Registry to find services to use. The [SingularityNET DApp](https://github.com/singnet/alpha-dapp) reads from the Registry to display services for discovery and demo purposes. The Registry also allows tagging of services and type repositories to enable searching and filtering.

The source, ABI, and deployment information for the Registry is located in the [singnet/platform-contracts](https://github.com/singnet/platform-contracts) repo.

## Interface
The Registry interface, IRegistry, is a full specification of the functionality of the Registry. The Registry is published alongside its interface located in [`IRegistry.sol`](https://github.com/singnet/platform-contracts/blob/master/contracts/IRegistry.sol). The interface contains [natspec](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format)-compliant documentation on all functions and developers should import and target the interface instead of the implementation. The registry implements the interface and also fully supports [ERC-165](https://eips.ethereum.org/EIPS/eip-165).

## Data Model

The Registry stores four main pieces of data: Organizations, Services, Type Repositories, and Tags. It supports CRUD on all of these and contains a number of view functions for retrieving data.

### Organization
An Organization is an umbrella for Services to be grouped together and is the top of the Registry's data hierarchy. Service developers can (and should) register an Organization and then put all of their Services underneath it. 

An Organization registration record has a name, an owner address, a collection of member addresses, a collection of Services, and a collection of Type Repositories. Services and Type Repositories registered under a given Organization are said to be owned by that Organization. The list of members is a primitive access management structure; members of an organization can do everything except change the organization owner and delete the organization.

### Service 
A Service represents a single AI service and contains the necessary information for any consumer to call that AI service. A Service registration record contains a name, a path, an agent address, and a collection of tags. The name is an identifier for discoverability, the path is an optional identifier for organization's internal management, the agent address is the address of the deployed [Agent contract](https://github.com/singnet/platform-contracts/blob/master/contracts/Agent.sol), and the tags exist for discoverability. DApps and smart contracts can use the `listServicesForTag` view function to discover Services.

The Agent contract pointed to by the agent address stores the HTTP endpoint and the metadata URI which is what a consumer needs to download the service model and call the API. 

### Type Repository
A Type Repository is a place where a service developer can host service metadata such as the service model and the data types used. A Type Repository registration record contains a name, a path, a URI, and a collection of tags. The name is an identifier for discoverability, the path is an optional identifier for organization's internal management, the URI is the location where a consumer can find the metadata, and the tags exist for discoverability. DApps and smart contracts can use the `listTypeRepositoriesForTag` view function to discover Services. Note that the URI is intended to be an IPFS hash and the hosting itself can be done by either SingularityNET, the service developer, or any pinning service such as Infura.

### Tags
Tags are completely optional but recommended for discoverability. Services and Type Repositories can be associated with tags by using the relevant Registry methods such as `addTagToServiceRegistration`. After that, the tags are displayed and searchable on the DApp, and thanks to a reverse index built into the Registry contract itself, other smart contracts (such as SingularityNET Agents) can also search the Registry directly.

## DApp Integration
The SingularityNET DApp is essentially a rich Registry explorer. It loads the Registry and generates UI for playing with the Services and Type Repositories registered in it.

## CLI Integration
The SingularityNET CLI has all the tooling necessary to call any of the Registry methods. Please see the CLI documentation for details.