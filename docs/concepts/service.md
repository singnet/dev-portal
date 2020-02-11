---
# Page settings
layout: default
keywords:
comments: false

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
        content: Organization Metadata
        url: '/docs/concepts/organization-metadata'
    next:
        content: Service Metadata
        url: '/docs/concepts/service-metadata'
---

The platform's primary reason for existence is to allow a diverse collection AI services to be bought and sold via a distributed marketplace.
Anyone can publish the availability of their machine learning method, or integrated AI solution, and allow clients to interact with and pay for them
directly.

These services are primarily meant to be AI or machine learning related, but there is no intrinsic limitation to what type of service can be offered.
Indeed, the foundation or the community may end up implementing utility and adaptor services (such as [image conversion](https://github.com/singnet/face-services/issues/7)) to allow
services be composed more easily.

Services define their API using [protobuf](https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition). This allows SingularityNET clients to determine the request/response schema programmatically. This definition, or "service specification" is published using the CLI. An example of defining this API and publishing a service that implements it, is available [here](/tutorials/publish.md).

A "service" is defined through it's specification and [it's metadata](/docs/concepts/service-metadata).

A service is "published", by uploading the specification and metadata to IPFS, and updating the [Registry contract](/docs/concepts/registry). Both of these actions are handled by the CLI.

For a full example of publishing a service, see ["How to Publish a SingularityNET Service"](/tutorials/publish).

# Current gRPC limitations

There are certain restrictions in how you can use gRPC. Some are design choices that might be relaxed, others are features will be fixed in later releases:

- No support for streaming gRPC requests and responses, but [a fix is coming soon](https://github.com/singnet/snet-daemon/issues/195).
- Your gRPC model must be represented in a flat directory structure. All `.proto` files will be uploaded in an archive and compiled in this namespace. This makes
  it difficult to use shared data models between related services.
