# Account

```sh
	usage: snet account [-h] COMMAND ... 
```

## Commands

`COMMAND`

    

Possible choices: print, balance, deposit, withdraw, transfer

## Sub-commands

### print

Print the current ETH account

```sh
	snet account print [-h] [--wallet-index WALLET_INDEX] 
```

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

### balance

Print balance of AGIX tokens and balance of MPE wallet

```sh
	snet account balance [-h] [--account ACCOUNT] [--singularitynettoken-at
SINGULARITYNETTOKEN_AT] [--multipartyescrow-at MULTIPARTYESCROW_AT] [--wallet-
index WALLET_INDEX] 
```

#### Named Arguments

`--account`

    

Account to print balance for (default is the current identity)

`--singularitynettoken-at, --snt`

    

Address of SingularityNetToken contract, if not specified we read address from
“networks”

`--multipartyescrow-at, --mpe`

    

Address of MultiPartyEscrow contract, if not specified we read address from
“networks”

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

### deposit

Deposit AGIX tokens to MPE wallet

```sh
	snet account deposit [-h] [--singularitynettoken-at SINGULARITYNETTOKEN_AT] [--multipartyescrow-at MULTIPARTYESCROW_AT] [--wallet-index WALLET_INDEX] [--yes] [--quiet | --verbose] AMOUNT 
```

#### Positional Arguments

`AMOUNT`

    

Amount of AGIX tokens to deposit in MPE wallet

#### Named Arguments

`--singularitynettoken-at, --snt`

    

Address of SingularityNetToken contract, if not specified we read address from
“networks”

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

### withdraw

Withdraw AGIX tokens from MPE wallet

```sh
	snet account withdraw [-h] [--multipartyescrow-at MULTIPARTYESCROW_AT] [--wallet-index WALLET_INDEX] [--yes] [--quiet | --verbose] AMOUNT 
```

#### Positional Arguments

`AMOUNT`

    

Amount of AGIX tokens to withdraw from MPE wallet

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

### transfer

Transfer AGIX tokens inside MPE wallet

```sh
	snet account transfer [-h] [--multipartyescrow-at MULTIPARTYESCROW_AT] [--wallet-index WALLET_INDEX] [--yes] [--quiet | --verbose] RECEIVER AMOUNT 
```

#### Positional Arguments

`RECEIVER`

    

Address of the receiver

`AMOUNT`

    

Amount of AGIX tokens to be transferred to another account inside MPE wallet

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

