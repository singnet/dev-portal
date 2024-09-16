---
# Page settings
layout: default
keywords: Python SDK, documentation
comments: false
title: Python SDK documentation
description: full technical documentation for the snet-sdk-python

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

1. [\_\_init\_\_](docs/python-sdk/doc_files/init)
2. [account](docs/python-sdk/doc_files/account)
3. [service_client](docs//python-sdk/doc_files/service_client)
4. [concurrency_manager](docs/python-sdk/doc_files/concurrency_manager)
5. [config](docs/python-sdk/doc_files/config)
6. [client_lib_generator](docs/python-sdk/doc_files/client_lib_generator)
7. metadata_provider
   1. [metadata_provider](docs/python-sdk/doc_files/metadata_provider)
   2. [ipfs_metadata_provider](docs/python-sdk/doc_files/ipfs_metadata_provider)
   3. [service_metadata](docs/python-sdk/doc_files/service_metadata)
8. mpe
   1. [mpe_contract](docs/python-sdk/doc_files/mpe_contract)
   2. [payment_channel](docs/python-sdk/doc_files/payment_channel)
   3. [payment_channel_provider](docs/python-sdk/doc_files/payment_channel_provider)
9. payment_strategies
   1. [payment_strategy](docs/python-sdk/doc_files/payment_strategy)
   2. [default_payment_strategy](docs/python-sdk/doc_files/default_payment_strategy)
   3. [freecall_payment_strategy](docs/python-sdk/doc_files/freecall_payment_strategy)
   4. [paidcall_payment_strategy](docs/python-sdk/doc_files/paidcall_payment_strategy)
   5. [prepaid_payment_strategy](docs/python-sdk/doc_files/prepaid_payment_strategy)
10. utils
    1. [utils](docs/python-sdk/doc_files/utils)  
    2. [ipfs_utils](docs/python-sdk/doc_files/ipfs_utils)
11. training
    1. [training](docs/python-sdk/doc_files/training)

    
