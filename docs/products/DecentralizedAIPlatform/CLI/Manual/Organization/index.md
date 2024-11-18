# Organization

```sh
usage: snet organization [-h] COMMAND ...
```

## Commands

## metadata-init

Initialize metadata for organization

```sh
snet organization metadata-init [-h]
                                [--registry-at REGISTRY_AT]
                                [--metadata-file METADATA_FILE] ORG_NAME ORG_ID ORG_TYPE
```

#### Positional Arguments

`ORG_NAME`

    

Organization name

`ORG_ID`

    

Unique organization Id

`ORG_TYPE`

    

Possible choices: individual, organization

organization type based on creator of organization whether it is individual or business/organization [ individual | organization ]

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--metadata-file`

    

Organization metadata json file (default organization_metadata.json)

Default: `'organization_metadata.json'`

## print-metadata

Print metadata for given organization

```sh
snet organization print-metadata [-h] org_id
```

#### Positional Arguments

`org_id`

    

Organization Id

## add-group

Add group to organization

```sh
snet organization add-group [-h]
                            [--payment-expiration-threshold PAYMENT_EXPIRATION_THRESHOLD]
                            [--payment-channel-storage-type PAYMENT_CHANNEL_STORAGE_TYPE]
                            [--payment-channel-connection-timeout PAYMENT_CHANNEL_CONNECTION_TIMEOUT]
                            [--payment-channel-request-timeout PAYMENT_CHANNEL_REQUEST_TIMEOUT]
                            [--metadata-file METADATA_FILE]
                            [--registry- at REGISTRY_AT] group_name payment_address [endpoints ...]
```

#### Positional Arguments

`group_name`

    

Group Name

`payment_address`

    

Payment address

`endpoints`

    

Endpoints for the first group

#### Named Arguments

`--payment-expiration-threshold`

    

Payment Expiration threshold

Default: `100`

`--payment-channel-storage-type`

    

Storage channel for payment

Default: `'etcd'`

`--payment-channel-connection-timeout`

    

Payment channel connection timeout

Default: `'7s'`

`--payment-channel-request-timeout`

    

Payment channel request timeout

Default: `'5s'`

`--metadata-file`

    

Organization metadata json file (default organization_metadata.json)

Default: `'organization_metadata.json'`

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

## update-group

Update group of organization

```sh
snet organization update-group [-h]
                               [--payment-address PAYMENT_ADDRESS]
                               [--endpoints [ENDPOINTS ...]]
                               [--payment-expiration-threshold PAYMENT_EXPIRATION_THRESHOLD]
                               [--payment-channel-storage-type PAYMENT_CHANNEL_STORAGE_TYPE]
                               [--payment-channel-connection-timeout PAYMENT_CHANNEL_CONNECTION_TIMEOUT]
                               [--payment-channel-request-timeout PAYMENT_CHANNEL_REQUEST_TIMEOUT]
                               [--metadata-file METADATA_FILE]
                               [--registry- at REGISTRY_AT] group_id
```

#### Positional Arguments

`group_id`

    

Group Id

#### Named Arguments

`--payment-address`

    

Payment Address

`--endpoints`

    

Endpoints for the first group

`--payment-expiration-threshold`

    

Payment Expiration threshold

`--payment-channel-storage-type`

    

Payment Channel Storage Type

`--payment-channel-connection-timeout`

    

Payment Channel Connection timeout

`--payment-channel-request-timeout`

    

Payment channel Request timeout

`--metadata-file`

    

Organization metadata json file (default organization_metadata.json)

Default: `'organization_metadata.json'`

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

## metadata-add-description

Add description to metadata

```sh
snet organization metadata-add-description [-h]
                                           [--description DESCRIPTION]
                                           [--short-description SHORT_DESCRIPTION]
                                           [--url URL]
                                           [--metadata- file METADATA_FILE]
```

#### Named Arguments

`--description`

    

description about organization info

`--short-description`

    

description about organization info

`--url`

    

url for organization website

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

## metadata-add-assets

Add assets to metadata, valid asset types are [hero_image]

```sh
snet organization metadata-add-assets [-h]
                                      [--metadata-file METADATA_FILE] ASSET_FILE_PATH ASSET_TYPE
```

#### Positional Arguments

`ASSET_FILE_PATH`

    

Asset file path

`ASSET_TYPE`

    

Type of the asset, valid asset types are [hero_image]

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

## metadata-remove-assets

Remove asset of a given type valid asset types are [hero_image]

```sh
snet organization metadata-remove-assets [-h]
                                         [--metadata-file METADATA_FILE] ASSET_TYPE
