# General SDK Concept and Requirements

SingularityNET SDK

## Core concepts

The SingularityNET SDK allows you to make calls to SingularityNET services programmatically from your application.
To communicate between clients and services, SingularityNET uses 
[gRPC](/docs/products/DecentralizedAIPlatform/CoreConcepts/grpc/). To handle payment of services, SingularityNET uses 
[Ethereum state channels](/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe/).
The SingularityNET SDK abstracts and manages state channels with service providers on behalf of the user and 
handles authentication with the SingularityNET services.

## Interfaces

### Smart contracts

The SDK interacts with the three smart contracts of the SNET platform:
- Multi Party Escrow
- Registry
- SingularityNET Token

Interacting with them is done through `Web3`.

#### Multi Party Escrow (MPE)

The SDK uses MPE mainly to manage the payment channels that are needed to invoke services.

#### Registry

Registry is mainly used to retrieve metadata URI of organizations and services.

#### SingularityNET Token

The SDK uses SingularityNET Token to check balance and approve deposit to MPE.

### Storage providers

The storage provider is designed to store metadata of services and organizations, as well as services (daemons) APIs
(currently, only `.proto` files). ALl these files are needed to call the service.

Currently, we support [IPFS](/docs/products/DecentralizedAIPlatform/CoreConcepts/ipfs/) and 
[FileCoin](/docs/products/DecentralizedAIPlatform/CoreConcepts/filecoin/) storage providers. 
Interaction with them may differ depending on the implementation language, but in any case you can use 
REST or RPC APIs.

### Daemon

Interacting with a service means interacting with the `daemon` of that service, which the SDK communicates with 
using `gRPC`. Service method calls require `.proto` files (from storage provider), which are compiled differently 
for each implementation. In addition, the daemon has its own services (methods), `.proto` files to which should be 
in the SDK. These services are needed, for example, to get the current channel state and to use concurrent calls.

For more details, refer to the [Daemon section](/docs/products/DecentralizedAIPlatform/Daemon/)

## User interface

There are two main entities in SDK:
- sdk
- service client

The developer, as a user of the SDK, interacts with it using these very entities. `service client` allows you 
to perform service-specific actions (call, open channel, etc.), whereas the `sdk` mainly provides the ability to 
call contract functions (deposit, balance, etc.)

## Implementations

We support SDK for the below two languages 

- [SDK in Python](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)
- [SDK in WebJS](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/)

And two SDKs are under development:

- [SDK in Java](/docs/products/DecentralizedAIPlatform/SDK/JavaSDK/getting-started-guide/)
- [SDK in Node.JS](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/NodeJsSDK/getting-started-guide/)