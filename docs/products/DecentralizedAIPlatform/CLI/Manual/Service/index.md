# Service

```sh
usage: snet service [-h] COMMAND ...
```

## Commands

## metadata-init-utility

Utility to create service metadata file

```sh
snet service metadata-init-utility [-h]
                                   [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-init

Init metadata file with providing protobuf directory (which we publish in IPFS
or FileCoin) and display_name (optionally encoding, service_type and
payment_expiration_threshold)

```sh
snet service metadata-init [-h]
                           [--metadata-file METADATA_FILE]
                           [--multipartyescrow-at MULTIPARTYESCROW_AT]
                           [--group-name GROUP_NAME]
                           [--endpoints [ENDPOINTS ...]]
                           [--fixed-price FIXED_PRICE]
                           [--encoding {proto,json}]
                           [--service-type {grpc,http,jsonrpc,process}]
                           [--storage {ipfs,filecoin}] PROTO_DIR DISPLAY_NAME
```

#### Positional Arguments

`PROTO_DIR`

    

Directory which contains protobuf files

`DISPLAY_NAME`

    

Service display name

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--group-name`

    

Name of the first payment group

`--endpoints`

    

Endpoints for the first group

Default: `[]`

`--fixed-price`

    

Set fixed price in AGIX token for all methods

`--encoding`

    

Possible choices: proto, json

Service encoding

Default: `'proto'`

`--service-type`

    

Possible choices: grpc, http, jsonrpc, process

Service type

Default: `'grpc'`

`--storage`

    

Possible choices: ipfs, filecoin

Choose storage for uploading metadata/protobuf file (defaults to ‘ipfs’)

Default: `'ipfs'`

## metadata-set-api

Publish protobuf model in ipfs or filecoin and update existed metadata file

```sh
snet service metadata-set-api [-h]
                              [--metadata-file METADATA_FILE]
                              [--storage {ipfs,filecoin}] PROTO_DIR
```

#### Positional Arguments

`PROTO_DIR`

    

Directory which contains protobuf files

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

`--storage`

    

Possible choices: ipfs, filecoin

Choose storage for uploading metadata/protobuf file (defaults to ‘ipfs’)

Default: `'ipfs'`

## metadata-set-fixed-price

Set pricing model as fixed price for all methods

```sh
snet service metadata-set-fixed-price [-h]
                                      [--metadata-file METADATA_FILE] group_name PRICE
```

#### Positional Arguments

`group_name`

    

group name for fixed price method

`PRICE`

    

Set fixed price in AGIX token for all methods

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-set-method-price

Set pricing model as method price for all methods

```sh
snet service metadata-set-method-price [-h]
                                       [--metadata-file METADATA_FILE] group_name package_name service_name method PRICE
```

#### Positional Arguments

`group_name`

    

group name

`package_name`

    

package name

`service_name`

    

service name

`method`

    

method for which price need to be set

`PRICE`

    

Set fixed price in AGIX token for all methods

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-add-group

Add new group of replicas

```sh
snet service metadata-add-group [-h]
                                [--metadata-file METADATA_FILE] GROUP_NAME
```

#### Positional Arguments

`GROUP_NAME`

    

Name of the payment group

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-group

remove group from service

```sh
snet service metadata-remove-group [-h]
                                   [--metadata-file METADATA_FILE] GROUP_NAME
```

#### Positional Arguments

`GROUP_NAME`

    

Name of the payment group

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-add-daemon-addresses

add Ethereum public addresses of daemon in given payment group of service

```sh
snet service metadata-add-daemon-addresses [-h]
                                           [--metadata-file METADATA_FILE] group_name DAEMON ADDRESSES [DAEMON ADDRESSES ...]
```

#### Positional Arguments

`group_name`

    

Name of the payment group to which we want to add daemon addresses

`DAEMON ADDRESSES`

    

Ethereum public addresses of daemon

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-all-daemon-addresses

Remove all daemon addresses from metadata

```sh
snet service metadata-remove-all-daemon-addresses [-h]
                                                  [--metadata-file METADATA_FILE] group_name
```

#### Positional Arguments

`group_name`

    

Name of the payment group to which we want to remove endpoints

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-update-daemon-addresses

Update daemon addresses to the groups

```sh
snet service metadata-update-daemon-addresses [-h]
                                              [--metadata-file METADATA_FILE] group_name DAEMON ADDRESSES [DAEMON ADDRESSES ...]
```

#### Positional Arguments

`group_name`

    

Name of the payment group to which we want to update daemon addresses

`DAEMON ADDRESSES`

    

Daemon addresses

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-add-endpoints

Add daemon endpoints to the groups

```sh
snet service metadata-add-endpoints [-h]
                                    [--metadata-file METADATA_FILE] group_name ENDPOINTS [ENDPOINTS ...]
```

