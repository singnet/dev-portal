## Transfer tokens to the caller

```sh
snet identity deployer
snet client balance
snet contract SingularityNetToken transferTokens $CALLER_ADDR 100000000000 --transact --yes
```

## Deposit tokens into MultiPartyEscrow contract

```sh
snet identity caller
snet client balance
snet client deposit 1000 -y
snet client balance
```

## Create publisher identity

```sh
snet identity create --private-key $PUBLISHER_KEY publisher key
```

## Create organization

```sh
snet identity publisher
snet organization create ExampleOrganization --yes
```