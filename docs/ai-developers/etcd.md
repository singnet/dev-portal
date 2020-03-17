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

## etcd Overview

<a href="https://github.com/etcd-io/etcd" target="_blank">etcd</a> is a distributed reliable key-value store having the following properties:

* **Simple**: well-defined, user-facing API (gRPC)
* **Secure**: automatic TLS with optional client cert authentication
* **Fast**: benchmarked 10,000 writes/sec
* **Reliable**: properly distributed using Raft

etcd is written in Go and uses the Raft consensus algorithm to manage a highly-available replicated log.

## etcd and SingularityNet Platform

<a href="https://github.com/etcd-io/etcd" target="_blank">etcd</a> is used as storage to store context related to 
* <a href="https://dev.singularitynet.io/docs/platform-dev/daemon-channel-storage/" target="_blank">Payments</a>
* Free Call Usage
at an organization level. 

## Samples

* The <a href="https://github.com/singnet/example-service/tree/master/service" target="_blank">example service</a> is an example of a Python arthimetic service with gRPC endpoints and a proto definition.
* These <a href="https://grpc.io/docs/guides/" target="_blank">guides</a> are a good starting point to creating gRPC based services