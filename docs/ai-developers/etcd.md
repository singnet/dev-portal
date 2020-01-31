---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Consumers

## Daemon-Channel Storage

To complete a request from a client to a service, a snet-daemon needs to store and process information about the service payment. This connection is known as the payment channel.
The following illustration shows the a single service with corresponding snet-daemon process.

Image 1

When the payment moves to a validation process, the payment channel is stored in an internal storage to be claimed after the service completes the request. If a service creates several replications, the operation becomes complex. So it becomes difficult to manage snet-daemons containing independent internal storage.

Image 2

The limitation of using separate payment channel for each replica, becomes expensive from the gas consumption and time execution, because each operation performed on an open a channel needs processing by the blockchain.
Therefore, such model is vulnerable to a breach (attack) causing same payment on different replicas based on the service. This leads to a model where all snet-daemons for the same service can use the shared storage.

Image 3

Note: An instance of a storage can leads to a single point of failure on the whole system causing failure of all payments, even when replicas exist.
Therefore, distributed storage model was considered, because, of more available storage, and require to choose one optimal choice, considering adherence to several other available criteria :
According to CAP theorem, you can select only two of three main guarantees:

- Partition tolerance
- Availability
- Consistency

## Partition tolerance

The partition tolerance distributed storage saves system from network failures and provides strong consistency guarantees, in order to avert situation of same payment used twice on different replicas.

## Availability

The availability guarantee is also considered very significant. 
If any node(s) is available in a distributed storage, then read/write requests cannot be performed, this incurs additional expense in the form of paying in exchange for a strong consistency storage system.

Assume only partition tolerance and consistency are considered:
- Partition tolerance
- Consistency

The following illustration shows the new design:

Image 4

|**Distributed Storage** | Language  |Consensus|Embedded Server Support|
|------------------------|---------- |----------------------------------|
|**Etcd**                | Go        |Raft     |Native                  |
|**Consul**              | Go        |Raft     |Ticket 467              |   
|**ZooKeeper**           |	Java     |ZAB      |Native                  |

The approach is fine, but it requires for a service owner to setup a snet-daemon for each replica, and deploy a separated distributed storage. Such approach becomes a very time consuming and creates a complex task.

Alternatively, incorporating the distributed storage nodes into snet-daemons can make the snet-daemon's task to run specific distributed storage nodes:

Image 5

## Considered storages
For a distributed storage with strong consistency guarantees which can be run by snet-daemon (e.g. easily integrated into a Go program), following list of distributed storage were considered:

### Etdc
The primary consideration was Etcd  storage system. This distributed storage was programmed using the Go language, and has a native embedded server support. This means that its nodes can be started and stopped by snet-daemon replicas.

### Consul
Currently it is unclear whether it is possibile to execute a consul server agent from a Go application. A few examples (embedded-consul 1 2 just bundles the Consul as a binary package.

### Zookeeper
Zookeeper is just written in Java and requires additional support to start Zookeeper nodes from Go application.

**Note**: All these storages use a quorum to get a consensus during leader election and values writings. This means that if the number of failed nodes are more than half of all nodes, then the cluster stops working. As it was described before, this is a cost for a distributed system to provide strong consistency guarantees.

## Etcd storage

### Running and accessing embedded etcd cluster
Starting an etcd node requires the following parameters:
- name: human-readable name for the node.
- listen-client-urls: list of URLs to listen on for client traffic
- listen-peer-urls: list of URLs to listen on for peer traffic
- initial-cluster: initial cluster configuration for bootstrapping, for example:
- name1=http://AAA.BBB.1.1:2380,name2=http://AAA.BBB.1.2:2380
- initial-cluster-token: initial cluster token for the etcd cluster during bootstrap

The following Go code is used to start etcd node and the etcd client:
- etcd_storage_server.go
- etcd_storage_client.go

There are some throughput tests which run several etcd nodes locally and measures the number of writes, and then compares and sets the requests per second.

**Note**: All etcd nodes were run locally on separate server, so their corresponding results are different for etcd node.

### etcd cluster size

According to the etcd FAQ it is suggested to have an odd number of etcd nodes in a cluster, usually 3 or 5. It also mentions that "Although larger clusters provide better fault tolerance, the write performance suffers because data must be replicated across more machines."

## Proposed solutions

Image 6

The following solutions are based on the embedded Etcd storage discussed in details in the following chapters:
- Command line etcd cluster creation
- Fixed size etcd cluster
- Incremental etcd cluster creation

### Command line etcd cluster creation

This approach adds a command line option to snet-cli,  which allows starting an etcd instance as part of the etcd cluster:
snet storage init --name name --token unique-token --client-url http://AAA.BBB.1.1:2379 --peer-url http://AAA.BBB.1.1:2380 --initial-cluster name1=http://AAA.BBB.1.1:2380,name2=http://AAA.BBB.1.2:2380

**Note**: A list of client-urls needs to be passed to each replica to access the etcd cluster storage.

### Fixed size etcd cluster

This approach assumes that etcd nodes are started by replicas and that the size of etcd cluster is fixed. 

The following  configuration file contains a list of all replicas mentioning the status of the start etcd node, etcd node name, etcd node client url and ecd node peer url respectively.

For example:


|replica id| start etcd node  |etcd node name|etcd node client url   |etcd node peer url       |
|----------------------------|---------------|-----------------------|-------------------------|
|replica 1 |yes              |node 1         |http://AAA.BBB.1.1:2379 | http://AAA.BBB.1.1:2380|
|replica 1 |yes              |node 2         |http://AAA.BBB.1.2:2379 | http://AAA.BBB.1.2:2380| 
|replica 1 |yes              |ZAB            |                        |                        |
|replica 1 |yes              |node 3         |http://AAA.BBB.1.4:2379 |http://AAA.BBB.1.4:2380 |

