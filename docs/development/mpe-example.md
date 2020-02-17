---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: "Multi Party Escrow: Front to back example."
description: Using the MPE payment system in SingularityNET with one replica configuration.

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

You can find script for this example and instruction how to run it inside a docker [here (example 1)](https://github.com/singnet/dev-portal/tree/master/src/example1).

We will demonstrate the following:

- from the server side:
* How to publish your service (in MPE payment system)
* How to configure your daemon(s)
* How to claim the funds from the server side using "treasurer server"

- from the client side:
* How to open the payment channel
* How to make calls using MPE payment system


## Preparation

Please start by following the tutorial [How to Build and Deploy SingularityNET Locally](/docs/development/local-singularitynet).

The following example can also be executed on the kovan test net, but you will need to make sure that your organization name has not already been taken and you should probably also use another account to collect payments from the client side (see the KOVAN warnings below).

For our local network we assume we have the following accounts

```sh
# First Address (snet identity): 0x592E3C0f3B038A0D673F19a18a773F993d4b2610
# Second Address (service)     : 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
```

In order to get exactly these addresses you should run [ganache](https://truffleframework.com/ganache) with the following mnemonics: 'gauge enact biology destroy normal tunnel slight slide wide sauce ladder produce'.

**WARNING**: NEVER GIVE YOUR PERSONAL MNEMONICS TO ANYONE! IT IS LIKE A PIN CODE. THESE ACCOUNTS HAVE SPECIFICALLY BEEN CREATED FOR DEMONSTRATION PURPOSES AND ARE THEREFORE THROWAWAY ACCOUNTS. NEVER TRANSFER ANYTHING TO THESE EXAMPLE ACCOUNTS THAT IS OF VALUE TO YOU OR THAT YOU DO NOT WANT TO LOSE! NEVER SHARE YOUR PRIVATE KEY WITH ANYONE! THE PRIVATE KEYS FOUND IN THIS TUTORIAL ARE CONNECTED TO EMPTY ACCOUNTS AND ARE FOR DEMONSTRATION PURPOSES ONLY!

## Service Provider: Configuring, Registering, and Starting a Service
### Starting the service (without a daemon)
We will use a Basic_Template service that you can find [here](https://github.com/singnet/dnn-model-services).

```sh
# $SINGNET_REPOS is the path from tutorial, but it could be any directory
cd $SINGNET_REPOS
git clone https://github.com/singnet/example-service.git
cd example-service

# build protobuf
. buildproto.sh
python3 run_example_service.py --no-daemon
```
It will start the service at port 7003.

### Register your service in the registry
Prepare your metadata in `service_metadata.json`. We will register the second ganache identity (0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB) as a recipient wallet.

(KOVAN) On the KOVAN network you might want to choose another wallet.

```sh
cd $SINGNET_REPOS
cd example-service

snet service metadata-init service/service_spec Example1 --encoding proto --service-type grpc --group-name default_group
snet service metadata-set-fixed-price default_group 0.1
snet service metadata-add-endpoints default_group localhost:8080
```

Create an organization with name "testo" and organization id "testo", and publish the service with service id "tests".

(KOVAN) On KOVAN you probably will need to choose another name for your organization.

```sh
snet organization metadata-init testo testo individual
snet organization metadata-add-description --description "Describe your organization details here " --short-description  "This is short description of your organization" --url "https://anyurlofyourorganization"
snet organization add-group default_group 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB http://127.0.0.1:2379

snet organization  create testo --org-id testo -y
snet service publish testo tests -y
```

### Configure and start the daemon
#### Preparation
We assume that the executable file for the daemon is placed in $SINGNET_REPOS/snet-daemon/build/snetd-linux-amd64

```sh
# You could start the daemon from any directory
# We will use directory of the service
cd $SINGNET_REPOS
cd example-service

# ../../../../snet-daemon/build/snetd-linux-amd64 is a path to daemon

# we make a link for simplicity (service is already running)
ln -s ../snet-daemon/build/snetd-linux-amd64 snetd

# if it is not the first time you run this test, and state of blockchain was reset,
# you should reset the state of etcd storage as well
rm -rf storage-1.etcd
```

#### Make a configuration file for the daemon 
Please note , we are using the local etcd set up here 
```sh
cd $SINGNET_REPOS
cd dnn-model-services/Services/gRPC/Basic_Template/

cat > snetd.config.json << EOF
{
   "ETHEREUM_JSON_RPC_ENDPOINT": "http://localhost:8545",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "REGISTRY_ADDRESS_KEY": "0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2",
   "DAEMON_END_POINT": "localhost:8080",
   "IPFS_END_POINT": "http://localhost:5002",
   "ORGANIZATION_ID": "testo",
   "SERVICE_ID": "tests",
   "log": {
   "level": "debug",
   "output": {
   "type": "stdout"
      }
   }
   "payment_channel_storage_server": {
           "id": "storage-1",
           "host" : "127.0.0.1",
           "client_port": 2379,
           "peer_port": 2380,
           "token": "unique-token",
           "cluster": "storage-1=http://127.0.0.1:2380",
           "enabled": true
   }
}
EOF
```



#### Run the daemon
In order to run the daemon we use the following command:

```sh
./snetd-linux-amd64
```

We are now quickly going to look at what will happen next on the **client side** when someone wants to buy our service. After that section, we will go through some more steps relevant to the **server side**.

## Service Buyer: Buying a Service from the Client Side
### Open the payment channel with service provider

(KOVAN) For the KOVAN network you should make sure that you use the right names for organization and services.

```sh
# create identity in snet-cli (probably you've already done it)
snet identity create snet-user rpc --network local
snet identity snet-user

# deposit 100.1 AGI to MPE wallet
snet account deposit 100.1 -y

# open channel with our service (organization=testo service_name=tests)
# channel with channel_id=0 should be created and initialized after this call
snet channel open-init testo default_group 42 +20days -y

```
### Make a call using stateless logic

We are going to make a call using stateless logic [see this page for more information](/docs/concepts/mpe-stateless-client). This means that the client does not need to store any information, except for the `channel_id` of the payment channel which it wants to use. The client can get the list of the payment channels from the blockchain log or from the blockchain itself. However, this operation is quite slow, so the client cannot do this at each call. The most important thing is that we will be able to use this function in the case of a catastrophic recovery.

First, let's request from the blockchain the list of all open channels:

```sh
# take the list of channels from blockchain (from events!)
snet channel print-all-filter-sender
```

We should have one channel with the recipient=0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB, and we should have 42 AGI in it.

In order to make an actual call, the channel should be initialized (meaning: protobuf should be compiled).

Let's check the list of initialized channels:
```sh
snet channel print-initialized
```

Now we can make a call.
```sh
# we make call using stateless logic with the following arguments
#org_id       = testo
#service_id   = tests
#protobuf_method  = add
#parameters       = '{"a":10,"b":32}'
snet client call testo tests default_group add '{"a":10,"b":32}'
```
We can make a call using this state, and we can repeat this call until we spend all the tokens in the channel. There are no on-chain transactions here yet.

```sh
snet client call testo tests default_group mul '{"a":6,"b":7}'
snet client call testo tests default_group add '{"a":10,"b":32}'
```

## Service Provider: Claiming the Channel with a Treasurer Server
The service provider can use the same Ethereum address for all payment groups or she/he can use a different address. In any case, the daemons don't need to send any on-chain transaction. This means that we actually don't need to provide the daemons with direct access to the private key. Instead, a centralized server could sign the transactions from the daemons. We call such a server a treasurer server. In the current version trearurer server logic is implemented via snet-cli.

```sh
# Service has second ganache idendity (--wallet-index 1)
# Print list of unclaimed channels and total sum of unclaimed funds
snet treasurer print-unclaimed --endpoint localhost:8080 --wallet-index 1

#balance before claim
snet account balance --account 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB

# claim all channels
snet treasurer claim-all --endpoint localhost:8080  --wallet-index 1 -y

# balance after claim
snet account balance --account 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
```

The following logic when we ran the treasurer server:
* The treasurer server asks the etcd to send the latest state of the channel, and increments the nonce of the channel.
* Daemon(s) can continue to work with the client without any confirmation from the treasurer or Blockchain.
* The treasurer sends on-chain transactions to claim funds and increases the nonce of the channel (close/reopen channel).
