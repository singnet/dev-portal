---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to use the SingularityNET SDK
description: Building applications the depend on SingularityNET

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
# Introduction to SDK

SDK is a tool for AI customers to make calls to services.

The SDK simplifies the process of integrating with SingularityNET services and provides tooling to automatically augment gRPC client stubs with the necessary authorisations.

**Note**:  SDK uses gRPC protocol for communication 


We support SDK for the below three languages 

- SDK in JAVA
- SDK in Python
- SDK in NodeJS

All SDKs provided adhere to the same design standard and strategy

**Note**:  According  to the design pattern for the  SDK modules such as functionality, need to be available in all programming languages, such as Java, Python and NodeJS. 

The SDK can include several default funding strategies for payment channels, but allows and supports the developer to implement funding strategies for payment channel of their own, to control over tokens and service payments.

The SDK, in combination with the CLI, simplifies the process of fetching the latest service specification for dependent services, and compiles the proto definitions, so that the services can be invoked with minimal fuss.

Currently, a fully functional a [preliminary version of a Python SDK](https://github.com/singnet/snet-sdk-python) is available, which forms the basis for the [SDK tutorial](/tutorials/sdk), but has  [some design improvements](https://github.com/singnet/snet-sdk-python/issues/16).

Work is in process towards an [SDK for Javascript](https://github.com/singnet/snet-sdk-js), and intend to support other popular languages and welcome third party contributions for people's favourite languages.

As these SDKs become stable the [SDK tutorial](/tutorials/sdk) will be periodically updated to to include details supporting each programming language.