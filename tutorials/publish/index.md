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

[naming-standards]: https://github.com/singnet/dev-portal/blob/master/docs/all/naming-standard.md

-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker (https://www.docker.com/)_
* _Metamask (https://metamask.io)_

_You will need a private-public key pair to register your service in SNET. Generate them in Metamask before you start this tutorial._

-------------------------------

Run this tutorial from a bash terminal.

In this tutorial we'll publish an example service in SingularityNET using Kovan Test Network.

## Step 1 

Setup a `ubuntu:18.04` docker container using provided `Dockerfile`.

```
$ docker build -t snet_example_service https://github.com/singnet/dev-portal.git#master:/tutorials/docker
$ export ETCD_HOST_FOLDER=$HOME/singnet/etcd/example-service/
$ export ETCD_CONTAINER_FOLDER=/opt/singnet/example-service/storage-data-dir-1.etcd/
$ docker run -p 7000:7000 -v $ETCD_HOST_FOLDER:$ETCD_CONTAINER_FOLDER -ti snet_example_service bash
```

Note that the $ETCD_(HOST|CONTAINER)_FOLDER are useful to keep your service's etcd folder outside the container.

Step 1 may take a couple of minutes to finish. Step 2 can be performed concurrently.

## Step 2 (optional if you already have enough AGI and ETH tokens) 

You need some AGI and ETH tokens. You can get then for free using your github account here:

* AGI: https://faucet.singularitynet.io/
* ETH: https://faucet.kovan.network/

## Step 3 

From this point we follow the tutorial in the Docker container's prompt.

Create an "alias" for your private key.

```
# snet identity create MY_ID_NAME KEY_TYPE
```

Replace `MY_ID_NAME` by an id to identify your key in the `SNET CLI`. 
This id will not be seen by anyone. 
It's just a way to make it easier for you to refer to your wallet (you may have many, btw) in following `snet` commands. 
This alias is kept locally in the container and will vanish when it's shutdown. `KEY_TYPE` can be either

* key
* rpc
* mnemonic
* ledger
* trezor

In this tutorial we'll use `KEY_TYPE` == `mnemonic`. Enter your mnemonic(s) when prompted.

## Step 4 (optional if you already have an organization) 

Create an organization and add your key to it.

```
# snet organization create ORGANIZATION_NAME --org-id ORGANIZATION_ID
```

Replace `ORGANIZATION_NAME` and `ORGANIZATION_ID` by a name and id of your choice. Make sure you follow our [naming standardisation guidelines][naming-standards].

If you want to join an existing organization (e.g. `snet`), ask the owner to add your public key into it before proceeding.

## Step 5

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
# snet service metadata-init SERVICE_PROTOBUF_DIR SERVICE_DISPLAY_NAME PAYMENT_ADDRESS
```

`SERVICE_PROTOBUF_DIR`: The folder where your service's `.proto` file is.

For example:
```
# snet service metadata-init service/service_spec/ example-service 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
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
    "mpe_address": "0x39f31Ac7B393fE2C6660b95b878FEB16eA8f3156",
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
# snet service metadata-set-fixed-price PRICE_IN_AGI
```

Remember that 1 AGI = 10^8 COGS, so lets set the price 1 COG.

```
# snet service metadata-set-fixed-price 0.00000001
```

Then, lets set the endpoint where your `SNET Daemon` and `service` will be listening to:

```
# snet service metadata-add-endpoints http://DAEMON_HOST:DAEMON_PORT
```

For example:
```
# snet service metadata-add-endpoints http://54.203.198.53:7000
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
    "mpe_address": "0x39f31ac7b393fe2c6660b95b878feb16ea8f3156",
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

## Step 6

Publish your service

```
# snet service publish ORGANIZATION_ID SERVICE_ID
```

`ORGANIZATION_ID`: The id of the organization you've create in step 4.

`SERVICE_ID`: The id that you want to registry your service with. Can be the same as
`SERVICE_DISPLAY_NAME` or different.

```
# snet service publish snet example-service
```

Check if your service has been properly published

```
# snet organization list-services ORGANIZATION_ID
```

Optionally you can un-publish the service

```
# snet service delete ORGANIZATION_ID SERVICE_ID
```

## Step 7

Running the service and `SNET Daemon`

In the service folder, create a file named `snetd.config.json` according to this template:

```
{
   "DAEMON_END_POINT": "http://DAEMON_HOST:DAEMON_PORT",
   "ETHEREUM_JSON_RPC_ENDPOINT": "JSON_RPC_ENDPOINT",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "REGISTRY_ADDRESS",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://SERVICE_GRPC_HOST:SERVICE_GRPC_PORT",  
   "ORGANIZATION_ID": "ORGANIZATION_ID",
   "SERVICE_ID": "SERVICE_ID",
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
            "TYPE": "stdout"
           }
   }
}
```

For example, using the Kovan testnet, replace tags with:

- `http://DAEMON_HOST:DAEMON_PORT`: http://54.203.198.53:7000
- `JSON_RPC_ENDPOINT`: https://kovan.infura.io
- `REGISTRY_ADDRESS`: 0xe331bf20044a5b24c1a744abc90c1fd711d2c08d
- `http://SERVICE_GRPC_HOST:SERVICE_GRPC_PORT`: http://localhost:7003
- `ORGANIZATION_ID`: snet
- `SERVICE_ID`: example-service

```
{
   "DAEMON_END_POINT": "http://54.203.198.53:7000",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://kovan.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0xe331bf20044a5b24c1a744abc90c1fd711d2c08d",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "ORGANIZATION_ID": "snet",
   "SERVICE_ID": "example-service",
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
              "TYPE": "stdout"
           }
   }
}
```

For example, using the Ropsten testnet, replace tags with:

- `http://DAEMON_HOST:DAEMON_PORT`: http://54.203.198.53:7000
- `JSON_RPC_ENDPOINT`: https://ropsten.infura.io
- `REGISTRY_ADDRESS`: 0x5156fde2ca71da4398f8c76763c41bc9633875e4
- `http://SERVICE_GRPC_HOST:SERVICE_GRPC_PORT`: http://localhost:7003
- `ORGANIZATION_ID`: snet
- `SERVICE_ID`: example-service

```
{
   "DAEMON_END_POINT": "http://54.203.198.53:7000",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://ropsten.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0x5156fde2ca71da4398f8c76763c41bc9633875e4",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "ORGANIZATION_ID": "snet",
   "SERVICE_ID": "example-service",
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
              "TYPE": "stdout"
           }
   }
}
```

Now compile the protobuf file and run the service (that will run and instance of `SNET Daemon`) 
from the same path where `snet.config.json` is:

```
# sh buildproto.sh
# python3.6 run_example_service.py
```

At this point your service should be up and running. You can test it by making
client requests. Open [SingularityNET DApp](http://alpha.singularitynet.io/) in your browser or
attach a new terminal to the Docker container and run the client request test.

You can make local requests (testing purpose)

```
$ docker exec -it snet_example_service bash
```

Inside the Docker container:

```
# cd example-service
# python3.6 test_example_service.py
```

Or you can make requests through `SingularityNET`:

- Check your wallet's funds:

```
# snet account balance
```

- Deposit funds (1 COG) into MultiPartyEscrow (`MPE`) contract:

```
# snet account deposit 0.00000001
```

- Open a payment channel to your service:
```
# snet channel open-init ORGANIZATION_ID SERVICE_ID AMOUNT_IN_AGI EXPIRATION_BLOCK_NUMBER
```

- To check the current `BLOCK_NUMBER`:

```
# snet channel block-number
```

For example:

```
# snet channel open-init snet example-service 0.00000001 11000000
```

- Now, you can check your channels:

```
# snet channel print-initialized
```

##### From now on, the `SNET Daemon` must be running!

- You can inspect a channel state (by `id`):

```
# snet client get-channel-state CHANNEL_ID SERVICE_ENDPOINT
```

Example:

```
# snet client get-channel-state 0 54.203.198.53:7000
```

- Finally, you can call your service with:

```
# snet client call CHANNEL_ID PRICE_IN_AGI SERVICE_ENDPOINT SERVICE_METHOD SERVICE_JSON_PARAMS
```

Example (for `endpoint` just use `IP:PORT`):

```
# snet client call 0 0.00000001 54.203.198.53:7000 mul '{"a":12,"b":7}'
```

## Step 8 (Treasurer):

As the owner of this service you have the right to claim all AGIs that were spent on it.

To claim these AGIs you must use the `treasurer` command via `SNET CLI`.

The `IDENTITY` of `SNET CLI` must be related to `0xA6E06cF37110930D2906e6Ae70bA6224eDED917B`
in our example.

Check your `IDENTITY`, running:

``` 
# snet account balance
    account: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
    ETH: **********
    AGI: 0
    MPE: 0
```

To print the list of unclaimed channels and also the total amount of unclaimed funds:

``` 
# snet treasurer print-unclaimed --endpoint 54.203.198.53:7000

# channel_id  channel_nonce  signed_amount (AGI)
0   0   0.00000001
1   0   0.00000001
# total_unclaimed_in_AGI = 0.00000001
```

To claim all channels at once:

```
# snet treasurer claim-all --endpoint 54.203.198.53:7000  -y
Submitting transaction...
[blockchain transaction]
```

```
# snet account balance
    account: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
    ETH: **********
    AGI: 0
    MPE: 0.00000002
```

The last step you should do is withdraw this amount from `MPE` to your private wallet:

```
# snet account withdraw 0.00000002 -y
[blockchain transaction]

# snet client balance
    account: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
    ETH: **********
    AGI: 0.00000002
    MPE: 0
```

Note that all this AGI claim steps must be run with a certain frequency, we recommend the 
service's owner to do this once a day.

You can automate it using `cron`.

For more information about the `SNET MultiPartyEscrow` check this [link](https://github.com/singnet/dev-portal/tree/master/docs/all/mpe). 