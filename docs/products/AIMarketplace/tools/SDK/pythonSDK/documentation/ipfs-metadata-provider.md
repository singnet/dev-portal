## module: sdk.metadata_provider.ipfs_metadata_provider

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/metadata_provider/metadata_provider.py) to GitHub

Entities:
1. [IPFSMetadataProvider](#class-transactionerror)
   - [\_\_init\_\_](#__init__)
   - [fetch_org_metadata](#fetch_org_metadata)
   - [fetch_service_metadata](#fetch_service_metadata)
   - [enhance_service_metadata](#enhance_service_metadata)

### Class `IPFSMetadataProvider`

extends: `object`

is extended by: -

#### description

Class for extracting metadata from Interplanetary Filesystem (IPFS).

#### attributes

- `registry_contract` (Contract): An instance of the `Contract` class (from `snet.cli`) for interacting with the Registry contract.
- `ipfs_client` (ipfshttpclient.Client): An instance of the `ipfshttpclient.Client` class for interacting with the 
InterPlanetary File System.

#### methods

#### `__init__`

Initializes a new instance of the class.

###### args:

- `ipfs_client` (ipfshttpclient.Client): The IPFS client to use for fetching metadata.
- `registry_contract` (Contract): The contract instance of the registry.

###### returns:

- _None_

#### `fetch_org_metadata`

Retrieves metadata for the specified organization ID from IPFS.

###### args:

- org_id (str): The ID of the organization.

###### returns:

- Metadata of a specified organization. (dict | OrganizationMetadata (from `snet.cli`))

#### `fetch_service_metadata`

Retrieves metadata for the specified service from the metadata provider.

###### args:

- org_id (str): The ID of the organization.
- service_id (str): The ID of the service.

###### returns:

- Metadata of a specified service. (dict | MPEServiceMetadata (from `snet.cli`))

#### `enhance_service_metadata`

Enhances the service group details by merging them with the organization group details.

###### args:

- service_metadata (dict): The metadata of the service.
- org_metadata (dict): The metadata of the organization.

###### returns:

- Metadata of a specified service. (dict | MPEServiceMetadata (from `snet.cli`))
