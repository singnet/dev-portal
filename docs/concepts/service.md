---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: SingularityNET Services

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

# Page navigation
page_nav:
    prev:
        content: Marketplace
        url: '/docs/concepts/marketplace'
    next:
        content: Service Metadata
        url: '/docs/concepts/service-metadata'
---

The platform's primary reason for existence is to allow a diverse collection AI services to be bought and sold via a distributed marketplace.
Anyone can publish the availability of their machine learning method, or integrated AI solution, and allow clients to interact with and pay for them
directly.

These services are primarily meant to be AI or machine learning related, but there is no intrinsic limitation to what type of service can be offered.
Indeed, we may end up implementing utility and adaptor services (such as [image conversion](https://github.com/singnet/face-services/issues/7)) to allow
services be composed more easily. We build on top of gRPC and protocol buffers, so if you can represent your service with these libraries, you can mostly
likely publish it to SingularityNET (however, see the current limitations below).

A "service" is defined through it's specification (the `.proto` file describing the gRPC service and message format), and [it's metadata](/docs/concepts/service-metadata).

A service is "published", by uploading the specification and metadata to IPFS, and updating the [Registry contract](/docs/concepts/registry).

For a full example of publishing a service, see ["How to Publish a SingularityNET Service"](/tutorials/publish).

# Current gRPC limitations

There are certain restrictions in how you can use gRPC. Some are design choices that might be relaxed, others are features will be fixed in later releases:

- No support for streaming gRPC requests and responses, but [a fix is coming soon](https://github.com/singnet/snet-daemon/issues/195).
- Your gRPC model must be represented in a flat directory structure. All `.proto` files will be uploaded in an archive and compiled in this namespace. This makes
  it difficult to use shared data models between related services.
