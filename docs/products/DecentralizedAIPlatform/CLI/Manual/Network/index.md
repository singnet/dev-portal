# Network

```sh
usage: snet network [-h] COMMAND ...
```

## Commands

## list

List of networks

```sh
snet network list [-h]
```

## create

Create a new network

```sh
snet network create [-h]
                    [--default-gas-price DEFAULT_GAS_PRICE]
                    [--skip-check] network_name eth_rpc_endpoint
```

#### Positional Arguments

`network_name`

    

Name of network to create

`eth_rpc_endpoint`

    

Ethereum rpc endpoint

#### Named Arguments

`--default-gas-price`

    

Default gas price (in wei) or gas price strategy (‘fast’ ~1min, ‘medium’ ~5min
or ‘slow’ ~60min), default is ‘medium’

Default: `'medium'`

`--skip-check`

    

Skip check that eth_rpc_endpoint is valid

Default: `False`

## mainnet

Switch to mainnet network

```sh
snet network mainnet [-h]
```

## goerli

Switch to goerli network

```sh
snet network goerli [-h]
```

## sepolia

Switch to sepolia network

```sh
snet network sepolia [-h]
```

