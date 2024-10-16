# Service Calling via CLI


### Step 1. Get some Ether

Ether is used to pay for interactions on the block chain (known as gas).

The transactions you make a call to SingularityNET are:
- Transfer AGIX into the multi-party escrow account,
- Create a payment channel for a service published in the SingularityNET registry, and
- Transfer AGIX into the payment channel and set the timeout

After that, you interact with the service directly and won't need to pay for further transactions unless you want add more AGIX
or extend the timeout for the payment channel.

So how do you get Ether? The mainnet requires you to buy or mine it, but we're going to use a test net for now. Specifically Ropsten.

Luckily for test networks you can [go to a faucet to request some Ether for free](https://faucet.ropsten.be/).

To use the faucet you need to [create a wallet](/docs/products/AIMarketplace/Forcomers/wallet/.md), and then provide them with your wallet's public address.

### Step 2. Get some AGIX

We provide a faucet to get AGIX for either Ropsten or Kovan [networks](https://faucet.singularitynet.io/)

You'll need a github account to authenticate, and there after you can request AGIX every 24 hours. 

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
snet channel open-init <org_id> <group_name> 0.000001 +2days # Now open a Channel and transfer AGIX in to the Channel
```
### Make a call to a Service 

#### JSON parameters

While protocol buffers are used for communication, call parameters are represented as JSON on the command line.

There are three ways of passing this JSON:
* via a cmdline parameter;
* via JSON file; and
* via stdin.

For example, in [this platform example](/docs/products/AIMarketplace/Forcomers/mpe-example/.md#make-a-call-using-stateless-logic) we need to pass the following JSON as a parameter for the "add" method to our service:

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
```sh
echo '{"a":10,"b":32}' | snet client call <org_id> <service_id> <group_name> add
```

### Modifiers

We've implemented several modifiers for this JSON parameter in order to simplify passing big files and to have the possibility to pass binary data (and not only base64 encoded data).

There are 3 possible modifiers:
* file      - read from file;
* b64encode - encode to base64; and
* b64decode - decode from base64.

For example, if you pass the following JSON as a parameter, then as an "image" parameter we will use the base64 encoded content of "1.jpeg"

```json
{"image_type": "jpg", "file@b64encode@image": "1.jpeg"}
```

If we remove the b64encode modifier from the previous example, then we will pass 1.jpeg image in binary format without base64 encoding.  
