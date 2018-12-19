---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: Service Integration Guidelines
description: This guide will help AI providers integrate services into the platform.

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
In this guide, you will find the guidelines to help you write and integrate new AI services to the platform.

## Supported languages
SingularityNET services use [gRPC](https://grpc.io/), which is an open-source universal RPC
framework. Any new service must provide its API in the gRPC standard.

gRPC supports several programming languages such as:
- C++
- Java
- Python
- Go
- Ruby
- C#
- Node.js
- Android Java
- Objective-C
- PHP

A guide for each of them is available [here](https://grpc.io/docs/).

We have created tutorials with step-by-step instructions for implementing a new
service in a number of these languages:

- [How to write a SingularityNET service in C++](/tutorials/cpp)
- [How to write a SingularityNET service in Python](/tutorials/python)
- [How to write a SingularityNET service in Java](/tutorials/java)
- [How to write a SingularityNET service in Go](/tutorials/go)

If you already have a gRPC service, please check out [this](/tutorials/publish) tutorial to learn how to publish a service.

Make sure you follow our [naming standardization guidelines](/docs/all/naming-standard) as well when naming your services.

## AI frameworks
There are a couple of AI frameworks integrated to SingularityNET so you can just add new functionalities to services which are already published.

- [OpenCog](https://opencog.org/): an open-source software project aimed at directly confronting the AGI challenge, using mathematical and biological inspiration and professional software engineering techniques. It currently ranks in the top 10 in Github for most popular AI projects!

There are tutorials with step-by-step instructions on how to extend the existing AI framework service in order to implement new functionalities:
- [How to write an OpenCog service for SingularityNET](/tutorials/opencog)

## Third-party code and models
Before publishing a service based on third-party code or model(s), make sure
you follow all the guidelines below.

- The service is FREE.
- The main documentation of the service (e.g. README.md) mentions (crystal clear) that the service is based on third-party work.
- The original work (code, paper, model etc) is clearly mentioned and properly linked in README.
- The authors of the original code or model(s) are clearly mentioned in README.
- Any licenses attached to the original work is mentioned in README.
- The terms of any license attached to the original work allows its use in SingularityNET.

See [this example](https://github.com/singnet/dnn-model-services) of a third-party based service documentation which is fully compliant with these guidelines.

## Service documentation
All the following documentation is recommended for any service.

- **README** describing the structure of the repository and how to build/test the service. This is a sort of "developer's guide" aimed at people interested in extending or reusing the service.
- **docs/index.html** pointed by standard Github Pages describing how to use the service. This is the "user's guide" of your service.
- **LICENSE** with an MIT license, the license of choice SingularityNET usually uses as well.

If you are extending an existing service. Follow any particular guidelines of the specific project and make sure you update all the aforementioned documents accordingly.

See [this example](https://github.com/singnet/opencog-services) of service documentation which is fully compliant with these guidelines.

## Contributing to existing projects
SingularityNET has several AI service integration projects. See our [github](https://github.com/singnet) for a list of them. Before contributing to any of these, please read our [contribution guidelines](/docs/contribute/contribution-guidelines).
