# Tutorial to getting information about the calculator service and connecting Metamask

This is an example of how to use SingularityNET Web JS SDK to getting information about the calculator service and connecting Metamask.

## Development

#### Install package

Before the beginning you need to install `snet-sdk-web` package:

```sh
npm install snet-sdk-web
```

And additional packages

```sh
npm install google-protobuf @improbable-eng/grpc-web snet-sdk-web web3
npm install --save-dev react-app-rewired buffer process os-browserify url
```

Make sure that you have Node.js version >= 18 and `react-scripts` version >= 5.0.1

Create **config-overrides.js** in the root of your project with the content:

```javascript
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        os: require.resolve('os-browserify'),t
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

#### Configuration

Firstly, we need to configure sdk and service client. So we create a config dict and then an sdk instance with
that config.

```js
// sdkConfig.js file
import SnetSDK from 'snet-sdk-web';

const config = {
    web3Provider: window.ethereum,
    networkId: '11155111',
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
```

| Variable Name   | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| web3Provider    | A URL or one of the Web3 provider classes.                                               |
| networkId       | Ethereum network ID.                                                                     |
| defaultGasPrice | The gas price to be used in case of fetching the gas price form the blockchain fails.    |
| defaultGasLimit | The gas limit to be used in case of fetching the gas estimate from the blockchain fails. |
| ipfsEndpoint    | A URL for fetching service related metadata.                                             |
| rpcEndpoint     | RPC endpoints serve as gateways for Web3 applications to connect with blockchain nodes   |

**Note:** `rpcEndpoint` is optional, you should provide this if you are getting block size limit exceeded error. This is usually happens when you are using any web social auth providers.

#### Getting information about a service

The information about a service that was provided on publishing service contents in service client object:

```js
const getServiceInfo = async () => {
    const sdk = await initSDK();
    const client = await sdk.createServiceClient(
        'samples',
        'calculator'
    );
    return client.metadata;
};

```

The structure of the service data:

```json
{
    "version": 1,
    "display_name": "Example service",
    "encoding": "proto",
    "service_type": "grpc",
    "model_ipfs_hash": "QmeyrQkEyba8dd4rc3jrLd5pEwsxHutfH2RvsSaeSMqTtQ",
    "mpe_address": "0x7E0aF8988DF45B824b2E0e0A87c6196897744970",
    "groups": [
        {
            "free_calls": 0,
            "free_call_signer_address": "0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F",
            "daemon_addresses": [
                "0x0709e9b78756b740ab0c64427f43f8305fd6d1a7"
            ],
            "pricing": [
                {
                    "default": true,
                    "price_model": "fixed_price",
                    "price_in_cogs": 1
                }
            ],
            "endpoints": [
                "http://node1.naint.tech:62400"
            ],
            "group_id": "/mb90Qs8VktxGQmU0uRu0bSlGgqeDlYrKrs+WbsOvOQ=",
            "group_name": "default_group"
        }
    ],
    "service_description": {
        "url": "https://sepolia-v2-publisher.singularitynet.io/org",
        "short_description": "Example service",
        "description": "Example service"
    },
    "media": [
        {
            "order": 1,
            "url": "https://sepolia-marketplace-service-assets.s3.us-east-1.amazonaws.com/samples/services/d05c62bf9aa84843a195457d98417f4e/assets/20240327124952_asset.jpeg",
            "file_type": "image",
            "asset_type": "hero_image",
            "alt_text": ""
        }
    ],
    "contributors": [
        {
            "name": "test",
            "email_id": ""
        }
    ],
    "tags": [
        "calculator"
    ]
}
```

#### Connect to metamask

The SDK connects to Metamask at the first initialization. After that, you can exchange data with the user's wallet

For example, to get the wallet address, ASI (FET) token balance or transactions between service and wallet:

```js
export const getWalletInfo = async () => {
    const sdk = await initSDK();
    const address = await sdk.account.getAddress();
    const balance = await sdk.account.balance();
    const transactionCount = await sdk.account._transactionCount();
    return { address, balance, transactionCount };
};
```

From `sdk.account` you can get next info:
```
class Account {
  address(): String
  allowance(): BigNumber
  approveTransfer(amountInCogs): Transaction
  balance(): BigNumber
  depositToEscrowAccount(amountInCogs): Transaction
  escrowBalance(): BigNumber
  sendTransaction(to, contractFn, ...contractFnArgs): Transaction
  signData(message): Buffer
  signerAddress(): String
  withdrawFromEscrowAccount(amountInCogs): Transaction
  _waitForTransaction(String hash): Transaction
  _getTokenContract(): Contract
  _generateTokenContract(): Contract
  _baseTransactionObject(operation, to): Transaction
  _getGas(operation) : {gasLimit, gasPrice}
  _transactionCount(): Number
}
```

For example, the method of creating an organization from a registry contract:
```js
const registerOrganization = () => {
    const sdk = await initSDK();
    const address = await sdk.account.getAddress();
    const method = sdk._registryContract
        .createOrganization(orgId, orgMetadataURI, members)
        .send({ from: address })
        .on(blockChainEvents.TRANSACTION_HASH, async (hash) => {
            return hash;
        })
        .once(blockChainEvents.CONFIRMATION, async ({ confirmationNumber, receipt }) => {
            if (!receipt.status) {
                method.off();
                throw new Error(receipt);
            }
            await method.off();
        })
        .on(blockChainEvents.ERROR, (error) => {
            throw new Error(error.message);
        });
}
```

The entire application code can be viewed at the
[link](https://github.com/singnet/snet-sdk-js/tree/master/packages/web/examples/calculator) to GitHub.