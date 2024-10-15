---
# Page settings
layout: default
keywords: intro concepts, FileCoin, storage provider, protobuf, publish
comments: false
title: FileCoin
description: use FileCoin as a storage
---

# FileCoin

If you want to use FileCoin as a storage instead of IPFS, this article is for you! Follow the steps in the 
[usage](#usage) section.

## Core concepts

[FileCoin](https://filecoin.io/) is a decentralized storage network that brings scalability, security, and privacy 
to decentralized storage.

We use [Lighthouse](https://www.lighthouse.storage/) which works on FileCoin. Lighthouse is a perpetual file storage 
protocol that allows you to pay once for your files and store them long-term.

On the SingularityNET platform service providers can choose which storage to use for metadata and service 
(like .proto, etc.) files. Invoking services via AI Marketplace and publishing organizations/services via 
Publisher Portal will be available in the next version of the FileCoin integration. 

## Usage

### API key

#### Generating

The Lighthouse API key is required to use FileCoin as a storage. To get it you should sign up on 
[Lighthouse](https://lighthouse.storage/), сhoose the subscription plan (optionally) that suits you and generate 
an API key. To get more information see [Lighthouse Quick Start](https://docs.lighthouse.storage/lighthouse-1/quick-start) 
or [Lighthouse creating API key](https://docs.lighthouse.storage/lighthouse-1/how-to/create-an-api-key).

> Note: Lighthouse API key is only needed to load files. It is not needed to use commands, that read files from FileCoin.

#### Setting up

To use API key in the CLI you can add it to the CLI config file as follows:

```sh
snet set filecoin_api_key <YOUR_LIGHTHOUSE_API_KEY>
```

or stop using it by running:

```sh
snet unset filecoin_api_key
```

> Note: This key is used regardless of identity.

### Publishing

#### Storage Type argument

Once you have added the API key, you can use Lighthouse to publish organization and service metadata, as well 
as service files. To select a storage type, you need to specify a new named argument `--storage` in the commands 
you already know. This argument is used in all commands related to creating a service or organization, creating 
and publishing their metadata and service files. 

#### Commands

Here is a list these commands:
- `snet organization create`
- `snet organization update-metadata`
- `snet service metadata-init`
- `snet service metadata-set-api`
- `snet service publish`
- `snet service update-metadata`

You can also select the storage type when running the `snet service metadata-init-utility` command. In addition,
to publish metadata only in FileCoin, without publishing in Registry, you can use the 
`snet service publish-in-filecoin` command.

#### Example

Here is an example of using `snet service publish` command:

```sh
> snet service publish -h
usage: snet service publish [-h] [--metadata-file METADATA_FILE] [--update-mpe-address] [--storage {ipfs,filecoin}] [--multipartyescrow-at MULTIPARTYESCROW_AT] [--registry-at REGISTRY_AT]
                            [--wallet-index WALLET_INDEX] [--yes] [--quiet | --verbose]
                            ORG_ID SERVICE_ID

positional arguments:
  ORG_ID                Id of the Organization
  SERVICE_ID            Id of service

options:
  -h, --help            show this help message and exit
  --metadata-file METADATA_FILE
                        Service metadata json file (default service_metadata.json)
  --update-mpe-address  Update mpe_address in metadata before publishing them
  --storage {ipfs,filecoin}
                        Choose storage for uploading metadata/protobuf file (defaults to 'ipfs')
  --multipartyescrow-at MULTIPARTYESCROW_AT, --mpe MULTIPARTYESCROW_AT
                        Address of MultiPartyEscrow contract, if not specified we read address from "networks"
  --registry-at REGISTRY_AT, --registry REGISTRY_AT
                        Address of Registry contract, if not specified we read address from "networks"

transaction arguments:
  --wallet-index WALLET_INDEX
                        Wallet index of account to use for signing (defaults to session.identity.default_wallet_index)
  --yes, -y             Skip interactive confirmation of transaction payload
  --quiet, -q           Quiet transaction printing
  --verbose, -v         Verbose transaction printing


> snet service publish --metadata-file service_metadata.json --storage filecoin -y <YOUR_ORGANIZATION_ID> <YOUR_SERVICE_ID>
```

As you can see from the example, there are two types of storage to choose from: `ipfs` and `filecoin`. If this 
argument is not specified, `ipfs` is used by default.

To get more information about using FileCoin use `-h` option in any command to see 
a detailed description.
