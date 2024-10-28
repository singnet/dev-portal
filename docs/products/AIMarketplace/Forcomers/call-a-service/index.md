# Call a service

## Step 1. Get some Ether

Ether is used to pay for interactions on the block chain (known as gas).

The transactions you make a call to SingularityNET are:
- Transfer AGIX into the multi-party escrow account,
- Create a payment channel for a service published in the SingularityNET registry, and
- Transfer AGIX into the payment channel and set the timeout

After that, you interact with the service directly and won't need to pay for further transactions unless you want add more AGIX
or extend the timeout for the payment channel.

So how do you get Ether? The mainnet requires you to buy or mine it, but we're going to use a test net for now.


To use the faucet you need to [create a wallet](/docs/products/AIMarketplace/Forcomers/wallet/), and then provide them with your wallet's public address.

## Step 2. Get some AGIX

You'll need a github account to authenticate, and there after you can request AGIX every 24 hours.

## Step 3. Make a Call from the Marketplace

Follow this [video tutorial](https://www.youtube.com/watch?v=j_9yLRQ1bE4).

## Step 4. Setup the snet.cli tool

The `snet` CLI tool is your swiss army knife for working with SingularityNET. It lets you publish services, manage your identities, and query what AI services are available to use. If you are familar with cloud providers like Amazon or Google, this is our decentralised equivalent of their `aws` or `gcloud` respectively.

You can install the CLI with pip:

```sh
sudo pip3 install snet.cli
```

You then need to create an identity that matches your metamask account, since this is where the faucets sent all your test tokens too.

Create an Identity in snet.cli for Sepolia, if you already have an account with ether, then you can use it, as an example:

`snet identity create <IDENTITY> key --private-key <PVT-KEY> --network sepolia`

OR

`snet identity create <IDENTITY> mnemonic --network sepolia`

You will be prompted for the private key for your wallet. To get this, click "Show your account details" on metamask, and "export your private key". This will ask for your metamask password. Once you enter it, you can then copy your private key and paste it into the snet cli. Next, you should probably copy some meaningless text to your clipboard to avoid accidentally pasting the key somewhere it shouldn't go.

WARNING: Your private key is like the password to your online banking. Be very careful with it. Anyone who has it can control where your funds go. 

SingularityNET takes your security seriously and any vulnerabilities can be reported on our Github (if minor), or emailed to [security@singularitynet.io](mailto:security@singularitynet.io)

## Step 5. Make a Call from the Command Line with snet.cli

1) Deposit in Escrow and Create a Channel

To call a SNET service you need to open a payment channel with MPE on it. To get MPE run:

``` bash
snet account deposit 0.000001 # Deposit AGIX Token to MPE. 

snet channel open-init <org_id> <group_name> 0.000001 +7days # Open a Channel (for 7 days) and transfer AGIX in to the Channel
```

2) Make a call to a service

While protocol buffers are used for communication, call parameters are represented as JSON on the command line.

For example, in this platform example we need to pass the following JSON as a parameter for the “add” method to our service:

`snet client call <org_id> <service_id> <group_name> add '{"a":10,"b":32}'`

Confirm the transaction when asked to. After that you should see service response to your JSON payload

```sh
Price for this call will be 0.0000001 AGI (use -y to remove this warning).
Proceed? (y/n): y
value: 42.0
```

## Step 6. Congratulations!

You've managed to set up your environment to interact with SingularityNET and call services via the marketplace and the command line.

While these ways of working with SingularityNET are very powerful (we've barely touched on all the things the CLI is used for),
this isn't how you'd necessarily want to build an application that is integrated with SingularityNET. To do that, we recommend 
that you learn about our SDK which is the next article in our Getting Started series.
