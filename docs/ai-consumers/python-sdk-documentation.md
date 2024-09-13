---
# Page settings
layout: default
keywords: SDK in Python, documentation
comments: false
title: Technical Documentation
description: Main page of the Python SDK documentation

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
---
# Welcome to snet-sdk-python's documentation!

SingularityNET SDK for Python

### Core concepts

The SingularityNET SDK allows you to make calls to SingularityNET services programmatically from your application.
To communicate between clients and services, SingularityNET uses [gRPC](https://grpc.io/).
To handle payment of services, SingularityNET uses [Ethereum state channels](https://dev.singularitynet.io/docs/concepts/multi-party-escrow/).
The SingularityNET SDK abstracts and manages state channels with service providers on behalf of the user and handles authentication with the SingularityNET services.

A getting started guide for the SNET SDK for Python is available [here](https://github.com/singnet/snet-sdk-python/blob/master/README.md).

### Modules

1. [\_\_init\_\_](main/init.md)
2. [account](docs/ai-consumers/python-sdk-tech-docs/account)
3. [service_client](main/service_client.md)
4. [concurrency_manager](main/concurrency_manager.md)
5. [config](main/config.md)
6. [client_lib_generator](main/client_lib_generator.md)
7. metadata_provider
   1. [metadata_provider](metadata_provider/metadata_provider.md)
   2. [ipfs_metadata_provider](metadata_provider/ipfs_metadata_provider.md)
   3. [service_metadata](metadata_provider/service_metadata.md)
8. mpe
   1. [mpe_contract](mpe/mpe_contract.md)
   2. [payment_channel](mpe/payment_channel.md)
   3. [payment_channel_provider](mpe/payment_channel_provider.md)
9. payment_strategies
   1. [payment_strategy](payment_strategies/payment_strategy.md)
   2. [default_payment_strategy](payment_strategies/default_payment_strategy.md)
   3. [freecall_payment_strategy](payment_strategies/freecall_payment_strategy.md)
   4. [paidcall_payment_strategy](payment_strategies/paidcall_payment_strategy.md)
   5. [prepaid_payment_strategy](payment_strategies/prepaid_payment_strategy.md)
10. utils
    1. [utils](utils/utils.md)
    2. [ipfs_utils](utils/ipfs_utils.md)
11. training
    1. [training](training/training.md)



