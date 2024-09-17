## module: sdk.client_lib_generator

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/client_lib_generator.py) to GitHub

Entities:
1. [ClientLibGenerator](#class-clientlibgenerator)
   - [\_\_init\_\_](#__init__)
   - [generate_client_library](#generate_client_library)
   - [_get_service_metadata_from_registry](#_get_service_metadata_from_registry)
   - [_get_service_registration](#_get_service_registration)

### Class `ClientLibGenerator`

extends: -

is extended by: -

#### description

This class is used to generate client library files for a given service.

#### attributes

- `sdk_config` (Config): An instance of the `Config` class
- `registry_contract` (web3.contract.Contract): An instance of the `Contract` class (from `snet.cli`) for interacting with the Registry contract.
- `org_id` (str): The organization ID of the service.
- `service_id` (str): The service ID.
- `language` (str): The language of the client library. Default is `python`.
- `protodir` (str): The directory where the .proto files are located. Default is `~/.snet`.

#### methods

#### `__init__`

Initializes a new instance of the class. Initializes the attributes by arguments values.

###### args:

- `sdk_config` (Config): An instance of the `Config` class
- `registry_contract` (web3.contract.Contract): An instance of the `Contract` class (from `snet.cli`) for interacting with the Registry contract.
- `org_id` (str): The organization ID of the service.
- `service_id` (str): The service ID.

###### returns:

- _None_

#### `generate_client_library`

Generates client library stub files based on specified organization and service ids, including:
- getting service metadata from Registry
- getting .proto file from IPFS
- compiling .proto file to stub file and saving it in a given directory

#### `_get_service_metadata_from_registry`

Retrieves service metadata. Fetches the service registration from the Registry contract, extracts the metadata URI, 
downloads the metadata from IPFS, and parses it into a `MPEServiceMetadata` object.

###### returns:

- The service metadata. (MPEServiceMetadata)

#### `_get_service_registration`

Retrieves the service registration from the Registry contract using the `getServiceRegistrationById` function of it.

###### returns:

- Dictionary containing the service registration. (dict[str, Any])

###### raises:

- `Exception`: If the service with the specified ID is not found in the organization.

