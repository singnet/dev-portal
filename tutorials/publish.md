---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to Publish a SingularityNET Service
description: Getting your service deployed on to the SingularityNET platform

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

# Page navigation
page_nav:
    prev:
        content: Back to tutorials
        url: '/tutorials'
    next:
        content: View all docs
        url: '/docs'
---

[naming-standards]: /docs/concepts/naming-standards

## Step 1. Dependencies

Run this tutorial from a bash terminal.

In this tutorial we will publish an example service in SingularityNET using Ropsten Test Network.

We build a [Docker](https://www.docker.com/) Image using this [Dockerfile](https://github.com/singnet/dev-portal/blob/master/tutorials/docker/Dockerfile) 
that is set up with all the required dependencies but if you prefer you can install the dependencies by yourself in your own workstation.

Using a Docker Image is usually easier (you don't need to be a Docker guru to follow this tutorial).
To go this way, just proceed to the next tutorial step.

If you want to install the dependencies by yourself, check all the [requirements](/docs/setup/requirements) 
here and jump to [Step 3](#step-3-setup-snet-cli-and-create-your-identity).

## Step 2. Setup a Docker container

-------------------------------
_Before following, make sure you've installed:_

* _Docker ([https://docs.docker.com/install](https://docs.docker.com/install))_

_If you are not familiar with Docker you may want to take a look at its official 
[Get Started Guide](https://docs.docker.com/get-started/)._

_Note that this tutorial assumes your user is part of the `docker` group that has permissions to contact the daemon. To ensure this, use `sudo adduser $USER docker` or read more [in the docker documentation](https://docs.docker.com/install/linux/linux-postinstall/)._

-------------------------------

To secure payments, to set up your own ETCD Cluster, refer to the docs [ETCD Setup](/docs/concepts/etcdsetup)

Build your own tutorial Docker image directly from our git repo using the following command:

```sh
docker build -t snet_publish_service https://github.com/singnet/dev-portal.git#master:/tutorials/docker
```

Setup environment variables (they are explained later in this tutorial as they're used):

```sh
ORGANIZATION_ID="$USER"-org
ORGANIZATION_NAME="The $USER's Organization"

SERVICE_ID=example-service
SERVICE_NAME="SNET Example Service"
#define the Public IP/domain name , that will be used to access your service
SERVICE_IP=localhost
SERVICE_PORT=7003
DAEMON_PORT=7000
DAEMON_HOST=0.0.0.0

USER_ID=$USER

# to make your snet's configs persistent
SNET_CLI_HOST=$HOME/.snet/
SNET_CLI_CONTAINER=/root/.snet/

# ETCD local storage
ETCD_HOST=$HOME/.snet/etcd/example-service/
ETCD_CONTAINER=/opt/singnet/etcd/
```

Now you can run a Docker container based on this image:

```sh
docker run \
    --name MY_SNET_SERVICE \
    -e ORGANIZATION_ID=$ORGANIZATION_ID \
    -e ORGANIZATION_NAME="$ORGANIZATION_NAME" \
    -e SERVICE_ID=$SERVICE_ID \
    -e SERVICE_NAME="$SERVICE_NAME" \
    -e SERVICE_IP=$SERVICE_IP \
    -e SERVICE_PORT=$SERVICE_PORT \
    -e DAEMON_HOST=$DAEMON_HOST \
    -e DAEMON_PORT=$DAEMON_PORT \
    -e USER_ID=$USER_ID \
    -p $DAEMON_PORT:$DAEMON_PORT \
    -v $SNET_CLI_HOST:$SNET_CLI_CONTAINER \
    -v $ETCD_HOST:$ETCD_CONTAINER \
    -ti snet_publish_service bash
```

This will put you into a shell within the docker container. The rest of the tutorial assumes you are workings from the Docker container's prompt.

You can ctrl-d to exit, this will stop the container.
If you wish to enter the container again, you should start it with `docker start MY_SNET_SERVICE`, then execute the bash command with
`docker exec -ti MY_SNET_SERVICE bash` and you can continue from where you left off.

## Step 3. Setup `SNET CLI` and create your identity

##### Mnemonic identity setup:

Select a Mnemonic of your choice. MY_MNEMONIC is a string which will be used as seed to generate a public/private key pair. 

```sh
snet identity create $USER_ID mnemonic --mnemonic "MY_MNEMONIC"
```

##### (optional) Other identity type options:

You can create an identity using a known key.

`SNET CLI` supports these other identity types:

* key - hex private key
* rpc - used with a JSON-RPC manager
* ledger - hardware wallet
* trezor - hardware wallet

Check more details on how to use them at ([SNET CLI](http://snet-cli-docs.singularitynet.io)).

## Step 4. Get ETH and AGI

You'll need some ETH and AGI tokens.

First, get the address of your account using ```snet account print``` command.

Then, using your address you can get Ropsten AGIs and ETHs for free using your Github's account here:

* AGI: [{{ site.data.faucets.agi }}]({{ site.data.faucets.agi }})
* ETH: [{{ site.data.faucets.eth }}]({{ site.data.faucets.eth }})

Now make sure you are on Ropsten Network, using:

```sh
snet network ropsten
```

And then check your balance, using:

```sh
snet account balance
```

## Step 5. Create an organization

In order to be able to publish a service you need to be an owner or a member of an organization.

You can create a new organization using:
 
```sh
ACCOUNT=`snet account print`

snet organization metadata-init "$ORGANIZATION_NAME" $ORGANIZATION_ID individual

snet organization add-group default_group $ACCOUNT http://127.0.0.1:2379

snet organization create $ORGANIZATION_ID
```

In case of an already taken `ORGANIZATION_ID` replace it with a different id of your choice.
Make sure you follow our [naming standardization guidelines][naming-standards]. 

If you had to use a different `ORGANIZATION_ID` (other than the one we provided in [Step 2](#step-2-setup-a-docker-container)), 
you will have to update `ORGANIZATION_ID` properly as it is used later in this tutorial.

```sh
export ORGANIZATION_ID="new-org-id"
```

If you want to join an existing organization (e.g. `snet`), ask its owner to add your public key (account) into it before proceeding.

See details of organization metadata in [here](/docs/concepts/organization-metadata).

## Step 6. Download and configure example-service

In this tutorial we'll use a simple service from [SingularityNET Example Service](https://github.com/singnet/example-service).

* Clone the git repository:

```sh
git clone --depth=1 https://github.com/singnet/example-service.git
cd example-service
```

* Install the dependencies and compile the protobuf file:

```sh
pip3 install -r requirements.txt
sh buildproto.sh
```

Service is ready to run, but first we need to publish it on SingularityNET and configure the `SNET DAEMON`.


## Step 7. Prepare service metadata to publish the service

First we need to create a service metadata file. You can do it by running:

```sh
snet service \
	metadata-init \
	SERVICE_PROTOBUF_DIR \
	SERVICE_DISPLAY_NAME \
	--group-name PAYMENT_GROUP_NAME \
	--endpoints SERVICE_ENDPOINT \
	--fixed-price FIXED_PRICE
```

You need to specify the following parameters:
* `SERVICE_PROTOBUF_DIR` - Directory which contains protobuf files of your service: ```service/service_spec/``` in our example service.
* `SERVICE_DISPLAY_NAME` - Display name of your service. You can choose any name you want. 
* `PAYMENT_GROUP_NAME` - Name of the payment group from organization metadata published in [Step 5](#step-5-create-an-organization).
* `SERVICE_ENDPOINT` - Endpoint which will be used to connect to your service.
* `FIXED_PRICE` - Price in AGI for a single call to your service. We will set the price to 10^-8 AGI (remember that 10^-8 AGI = 1 COG).

```sh

#set the type of encoding and provide the proto files
snet service \
    metadata-init \
    service/service_spec \
    "$SERVICE_NAME" \
    --group-name default_group \
    --fixed-price 0.00000001 \
    --endpoints http://$SERVICE_IP:$DAEMON_PORT

# describe your service and add an URL for further service's information.
snet service metadata-add-description --json '{"description": "Description of my Service.", "url": "https://service.users.guide"}'
```

This command will create a JSON configuration file: ```service_metadata.json```.

See details of service metadata in [here](/docs/concepts/service-metadata).

## Step 8. Publish the service on SingularityNET

Now you can publish your service (```service_metadata.json``` is used implicitly) using:

```sh
snet service publish $ORGANIZATION_ID $SERVICE_ID -y
```

Check if your service has been properly published:

```sh
snet organization info $ORGANIZATION_ID
```

## Step 9. Run the service (and SNET Daemon)

Create a `SNET DAEMON` configuration file named `snetd.config.json`. 

```sh
cat > snetd.config.json << EOF
{
   "DAEMON_END_POINT": "$DAEMON_HOST:$DAEMON_PORT",
   "BLOCKCHAIN_NETWORK_SELECTED": "ropsten",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://ropsten.infura.io/v3/e7732e1f679e461b9bb4da5653ac3fc2",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:$SERVICE_PORT",
   "ORGANIZATION_ID": "$ORGANIZATION_ID",
   "SERVICE_ID": "$SERVICE_ID",


   "PAYMENT_CHANNEL_STORAGE_SERVER": {
        "DATA_DIR": "/opt/singnet/etcd/"
    },


   "LOG": {
        "LEVEL": "debug",
        "OUTPUT": {
            "TYPE": "stdout"
        }
   }
}
EOF
```

Running the service will spawn an instance of `SNET DAEMON` automatically.

```sh
python3 run_example_service.py --daemon-config snetd.config.json
```

At this point your service should be up and running. 

## Step 10. Call your service using `SNET CLI`

Open a new terminal, if using Docker, enter in the docker container, using:

```sh
docker exec -it MY_SNET_SERVICE bash
```

At this point you can use several `SNET CLI` commands to interact with your account and with the Ropsten network
(see [SNET CLI](http://snet-cli-docs.singularitynet.io) for details).

Check your balance and setup a MultiPartyEscrow (MPE) Payment Channel to call your service.

```sh
# check your balance
snet account balance

# deposit funds (10 COG) into MPE contract:
snet account deposit 0.00000010 -y

# check your balance - 10 COGs were moved to MPE
snet account balance

# open a payment channel to your service:
snet channel open-init $ORGANIZATION_ID default_group 0.00000010 +10days -y
```

`snet channel open-init` has opened and initialized a channel with 10 COGs for `$ORGANIZATION_ID` with 
expiration at 10 days (57600 blocks in the future with 15 sec/blocks). You can now use any service under this organization
This command prints the id of the created channel, record it to use in the following commands.

```sh
# check your balance - 10 COGs were moved from MPE to the channel
snet account balance

# look for the channel balance (CHANNEL_ID was printed by 'snet channel open-init')
snet client get-channel-state <CHANNEL_ID> http://$SERVICE_IP:$DAEMON_PORT
````

Call your service using:

```sh
snet client call $ORGANIZATION_ID $SERVICE_ID default_group mul '{"a":12,"b":7}' -y
```

The MPE Payment Channel has changed, see its funds using:

```sh
# 1 COG has been spent (signed) 
snet client get-channel-state <CHANNEL_ID> http://$SERVICE_IP:$DAEMON_PORT
```

At this point you've spent 1 COG (service cost was defined in [Step 7](#step-7-prepare-service-metadata-to-publish-the-service)),
of your MPE Payment Channel, calling the service. 
You can keep calling the service until your MPE Payment Channel runs out of funds.

As the service provider, you can claim spent AGIs on your service at anytime using:

```sh
snet treasurer claim-all --endpoint http;//$SERVICE_IP:$DAEMON_PORT -y

# claimed funds are now in MPE
snet account balance

# move funds from MPE to your account (eg. AMOUNT_IN_AGI=0.00000001)
snet account withdraw <AMOUNT_IN_AGI> -y
snet account balance
```

## Step 11. (optional) claiming unused funds from MPE channel

As the service user, you **CAN'T** claim unused funds before the channel expires. 

Once it did, you can claim the funds using ```snet channel claim-timeout-all```:

```sh
# Shows spent/unspent AGIs in the MPE channel
snet client get-channel-state <CHANNEL_ID> http://$SERVICE_IP:$DAEMON_PORT
snet account balance

# Move funds from all expired channels to MPE
snet channel claim-timeout-all -y
snet account balance

# Move funds from MPE to user's account
snet account withdraw <AMOUNT_IN_AGI> -y
snet account balance
```
