#!/bin/sh

ipfs daemon >${LOG}/ipfs.log 2>&1 &
etcd --data-dir ${ETCD} >${LOG}/etcd.log 2>&1 &
ganache-cli --db ${GANACHE} --host 0.0.0.0 --networkId ${NETWORK_ID} --mnemonic "${GANACHE_MNEMONIC}" >${LOG}/ganache.log 2>&1 &

echo "Waiting for environment to be started"
while ! lsof -i:5002 -i:2379 -i:8545 >/dev/null 2>&1 ; do
	sleep 1s
done
