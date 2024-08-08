## Port forwarding from domain to daemon host (Existing domain required)

This step depends on the web server which you are using. Set the port forwarding from your `<DAEMON_PORT>` to `<DAEMON_INTERNAL_ADDRESS>`:`<DAEMON_PORT>`

**Example** : `your_awesome_domain.com:<DAEMON_PORT>` --> `<DAEMON_INTERNAL ADDRESS>:<DAEMON_PORT>`

### Domain certificates generation (skip of you already have SSL enabled on your domain)
1) Install certbot following this instructions:

[https://certbot.eff.org/instructions?ws=other&os=ubuntufocal](https://certbot.eff.org/instructions?ws=other&os=ubuntufocal)

2) Create domain certificates:

Generate certificates with command:

`sudo certbot certonly`

(Follow prompts and choose standalone version, enter your daemon domain from item 1 when asked to. Ex. your_awesome_domain.com)
Get certificates path with next command (you should see 2 files **fullchain.pem** and **privkey.pem**):

`sudo certbot certificates`

3) Check if certificate renewal is enabled

`sudo systemctl show certbot.timer`

Certificates are valid for 90 days. You will have to restart your Daemon in future when you have updated the certs

**Result**: Now you should have "ssl_cert": fullchain.pem and "ssl_key": privkey.pem parameters for the daemon config file. This allows you to use the httpS daemon endpoint.

### ETCD setup
#### Single node docker setup
1) Download installation script (works only on ubuntu)

`wget https://raw.githubusercontent.com/singnet/platform-setup/main/docker-etcd-setup.sh`

2) If you want to host your ETCD node on a separate network/Ethernet you should add its domain name in the configuration. To do so add the domain to hosts section of server.json file:

```
 \"hosts\": [
        \"${public_ip}\",
        \"${private_ip}\",
        \"your.domain.com\", << Add it here, keep the \" around it
        \"127.0.0.1\"
    ],
```
3) Execute it (user must have sudo permissions)

`bash docker-etcd-setup.sh`
**!!!Data folder of the ETCD cluster will be created in the directory you are currently in. ALL YOUR EARNED MONEY WILL BE IN THIS FOLDER SO YOU SHOULDN’T LOSE IT **

4) Follow instructions of script

5) Read important information below

When asked for certificates validity time limit you can set them as long as you like. You won’t have to renew these certificates and restart the ETCD container. If you have to renew the certificates run these commands in the folder with current certificates:

```
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -

cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server.json | cfssljson -bare server

cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=peer member-1.json | cfssljson -bare member-1

cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client client.json | cfssljson -bare client

```

If for some reason your ETCD container is down use this command:

`docker start docker-etcd-node-1`

If your ETCD node keeps crashing, check its logs with this command and debug it:

`docker logs docker-etcd-node-1`

**Result**: If everything was done correctly you would have seen ETCD INSTALLED SUCCESSFULLY. If that is the case, now you should have a running docker container with ETCD cluster and new certificates for ETCD (path to them will be printed by script, look for CERTIFICATES PATH)

### Daemon setup
1) Download latest release from https://github.com/singnet/snet-daemon/releases

`wget https://github.com/singnet/snet-daemon/releases/download/v5.1.2/snetd-linux-amd64-v5.1.2`

(wget command for downloading snetd v5.1.2)

2) Make sure that snetd file is executable

`chmod +x snetd-linux-amd64-v5.1.2`

3) Create config file for daemon

`touch snetd.config.json`

4) **(OPTIONAL)** Put executable file in `/usr/bin folder`

`cp snetd-linux-amd64-v5.1.2 /usr/bin/snetd`

### Installing SNET-cli
(not required if you use Publisher for organization and service management) 

1) Prerequisites

For snet-cli you need Python 3.11 (or older) with pip. Also you will need libudev and libusb 1.0
Install them by running:

`sudo apt install libudev-dev libusb-1.0-0-dev`

2) Install new version of snet-cli:

`pip install snet.snet-cli`


3) **(OPTIONAL)** Enabling commands autocomplete
If you want to enable auto completion of commands, you should install the following package:

`sudo apt install python3-argcomplete`

`sudo activate-global-python-argcomplete`

4) Reinitialize ubuntu session (quit and login again). Everything should be working

5) Confirm installation with “snet” command

### gRPC Service development (example)

1) Create proto file `<name>.proto` (example.proto):

```
syntax = "proto3";
 
package example;
 
## Creating a structure for the request ##
message Query {
    string query = 1;
    bool _type = 2;
}
 
## Creating a structure for the response ## 
message Answer {
    string answer = 1;
    string answer2 = 2;
    string answer3 = 3;
}
 
## Service name ##
service Example {
    ## The signature of the called main method ##
    rpc call(Query) returns (Answer) {}
}
```

2) Install GRPC