#### Positional Arguments

`group_name`

    

Name of the payment group to which we want to add endpoints

`ENDPOINTS`

    

Endpoints

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-all-endpoints

Remove all endpoints from metadata

```sh
snet service metadata-remove-all-endpoints [-h]
                                           [--metadata-file METADATA_FILE] group_name
```

#### Positional Arguments

`group_name`

    

Name of the payment group to which we want to remove endpoints

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-set-free-calls

Set free calls for group for service

```sh
snet service metadata-set-free-calls [-h]
                                     [--metadata-file METADATA_FILE] GROUP_NAME free_calls
```

#### Positional Arguments

`GROUP_NAME`

    

Name of the payment group to which we want to set freecalls

`free_calls`

    

Number of free calls

Default: `0`

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-set-freecall-signer-address

Set free calls for group for service

```sh
snet service metadata-set-freecall-signer-address [-h]
                                                  [--metadata-file METADATA_FILE] GROUP_NAME signer_address
```

#### Positional Arguments

`GROUP_NAME`

    

Name of the payment group to which we want to set freecalls

`signer_address`

    

This is used to define the public key address used for validating signatures
requested specially for free call. To be obtained as part of curation process

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-add-assets

Add assets to metadata, valid asset types are [hero_image,images]

```sh
snet service metadata-add-assets [-h]
                                 [--metadata-file METADATA_FILE] asset_file_path asset_type
```

#### Positional Arguments

`asset_file_path`

    

Asset file path

`asset_type`

    

Type of the asset

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-assets

Remove asset of a given type valid asset types are [hero_image,images]

```sh
snet service metadata-remove-assets [-h]
                                    [--metadata-file METADATA_FILE] asset_type
```

#### Positional Arguments

`asset_type`

    

Type of the asset to be removed , valid asset types are [hero_image,images]

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-all-assets

Remove all assets from metadata

```sh
snet service metadata-remove-all-assets [-h]
                                        [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-add-media

Add media to metadata

```sh
snet service metadata-add-media [-h]
                                [--hero_image]
                                [--metadata-file METADATA_FILE] MEDIA_URL
```

#### Positional Arguments

`MEDIA_URL`

    

Media url endpoint

#### Named Arguments

`--hero_image`

    

Indicate whether hero-image (default False)

Default: `False`

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-media

Remove media of asset type

```sh
snet service metadata-remove-media [-h]
                                   [--metadata-file METADATA_FILE] ORDER
