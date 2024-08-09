---
# Page settings
layout: default
keywords: Python SDK, Node.js SDK
comments: false
title: SDK Tutorial
description: All about SDK

# extralink box
extralink:
  title: All Docs
  title_url: "/docs"
  external_url: false
  description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true
---

## Using the python SDK
Currently, Python 3.10 or higher is required to use the SDK from version 3.2.0  

Create a directory and a virtual environment for python by following below example
```sh
mkdir service
cd service
python3.10 -m venv env # сheck your python version and set this accordingly , 
source env/bin/activate # activate your virtual environment
```
Install the SDK using PIP
```sh
pip install snet.sdk
```
Previously, for the SDK to work, you had to download and generate pb files for the called service yourself and import them.

Now it will happen automatically for this you just need to run the code with a call to the service for the first time.

Before invoking the service make sure you have your own etherium wallet with some AGIX and an infura account. You can create an infura account [here](https://infura.io)

Follow these [steps](https://blog.infura.io/getting-started-with-infura-28e41844cc89/) to get infura key.

Here, below example is shown for example_service. Replace the values according to the service you want to work with.

### Usage

To call a SingularityNET service, the user must be able to deposit funds (AGIX tokens) to the [Multi-Party Escrow](https://dev.singularitynet.io/docs/concepts/multi-party-escrow/) Smart Contract.
To deposit these tokens or do any other transaction on the Ethereum blockchain, the user must possess an Ethereum identity with available Ether.

Once you have installed snet-sdk in your current environment, you can import it into your Python script and create an instance of the base sdk class:
```python
from snet import sdk
config = {
        "private_key": 'YOUR_PRIVATE_WALLET_KEY',
        "eth_rpc_endpoint": f"https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
        "email": "your@email.com",
        "concurrency": False,
        "identity_name": "local_name_for_that_identity",
        "identity_type": "key",
        "network": "sepolia",
        "force_update": False
    }

snet_sdk = sdk.SnetSDK(config)
```

##### List organizations and their services

You can use the sdk client instance`s methods get_organization_list() to list all organizations and get_services_list("org_id") to list all services of a given organization.  

```python
print(snet_sdk.get_organization_list())
print(snet_sdk.get_services_list("26072b8b6a0e448180f8c0e702ab6d2f"))
```

##### Free call configuration

If you want to use the free calls you will need to pass these arguments to the create_service_client() method:

```         
"free_call_auth_token-bin":"f2548d27ffd319b9c05918eeac15ebab934e5cfcd68e1ec3db2b92765",
"free-call-token-expiry-block":172800,
```
You can receive these for a given service from the [Dapp](https://beta.singularitynet.io/)
#### Calling the service
Now, the instance of the sdk can be used to create the service client instances.  
Continuing from the previous code here is an example using `Exampleservice` from the `26072b8b6a0e448180f8c0e702ab6d2f` organization:

```python
service_client = snet_sdk.create_service_client(org_id="26072b8b6a0e448180f8c0e702ab6d2f", 
                                                service_id="Exampleservice",
                                                group_name="default_group")
```
Creating a service client with free calls included would look like this:
```python
service_client = snet_sdk.create_service_client(org_id="26072b8b6a0e448180f8c0e702ab6d2f", 
                                                service_id="Exampleservice",
                                                group_name="default_group",
                                                free_call_auth_token_bin="f2548d27ffd319b9c05918eeac15ebab934e5cfcd68e1ec3db2b92765",
                                                free_call_token_expiry_block=172800)
```

After executing this code, you should have client libraries created for this service. They are located at the following path: `~/.snet/org_id/service_id/python/`

Note: Currently you can only save files to `~/.snet/`. We will fix this in the future.   
```python
service_client.deposit_and_open_channel(123456, 33333)
```
`deposit_and_open_channel(amount, expiration)` function deposits the specified amount of AGIX tokens in cogs into an MPE smart contract and opens a payment channel. Expiration is payment channel's TTL in blocks.    
The instance of service_client that has been generated can be utilized to invoke the methods that the service offers. You can list these using the get_services_and_messages_info_as_pretty_string() method:
```python
print(service_client.get_services_and_messages_info_as_pretty_string())
```

To invoke the service`s methods, you can use the the call_rpc() method. This method requires the names of the method and data object, along with the data itself, to be passed into it. 
To continue with our example, here’s a call to the *mul* method of the *Exampleservice* from the *26072b8b6a0e448180f8c0e702ab6d2f* organization:

```python
result = service_client.call_rpc("mul", "Numbers", a=20, b=3)
print(f"Calculating 20 * 3: {result}") #  Calculating 20 * 3: 60.0
```

## Using the Node.js SDK

### Download the Node.js boilerplate code

- Select any [AI service from here](https://beta.singularitynet.io/).
- Click "Install and run"
- Click "Node.js"
- Download integration files

### Requirements to run the downloaded AI service

| Language     | Download               |
| ------------ | ---------------------- |
| Node JS 12.X | https://nodejs.org/en/ |

### Step 1. Install dependencies

```sh
npm install
```

Then update .env with your keys

Update aiService.js with the following points:

- Please validate the import statements of the service and the messages on the top.
- Update method getServiceClient with correct client from the grpc_pb.js file
- Initialize the request object and the set the required input values on method exampleService

Example `aiService.js` configured for example service

```sh
import dotenv from "dotenv";
import SnetSDK, { DefaultPaymentStrategy } from "snet-sdk";
/**
 * 1: Update the import paths for service and message grpc stubs
 */
import service from "./grpc_stubs/example_service_grpc_pb";
import messages from "./grpc_stubs/example_service_pb";
import config from "./config";

dotenv.config();
const sdk = new SnetSDK(config);

const orgId = "replace_with_actual_org_id";
const serviceId = "replace_with_actual_service_id";
const groupName = "default_group";
const paymentStrategy = new DefaultPaymentStrategy(100);
let tokenToMakeFreeCall = process.env.FREE_CALL_TOKEN
  ? process.env.FREE_CALL_TOKEN.toUpperCase()
  : "";
tokenToMakeFreeCall = Boolean(tokenToMakeFreeCall)
  ? tokenToMakeFreeCall.startsWith("0X")
    ? tokenToMakeFreeCall
    : `0X${tokenToMakeFreeCall}`
  : "";
const serviceClientOptions = {
  tokenToMakeFreeCall,
  tokenExpirationBlock: process.env.TOKEN_EXPIRATION_BLOCK,
  email: process.env.EMAIL,
  disableBlockchainOperations: false,
  concurrency: true,
};

const closeConnection = () => {
  sdk.web3.currentProvider.connection &&
    sdk.web3.currentProvider.connection.close();
};

export const getServiceClient = async () => {
  try {
    const serviceClient = await sdk.createServiceClient(
      orgId,
      serviceId,
      /**
       * 2: Use Correct Client from the grpc_pb.js file
       */
      service.CalculatorClient,
      groupName,
      paymentStrategy,
      serviceClientOptions
    );
    return serviceClient;
  } catch (error) {
    console.log("service client create error", error);
  }
};

const exampleService = async (serviceClientWithToken) => {
  console.log("service is invoked");
  let serviceClient = serviceClientWithToken;
  try {
    if (!serviceClient) {
      serviceClient = await getServiceClient();
    }
    /**
     * 3: Initialize the request object and the set the required input values
     */
    const request = new messages.Numbers();
    request.setA(20);
    request.setB(10);
    /**
     * Invoke service methods
     */
    console.log("created request");
    return new Promise((resolve, reject) => {
      /**
       * 4: Change the method name according to your service
       */
      serviceClient.service.add(request, (err, result) => {
        console.log("service call error", err);
        if (err) {
          return reject(err);
        }

        resolve(result.getValue());
      });
    });
  } catch (error) {
    console.log("promise error", error);
    throw error;
  }
};
export default exampleService;
```

### Step 2. Invoke AI service

```sh
npm run start
```
