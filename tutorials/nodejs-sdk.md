---
# Page settings
layout: default
keywords: SDK, NodeJS 
comments: false
title: NodeJS SDK
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

# NodeJS SDK

### User Guide for Using the SingularityNET SDK (`snet-sdk`)

This guide provides step-by-step instructions for setting up and using the SingularityNET SDK for Node.js. Follow these steps to integrate and interact with SingularityNET services in your application.

---

## 1. Prerequisites
Before you start using the snet-sdk, ensure that your system meets the following requirements:

Node.js: Version 18 or higher
npm: Version 8 or higher
You can check your current versions by running the following commands:

```bash
node -v
npm -v
```

If the versions are lower than required, update Node.js and npm.

## 2. Installation
Install the snet-sdk package using npm:

```bash
npm install snet-sdk
```

## 3. Configuration Setup
Create a configuration file (e.g., config.js) to store your SingularityNET SDK configuration settings. Below is a sample configuration setup:

```json
{ 
    "web3Provider": "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    "privateKey": "0xYOUR_PRIVATE_KEY",
    "networkId": "1",
    "ipfsEndpoint": "https://ipfs.singularitynet.io",
    "defaultGasPrice": "4700000",
    "defaultGasLimit": "210000"
}
```

### Explanation of Configuration Keys:

- **web3Provider**: URL of the Web3 provider to interact with the Ethereum network.
- **privateKey**: Private key of your Ethereum account for signing transactions.
- **networkId**: Ethereum network ID (e.g., `1` for Mainnet, `11155111` for Sepolia).
- **ipfsEndpoint**: Endpoint for connecting to SingularityNET's IPFS node.
- **defaultGasPrice**: Gas price for transactions in wei.
- **defaultGasLimit**: Gas limit for transactions.

Replace the placeholders with your actual credentials and network information.

## 4. Generate gRPC Client Libraries
To interact with specific SingularityNET services, you need to generate gRPC client libraries for those services using the SingularityNET CLI.

Install the SingularityNET CLI: If you haven't installed the CLI yet, you can install it via pip:

```bash
pip install snet-cli
```

For more detailed instructions, you can refer to the [SingularityNET CLI documentation](https://github.com/singnet/snet-cli#installing-with-pip).

Generate the gRPC Client Library: Use the CLI to generate the gRPC client library for the service you want to use. Replace <org_id> and <service_id> with the appropriate organization and service identifiers.

```bash
snet sdk generate-client-library nodejs <org_id> <service_id>
```

The generated client libraries will be located in the default directory `./client_libraries/nodejs/<hash>/<org_id>/<service_id>` unless you specify a different output path.

## 5. Using the SDK
After setting up the configuration and generating the necessary gRPC client libraries, you can start using the SDK in your application:

1. **Import and Initialize the SDK**: Use the configuration file to initialize an SDK instance.

```javascript
import SnetSDK from 'snet-sdk';
import config from './config'; // Path to your config file

const sdk = new SnetSDK(config);
```

2. **Create a Service Client**: Use the generated gRPC client libraries to create a service client instance.

```javascript
const SnetSDK = require('snet-sdk');
const config = require('./config'); // Adjust path as necessary
const grpc = require('./path_to_generated_grpc_js_file'); // Adjust path as necessary

const sdk = new SnetSDK.default(config);
const client = await sdk.createServiceClient("<org_id>", "<service_id>", grpc.<ClientStub>);
```

3. **Make Service Calls:**: Use the service client to make calls to the SingularityNET service.

```javascript
const methodDescriptor = grpc.<ServiceStub>.<methodName>;
const request = new methodDescriptor.requestType();
request.<serviceSetMethod>("<message>");

client.service.<methodName>(request, (err, result) => {
    if (err) {
        console.error("GRPC call failed", err);
    } else {
        console.log("Result:", result.toString());
    }
});
```

Replace `<methodName>`, `<serviceSetMethod>`, and `<message>` with the appropriate method name, set method, and message content.
