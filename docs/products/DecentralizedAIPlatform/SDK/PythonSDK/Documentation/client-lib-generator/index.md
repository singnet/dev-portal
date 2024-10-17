## module: sdk.client_lib_generator

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/client_lib_generator.py) to GitHub

Entities:
1. [ClientLibGenerator](#class-clientlibgenerator)
   - [\_\_init\_\_](#init)
   - [generate_client_library](#generate-client-library)

### Class `ClientLibGenerator`

extends: -

is extended by: -

#### description

This class is used to generate client library files for a given service.

#### attributes

- `_metadata_provider` (StorageProvider): An instance of the `StorageProvider` class.
- `org_id` (str): The organization ID of the service.
- `service_id` (str): The service ID.
- `language` (str): The language of the client library. Default is `python`.
- `protodir` (str): The directory where the .proto files are located. Default is `~/.snet`.

#### methods

#### `__init__`

Initializes a new instance of the class. Initializes the attributes by arguments values.

###### args:

- `metadata_provider` (StorageProvider): An instance of the `StorageProvider` class.
- `org_id` (str): The organization ID of the service.
- `service_id` (str): The service ID.

###### returns:

- _None_

#### `generate_client_library`

Generates client library stub files based on specified organization and service ids, including:
- getting service metadata from Registry
- getting archived proto files from IPFS or FileCoin and extracting them
- compiling .proto file to stub file and saving it in a given directory

###### returns:

- _None_
