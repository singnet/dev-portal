---
# Page settings
layout: default
keywords:
comments: false
title: Python SDK
description:

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

# Python SDK

## Step 1. Prerequisites

This guide assumes you've got a wallet, have installed the `snet` tool, and have successfully called a service.

## Step 2. Install the SDK

Currently our SDK only supports Python 3.10+. In the future we'll support a wide variety of languages. We make use of protocol buffers and grpc,
so if you can find support for a language for both of those, then it's only matter of time before we (or the community! ;-) ) writes an SDK for it.

```sh
pip install snet.sdk
```

## Step 3. Write some code!

Here's an example of calling a service using the SDK

Once you have installed snet-sdk in your current environment and it's in your PYTHONPATH, you should create an identity, import snet-sdk and create an instance of the base sdk class. The SDK instance is then used to create service client instances. Finally, the generated service_client instance can be used to call methods provided by the service.

```bash
snet identity create --private-key "MY_PRIVATE_KEY" test key
```

```python
from snet import sdk

org_id = "26072b8b6a0e448180f8c0e702ab6d2f"
service_id = "Exampleservice"
group_name="default_group"


config = {
    "private_key": MY_PRIVATE_KEY,
    "eth_rpc_endpoint": "https://sepolia.infura.io/v3/09027f4a13e841d48dbfefc67e7685d5",
    "email":"test@test.com",
    "concurrency": False,
    "org_id": org_id,
    "service_id": service_id
}

snet_sdk = sdk.SnetSDK(config)
service_client = snet_sdk.create_service_client(org_id, service_id, group_name)
result = service_client.call_rpc("mul", "Numbers", a=20, b=3)
print(f"Performing 20 * 3: {result}")
```

After executing this code, you should have client libraries created for this service. They are located in the following path: ~/.snet/org_id/service_id/python/.

To call these methods, you need to use the call_rpc method, passing into it the names of the method and data object, as well as the data itself (What specific data needs to be passed can be seen in the .proto file).

The SDK itself receives the model definition from IPFS, compiles the code, configures payment channels and makes the request for you.

This isn't done for every request. It will only do these steps if it doesn't have a local cache of a compiled model, and doesn't
already have an existing funded channel to use.
