---
# Page settings
layout: default
keywords:
comments: true

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
        content: snetd daemon
        url: '/docs/concepts/daemon'
---

The SDK simplifies the process of integrating with SingularityNET services. While we use GRPC for the communication protocol, the SDK will provide tooling to automatically augment GRPC client stubs with the necessary authorisations.

The SDK will also allow the developer to specify a funding strategy for payment channels, providing completely control over tokens. The SDK will include a number of

Currently we have a [preliminary version of a Python SDK](https://github.com/singnet/snet-sdk-python) which is functional and is the basis for the [SDK tutorial](/tutorials/sdk), but has since [raised a number of design questions](https://github.com/singnet/snet-sdk-python/issues/16).

Work is also proceeding on an [SDK for Javascript](https://github.com/singnet/snet-sdk-js).

We intend to support most popular languages and welcome third party contributions for people's favourite languages.
