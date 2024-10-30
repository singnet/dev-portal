# Welcome to snet-sdk-python's documentation!

SingularityNET SDK for Python

## Core concepts

The SingularityNET SDK allows you to make calls to SingularityNET services programmatically from your application.
To communicate between clients and services, SingularityNET uses [gRPC](https://grpc.io/).
To handle payment of services, SingularityNET uses [Ethereum state channels](https://dev.singularitynet.io/docs/concepts/multi-party-escrow/).
The SingularityNET SDK abstracts and manages state channels with service providers on behalf of the user and handles authentication with the SingularityNET services.

A getting started guide for the SNET SDK for Python is available [here](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/).

## Modules

1. [\_\_init\_\_](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/init/)
2. [account](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/account/)
3. [service_client](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/service-client/)
4. [concurrency_manager](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/concurrency-manager/)
5. [config](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/config/)
6. [client_lib_generator](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/client-lib-generator/)
7. storage_provider
    1. [storage_provider](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/storage-provider/)
    2. [service_metadata](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/service-metadata/)
8. mpe
    1. [mpe_contract](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/mpe-contract/)
    2. [payment_channel](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/payment-channel/)
    3. [payment_channel_provider](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/payment-channel-provider/)
9. payment_strategies
    1. [payment_strategy](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/payment-strategy/)
    2. [default_payment_strategy](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/default-payment-strategy/)
    3. [freecall_payment_strategy](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/freecall-payment-strategy/)
    4. [paidcall_payment_strategy](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/paidcall-payment-strategy/)
    5. [prepaid_payment_strategy](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/prepaid-payment-strategy/)
10. utils
    1. [utils](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/utils/)
    2. [ipfs_utils](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/ipfs-utils/)
11. training
    1. [training](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/training/)
