---
# Page settings
layout: default
keywords:
comments: false
~~~~**~~~~**~~~~
# Hero section
title: The SingularityNET SDK

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

page_nav:
    prev:
        content: snet-cli command line tool
        url: '/docs/concepts/snet-cli'
    next:
        content: snetd - SingularityNET Daemon
        url: '/docs/concepts/daemon'
---

The SDK simplifies the process of integrating with SingularityNET services. While gRPC is the communication protocol used, the SDK provides tooling to automatically augment gRPC client stubs with the necessary authorisations.

The SDK will include a number of default funding strategies for payment channels, but will also allow the developer to implement their own, providing completely control over tokens and service payments.

The SDK, in combination with the CLI, will simplify the process of fetching the latest service specification for dependent services, and compiling the proto definitions so that the services can be called with minimal fuss.

Currently we have a [preliminary version of a Python SDK](https://github.com/singnet/snet-sdk-python) which is functional and is the basis for the [SDK tutorial](/tutorials/sdk), but has since [raised a number of design questions](https://github.com/singnet/snet-sdk-python/issues/16).

Work is also proceeding on an [SDK for Javascript](https://github.com/singnet/snet-sdk-js).

We intend to support most popular languages and welcome third party contributions for people's favourite languages.

As these SDKs become stable we'll update the [SDK tutorial](/tutorials/sdk) to include details for each programming language.