`python -m pip install grpcio grpcio-tools`

3) Generate `<name>_pb2_grpc.py` and `<name>_pb2.py` (example_pb2_grpc.py и example_pb2.py)

`python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. <name>.proto`

4) Create a server

```
## Importing the necessary libraries of the service ##
import time
import logging
import argparse
from utility import Model
from concurrent import futures
 
## Importing grpc and auto generated files ##
import grpc
import example_pb2
import example_pb2_grpc
 
_ONE_DAY_IN_SECONDS = 60 * 60 * 24
 
## Host and port on which the server listens ##
parser = argparse.ArgumentParser(description='')
parser.add_argument("--host", type=str, default="127.0.0.1",  help= "host" )
parser.add_argument("--port", type=int, default=8010,  help= "port" )
args = parser.parse_args()
 
## Creating a class inherited from <name>Servicer (ExampleServicer) from Example_pb2_grpc ##
class ExampleServicer(example_pb2_grpc.ExampleServicer):
    def __init__(self):
        self.model = Model()
 
    ## Redefining the main method from proto, which will be called ##
    ## Accepts and returns the corresponding structures defined in the proto file ##
    def call(self, request, context):
        try:
            query = request.query
            _type = request._type
            result, result2, result3 = self.model.predict(query, _type)
            print(result, result2, result3)
        except Exception as e:
            print("Error: {}".format(e))
            raise Exception("Error: {}".format(e))
        return example_pb2.Answer(answer=result, answer2=result2, answer3=result3)
 
## Replacing Example with the desired <name> ##
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    example_pb2_grpc.add_ExampleServicer_to_server(ExampleServicer(), server)
    server.add_insecure_port('{}:{}'.format(args.host, args.port))
    server.start()
    print('Server start')
 
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)
 
if __name__ == '__main__':
    logging.basicConfig()
    serve()
```

5) Create a client

```
import os
import sys
import time
import random
import logging
import argparse
 
## All names with 'Example' are replaced with the current name of your service ##
## Importing grpc and auto generated files ##
import grpc
import example_pb2
import example_pb2_grpc
 
parser = argparse.ArgumentParser()
 
## Host and port on which the server listens ##
parser.add_argument("--host", default="127.0.0.1", type=str, help="host")
parser.add_argument("--port", default=8010, type=int, help="port")
args = parser.parse_args()
 
def ExampleClient(stub):
  s_time = time.time()
  query = "some query"
  _type = True
 
  ## The rpc method defined in the proto file is called, and the required structure is passed to it as input ##
  result = stub.call(example_pb2.Query(query=query, _type=_type))
  r_time = time.time() - s_time
 
  print('\n########################################################################################\n')
  print("{:.3}s\n{}".format(r_time, result.answer))
  print('\n########################################################################################\n')
 
def run():
  with grpc.insecure_channel('{}:{}'.format(args.host, args.port)) as channel:
    stub = example_pb2_grpc.ExampleStub(channel)
    ExampleClient(stub)
 
if __name__ == '__main__':
  logging.basicConfig()
  run()
```

### Enabling metering

1) Run this python script to generate address and key for metering:

All necessary packets should be already installed if you installed snet-cli

```
from eth_account import Account
import secrets

key = secrets.token_hex(32)
acct = Account.privateKeyToAccount(key)
print("SAVE BUT DO NOT SHARE PRIVATE KEY")
print("Private key: ", key)
print("Address: ", acct.address)

```

2) Remember this information. You will need it while configuring daemon and publishing service

Add Address (**<METERING_ADDRESS>**) when publishing your service and replace **<METERING_KEY>** with a Private key in the next step.

### Organization setup

Use [Publisher Portal](https://publisher.singularitynet.io/) for registration in mainnet (Production). If you want to use testnet (sepolia) do steps below: 

1) Create an Identity in snet-cli for mainnet, if you already have an account with Ether, then you can use it, as an example:

`snet identity create <IDENTITY> key --private-key <PVT-KEY> --network mainnet`

OR

`snet identity create <IDENTITY> mnemonic --network mainnet`

You can create an identity with your crypto wallet private key or with seed phrases (mnemonic). You can export your private key from the wallet, and seed phrases are given upon creation of said wallet. Choose whichever you have.

2) Add the organization name, id and the type of organization (use the same <ORGANIZATION_ID> for daemon configuration later in the guide)

`snet organization metadata-init <ORG-NAME> <ORGANIZATION_ID> individual`

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

3) Add description about your organization

`snet organization metadata-add-description --description "Describe your organization details here" --short-description  "This is short description of your organization" --url "https://anyurlofyourorganization"`

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

4) Add in Recipient and group details

Use the same endpoint mentioned in the ETCD setup.

