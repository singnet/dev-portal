# SNET SDK protocol

SingularityNET Platform SDK goals to provide a convenient programming interface for the application developers
who want to use variety of AI models in their applications or even provide this capability to their users.

SDK protocol describes the structure, entities and functionality for the SingularityNET Platform SDK 
regardless of the implementation language.

Specific implementation of the SingularityNET Platform SDK may differ in its internal structure and entities
but must maintain compatibility of all SDK interfaces with corresponding essential platform components.

## Contents

- [User flow](#user-flow)
- [Structure](#structure)
- [Entities](#entities)
- [Interfaces](#interfaces)

## User Flow

> Note: This section includes mandatory requirements for implementation.

This is a general scenario for an SDK user.

#### Preparatory actions

1. creating a `Config`'s instance with the required values
2. creating a `SNETEngine`'s instance with the config passed to it
3. adding new account (wallet) (`Account`) to the engine by calling `SNETEngine`'s method 
(not necessary, but most likely will be needed)  
4. creating new `ServiceClient`'s instance by calling `SNETEngine`'s method 
(not necessary, but most likely will be needed).

Now the SDK functionality is available through instances of the entities `SNETEngine` 
and `ServiceClient`.

#### ServiceClient functionality

1. ServiceClient → call
2. ServiceClient → PaymentChannel → functions of the MPE contract for the channel 
(e.g. `add funds`, `extend expiraton`)
3. ServiceClient → ServiceMetadata → functions for editing service metadata, as well as 
for publishing metadata to metadata provider, and downloading metadata from it

#### SNETEngine functionality

1. SNETEngine → Channels → functions of the MPE contract for the set of channels 
(e.g. `open channel`, `load channels`)
2. SNETEngine → MPEContract → functions of the MPE contract for the account 
(e.g. `claim`, `deposit`) (in fact, MPEContract contains all the functionality of MPE, 
but access to other functions is more convenient in other ways (through other entities))
3. SNETEngine → RegistryContract → functions of the Registry contract for 
services and organizations
4. SNETEngine → MetadataProvider → OrgMetadata → functions for editing organization metadata, 
as well as for publishing metadata to metadata provider, and downloading metadata from it

<ImageViewer
    src='/assets/images/products/SDK/UseCase.png'
    alt='Use Case'
/>

## Structure

> Note: The presented structure is just one possible implementation. It doesn't have to be followed in its entirety, but it's worth using as an example.

<ImageViewer
    src='/assets/images/products/SDK/ClassDiagram.png'
    alt='Use Case'
/>

All entities can be divided into 4 layers:
1. `Config Layer` contains entities with many fields, that are needed to configure SDK.
2. At `Interface Layer` there are entities through which users have access to `Functional Layer`.
3. `Functional Layer` contains in its entities all the functionality of the SDK that users may need.
4. `Tools Layer` contains entities with various auxiliary functionality 
required for the operation of the functional level.

## Entities

> Note: The presented structure and entities is just one possible implementation. It doesn't have to be followed in its entirety, but it's worth using as an example.

- [Config Layer](#config-layer)
  1. [Account](#account)
  2. [EthAccount](#ethaccount)
  3. [Config](#config)
- [Interface Layer](#interface-layer)
  1. [SNETEngine](#snetengine)
  2. [ServiceClient](#serviceclient)
  3. [ServiceClientByGRPC](#serviceclientbygrpc)
- [Functional Layer](#functional-layer)
  1. [Contract](#contract)
  2. [EthContract](#ethcontract)
  3. [MPEContract](#mpecontract)
  4. [RegistryContract](#registrycontract)
  5. [MetadataProvider](#metadataprovider)
  6. [IPFSMetadataProvider](#ipfsmetadataprovider)
  7. [PaymentChannel](#paymentchannel)
  8. [Channels](#channels)
- [Tools Layer](#tools-layer)
  1. [GRPCLibGenerator](#grpclibgenerator)
  2. [AGIXContract](#agixcontract)
  3. [ServiceMetadata](#servicemetadata)
  4. [OrgMetadata](#orgmetadata)
  5. [TransactionHandler](#transactionhandler)
  6. [LedgerTransactionHandler](#ledgertransactionhandler)
  7. [KeyOrMnemonicTransactionHandler](#keyormnemonictransactionhandler)
  8. [PaymentStrategy](#paymentstrategy)
  9. [DefaultPaymentStrategy](#defaultpaymentstrategy)
  10. [FreeCallPaymentStrategy](#freecallpaymentstrategy)
  11. [PrepaidPaymentStrategy](#prepaidpaymentstrategy)
  12. [PaidCallPaymentStrategy](#paidcallpaymentstrategy)
  13. [ConcurrencyManager](#concurrencymanager)
  14. [Utils](#utils)

---

### Config Layer

#### Account

`Account` is an abstract entity. It's the base entity to `EthAccount` and others that are planned to be 
implemented to work with other blockchains on the SNET platform.

---

#### EthAccount

`EthAccount` implements `Account`. It is needed to identify user wallet in the Ethereum blockchain.
It contains all the fields, that need to be known for it to work correctly 
(e.g. private key, mnemonic phrase, wallet address etc.). 
Its instance is created using a name, account type (key, mnemonic or ledger) 
and corresponding secret, the remaining fields are initialized automatically by Web3 by default. 
Contains almost no logic, only account data.

##### data

- name
- address
- account type
- private key (optional)
- mnemonic phrase (optional)
- index (optional)
- nonce

##### functionality

- address determination by key/mnemonic/ledger by using Web3
- updating the nonce value and comparison it with the value received via Web3

---

#### Config

`Config` is the main configuration entity containing all the data needed to work 
in the SNET platform. It contains entry point, network name, blockchain type, smart contract 
addresses (optional) and some other options. These values are specified when creating 
an instance, which is then passed to `SNETEngine`.

##### data

- blockchain entry point
- blockchain type
- network name
- accounts (list/map)
- MPE, Registry, AGIX contracts addresses (optional)
- forced update protobuf files (bool) (optional)
- concurrency (bool) (optional)

##### functionality

- adding an account 
- getting an account

---

### Interface Layer

#### SNETEngine

`SNETEngine` is the most important entity from the user side. `Config`'s instance 
is installed in it, and new accounts and service clients are created by using it. 
`SNETEngine` creates and contains instances of almost all entities from 
`Functional Layer` (`MPEContract`, `RegistryContract`, `MetadatProvider` etc.), 
so they are accessed through it, and therefore most of the SDK functions are accessible 
from `SNETEngine`.

##### data

- `Config`'s instance
- an instance of a Web3 library entity that will be passed to all dependent entities
- `MPEContract`'s instance
- `RegistryContract`'s instance
- `AGIXContract`'s instance
- an instance of the metadata provider implementation
- `GRPCLibGenerator`'s instance
- `Channels`'s instance

##### functionality

- creating new `Account`
- creating and initializing new `Service`
- providing the user with access to `MPEContract`'s instance or to its functionality
- providing the user with access to `RegistryContract`'s instance or to its functionality
- providing the user with access to `AGIXContract`'s instance or to its functionality
- providing the user with access to metadata provider or to its functionality

---

#### ServiceClient

`Service` is an entity that allows an account to call a service and also call contracts and 
metadata provider functionality related on service. It contains the most important abstract method 
`call` for calling a service with given parameters. It's the base entity to `ServiceClientByGRPC` and 
others that are planned to be implemented to access `daemons` using other methods, such as REST API.

##### data

- organization id
- service id
- payment group
- service metadata
- payment strategy
- `Account`'s instance (it's got from the owner's entity `SNETEngine`)
- `Channels`'s instance (it's got from the owner's entity `SNETEngine`)
- `MPEContract`'s instance (it's got from the owner's entity `SNETEngine`)
- `RegistryContract`'s instance (it's got from the owner's entity `SNETEngine`)
- an instance of the metadata provider implementation (it's got from the owner's entity `SNETEngine`)
- an instance of a Web3 library entity (it's got from the owner's entity `SNETEngine`)

##### functionality

- call a service with given parameters (abstract)
- providing the user with access to `MPEContract`'s instance functionality related on channels
- providing the user with access to `RegistryContract`'s instance functionality related on services
- providing the user with access to metadata provider functionality related on service metadata
- getting service information

---

#### ServiceClientByGRPC

`ServiceClientByGRPC` extends `ServiceClient`. It allows you to call service functions by 
communicating with the `daemon` via gRPC

##### data

- grpc channel
- data needed for grpc call
- protobuf modules

##### functionality

<!--TODO: understand the remaining functionality related on grpc and finish writing it-->

- implementation of a service call with given parameters via gRPC

---

### Functional Layer

#### Contract

`Contract` is an abstract entity. It contains abstract methods to call _read_ and 
_write_ functions of smart contracts. It's the base entity to `EthContract` and others that are planned 
to be implemented to work with other blockchains on the SNET platform.

---

#### EthContract

`EthContract` implements `Contract`. It allows you to call _read_ functions and perform
transactions for calling _write_ functions of smart contracts in Ethereum. `EthContract` is the base 
entity for `MPEContract`, `RegistryContract` and `AGIXContract`.

##### data

- an instance of a Web3 library entity (it's got from the owner's entity `SNETEngine`)
- smart contract object from Web3 library
- contract address

##### functionality

- getting Web3 library contract object by name and optionally address  (using `snet.contracts` library)
- getting contract info from Web3 library contract object
- calling contract _read_ functions by name and parameters
- calling contract _write_ functions by name and parameters and execution of the entire transaction pipeline:
  - building transaction
  - signing transaction (using `TransactionHandler`)
  - sending transaction (using `TransactionHandler`)
  - processing transaction result
- getting and increasing gas price to efficiently execute a transaction on the blockchain using the 
following algorithm (in Python) 

```python
def _get_gas_price(self):
    gas_price = self.w3.eth.gas_price
    if gas_price <= 15000000000:
        gas_price += gas_price * 1 / 3
    elif 15000000000 < gas_price <= 50000000000:
        gas_price += gas_price * 1 / 5
    elif 50000000000 < gas_price <= 150000000000:
        gas_price += 7000000000
    elif gas_price > 150000000000:
        gas_price += gas_price * 1 / 10
    return int(gas_price)
```

---

#### MPEContract

`MPEContract` extends `EthContract`. It's an entity that provides all the functionality from 
[MultyPartyEscrow Contract](https://etherscan.io/address/0x5e592F9b1d303183d963635f895f0f0C48284f4e).

##### data

- `AGIXContract`'s instance (it's got from the owner's entity `SNETEngine`)

##### functionality

- calling [_read_ functions](https://etherscan.io/address/0x5e592F9b1d303183d963635f895f0f0C48284f4e#readContract):
  - balance
  - channels
- calling [_write_ functions](https://etherscan.io/address/0x5e592F9b1d303183d963635f895f0f0C48284f4e#writeContract):
  - deposit
  - openChannel
  - channelExtendAndAddFunds
  - etc.
- Using `AGIXContract` in functions where it is needed

---

#### RegistryContract

`RegistryContract` extends `EthContract`. It's an entity that provides all the functionality from 
[Registry Contract](https://etherscan.io/address/0x247DEbEBB766E4fA99667265A158060018D5f4F8).

##### functionality

- calling [_read_ functions](https://etherscan.io/address/0x247DEbEBB766E4fA99667265A158060018D5f4F8#readContract):
  - getOrganizationById
  - getServiceRegistrationById
  - etc.
- calling [_write_ functions](https://etherscan.io/address/0x247DEbEBB766E4fA99667265A158060018D5f4F8#writeContract):
  - createOrganization
  - updateServiceRegistration
  - etc.

---

#### MetadataProvider

`MetadataProvider` is an abstract entity. It allows you to keep (save and get) organization and 
service metadata (and by the way also `.proto` files). It's the base entity to `IPFSMetadataProvider` 
and others that are planned to be implemented to work with other external file storages on 
the SNET platform.

##### functionality

- getting organization metadata from external storage (abstract)
- getting service metadata from external storage (abstract)
- getting `.proto` files from external storage (abstract)
- publishing organization metadata in external storage (abstract)
- publishing service metadata in external storage (abstract)
- publishing `.proto` in from external storage (abstract)

---

#### IPFSMetadataProvider

`IPFSMetadataProvider` implements `MetadataProvider`. It allows you to work with metadata and 
`.proto` files using [Interplanetary Filesystem (IPFS)](https://ipfs.tech/).

##### data

- `RegistryContract`'s instance (it's got from the owner's entity `SNETEngine`)
- an instance of a IPFS HTTP client entity from the corresponding library
- directory for storage protobuf files

##### functionality

- implementation of parent methods for IPFS
- converting hash to URL (bytes) and back

---

#### PaymentChannel

`PaymentChannel` is an entity that stores information about an open channel and allows the functions 
provided by MPE to be performed on it.

##### data

- channel id
- an instance of a Web3 library entity (it's got from the owner's entity `Channels`)
- account
- `MPEContract`'s instance (it's got from the owner's entity `Channels`)
- channel state
<!-- TODO: Understand what proto files are needed for in resources, and here specifically 
PaymentChannelStateServiceClient -->

##### functionality

- MPE functions applied to account and channel data, such as:
  - addFunds
  - extendExpiration
  - etc.
- channel state synchronization with MPE

---

#### Channels

`Channels` is an entity that stores set of `PaymentChannel`s and allows services to interact with 
them effectively.

##### data

- channels (list/map)
- an instance of a Web3 library entity (it's got from the owner's entity `SNETEngine`)
- `MPEContract`'s instance (it's got from the owner's entity `SNETEngine`)
- MPE deployment block

##### functionality

- storing channels information (`PaymentChannel`s)
- search for channels in blockchain
- MPE functions applied to channels, such as:
  - openChannel
  - etc.

---

### Tools Layer

#### GRPCLibGenerator

`GRPCLibGenerator` is an entity needed to generate `stub` files in a specific language.

##### data

- `IPFSMetadataProvider`'s instance (it's got from the owner's entity `SNETEngine`)
- `RegistryContract`'s instance (it's got from the owner's entity `SNETEngine`)
<!-- TODO: it's needed to decide, where the generation will take place, in engine or service -->

##### functionality

- generation of `stub` files based on specified organization and service ids, including:
  - getting service metadata from Registry
  - getting `.proto` file from IPFS
  - compiling `.proto` file to `stub` file and saving it in a given directory

---

#### AGIXContract

`AGIXContract` extends `EthContract`. It's an entity that provides the functionality from 
[SingularityNET AGIX Token Contract](https://etherscan.io/address/0x5B7533812759B45C2B44C19e320ba2cD2681b542).

##### functionality

- - calling [_read_ functions](https://etherscan.io/address/0x5B7533812759B45C2B44C19e320ba2cD2681b542#readContract):
  - allowance
  - balanceOf
  - etc.
- - calling [_write_ functions](https://etherscan.io/address/0x5B7533812759B45C2B44C19e320ba2cD2681b542#writeContract):
  - approve
  - transfer
  - etc.

---

#### ServiceMetadata

`ServiceMetadata` is an entity for manipulating service metadata. It is possible that there may 
be other entities inside for complex metadata fields. Below is an example of service metadata.

```json
{
    "version": 1,
    "display_name": "Example service",
    "encoding": "proto",
    "service_type": "grpc",
    "model_ipfs_hash": "QmeyrQkEyba8dd4rc3jrLd5pEwsxHutfH2RvsSaeSMqTtQ",
    "mpe_address": "0x7E0aF8988DF45B824b2E0e0A87c6196897744970",
    "groups": [
        {
            "free_calls": 0,
            "free_call_signer_address": "0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F",
            "daemon_addresses": [
                "0x0709e9b78756b740ab0c64427f43f8305fd6d1a7"
            ],
            "pricing": [
                {
                    "default": true,
                    "price_model": "fixed_price",
                    "price_in_cogs": 1
                }
            ],
            "endpoints": [
                "http://node1.naint.tech:62400"
            ],
            "group_id": "/mb90Qs8VktxGQmU0uRu0bSlGgqeDlYrKrs+WbsOvOQ=",
            "group_name": "default_group"
        }
    ],
    "service_description": {
        "url": "https://ropsten-v2-publisher.singularitynet.io/org",
        "short_description": "Example service",
        "description": "Example service"
    },
    "media": [
        {
            "order": 1,
            "url": "https://ropsten-marketplace-service-assets.s3.us-east-1.amazonaws.com/26072b8b6a0e448180f8c0e702ab6d2f/services/d05c62bf9aa84843a195457d98417f4e/assets/20240327124952_asset.jpeg",
            "file_type": "image",
            "asset_type": "hero_image",
            "alt_text": ""
        }
    ],
    "contributors": [
        {
            "name": "test",
            "email_id": ""
        }
    ],
    "tags": [
        "exampleservice"
    ]
}
```

##### data

- map (or just fields) with service data

##### functionality

- updating fields value
- adding new data to fields that are lists (media, groups, etc.)
- removing data from fields that are lists (media, groups, etc.)
- converting from `json` and back

---

#### OrgMetadata

`ServiceMetadata` is an entity for manipulating organization metadata. It is possible that there may 
be other entities inside for complex metadata fields. Below is an example of organization metadata.

```json
{
    "org_name": "Snet_test",
    "org_id": "26072b8b6a0e448180f8c0e702ab6d2f",
    "org_type": "individual",
    "description": {
        "description": "Snet_test",
        "short_description": "Snet_test",
        "url": "https://ropsten-v2-publisher.singularitynet.io"
    },
    "assets": {
        "hero_image": "QmfTjcwBYwWCp5hdC5E3DRyHBFafaCVHDs1cCammDYkQPE/20240327124724_asset.jpeg"
    },
    "contacts": [
        {
            "email": "",
            "phone": "+18005551234",
            "contact_type": "general"
        },
        {
            "email": "test@gmail.com",
            "phone": "+18005551234",
            "contact_type": "support"
        }
    ],
    "groups": [
        {
            "group_name": "default_group",
            "group_id": "/mb90Qs8VktxGQmU0uRu0bSlGgqeDlYrKrs+WbsOvOQ=",
            "payment": {
                "payment_address": "0x0709e9B78756B740ab0C64427f43f8305fD6D1A7",
                "payment_expiration_threshold": 40320,
                "payment_channel_storage_type": "etcd",
                "payment_channel_storage_client": {
                    "connection_timeout": "5s",
                    "request_timeout": "3s",
                    "endpoints": [
                        "https://127.0.0.1:2379"
                    ]
                }
            }
        }
    ]
}
```

##### data

- map (or just fields) with organization data

##### functionality

- updating fields value
- adding new data to fields that are lists (groups, contacts, etc.)
- removing data from fields that are lists (groups, contacts, etc.)
- converting from `json` and back

---

#### TransactionHandler

`TransactionHandler` is an abstract entity. It allows you to conduct transactions. `TransactionHandler` 
is the base entity to `LedgerTransactionHandler` and `KeyOrMnemonicTransactionHandler`.

##### functionality

- signing transaction
- sending transaction
- getting wallet address
- signing message

---

#### LedgerTransactionHandler

`LedgerTransactionHandler` implements `TransactionHandler`. It allows you to conduct transactions 
using ledger. 

##### data

- address
- index
- dongle path

##### functionality

- connecting to ledger
<!-- TODO: find out what exactly is happening to connect with the ledger -->

---

#### KeyOrMnemonicTransactionHandler

`KeyOrMnemonicTransactionHandler` implements `TransactionHandler`. It allows you to conduct transactions 
using key or mnemonic with index. 

##### data

- private key
- address

##### functionality

- implementation parent's functionality using Web3

---

#### PaymentStrategy

`PaymentStrategy` is an abstract entity. It's needed for execution of various types of payments. `PaymentStrategy` 
is the base entity to `DefaultPaymentStrategy`, `FreeCallPaymentStrategy`, `FreeCallPaymentStrategy` 
and `PaidCallPaymentStrategy`.

##### functionality

- getting call price (abstract)
- getting payment metadata (abstract)

---

#### DefaultPaymentStrategy

`DefaultPaymentStrategy` implements `PaymentStrategy`. This payment strategy is used by default when 
the user does not specify which strategy to use. And in fact, this is not a separate strategy, this entity, 
depending on various conditions, chooses strategy from `FreeCallPaymentStrategy`, `FreeCallPaymentStrategy` 
and `PaidCallPaymentStrategy`.

##### data

- `ConcurrencyManager`'s instance
- channel

##### functionality

- choosing payment strategy

---

#### FreeCallPaymentStrategy

`FreeCallPaymentStrategy` implements `PaymentStrategy`. This payment strategy can be used when the user 
has free service call tokens.

##### functionality

- checking for free call tokens
- implementation of parent's functionality for free-call type of call

---

#### PrepaidPaymentStrategy

`PrepaidPaymentStrategy` implements `PaymentStrategy`. This strategy can be used when the user has deposited 
funds into the channel in advance and **wants to pay for several calls at once**.

##### data

- `ConcurrencyManager`'s instance (it's got from the owner's entity, usually from`DefaultPaymentStrategy`)
- call allowance
- block offset (240 by default)

##### functionality

- providing concurrency
- implementation of parent's functionality for prepaid type of call
- selecting channel with checking for its presence, amount and expiration

---

#### PaidCallPaymentStrategy

`FreeCallPaymentStrategy` implements `PaymentStrategy`. This payment strategy can be used when the user 
wants to call the service once. 

##### data

- call allowance
- block offset (240 by default)

##### functionality

- implementation of parent's functionality 
- selecting channel with checking for its presence, amount and expiration

---

#### ConcurrencyManager

`ConcurrencyManager` is an entity that organizes and controls concurrency by turning to the daemon.

##### data

- amount of concurrent calls
- token
- planned and used amount

##### functionality

- working with channel
- getting token from daemon
- control of planned and used funds

---

#### Utils

`Utils` is an entity that contains a set of functions used in many other entities. 

##### functionality

- validation of URL
- validation of endpoint
- getting address from private key and mnemonic
- getting data from abi
- etc.

---

## Interfaces

> Note: This section includes mandatory requirements for implementation.

- [Smart Contracts](#smart-contracts)
- [Storage Providers](#storage-providers)
- [Daemon](#daemon)

### Smart Contracts

Payment for service calls on the Singularity NET platform is made using the Singularity NET Token (AGIX) through 
a payment channel. To realize a service call on the platform, there are smart contracts. Each of them is responsible 
for a specific functionality.

#### MultiPartyEscrow

The main purpose of MPE is to manage payment channels. For a call to be successful, a suitable payment channel 
must be open, it must have sufficient funds and it must not be overdue. MPE is needed to manage this and 
monitor the channels.

Here are the functions of this contract that the SDK must be able to call

1. `balances` - returns MPE balance
2. `channels` - returns the channel's state
3. `openChannel` - opens a new channel with a given amount of funds and expiration
4. `channelAddFunds` - adds funds to the channel
5. `channelExtend` - extends the expiration of the channel
6. `channelExtendAndAddFunds` - extends the expiration of the channel and adds funds
7. `deposit` - deposits funds into the MPE
8. `depositAndOpenChannel` - deposits funds into the MPE and opens a new channel with the same amount of funds and 
a given expiration
8. `withdraw` - withdraws funds from the MPE back to the wallet
9. `channelClaim` - claims funds from the channel (**for the service providers**)
10. `multiChannelClaim` - claims funds from multiple channels (**for the service providers**)
11. `channelClaimTimeout` - claims funds from the channel if the channel has expired (**for the service consumers**)

You can see the implementation of MultiPartyEscrow in Ethereum [here](https://etherscan.io/address/0x5e592F9b1d303183d963635f895f0f0C48284f4e).

#### Registry

Registry is designed to manage data about organizations and services, as well as their metadata. With its help 
you can register an organization and a service, as well as get URI to their metadata in storage providers (and from 
the service metadata you can get a URI to the service API).

Here are the functions of this contract that the SDK must be able to call

1. `getOrganizationById` - returns organization data
2. `getServiceRegistrationById` - returns service URI
3. `listOrganizations` - returns list of organization IDs
4. `listServicesForOrganization` - returns list of service IDs for an organization
5. `createOrganization` - creates an organization
6. `deleteOrganization` - deletes an organization
7. `createServiceRegistration` - creates a service
8. `deleteServiceRegistration` - deletes a service
9. `updateServiceRegistration` - updates service metadata URI
10. `addOrganizationMembers` - adds members to the organization
11. `removeOrganizationMembers` - removes members from the organization
12. `changeOrganizationMetadataURI` - changes organization metadata URI
13. `changeOrganizationOwner` - changes organization owner

You can see the implementation of Registry in Ethereum [here](https://etherscan.io/address/0x247DEbEBB766E4fA99667265A158060018D5f4F8).

#### SingularityNetToken

The AGIX Token is an ERC-20 token that powers the SingularityNet platform. In the SDK, this contract is needed to 
check the balance and deposit funds into the MPE

Here are the functions of this contract that the SDK must be able to call

1. `balanceOf` - returns balance of the wallet
2. `allowance` - returns the allowance for spending
3. `approve` - approves a spender (particularly MPE) to take a certain amount of your funds

You can see the implementation of SingularityNET AGIX Token in Ethereum [here](https://etherscan.io/address/0x5B7533812759B45C2B44C19e320ba2cD2681b542)

### Storage Providers

The storage provider is designed to store metadata of services and organizations, as well as services (daemons) APIs. 
Organization and service metadata URI are stored in Registry. Service API source (URI) is stored in service metadata 
in the field `service_api_source`. 

URI is a string consisting of a prefix with the name of the storage and the identifier of the file in that storage
`<STORAGE_NAME>://<FILE_IDENTIFIER>`. The organization and service metadata URIs stored in the registry are 
additionally encoded in ASCII format and padded with null bytes.

#### IPFS

URI example: `ipfs://<IPFS_HASH>`

#### FileCoin

URI example: `filecoin://<FILECOIN_CID>`

### Daemon

Interaction with the daemon is currently carried out only using gRPC. To call the service, you need to get the 
service API (.proto files) from the storage provider, compile them and call any of the described methods via gRPC.
In addition, the daemon has methods that are the same for everyone. Therefore, the SDK stores .proto files for 
the following services, which are the same for all daemons:

- `state_service` - needed to determine the current state of the channel
- `control_service` - needed to change the configuration of the daemon
- `token_service` - needed for concurrency implementation
- `training` - needed to work with AI models

## Implementations

We support SDK for the below two languages 

- [SDK in Python](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)
- [SDK in WebJS](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/)

And two SDKs are under development:

- [SDK in Java](/docs/products/DecentralizedAIPlatform/SDK/JavaSDK/getting-started-guide/)
- [SDK in Node.JS](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/NodeJsSDK/getting-started-guide/)

All SDKs provided adhere to the same design standard and strategy

**Note**:  According  to the design pattern for the SDK modules such as
functionality, need to be available in all programming languages, such as
Python and WebJS. 

The SDK can include several default funding strategies for payment channels,
but allows and supports the developer to implement funding strategies for
payment channel of their own, to control over tokens and service payments.

The SDK, in combination with the CLI, simplifies the process of fetching the
latest service specification for dependent services, and compiles the proto
definitions, so that the services can be invoked with minimal fuss.

Currently, a fully functional of a [Python SDK](https://github.com/singnet/snet-sdk-python) is available, but has 
[some design improvements](https://github.com/singnet/snet-sdk-python/issues/16).

Also, a fully functional of a [WebJS SDK](https://github.com/singnet/snet-sdk-js/tree/master/packages/web) is available. 

We are currently working on [SDK for Node.JS](https://github.com/singnet/snet-sdk-js/tree/master/packages/nodejs) 
and [SDK for Java](https://github.com/singnet/snet-sdk-java). We are also planning to support other popular languages, 
and welcome third-party contributions to the SDK for users' favorite languages.
