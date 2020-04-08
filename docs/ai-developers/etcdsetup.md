---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Developers
---

# SETTING UP ETCD CLUSTER

Starting an etcd cluster normally requires each member to be familiar with other members in the cluster. Also, you need to determine in advance the public and private IP addresses of the system before setting up the cluster.

To generate the server, client and peer certificates, use the public and private IP addresses of these machines. Using these certificates, the cluster will be setup with Transport Layer Service (TLS) Authentication enabled.

This document considers deploying three node etcd cluster.

Following are the example nodes for our reference.


|Name    |Private Ip|  Public Ip  |    Hostname      |
|-----   |--------- |------------ |----------------- |
|member-1|10.0.1.10 |54.93.140.146|member-1.example.com|
|member-2|10.0.1.11 |54.93.140.76 |member-2.example.com|
|member-3|10.0.1.12 |54.93.140.30 |member-3.example.com|

## Infrastructure Diagram

Infrastural diagram of ETCD Cluster setup on AWS.
![Etcd Cluster Infrastructure](/assets/img/etcd/etcd-cluster.png)

## Generating Certificates

To setup the cluster, use three types of certificate, such as:
- **Client certificate** : Server uses to authenticate client. For example etcdctl, etcd proxy, or docker clients.
- **Server certificate** : Server uses and client verifies for server identity. For example docker server or kube-apiserver.
- **Peer certificate**   : etcd cluster  members uses this certificate to communicate both ways.

### Download cfssl
Let's use cfssl on your local x86_64 Linux host, and walk through the process, of generating all required certificates.

```bash
mkdir ~/bin
curl -s -L -o ~/bin/cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
curl -s -L -o ~/bin/cfssljson https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
chmod +x ~/bin/{cfssl,cfssljson}
export PATH=$PATH:~/bin
```

### Initialize a certificate authority
First of all we have to save default cfssl options for future substitutions:
```bash
mkdir ~/cfssl
cd ~/cfssl
cfssl print-defaults config > ca-config.json
cfssl print-defaults csr > ca-csr.json
```

### Configure CA options

Update the generated ca-config.json config file with the below content in order to generate three set of certificates.

```json
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
**Note:** You can specify a particular expiry date for each certificate based on the requirement.

Also, you could modify the ca-csr.json Certificate Signing Request (CSR):

```json
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
            "OU": "Org Unit 1",
            "OU": "Org Unit 2"
        }
    ]
}
```
And generate CA with defined options:
```bash
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -
```

You'll get following files:
```
ca-key.pem
ca.csr
ca.pem
```
**Note:** Keep ca-key.pem file safely. This key allows to create any kind of certificates within your CA.

### Generate server certificate
```bash
cfssl print-defaults csr > server.json
```
**Important**: Values for server certificate are Common Name (CN) and hosts. We have to substitute them, with public ips. For example:
```json
{
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
**Note:** It's mandatory to include `127.0.0.1` in the hosts section as it acts as a loopback resolver.

Now we are ready to generate server certificate and private key:
```bash
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server.json | cfssljson -bare server
```
The following files are generated:
```
server-key.pem
server.csr
server.pem
```

### Generate peer certificate
```bash
cfssl print-defaults csr > member-1.json
```
Substitute CN and hosts values, for example:
```json
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
Now we are ready to generate member-1 certificate and private key:
```bash
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=peer member-1.json | cfssljson -bare member-1
```
The following files are generated:
```
member-1-key.pem
member-1.csr
member-1.pem
```
Repeat the above steps for each etcd member hostname.

### Generate client certificate

```bash
cfssl print-defaults csr > client.json
```
For client certificate we can ignore hosts values and set only Common Name (CN) to client value:
```json
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
```bash
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client client.json | cfssljson -bare client
```
The following files are generated:
```
client-key.pem
client.csr
client.pem
```

## Download, Install & Configuring the ETCD Cluster
Download the etcd binary in each of the boxes and and follow the steps below to configure the cluster:

### Download the etcd binary
Download the binary of the etcd in each server.
```bash
cd ~
wget https://github.com/etcd-io/etcd/releases/download/v3.1.20/etcd-v3.1.20-linux-amd64.tar.gz
tar -zxvf etcd-v3.1.20-linux-amd64.tar.gz
cd etcd-v3.1.20-linux-amd64/
sudo mv etcd etcdctl /usr/bin/
cd ~
rm -rf etcd-v3.1.20-linux-amd64*
```

### Copy the generated certificates.
Copy the `ca.pem`,`server.pem`, `server-key.pem`, `member-1.pem` & `member-1-key.pem` into `member-1` server.
```bash
mkdir -p /var/lib/etcd/cfssl
cp ca.pem server.pem server-key.pem member-1.pem member-1-key.pem /var/lib/etcd/cfssl
```
Similarly, copy the other member certificates to their respective servers.

### Create a service file for etcd.
Create a service file in member-1 machine with the below content:
```bash
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
**Note:** Ensure, you update the `private-ip` address with your respective `ips` address.
Accordingly, reiterate the above step for member-2 and member-3 machines.

### Starting the cluster.
Make sure the port`2380` is open between the nodes, and port `2379` to the world.
Reload the daemon and start the service.

```bash
systemctl daemon-reload
systemctl enable etcd
systemctl start etcd.service
```

### Testing the Cluster
To test the cluster, use the generated `ca.pem`, `client.pem` & `client-key.pem`. Replace the domain name with the specific domain or "public ip" and execute the below command.

```bash
curl --cacert ca.pem --cert client.pem --key client-key.pem https://domain-name:2379/health
```

You would get the below output.
```json
{"health": "true"}
```

**Note**: Ship the `ca.pem`, `client.pem` & `client-key.pem` files along with daemon, and follow the daemon configuration to connect between etcd and daemon.

###Setting up your own ETCD cluster
         To set up your own ETCD cluster please follow the link here .  
      Certificates for ETCD
         For snet all ETCD storage , required certificates are available at drive  
         For SNET Organisation, in order to renew the ETCD Client Certificates
Run the etcd-client-certificates-generation job.
This will generate client-certificates in this path.

        For other Organisations, follow the below steps to regenerate the etcd client certificates.
Download the cfssl & cfssljson using the below commands

curl -s -L -o cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
curl -s -L -o cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64

Copy the ca.pem, ca-key.pem, ca-config.json & client.json that you previously used for generating the etcd certificates.
Run the below command to generate the client certificates.

   ./cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client.json | ./cfssljson -bare client