**groups**: Multiple groups can be associated with an organization, one payment type is associated with every group. 
**payment_address**: Address of the Service provider who would receive the payment
**payment_channel_storage_type**: Type of storage to manage payments (for example: ETCD)
**endpoint**: Storage endpoint for the clients to connect.
**--payment-expiration-threshold**: Check payment expiration threshold in the end of this document to get better understanding on how this parameter affects paymnet processing

Use parameters from previous steps: `<group_name>`, `<etcd-endpoint>`
Your full etcd endpoint is printed by docker etcd installation script in the end. Look for
**`ETCD ENDPOINT: https://<ETCD_ADDRESS>:2379`** (do not include **/health** at the end if it is present)

`snet organization add-group --payment-expiration-threshold 40320 <group_name> <wallet_address> <etcd-endpoint>`

Final command should look like this:

`snet organization add-group --payment-expiration-threshold 40320 default_group 0x06A1D29e9FfA2415434A7A571235744F8DA2a514 https://your-etcd-endpont-ip-host:2379`

This section will be added to your organization_metadata.json:

```
"groups": [
        {
            "group_name": "default_groups",
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

5) Optional information (skip if you don’t need it)

Add in any images related to your organization

`snet organization metadata-add-assets [-h] [--metadata-file METADATA_FILE] ASSET_FILE_PATH ASSET_TYPE`

 
Example:

`snet organization metadata-add-assets image.png hero_image`


Add in any contact details related to your organization

```
snet organization metadata-add-contact [-h] [--phone PHONE] [--email EMAIL]
                                       [--metadata-file METADATA_FILE]
                                       contact_type
```

Example:

`snet organization metadata-add-contact --phone 123456789 --email yourorg@yourorg support`

6) Check the metadata file created, you can correct data directly in file with any editor

`cat organization_metadata.json`

7) Publish the organization (note that this command creates a transaction, so you need to have ETH on your account wallet)

`snet organization create <ORGANIZATION_ID>`

### Service setup

**If you used Publisher to create your organization**, create your services there too. If you used snet-cli, continue with steps below:

1) Go to the folder with your gRPC service

`cd path/to/your/service`

2) Prepare service metadata to publish the service

First we need to create a service metadata file. You can do it by running:

```
snet service metadata-init \
	SERVICE_PROTOBUF_DIR \
	SERVICE_DISPLAY_NAME \
	--group-name PAYMENT_GROUP_NAME \
	--endpoints DAEMON_ENDPOINT \
	--fixed-price FIXED_PRICE
```

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
    --group-name default_groups \
    --fixed-price 0.00000001 \
    --endpoints https://<your-domain-or-public-ip>:<port>
```

3) Add service description

`snet service metadata-add-description --json '{"description": "Description of my Service.", "url": "https://service.users.guide"}'`

4) Add daemon metering address

To enable metering for your service run: (get metering address from section 7)

`snet service metadata-add-daemon-addresses <GROUP_NAME> <METERING_ADDRESS>`

5) Publish the service on SingularityNET

Now you can publish your service (service_metadata.json is used implicitly), use `<ORGANIZATION_ID>` and `<SERVICE_ID>`. Run this command:

`snet service publish <ORGANIZATION_ID> <SERVICE_ID>`

Note: This command also creates a transaction, so you must have GETH on your balance

Example:

`snet service publish my_test_org my_test_service`

6) Check if your service has been properly published

`snet organization info <ORGANIZATION_ID>`

### Final configuration

1) Copy etcd certificates to daemon host (skip if daemon and etcd are located on same host)

`scp /var/lib/etcd/cfssl/{client.pem,ca.pem,client-key.pem} user@daemon_host:<PATH_TO_ETCD_CERTS>`

2) Copy domain certificates to daemon host (skip if daemon and web server are located on same host)

`scp /etc/letsencrypt/live/<DAEMON_DOMAIN>/{fullchain.pem,privkey.pem} user@daemon_host:<PATH_TO_DOMAIN_CERTS>`

3) Adjust daemon configuration (replace all <****> with necessary data, including all certificates, organization id, service id, daemon group and addresses)

`$EDITOR snetd.config.json`

Add following parameters: 

```json
{
  "blockchain_enabled": true,
  "blockchain_network_selected": "main",
  "daemon_end_point": "0.0.0.0:<DAEMON_PORT>",
  "daemon_group_name": "<DAEMON_GROUP>",
  "ipfs_end_point": "http://ipfs.singularitynet.io:80",
  "organization_id": "<ORGANIZATION_ID>",
  "service_id": "<SERVICE_ID>",
  "passthrough_enabled": true,
  "passthrough_endpoint": "http://<SERVICE_HOST>:<SERVICE_PORT>",
  "payment_channel_cert_path": "<PATH_TO_ETCD_CERTS>/client.pem",
  "payment_channel_ca_path": "<PATH_TO_ETCD_CERTS>/ca.pem",
  "payment_channel_key_path": "<PATH_TO_ETCD_CERTS>/client-key.pem",
  "ssl_cert": "<PATH_TO_DOMAIN_CERTS>/fullchain.pem",
  "ssl_key": "<PATH_TO_DOMAIN_CERTS>/privkey.pem",
  "metering_enabled": true,
  "metering_end_point": "https://marketplace-mt-v2.singularitynet.io",
  "pvt_key_for_metering": "<METERING_KEY>",
  "log": {"level": "debug", "output": {"type": "stdout"}}
}

```

