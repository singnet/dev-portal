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

1. [\_\_init\_\_](ai-consumers/python-sdk/docs/init)
2. [account](ai-consumers/python-sdk/docs/account)
3. [service_client](ai-consumers/python-sdk/docs/service_client)
4. [concurrency_manager](ai-consumers/python-sdk/docs/concurrency_manager)
5. [config](ai-consumers/python-sdk/docs/config)
6. [client_lib_generator](ai-consumers/python-sdk/docs/client_lib_generator)
7. metadata_provider
   1. [metadata_provider](ai-consumers/python-sdk/docs/metadata_provider)
   2. [ipfs_metadata_provider](ai-consumers/python-sdk/docs/ipfs_metadata_provider)
   3. [service_metadata](ai-consumers/python-sdk/docs/service_metadata)
8. mpe
   1. [mpe_contract](ai-consumers/python-sdk/docs/mpe_contract)
   2. [payment_channel](ai-consumers/python-sdk/docs/payment_channel)
   3. [payment_channel_provider](ai-consumers/python-sdk/docs/payment_channel_provider)
9. payment_strategies
   1. [payment_strategy](ai-consumers/python-sdk/docs/payment_strategy)
   2. [default_payment_strategy](ai-consumers/python-sdk/docs/default_payment_strategy)
   3. [freecall_payment_strategy](ai-consumers/python-sdk/docs/freecall_payment_strategy)
   4. [paidcall_payment_strategy](ai-consumers/python-sdk/docs/paidcall_payment_strategy)
   5. [prepaid_payment_strategy](ai-consumers/python-sdk/docs/prepaid_payment_strategy)
10. utils
    1. [utils](ai-consumers/python-sdk/docs/utils)  
    2. [ipfs_utils](ai-consumers/python-sdk/docs/ipfs_utils)
11. training
    1. [training](ai-consumers/python-sdk/docs/training)



