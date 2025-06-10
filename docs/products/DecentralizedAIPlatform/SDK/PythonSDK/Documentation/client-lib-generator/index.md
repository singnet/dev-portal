# module: sdk.client_lib_generator

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/client_lib_generator.py) to GitHub

## Entities:
1. [ClientLibGenerator](#class-clientlibgenerator)
   - [\_\_init\_\_](#init)
   - [generate_client_library](#generate-client-library)
   - [generate_directories_by_params](#generate-directories-by-params)
   - [create_service_client_libraries_path](#create-service-client-libraries-path)
   - [receive_proto_files](#receive-proto-files)
   - [training_added](#training-added)

## Class `ClientLibGenerator`

extends: -

is extended by: -

### description

This class is used to generate client library files for a given service.

### attributes

- `_metadata_provider` (StorageProvider): An instance of the `StorageProvider` class.
- `org_id` (str): The organization ID of the service.
- `service_id` (str): The service ID.
- `language` (str): The language of the client library. Default is `python`.
- `protodir` (str): The directory where the .proto files are located. Default is `~/.snet`.

### methods

### `__init__`

Initializes a new instance of the class. Initializes the attributes by arguments values.

##### args:

- `metadata_provider` (StorageProvider): An instance of the `StorageProvider` class.
- `org_id` (str): The organization ID of the service.
- `service_id` (str): The service ID.
- `protodir` (Path | None): The directory where the .proto files are located. Default is _None_.

##### returns:

- _None_

### `generate_client_library`

Generates client library stub files based on specified organization and service ids, including:
- getting service metadata from Registry
- getting archived proto files from IPFS or FileCoin and extracting them
- compiling .proto file to stub file and saving it in a given directory

##### returns:

- _None_

### `generate_directories_by_params`

Generates directories for client library in the `~/.snet` directory based on organization and 
service ids using the `create_service_client_libraries_path` method.

##### returns:

- _None_

### `create_service_client_libraries_path`

Creates a directory for client library in the `~/.snet` directory based on organization and 
service ids.

##### returns:

- _None_

### `receive_proto_files`

Receives .proto files from IPFS or FileCoin based on service metadata and extracts them to a 
given directory.

##### returns:

- _None_

##### raises:

- Exception: if the directory for storing proto files is not found.

### `training_added`

Checks whether training is used in the service .proto file.

##### returns:

- _True_ if training is used in the service .proto file, _False_ otherwise.