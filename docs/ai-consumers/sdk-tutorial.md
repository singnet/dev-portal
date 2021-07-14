---
# Page settings
layout: default
keywords:
comments: false

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

## Using the Node.js SDK
[Click here](https://github.com/singnet/snet-code-examples/tree/master/nodejs/client)

## Using the Python SDK

Create a directory and a virtual environment for python by following below example
```
mkdir service
cd service
python3.7 -m venv env #check your python version and set this accordingly , 
source env/bin/activate #activate your virtual environment
```
Install the SDK using PIP
```
pip install snet.sdk
```
To generate the required gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you can install using pip
```
pip install snet-cli
```
Generate the required grpc stubs by using the below command. Here, replace <org_id> and <service_id> with service details that you want to invoke using SDK

This command will generate stubs in given output location as 
<org_id>/<service_id>/python/<stub>_pb2.py
<org_id>/<service_id>/python/<stub>_pb2_grpc.py

```
snet sdk generate-client-library python <org_id> <service_id> <output_location>
```
Once the required files are generated, import them into service folder and copy the below code into a python file service.py into the same directory.

Before invoking the service make sure you have your own etherium wallet with some AGIX and an infura account. You can create an infura account [here](https://infura.io)

Here, below example is shown for example_service. Replace the values according to the service you want to work with.

```
from snet.sdk import SnetSDK
import example_service_pb2
import example_service_pb2_grpc

def invoke_service():
    config ={
       "private_key": "<your wallet's private key>",
       "eth_rpc_endpoint": "https://mainnet.infura.io/v3/<your infura key>",
       "org_id": "snet",
       "service_id": "example_service",
    }
    sdk = SnetSDK(config=config)
    service_client = sdk.create_service_client(
       org_id=config["org_id"],
       service_id=config["service_id"],
       service_stub=example_service_pb2_grpc.CalculatorStub
    )
    request = example_service_pb2.Numbers(a=10, b=6)
    response = service_client.service.add(request)
    print(f"result :: {response}"")
    print("service invoked successfully")

if __name__ == '__main__':
    invoke_service()
    
```

In the above shown example the SNET SDK is initialized with required config values.Then service client is prepared for the required service we want to invoke using the appropriate stub file (CalulaculatorStub). Finally, the service is invoked by calling service_client.service.<method_name>(<arguments>).

Invoke service by running below command
```
python service.py
```
output from code
```
value: 16.0
service invoked successfully
```


[Click here](https://github.com/singnet/snet-cli/blob/master/packages/sdk/testcases/functional_tests/test_sdk_client.py)

