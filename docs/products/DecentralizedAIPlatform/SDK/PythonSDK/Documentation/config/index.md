
# module : sdk.config

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/config.py) to GitHub

## Entities:
1. [Config](#class-config)
   - [\_\_init\_\_](#init)
   - [\_\_getitem\_\_](#getitem)
   - [get](#get)
   - [get_ipfs_endpoint](#get-ipfs-endpoint)


## Class `Config`

extends: -

is extended by: -

### description

This is a configuration manager for the SDK. It is responsible for handling configuration settings for the SDK.

### attributes

- `__config` (dict): The dictionary containing:
  - `private_key` (str): Your wallet's private key that will be used to pay for calls. Is **required** in config.
  - `eth_rpc_endpoint` (str): RPC endpoint that is used to access the Ethereum network. Is **required** in config.
  - `wallet_index` (int): The index of the wallet that will be used to pay for calls.
  - `ipfs_endpoint` (str): IPFS endpoint that is used to access IPFS. Defaults to _"/dns/ipfs.singularitynet.io/tcp/80/"_.
  - `concurrency` (bool): If set to True, will enable concurrency for the SDK.
  - `force_update` (bool): If set to False, will reuse the existing gRPC stubs (if any) instead of downloading proto 
and regenerating them every time.   
  - `mpe_contract_address` (str): The address of the Multi-Party Escrow smart contract.
  - `token_contract_address` (str): The address of the SingularityNET token smart contract.
  - `registry_contract_address` (str): The address of the Registry smart contract.
  - `signer_private_key` (str): The private key of the signer. Used to sign the service call. Equals to `private_key` 
by default.
  - `lighthouse_token` (str): The Lighthouse token used to access the Lighthouse storage provider. Defaults to " ". 
Currently, it can't be changed.

### methods

### `__init__`

Initializes a new instance of the class. Sets `__config` fields from passed arguments.

##### args:

- `private_key` (str): Your wallet's private key that will be used to pay for calls. Is **required** in config.
- `eth_rpc_endpoint` (str): RPC endpoint that is used to access the Ethereum network. Is **required** in config.
- `wallet_index` (int): The index of the wallet that will be used to pay for calls. Defaults to _0_.
- `ipfs_endpoint` (str): IPFS endpoint that is used to access IPFS. Defaults to _None_.
- `concurrency` (bool): If set to True, will enable concurrency for the SDK. Defaults to _True_.
- `force_update` (bool): If set to False, will reuse the existing gRPC stubs (if any) instead of downloading proto 
and regenerating them every time. Defaults to _False_.
- `mpe_contract_address` (str): The address of the Multi-Party Escrow smart contract. Defaults to _None_.
- `token_contract_address` (str): The address of the SingularityNET token smart contract. Defaults to _None_.
- `registry_contract_address` (str): The address of the Registry smart contract. Defaults to _None_.
- `signer_private_key` (str): The private key of the signer. Used to sign the service call. Equals to `private_key` 
by default.

##### returns:

- _None_

### `__getitem__`

Overrides the `__getitem__` Python special method. Returns the value associated with the given key from 
the `__config` dict.

##### args:

- `key` (str): The key of the value to retrieve.

##### returns:

- The value associated with the given key. (Any)

### `get`

Returns the value associated with the given key from the `__config` dict or the default value if the key is not found.

##### args:

- `key` (str): The key of the value to retrieve.
- `default` (Any): The default value to return if the key is not found. Defaults to _None_.

##### returns:

- The value associated with the given key or the default value if the key is not found. (Any)

### `get_ipfs_endpoint`

Returns the `ipfs_endpoint` field value from the `__config` dict.

##### returns:

- The IPFS endpoint. (str)

