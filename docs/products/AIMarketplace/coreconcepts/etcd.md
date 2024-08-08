## ETCD Overview

<a href="https://github.com/etcd-io/etcd" target="_blank">etcd</a> is a distributed reliable key-value store having the following properties:

* **Simple**: well-defined, user-facing API (gRPC)
* **Secure**: automatic TLS with optional client cert authentication
* **Fast**: benchmarked 10,000 writes/sec
* **Reliable**: properly distributed using Raft

etcd is written in Go and uses the Raft consensus algorithm to manage a highly-available replicated log.

## etcd and SingularityNet Platform

<a href="https://github.com/etcd-io/etcd" target="_blank">etcd</a> is used as storage to store context related to 
[Payments](/docs/products/AIMarketplace/daemon/daemon-channel-storage)
* Free Call Usage
at an organization level. 

The section [ETCD setup](/docs/products/AIMarketplace/coreconcepts/etcdsetup) section details how to set up an etcd cluster