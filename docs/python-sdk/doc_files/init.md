---
# Page settings
layout: default
keywords: Python SDK, documentation, init module
comments: false
title: `init` module
description: full technical documentation for the snet-sdk-python

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
## module: sdk.\_\_init\_\_

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/__init__.py) to GitHub

Entities:
1. [SnetSDK](#class-snetsdk)
   - [\_\_init\_\_](#__init__)
   - [setup_config](#setup_config)
   - [set_session_identity](#set_session_identity)
   - [create_service_client](#create_service_client)
   - [get_service_stub](#get_service_stub)
   - [get_path_to_pb_files](#get_path_to_pb_files)
   - [get_module_by_keyword](#get_module_by_keyword)
   - [get_service_metadata](#get_service_metadata)
   - [_get_first_group](#_get_first_group)
   - [_get_group_by_group_name](#_get_group_by_group_name)
   - [_get_service_group_details](#_get_service_group_details)
   - [get_organization_list](#get_organization_list)
   - [get_services_list](#get_services_list)

### Class `SnetSDK`

extends: -

is extended by: -

#### description

The SnetSDK class is the main entry point for interacting with the SingularityNET platform.
It provides methods for creating service clients, managing identities, and configuring the SDK.

#### attributes

- `_sdk_config` (dict): The SDK configuration.
- `_metadata_provider` (MetadataProvider): An instance of the `MetadataProvider` class. _Note_: There is currently only 
one implementation of `MetadataProvider` which is `IPFSMetadataProvider`, so this attribute can only be initialized to 
`IPFSMetadataProvider` at this time.
- `web3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.
- `ipfs_client` (ipfshttpclient.Client): An instance of the `ipfshttpclient.Client` class for interacting with the 
InterPlanetary File System.
- `registry_contract` (Contract): An instance of the `Contract` class (from `snet.cli`) for interacting with the Registry contract.
- `account` (Account): An instance of the `Account` class for interacting with the MultiPartyEscrow and 
SingularityNetToken contracts.

#### methods

#### `__init__`

Initializes a new instance of the `SnetSDK` class. Initializes `web3` with the specified Ethereum RPC endpoint.
Instantiates the MPE contract with the specified contract address if provided, otherwise uses the default MPE contract.
Instantiates the IPFS client with the specified IPFS endpoint if provided, otherwise uses the default IPFS endpoint.
Instantiates the Registry contract with the specified contract address if provided, otherwise uses the default Registry 
contract. Instantiates the Account object with the specified Web3 client, SDK configuration, and MPE contract.
Creates an instance of the "Config" class, passing `_sdk_config` to it, and calls the `setup_config` method with this 
instance as an argument.

###### args:

- `sdk_config` (dict): A dictionary containing the SDK configuration.
- `metadata_provider` (MetadataProvider): A `MetadataProvider` object. Defaults to _None_.

###### returns:

- _None_

#### `setup_config`

Sets up the configuration for the SnetSDK instance. This function checks the network and identity_name in 
the configuration and sets up the configuration accordingly. If the network is specified, and it is different from 
the current session network, it sets the session network. If the identity_name is specified, it sets the session identity.
If there are no identities in the configuration, it checks if the identity is selected and raises an exception if not.

###### args:

- config (Config): The `snet.cli.config.Congig` instance.

###### returns:

- _None_

###### raises:

- Exception: If the identity name is not passed or selected.

#### `set_session_identity`

Sets the session identity in the given config.

###### args:

- `identity_name` (str): The name of the identity to set.
- `config` (Config): The `snet.cli.config.Congig` object to modify.
- `out_f` (TextIO): The output to write messages to.

###### returns:

- _None_

#### `create_service_client`

If `force_update` is True or if there are no gRPC stubs for the given service, the proto files are loaded 
and compiled using the `generate_client_library()` method of the `ClientLibGenerator` class instance. 
It then initializes `payment_channel_management_strategy` to `DefaultPaymentStrategy` if it is not specified. 
It also sets the `options` dictionary with some default values. If `self._metadata_provider` is not specified 
it is initialized by `IPFSMetadataProvider`. It also gets the service stub using the `self.get_service_stub` 
method and the pb2 module using the `self.get_module_by_keyword` method. Finally, it creates a new instance 
of the `ServiceClient` class with all the required parameters, which is then returned.

###### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.
- `group_name` (str): The name of the payment group. Defaults to _None_.
- `payment_channel_management_strategy` (PaymentStrategy): The payment channel management strategy. Defaults to _None_.
- `free_call_auth_token_bin` (str): The free call authentication token in binary format. Defaults to _None_.
- `free_call_token_expiry_block` (int): The block number when the free call token expires. Defaults to _None_.
- `options` (dict): Additional options for the service client. Defaults to _None_.
- `concurrent_calls` (int): The number of concurrent calls allowed. Defaults to 1.

###### returns:

- The created service client instance. (ServiceClient)

#### `get_service_stub`

Retrieves the gRPC service stub for the given organization and service ID.

###### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.

###### returns:

- The gRPC service stub for the given organization and service ID. (ServiceStub)

###### raises:

- Exception: If an error occurs while importing a module.

#### `get_path_to_pb_files`

Returns the path to the directory containing the protobuf files for a given organization and service.

###### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.

###### returns:

- The path to the directory containing the protobuf files. (str)

#### `get_module_by_keyword`

Retrieves the module name from the given organization ID, service ID, and keyword.

###### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.
- `keyword` (str): The keyword used to search for the module.

###### returns:

- The module name extracted from the file name. (ModuleName)

#### `get_service_metadata`

Retrieves metadata for a given service in a given organization using Registry first and then IPFS.

###### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.

###### returns:

- The metadata for the service. (MPEServiceMetadata)

###### raises:

- Exception: If the service is not found in the specified organization.

#### `_get_first_group`

Returns the first payment group from the given service metadata.

###### args:

- `service_metadata` (MPEServiceMetadata): An instance of `MPEServiceMetadata` class.

###### returns:

- The first group from the service metadata. (dict)

#### `_get_group_by_group_name`

Returns a payment group from the given service metadata based on the group name.

###### args:

- `service_metadata` (MPEServiceMetadata): An instance of `MPEServiceMetadata` class.
- `group_name` (str): The name of the group to search for.

###### returns:

-  The group with the matching group name, or an empty dictionary if no match is found. (dict)

#### `_get_service_group_details`

Returns a payment group from the given service metadata based on the group name or the first payment group if
group name is not specified.

###### args:

- `service_metadata` (MPEServiceMetadata): An instance of `MPEServiceMetadata` class.
- `group_name` (str): The name of the group to search for.

###### returns:

- The group with the matching group name, or the first group if name is not specified. (dict)

###### raises:

- Exception: If no groups are found for the given service.

#### `get_organization_list`

Retrieves a list of organization IDs from the Registry contract.

###### returns:

- A list of strings representing the organization IDs. (list)

#### `get_services_list`

Retrieves a list of service IDs for a given organization from the Registry contract.

###### args:

- `org_id` (str): The ID of the organization.

###### returns:

- A list of strings representing the service IDs. (list)

###### raises:

- Exception: If the organization with the given ID does not exist.
