---
# Page settings
layout: default
keywords: SDK in JAVA, SDK in Python, SDK in NodeJS
comments: false
title: SDK Introduction
description: All about SDK

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

The SDK simplifies the process of integrating with SingularityNET services and
provides tooling to automatically augment gRPC client stubs with the necessary
authorisations.

**Note**:  SDK uses gRPC protocol for communication 


We support SDK for the below three languages 

- [SDK in JAVA](/tutorials/client/java/)
- [SDK in Python](/docs/ai-consumers/python-sdk/first-steps)
- [SDK in NodeJS](/tutorials/nodejs-sdk)

All SDKs provided adhere to the same design standard and strategy

**Note**:  According  to the design pattern for the  SDK modules such as
functionality, need to be available in all programming languages, such as Java,
Python and NodeJS. 

The SDK can include several default funding strategies for payment channels,
but allows and supports the developer to implement funding strategies for
payment channel of their own, to control over tokens and service payments.

The SDK, in combination with the CLI, simplifies the process of fetching the
latest service specification for dependent services, and compiles the proto
definitions, so that the services can be invoked with minimal fuss.

[Java SDK](https://github.com/singnet/snet-sdk-java) is ready for usage on Java
SE and Android platforms. Source code can be found at [GitHub
repo](https://github.com/singnet/snet-sdk-java) and artifacts are published at
[Jitpack repo](https://jitpack.io/#singnet/snet-sdk-java). [Java
tutorial](/tutorials/client/java/) is available on
SingularityNET dev portal. Preliminary version of [Android related
notes](https://github.com/singnet/snet-sdk-java/tree/master/plugin/gradle) and
[code examples](https://github.com/singnet/snet-sdk-java/tree/master/example)
are available at GitHub.

Currently, a fully functional a [preliminary version of a Python
SDK](https://github.com/singnet/snet-sdk-python) is available, which forms the
basis for the [SDK tutorial](/tutorials/sdk), but has  [some design
improvements](https://github.com/singnet/snet-sdk-python/issues/16).

Work is in process towards an [SDK for
Javascript](https://github.com/singnet/snet-sdk-js), and intend to support
other popular languages and welcome third party contributions for people's
favourite languages.

As these SDKs become stable the [SDK tutorial](/tutorials/sdk) will be
periodically updated to to include details supporting each programming
language.
