## Using the python SDK

Create a directory and a virtual environment for python by following below example
```sh
mkdir service
cd service
python3.7 -m venv env #check your python version and set this accordingly , 
source env/bin/activate #activate your virtual environment
```
Install the SDK using PIP
```sh
pip install snet.sdk
```
To generate the required gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you can install using pip
```sh
pip install snet-cli
```
Generate the required grpc stubs by using the below command. Here, replace **org_id** and **service_id** with service details that you want to invoke using SDK.


This command will generate stubs in given output location as 
org_id/service_id/python/stub_pb2.py
org_id/service_id/python/stub_pb2_grpc.py

```sh
snet sdk generate-client-library python org_id service_id output_location
```
Once the required files are generated, import them into service folder and copy the below code into a python file service.py into the same directory.

Before invoking the service make sure you have your own etherium wallet with some AGIX and an infura account. You can create an infura account [here](https://infura.io)

Follow these [steps](https://blog.infura.io/getting-started-with-infura-28e41844cc89/) to get infura key.

Here, below example is shown for example_service. Replace the values according to the service you want to work with.

```sh
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

In the above shown example the SNET SDK is initialized with required config values.Then service client is prepared for the required service we want to invoke using the appropriate stub file (CalulaculatorStub). Finally, the service is invoked by calling service_client.service.method_name(arguments).

Invoke service by running below command
```
python service.py
```
output from code
```
value: 16.0
service invoked successfully
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
