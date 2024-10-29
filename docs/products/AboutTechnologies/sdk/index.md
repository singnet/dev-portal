# Introduction to SDK

SDK is a tool for AI customers to make calls to services.

The SDK simplifies the process of integrating with SingularityNET services and
provides tooling to automatically augment gRPC client stubs with the necessary
authorizations.

**Note**:  SDK uses gRPC protocol for communication 

We support SDK for the below two languages 

- [SDK in Python](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)
- [SDK in WebJS](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/)

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

Also a fully functional of a [WebJS SDK](https://github.com/singnet/snet-sdk-js/tree/master/packages/web) is available. 

Work is in process towards an [SDK for Node.JS](https://github.com/singnet/snet-sdk-js/tree/master/packages/nodejs), 
and intend to support other popular languages and welcome third party contributions for people's favourite languages.
