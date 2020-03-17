---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Developers

# Micro navigation
micro_nav: true

---

## gRPC Overview

gRPC is a modern open source high performance RPC framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services. By default, gRPC uses <a href="https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition" target="_blank">protocol buffers</a> as the Interface Definition Language (IDL) for describing both the service interface and the structure of the payload messages. .gRPC <a href="https://grpc.io/docs/">Docs</a> is the recommended starting point to understand how this works


## gRPC and SingularityNet Platform

AI Services on the Singularitynet platform need to define their API using <a href="https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition" target="_blank">protocol buffers</a> and expose a gRPC endpoint. This allows SingularityNET clients to determine the request/response schema programmatically. The first step in getting the AI service ready for the SingularityNet platform is to have a proto definition and expose a gRPC endpoint for it. Once this is done, the service can be integrated with the SingulartiyNet Daemon.

## Samples

* The <a href="https://github.com/singnet/example-service/tree/master/service" target="_blank">example service</a> is an example of a Python arthimetic service with gRPC endpoints and a proto definition.
* These <a href="https://grpc.io/docs/guides/" target="_blank">guides</a> are a good starting point to creating gRPC based services

