[naming-standards]: https://github.com/singnet/wiki/blob/master/doc/Naming-Standards.md

# Tutorial - How to Publish a SingularityNET Service

-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker (https://www.docker.com/)_
* _Metamask (https://metamask.io)_

_You will need a private-public key pair to register your service in SNET. Generate them in Metamask before you start this tutorial._

-------------------------------

Run this tutorial from a bash terminal.

In this tutorial we'll publish an example service in SingularityNET using Kovan Test Network.

## Step 1 

Setup a `ubuntu:18.04` docker container using provided `Dockerfile`.

```
$ docker build -t snet_example_service https://github.com/singnet/wiki.git#master:/tutorials/Docker
$ docker run -p 7000:7000 -ti snet_example_service bash
```

Step 1 may take a couple of minutes to finish. Step 2 can be performed concurrently.

## Step 2 (optional if you already have enough AGI and ETH tokens) 

You need some AGI and ETH tokens. You can get then for free using your github account here:

* AGI: https://faucet.singularitynet.io/
* ETH: https://faucet.kovan.network/

## Step 3 

From this point we follow the tutorial in the Docker container's prompt.

Create an "alias" for your private key.

```
# snet identity create MY_ID_NAME KEY_TYPE
```

Replace `MY_ID_NAME` by an id to identify your key in the `SNET CLI`. 
This id will not be seen by anyone. 
It's just a way to make it easier for you to refer to your private key (you may have many, btw) in following `snet` commands. 
This alias is kept locally in the container and will vanish when it's shutdown. `KEY_TYPE` can be either

* key
* rpc
* mnemonic
* ledger
* trezor

In this tutorial we'll use `KEY_TYPE` == `key`. Enter your private key when prompted.

## Step 4 (optional if you already have an organization) 

Create an organization and add your key to it.

```
# snet organization create ORGANIZATION_NAME
```

Replace `ORGANIZATION_NAME` by a name of your choice. Make sure you follow our [naming standardisation guidelines][naming-standards].

If you want to join an existing organization (e.g. `snet`), ask the owner to add your public key into it before proceeding.

## Step 5

Build a JSON configuration file for your service.

In this tutorial we use a simple service implemented in [SingularityNET Example Service](https://github.com/singnet/example-service).

```
# git clone https://github.com/singnet/example-service.git
# cd example-service
```
To build the JSON configuration file, execute the following command and enter the requested information.

```
# snet service metadata_init SERVICE_PROTOBUF_DIR SERVICE_DISPLAY_NAME PAYMENT_ADDRESS
```

`SERVICE_PROTOBUF_DIR`: The folder where your service's `.proto` file is.

For example:
```
# snet service metadata_init service/service_spec/ example-service 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
```

With these parameters, the JSON must looks like:

```
{
    "version": 1,
    "display_name": "example-service",
    "encoding": "grpc",
    "service_type": "grpc",
    "payment_expiration_threshold": 40320,
    "model_ipfs_hash": "QmSkiwenyYUMt1rCgSboH9eiSSdeMDi1kVPXZvKScAZQyx",
    "mpe_address": "0xdd4292864063d0DA1F294AC65D74d55a44F4766C",
    "pricing": {},
    "groups": [
        {
            "group_name": "default_group",
            "group_id": "gbXRAIn9XB8LMocMi8xZlFd/nNrVoBWUbeTVqTEHZXE=",
            "payment_address": "0xA6E06cF37110930D2906e6Ae70bA6224eDED917B"
        }
    ],
    "endpoints": []
}
```

Now, lets set a fixed price for your `example-service`:

```
# snet service metadata_set_fixed_price PRICE_IN_AGI
```

Remember that 1 AGI = 10^8 COGS, so lets set the price 1 COG.

```
# snet service metadata_set_fixed_price 0.00000001
```

Then, lets set the endpoint where your `SNET Daemon` and `service` will be listening to:

```
# snet service metadata_add_endpoints IP:PORT
```

For example:
```
# snet service metadata_add_endpoints http://54.203.198.53:7000
```

Our service's JSON configuration now looks like:

```
{
    "version": 1,
    "display_name": "example-service",
    "encoding": "grpc",
    "service_type": "grpc",
    "payment_expiration_threshold": 40320,
    "model_ipfs_hash": "QmSkiwenyYUMt1rCgSboH9eiSSdeMDi1kVPXZvKScAZQyx",
    "mpe_address": "0xdd4292864063d0DA1F294AC65D74d55a44F4766C",
    "pricing": {
        "price_model": "fixed_price",
        "price_in_cogs": 1
    },
    "groups": [
        {
            "group_name": "default_group",
            "group_id": "gbXRAIn9XB8LMocMi8xZlFd/nNrVoBWUbeTVqTEHZXE=",
            "payment_address": "0xA6E06cF37110930D2906e6Ae70bA6224eDED917B"
        }
    ],
    "endpoints": [
        {
            "group_name": "default_group",
            "endpoint": "http://54.203.198.53:7000"
        }
    ]
}
```

## Step 6

Publish your service

```
# snet service publish ORGANIZATION_NAME SERVICE_NAME
```

`ORGANIZATION_NAME`: The name of the organization you've create in step 4.

`SERVICE_NAME`: The name that you want to registry your service with. Can be the same as
`SERVICE_DISPLAY_NAME` or different.

```
# snet service publish snet example-service
```

Check if your service has been properly published

```
# snet organization list-services ORGANIZATION_NAME
```

Optionally you can un-publish the service

```
# snet service delete ORGANIZATION_NAME SERVICE_NAME
```

## Step 7

Running the service and `SNET Daemon`

In the service folder, create a file named `snetd.config.json` according to this template:

```
{
   "DAEMON_END_POINT": "http://DAEMON_HOST:DAEMON_PORT",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://kovan.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0x2e4b2f2b72402b9b2d6a7851e37c856c329afe38",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://SERVICE_GRPC_HOST:SERVICE_GRPC_PORT",  
   "ORGANIZATION_NAME": "ORGANIZATION_NAME",
   "SERVICE_NAME": "SERVICE_NAME",
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
            "TYPE": "stdout"
           }
   }
}
```

For our example, replace tags with these values:

- `http://DAEMON_HOST:DAEMON_PORT`: http://54.203.198.53:7000
- `http://SERVICE_GRPC_HOST:SERVICE_GRPC_PORT`: http://localhost:7003
- `ORGANIZATION_NAME`: snet
- `SERVICE_NAME`: example-service

```
{
   "DAEMON_END_POINT": "http://54.203.198.53:7000",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://kovan.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0x2e4b2f2b72402b9b2d6a7851e37c856c329afe38",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "ORGANIZATION_NAME": "snet",
   "SERVICE_NAME": "example-service",
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
              "TYPE": "stdout"
           }
   }
}
```

Now run the service (that will run and instance of `SNET Daemon`) from the same path where `snet.config.json` is:

```
# python3.6 run_example_service.py
```

At this point your service should be up and running. You can test it by making
client requests. Open [SingularityNET DApp](http://alpha.singularitynet.io/) in your browser or
attach a new terminal to the Docker container and run the client request test.

You can make local requests (testing purpose)

```
$ docker exec -it snet_example_service bash
```

Inside the Docker container:

```
# cd example-service
# python3.6 test_example_service.py
```

Or you can make requests through `SingularityNET`:

- Check your wallet's funds:

```
# snet client balance
```

- Deposit funds (1 COG) into MultiPartyEscrow (`MPE`) contract:

```
# snet client deposit 0.00000001
```

- Open a payment channel to your service:
```
# snet client open_init_channel_registry ORGANIZATION_NAME SERVICE_NAME AMOUNT_IN_AGI EXPIRATION_BLOCK_NUMBER
```

- To check the current `BLOCK_NUMBER`:

```
# snet client block_number
```

For example:

```
# snet client open_init_channel_registry snet example-service 0.00000001 11000000
```

- Now, you can check your channels:

```
# snet client print_all_channels
```

##### From now on, the `SNET Daemon` must be running!

- You can inspect a channel state (by `id`):

```
# snet client get_channel_state CHANNEL_ID SERVICE_ENDPOINT
```

Example:

```
# snet client get_channel_state 0 54.203.198.53:7000
```

- Finally, you can call your service with:

```
# snet client call CHANNEL_ID PRICE_IN_AGI SERVICE_ENDPOINT SERVICE_METHOD SERVICE_JSON_PARAMS
```

Example (for `endpoint` just use `IP:PORT`):

```
# snet client call 0 0.00000001 54.203.198.53:7000 mul '{"a":12,"b":7}'
```

- Treasurer:

As the owner of this service you have the right to claim all AGIs that were
spent with it.

To claim these AGIs you must use the `SNET Treasurer` via `SNET Daemon`.

- First, create a `snetd.config.json` in a different folder (i.e. `treasurer/`) according to this template:

```
{
   "PRIVATE_KEY": "PRIVATE_KEY_FROM_PAYMENT_ADDRESS",
   "DAEMON_END_POINT": "http://DAEMON_HOST:DAEMON_PORT",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://kovan.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0x2e4b2f2b72402b9b2d6a7851e37c856c329afe38",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://SERVICE_GRPC_HOST:SERVICE_GRPC_PORT",
   "ORGANIZATION_NAME": "ORGANIZATION_NAME",
   "SERVICE_NAME": "SERVICE_NAME",
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
          "TYPE": "stdout"
          }
   }
}
```

For our example, replace tags with these values:

- `PRIVATE_KEY_FROM_PAYMENT_ADDRESS`: The private key for `0xA6E06cF37110930D2906e6Ae70bA6224eDED917B`
- `DAEMON_HOST:DAEMON_PORT`: http://54.203.198.53:7000
- `SERVICE_GRPC_HOST:SERVICE_GRPC_PORT`: http://localhost:7003
- `ORGANIZATION_NAME`: snet
- `SERVICE_NAME`: example-service

```
# cd treasurer
# cat snetd.config.json
{
   "PRIVATE_KEY": "PRIVATE_KEY_FROM_PAYMENT_ADDRESS",
   "DAEMON_END_POINT": "http://54.203.198.53:7000",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://kovan.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0x2e4b2f2b72402b9b2d6a7851e37c856c329afe38",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "ORGANIZATION_NAME": "snet",
   "SERVICE_NAME": "example-service",
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
          "TYPE": "stdout"
          }
   }
}
```

The `PRIVATE_KEY_FROM_PAYMENT_ADDRESS` must be related to `0xA6E06cF37110930D2906e6Ae70bA6224eDED917B`
in our example.

Now run the `SNET Daemon` to list all channels that were created to call your service:

```
# snetd list channels
INFO[0000] Cobra initialized                            
INFO[0000] Using configuration file                      configFile=snetd.config.json
INFO[0000]                                               PaymentChannelStorageClient="&{ConnectionTimeout:5s RequestTimeout:3s Endpoints:[http://127.0.0.1:2379]}"
0: {
ChannelID: 0, 
Nonce: 0, 
State: Open, 
Sender: 0xFF2a327ed1Ca40CE93F116C5d6646b56991c0ddE, 
Recipient: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B, 
GroupId: [102 246 250 169 115 225 21 99 128 252 113 211 110 41 224 185 246 243 157 8 53 185 14 10 47 225 235 251 74 51 189 17], 
FullAmount: 450, 
Expiration: 11000000, 
AuthorizedAmount: 180, 
Signature: jzVh5QoRIiiLH/RKH0GHvxMNRcLquVOZQE2ZFmUiYAsPsr+pIap+YERI7zw+BQ2d/ofs4Gl8J6u2SwTxN8rblRs=
}
```

The output shows that sender `0xFF2a327ed1Ca40CE93F116C5d6646b56991c0ddE` has already spent
`180` COGs from the total amount `450` COGs with this service.

- So if we claim this channel right now, we'll be able to get these `180` COGs.

```
# snetd claim --channel-id 0
[Daemon log]
INFO[0001] Transaction finished successfully             amount=180 channelId=9 isSendBack=false signature="jzVh5QoRIiiLH/RKH0GHvxMNRcLquVOZQE2ZFmUiYAsPsr+pIap+YERI7zw+BQ2d/ofs4Gl8J6u2SwTxN8rblRs=" timeout=5s
```

- Then you can check your balance to be sure that these `180` COGs are now into your MultiPartyEscrow(`MPE`):

```
# snet client balance --account 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
    account: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
    ETH: **********
    AGI: 0.00000000
    MPE: 0.00000180
```

- The last thing you should do is withdraw this amount from `MPE` to your private wallet:

```
# snet client withdraw 0.00000180
[blockchain transaction]
# snet client balance
    account: 0xA6E06cF37110930D2906e6Ae70bA6224eDED917B
    ETH: **********
    AGI: 0.00000180
    MPE: 0.00000000
```

For more information about the `SNET MultiPartyEscrow` check this [link](https://github.com/singnet/wiki/tree/master/multiPartyEscrowContract). 
