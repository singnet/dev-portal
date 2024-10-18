#!/bin/sh

cat <<EOF >> ~/.snet/config
[network.local]
default_eth_rpc_endpoint = http://127.0.0.1:8545
default_gas_price = 1000000000
EOF
