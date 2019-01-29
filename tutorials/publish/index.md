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

[naming-standards]: https://dev.singularitynet.io/docs/all/naming-standard/

-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker (https://www.docker.com/)_
* _Metamask (https://metamask.io)_

-------------------------------

Run this tutorial from a bash terminal.

In this tutorial we will publish an example service in SingularityNET using Kovan Test Network.

We will run example service on endpoint `SERVICE_IP:7000`. You will need to replace `SERVICE_IP` with your service's ip in all commands.

## Step 1. Setup and run a docker container

We are going to run the example service inside a docker container. 

Setup a `ubuntu:18.04` docker container using provided `Dockerfile`.

```
docker build -t snet_example_service https://github.com/singnet/dev-portal.git#master:/tutorials/docker
```

Now you can simply run a docker container (with proper port mapping).

```
docker run -p 7000:7000 -ti snet_example_service bash
```

However in case of real service it might not be enough. Service (more precisely `SNET DAEMON`) stores payments in etcd storage. They will be written in blockchain only after you claim them using ```snet treasurer``` commands. It means that if you lose your etcd storage you lose all unclaimed payments. 

In this example we run etcd cluster inside a docker container (more precisely inside a `SNET DAEMON`) and all payments are stored in etcd folder `/opt/singnet/etcd/`, it means that you only need to store this etcd folder outside the docker container to make this setup suitable for the real use-case (you can use `-v` option in ```docker run``` command). You also have the possibility to configure `SNET DAEMON` to store payments in external etcd cluster.

## Step 2. Setup `SNET CLI` and create your identity

From this point we follow the tutorial in the Docker container's prompt.

We will work in Kovan Test Network. `SNET CLI` has Kovan as default network. You can switch network using ```snet network``` command. For example in order to switch to Ropsten Test Network you must run ```snet network ropsten```.

You can create your identity in `SNET CLI` using ```snet identity create``` command. `SNET CLI` supports the following identity types:

* key
* rpc
* mnemonic
* ledger
* trezor

In this tutorial we'll use the mnemonic identity type. 

```
# !!! replace MY_MNEMONIC with your mnemonic
snet identity create MY_ID_NAME mnemonic --mnemonic "MY_MNEMONIC"
```

Replace MY_MNEMONIC with any string that you want. You can replace `MY_ID_NAME` by an id to identify your key in the `SNET CLI`. This id will not be seen by anyone. It's just a way to make it easier for you to refer to your account (you may have many, btw) in following `snet` commands. 
This alias is kept locally in the container and will vanish when it's shutdown. So you might want to configure `SNET CLI` not in the container, or you can simply keep its configuration (```$HOME/.snet``` directory) outside the container. 

`SNET CLI` will automatically switch to this identity because it will be the first identity created. 

## Step 3. Get Kovan ETH and AGI (optional if you already have enough ETH and AGI tokens) 

You need some ETH and AGI tokens. You can get them for free using your Github's account here:

* AGI: https://faucet.singularitynet.io/
* ETH: https://faucet.kovan.network/

Get the address of your account using ```snet account print``` command.

## Step 4 (optional if you already have an organization) 

Create an organization.

```
# !!! replace ORGANIZATION_NAME with the name of your organization
# !!! replace ORGANIZATION_ID with id of your organization
snet organization create ORGANIZATION_NAME --org-id ORGANIZATION_ID
```

Replace `ORGANIZATION_NAME` and `ORGANIZATION_ID` by a name and id of your choice. Make sure you follow our [naming standardisation guidelines][naming-standards].

If you want to join an existing organization (e.g. `snet`), ask the owner to add your public key (account) into it before proceeding.

## Step 5. Download and configure example-service

In this tutorial we'll use a simple service from [SingularityNET Example Service](https://github.com/singnet/example-service).

* Clone the git repository:

```
git clone https://github.com/singnet/example-service.git
cd example-service
```

* Install the dependencies and compile the protobuf file:

```
pip3 install -r requirements.txt
sh buildproto.sh
```

Service is ready, however we need to publish it in SingularityNET and we need to configure the `SNET DAEMON` which will deal with payments.

## Step 6. Prepare service metadata to publish the service

As a first step in publish procedure we should create a service metadata file. You can do it by calling the following command:

```
snet service metadata-init SERVICE_PROTOBUF_DIR SERVICE_DISPLAY_NAME PAYMENT_ADDRESS --endpoints SERVICE_ENDPOINT --fixed-price FIXED_PRICE
```

You need to specify the following parameters:
* SERVICE_PROTOBUF_DIR - Directory which contains protobuf files of your service: ```service/service_spec/``` in case of our example service.
* SERVICE_DISPLAY_NAME - Display name of your service. You can choose any name you want. 
* PAYMENT_ADDRESS - Ethereum account which will receive payments for this service. You should set it to your ethereum account. You can use ```snet account print``` to see your account.
* SERVICE_ENDPOINT - Endpoint which will be used to connect to your service: ```http://SERVICE_IP:7000```.
* FIXED_PRICE - Price in AGI for a single call to your service. We will set the price to 1 COG (remember that 1 AGI = 10^8 COGS).

For example:
```
# !!! replace SERVICE_IP with your service's ip
ACCOUNT=`snet account print`
snet service metadata-init service/service_spec/ example-service $ACCOUNT --endpoints http://SERVICE_IP:7000 --fixed-price 0.00000001 
```
This command will create ```service_metadata.json``` file. Please take a look into this file. You can find the description of service metadata format in [mpe-metadata.md](docs/all/mpe/mpe-metadata.md).

## Step 7. Publish the service in SingularityNET

You can publish your service using the following command:

```
# snet service publish ORGANIZATION_ID SERVICE_ID
```

You need to specify the following parameters:
* `ORGANIZATION_ID`: The id of the organization you've created in step 4.
* `SERVICE_ID` : The id that you want to registry your service with. Can be the same as `SERVICE_DISPLAY_NAME` or different.

```
# !!! replace ORGANIZATION_ID with id of your organization
snet service publish ORGANIZATION_ID example-service
```

Check if your service has been properly published:

```
# !!! replace ORGANIZATION_ID with id of your organization
snet organization list-services ORGANIZATION_ID
```

Optionally you can un-publish the service:

```
# !!! replace ORGANIZATION_ID with id of your organization
# !!! replace  SERVICE_ID with id of the service you want to delete (example-service)
snet service delete ORGANIZATION_ID SERVICE_ID
```

## Step 8. Run the service

Running the service and `SNET Daemon`.

In the service folder, create a file named `snetd.config.json`. 

You should replace `SERVICE_IP` with your service's IP address and `ORGANIZATION_ID` with the id of your organization.

```
# !!! replace SERVICE_IP with your service's ip
# !!! replace ORGANIZATION_ID with id of your organization
cat > snetd.config.json << EOF
{
   "DAEMON_END_POINT": "http://SERVICE_IP:7000",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://kovan.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0xe331bf20044a5b24c1a744abc90c1fd711d2c08d",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "ORGANIZATION_ID": "ORGANIZATION_ID",
   "SERVICE_ID": "example-service",
   "PAYMENT_CHANNEL_STORAGE_SERVER": {
       "DATA_DIR": "/opt/singnet/etcd/"
   },
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
              "TYPE": "stdout"
           }
   }
}
EOF
```

For Ropsten Test Network, you will need to change the following key values:

- `ETHEREUM_JSON_RPC_ENDPOINT`: https://ropsten.infura.io
- `REGISTRY_ADDRESS_KEY`: 0x5156fde2ca71da4398f8c76763c41bc9633875e4

Now we can run the service (that will run and instance of `SNET Daemon`) 
from the same path where `snet.config.json` is:

```
python3 run_example_service.py
```

At this point your service should be up and running. 

## Step 9. Call your service using `SNET CLI`

You can call your service using `SNET CLI` for testing purpose. 

After running the service, the terminal will not return to you, so you will need to open a second terminal in your container.

* You should open new terminal in your main system.
* You should get "container id" of your running container by typing ```docker ps```
* You should type ```docker exec -it <container_id> bash```.


```
# check your balance
snet account balance

# deposit funds (10 COG) into MultiPartyEscrow (`MPE`) contract:
snet account deposit 0.00000010
```

In order to open a payment channel to your service your can use the following command:

```
snet channel open-init ORGANIZATION_ID SERVICE_ID AMOUNT_IN_AGI EXPIRATION_BLOCK_NUMBER
```

For example with the following commands we open and initialize the channel with 10 cogs for ORGANIZATION_ID/example-service with expiration time 57600 blocks in the future (approximately 10 days with 15 sec/blocks):

```
#  `snet channel block-number` returns the current block number
EXPIRATION=$((`snet channel block-number` + 57600))

# replace  ORGANIZATION_ID with id of your organization
snet channel open-init ORGANIZATION_ID example-service 0.0000001 $EXPIRATION
```
This command will print CHANNEL_ID of created channel. You should remember this id, because you will need it to call the service.

Now, you can check your channels:

```
# list of locally initialized channels
snet channel print-initialized

# list of all channels with the current identity as a sender
snet channel print-all-filter-sender
```

It should be noted that if you delete your `SNET CLI` configuration you remove all your initialized channels. 
But you can easily find all your channels using ```snet channel print-all-filter-sender``` command and initialize them again using ```snet channel init``` command.

From now on, the `SNET Daemon` must be running!

You can inspect a channel state (you should use `CHANNEL_ID` which was returned by ```snet channel open-init```):

```
# !!! replace SERVICE_IP with your service's ip
# !!! replace CHANNEL_ID with channel id
snet client get-channel-state CHANNEL_ID SERVICE_IP:7000
```

Finally, you can call your service with:

```
# snet client call CHANNEL_ID PRICE_IN_AGI SERVICE_ENDPOINT SERVICE_METHOD SERVICE_JSON_PARAMS

# !!! replace CHANNEL_ID with channel id (which you get with "snet channel open-init" command)
# !!! replace SERVICE_IP with your service's ip
snet client call CHANNEL_ID 0.00000001 SERVICE_IP:7000 mul '{"a":12,"b":7}'
```

## Step 10. Treasurer

As was described before, your funds have not been yet written on the blockchain. You need to claim them using ```snet treasurer``` commands.

First you should make sure that your current identity corresponds to `PAYMENT_ADDRESS` of your service. 
```
# print the address of your current identity
snet account print

# print metadata of your service
# !!! replace ORGANIZATION_ID with id of your organiation
snet service print-metadata ORGANIZATION_ID example-service
```

You can check your balance using ```snet account balance``` command.

To print the list of unclaimed channels and also the total amount of unclaimed funds:

``` 
# !!! replace SERVICE_IP with your service's ip
snet treasurer print-unclaimed --endpoint SERVICE_IP:7000
```

To claim all channels at once:

```
# !!! replace SERVICE_IP with your service's ip
snet treasurer claim-all --endpoint SERVICE_IP:7000  -y
```

Each payment channel has its expiration time (we've already encountered this parameter when we run ```snet channel open-init```). After expiration time the sender can take back all unclaimed funds. 
In service metadata we have the special parameter `payment-expiration-threshold` which by default is 40320 blocks, or approximately one week with 15 sec/block (you can set this parameter in ```snet service metadata-init```). 
Your service will automatically stop accepting payments in channels which will became expired in less then `payment-expiration-threshold blocks`. 

We also have special command: ```snet treasurer claim-expired``` which will claim all channels which are close to expiration. By default it will claim all channels which will be expired in 34560 blocks or 6 days with 15sec/block.

It also should be noted that if your etcd storage is safe and channels have not expired then you are not required to claim your funds. You can claim them when you want, for example once in several months. 

Our recommendations are following
- Your should run ```snet treasurer claim-expired``` each 1-3 days. We recommend automate it using `cron`.
- You can run ```claim-all``` command when your want. For example once in several months.

For more information about the `SNET MultiPartyEscrow` check this [link](https://dev.singularitynet.io/docs/all/mpe/mpe/). 

## Step 11 (optional). Withdraw AGI tokens from MPE

After the step 10, all the AGIs are in the MultiPartyEscrow Contract (MPE).

If you need to transfer them to your wallet, you must run the `SNET CLI` withdraw command.

For example, to withdraw 5 AGIs from MPE:

```
# !!! check current account balance
snet account balance
  account: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
  ETH: **********
  AGI: 0
  MPE: 5

# !!! withdraw 5 AGIs from MPE
snet account withdraw 5 -y
[blockchain transaction]

# !!! check again the current account balance
snet account balance
  account: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
  ETH: **********
  AGI: 5
  MPE: 0
```