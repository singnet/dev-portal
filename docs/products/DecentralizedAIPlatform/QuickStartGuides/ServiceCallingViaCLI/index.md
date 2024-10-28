# Service Calling via CLI


## Step 1. Prerequisites

This guide assumes you've got a wallet (check 
[Getting Ready to Call AI CheckUp](/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToCallAICheckUp/) 
guide).  

This guide calls the calculator service (organization_id = `26072b8b6a0e448180f8c0e702ab6d2f`, 
service_id = `Exampleservice`) on the testnet `sepolia` (chain_id = `11155111`).

## Step 2. Install CLI

### Install snet.cli
```sh
pip3 install snet.cli
```

## Step 3. Set configuration

To sign transactions you need to create an identity.

### Set an identity 
```sh
snet identity create your_name key --private-key <YOUR_PRIVATE_KEY>
```

You can also use other identity types (check [`snet identity create`](/docs/products/DecentralizedAIPlatform/CLI/Manual/Identity/#create) command).

### Set a network

In this example we use the `sepolia` testnet.

```sh
snet network sepolia
```

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
snet channel open-init 26072b8b6a0e448180f8c0e702ab6d2f default_group 0.00001 +8days 
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
