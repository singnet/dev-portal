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

This tool is used extensively in our tutorials and guides, to install it, follow the [setup guide](/docs/setup/requirements).

See the [CLI documentation](http://snet-cli-docs.singularitynet.io/) for full details of actions the tool allows.

## Making a call to a SingularityNET service

### Step 1. Get some Ether

Ether is used to pay for interactions on the block chain (known as gas).

The transactions you make a call to SingularityNET are:
- Transfer AGI into the multi-party escrow account,
- Create a payment channel for a service published in the SingularityNET registry, and
- Transfer AGI into the payment channel and set the timeout

After that, you interact with the service directly and won't need to pay for further transactions unless you want add more AGI
or extend the timeout for the payment channel.

So how do you get Ether? The mainnet requires you to buy or mine it, but we're going to use a test net for now. Specifically Ropsten.

Luckily for test networks you can [go to a faucet to request some Ether for free](https://faucet.ropsten.be/).

To use the faucet you need to [create a wallet](/docs/ai-consumers/wallet), and then provide them with your wallet's public address.

### Step 2. Get some AGI

We provide a faucet to get AGI for either Ropsten or Kovan [networks](https://faucet.singularitynet.io/)

You'll need a github account to authenticate, and there after you can request AGI every 24 hours. 

### JSON parameters

While protocol buffers are used for communication, call parameters are represented as JSON on the command line.

There are three ways of passing this JSON:
* via a cmdline parameter;
* via JSON file; and
* via stdin.

For example, in [this platform example](https://github.com/singnet/example-service) we need to pass the following JSON as a parameter for the "add" method to our service, proto definition can be found [here](https://github.com/singnet/example-service/blob/master/service/service_spec/example_service.proto) :

```json
{"a": 10, "b": 32}
```

We can use three ways:
For more details refer to the [section](http://snet-cli-docs.singularitynet.io/client.html) 

```sh
# via cmdline parameter
snet client call org_id service_id default_group add '{"a":10,"b":32}'

# via json file
echo '{"a":10,"b":32}' > p.txt
snet client call 0 0.1 localhost:8080 add p.txt

# via stdin
echo '{"a":10,"b":32}' | snet client call 0 0.1 localhost:8080 add
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
