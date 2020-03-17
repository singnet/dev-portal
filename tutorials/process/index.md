---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to Publish Process-type Services
description: Learn how to wrap your AI service as a process/executable and make it available worldwide through SingularityNET

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

# Page navigation
page_nav:
    prev:
        content: Back to tutorials
        url: '/tutorials'
    next:
        content: View all docs
        url: '/docs'
---

> This tutorial will guide you through the steps required to have a process-type service registered onto the SingularityNET. It assumes you have successfully installed all of SingularityNET components. To do that, refer to previous tutorials or simply run a docker container from the [Dockerfile](./Dockerfile) provided. If you choose to run a Docker container, make sure to expose a port so that SNET Daemon can communicate with the Blockchain.

SingularityNET is an open-source protocol and collection of smart contracts for a decentralized market of coordinated AI services. Within this framework, anyone can add an AI/machine learning service to SingularityNET for use by the network and receive network payment tokens in exchange.

As an AI/machine learning service developer, you can expose your service to the SingularityNET by running an instance of SNET Daemon alongside it. The Daemon interacts with the Blockchain to facilitate authorization and payment for services and acts as a pass-through for making API calls to the service.  There are currently 3 ways by which the Daemon can communicate with a service:

- Through stdin/stdout as an executable/process;
- Through JSON-RPC;
- Through gRPC.

This tutorial will guide you through integrating process-type services that receive their input from SNET Daemon via the standard input stream (`stdin`) and return their output via the standard output stream (`stdout`). If you're already familiar with SingularityNET and know how to create, publish and call a service that communicates with SNET Daemon through JSON-RPC or gRPC, you can skip to the [Summary](#summary) section.

The main steps of this tutorial are:

