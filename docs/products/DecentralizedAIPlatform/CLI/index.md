# The SingularityNET command line interface (CLI)

The SingularityNET command line interface (CLI) is the primary tool for interacting with the
platform's smart contracts, managing deployed services, and managing funds. It is aimed at service providers. In the near future, it will be supplemented by a web-based dashboard and control panel.

The CLI provides commands to interface with the Blockchain in the following ways:
* Creating and managing identities;
* Registering and managing the organizations, members, services, types, and tags on the
SingularityNET Registry;
* Claiming funds from customers using MPE and payment channels;
* Reading and writing metadata and Protobuf specs about AI services (these are stored on IPFS, while basic service parameters can be fetched from Blockchain contracts); and
* Connecting to different networks like local testnets, Sepolia, and the Ethereum mainnet.

The CLI also provides service development and deployment support. It can set up new services by generating service metadata, Protobuf specs, and code templates provided by the SingularityNET Foundation. The CLI interacts with daemons for each service.
Security-wise, the CLI follows the same guidelines as provided by Ethereum for storing the private keys. When user identities are created and registered with a client, the CLI safely stores the details on the local machine and retrieves them only when it needs to interact with the Blockchain.

<ImageViewer src="/assets/images/products/AIMarketplace/CLI/how_cli_works.jpg" alt="how_cli_works"/>

The CLI requires and connects to four critical components:
* User identity management. Involves user registration, managing identities and sessions,
and locking/unlocking accounts for transacting with the Blockchain. This component is local to the machine where the CLI is run.
* Sidecar proxy. Communicates to servers hosting AI services.
* Registry contract. Deals with organizations, members, services, types, and tags.
* MPE contract. Sends and receives funds and manages other functions related to payment channels; e.g., closing a channel or extending its expiry date.

This tool is used extensively in our tutorials and guides, to install it, follow the [setup guide](/docs/products/AIMarketplace/ForConsumers/local-singularitynet/).

See the [CLI documentation](/docs/products/DecentralizedAIPlatform/CLI/Manual/) for full details of actions the tool allows.

## Making a call to a SingularityNET service

### Step 1. Get some Ether

Ether is used to pay for interactions on the block chain (known as gas).

The transactions you make a call to SingularityNET are:
- Transfer ASI (FET) into the multi-party escrow account,
- Create a payment channel for a service published in the SingularityNET registry, and
- Transfer ASI (FET) into the payment channel and set the timeout

After that, you interact with the service directly and won't need to pay for further transactions unless you want add more ASI (FET)
or extend the timeout for the payment channel.

So how do you get Ether? The mainnet requires you to buy or mine it, but we're going to use a test net for now.

Luckily for test networks you can [go to a faucet to request some Ether for free](https://faucet.singularitynet.io/).

To use the faucet you need to [create a wallet](/docs/products/AIMarketplace/ForConsumers/metamask-wallet/), and then provide them with your wallet's public address.

### Step 2. Get some ASI (FET)

We provide a faucet to get ASI (FET) for Sepolia [network](https://faucet.singularitynet.io/)

You'll need a github account to authenticate, and there after you can request ASI (FET) every 24 hours. 

### Install snet-cli
```sh
pip3 install snet-cli #if not done already
```

### Set an Identity 
```sh
snet identity create user-sepolia mnemonic --mnemonic "YOUR MNEMONICS" --network sepolia
snet identity user-sepolia
```

### Set the Default Ethereum RPC Endpoint
To interact with the Ethereum network, you need to set the default Ethereum RPC endpoint. Use the Alchemy RPC endpoint for your network:

- **For Mainnet**:  
  ```sh
  snet set default_eth_rpc_endpoint https://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>
  ```

- **For Testnet (Sepolia)**:  
  ```sh
  snet set default_eth_rpc_endpoint https://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>
  ```

Replace `<YOUR_API_KEY>` with your Alchemy API key. If you don’t have one, follow the [Alchemy API Key Setup Guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/).

### Deposit in Escrow and Create a Channel
```sh
snet account balance # check balance (all tokens belong to this identity)
snet account deposit 0.000001 # Deposit tokens to MPE and open a payment channel to the new service
snet channel open-init <org_id> <group_name> 0.000001 +2days # Open a channel and transfer ASI (FET) into the channel
```
### Make a call to a Service 

#### JSON parameters

While protocol buffers are used for communication, call parameters are represented as JSON on the command line.

There are three ways of passing this JSON:
* via a cmdline parameter;
* via JSON file; and
* via stdin.

For example, in [this platform example](/docs/products/AIMarketplace/Publisher/mpe-example1/.md#make-a-call-using-stateless-logic) we need to pass the following JSON as a parameter for the "add" method to our service:

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
