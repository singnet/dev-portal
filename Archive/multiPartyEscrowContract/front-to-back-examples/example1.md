# Front to back example of MPE payment system (Example1)

Simple front to back example of using MPE payment system in
SingularityNET with one replica configuration.

You can find scripts for this examples here: [scripts/example1](scripts/example1)

We will demonstrate the following.

from the service side:
* How to publish your service (in MPE payment system)
* How to configure your daemon(s)
* How to claim the funds from the server side using "treasurer server"

from the client side:
* How to open the payment channel 
* How to make calls using MPE payment system

## Preparation

Please follow the tutorial [Build-and-deploy-SingularityNET-locally](Build-and-deploy-SingularityNET-locally.md) in order to deploy SingularitNet localy.

The following example can be also executed on the kovan test net, but you will need to make sure that your organization name haven't been already taken and you should probably use another account for the collect payment from the client side (see KOVAN warnings bellow) 

For our local network we assume the following accounts

```bash
# First Address (snet identity): 0x592E3C0f3B038A0D673F19a18a773F993d4b2610
# Second Address (service)     : 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
```

In order to have such addresses you should run ganache with 
mnemonics from tutorial: 'gauge enact
biology destroy normal tunnel slight slide wide sauce ladder produce'.


## Configure, Register and start your service (service provider side)

#### Start the service (without a daemon)
We will use Basic_Template service from https://github.com/singnet/dnn-model-services

```
# $SINGNET_REPOS is path from tutorial, but it could be any directory
cd $SINGNET_REPOS
git clone https://github.com/singnet/dnn-model-services.git
cd dnn-model-services/Services/gRPC/Basic_Template/

# build protobuf
. buildproto.sh
python3 run_basic_service.py --no-daemon
```
It will start the service at the port 7003.

#### Register your service in Registry


Prepare metadata (service_metadata.json). We will register the second ganache identity (0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB) as a recipient wallet.

(KOVAN) On KOVAN network you might want to choose another wallet.  

```bash
cd $SINGNET_REPOS
cd dnn-model-services/Services/gRPC/Basic_Template/

snet service metadata_init service/service_spec Example1 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
snet service metadata_set_fixed_price 0.1
snet service metadata_add_endpoints localhost:8080
```

Create an organization "testo". And publish our service "tests".

(KOVAN) On KOVAN you probably will need to choose another name for your organization. 

```
snet organization  create testo -y
snet service publish testo tests -y
```

#### Configure and start your daemon 

###### Preparation

We assume that executable file for the daemon is placed in $SINGNET_REPOS/snet-daemon/build/snetd-linux-amd64

```
# You could start the daemon from any directory
# We will use directory of the service
cd $SINGNET_REPOS
cd dnn-model-services/Services/gRPC/Basic_Template/

# ../../../../snet-daemon/build/snetd-linux-amd64 is a path to daemon

# we make a link for simplicity (service is already running)
ln -s ../../../../snet-daemon/build/snetd-linux-amd64 snetd

# if it is not the first time you run thit test, and state of blockchain was reset,
# you should reset the state of etcd storage as well
rm -rf storage-1.etcd
```

###### Make configuration file for the daemon

```
cd $SINGNET_REPOS
cd dnn-model-services/Services/gRPC/Basic_Template/

cat > snetd.config.json << EOF
{
   "ETHEREUM_JSON_RPC_ENDPOINT": "http://localhost:8545",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "REGISTRY_ADDRESS_KEY": "0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2",
   "DAEMON_END_POINT": "localhost:8080",
   "IPFS_END_POINT": "http://localhost:5002",
   "ORGANIZATION_NAME": "testo",
   "SERVICE_NAME": "tests",
   "log": {
   "level": "debug",
   "output": {
   "type": "stdout"
      }
   }
}
EOF
```

It should be noted that we do not provide any ethereum identity, because this daemon will not make any on-chain calls.

###### Run daemon

```
./snetd-linux-amd64
```

## Open payment channel and make a call (client side)


#### Open the payment channel with service provider 


(KOVAN) For KOVAN network you should make sure that you use right names for organization and service.

