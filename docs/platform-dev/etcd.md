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

The limitation of using separate payment channel for each replica, becomes expensive from the gas consumption and time execution, because each operation performed on an open a channel needs processing by the Blockchain.
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
|replica 2 |yes              |node 2         |http://AAA.BBB.1.2:2379 | http://AAA.BBB.1.2:2380| 
|replica 3 |yes              |ZAB            |                        |                        |
|replica 4 |yes              |node 3         |http://AAA.BBB.1.4:2379 |http://AAA.BBB.1.4:2380 |
|replica 5 |no               |               |                        |                        |

**Note**: Such a configuration requires that all replicas which maintain an etcd node need to be started first to have a functional etcd cluster.

### Incremental etcd cluster creation approach

Starting etcd cluster requires that initial size of the cluster was defined during cluster bootstrap. It means that the cluster begins to work only when quorum number of nodes join the cluster.
Suppose there are 3 replicas and they want to run 3 ectd nodes. When the first replica starts an etcd node, it is not able to write and read from the etcd because 2 more etcd nodes need to join the cluster.

As an alternative, it is suggested that the first replica starts with etcd cluster which consists of only one etcd node. In this case it will be able to read and write to the etcd. When the second replica starts it can find the existing etcd cluster (using the address of the first replica) and just adds the second node to the cluster.

This allows us to have a working etcd cluster even when only some of the replicas are running.

**Note**: etcd has a Discovery Service Protocol. It is only used in the cluster bootstrap phase, and cannot be used for runtime reconfiguration.

The following algorithm describes the creating and updating of the etcd cluster during replica initialization based on an incremental approach

**Input**

Each replica needs to have access to the following info which is provided during the replica starting:
- etcd cluster token value
- list of all replicas with corresponding values:
    - replica id
    - etcd node name
    - etcd ip address
    - ectd client and peer ports

Cluster Configuration Table

The table with the given columns will be maintained in etcd cluster:
- replica id
- timestamp
- running etcd server node flag

The last field indicates that a replica started an etcd server instance and that it had been alive at the time when the record to the Cluster Configuration Table was written.

**Replicas to etcd nodes correspondence**
Each replica can use a predefined function which returns the number of etcd nodes that are necessary to run for the given number of live replicas.

The function can be described in pseudocode like:

```
numberOfEtcdNodes(numberOfReplicas) {
    1, 2   -> 1
    3, 4   -> 3
    5, ... -> 5
```
**Detecting added and failed replicas**
It is suggested to use the heartbeat mechanism to detect failures in replicas. Each replica needs to repeatedly write a timestamp using the replica id as a key to the Cluster Configuration Table. 

When the difference between the current time and the timestamp of the replica is higher than a certain threshold, the replica is considered dead.

**Detecting failed etcd nodes**
etcd Admin API Documentation provides a REST API to check the health of an etcd node.

###Initial state

The first initialized replica detects that there is no etcd cluster and starts an embedded etcd instance.

###Main loop
Each replica reads the Cluster Configuration Table, checks the number of live replicas and calculates the number of required etcd nodes using the numberOfEtcdNodes(numberOfReplicas) function.

If the number of required etcd nodes is less than the current number of live etcd nodes, then only one replica with the lowest id that does not have a running embedded etcd node starts it and adds this node to the current cluster.

There can be two results:
- The embedded etcd is successfully run
- The replica which starts the etcd misses the timeout and is considered dead

If the etcd node initialization succeeds, the replica adds the record to the Cluster Configuration Table to let it know that it has running ectd node.

In both cases the process can be just repeated as is.

#Setting-up ETCD Cluster

Starting an etcd cluster statically requires that each member knows another in the cluster. In that regard, we should know the public and private ips of the machines well ahead before setting up the cluster.

The public and private ips of these machines are used to generate the server, client and peer certificates. Using these certificates, the cluster will be setup with TLS Authentication enabled.

|Name      | Private Ip  |Public Ip     |Hostname             |
|------------------------|--------------|---------------------|
|member-1  |10.0.1.10    |54.93.140.146 |member-1.example.com |
|member-1  |10.0.1.11    |54.93.140.76  |member-2.example.com |   
|member-1  |10.0.1.12    |54.93.140.30  |member-3.example.com |

This document considers to deploy three node etcd cluster. Following are the example nodes for our reference.

##Infrastructure Diagram

ETCD Cluster setup on AWS. 

Imaga 7 Diagram

##Generating Certificates

