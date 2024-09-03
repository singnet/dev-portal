---
# Page settings
layout: default
keywords: Node.js SDK
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