```
# create identity in snet-cli (probably you've already done it) 
snet identity create snet-user key --private-key 0xc71478a6d0fe44e763649de0a0deb5a080b788eefbbcf9c6f7aef0dd5dbd67e0
snet identity snet-user

# deposit 100.1 AGI to MPE wallet
snet client deposit 100.1 -y

# open channel with our service (organization=testo service_name=tests)
# channel with channel_id=0 should be created and initialized after this call
snet client open_init_channel_registry testo tests 42 100000000 -y

```
#### Make a call using stateless logic

We are going to make a call using stateless logic (see https://github.com/singnet/wiki/blob/master/multiPartyEscrowContract/MultiPartyEscrow_stateless_client.md).
It means that the client don't need to persist any information, except channel_id of the payment channel which he wants to use. The client can get the list of his payment channels from blockchain log, or blockchain itself. But this operation is rather slow, so the client cannot make it at each call. But we will be able to use this function in the case of catastrophic recovery.  

First let's take from blockchain the list of all open channel.

```
# take the list of channels from blockchain (from events!)
snet client print_all_channels
```

We should have one channel with recipient=0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB, and we should have 42 AGI in it.

In order to make an actual call the channel should be initialized (mainly protobuf should be compiled).
Let's check the list of initialized channels
```
snet client print_initialized_channels
```

Now we can make a call
```
# we make call using stateless logic with the following arguments
#channel_id       = 0
#price            = 0.1
#endpoint         = localhost:8080
#protobuf_method  = add
#parameters       = '{"a":10,"b":32}'
snet client call 0 0.1 localhost:8080 add '{"a":10,"b":32}'
```
During this call we ask the daemon to send us the last state of the channel, and we make a call using this state (see https://github.com/singnet/wiki/blob/master/multiPartyEscrowContract/MultiPartyEscrow_stateless_client.md)

we can repeat this call until we spend all money in the channel. None of on-chain transaction will be made!

```
snet client call 0 0.1 localhost:8080 mul '{"a":6,"b":7}'
snet client call 0 0.1 localhost:8080 add '{"a":10,"b":32}'
```

## Claim channel by treasurer server (service provider side)

At the moment treasurer server logic is implemented as part of the daemon. 

#### Configure treasurer 

```
cd $SINGNET_REPOS
mkdir treasurer
cd treasurer
ln -s ../snet-daemon/build/snetd-linux-amd64

cat > snetd.config.json << EOF
{
   "PRIVATE_KEY": "04899d5fd471ce68f84a5ec64e2e4b6b045d8b850599a57f5b307024be01f262",
   "ETHEREUM_JSON_RPC_ENDPOINT": "http://localhost:8545",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "REGISTRY_ADDRESS_KEY": "0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2",
   "DAEMON_END_POINT": "localhost:8080",
   "IPFS_END_POINT": "http://localhost:5002",
   "ORGANIZATION_NAME": "testo",
   "SERVICE_NAME": "tests",
   "log": {
   "level": "debug",
   "output": {
   "type": "stdout"
      }
   }
}
EOF
```

There is an important difference in configuration between daemon and treasurer server: In treasurer server we must provide ethereum identity (private key in this case), because treasurer server will need make on-chain transaction (which is different from daemon who didn't need to send any on-chain transactions).



First we can ask treasurer to print the list of unclaimed channels

```bash
../snet-daemon/build/snetd-linux-amd64 list channels
```

Now we can ask treasurer to claim funds from the channel (close/reopen logic).
Let's check our balance before and after claim the funds.

```bash
#balance before claim
snet client balance --account 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB 

../snet-daemon/build/snetd-linux-amd64 claim  --channel-id 0

# balance after claim
snet client balance --account 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
```

the following logic happened during the run of treasurer server.
* treasurer server ask etcd to send the last stated of the channel, and increment the nonce of the channel.
* daemon(s) can continue to work with the client without any confirmation from the treasurer or block-chain.
* treasurer send on-chain transaction to claim funds and increase the nonce of the channel (close/reopen channel)