```

#### Positional Arguments

`ORDER`

    

Delete by order of media

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-all-media

Remove all existing media

```sh
snet service metadata-remove-all-media [-h]
                                       [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-swap-media-order

Swap media order

```sh
snet service metadata-swap-media-order [-h]
                                       [--metadata-file METADATA_FILE] FROM TO
```

#### Positional Arguments

`FROM`

    

Order number to swap from

`TO`

    

Order number to swap to

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-change-media-order

Reassign all individual media order

```sh
snet service metadata-change-media-order [-h]
                                         [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-update-endpoints

Remove all endpoints from the group and add new ones

```sh
snet service metadata-update-endpoints [-h]
                                       [--metadata-file METADATA_FILE] group_name endpoints [endpoints ...]
```

#### Positional Arguments

`group_name`

    

Name of the payment group to which we want to update endpoints

`endpoints`

    

Endpoints

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-add-description

Add service description

```sh
snet service metadata-add-description [-h]
                                      [--json JSON]
                                      [--url URL]
                                      [--description DESCRIPTION]
                                      [--short-description SHORT_DESCRIPTION]
                                      [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--json`

    

Service description in json

`--url`

    

URL to provide more details of the service

`--description`

    

Some description of what the service does

`--short-description`

    

Some short description for overview

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-add-contributor

Add contributor

```sh
snet service metadata-add-contributor [-h]
                                      [--metadata-file METADATA_FILE] name email_id
```

#### Positional Arguments

`name`

    

Name of the contributor

`email_id`

    

Email of the contributor

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-contributor

Add contributor

```sh
snet service metadata-remove-contributor [-h]
                                         [--metadata-file METADATA_FILE] email_id
```

#### Positional Arguments

`email_id`

    

Email of the contributor

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## validate-metadata

Validates if created metadata is consistent

```sh
snet service validate-metadata [-h]
                               [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## publish

Publish service with given metadata

```sh
snet service publish [-h]
                     [--metadata-file METADATA_FILE]
                     [--update-mpe-address]
                     [--multipartyescrow-at MULTIPARTYESCROW_AT]
                     [--registry-at REGISTRY_AT]
                     [--wallet-index WALLET_INDEX]
                     [--yes]
                     [--quiet | --verbose]
                     [--storage {ipfs,filecoin}] ORG_ID SERVICE_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

`--update-mpe-address`

    

Update mpe_address in metadata before publishing them

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--storage`

    

Possible choices: ipfs, filecoin

Choose storage for uploading metadata/protobuf file (defaults to ‘ipfs’)

Default: `'ipfs'`

#### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## publish-in-ipfs

Publish metadata only in IPFS, without publishing in Registry

```sh
snet service publish-in-ipfs [-h]
                             [--metadata-file METADATA_FILE]
                             [--update-mpe-address]
                             [--multipartyescrow-at MULTIPARTYESCROW_AT]
                             [--wallet-index WALLET_INDEX]
                             [--yes]
                             [--quiet | --verbose]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

`--update-mpe-address`

    

Update mpe_address in metadata before publishing them

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

#### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## publish-in-filecoin

Publish metadata only in FileCoin, without publishing in Registry

```sh
snet service publish-in-filecoin [-h]
                                 [--metadata-file METADATA_FILE]
                                 [--update-mpe-address]
                                 [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                 [--wallet-index WALLET_INDEX]
                                 [--yes]
                                 [--quiet | --verbose]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

`--update-mpe-address`

    

Update mpe_address in metadata before publishing them

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

#### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## update-metadata

Publish metadata in IPFS or FileCoin and update existed service

```sh
snet service update-metadata [-h]
                             [--metadata-file METADATA_FILE]
                             [--update-mpe-address]
                             [--multipartyescrow-at MULTIPARTYESCROW_AT]
                             [--registry-at REGISTRY_AT]
                             [--wallet-index WALLET_INDEX]
                             [--yes]
                             [--quiet | --verbose]
                             [--storage {ipfs,filecoin}] ORG_ID SERVICE_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

`--update-mpe-address`

    

Update mpe_address in metadata before publishing them

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--storage`

    

Possible choices: ipfs, filecoin

Choose storage for uploading metadata/protobuf file (defaults to ‘ipfs’)

Default: `'ipfs'`

#### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## update-add-tags

Add tags to existed service registration

```sh
snet service update-add-tags [-h]
                             [--registry-at REGISTRY_AT]
                             [--wallet-index WALLET_INDEX]
                             [--yes]
                             [--quiet | --verbose] ORG_ID SERVICE_ID TAGS [TAGS ...]
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

`TAGS`

    

Tags which will be add

Default: `[]`

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

#### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## update-remove-tags

Remove tags from existed service registration

```sh
snet service update-remove-tags [-h]
                                [--registry-at REGISTRY_AT]
                                [--wallet-index WALLET_INDEX]
                                [--yes]
                                [--quiet | --verbose] ORG_ID SERVICE_ID TAGS [TAGS ...]
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

`TAGS`

    

Tags which will be removed

Default: `[]`

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

#### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## print-metadata

Print service metadata from registry

```sh
snet service print-metadata [-h]
                            [--registry-at REGISTRY_AT] ORG_ID SERVICE_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

## metadata-add-tags

Add new tags to service

```sh
snet service metadata-add-tags [-h]
                               [--metadata-file METADATA_FILE] TAGS [TAGS ...]
```

#### Positional Arguments

`TAGS`

    

Tags to add

Default: `[]`

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## metadata-remove-tags

Remove tags from service

```sh
snet service metadata-remove-tags [-h]
                                  [--metadata-file METADATA_FILE] TAGS [TAGS ...]
```

#### Positional Arguments

`TAGS`

    

Tags to removed

Default: `[]`

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## print-service-status

Print service status

```sh
snet service print-service-status [-h]
                                  [--registry-at REGISTRY_AT]
                                  [--group-name GROUP_NAME] ORG_ID SERVICE_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--group-name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

## print-tags

Print tags for given service from registry

```sh
snet service print-tags [-h]
                        [--registry-at REGISTRY_AT] ORG_ID SERVICE_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

## get-api-metadata

Extract service api (model) to the given protodir. Get existed metadata

```sh
snet service get-api-metadata [-h]
                              [--metadata-file METADATA_FILE] PROTO_DIR
```

#### Positional Arguments

`PROTO_DIR`

    

Directory to which extract api (model)

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'service_metadata.json'`

## get-api-registry

Extract service api (model) to the given protodir. Get metadata from registry

```sh
snet service get-api-registry [-h]
                              [--registry-at REGISTRY_AT] ORG_ID SERVICE_ID PROTO_DIR
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

`PROTO_DIR`

    

Directory to which extract api (model)

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

## delete

Delete service registration from registry

```sh
snet service delete [-h]
                    [--registry-at REGISTRY_AT]
                    [--wallet-index WALLET_INDEX]
                    [--yes]
                    [--quiet | --verbose] ORG_ID SERVICE_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

#### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

