#!/bin/sh
ganache-cli --db ${GANACHE} --host 0.0.0.0 --networkId ${NETWORK_ID} --mnemonic "${GANACHE_MNEMONIC}" >${LOG}/ganache.log 2>&1 &
cd ${ROOT}/platform-contracts
truffle migrate --network local
