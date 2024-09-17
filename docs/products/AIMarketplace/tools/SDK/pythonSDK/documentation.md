
# Welcome to snet-sdk-python's documentation!

SingularityNET SDK for Python

### Core concepts

The SingularityNET SDK allows you to make calls to SingularityNET services programmatically from your application.
To communicate between clients and services, SingularityNET uses [gRPC](https://grpc.io/).
To handle payment of services, SingularityNET uses [Ethereum state channels](https://dev.singularitynet.io/docs/concepts/multi-party-escrow/).
The SingularityNET SDK abstracts and manages state channels with service providers on behalf of the user and handles authentication with the SingularityNET services.

A getting started guide for the SNET SDK for Python is available [here](https://github.com/singnet/snet-sdk-python/blob/master/README.md).

### Modules

1. [\_\_init\_\_](documentation/init)
2. [account](documentation/account)
3. [service_client](documentation/service-client)
4. [concurrency_manager](documentation/concurrency-manager)
5. [config](documentation/config)
6. [client_lib_generator](documentation/client-lib-generator)
7. metadata_provider
   1. [metadata_provider](documentation/metadata-provider)
   2. [ipfs_metadata_provider](documentation/ipfs-metadata-provider)
   3. [service_metadata](documentation/service-metadata)
8. mpe
   1. [mpe_contract](documentation/mpe-contract)
   2. [payment_channel](documentation/payment-channel)
   3. [payment_channel_provider](documentation/payment-channel-provider)
9. payment_strategies
   1. [payment_strategy](documentation/payment-strategy)
   2. [default_payment_strategy](documentation/default-payment-strategy)
   3. [freecall_payment_strategy](documentation/freecall-payment-strategy)
   4. [paidcall_payment_strategy](documentation/paidcall-payment-strategy)
   5. [prepaid_payment_strategy](documentation/prepaid-payment-strategy)
10. utils
    1. [utils](documentation/utils)  
    2. [ipfs_utils](documentation/ipfs_utils)
11. training
    1. [training](documentation/training)

    
