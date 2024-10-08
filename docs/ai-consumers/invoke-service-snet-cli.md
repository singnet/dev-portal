---
# Page settings
layout: default
keywords: call service, cli, get AGIX
comments: false
title: Making a call to a SingularityNET service
description: Making a call to a SingularityNET service

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

This tool is used extensively in our tutorials and guides, to install it, follow the [setup guide](/docs/setup/requirements).

See the [CLI documentation](http://snet-cli-docs.singularitynet.io/) for full details of actions the tool allows.

## Making a call to a SingularityNET service

### Step 1. Get some Ether

Ether is used to pay for interactions on the block chain (known as gas).

The transactions you make a call to SingularityNET are:
- Transfer AGIX into the multi-party escrow account,
- Create a payment channel for a service published in the SingularityNET registry, and
- Transfer AGIX into the payment channel and set the timeout

After that, you interact with the service directly and won't need to pay for further transactions unless you want to add more AGIX
or extend the timeout for the payment channel.

So how do you get Ether? The mainnet requires you to buy or mine it, but we're going to use a test net for now. Specifically Ropsten.

Luckily for test networks you can [go to a faucet to request some Ether for free](https://faucet.ropsten.be/).

To use the faucet you need to [create a wallet](/docs/ai-consumers/wallet), and then provide them with your wallet's public address.

### Step 2. Get some AGIX

We provide a faucet to get AGIX for either Ropsten or Kovan [networks](https://faucet.singularitynet.io/)

You'll need a github account to authenticate, and there after you can request AGIX every 24 hours. 


### Set an identity 
```sh
snet identity create user-ropsten mnemonic --mnemonic "YOUR MNEMONICS" --network ropsten
snet identity user-ropsten
```
### Deposit in Escrow and Create a Channel
```sh
snet account balance # check balance (all tokens belongs to this idenity)
snet account deposit 0.000001 # Deposit Token to MPE and Open a payment channel to the new service:
snet channel open-init <org_id> <group_name> 0.000001 +2days # Now open a Channel and transfer AGIX in to the Channel
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
