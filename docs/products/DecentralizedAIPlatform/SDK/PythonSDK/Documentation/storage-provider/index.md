## module: sdk.storage_provider.storage_provider

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/storage_provider/storage_provider.py) to GitHub

Entities:
1. [StorageProvider](#class-storageprovider)
   - [\_\_init\_\_](#init)
   - [fetch_org_metadata](#fetch-org-metadata)
   - [fetch_service_metadata](#fetch-service-metadata)
   - [enhance_service_metadata](#enhance-service-metadata)
   - [fetch_and_extract_proto](#fetch-and-extract-proto)

### Class `StorageProvider`

extends: `object`

is extended by: -

#### description

Class for extracting metadata from Storage Provider. It can be Interplanetary File System (IPFS) and 
FileCoin (Lighthouse).

#### attributes

- `registry_contract` (Contract): An instance of the `Contract` class for interacting with the Registry contract.
- `ipfs_client` (ipfshttpclient.Client): An instance of the `ipfshttpclient.Client` class for interacting with the 
InterPlanetary File System.
- `lighthouse_client` (Lighthouse): An instance of the `Lighthouse` class for interacting with the Lighthouse (FileCoin) storage provider.

#### methods

#### `__init__`

Initializes a new instance of the class.

###### args:

- `config` (Config): An instance of the `Config` class.
- `registry_contract` (Contract): The contract instance of the registry.

###### returns:

- _None_

#### `fetch_org_metadata`

Retrieves metadata for the specified organization ID from IPFS or FileCoin depends on the `metadataURI` prefix.

###### args:

- org_id (str): The ID of the organization.

###### returns:

- Metadata of a specified organization. (dict)

#### `fetch_service_metadata`

Retrieves metadata for the specified service from IPFS or FileCoin depends on the `metadataURI` prefix.

###### args:

- org_id (str): The ID of the organization.
- service_id (str): The ID of the service.

###### returns:

- Metadata of a specified service. (MPEServiceMetadata)

#### `enhance_service_metadata`

Enhances the service group details by merging them with the organization group details.

###### args:

- org_id (str): The ID of the organization.
- service_id (str): The ID of the service.

###### returns:

- Enhanced metadata of a specified service. (MPEServiceMetadata)

#### `fetch_and_extract_proto`

Retrieves archive with .proto files from IPFS or FileCoin depends on the `service_api_source` prefix and extracts 
it using `safe_extract_proto` function from `utils` module.

###### args:

- `service_api_source` (str): The hash link to the .proto files od the service with the prefix ('filecoin://' or 'ipfs://').
- `protodir` (str): The directory where the .proto files are saved

###### returns:

- _None_

