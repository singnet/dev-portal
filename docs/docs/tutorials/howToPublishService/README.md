# Tutorial - How to Publish a SingularityNET Service

-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker (https://www.docker.com/)_
* _Metamask (https://metamask.io)_

_You will need a private-public key pair to register your service in SNET. Generate them in Metamask before you start this turorial._

-------------------------------

Run this tutorial from a bash terminal.

In this tutorial we'll publish a basic service in SingularityNET using Kovan Test Network.

## Step 1 

Setup a `ubuntu:18.04` docker container using provided `Dockerfile`.

```
$ docker build -t snet_service https://github.com/singnet/wiki.git#master:/tutorials/Docker
$ docker run -p 7000:7000 -ti snet_service bash
```

Step 1 may take a couple of minutes to finish. Step 2 can be performed concurrently.

## Step 2 (optional if you already have enough AGI and ETH tokens) 

You need some AGI and ETH tokens. You can get then for free using your github account here:

* AGI: https://faucet.singularitynet.io/
* ETH: https://faucet.kovan.network/

## Step 3 

From this point we follow the turorial in the Docker container's prompt.

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

## Step 4 (optional if you already have an organization) 

Create an organization and add your key to it.

```
# snet organization create ORGANIZATION_NAME
```

Replace ORGANIZATION_NAME by a name of your choice.

If you want to join an existing organization (e.g. SNET), ask the owner to add your public key into it before proceeding.

## Step 5

Build a JSON configuration file for your service.

In this tutorial we use a simple service implemented in [DNN Model Services](https://github.com/singnet/dnn-model-services.git).

```
# git clone https://github.com/singnet/dnn-model-services.git
# cd dnn-model-services/Services/gRPC/Basic_Template/service/
```
To build the JSON configuration file, execute the following command and enter the requested information.

```
# snet service init
```

The questions are (hopefully) self-explanatory. Defaults are safe except for:

* Organization (see step 4)
* Endpoint (the ip:port address of your service)

## Step 6

Create the 'service_spec' folder (or anything else you've specified in your JSON configuration file) and put the .proto file inside it.

In our tutorial the .proto is already in place

## Step 7

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

## Step 8

Running the service using SNET Daemon

In the service folder, create a dir named 'config' and a file named 'snetd_[SERVICE_NAME]_config.json' according to this template

```JSON
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