```

#### Positional Arguments

`ASSET_TYPE`

    

Type of the asset to be removed, valid asset types are [hero_image]

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

## metadata-remove-all-assets

Remove all assets from metadata

```sh
snet organization metadata-remove-all-assets [-h]
                                             [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

## metadata-add-contact

Add contact in organization metadata

```sh
snet organization metadata-add-contact [-h]
                                       [--phone PHONE]
                                       [--email EMAIL]
                                       [--metadata-file METADATA_FILE] contact_type
```

#### Positional Arguments

`contact_type`

    

Contact type of organization

#### Named Arguments

`--phone`

    

Phone number for contact with country code

`--email`

    

Email ID for contact

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

## metadata-remove-all-contacts

Remove all contacts

```sh
snet organization metadata-remove-all-contacts [-h]
                                               [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

## metadata-remove-contacts

Remove all contacts

```sh
snet organization metadata-remove-contacts [-h]
                                           [--metadata-file METADATA_FILE] CONTACT_TYPE
```

#### Positional Arguments

`CONTACT_TYPE`

    

Contact type of organization

#### Named Arguments

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

## list

List of Organizations Ids

```sh
snet organization list [-h]
                       [--registry-at REGISTRY_ADDRESS]
                       [--wallet- index WALLET_INDEX]
```

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## list-org-names

List Organizations Names and Ids

```sh
snet organization list-org-names [-h]
                                 [--registry-at REGISTRY_ADDRESS]
                                 [--wallet-index WALLET_INDEX]
```

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## list-my

Print organization which has the current identity as the owner or as a member

```sh
snet organization list-my [-h]
                          [--registry-at REGISTRY_ADDRESS]
                          [--wallet-index WALLET_INDEX]
```

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## list-services

List Organization’s services

```sh
snet organization list-services [-h]
                                [--registry-at REGISTRY_ADDRESS]
                                [--wallet-index WALLET_INDEX] ORG_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## info

Organization’s Information

```sh
snet organization info [-h]
                       [--registry-at REGISTRY_ADDRESS]
                       [--wallet- index WALLET_INDEX] ORG_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## create

Create an Organization

```sh
snet organization create [-h]
                         [--metadata-file METADATA_FILE]
                         [--members ORG_MEMBERS]
                         [--wallet-index WALLET_INDEX]
                         [--yes]
                         [--quiet | --verbose]
                         [--registry-at REGISTRY_ADDRESS]
                         [--storage {ipfs,filecoin}] ORG_ID
```

#### Positional Arguments

`ORG_ID`

    

Unique Organization Id

#### Named Arguments

`--metadata-file`

    

Organization metadata json file (default organization_metadata.json)

Default: `'organization_metadata.json'`

`--members`

    

List of members to be added to the organization

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

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

## update-metadata

Update metadata for an Organization

```sh
snet organization update-metadata [-h]
                                  [--metadata-file METADATA_FILE]
                                  [--members ORG_MEMBERS]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
                                  [--registry-at REGISTRY_ADDRESS]
                                  [--storage {ipfs,filecoin}] ORG_ID
```

#### Positional Arguments

`ORG_ID`

    

Unique Organization Id

#### Named Arguments

`--metadata-file`

    

Organization metadata json file (default organization_metadata.json)

Default: `'organization_metadata.json'`

`--members`

    

List of members to be added to the organization

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

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

## change-owner

Change Organization’s owner

```sh
snet organization change-owner [-h]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose]
                               [--registry-at REGISTRY_ADDRESS] ORG_ID OWNER_ADDRESS
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`OWNER_ADDRESS`

    

Address of the new Organization’s owner

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

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

## add-members

Add members to Organization

```sh
snet organization add-members [-h]
                              [--wallet-index WALLET_INDEX]
                              [--yes]
                              [--quiet | --verbose]
                              [--registry-at REGISTRY_ADDRESS] ORG_ID ORG_MEMBERS
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`ORG_MEMBERS[]`

    

List of members to be added to the organization

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

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

## rem-members

Remove members from Organization

```sh
snet organization rem-members [-h]
                              [--wallet-index WALLET_INDEX]
                              [--yes]
                              [--quiet | --verbose]
                              [--registry-at REGISTRY_ADDRESS] ORG_ID ORG_MEMBERS
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`ORG_MEMBERS[]`

    

List of members to be removed from the organization

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

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

## delete

Delete an Organization

```sh
snet organization delete [-h]
                         [--wallet-index WALLET_INDEX]
                         [--yes]
                         [--quiet | --verbose]
                         [--registry-at REGISTRY_ADDRESS] ORG_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

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

#### contract identity arguments

`--registry-at`

    

registry contract address (defaults to session.current_registry_at)

## validate-metadata

Validates if created metadata is consistent

```sh
snet organization validate-metadata [-h]
                                    [--metadata-file METADATA_FILE]
```

#### Named Arguments

`--metadata-file`

    

Organization metadata json file (default organization_metadata.json)

Default: `'organization_metadata.json'`

