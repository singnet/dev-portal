# Sdk

```sh
usage: snet sdk [-h] COMMAND ...
```

## Commands

## generate-client-library

Generate compiled client libraries to call services using your language of
choice

```sh
snet sdk generate-client-library [-h]
                                 [--registry-at REGISTRY_AT]
                                 [--wallet-index WALLET_INDEX] LANGUAGE ORG_ID SERVICE_ID [PROTO_DIR]
```

#### Positional Arguments

`LANGUAGE`

    

Possible choices: python, nodejs

Choose target language for the generated client library from [‘python’,
‘nodejs’]

`ORG_ID`

    

Id of the Organization

`SERVICE_ID`

    

Id of service

`PROTO_DIR`

    

Directory where to output the generated client libraries

Default: `'client_libraries'`

#### Named Arguments

`--registry-at, --registry`

    

Address of Registry contract, if not specified we read address from “networks”

#### optional call arguments

`--wallet-index`

    

Wallet index of account to use for calling (defaults to
session.identity.default_wallet_index)