1. [Write the code for your service](#step-1-writing-the-code-for-your-service) taking and returning well-defined JSON data via stdin and stdout;
2. [Publish it as an SNET service](#step-2-publishing-the-service-onto-singularitynet):
    1. [Specify the service model (protobuf file)](#step-21-specifying-the-service-model)
    2. [Create the service metadata](#step-22-create-the-service-metadata)
    3. [Publish the service under your organization](#step-23-publish-the-service-under-your-organization)
    4. [Running SNET Daemon](#step-24-running-snet-daemon)    
3. [Call the service](#step-3-calling-your-service).


## Step 1) Writing the code for your service

For this tutorial we'll write an example executable service in [Python](https://www.python.org/) but this approach can be applied to other programming languages as well.

To keep the directory structure of the services and follow the standard file paths, we'll create the following directories: 

```sh
mkdir -p example-executable-service/service/service_spec && \
cd example-executable-service/service
```

Inside the service folder, create a file for the main code of your service (in our case, `example-executable-service.py`). For demonstration purposes, we'll create a very simple service that adds two numbers. Here's the Python code for it, have a look at the code and its comments.

```python
#!/usr/bin/env python3

import sys
import json
import logging

# Setting up a logger to log to a file.
# This is extra relevant in the case of a process-type service because SNET Daemon captures everything that is printed
# to stdout. If anything other than the json it expects is printed, a parsing error will be raised.
log = logging.getLogger("basic_template")
file_handler = logging.FileHandler('executable_service.log')
formatter = logging.Formatter("%(asctime)s - [%(levelname)8s] - %(name)s - %(message)s")
file_handler.setFormatter(formatter)
log.addHandler(file_handler)
log.setLevel(logging.DEBUG)


if __name__ == "__main__":
    log.debug("Running service.")

    # Read the method defined in the .proto file from argv.
    method = sys.argv[1]
    log.debug("RECEIVED - Method: {}".format(method))

    if method == "add":
        # Read input parameters from stdin
        with sys.stdin:
            input_args = ""
            for line in sys.stdin:
                input_args += line
        params = json.loads(input_args)  # Converts from string to python dict
        log.debug("STDIN: {}".format(input_args))

        # Add arguments
        result = params["a"] + params["b"]  # Dictionary key names must match the specifications in .proto.

        # Build the resulting json from a dictionary
        return_dict = dict()
        return_dict["value"] = result  # Dictionary key names must match the specifications in .proto.
        json_return = json.dumps(return_dict)

        # Return the resulting json and exit
        sys.stdout.write(json_return)
        log.debug("STDOUT: {}".format(json_return))
        exit(0)

    else:
        # This condition will never happen because snet-cli won't allow methods unknown to it (i.e. not in .proto file).
        exit(1)

```

To test this code locally, run `./example-executable-service.py add <<< '{"a": 2.1, "b":6.7}'` and it should return `{"value": 8.8}`. 

Notice that:
- The service method ("add", in this case) will be received through `argv[1]` while the remaining parameters will be received through stdin;
- Once your code is ready, avoid printing any debug or status messages since they'll be sent to `stdout`, where SNET Daemon awaits the JSON-encoded return data;
- Since this code will be interpreted as executable, you need to tell your operating system what interpreter to use by adding the shebang `#!/usr/bin/env python3`, for Python3, or an equivalent for your programming language of choice. You also need to give executable permissions to it, in our case, by running `chmod +x example-executable-service.py`.

## Step 2) Publishing the service onto SingularityNET

### Step 2.1) Specifying the service model

After writing the code for your service, you should now specify its user interface: the service model. We do that through a [protobuf](https://developers.google.com/protocol-buffers/docs/overview) file, in which we define `services` (or methods) and their inputs and outputs (`messages`). By default, the `.proto` file is stored inside the `service/service_spec` folder. Below is the protobuf file for our example executable service that defines the `add` method, the `Numbers` message containing the two numbers to added, `a` and `b`, and the `Result` message returning their sum. It is a very simple example of a protobuf file, [learn more](https://developers.google.com/protocol-buffers/docs/proto3) about protobuf syntax for more complex service models.

```proto
syntax = "proto3";

message Numbers {
    float a = 1;
    float b = 2;
}

message Result {
    float value = 1;
}

service Addition {
    rpc add(Numbers) returns (Result) {}
}
```

You should copy this code into an `example-executable-service.proto` file inside `example-executable-service/service/service_spec`. 

### Step 2.2) Create the organization metadata and service metadata

A service metadata is a series of JSON-encoded information relative to the service that is necessary to publish it. It tells the Blockchain where to redirect client calls to (your service endpoints), its encoding, price, etc. (refer to SNET CLI's help for a list of all possible parameters). 

- `PAYMENT_ADDRESS` is the public key of the blockchain key-pair that will receive the payments from client calls. 
-  set up your etcd cluster based on [etcd-setup](/docs/concepts/etcdsetup.md)

```sh
PAYMENT_ADDRESS=`snet account print`
ORGANIZATION_ID=my-org
ORGANIZATION_NAME="NameOfYourOrganization"

ETCD_ENDPOINT=http://127.0.0.1:2379

snet organization metadata-init "$ORGANIZATION_NAME" $ORGANIZATION_ID individual
snet organization add-group default_group $PAYMENT_ADDRESS $ETCD_ENDPOINT
snet organization create $ORGANIZATION_ID

```

The above commands  will generate a `organization_metadata.json` file at the root of your service directory that should look like this:
```json
{
    "org_name": "NameOfYourOrganization",
    "org_id": "my-org",
    "groups": [
        {
            "group_name": "default_group",
            "group_id": "QtCWtECs4q7qYOmRFbHnagsFONwpY5eltfe8x779j+o=",
            "payment": {
                "payment_address": "0xB18aac9DE3852F988147287daBD19dF2791C2e0f",
                "payment_expiration_threshold": 100,
                "payment_channel_storage_type": "etcd",
                "payment_channel_storage_client": {
                    "connection_timeout": "100s",
                    "request_timeout": "5s",
                    "endpoints": [
                        "http://127.0.0.1:2379"
                    ]
                }
            }
        }
    ]
}
```

A service metadata is a series of JSON-encoded information relative to the service that is necessary to publish it.
 It tells the blockchain where to redirect client calls to (your service endpoints), 
 its encoding, price, etc. (refer to SNET CLI's help for a list of all possible parameters). 

At the root directory of your service, create a service metadata file by running 


- `PROTOBUF_DIRECTORY` tells SNET CLI where to find the `.proto` file for your service; 
- `DISPLAY_NAME` is your service's display name; 

- `PAYMENT_ADDRESS` is the public key of the Blockchain key-pair that will receive the payments from client calls. 

You'll also need to specify: 

- The price in cogs for each client call by adding the `--fixed-price PRICE_IN_COGS` parameter;
- `DAEMON_PORT` and `IP` specify the end point of your proxy ( daemon end point)  `--endpoints http://IP:DAEMON_PORT`;
- And, because the Daemon will call our service as a process and pass parameters using JSON encoding ,
 specify the `--service-type process --encoding json` parameters as well. 
 The full command for our service is shown below. 


```sh

PROTOBUF_DIRECTORY=service/service_spec
DISPLAY_NAME="DISPLAY_NAME"
IP=http://localhost
PORT=8088
snet service metadata-init service/service_spec "$DISPLAY_NAME" --encoding proto --service-type grpc --group-name default_group

#set the price of the service 
snet service metadata-set-fixed-price default_group 0.00000001

#set the end points to be called 
snet service metadata-add-endpoints default_group $IP:$PORT

# describe your service and add an URL for further service's information.
snet service metadata-add-description --json '{"description": "Description of my Service.", "url": "https://service.users.guide"}'
 
```

That will generate a `service_metadata.json` file at the root of your service directory that should look like this:

```json
{
    "version": 1,
    "display_name": "DISPLAY_NAME",
    "encoding": "proto",
    "service_type": "grpc",
    "model_ipfs_hash": "Qmdgo8rvfpLqngvxetFiiuNkkZFSXvoASWUGVEBCXE2isM",
    "mpe_address": "0x8FB1dC8df86b388C7e00689d1eCb533A160B4D0C",
    "groups": [
        {
            "group_name": "default_group",
            "pricing": [
                {
                    "price_model": "fixed_price",
                    "price_in_cogs": 1,
                    "default": true
                }
            ],
            "endpoints": [
                "https://localhost:8088"
            ]
        }
    ],
    "assets": {},
    "service_description": {
        "description": "Description of my Service.",
        "url": "https://service.users.guide"
    }
}
```

### Step 2.3) Publish the service under your organization

Publish your service by running `snet service publish ORGANIZATION_ID SERVICE_ID`. In our example:

```sh

snet service publish my-org example-executable-service
```

Confirm the transaction and the Blockchain should now be aware of your service!

> After having published your service, both its `service_metadata.json` and its service model/specifications (`.proto` file) will have been stored in IPFS, so if you change these files locally, you'll need to update them. Have a look at `snet service update-metadata` and `snet service metadata-set-model` commands for that.

### Step 2.4) Running SNET Daemon


To run your service, you simply need to run an instance of SNET Daemon at the specified endpoint. It will listen to client calls at the Blockchain and execute your service at the specified path using the client parameters. SNET Daemon takes a configuration file that specifies which network it should listen to (e.g. Kovan Testnet), where to redirect calls to, etc. (refer to [SNET Daemon's Github Repository](https://github.com/singnet/snet-daemon) for the complete list of parameters). By default, the daemon configuration file should be created at the root directory of your service and be called `snetd.config.json`. Here's the example configuration file for our service (again, make sure to change the parameters accordingly before saving):

```json
{
    "BLOCKCHAIN_NETWORK_SELECTED": "ropsten",
    "ETHEREUM_JSON_RPC_ENDPOINT": "https://ropsten.infura.io/v3/e7732e1f679e461b9bb4da5653ac3fc2",
    "PASSTHROUGH_ENABLED": true,
    "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
    "DAEMON_END_POINT": "0.0.0.0:8088",
    "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
    "EXECUTABLE_PATH": "./service/example-executable-service.py",
    "ORGANIZATION_ID": "my-org",
    "SERVICE_ID": "example-executable-service",
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
```

You're now able to keep an instance of SNET Daemon running at your service directory to keep it available: 

```sh
snetd serve .
```

## Step 3) Calling your service

To call your service through the Blockchain, make sure you have sufficient funds for the transactions (check by running `snet account balance`). If you don't, deposit an amount (e.g. 10 COGs, or 10e-8 AGI) by running `snet account deposit 0.00000010`. 
 
Create a payment channel to your service: specify its organization ID and the group name, deposit some tokens into the channel and set its expiration time: `snet channel open-init ORG_ID default_group AMOUNT EXPIRATION`. For our example, we'll deposit 0 tokens and set the payment channel to expire in 10 days:

```sh
snet channel open-init my-org default_group 0.00000001 +10days
```

Confirm the transaction and that should print the number of the channel you have opened (you can always check again by running `snet channel print-initialized`). Supposing your channel number is `450`, you will spend `0` cogs and call the service at `54.203.198.53:7018` here's an example of how to call the service you have just published:

```sh
snet client call my-org example-executable-service default_group add '{"a": 6.3, "b": 13.2}'
```

It should then return:

```
value: 19.5
```

That's it! You should now have a working process-type service published onto SingularityNET!

## Summary

If you're already familiar with how to publish SingularityNET services, here's a summary of what changes when dealing with process-type services:

- Make sure your service code has a shebang line (e.g. `#!/usr/bin/env python3`, executable permissions (change that by running `chmod +x SERVICE_CODE`) and the only data it sends to stdout is the returning message defined at the protobuf file;
- Specify `--service-type process` and `--encoding json` when running `snet service metadata-init` or manually change that in `service_metadata.json`;
- Add `"EXECUTABLE_PATH": "PATH_TO_EXECUTABLE"` in `snetd.config.json`.
