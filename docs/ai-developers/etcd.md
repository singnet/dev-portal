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

The section [ETCD setup](../etcdsetup) section details how to set up an etcd cluster