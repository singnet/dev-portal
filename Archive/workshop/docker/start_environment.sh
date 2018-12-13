#!/bin/sh

ipfs daemon >$LOG/ipfs.log 2>&1 &
ganache-cli --networkId ${NETWORK_ID} --mnemonic 'gauge enact biology destroy normal tunnel slight slide wide sauce ladder produce' >$LOG/ganache.log 2>&1 &
cd ${SINGNET}/platform-contracts
truffle migrate --network local

cd ${SINGNET}
bash
