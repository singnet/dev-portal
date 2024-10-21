# Channel

```sh
usage: snet channel [-h] COMMAND ...
```

## Commands

## init

Initialize channel taking org metadata from Registry

```sh
snet channel init [-h]
                  [--registry-at REGISTRY_AT]
                  [--multipartyescrow- at MULTIPARTYESCROW_AT] ORG_ID group_name CHANNEL_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

`CHANNEL_ID`

    

The Channel Id

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

## init-metadata

Initialize channel using organization metadata

```sh
snet channel init-metadata [-h]
                           [--registry-at REGISTRY_AT]
                           [--metadata- file METADATA_FILE]
                           [--multipartyescrow-at MULTIPARTYESCROW_AT]
                           [--wallet- index WALLET_INDEX] ORG_ID group_name CHANNEL_ID
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

`CHANNEL_ID`

    

The Channel Id

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

`--metadata-file`

    

Service metadata json file (default service_metadata.json)

Default: `'organization_metadata.json'`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## open-init

Open and initialize channel using organization metadata from Registry

```sh
snet channel open-init [-h]
                       [--registry-at REGISTRY_AT]
                       [--force]
                       [--signer SIGNER]
                       [--multipartyescrow-at MULTIPARTYESCROW_AT]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose]
                       [--open-new-anyway]
                       [--from-block FROM_BLOCK] ORG_ID group_name AMOUNT EXPIRATION
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

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

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

## open-init-metadata

Open and initialize channel using organization metadata

```sh
snet channel open-init-metadata [-h]
                                [--registry-at REGISTRY_AT]
                                [--force]
                                [--signer SIGNER]
                                [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                [--wallet-index WALLET_INDEX]
                                [--yes]
                                [--quiet | --verbose]
                                [--open-new-anyway]
                                [--from-block FROM_BLOCK]
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

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

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
                                [--channel-id CHANNEL_ID]
                                [--from-block FROM_BLOCK] ORG_ID group_name
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

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

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

## print-initialized

Print initialized channels.

```sh
snet channel print-initialized [-h]
                               [--only-id]
                               [--filter-sender | --filter-signer | --filter-my]
                               [--multipartyescrow-at MULTIPARTYESCROW_AT]
                               [--wallet-index WALLET_INDEX]
                               [--registry-at REGISTRY_AT]
```

#### Named Arguments

`--only-id`

    

Print only id of channels

Default: `False`

`--filter-sender`

    

Print only channels in which current identity is sender

Default: `False`

`--filter-signer`

    

Print only channels in which current identity is signer

Default: `False`

`--filter-my`

    

Print only channels in which current identity is sender or signer

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-initialized-filter-org

Print initialized channels for the given org (all payment group).

```sh
snet channel print-initialized-filter-org [-h]
                                          [--registry-at REGISTRY_AT]
                                          [--only-id]
                                          [--filter-sender | --filter-signer | --filter-my]
                                          [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                          [--wallet-index WALLET_INDEX] ORG_ID group_name
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

`--filter-sender`

    

Print only channels in which current identity is sender

Default: `False`

`--filter-signer`

    

Print only channels in which current identity is signer

Default: `False`

`--filter-my`

    

Print only channels in which current identity is sender or signer

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-all-filter-sender

Print all channels for the given sender.

```sh
snet channel print-all-filter-sender [-h]
                                     [--only-id]
                                     [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                     [--from-block FROM_BLOCK]
                                     [--wallet-index WALLET_INDEX]
                                     [--sender SENDER]
```

#### Named Arguments

`--only-id`

    

Print only id of channels

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

`--sender`

    

Account to set as sender (by default we use the current identity)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-all-filter-recipient

Print all channels for the given recipient.

```sh
snet channel print-all-filter-recipient [-h]
                                        [--only-id]
                                        [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                        [--from-block FROM_BLOCK]
                                        [--wallet-index WALLET_INDEX]
                                        [--recipient RECIPIENT]
```

#### Named Arguments

`--only-id`

    

Print only id of channels

Default: `False`

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

`--recipient`

    

Account to set as recipient (by default we use the current identity)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-all-filter-group

Print all channels for the given service.

```sh
snet channel print-all-filter-group [-h]
                                    [--registry-at REGISTRY_AT]
                                    [--only-id]
                                    [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                    [--from-block FROM_BLOCK]
                                    [--wallet-index WALLET_INDEX] ORG_ID group_name
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

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## print-all-filter-group-sender

Print all channels for the given group and sender.

```sh
snet channel print-all-filter-group-sender [-h]
                                           [--registry-at REGISTRY_AT]
                                           [--only-id]
                                           [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                           [--from- block FROM_BLOCK]
                                           [--wallet-index WALLET_INDEX]
                                           [--sender SENDER] ORG_ID group_name
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

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

`--sender`

    

Account to set as sender (by default we use the current identity)

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
                               [--from-block FROM_BLOCK]
```

#### Named Arguments

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--from-block`

    

Start searching from this block (for channel searching)

Default: `0`

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

