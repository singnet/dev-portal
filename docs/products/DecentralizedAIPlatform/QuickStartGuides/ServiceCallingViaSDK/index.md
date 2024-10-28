# Service Calling via SDK

Currently our SDK supports Python and JS (Web and Node). In the future we will support a wider range of languages. 
We use protocol buffers and grpc, so if you can find language support for both of them, it's only a matter of time 
before we (or the community! ;-) ) write an SDK for it.

## Step 1. Prerequisites

This guide assumes you've got a wallet (check 
[Getting Ready to Call AI CheckUp](/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToCallAICheckUp/) 
guide).  

This guide calls the calculator service (organization_id = `26072b8b6a0e448180f8c0e702ab6d2f`, 
service_id = `Exampleservice`) on the testnet `sepolia` (chain_id = `11155111`).

### Versions

:::code-group
```plaintext [Python]
python 3.10 +
```

```plaintext [WebJS]
Node.js 18 +
react-scripts 5.0.1 +
```

```plaintext [NodeJS]
Node.js 18 +
npm 8.0.0 +
```
:::

## Step 2. Install the SDK

:::code-group
```sh [Python]
pip install snet.sdk
```

```sh [WebJS]
npm install snet-sdk-web
```

```sh [NodeJS]
npm install snet-sdk
```
:::

## Step 3. Configure project (only for WebJS)

If you are using `create-react-app` then require Node.js polyfills for browser compatibility, To add these polyfills, you can use the `config-overrides.js` file with `react-app-rewired`. This approach allows you to customize the Webpack configuration without ejecting from `create-react-app`.

Install **react-app-rewired** into your application

```sh
npm install --save-dev react-app-rewired
```

Install the necessary polyfill packages

```sh
npm install --save-dev buffer process os-browserify url
```

Create **config-overrides.js** in the root of your project with the content:

```javascript
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ]);
    config.ignoreWarnings = [/Failed to parse source map/];
    config.module.rules.push({
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        loader: require.resolve('source-map-loader'),
        resolve: {
            fullySpecified: false,
        },
    });
    return config;
};
```

Update your **package.json** scripts to use **react-app-rewired** instead of **react-scripts**.

```json
{
    "scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test",
        "eject": "react-scripts eject"
    }
}
```

## Step 4. Generate stubs

:::code-group
```sh [Python]
# Python SDK generates stubs automatically when you create a service client
```

```sh [WebJS]
# For Linux
protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --js_out=import_style=commonjs,binary,namespace_prefix=\
    [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. \
    [proto file name].proto
    
# For Windows
protoc ^
    --plugin=protoc-gen-ts=%cd%/node_modules/.bin/protoc-gen-ts.cmd ^ --js_out=import_style=commonjs,binary,namespace_prefix=^
    [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. ^
    [proto file name].proto
```

```sh [NodeJS]
# For Linux
protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --js_out=import_style=commonjs,binary,namespace_prefix=\
    [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. \
    [proto file name].proto
    
# For Windows
protoc ^
    --plugin=protoc-gen-ts=%cd%/node_modules/.bin/protoc-gen-ts.cmd ^ --js_out=import_style=commonjs,binary,namespace_prefix=^
    [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. ^
    [proto file name].proto
```
:::

## Step 5. Write some code!

Here's an example of calling a service using the SDK

Once you have installed **snet-sdk** in your current environment, you should import **snet-sdk** 
and create an instance of the **base sdk class**. The SDK instance is then used to create **service client** instances. 
Finally, the generated **service_client** instance can be used to call methods provided by the service.

:::code-group
```python [Python]
from snet import sdk

config = sdk.config.Config(private_key='YOUR_PRIVATE_KEY',
                eth_rpc_endpoint=f"https://sepolia.infura.io/v3/YOUR_INFURA_KEY", # RPC endpoint of "sepolia" network
                concurrency=False,
                force_update=False)

snet_sdk = sdk.SnetSDK(config)

org_id = "26072b8b6a0e448180f8c0e702ab6d2f" # Organization ID
service_id = "Exampleservice" # Service ID
group_name = "default_group"
service_client = snet_sdk.create_service_client(org_id=org_id, service_id=service_id, group_name=group_name)

result = service_client.call_rpc("mul", "Numbers", a=20, b=3)
print(f"Performing 20 * 3: {result}")

```

```javascript [WebJS]
import SnetSDK from 'snet-sdk-web';

const config = {
    web3Provider: window.ethereum,
    networkId: '11155111', // Chain ID of "sepolia" network
    defaultGasPrice: '4700000',
    defaultGasLimit: '210000',
};

const initSDK = async () => {
    try {
        const web3Provider = window.ethereum;
        sdk = new SnetSDK(config);
        await sdk.setupAccount();
        return sdk;
    } catch (error) {
        throw error;
    }
};

const getServiceClient = async () => {
    const sdk = await initSdk();
    const calculatorClient = await  sdk.createServiceСlient(
        '26072b8b6a0e448180f8c0e702ab6d2f', // Organization ID
        'Exampleservice' // Service ID
    );
}

const sentRequest = async () => {
    const methodDescriptor = Calculator.mul;
    const request = new methodDescriptor.requestType();

    request.setA(20);
    request.setB(3);

    const props = {
        request,
        preventCloseServiceOnEnd: false,
        onEnd: onActionEnd(),
    };

    const serviceClient = await getServiceClient();
    serviceClient.unary(methodDescriptor, props);
}

const onActionEnd = (response) => {
    const { message, status, statusMessage } = response;
    if (status !== 0) {
        throw new Error(statusMessage);
    }

    console.log("Performing 20 * 3: ", response.message.getValue())
}
```

```javascript [NodeJS]
const SnetSDK = require('snet-sdk');
const grpc = require('./path_to_generated_grpc_js_file');  // Path to the generated libraries

const config = {
    web3Provider: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID", // RPC endpoint of "sepolia" network
    privateKey: "0xYOUR_PRIVATE_KEY",
    networkId: "11155111", // Chain ID of "sepolia" network
    ipfsEndpoint: "https://ipfs.singularitynet.io",
    defaultGasPrice: "4700000",
    defaultGasLimit: "210000"
  }

async function callService() {
    const sdk = new SnetSDK.default(config);
    const client = await sdk.createServiceClient('26072b8b6a0e448180f8c0e702ab6d2f', // Organization ID
                                                 'Exampleservice', // Service ID 
                                                 grpc.Calculator);
    
    const methodDescriptor = grpc.Calculator.mul;
    const request = new methodDescriptor.requestType();
    request.setA(20);
    request.setB(3);
    
    client.service.getValue(request, (err, result) => {
        if (err) {
            console.error("GRPC call failed", err);
        } else {
            console.log("Performing 20 * 3: ", result.toString());
        }
    });
}

callService();
```
:::

> **Note:** The SDK itself configures payment channels for you.

After executing this code, you should have the following result in console:

```plaintext
Performing 20 * 3: 60
```

> **Note:** You can also use other values and methods to call in that service. Moreover, you can change id of the organization and 
service to call other services and chain id or RPC endpoint to call services on mainnet.

To learn more about every SDK, visit:
- [Python SDK](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)
- [WebJS SDK](/docs/products/DecentralizedAIPlatform/SDK/WebJsSDK/getting-started-guide/)
- [NodeJS SDK](/docs/products/DecentralizedAIPlatform/SDK/NodeJsSDK/getting-started-guide/)