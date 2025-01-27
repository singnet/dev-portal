# Guide for publish organizatiion and service via CLI

## Installing SNET CLI
(not required if you use Publisher for organization and service management) 

1) Prerequisites

For snet.cli you need Python 3.10 (or higher) with pip. Also you will need libudev and libusb 1.0
Install them by running:

```sh
sudo apt install libudev-dev libusb-1.0-0-dev
```

2) Install new version of snet.cli:

```sh
pip install snet.cli
```


3) **(OPTIONAL)** Enabling commands autocomplete
If you want to enable auto completion of commands, you should install the following package:

```sh
sudo apt install python3-argcomplete
```

```sh
sudo activate-global-python-argcomplete
```

4) Reinitialize ubuntu session (quit and login again). Everything should be working

5) Confirm installation with “snet” command

## Organization setup

1) Create an Identity in `snet.cli` for mainnet, if you already have an account with Ether, then you can use it, as an example:

```sh
snet identity create <IDENTITY> key --private-key <PVT-KEY> --network mainnet
```

OR

```sh
snet identity create <IDENTITY> mnemonic --network mainnet
```

You can create an identity with your crypto wallet private key or with seed phrases (mnemonic). You can export your private key from the wallet, and seed phrases are given upon creation of said wallet. Choose whichever you have.

2) Set the Default Ethereum RPC Endpoint

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

3) Add the organization name, id and the type of organization (use the same <ORGANIZATION_ID> for daemon configuration later in the guide)

```sh
snet organization metadata-init <ORG-NAME> <ORGANIZATION_ID> individual
```

organization_metadata.json file will be created, with metadata information you provided

```json
{
    "org_name": "<ORG-NAME>",
    "org_id": "<ORGANIZATION_ID>",
    "org_type": "individual",
    "description": {},
    "assets": {},
    "contacts": [],
    "groups": []
}
```

4) Add description about your organization

```sh
snet organization metadata-add-description --description "Describe your organization details here" --short-description  "This is short description of your organization" --url "https://anyurlofyourorganization"
```

Updated organization_metadata.json:

```json
{
    "org_name": "<ORG-NAME>",
    "org_id": "<ORGANIZATION_ID>",
    "org_type": "individual",
    "description": {
        "description": "Describe your organization details here ",
        "short_description": "This is short description of your organization",
        "url": "https://anyurlofyourorganization"
    },
    "assets": {},
    "contacts": [],
    "groups": []
}
```

5) Add in Recipient and group details

Use the same endpoint mentioned in the ETCD setup.

**groups**: Multiple groups can be associated with an organization, one payment type is associated with every group. 
**payment_address**: Address of the Service provider who would receive the payment
**payment_channel_storage_type**: Type of storage to manage payments (for example: ETCD)
**endpoint**: Storage endpoint for the clients to connect.
**--payment-expiration-threshold**: Check payment expiration threshold in the end of this document to get better understanding on how this parameter affects paymnet processing

Use parameters from previous steps: `<group_name>`, `<etcd-endpoint>`
Your full etcd endpoint is printed by docker etcd installation script in the end. Look for
**`ETCD ENDPOINT: https://<ETCD_ADDRESS>:2379`** (do not include **/health** at the end if it is present)

```sh
snet organization add-group --payment-expiration-threshold 40320 <group_name> <wallet_address> <etcd-endpoint>
```

Final command should look like this:

```sh
snet organization add-group --payment-expiration-threshold 40320 default_group 0x06A1D29e9FfA2415434A7A571235744F8DA2a514 https://your-etcd-endpont-ip-host:2379
```

This section will be added to your organization_metadata.json:

```json
"groups": [
        {
            "group_name": "default_group",
            "group_id": "gz/+/M9l/qxpfNzPn+T2XmTSPMKyphYyxSsQSPhEJXA=",
            "payment": {
                "payment_address": "0x06A1D29e9FfA2415434A7A571235744F8DA2a514",
                "payment_expiration_threshold": 100,
                "payment_channel_storage_type": "etcd",
                "payment_channel_storage_client": {
                    "connection_timeout": "100s",
                    "request_timeout": "5s",
                    "endpoints": [
                        "https://your-etcdendpont:2379"
                    ]
                }
            }
        }
    ]
```

You can see more about configuring and deploying the ETCD by following this [link](/docs/products/DecentralizedAIPlatform/ETCD/)

1) Optional information (skip if you don’t need it)

Add in any images related to your organization

```sh
snet organization metadata-add-assets [-h] [--metadata-file METADATA_FILE] ASSET_FILE_PATH ASSET_TYPE
```

 
Example:

```sh
snet organization metadata-add-assets image.png hero_image
```

Add in any contact details related to your organization

```sh
snet organization metadata-add-contact [-h] [--phone PHONE] [--email EMAIL]
                                       [--metadata-file METADATA_FILE]
                                       contact_type
```

Example:

```sh
snet organization metadata-add-contact --phone 123456789 --email yourorg@yourorg support
```

6) Check the metadata file created, you can correct data directly in file with any editor

```sh
cat organization_metadata.json
```

7) Publish the organization (note that this command creates a transaction, so you need to have ETH on your account wallet)

```sh
snet organization create <ORGANIZATION_ID>
```

## Service setup

**If you used Publisher to create your organization**, create your services there too. If you used snet-cli, continue with steps below:

1) Go to the folder with your gRPC service

```sh
cd path/to/your/service
```

2) Prepare service metadata to publish the service

First we need to create a service metadata file. You can do it by running:

```sh
snet service metadata-init \
	SERVICE_PROTOBUF_DIR \
	SERVICE_DISPLAY_NAME \
	--group-name PAYMENT_GROUP_NAME \
	--endpoints DAEMON_ENDPOINT \
	--fixed-price FIXED_PRICE
```

You can see more about configuring and deploying the Daemon by following this [link](/docs/products/DecentralizedAIPlatform/Daemon/daemon-setup/)


Where,
**SERVICE_PROTOBUF_DIR** - Directory which contains protobuf files of your service
**SERVICE_DISPLAY_NAME** - Display name of your service. You can choose any name you want.
**PAYMENT_GROUP_NAME** - Name of the payment group from organization metadata published in organization setup, step 4
**DAEMON_ENDPOINT** - Endpoint which will be used to connect to your service daemon. 
**FIXED_PRICE** - Price in AGIX for a single call to your service. We will set the price to 10^-8 AGIX (remember that 10^-8 AGIX = 1 COG).

Example: 

```bash
snet service metadata-init \
    service/service_spec \
    "your-service" \
    --group-name default_group \
    --fixed-price 0.00000001 \
    --endpoints https://<your-domain-or-public-ip>:<port>
```

1) Add service description

```sh
snet service metadata-add-description --json '{"description": "Description of my Service.", "url": "https://service.users.guide"}'
```

4) Add daemon metering address

To enable metering for your service run: (get metering address from section 7)

```sh
snet service metadata-add-daemon-addresses <GROUP_NAME> <METERING_ADDRESS>
```

5) Publish the service on SingularityNET

Now you can publish your service (service_metadata.json is used implicitly), use `<ORGANIZATION_ID>` and `<SERVICE_ID>`. Run this command:

```sh
snet service publish <ORGANIZATION_ID> <SERVICE_ID>
```

Note: This command also creates a transaction, so you must have GETH on your balance

Example:

```sh
snet service publish my_test_org my_test_service
```

6) Check if your service has been properly published

```sh
snet organization info <ORGANIZATION_ID>
```

## Using FileCoin

### API key

#### Generating

