# General SDK Concept and Requirements

SingularityNET SDK

## Core concepts

The SingularityNET SDK allows you to make calls to SingularityNET services programmatically from your application.
To communicate between clients and services, SingularityNET uses 
[gRPC](/docs/products/DecentralizedAIPlatform/UsedTechnologies/grpc/). To handle payment of services, SingularityNET uses 
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
(currently, only `.proto` files). All these files are needed to call the service.

Currently, we support [IPFS](/docs/products/DecentralizedAIPlatform/UsedTechnologies/ipfs/) and 
[FileCoin](/docs/products/DecentralizedAIPlatform/UsedTechnologies/filecoin/) storage providers. 
Interaction with them may differ depending on the implementation language, but in any case IPFS and FileCoin 
provide REST or RPC APIs.

### Daemon

Interacting with a service means interacting with the `daemon` of that service, which the SDK communicates with 
using `gRPC`. Service method calls require `.proto` files (from storage provider), which are compiled differently 
for each implementation. In addition, the daemon has its own services (methods), `.proto` files to which are built 
into the SDK. These services are needed, for example, to get the current channel state and to use concurrent calls.

For more details, refer to the [Daemon section](/docs/products/DecentralizedAIPlatform/Daemon/)

## User interface

There are two main entities in SDK:

- sdk
- service client

The developer, as a user of the SDK, interacts with it using these very entities. At the beginning, a `config` is 
created with all the necessary values, which is passed to `sdk`. `service client` is created with the help of 
`sdk` and allows to perform service-specific actions (call, open a channel, etc.), and `sdk` takes care of all 
other functionality (by itself or with the help of other entities), for example, calling contract functions, 
generating stubs, accessing storage provider, etc. There can be more than one `service client` under one `sdk`.

## Implementations

We support SDK for the below two languages 

- [SDK in Python](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)
- [SDK in WebJS](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/)

And two SDKs are under development:

- [SDK in Java](/docs/products/DecentralizedAIPlatform/SDK/JavaSDK/getting-started-guide/)
- [SDK in Node.JS](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/NodeJsSDK/getting-started-guide/)

All SDKs provided adhere to the same design standard and strategy

**Note**:  According  to the design pattern for the SDK modules such as
functionality, need to be available in all programming languages, such as
Python and WebJS. 

The SDK can include several default funding strategies for payment channels,
but allows and supports the developer to implement funding strategies for
payment channel of their own, to control over tokens and service payments.

The SDK, in combination with the CLI, simplifies the process of fetching the
latest service specification for dependent services, and compiles the proto
definitions, so that the services can be invoked with minimal fuss.

Currently, a fully functional of a [Python SDK](https://github.com/singnet/snet-sdk-python) is available, but has 
[some design improvements](https://github.com/singnet/snet-sdk-python/issues/16).

Also, a fully functional of a [WebJS SDK](https://github.com/singnet/snet-sdk-js/tree/master/packages/web) is available. 

We are currently working on [SDK for Node.JS](https://github.com/singnet/snet-sdk-js/tree/master/packages/nodejs) 
and [SDK for Java](https://github.com/singnet/snet-sdk-java). We are also planning to support other popular languages, 
and welcome third-party contributions to the SDK for users' favorite languages.
