---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Launch a local SingularityNET network

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

This tutorial describes the process of launching a fully functional local SingularityNET environment. You can publish services, call them and have full control over a local Blockchain network for development and testing.

## Install prerequisites

This document describes the process of the environment setup in Ubuntu 18.04. Some commands can be different under other linux distributions.

> TIP: [Here](/docs/development/mpe-example1) you can find an instruction how to run SingularityNet platform locally inside a docker container, and how to run simple front-to-back example in it.

### Go toolset

- Go 1.10+
- Dep 0.4.1+
- Go Protobuf Compiler
- Golint

Part of the code is written in [Go](https://golang.org) language so you need a set of tools to compile Go code and manage Go dependencies.

```
sudo apt-get install golang go-dep golang-goprotobuf-dev golint
```

### NodeJS toolset

- NodeJS 8+
- NPM

[Truffle](https://truffleframework.com/truffle) and [Ganache](https://truffleframework.com/ganache) are used to develop and test Ethereum contracts so NodeJS development tools are required.

```
sudo apt-get install nodejs npm
```

### IPFS

IPFS is used to keep RPC models of the services which are published via SingularityNET platform. Follow instructions [here](https://docs.ipfs.io/guides/guides/install/) to download and install IPFS. Following steps expects that `ipfs` is installed and can be run from the command line.

### Python toolset

- Python 3.6.5
- Pip

Part of the code is written in Python so you need a Python interpreter and Pip as python package manager.

```
sudo apt-get install python3 python3-pip
```

### Other

- libudev
- libusb 1.0

```
sudo apt-get install libudev-dev libusb-1.0-0-dev
```

## Deploy local environment

### Setup Go building environments

Go compiler expects that the path to the workspace is exported as ```GOPATH``` variable. ```SINGNET_REPOS``` is exported to simplify change directory commands below.

```sh
mkdir -p singnet/src/github.com/singnet
cd singnet
mkdir log
export GOPATH=`pwd`
export SINGNET_REPOS=${GOPATH}/src/github.com/singnet
export PATH=${GOPATH}/bin:${PATH}
```

### Deploy local IPFS instance

IPFS is used by SingularityNET to keep published services RPC models. For local test environment we will setup a private local IPFS instance.

Initialize IPFS data folder:

```sh
export IPFS_PATH=$GOPATH/ipfs
ipfs init
```

Remove all default IPFS bootstrap instances from default IPFS configuration (see [IPFS private network](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#private-networks)).

```sh
ipfs bootstrap rm --all
```

Change IPFS API and Gateway ports because they intersect with default ```example-service``` and snet-daemon ports.

```sh
ipfs config Addresses.API /ip4/127.0.0.1/tcp/5002
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8081
```

### Compile platform contracts
Clone platform-contracts repository:

```sh
cd $SINGNET_REPOS
git clone https://github.com/singnet/platform-contracts
cd platform-contracts
```

Install dependencies and Ganache using NPM:

```sh
npm install
npm install ganache-cli
```

Compile contracts using Truffle:

```sh
./node_modules/.bin/truffle compile
```

### Setup ```snet``` command line interface
Clone snet-cli repository:

```sh
cd $SINGNET_REPOS
git clone https://github.com/singnet/snet-cli
cd snet-cli
```

Install Blockchain dependencies and snet-cli package in development mode.

```sh
# you need python 3.6 here, with python 3.5 you will get an error
./scripts/Blockchain install
pip3 install -e .
```

### Build snet-daemon
Clone ```snet-daemon``` repository:

```sh
cd $SINGNET_REPOS
git clone https://github.com/singnet/snet-daemon
cd snet-daemon
```

Build ```snet-daemon```:

```sh
./scripts/install # install dependencies
./scripts/build linux amd64  # build project
```

## Start environment and finalize snet configuration
### Start local IPFS instance

Start IPFS daemon:

```sh
ipfs daemon >$GOPATH/log/ipfs.log 2>&1 &
```

### Start local Ethereum network
Start a local Ethereum network. Pass mnemonic to produce a deterministic Blockchain environment: accounts, private keys and behavior.

```sh
cd $SINGNET_REPOS/platform-contracts
./node_modules/.bin/ganache-cli --mnemonic 'gauge enact biology destroy normal tunnel slight slide wide sauce ladder produce' >$GOPATH/log/ganache.log 2>&1 &
```

Accounts and private keys printed by Ganache will be used in next steps.
Deploy contracts using Truffle.

```sh
./node_modules/.bin/truffle migrate --network local
npm run package-npm
```

Contract addresses printed after deployment will be used to setup snet.

Truffle deploys contracts using the first account of the test network. As SingularityNETToken contract is deployed using this account, this account's balance keeps all of SingularityNET tokens issued during deployment. Other contracts deployed are Registry and MultiPartyEscrow. Registry keeps the list of organization and published services, and MultiPartyEscrow is a part of our payment system.


### Configure snet-cli for local environment

```sh
# run snet command  for the first time to create default config:
snet

# add local Ethereum network to the `snet` configuration with the name "local".
snet network create local http://localhost:8545

# Create First identity (snet-user = first ganache identity)
snet identity create snet-user rpc --network local

# switch to snet-user (we will switch automatically to local network)
snet identity snet-user

# switch to local ipfs endpoint
snet set  default_ipfs_endpoint http://localhost:5002

# Configure contract addresses for local network (for kovan addresess are already configured!)
snet set current_singularitynettoken_at 0x6e5f20669177f5bdf3703ec5ea9c4d4fe3aabd14
snet set current_registry_at            0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2
snet set current_multipartyescrow_at    0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e

```