Your daemon config file should look something like this:

```
{
  "blockchain_enabled": true,
  "blockchain_network_selected": "main",
  "daemon_end_point": "0.0.0.0:7000",
  "daemon_group_name": "default_group",
  "ipfs_end_point": "http://ipfs.singularitynet.io:80",
  "organization_id": "my_test_org",
  "service_id": "my_test_service",
  "passthrough_enabled": true,
  "passthrough_endpoint": "http://127.0.0.1:8010",
  "payment_channel_cert_path": "/home/user/etcd-certs/client.pem",
  "payment_channel_ca_path": "/home/user/etcd-certs/ca.pem",
  "payment_channel_key_path": "/home/user/etcd-certs/client-key.pem",
  "ssl_cert": "/home/user/domain-certs/fullchain.pem",
  "ssl_key": "/home/user/domain-certs/privkey.pem",
  "metering_enabled": true,
  "metering_end_point": "https://marketplace-mt-v2.singularitynet.io",
  "pvt_key_for_metering": "947cddc74476bac4ac0a9ddbf8a136a0c7b4a8d364c6252b2d91e4226fe1bc1f",
  "log": {"level": "debug", "output": {"type": "stdout"}}
}

```

4) Launch snet daemon with command:

`/path/to/snetd -c <PATH_TO_DAEMON_CONFIG_FILE>`

5) If everything was configured correctly, you should see this in stdout of daemon

`"DEBUG[] starting daemon" `

### Starting service

1) Start the service you created in section 4

2) Start snetd daemon configured with yours service endpoint(check your configuration)

`/path/to/snetd -c <PATH_TO_DAEMON_CONFIG_FILE>`

### Calling service with snet-cli

1) Deposit in Escrow and Create a Channel

To call a SNET service you need to open a payment channel with MPE on it. To get MPE run:

```bash
snet account deposit 0.000001 # Deposit AGIX Token to MPE. 

snet channel open-init <org_id> <group_name> 0.000001 +7days # Open a Channel (for 7 days) and transfer AGIX in to the Channel
```

2) Make a call to a service

While protocol buffers are used for communication, call parameters are represented as JSON on the command line.

For example, in this platform example we need to pass the following JSON as a parameter for the “add” method to our service:

`snet client call <org_id> <service_id> <group_name> add '{"a":10,"b":32}'`

Confirm the transaction when asked to. After that you should see service response to your JSON payload

```
Price for this call will be 0.0000001 AGI (use -y to remove this warning).
Proceed? (y/n): y
value: 42.0
```

### Claiming payment

When users are calling your service they send credentials that allow you to collect tokens they spent on service from their payment channel. To collect these tokens you have to run this command:

`snet treasurer claim-all --endpoint <daemon-endpoint>`

**If the user's payment channel closes before you have collected your payment - you will lose your money. If for whatever reason you lose data on your ETCD cluster - you won’t be able to collect tokens either. That’s because payment channel credentials are located there. It is in your best interest to properly manage ETCD and its data, and to collect payment periodically.**

### Payment expiration threshold

When you set up payment groups for your organization a special parameter was used: **--payment-expiration-threshold 40320**. This parameters makes daemon working on that group to forbid the access to your service if the user's payment channel will expire in the next 40320 blocks. It means that if users payment channel will expire in less than a week (40320 blocks * ~15 sec/block = 604800 seconds = 10080 minutes = 168 hours = 7 days) he won’t be able to use your services. This allows you to set up scheduled payment claims without worrying about your money. If you claim all payments at least once a week, users won’t be able to return their tokens after calling your services. That’s because their payment channel won’t expire before your scheduled payment collection. It is recommended to collect it twice a week. You can do it once a week, but with less margin for errors.

Run this command twice a week (you can automate it with cron):

`snet treasurer claim-all --endpoint <daemon-endpoint>`

### Closing payment channel (recollecting your tokens as client)

When you open a payment channel to call services, you are doing this as a client. So this step's only purpose is to recollect your tokens from opening a testing channel. You probably won’t need it again.

While your payment channel is open, you can’t take your tokens back. You have to wait until it expires (in this guide it was open for +2days, so it will expire in roughly that time) before you can recollect your tokens. To do so run:

`snet channel claim-timeout-all`