The Lighthouse API key is required to use FileCoin as a storage. To get it you should sign up on 
[Lighthouse](https://lighthouse.storage/), сhoose the subscription plan (optionally) that suits you and generate 
an API key. To get more information see [Lighthouse Quick Start](https://docs.lighthouse.storage/lighthouse-1/quick-start) 
or [Lighthouse creating API key](https://docs.lighthouse.storage/lighthouse-1/how-to/create-an-api-key).

> Note: Lighthouse API key is only needed to load files. It is not needed to use commands, that read files from FileCoin.

#### Setting up

To use API key in the CLI you can add it to the CLI config file as follows:

```sh
snet set filecoin_api_key <YOUR_LIGHTHOUSE_API_KEY>
```

or stop using it by running:

```sh
snet unset filecoin_api_key
```

> Note: This key is used regardless of identity.

### Publishing

#### Storage Type argument

Once you have added the API key, you can use Lighthouse to publish organization and service metadata, as well 
as service files. To select a storage type, you need to specify a new named argument `--storage` in the commands 
you already know. This argument is used in all commands related to creating a service or organization, creating 
and publishing their metadata and service files. 

#### Commands

Here is a list these commands:
- `snet organization create`
- `snet organization update-metadata`
- `snet service metadata-init`
- `snet service metadata-set-api`
- `snet service publish`
- `snet service update-metadata`

You can also select the storage type when running the `snet service metadata-init-utility` command. In addition,
to publish metadata only in FileCoin, without publishing in Registry, you can use the 
`snet service publish-in-filecoin` command.

#### Example

Here is an example of using `snet service publish` command:

```sh
> snet service publish -h
usage: snet service publish [-h] [--metadata-file METADATA_FILE] [--update-mpe-address] [--storage {ipfs,filecoin}] [--multipartyescrow-at MULTIPARTYESCROW_AT] [--registry-at REGISTRY_AT]
                            [--wallet-index WALLET_INDEX] [--yes] [--quiet | --verbose]
                            ORG_ID SERVICE_ID

positional arguments:
  ORG_ID                Id of the Organization
  SERVICE_ID            Id of service

options:
  -h, --help            show this help message and exit
  --metadata-file METADATA_FILE
                        Service metadata json file (default service_metadata.json)
  --update-mpe-address  Update mpe_address in metadata before publishing them
  --storage {ipfs,filecoin}
                        Choose storage for uploading metadata/protobuf file (defaults to 'ipfs')
  --multipartyescrow-at MULTIPARTYESCROW_AT, --mpe MULTIPARTYESCROW_AT
                        Address of MultiPartyEscrow contract, if not specified we read address from "networks"
  --registry-at REGISTRY_AT, --registry REGISTRY_AT
                        Address of Registry contract, if not specified we read address from "networks"

transaction arguments:
  --wallet-index WALLET_INDEX
                        Wallet index of account to use for signing (defaults to session.identity.default_wallet_index)
  --yes, -y             Skip interactive confirmation of transaction payload
  --quiet, -q           Quiet transaction printing
  --verbose, -v         Verbose transaction printing


> snet service publish --metadata-file service_metadata.json --storage filecoin -y <YOUR_ORGANIZATION_ID> <YOUR_SERVICE_ID>
```

As you can see from the example, there are two types of storage to choose from: `ipfs` and `filecoin`. If this 
argument is not specified, `ipfs` is used by default.

To get more information about using FileCoin use `-h` option in any command to see 
a detailed description.


## Calling service with snet.cli

1) Deposit in Escrow and Create a Channel

To call a SNET service you need to open a payment channel with MPE on it. To get MPE run:

```bash
snet account deposit 0.000001 # Deposit AGIX Token to MPE. 
```

```sh
snet channel open-init <org_id> <group_name> 0.000001 +7days # Open a Channel (for 7 days) and transfer AGIX in to the Channel
```

2) Make a call to a service

While protocol buffers are used for communication, call parameters are represented as JSON on the command line.

For example, in this platform example we need to pass the following JSON as a parameter for the “add” method to our service:

```sh
snet client call <org_id> <service_id> <group_name> add '{"a":10,"b":32}'
```

Confirm the transaction when asked to. After that you should see service response to your JSON payload

```sh
Price for this call will be 0.0000001 AGIX (use -y to remove this warning).
Proceed? (y/n): y
value: 42.0
```

## Claiming payment

When users are calling your service they send credentials that allow you to collect tokens they spent on service from their payment channel. To collect these tokens you have to run this command:

```sh
snet treasurer claim-all --endpoint <daemon-endpoint>
```

**If the user's payment channel closes before you have collected your payment - you will lose your money. If for whatever reason you lose data on your ETCD cluster - you won’t be able to collect tokens either. That’s because payment channel credentials are located there. It is in your best interest to properly manage ETCD and its data, and to collect payment periodically.**

## Payment expiration threshold

When you set up payment groups for your organization a special parameter was used: **--payment-expiration-threshold 40320**. This parameters makes daemon working on that group to forbid the access to your service if the user's payment channel will expire in the next 40320 blocks. It means that if users payment channel will expire in less than a week (40320 blocks * ~15 sec/block = 604800 seconds = 10080 minutes = 168 hours = 7 days) he won’t be able to use your services. This allows you to set up scheduled payment claims without worrying about your money. If you claim all payments at least once a week, users won’t be able to return their tokens after calling your services. That’s because their payment channel won’t expire before your scheduled payment collection. It is recommended to collect it twice a week. You can do it once a week, but with less margin for errors.

Run this command twice a week (you can automate it with cron):

```sh
snet treasurer claim-all --endpoint <daemon-endpoint>
```

## Closing payment channel (recollecting your tokens as client)

When you open a payment channel to call services, you are doing this as a client. So this step's only purpose is to recollect your tokens from opening a testing channel. You probably won’t need it again.

While your payment channel is open, you can’t take your tokens back. You have to wait until it expires (in this guide it was open for +2days, so it will expire in roughly that time) before you can recollect your tokens. To do so run:

```sh
snet channel claim-timeout-all
```