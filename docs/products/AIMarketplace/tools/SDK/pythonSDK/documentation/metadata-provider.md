## module: sdk.metadata_provider.metadata_provider

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/metadata_provider/metadata_provider.py) to GitHub

Entities:
1. [MetadataProvider](#abstract-class-metadataprovider)
   - [fetch_org_metadata](#fetch_org_metadata)
   - [fetch_service_metadata](#fetch_service_metadata)
   - [enhance_service_group_details](#enhance_service_group_details)

### Abstract Class `MetadataProvider`

extends: `object`

is extended by: -

#### description

Abstract class for retrieving metadata from a metadata provider.

#### methods

#### abstract `fetch_org_metadata`

Retrieves metadata for the specified organization ID from the metadata provider.

###### args:

- org_id (str): The ID of the organization.

###### returns:

- Metadata of a specified organization. (dict | OrganizationMetadata (from `snet.cli`))

#### abstract `fetch_service_metadata`

Retrieves metadata for the specified service from the metadata provider.

###### args:

- org_id (str): The ID of the organization.
- service_id (str): The ID of the service.

###### returns:

- Metadata of a specified service. (dict | MPEServiceMetadata (from `snet.cli`))

#### abstract `enhance_service_group_details`

Enhances the service group details by merging them with the organization group details.

###### args:

- service_metadata (dict): The metadata of the service.
- org_metadata (dict): The metadata of the organization.

###### returns:

- Metadata of a specified service. (dict | MPEServiceMetadata (from `snet.cli`))