Three certificate types will be used to setup the cluster
- Client certificate is used to authenticate client by server. For example etcdctl, etcd proxy, or docker clients.
- Server certificate is used by server and verified by client for server identity. For example docker server or kube-apiserver.
- Peer certificate is used by etcd cluster members as they communicate with each other in both ways.
###Download cfssl
Let's use cfssl and walk through the whole process to create all the required certificates. This document assumes that you are generating these certificates with cfssl on your local x86_64 Linux host.

```
mkdir ~/bin
curl -s -L -o ~/bin/cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
curl -s -L -o ~/bin/cfssljson https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
chmod +x ~/bin/{cfssl,cfssljson}
export PATH=$PATH:~/bin
```
###Initialize a certificate authority
First of all we have to save default cfssl options for future substitutions:
```
mkdir ~/cfssl
cd ~/cfssl
cfssl print-defaults config > ca-config.json
cfssl print-defaults csr > ca-csr.json
```

###Configure CA options
Update the generated ca-config.json config file with the below content in order to generate three set of certificates

```
{
    "signing": {
        "default": {
            "expiry": "43800h"
        },
        "profiles": {
            "server": {
                "expiry": "43800h",
                "usages": [
                    "signing",
                    "key encipherment",
                    "server auth"
                ]
            },
            "client": {
                "expiry": "43800h",
                "usages": [
                    "signing",
                    "key encipherment",
                    "client auth"
                ]
            },
            "peer": {
                "expiry": "43800h",
                "usages": [
                    "signing",
                    "key encipherment",
                    "server auth",
                    "client auth"
                ]
            }
        }
    }
}
```

**Note**: You can set the expiry of the certificates based on the requirement.

You can also modify ca-csr.json Certificate Signing Request (CSR):

```
{
    "CN": "My own CA",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "US",
            "L": "CA",
            "O": "My Company Name",
            "ST": "San Francisco",
            "OU": "Org Unit 2"
        }
    ]
}
```
And generate CA with defined options:

