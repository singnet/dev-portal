---
# Page settings
layout: default
keywords:
comments: false
# Hero section
title: SingularityNET Registry
description: This guide will teach you how the registry is used to expose information about AI services to the outside world so consumers can find and buy these services.

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
The SDK simplifies the process of integrating with SingularityNET services and provides tooling to automatically augment gRPC client stubs with the necessary authorizations. 

**Note**: SDK uses gRPC protocol for communication.

The SDK can comprise of several default funding strategies for payment channels. It can also allow the developer to implement their strategies, providing completely control over tokens and service payments.

The SDK, along with the CLI, simplifies the process of fetching the latest service specification for dependent services, and compiles the proto definitions for efficient use of service.

The preliminary version of a Python SDK, which is functional and is the basis for the SDK tutorial has resulted in number of design constrains.

**Note**: Work is also proceeding on an SDK for Javascript.

We intend to support most popular languages and welcome third party contributions for people’s favourite languages.

As these SDKs become stable we’ll update the SDK tutorial to include details for each programming language.
