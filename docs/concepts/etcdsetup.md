# SETTING UP ETCD CLUSTER

Starting an etcd cluster statically requires that each member knows another in the cluster. In that regard, we should know the public and private ips of the machines well ahead before setting up the cluster.

The public and private ips of these machines are used to generate the server, client and peer certificates. Using these certificates, the cluster will be setup with TLS Authentication enabled.

This document considers to deploy three node etcd cluster.
Following are the example nodes for our reference.


|Name    |Private Ip|  Public Ip  |    Hostname      |
|-----   |--------- |------------ |----------------- |
|member-1|10.0.1.10 |54.93.140.146|member-1.example.com|
|member-2|10.0.1.11 |54.93.140.76 |member-2.example.com|
|member-3|10.0.1.12 |54.93.140.30 |member-3.example.com|

## Infrastructure Diagram

Infrastural diagram of ETCD Cluster setup on AWS.
![Etcd Cluster Infrastructure](etcd-cluster.png)

## Generating Certificates

Three certificate types will be used to setup the cluster
- **Client certificate** is used to authenticate client by server. For example etcdctl, etcd proxy, or docker clients.
- **Server certificate** is used by server and verified by client for server identity. For example docker server or kube-apiserver.
- **Peer certificate** is used by etcd cluster members as they communicate with each other in both ways.

### Download cfssl
Let's use cfssl and walk through the whole process to create all the required certificates.
This document assumes that you are generating these certificates with cfssl on your local x86_64 Linux host.

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

Update the generated ca-config.json config file with the below content in order to generate three set of certifcates.

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
**Note:** You can set the expiry of the certificates based on the requirement.

You can also modify ca-csr.json Certificate Signing Request (CSR):

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
**Note:** Please keep ca-key.pem file in safe. This key allows to create any kind of certificates within your CA.

### Generate server certificate
```bash
cfssl print-defaults csr > server.json
```
Most important values for server certificate are Common Name (CN) and hosts. We have to substitute them, with public ips. For example:
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
You'll get following files:
```
server-key.pem
server.csr
server.pem
```

### Generate peer certificate
```bash
cfssl print-defaults csr > member1.json
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
Now we are ready to generate member1 certificate and private key:
```bash
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=peer member1.json | cfssljson -bare member1
```
You'll get following files:
```
member1-key.pem
member1.csr
member1.pem
```
Repeat these steps for each etcd member hostname.

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
You'll get following files:
```
client-key.pem
client.csr
client.pem
```

## Download, Install & Configuring the ETCD Cluster
Download the etcd binary in each of the boxes and configure the cluster by following the below steps.

### Download the etcd binary
Download the binary of the etcd in each of the server.
```bash
cd ~
wget https://github.com/etcd-io/etcd/releases/download/v3.3.13/etcd-v3.3.13-linux-amd64.tar.gz
tar -zxvf etcd-v3.3.13-linux-amd64.tar.gz
cd etcd-v3.3.13-linux-amd64/
sudo mv etcd etcdctl /usr/bin/
cd ~
rm -rf etcd-v3.3.13-linux-amd64*
```

### Copy the generated certificates.
Copy the `ca.pem`,`server.pem`, `server-key.pem`, `member-1.pem` & `member-1-key.pem` into `member-1` server.
```bash
mkdir -p /var/lib/etcd/cfssl
cp ca.pem server.pem server-key.pem member-1.pem member-1-key.pem /var/lib/etcd/cfssl
```
Similarly copy the other member certifcates to their respective servers.

### Create a service file for etcd.
Create a service file in member-1 machine with the below content.
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
**Note:** Please make sure that you update the `private-ip` with your respective `ips`.
Repeat the above step for member-2 and member-3 machines.

### Starting the cluster.
Make sure the ports `2380` is open between the nodes and `2379` is open to the world.
Reload the daemon and start the service.

```bash
systemctl daemon-reload
systemctl enable etcd
systemctl start etcd.service
```

### Testing the Cluster
In order to test the cluster, use the generated `ca.pem`, `client.pem` & `client-key.pem`. Replace the domain name with the specific domain or public ip and execute the below command.

```bash
curl --cacert ca.pem --cert client.pem --key client-key.pem https://domain-name:2379/health
```

You would get the below output.
```json
{"health": "true"}
```

**Note**: Ship the `ca.pem`, `client.pem` & `client-key.pem` files along with daemon, and follow the daemon configuration in order to establish a connection between etcd and daemon.