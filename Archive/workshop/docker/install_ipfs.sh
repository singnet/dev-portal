#!/bin/sh

cd /tmp
curl https://dist.ipfs.io/go-ipfs/v0.4.18/go-ipfs_v0.4.18_linux-amd64.tar.gz > go-ipfs.tar.gz
tar xzf go-ipfs.tar.gz
cd go-ipfs
cp ipfs ${GOPATH}/bin/
cd ..
rm -rf go-ipfs
