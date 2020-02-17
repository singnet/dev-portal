---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: "Example 1: Build & Deploy"
description: This example shows you how to build and deploy different SingularityNET components from source.

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true
---

## Build and deploy SingularityNet contracts
```
cd ${SINGNET}/platform-contracts # go to the platform-contracts repository
npm install                      # install dependencies
npm run compile                  # compile contracts
npm run test                     # run contract tests
cat truffle.js                   # add local network to the Truffle configuration
truffle migrate --network local  # deploy contracts to the local network
```

## Build and install snet-cli
```
cd ${SINGNET}/snet-cli           # go to the snet-cli repository
./scripts/Blockchain install     # install contract dependencies
pip install -e .                 # install snet-cli
cat ~/.snet/config               # look at snet-cli configuration
```

## Build and install SingularityNet daemon
```
cd ${SINGNET}/snet-daemon                   # go to the daemon repository
./scripts/install                           # install dependencies
./scripts/build linux amd64                 # build daemon
cp ./build/snetd-linux-amd64 ${GOPATH}/bin  # copy binary to the $PATH
```


> Next Example
