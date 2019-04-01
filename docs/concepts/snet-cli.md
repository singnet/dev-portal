---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: Using the SNET-CLI to pass parameters to a service
description: In this document, we look at how to pass parameters to a service in the SNET-CLI and how to pass binary parameters via a command line interface.

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

page_nav:
    prev:
        content: Software
        url: '/docs/concepts/software'
    next:
        content: snetd daemon
        url: '/docs/concepts/daemon'

---

## Introduction
The SingularityNET command line interface (CLI) is the primary tool for interacting with the
platform's smart contracts, managing deployed services, and managing funds. It is aimed at service providers. In the near future, it will be supplemented by a web-based dashboard and control panel.

The CLI provides commands to interface with the blockchain in the following ways:
* creating and managing identities;
* registering and managing the organizations, members, services, types, and tags on the
SingularityNET Registry;
* claiming funds from customers using MPE and payment channels;
* reading and writing metadata and Protobuf specs about AI services (these are stored on IPFS, while basic service parameters can be fetched from blockchain contracts); and
* connecting to different networks like local testnets, Kovan, Ropsten, and the Ethereum mainnet.

The CLI also provides service development and deployment support. It can set up new services by generating service metadata, Protobuf specs, and code templates provided by the SingularityNET Foundation. The CLI interacts with daemons for each service.
Security-wise, the CLI follows the same guidelines as provided by Ethereum for storing the private keys. When user identities are created and registered with a client, the CLI safely stores the details on the local machine and retrieves them only when it needs to interact with the blockchain.

<img src="/docs/all/mpe/img/how_cli_works.jpg" width="400">

The CLI requires and connects to four critical components:
* User identity management. Involves user registration, managing identities and sessions,
and locking/unlocking accounts for transacting with the blockchain. This component is local to the machine where the CLI is run.
* Sidecar proxy. Communicates to servers hosting AI services.
* Registry contract. Deals with organizations, members, services, types, and tags.
* MPE contract. Sends and receives funds and manages other functions related to payment channels; e.g., closing a channel or extending its expiry date.

## JSON parameters

Parameters for a service have to be passed to the snet-cli in a JSON format. There are three ways of passing this JSON:
* via a cmdline parameter;
* via JSON file; and
* via stdin.

For example in [this front-to-back example](front-to-back-examples/example.md#make-a-call-using-stateless-logic) we need to pass the following JSON as a parameter for the "add" method to our service:
`{"a":10,"b":32}`

We can use three ways:
```bash
# via cmdline parameter
snet client call 0 0.1 localhost:8080 add '{"a":10,"b":32}'

# via json file
echo '{"a":10,"b":32}' > p.txt
snet client call 0 0.1 localhost:8080 add p.txt

# via stdin
echo '{"a":10,"b":32}' | snet client call 0 0.1 localhost:8080 add
```

## Modifiers

We've implemented several modifiers for this JSON parameter in order to simplify passing big files and to have the possibility to pass binary data (and not only base64 encoded data).

There are 3 possible modifiers:
* file      - read from file;
* b64encode - encode to base64; and
* b64decode - decode from base64.

For example, if you pass the following JSON as a parameter, then as an "image" parameter we will use the base64 encoded content of "1.jpeg"

```bash
'{"image_type": "jpg", "file@b64encode@image": "1.jpeg"}'
```

If we remove the b64encode modifier from the previous example, then we will pass 1.jpeg image in binary format without base64 encoding.  
