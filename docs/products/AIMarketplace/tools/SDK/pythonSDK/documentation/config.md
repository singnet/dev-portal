## module: sdk.config

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/config.py) to GitHub

Entities:
1. [Config](#class-config)
   - [\_\_init\_\_](#__init__)
   - [get_session_network_name](#get_session_network_name)
   - [safe_get_session_identity_network_names](#safe_get_session_identity_network_names)
   - [set_session_network](#set_session_network)
   - [_set_session_network](#_set_session_network)
   - [set_session_identity](#set_session_identity)
   - [get_session_field](#get_session_field)
   - [set_session_field](#set_session_field)
   - [unset_session_field](#unset_session_field)
   - [session_to_dict](#session_to_dict)
   - [add_network](#add_network)
   - [set_network_field](#set_network_field)
   - [add_identity](#add_identity)
   - [set_identity_field](#set_identity_field)
   - [_get_network_section](#_get_network_section)
   - [_get_identity_section](#_get_identity_section)
   - [get_ipfs_endpoint](#get_ipfs_endpoint)
   - [set_ipfs_endpoint](#set_ipfs_endpoint)
   - [get_all_identities_names](#get_all_identities_names)
   - [get_all_networks_names](#get_all_networks_names)
   - [delete_identity](#delete_identity)
   - [create_default_config](#create_default_config)
   - [_check_section](#_check_section)
   - [_persist](#_persist)
   - [get_param_from_sdk_config](#get_param_from_sdk_config)
   - [setup_identity](#setup_identity)
2. [first_identity_message_and_exit](#function-first_identity_message_and_exit)
3. [get_session_identity_keys](#function-get_session_identity_keys)
4. [get_session_network_keys](#function-get_session_network_keys)
5. [get_session_network_keys_removable](#function-get_session_network_keys_removable)
6. [get_session_keys](#function-get_session_keys)

### Class `Config`

extends: `ConfigParser`

is extended by: -

#### description

This is a configuration manager for the SDK. It is responsible for handling configuration settings for the SDK.

#### attributes

- `_config_file` (Path): The path to the configuration file.
- `sdk_config` (dict): The SDK configuration.
- `is_sdk` (bool): Whether the configuration is for the SDK.

#### methods

#### `__init__`

Initializes a new instance of the class. Reads the configuration file or creates a default one if it doesn't exist.
Initializes attributes by the passed arguments.

###### args:

- `_snet_folder` (Path): The path to the folder where the configuration file is located. Defaults to "~/.snet".
- `sdk_config` (dict): The SDK configuration. Defaults to _None_.

###### returns:

- _None_

#### `get_session_network_name`

Returns the name of the session network.

###### returns:

- (str): The name of the session network.

#### `safe_get_session_identity_network_names`

Returns the names of the session network and identity.

###### returns:

- The names of the session network and identity. (str, str)

###### raises:

- Exception: If the session identity does not bind to the session network.

#### `set_session_network`

Sets the session network using `_set_session_network`.

###### args:

- `network` (str): The name of the session network.
- `out_f` (TextIO): The output to write messages to.

###### returns:

- _None_

#### `_set_session_network`

Sets the session network.

###### args:

- `network` (str): The name of the session network.
- `out_f` (TextIO): The output to write messages to.

###### returns:

- _None_

###### raises:

- Exception: If the network is not in the config.

#### `set_session_identity`

Sets the session identity.

###### args:

- `identity` (str): The name of the session identity.
- `out_f` (TextIO): The output to write messages to.

###### returns:

- _None_

###### raises:

- Exception: If the identity is not in the config.

#### `get_session_field`

Retrieves a session field based on the provided key.

###### args:

- `key` (str): The key of the session field to retrieve.
- `exception_if_not_found` (bool): Whether to raise an exception if the field is not found. Defaults to _True_.

###### returns:

- The value of the session field if found, otherwise _None_. (str | None)

###### raises:

- `Exception`: If the field is not found and `exception_if_not_found` is _True_.

#### `set_session_field`

Sets a session field based on the provided key and value.

###### args:

- `key` (str): The key of the session field to set.
- `value` (str): The value of the session field to set.
- `out_f` (TextIO): The output to write messages to.

###### returns:

- _None_

###### raises:

- `Exception`: If the key is not in the config.

#### `unset_session_field`

Unsets a session field based on the provided key.

###### args:

- `key` (str): The key of the session field to unset.
- `out_f` (TextIO): The output to write messages to.

###### returns:

- _None_

#### `session_to_dict`

Converts the session configuration to a dictionary.

###### returns:

- The session configuration as a dictionary. (dict)

#### `add_network`

Adds a new network configuration to the existing config.

###### args:

- `network` (str): The name of the network to add.
- `rpc_endpoint` (str): The RPC endpoint of the network.
- `default_gas_price` (str): The default gas price of the network.

###### returns:

- _None_

###### raises:

- `Exception`: If the specified network section already exists in config.

#### `set_network_field`

Sets a network field based on the provided key and value.

###### args:

- `network` (str): The name of the network to set.
- `key` (str): The key of the network field to set.
- `value` (str): The value of the network field to set.

###### returns:

- _None_

#### `add_identity`

Adds a new identity configuration to the existing config.

###### args:

- `identity_name` (str): The name of the identity to add.
- `identity` (dict): The identity configuration.
- `out_f` (TextIO): The output to write messages to. Defaults to _sys.stdout_.

###### returns:

- _None_

###### raises:

- `Exception`: If the specified identity section already exists in config or if network of the identity is not in config.

#### `set_identity_field`

Sets an identity field based on the provided key and value.

###### args:

- `identity` (str): The name of the identity to set.
- `key` (str): The key of the identity field to set.
- `value` (str): The value of the identity field to set.

###### returns:

- _None_

#### `_get_network_section`

Returns the config section for the specified network.

###### args:

- `network` (str): The name of the network.

###### returns:

- The config section for the specified network. (dict | SectionProxy)

#### `_get_identity_section`

Returns the config section for the specified identity.

###### args:

- `identity` (str): The name of the identity.

###### returns:

- The config section for the specified identity. (dict | SectionProxy)

#### `get_ipfs_endpoint`

Returns default IPFS endpoint from config.

###### returns:

- The default IPFS endpoint. (str)

#### `set_ipfs_endpoint`

Sets default IPFS endpoint in config.

###### args:

- `ipfs_endpoint` (str): The IPFS endpoint to set.

###### returns:

- _None_

#### `get_all_identities_names`

Returns all identity names from config.

###### returns:

- The list of identity names. (list[str]) 

#### `get_all_networks_names`

Returns all network names from config.

###### returns:

- The list of network names. (list[str])

#### `delete_identity`

Deletes an identity from config.

###### args:

- `identity_name` (str): The name of the identity to delete.

###### returns:

- _None_

###### raises:

- `Exception`: If the specified identity name does not exist in config or if the specified identity name is in use.

#### `create_default_config`

Creates default configuration if config file does not exist. Determines default endpoints for each network and IPFS.
Sets identity if it is provided by sdk.

###### returns:

- _None_

#### `_check_section`

Checks if the specified section exists in config, raises an exception if it does not.

###### args:

- `s` (sts): The section name to check.

###### returns:

- _None_

###### raises:

- `Exception`: If the specified section does not exist in config.

#### `_persist`

Persists the config to disk.

###### returns:

- _None_

#### `get_param_from_sdk_config`

Returns the value of the specified parameter from the `sdk_config` dict.

###### args:

- `param` (str): The name of the parameter to get.
- `alternative` (any): The value to return if the parameter is not found in `sdk_config`. Defaults to _None_.

###### returns:

- The value of the parameter or `alternative` if the parameter is not found or _None_ if `sdk_config` is not set. (Any)

#### `setup_identity`

Sets up and returns a new identity in the config with the parameters from the `sdk_config`.

_Note_: currently, only `key` identity type is supported.

###### returns:

- The identity as a dict. (dict)

###### raises:

- Exception: If the `identity_type` is not passed in the `sdk_config`.

### Function `first_identity_message_and_exit`

Prints a message instructing the user to create their first identity and then exits the program. 
The message differs depending on whether the `is_sdk` parameter is True or False, indicating whether the function 
is being called from an SDK or not. The message lists the available identity types and how to create an identity.

###### args:

- `is_sdk` (bool): Whether the function is being called from an SDK.

###### returns:

- _None_

### Function `get_session_identity_keys`

Returns a list with the only one element "default_wallet_index".

###### returns:

- List with the only one element. (list[str])

### Function `get_session_network_keys`

Returns a list with the elements "default_gas_price", "current_registry_at", "current_multipartyescrow_at", 
"current_singularitynettoken_at" and "default_eth_rpc_endpoint".

###### returns:

- List with the elements. (list[str])

### Function `get_session_network_keys_removable`

Returns a list with the elements "default_gas_price", "current_registry_at", "current_multipartyescrow_at" and 
"current_singularitynettoken_at".

###### returns:

- List with the elements. (list[str])

### Function `get_session_keys`

Returns a list with the elements from the `get_session_identity_keys` and `get_session_network_keys` methods, plus
the "default_ipfs_endpoint".

###### returns:

- List with the elements. (list[str])

