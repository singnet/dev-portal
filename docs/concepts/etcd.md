---
# Page settings
layout: default
keywords: concepts
comments: false

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