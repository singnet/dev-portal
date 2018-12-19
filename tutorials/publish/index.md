---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: How to Publish a SingularityNET Service
description: Getting your service to the SingularityNET Marketplace

# extralink box
extralink:
    title: All Docs
    title_url: '/docs/all'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Back to tutorials
        url: '/tutorials'
    next:
        content: View all docs
        url: '/docs/all'
---



-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker (https://www.docker.com/)_
* _Metamask (https://metamask.io)_

_You will need a private-public key pair to register your service in SNET. Generate them in Metamask before you start this turorial._

-------------------------------

Run this tutorial from a bash terminal.

In this tutorial we'll publish a basic service in SingularityNET using Kovan Test Network.

## Step 1: Setting up with Docker

Setup a `ubuntu:18.04` docker container using provided `Dockerfile`.

```
$ docker build -t snet_service https://github.com/singnet/wiki.git#master:/tutorials/Docker
$ docker run -p 7000:7000 -ti snet_service bash
```

Step 1 may take a couple of minutes to finish. Step 2 can be performed concurrently.

## Step 2: Getting Testnet AGI and Ethereum
> Optional if you already have enough AGI and ETH tokens

You need some AGI and ETH tokens. You can get then for free (using your github
account) here:

* AGI: [https://faucet.singularitynet.io/](https://faucet.singularitynet.io/)
* ETH: [https://faucet.kovan.network/](https://faucet.kovan.network/)

Also see [Fact Sheet](/sheet) for more information about AGI tokens and test networks.

## Step 3: Completing Docker Tutorial

From this point we follow the tutorial in the Docker container's prompt.

Create an "alias" for your private key.

```
# snet identity create MY_ID_NAME KEY_TYPE
```

Replace MY_ID_NAME by an id to identify your key in the SNET-CLI. This id will not be seen by anyone. It's just a way to make it easier for you to refer to your private key (you may have many, btw) in following 'snet' commands. This alias is kept locally in the container and will vanish when it's shutdown. KEY_TYPE can be either

* key
* rpc
* mnemonic
* ledger
* trezor

In this tutorial we'll use KEY_TYPE == key. Enter your private key when prompted.

## Step 4: Creating an organization
> Optional if you already have an organization

Create an organization and add your key to it.

```
# snet organization create ORGANIZATION_NAME
```

Replace ORGANIZATION_NAME by a name of your choice.

If you want to join an existing organization (e.g. SNET), ask the owner to add your public key into it before proceeding.

## Step 5: Editing our JSON file

In this tutorial we'll use a simple service from [SingularityNET Example Service](https://github.com/singnet/example-service).

* Clone the git repository:

```
# git clone https://github.com/singnet/example-service.git
# cd example-service
```

* Install the dependencies and compile the protobuf file:

```
# pip3 install -r requirements.txt
# sh buildproto.sh
```

To start the setup of your service, execute the following command:

```
# snet service metadata_init SERVICE_PROTOBUF_DIR SERVICE_DISPLAY_NAME PAYMENT_ADDRESS
```

`SERVICE_PROTOBUF_DIR`: The folder where your service's `.proto` file is.

For example:
```
# snet service metadata_init service/service_spec/ example-service 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
```

With these parameters, the JSON must looks like:

```
{
    "version": 1,
    "display_name": "example-service",
    "encoding": "grpc",
    "service_type": "grpc",
    "payment_expiration_threshold": 40320,
    "model_ipfs_hash": "QmSkiwenyYUMt1rCgSboH9eiSSdeMDi1kVPXZvKScAZQyx",
    "mpe_address": "0xdd4292864063d0DA1F294AC65D74d55a44F4766C",
    "pricing": {},
    "groups": [
        {
            "group_name": "default_group",
            "group_id": "gbXRAIn9XB8LMocMi8xZlFd/nNrVoBWUbeTVqTEHZXE=",
            "payment_address": "0xA6E06cF37110930D2906e6Ae70bA6224eDED917B"
        }
    ],
    "endpoints": []
}
```

Now, lets set a fixed price for your `example-service`:

```
# snet service metadata_set_fixed_price PRICE_IN_AGI
```

Remember that 1 AGI = 10^8 COGS, so lets set the price 1 COG.

```
# snet service metadata_set_fixed_price 0.00000001
```

Then, lets set the endpoint where your `SNET Daemon` and `service` will be listening to:

```
# snet service metadata_add_endpoints IP:PORT
```

For example:
```
# snet service metadata_add_endpoints http://54.203.198.53:7000
```

Our service's JSON configuration now looks like:

```
{
    "version": 1,
    "display_name": "example-service",
    "encoding": "grpc",
    "service_type": "grpc",
    "payment_expiration_threshold": 40320,
    "model_ipfs_hash": "QmSkiwenyYUMt1rCgSboH9eiSSdeMDi1kVPXZvKScAZQyx",
    "mpe_address": "0xdd4292864063d0DA1F294AC65D74d55a44F4766C",
    "pricing": {
        "price_model": "fixed_price",
        "price_in_cogs": 1
    },
    "groups": [
        {
            "group_name": "default_group",
            "group_id": "gbXRAIn9XB8LMocMi8xZlFd/nNrVoBWUbeTVqTEHZXE=",
            "payment_address": "0xA6E06cF37110930D2906e6Ae70bA6224eDED917B"
        }
    ],
    "endpoints": [
        {
            "group_name": "default_group",
            "endpoint": "http://54.203.198.53:7000"
        }
    ]
}
```

## Step 6: .proto file

Create the 'service_spec' folder (or anything else you've specified in your JSON configuration file) and put the .proto file inside it.

In our tutorial the .proto is already in place

## Step 7: Publishing the Service

Publish your service

```
# snet service publish
```

Check if it has been properly published

```
# snet organization list-services ORGANIZATION_NAME
```

Optionally you can un-publish the service

```
# snet service delete ORGANIZATION_NAME SERVICE_NAME
```

## Step 8: Running the Service

Running the service using SNET Daemon

In the service folder, create a dir named 'config' and a file named 'snetd_[SERVICE_NAME]_config.json' according to this template

```
{
    "DAEMON_TYPE": "grpc",
    "DAEMON_LISTENING_PORT": "7000",
    "BLOCKCHAIN_ENABLED": true,
    "ETHEREUM_JSON_RPC_ENDPOINT": "https://kovan.infura.io",
    "AGENT_CONTRACT_ADDRESS": "YOUR_AGENT_ADDRESS",
    "SERVICE_TYPE": "grpc",
    "PASSTHROUGH_ENABLED": true,
    "PASSTHROUGH_ENDPOINT": "http://localhost:7000",
    "LOG_LEVEL": 10,
    "PRIVATE_KEY": "YOUR_PRIVATE_KEY"
}
```

```
# cd ..
# mkdir config
# vi config/snetd_[SERVICE_NAME]_config.json
# sh buildproto.sh
# python3.6 run_basic_service.py --daemon-config config/
```

At this point your service should be up and running. You can test it by making
client requests. Open [SingularityNET DApp](http://alpha.singularitynet.io/) in your browser or
attach a new terminal to the Docker container and run the client request test.

You can make local requests (testing purpose)

```
$ docker exec -it snet_service bash
```

Inside the Docker container:

```
# cd /root/dnn-model-services/Services/gRPC/Basic_Template
# python3.6 test_call_basic_service.py
```

Or you can make requests trough SingularityNET

```
# snet set current_agent_at YOUR_AGENT_ADDRESS
# snet client call add '{"a":6,"b":4}'
```
