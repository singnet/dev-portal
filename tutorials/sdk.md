---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to use the SingularityNET SDK
description: Building applications the depend on SingularityNET

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

## Step 1. Prerequisites

This guide assumes you've got a wallet, have installed the `snet` tool, and have successfully called a service.

## Step 2. Install the SDK

Currently our SDK only supports Python 3.6+. In the future we'll support a wide variety of languages. We make use of protocol buffers and grpc,
so if you can find support for a language for both of those, then it's only matter of time before we (or the community! ;-) ) writes an SDK for it.

```sh
pip install snet-sdk
```

## Step 3. Write some code!

Here's an example of calling a service using the SDK

```python
from snet_sdk import Snet
snet = Snet(private_key=MY_PRIVATE_KEY, eth_rpc_endpoint="https://ropsten.infura.io")
client = snet.client("snet", "example-service")
stub = client.grpc.example_service_pb2_grpc.CalculatorStub(client.grpc_channel)
calc_request = client.grpc.example_service_pb2.Numbers(a=20, b=30)
print("The result is", stub.add(calc_request).value))
```

For anyone that has written grpc code before this will look somewhat familiar.

However, underneath the hood the SDK will fetch the model definition from IPFS, compile the code, set up payment channels,
and make the request for you.

This isn't done for every request. It will only do these steps if it doesn't have a local cache of a compiled model, and doesn't
already have an existing funded channel to use.

(TODO: Update once the SDK is released and finalised depending on how much is automated or not)

## Step 4. The simple SDK

The above is great for building well defined APIs with objects representing the messages being sent. Its also consistent with
how you'd interact with any other grpc service.

However in a dynamic language like python it can feel a little clunky. That's why there is an alternative using the snet cli:

```python
from snet_cli.call_stub_generator import call_stub_generator
add = call_stub_generator("snet", "example-service", "add")
params = {"a":20, "b":30}
rez = add(params)
print(rez)
```

This requires you to have the CLI set up, and will only ever be available for Python applications, but it's nice to have options.
