# Node.js SDK

SingularityNET SDK for Node.js

## ❗ Currently under development ❗

Node.js SDK is currently under development, so some functionality may be unavailable or work incorrectly.

## Package

| Package                                      | Description                                               |
|----------------------------------------------|-----------------------------------------------------------|
| [snet-sdk](https://www.npmjs.com/package/snet-sdk) | Integrate SingularityNET services seamlessly into Node.js applications |

## Getting Started

### Step 1. Prerequisites

To work with the `snet-sdk` on the Node.js platform, ensure that you have the following versions installed:

- **Node.js** version 18 or higher.
- **npm** version 8 or higher.

Check the installed versions with the following commands:

```bash
node -v
npm -v
```

### Step 2. Install the SDK

Install the SDK using npm:

```bash
npm install snet-sdk
```

### Step 3. Configuration Setup

Create a configuration file (e.g., `config.js`) to store your SingularityNET SDK configuration settings. Below is a sample configuration setup:

```json
{
  "web3Provider": "https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
  "privateKey": "0xYOUR_PRIVATE_KEY",
  "networkId": "1",
  "ipfsEndpoint": "https://ipfs.singularitynet.io",
  "defaultGasPrice": "4700000",
  "defaultGasLimit": "210000"
}
```

### Explanation of Configuration Keys:

- **`web3Provider`**: The URL of the Web3 provider to interact with the Ethereum network. 
Replace `YOUR_ALCHEMY_API_KEY` with your Alchemy API key. [Follow these instructions to get your API key](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/).
- **`privateKey`**: The private key of your Ethereum account for signing transactions.
- **`networkId`**: Ethereum network ID (e.g., `1` for Mainnet, `11155111` for Sepolia).
- **`ipfsEndpoint`**: SingularityNET’s IPFS node endpoint.
- **`defaultGasPrice`**: Gas price for transactions (in wei).
- **`defaultGasLimit`**: Gas limit for transactions.

Make sure to replace the placeholder values with your actual credentials and network information.

Now, the instance of the sdk can be used to instantiate clients for SingularityNET services.
To interact with those services, the sdk needs to be supplied with the compiled gRPC client libraries.

### Step 4. Generate gRPC Client Libraries

To interact with specific SingularityNET services, you need to generate gRPC client libraries using the SingularityNET CLI.

#### Install the CLI via pip:

```bash
pip install snet-cli
```

For more detailed instructions, refer to the [SingularityNET CLI documentation](https://github.com/singnet/snet-cli#installing-with-pip).

#### Generate the gRPC Client Library:

Now we need to generate stub files.

```sh
protoc -I="." --js_out=import_style=commonjs,binary:. <file_name>.proto
protoc-gen-grpc -I="." --grpc_out=grpc_js:. <file_name>.proto
```

For more details please check the [Generating stubs for JS tutorial](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/generating-stubs/)

Once you have the generated gRPC client libraries, you can create an instance of a SingularityNET service client.

### Step 5. Call a service

After setting up the configuration and generating the necessary gRPC client libraries, you can start using the SDK in your application:

#### Import and Initialize the SDK: use the configuration file to initialize an SDK instance.

```javascript
import SnetSDK from 'snet-sdk';
import config from './config'; // Path to your config file

const sdk = new SnetSDK(config);
```

#### Create a Service Client: use the generated gRPC client libraries to create a service client instance.

```javascript
const SnetSDK = require('snet-sdk');
const config = require('./config'); // Adjust path as necessary
const grpc = require('./path_to_generated_grpc_js_file'); // Adjust path as necessary

const sdk = new SnetSDK.default(config);
const client = await sdk.createServiceClient("<org_id>", "<service_id>", grpc.<ClientStub>);
```


#### Make Service Calls: use the service client to make calls to the SingularityNET service.

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

#### Example code for calling a service:

Here’s a complete example demonstrating how to call a service method:

```javascript
const SnetSDK = require('snet-sdk');
const config = require('./config');  // Path to the configuration file
const grpc = require('./path_to_generated_grpc_js_file');  // Path to the generated libraries

async function callService() {
    const sdk = new SnetSDK.default(config);
    const client = await sdk.createServiceClient("<org_id>", "<service_id>", grpc.<ClientStub>);
    
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
}

callService();
```

Replace `<org_id>`, `<service_id>`, `<methodName>`, `<serviceSetMethod>`, and `<message>` with the appropriate values for your service.

## Concurrency Support and Advanced Features

### Concurrency

SDK exposes two methods to facilitate concurrent service calls.

- `getConcurrencyTokenAndChannelId`
- `setConcurrencyTokenAndChannelId`

In the consumer, you should call the `getConcurrencyTokenAndChannelId()` in the master thread.
It will return the concurrency token and the channel id. Pass both of them to worker threads and the set the same in the respective instances using `setConcurrencyTokenAndChannelId`.

SDK also exposes the class `DefaultPaymentStrategy` to handle the payment metadata for concurrent calls. Initialize the `DefaultPaymentStrategy` with the number of calls you would want to run concurrently.

#### Example of making concurrent service calls:

```javascript
import SnetSDK, { DefaultPaymentStrategy } from "snet-sdk";
import cluster from "cluster";

const sdk = new SnetSDK(config);

const main = async () => {
    const paymentStrategy = new DefaultPaymentStrategy(4);
    const serviceClient = await sdk.createServiceClient("<org_id>", "<service_id>", grpc.<ClientStub>, "default_group", paymentStrategy);
    
    if (cluster.isMaster) {
        const { concurrencyToken, channelId } = await serviceClient.getConcurrencyTokenAndChannelId();
        const worker = cluster.fork();
        worker.on("message", message => {
            worker.send({ concurrencyToken, channelId });
        });
    } else {
        process.on("message", async (message) => {
            serviceClient.setConcurrencyTokenAndChannelId(message.concurrencyToken, message.channelId);
            const request = new grpc.<ClientStub>.requestType();
            request.setA(6);
            request.setB(7);
            serviceClient.service.mul(request, (err, result) => {
                if (err) {
                    console.error("Service failed with error", err);
                } else {
                    console.log("Service response:", result);
                }
            });
        });
    }
};

main();
```

This example shows how to manage concurrency using the SingularityNET SDK in Node.js.