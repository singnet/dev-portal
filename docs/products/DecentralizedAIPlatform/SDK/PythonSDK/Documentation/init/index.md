# module: sdk.\_\_init\_\_

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/__init__.py) to GitHub

## Entities:
1. [PaymentStrategyType](#class-paymentstrategytype)
2. [SnetSDK](#class-snetsdk)
   - [\_\_init\_\_](#__init__)
   - [create_service_client](#create_service_client)
   - [get_service_stub](#get_service_stub)
   - [get_module_by_keyword](#get_module_by_keyword)
   - [get_service_metadata](#get_service_metadata)
   - [_get_first_group](#_get_first_group)
   - [_get_group_by_group_name](#_get_group_by_group_name)
   - [_get_service_group_details](#_get_service_group_details)
   - [get_organization_list](#get_organization_list)
   - [get_services_list](#get_services_list)

## Class `PaymentStrategyType`

extends: `Enum`

is extended by: -

### description

This is an `enum` that represents the available payment strategies. It is used to determine which payment 
strategy to use when initializing the SDK.

### members

- `DEFAULT`
- `FREE_CALL`
- `PAID_CALL`
- `PREPAID_CALL`

## Class `SnetSDK`

extends: -

is extended by: -

### description

The SnetSDK class is the main entry point for interacting with the SingularityNET platform.
It provides methods for creating service clients, managing identities, and configuring the SDK.

### attributes

- `_sdk_config` (Config): An instance of the `Config` class.
- `_metadata_provider` (StorageProvider): An instance of the `StorageProvider` class for fetching metadata and .proto files.
- `web3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.
- `registry_contract` (Contract): An instance of the `Contract` class for interacting with the Registry contract.
- `account` (Account): An instance of the `Account` class for interacting with the MultiPartyEscrow and 
SingularityNetToken contracts.
- `payment_channel_provider` (PaymentChannelProvider): An instance of the `PaymentChannelProvider` class for managing 
payment channels.

### methods

### `__init__`

Initializes a new instance of the `SnetSDK` class. Initializes `web3` with the specified Ethereum RPC endpoint.
Instantiates the MPE contract with the specified contract address if provided, otherwise uses the default MPE contract.
Instantiates the IPFS client with the specified IPFS endpoint if provided, otherwise uses the default IPFS endpoint.
Instantiates the Registry contract with the specified contract address if provided, otherwise uses the default Registry 
contract. Instantiates the Account object with the specified Web3 client, SDK configuration, and MPE contract.

##### args:

- `sdk_config` (Config): A `Config` object containing the SDK configuration.
- `metadata_provider` (MetadataProvider): A `MetadataProvider` object. Defaults to _None_.

##### returns:

- _None_

### `create_service_client`

If `force_update` is True or if there are no gRPC stubs for the given service, the proto files are loaded 
and compiled using the `generate_client_library()` method of the `ClientLibGenerator` class instance. 
It then initializes `payment_strategy` to `DefaultPaymentStrategy` if it is not specified. 
It also sets the `options` dictionary with some default values. If `self._metadata_provider` is not specified 
it is initialized by `IPFSMetadataProvider`. It also gets the service stub using the `self.get_service_stub` 
method and the pb2 module using the `self.get_module_by_keyword` method. Finally, it creates a new instance 
of the `ServiceClient` class with all the required parameters, which is then returned.

##### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.
- `group_name` (str): The name of the payment group. Defaults to _None_.
- `payment_strategy` (PaymentStrategy): The payment channel management strategy. Defaults to _None_.
- `payment_strategy_type` (PaymentStrategyType): The type of payment management strategy. 
Defaults to `PaymentStrategyType.DEFAULT`.
- `options` (dict): Additional options for the service client. Defaults to _None_.
- `concurrent_calls` (int): The number of concurrent calls allowed. Defaults to 1.

##### returns:

- The created service client instance. (ServiceClient)

### `get_service_stub`

Retrieves the gRPC service stub for the given organization and service ID.

##### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.

##### returns:

- The gRPC service stub for the given organization and service ID. (ServiceStub)

##### raises:

- Exception: If an error occurs while importing a module.

### `get_module_by_keyword`

Retrieves the module name from the given organization ID, service ID, and keyword.

##### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.
- `keyword` (str): The keyword used to search for the module.

##### returns:

- The module name extracted from the file name. (ModuleName)

### `get_service_metadata`

Retrieves metadata for a given service in a given organization using Registry first and then IPFS.

##### args:

- `org_id` (str): The ID of the organization.
- `service_id` (str): The ID of the service.

##### returns:

- The metadata for the service. (MPEServiceMetadata)

##### raises:

- Exception: If the service is not found in the specified organization.

### `_get_first_group`

Returns the first payment group from the given service metadata.

##### args:

- `service_metadata` (MPEServiceMetadata): An instance of `MPEServiceMetadata` class.

##### returns:

- The first group from the service metadata. (dict)

### `_get_group_by_group_name`

Returns a payment group from the given service metadata based on the group name.

##### args:

- `service_metadata` (MPEServiceMetadata): An instance of `MPEServiceMetadata` class.
- `group_name` (str): The name of the group to search for.

##### returns:

-  The group with the matching group name, or an empty dictionary if no match is found. (dict)

### `_get_service_group_details`

Returns a payment group from the given service metadata based on the group name or the first payment group if
group name is not specified.

##### args:

- `service_metadata` (MPEServiceMetadata): An instance of `MPEServiceMetadata` class.
- `group_name` (str): The name of the group to search for.

##### returns:

- The group with the matching group name, or the first group if name is not specified. (dict)

##### raises:

- Exception: If no groups are found for the given service.

### `get_organization_list`

Retrieves a list of organization IDs from the Registry contract.

##### returns:

- A list of strings representing the organization IDs. (list)

### `get_services_list`

Retrieves a list of service IDs for a given organization from the Registry contract.

##### args:

- `org_id` (str): The ID of the organization.

##### returns:

- A list of strings representing the service IDs. (list)

##### raises:

- Exception: If the organization with the given ID does not exist.