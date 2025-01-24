# snet-sdk-web

SingularityNET SDK for Browser (Web)

## Package

The package is published in npm at the following link:

| Package                                                    | Description                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| [snet-sdk-web](https://www.npmjs.com/package/snet-sdk-web) | Integrate SingularityNET services seamlessly into Web applications |

## Getting Started

These instructions are for the development and use of the SingularityNET SDK for JavaScript on web platform like browsers.

### Installation

```bash
npm install snet-sdk-web
```

**Note:** This SDK requires Node.js version 18 or higher and `react-scripts` version 5.0.1 or higher for optimal functionality and compatibility.

If you are using `create-react-app` then require Node.js polyfills for browser compatibility, To add these polyfills, you can use the `config-overrides.js` file with `react-app-rewired`. This approach allows you to customize the Webpack configuration without ejecting from `create-react-app`.

Install **react-app-rewired** into your application

```bash
npm install --save-dev react-app-rewired
```

Install the necessary polyfill packages

```bash
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

### Configuring the snet-sdk-web

The SingularityNET SDK allows you to import compiled client libraries for your service or services of choice and make calls to those services programmatically from your application by setting up state channels with the providers of those services and making gRPC calls to the SingularityNET daemons for those services by selecting a channel with sufficient funding and supplying the appropriate metadata for authentication.

```js
// sdkConfig.js file
import SnetSDK from 'snet-sdk-web';

const config = {
    web3Provider: window.ethereum,
    networkId: '11155111',
    defaultGasPrice: '4700000',
    defaultGasLimit: '210000',
    ipfsEndpoint: 'http://ipfs.YOUR_ORGANIZATION.io:80',
    rpcEndpoint: 'https://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>',
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
```

| Variable Name   | Description                                                                              | Default value                      |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------- |
| web3Provider    | A URL or one of the Web3 provider classes.                                               | -                                  |
| networkId       | Ethereum network ID.                                                                     | -                                  |
| defaultGasPrice | The gas price to be used in case of fetching the gas price form the blockchain fails.    | 4700000                            |
| defaultGasLimit | The gas limit to be used in case of fetching the gas estimate from the blockchain fails. | 210000                             |
| ipfsEndpoint    | A URL for fetching service related metadata.                                             | `http://ipfs.singularitynet.io:80` |
| rpcEndpoint     | RPC endpoints serve as gateways for Web3 applications to connect with blockchain nodes   | -                                  |

**Note:** `rpcEndpoint` is optional, you should provide this if you are getting block size limit exceeded error. This is usually happens when you are using any web social auth providers.

**Note:** `ipfsEndpoint` is optional, you should provide this if you want using your ipfs.

**Debugging Tip:** To view debug logs, enable verbose mode in your browser's developer console.

### Service Calling

Now, the instance of the sdk can be used to instantiate clients for SingularityNET services. To interact with those services, the sdk needs to be supplied with the compiled gRPC client libraries.

This SDK uses [gRPC-web](https://github.com/improbable-eng/grpc-web) by improbable engineering. To generate the gRPC client libraries, follow the instructions given by the `gRPC-web` package [here](https://github.com/improbable-eng/grpc-web/tree/master/client/grpc-web).

The api to invoke gRPC methods against a service is similar to that of the `gRPC-web` package used.

```javascript

import { <ServiceName> } from  '<path_to_grpc_service_file>'

import { <Message> } from  '<path_to_grpc_message_file>'

const  client = sdk.createServiceClient("<org_id>", "<service_id>")

```

This generates a service client which can be used to make gRPC calls to the desired service.
You can then invoke service specific calls as follows

```javascript
client.invoke(<ServiceName>.<MethodName>, <InvokeRpcOptions>);
```

More details about can be found on the official [documentation](https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/invoke.md#invokerpcoptions).

---

## WEBSDK SETUP LOCALLY

If you want to setup WEB SDK locally please follow below steps

First clone this repo to your local machine.

Then open repo and go to web folder inside SNET-SDK-JS > packages > web

```bash
npm install
```

If you are using **Windows** Then follow below steps first

Copy **core** folder from **SNET-SDK-JS > packages > core** and paste or replace it inside **SNET-SDK-JS > packages > web > src**

```bash
npm run build
```

```bash
npm link
```

Now go to the other project or repo where you want to connect SDK locally

```bash
npm link snet-sdk-web
```

```bash
npm run start
```

**(NOTE)** If you change anything inside web sdk and you want to access the updated code inside your repo you need to re run all the above commands.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the
[tags on this repository](https://github.com/singnet/snet-sdk-js/tags).

## License

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/singnet/snet-sdk-js/blob/master/LICENSE) file for details.