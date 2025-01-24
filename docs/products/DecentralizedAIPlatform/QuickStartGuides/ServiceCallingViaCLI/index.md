# Service Calling via CLI


## Step 1. Prerequisites

This guide assumes you've got a wallet (check 
[Getting Ready to Call AI CheckUp](/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToCallAICheckUp/) 
guide).  

This guide calls the calculator service (organization_id = `26072b8b6a0e448180f8c0e702ab6d2f`, 
service_id = `Exampleservice`) on the testnet `sepolia` (chain_id = `11155111`).

## Step 2. Install CLI

Install snet.cli

```sh
pip3 install snet.cli
```

Here’s the updated **Step 3. Set Configuration** section with the additional instructions for setting the default Ethereum RPC endpoint and a reference to the Alchemy API Key setup guide:


## Step 3. Set Configuration

To sign transactions, you need to create an identity and configure the network settings.

### 1. Set an Identity
Create an identity using your Ethereum private key. This identity will be used to sign transactions.

```sh
snet identity create your_name key --private-key <YOUR_PRIVATE_KEY>
```

- Replace `<YOUR_PRIVATE_KEY>` with your Ethereum wallet’s private key.
- You can also use other identity types. Check the [`snet identity create`](/docs/products/DecentralizedAIPlatform/CLI/Manual/Identity/#create) command for more details.

### 2. Set a Network
In this example, we use the `sepolia` testnet. Run the following command to set the network:

```sh
snet network sepolia
```

### 3. Set the Default Ethereum RPC Endpoint
To interact with the Ethereum network, you need to set the default Ethereum RPC endpoint. Use the Alchemy RPC endpoint for your network:

- **For Mainnet:**
  ```sh
  snet set default_eth_rpc_endpoint https://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>
  ```

- **For Sepolia (Testnet):**
  ```sh
  snet set default_eth_rpc_endpoint https://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>
  ```

Replace `<YOUR_API_KEY>` with your Alchemy API key. If you don’t have an API key yet, follow the [Alchemy API Key Setup Guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/) to create one.


### Additional Notes:
- Ensure your private key and API key are kept secure. Never share them publicly.
- For testing, use the Sepolia testnet to avoid real fund losses.


## Step 4. Deposit to MPE and Open Channel

To check your ETH, AGIX and MPE balance please run:

```sh
snet account balance 
```

If you don't have enough AGIX in MPE you can deposit it.

```sh
snet account deposit 0.00001
```

Open a channel and transfer AGIX to it.

```sh
snet channel open 26072b8b6a0e448180f8c0e702ab6d2f default_group 0.00001 +8days 
```

## Step 5. Make a call to a Service 

Now you can call a service.

```sh
snet client call 26072b8b6a0e448180f8c0e702ab6d2f Exampleservice default_group add '{"a":10,"b":32}'
```

It returns the result of the service call.

```sh
value: 42
```

### Service call on Windows

When calling the service in the way above on Windows, an error like "Decoding JSON has failed" may occur due to 
the specifics of this OS. To avoid this problem, call the service as follows:

- save the parameters in a JSON file

```json
{
  "a": 10, 
  "b": 32
}
```

- pass the path to the file with parameters to the call command

```sh
snet client call 26072b8b6a0e448180f8c0e702ab6d2f Exampleservice default_group add PATH/TO/JSON/params.json
```

> **Note:** You can also call the service this way on UNIX

To get more details, check out the [CLI manual](/docs/products/DecentralizedAIPlatform/CLI/Manual/)
