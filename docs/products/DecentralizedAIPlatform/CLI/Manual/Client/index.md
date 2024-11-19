# Client

```sh
usage: snet client [-h] COMMAND ...
```

## Commands

## call

Call server. We ask state of the channel from the server if needed. Channel
should be already initialized.

```sh
snet client call [-h]
                 [--service SERVICE]
                 [--wallet-index WALLET_INDEX]
                 [--multipartyescrow-at MULTIPARTYESCROW_AT]
                 [--save-response FILENAME]
                 [--save-field SAVE_FIELD SAVE_FIELD]
                 [--endpoint ENDPOINT]
                 [--channel-id CHANNEL_ID]
                 [--yes]
                 [--skip-update-check] ORG_ID SERVICE_ID group_name METHOD [PARAMS]
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

`METHOD`

    

Target service’s method name to call

`PARAMS`

    

JSON-serialized parameters object or path containing JSON-serialized
parameters object (leave emtpy to read from stdin)

#### Named Arguments

`--service`

    

Name of protobuf service to call. It should be specified in case of method
name conflict.

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--save-response`

    

Save response in the file

`--save-field`

    

Save specific field in the file (two arguments ‘field’ and ‘file_name’ should
be specified)

`--endpoint`

    

Service endpoint (by default we read it from metadata)

`--channel-id`

    

The Channel Id (only in case of multiply initialized channels for the same
payment group)

`--yes, -y`

    

Skip interactive confirmation of call price

Default: `False`

`--skip-update-check`

    

Skip check for service update

Default: `False`

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## call-lowlevel

Low level function for calling the server. Service should be already
initialized.

```sh
snet client call-lowlevel [-h]
                          [--service SERVICE]
                          [--wallet-index WALLET_INDEX]
                          [--multipartyescrow-at MULTIPARTYESCROW_AT]
                          [--save-response FILENAME]
                          [--save-field SAVE_FIELD SAVE_FIELD]
                          [--endpoint ENDPOINT] ORG_ID SERVICE_ID group_name CHANNEL_ID NONCE AMOUNT_IN_COGS METHOD [PARAMS]
```

#### Positional Arguments

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

`group_name`

    

Name of the payment group. Parameter should be specified only for services
with several payment groups

`CHANNEL_ID`

    

The Channel Id

`NONCE`

    

Nonce of the channel

`AMOUNT_IN_COGS`

    

Amount in cogs

`METHOD`

    

Target service’s method name to call

`PARAMS`

    

JSON-serialized parameters object or path containing JSON-serialized
parameters object (leave emtpy to read from stdin)

#### Named Arguments

`--service`

    

Name of protobuf service to call. It should be specified in case of method
name conflict.

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

`--save-response`

    

Save response in the file

`--save-field`

    

Save specific field in the file (two arguments ‘field’ and ‘file_name’ should
be specified)

`--endpoint`

    

Service endpoint (by default we read it from metadata)

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## get-channel-state

Get channel state in stateless manner

```sh
snet client get-channel-state [-h]
                              [--multipartyescrow-at MULTIPARTYESCROW_AT]
                              [--wallet-index WALLET_INDEX] CHANNEL_ID ENDPOINT
```

#### Positional Arguments

`CHANNEL_ID`

    

The Channel Id

`ENDPOINT`

    

Service endpoint

#### Named Arguments

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

