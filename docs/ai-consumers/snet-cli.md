---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: The SingularityNET Command Line Tools

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
        content: SDK
        url: '/docs/concepts/sdk'
---

The SingularityNET command line interface (CLI) is the primary tool for interacting with the
platform's smart contracts, managing deployed services, and managing funds. It is aimed at service providers. In the near future, it will be supplemented by a web-based dashboard and control panel.

The CLI provides commands to interface with the Blockchain in the following ways:
* Creating and managing identities;
* Registering and managing the organizations, members, services, types, and tags on the
SingularityNET Registry;
* Claiming funds from customers using MPE and payment channels;
* Reading and writing metadata and Protobuf specs about AI services (these are stored on IPFS, while basic service parameters can be fetched from Blockchain contracts); and
* Connecting to different networks like local testnets, Kovan, Ropsten, and the Ethereum mainnet.

The CLI also provides service development and deployment support. It can set up new services by generating service metadata, Protobuf specs, and code templates provided by the SingularityNET Foundation. The CLI interacts with daemons for each service.
Security-wise, the CLI follows the same guidelines as provided by Ethereum for storing the private keys. When user identities are created and registered with a client, the CLI safely stores the details on the local machine and retrieves them only when it needs to interact with the Blockchain.

<img src="/assets/img/how_cli_works.jpg" width="400">

The CLI requires and connects to four critical components:
* User identity management. Involves user registration, managing identities and sessions,
and locking/unlocking accounts for transacting with the Blockchain. This component is local to the machine where the CLI is run.
* Sidecar proxy. Communicates to servers hosting AI services.
* Registry contract. Deals with organizations, members, services, types, and tags.
* MPE contract. Sends and receives funds and manages other functions related to payment channels; e.g., closing a channel or extending its expiry date.

This tool is used extensively in our tutorials and guides, to install it, follow the [setup guide](/docs/ai-consumers/setupguide).

See the [CLI documentation](http://snet-cli-docs.singularitynet.io/) for full details of actions the tool allows.

## Making a call to a SingularityNET service

### Install snet-cli
```sh
pip3 install snet-cli #if not done already
```

### Set an identity 
```sh
snet identity create user-ropsten mnemonic --mnemonic "YOUR MNEMONICS" --network ropsten
snet identity user-ropsten
```
### Deposit in Escrow and Create a Channel
```sh
snet account balance # check balance (all tokens belongs to this idenity)
snet account deposit 0.000001 # Deposit Token to MPE and Open a payment channel to the new service:
snet channel open-init <org_id> <group_name> 0.000001 +2days # Now open a Channel and transfer AGI in to the Channel
```
### Make a call to a Service 

#### JSON parameters

While protocol buffers are used for communication, call parameters are represented as JSON on the command line.

There are three ways of passing this JSON:
* via a cmdline parameter;
* via JSON file; and
* via stdin.

For example, in [this platform example](/docs/development/mpe-example#make-a-call-using-stateless-logic) we need to pass the following JSON as a parameter for the "add" method to our service:

```json
{"a": 10, "b": 32}
```

We can use three ways:

##### via cmdline parameter

```sh
snet client call <org_id> <service_id> <group_name> add '{"a":10,"b":32}'
```
##### via json file
```sh
echo '{"a":10,"b":32}' > p.txt
snet client call <org_id> <service_id> <group_name> add p.txt
```

##### via stdin
```
echo '{"a":10,"b":32}' | snet client call <org_id> <service_id> <group_name> add
```

### Modifiers

We've implemented several modifiers for this JSON parameter in order to simplify passing big files and to have the possibility to pass binary data (and not only base64 encoded data).

There are 3 possible modifiers:
* file      - read from file;
* b64encode - encode to base64; and
* b64decode - decode from base64.

For example, if you pass the following JSON as a parameter, then as an "image" parameter we will use the base64 encoded content of "1.jpeg"

```sh
'{"image_type": "jpg", "file@b64encode@image": "1.jpeg"}'
```

If we remove the b64encode modifier from the previous example, then we will pass 1.jpeg image in binary format without base64 encoding.  
