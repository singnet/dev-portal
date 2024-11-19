# Channel

```sh
usage: snet channel [-h] COMMAND ...
```

## Commands

## open

Open channel using organization metadata from Registry

```sh
snet channel open [-h]
                  [--registry-at REGISTRY_AT]
                  [--force]
                  [--signer SIGNER]
                  [--multipartyescrow-at MULTIPARTYESCROW_AT]
                  [--wallet-index WALLET_INDEX]
                  [--yes]
                  [--quiet | --verbose]
                  [--open-new-anyway] ORG_ID group_name AMOUNT EXPIRATION
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

`AMOUNT`

    

Amount of AGIX tokens to put in the new channel

`EXPIRATION`

    

expiration time in blocks (\<int\>), or in blocks related to the current_block
(+\<int\>blocks), or in days related to the current_block and assuming 15
sec/block (+\<int\>days)

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--force`

    

Skip check for very high (\>6 month) expiration time

Default: `False`

`--signer`

    

Signer for the channel (by default is equal to the sender)

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--open-new-anyway`

    

Skip check that channel already exists and open new channel anyway

Default: `False`

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

## open-from-metadata

Open channel using existing organization metadata

```sh
snet channel open-from-metadata [-h]
                                [--registry-at REGISTRY_AT]
                                [--force]
                                [--signer SIGNER]
                                [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                [--wallet-index WALLET_INDEX]
                                [--yes]
                                [--quiet | --verbose]
                                [--open-new-anyway]
                                [--metadata-file METADATA_FILE] ORG_ID group_name AMOUNT EXPIRATION
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

`AMOUNT`

    

Amount of AGIX tokens to put in the new channel

`EXPIRATION`

    

expiration time in blocks (\<int\>), or in blocks related to the current_block
(+\<int\>blocks), or in days related to the current_block and assuming 15
sec/block (+\<int\>days)

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--force`

    

Skip check for very high (\>6 month) expiration time

Default: `False`

`--signer`

    

Signer for the channel (by default is equal to the sender)

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--open-new-anyway`

    

Skip check that channel already exists and open new channel anyway

Default: `False`

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

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

## extend-add

Set new expiration for the channel and add funds

```sh
snet channel extend-add [-h]
                        [--expiration EXPIRATION]
                        [--force]
                        [--amount AMOUNT]
                        [--multipartyescrow-at MULTIPARTYESCROW_AT]
                        [--wallet-index WALLET_INDEX]
                        [--yes]
                        [--quiet | --verbose] CHANNEL_ID
```

#### Positional Arguments

`CHANNEL_ID`

    

The Channel Id

#### Named Arguments

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

#### Expiration and amount

`--expiration`

    

expiration time in blocks (\<int\>), or in blocks related to the current_block
(+\<int\>blocks), or in days related to the current_block and assuming 15
sec/block (+\<int\>days)

`--force`

    

Skip check for very high (\>6 month) expiration time

Default: `False`

`--amount`

    

Amount of AGIX tokens to add to the channel

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

## extend-add-for-org

Set new expiration and add funds for the channel for the given service
(organization and group name)

```sh
snet channel extend-add-for-org [-h]
                                [--registry-at REGISTRY_AT]
                                [--expiration EXPIRATION]
                                [--force]
                                [--amount AMOUNT]
                                [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                [--wallet-index WALLET_INDEX]
                                [--yes]
                                [--quiet | --verbose]
                                [--group-name GROUP_NAME]
                                [--channel-id CHANNEL_ID] ORG_ID group_name
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--group-name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

`--channel-id`

    

The Channel Id (only in case of multiply initialized channels for the same
payment group)

#### Expiration and amount

`--expiration`

    

expiration time in blocks (\<int\>), or in blocks related to the current_block
(+\<int\>blocks), or in days related to the current_block and assuming 15
sec/block (+\<int\>days)

`--force`

    

Skip check for very high (\>6 month) expiration time

Default: `False`

`--amount`

    

Amount of AGIX tokens to add to the channel

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

## block-number

Print the last ethereum block number

```sh
snet channel block-number [-h]
```

## print-filter-sender

Print all channels for the given sender.

```sh
snet channel print-filter-sender [-h]
                                 [--only-id]
                                 [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                 [--wallet-index WALLET_INDEX]
                                 [--sender SENDER]
                                 [--do- not-sync]
```

#### Named Arguments

`--only-id`

    

Print only id of channels

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--sender`

    

Account to set as sender (by default we use the current identity)

`--do-not-sync, -ds`

    

Print channels without synchronizing their state

Default: `False`

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-filter-recipient

Print all channels for the given recipient.

```sh
snet channel print-filter-recipient [-h]
                                    [--only-id]
                                    [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                    [--wallet-index WALLET_INDEX]
                                    [--recipient RECIPIENT]
                                    [--do-not-sync]
```

#### Named Arguments

`--only-id`

    

Print only id of channels

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--recipient`

    

Account to set as recipient (by default we use the current identity)

`--do-not-sync, -ds`

    

Print channels without synchronizing their state

Default: `False`

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-filter-group

Print all channels for the given service.

```sh
snet channel print-filter-group [-h]
                                [--registry-at REGISTRY_AT]
                                [--only-id]
                                [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                [--wallet-index WALLET_INDEX]
                                [--do-not-sync] ORG_ID group_name
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--only-id`

    

Print only id of channels

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--do-not-sync, -ds`

    

Print channels without synchronizing their state

Default: `False`

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-filter-group-sender

Print all channels for the given group and sender.

```sh
snet channel print-filter-group-sender [-h]
                                       [--registry-at REGISTRY_AT]
                                       [--only-id]
                                       [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                       [--wallet-index WALLET_INDEX]
                                       [--sender SENDER]
                                       [--do-not-sync] ORG_ID group_name
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--only-id`

    

Print only id of channels

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--sender`

    

Account to set as sender (by default we use the current identity)

`--do-not-sync, -ds`

    

Print channels without synchronizing their state

Default: `False`

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-all

Print all channels.

```sh
snet channel print-all [-h]
                       [--registry-at REGISTRY_AT]
                       [--only-id]
                       [--multipartyescrow-at MULTIPARTYESCROW_AT]
                       [--wallet-index WALLET_INDEX]
                       [--do-not-sync]
```

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--only-id`

    

Print only id of channels

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--do-not-sync, -ds`

    

Print channels without synchronizing their state

Default: `False`

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## claim-timeout

Claim timeout of the channel

```sh
snet channel claim-timeout [-h]
                           [--multipartyescrow-at MULTIPARTYESCROW_AT]
                           [--wallet-index WALLET_INDEX]
                           [--yes]
                           [--quiet | --verbose] CHANNEL_ID
```

#### Positional Arguments

`CHANNEL_ID`

    

The Channel Id

#### Named Arguments

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

## claim-timeout-all

Claim timeout for all channels which have current identity as a sender.

```sh
snet channel claim-timeout-all [-h]
                               [--multipartyescrow-at MULTIPARTYESCROW_AT]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose]
```

#### Named Arguments

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