cfssl gencert -initca ca-csr.json | cfssljson -bare ca -
You'll get following files:
```
ca-key.pem
ca.csr
ca.pem
```
**Note**: Please keep ca-key.pem file in safe. This key allows to create any kind of certificates within your CA.
###Generate server certificate
{ cfssl print-defaults csr > server.json

Most important values for server certificate are Common Name (CN) and hosts. We have to substitute them, with public ips. For example:
```
"CN": "etcd-cluster",
    "hosts": [
        "domain-name",
        "54.93.140.146",
        "54.93.140.76",
        "54.93.140.30",
        "127.0.0.1"
    ],
    "key": {
        "algo": "ecdsa",
        "size": 256
    },
    "names": [
        {
            "C": "US",
            "L": "CA",
            "ST": "San Francisco"
        }
    ]
}
```
**Note**: It's mandatory to include 127.0.0.1 in the hosts section as it acts as a loopback resolver.

Now we are ready to generate server certificate and private key:
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server.json | cfssljson -bare server

You'll get following files:
```
server-key.pem
server.csr
server.pem
```

###Generate peer certificate
cfssl print-defaults csr > member1.json

Substitute CN and hosts values, for example:

```
{
    "CN": "member-1",
    "hosts": [
      "member-1",
      "member-1.local",
      "10.0.1.10",
      "10.0.1.11",
      "10.0.1.12",
      "127.0.0.1"
    ],
    "key": {
        "algo": "ecdsa",
        "size": 256
    },
    "names": [
        {
            "C": "US",
            "L": "CA",
            "ST": "San Francisco"
        }
    ]
}
```
Now we are ready to generate member1 certificate and private key:
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=peer member1.json | cfssljson -bare member1

You'll get following files:
```
member1-key.pem
member1.csr
member1.pem
```
Repeat these steps for each etcd member hostname.

###Generate client certificate
cfssl print-defaults csr > client.json
For client certificate we can ignore hosts values and set only Common Name (CN) to client value

```
{
    "CN": "client",
    "hosts": [""],
    "key": {
        "algo": "ecdsa",
        "size": 256
    },
    "names": [
        {
            "C": "US",
            "L": "CA",
            "ST": "San Francisco"
        }
    ]
}
```
Generate client certificate:
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client client.json | cfssljson -bare client

You'll get following files:
```
client-key.pem
client.csr
client.pem
```
##Download, Install & Configuring the ETCD Cluster
Download the etcd binary in each of the boxes and configure the cluster by following the below steps.

Download the etcd binary

Download the binary of the etcd in each of the server.

```
client-key.pem
cd ~
wget https://github.com/etcd-io/etcd/releases/download/v3.3.13/etcd-v3.3.13-linux-amd64.tar.gz
tar -zxvf etcd-v3.3.13-linux-amd64.tar.gz
cd etcd-v3.3.13-linux-amd64/
sudo mv etcd etcdctl /usr/bin/
cd ~
rm -rf etcd-v3.3.13-linux-amd64*
```

###Copy the generated certificates

Copy the ca.pem,server.pem, server-key.pem, member-1.pem & member-1-key.pem into member-1 server.
```
mkdir -p /var/lib/etcd/cfssl
cp ca.pem server.pem server-key.pem member-1.pem member-1-key.pem /var/lib/etcd/cfssl
```
Similarly copy the other member certificates to their respective servers.

###Create a service file for etcd
Create a service file in member-1 machine with the below content.
```
echo "
[Unit]
Description=etcd service
Documentation=https://github.com/coreos/etcd

[Service]
User=root
Type=notify
ExecStart=/usr/bin/etcd \\
 --name member-1 \\
 --data-dir /var/lib/etcd \\
 --initial-advertise-peer-urls https://10.0.1.10:2380 \\
 --listen-peer-urls https://10.0.1.10:2380 \\
 --listen-client-urls https://10.0.1.10:2379,https://127.0.0.1:2379 \\
 --advertise-client-urls https://10.0.1.10:2379 \\
 --initial-cluster-token etcd-cluster-1 \\
 --initial-cluster member-1=https://10.0.1.10:2380,member-2=https://10.0.1.10:2380,member-3=https://10.0.1.10:2380 \\
 --client-cert-auth --trusted-ca-file=/var/lib/etcd/cfssl/ca.pem \\
 --cert-file=/var/lib/etcd/cfssl/server.pem --key-file=/var/lib/etcd/cfssl/server-key.pem \\
 --peer-client-cert-auth --peer-trusted-ca-file=/var/lib/etcd/cfssl/ca.pem \\
 --peer-cert-file=/var/lib/etcd/cfssl/member-1.pem --peer-key-file=/var/lib/etcd/cfssl/member-1-key.pem \\
 --initial-cluster-state new
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target " > /lib/systemd/system/etcd.service
```

**Note**: Please make sure that you update the private-ip with your respective ips. Repeat the above step for member-2 and member-3 machines.
##Starting the cluster
Make sure the ports 2380 is open between the nodes and 2379 is open to the world. Reload the daemon and start the service.

```
systemctl daemon-reload
systemctl enable etcd
systemctl start etcd.service
```

##Testing the Cluster
In order to test the cluster, use the generated ca.pem, client.pem & client-key.pem. Replace the domain name with the specific domain or public ip and execute the below command.
```
curl --cacert ca.pem --cert client.pem --key client-key.pem https://domain-name:2379/health
```
You would get the below output.
```
{"health": "true"}
```
**Note**: Ship the ca.pem, client.pem & client-key.pem files along with daemon, and follow the daemon configuration in order to establish a connection between etcd and daemon.
##The Set of Channels and Manipulation Functions
Each “atomic” payment channel in MPE is represented by the following structure:
```
//the full ID of “atomic” payment channel = “[this, channel_id, nonce]”
struct PaymentChannel {
        address sender;      // The account sending payments.
        Address recipient;   // The account receiving the payments.
        Bytes32 groupId;     // id of group of replicas who share the same payment channel
// You should generate groupId randomly in order to prevent
// two PaymentChannel with the same [recipient, groupId]
        uint256 value;      // Total amount of tokens deposited to the channel.
        Uint256 nonce;      // “nonce” of the channel (by changing nonce we  ecipient y close the old channel ([this, channelId, oldNonce])
//  and open the new channel [this, channelId, newNonce])
//!!! Nonce also prevents race  ecipient between channelClaim and channelExtendAndAddFunds
    uint256 expiration;     // Timeout (in block numbers) in case the recipient never closes.
// if block.number > expiration then sender can call channelClaimTimeout
        address signer;    // signer on behalf of sender
   }
mapping (uint256 => PaymentChannel) public channels;
```

The following list describes about the code:
- Complete ID of an “atomic” payment channel is [MPEContractAddress, channelId, nonce].
- MPEContractAdress is the address of Multi-Party Escrow contract, which is needed to prevent a multi contract attack.
- channelId is an index in the channels mapping.
- nonce is a part of the close/reopen logic.
- Can effectively close the old channel by changing the nonce  [MPEContractAddress, channelId, oldNonce] and open the new one [MPEContractAddress, channelId, newNonce]. We will go more into details about this later.
- nonce can prevent a race condition between  channelClaim and channelExtendAndAddFunds.
- Sservice provider can use the same Ethereum wallet for different replicas by modifying the full ID of the recipient is [recipient_ethereum_address, groupId]. 
     
