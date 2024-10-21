# Treasurer

```sh
usage: snet treasurer [-h] COMMAND ...
```

## Commands

## print-unclaimed

Print unclaimed payments

```sh
snet treasurer print-unclaimed [-h] --endpoint ENDPOINT [--wallet-index WALLET_INDEX]
```

#### Named Arguments

`--endpoint`

    

Daemon endpoint

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

## claim

Claim given channels. We also claim all pending ‘payments in progress’ in case
we ‘lost’ some payments.

```sh
snet treasurer claim [-h] --endpoint ENDPOINT [--wallet-index WALLET_INDEX]
                     [--yes]
                     [--quiet | --verbose] CHANNELS [CHANNELS ...]
```

#### Positional Arguments

`CHANNELS`

    

Channels to claim

#### Named Arguments

`--endpoint`

    

Daemon endpoint

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

## claim-all

Claim all channels. We also claim all pending ‘payments in progress’ in case
we ‘lost’ some payments.

```sh
snet treasurer claim-all [-h] --endpoint ENDPOINT [--wallet-index WALLET_INDEX]
                         [--yes]
                         [--quiet | --verbose]
```

#### Named Arguments

`--endpoint`

    

Daemon endpoint

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

## claim-expired

Claim all channels which are close to expiration date. We also claim all
pending ‘payments in progress’ in case we ‘lost’ some payments.

```sh
snet treasurer claim-expired [-h]
                             [--expiration-threshold EXPIRATION_THRESHOLD] --endpoint ENDPOINT [--wallet-index WALLET_INDEX]
                             [--yes]
                             [--quiet | --verbose]
```

#### Named Arguments

`--expiration-threshold`

    

Service expiration threshold in blocks (default is 34560 ~ 6 days with
15s/block)

Default: `34560`

`--endpoint`

    

Daemon endpoint

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

