---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: "Example 2: Using the SNET-CLI tool"
description: This example shows you how to use the SNET-CLI tool.

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

Please see:
* [snet-cli repo documentation](https://github.com/singnet/snet-cli)

## Transfer tokens to the caller
```
snet identity deployer
snet client balance
snet contract SingularityNetToken transferTokens $CALLER_ADDR 100000000000 --transact --yes
```

## Deposit tokens into MultiPartyEscrow contract
```
snet identity caller
snet client balance
snet client deposit 1000 -y
snet client balance
```

## Create publisher identity
```
snet identity create --private-key $PUBLISHER_KEY publisher key
```

## Create organization
```
snet identity publisher
snet organization create ExampleOrganization --yes
```

> Next Example
