# Concurrent (Prepaid) Calls in Python SDK

## Overview

On the SingularityNET platform, concurrency allows users to prepay for a group of service calls instead of paying for each one individually. This feature is useful for AI services deployed on the AI Marketplace that need high-throughput, low-latency performance. You can enable it through the Python SDK with a single configuration parameter and benefit from off-chain payments via a prepaid strategy.

This guide is intended for developers deploying and calling their services using the Python SDK.

If you are not yet familiar with calling services, we recommend reading:
- [Python SDK Getting Started Guide](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)


## Configuration

To use concurrency, first install the SDK:

```sh
pip install snet.sdk
```

Then configure the SDK with concurrency enabled:

```python
from snet import sdk

PRIVATE_KEY = "YOUR_PRIVATE_KEY"
ALCHEMY_KEY = "YOUR_ALCHEMY_KEY"

config = sdk.config.Config(
    private_key=PRIVATE_KEY,
    eth_rpc_endpoint=f"https://eth-sepolia.g.alchemy.com/v2/{ALCHEMY_KEY}",
    concurrency=True,  # Enables prepaid concurrency
    force_update=False
)

snet_sdk = sdk.SnetSDK(config)
```

You can also use any other RPC provider.
> If you don’t have an Alchemy API key, you can get one by following our guide: [Get an Alchemy API Key](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/)

## Creating a Service Client with Concurrency

Once the config is ready, create a `ServiceClient` and pass the `concurrent_calls` parameter. This defines how many prepaid calls you want to allocate:

```python
org_id = "ORG_ID"
service_id = "SERVICE_ID"
concurrent_calls = 5

service_client = snet_sdk.create_service_client(
    org_id=org_id,
    service_id=service_id,
    concurrent_calls=concurrent_calls
)
```

This creates a client using the concurrency (prepaid) strategy under the hood. The SDK will automatically manage the payment channel for you.

## Making Prepaid Concurrent Calls

The standard method for calling an AI service is:

```python
service_client.call_rpc(method_name, message_type, **inputs)
```

### Parameters:

| Parameter     | Description                                                  |
|--------------|--------------------------------------------------------------|
| `method_name`| gRPC method defined in your service (e.g., `"add"`)          |
| `message_type`| Input message type defined in the proto (e.g., `"Numbers"`) |
| `**inputs`   | Key-value fields that match the structure of `message_type`  |

### Example:

```python
response = service_client.call_rpc(
    "add",
    "Numbers",
    a=1,
    b=2
)
print(response)
```

To make multiple calls:

```python
for i in range(5):
    resp = service_client.call_rpc("add", "Numbers", a=1, b=2)
    print(f"Call {i+1} result:", resp)
```

### Expected Output:

```
Call 1 result: {'value': 3.0}
Call 2 result: {'value': 3.0}
...
```

## Full Example (Working Snippet)

```python
from snet import sdk

PRIVATE_KEY = "YOUR_PRIVATE_KEY"
ETH_RPC_ENDPOINT = "https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
ORG_ID = "TossTestOrg"
SERVICE_ID = "TossTestService_DEMO"
CONCURRENT_CALLS = 5

# Configure the SDK
config = sdk.config.Config(
    private_key=PRIVATE_KEY,
    eth_rpc_endpoint=ETH_RPC_ENDPOINT,
    concurrency=True,
    force_update=False
)

# Initialize the SDK and client
snet_sdk = sdk.SnetSDK(config)
service_client = snet_sdk.create_service_client(
    org_id=ORG_ID,
    service_id=SERVICE_ID,
    concurrent_calls=CONCURRENT_CALLS
)

# Make multiple concurrent calls
for i in range(CONCURRENT_CALLS):
    response = service_client.call_rpc("add", "Numbers", a=1, b=2)
    print(f"Call {i+1} result:", response)
```
> If you don’t have an Alchemy API key, you can get one by following our guide: [Get an Alchemy API Key](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/)
## How It Works

- Concurrency mode uses a prepaid strategy (calls are paid once upfront).
- The SDK handles channel management off-chain.
- No need for repeated on-chain payments.
- Ideal for services requiring multiple calls (e.g., batch inference).

## Summary

With just a few lines of code, you:

- Enabled concurrency (prepaid mode) in the SDK.
- Created a service client for your AI service.
- Made efficient, low-latency calls using the concurrency model.

For more advanced service behaviors (like batching, custom metadata, or streaming), check out additional SDK features in the documentation.
