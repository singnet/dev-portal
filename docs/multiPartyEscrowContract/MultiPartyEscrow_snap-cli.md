# snap-cli for MPE contract and channels

In this document we present snap-cli commands for manipulating
MultiPartyEscrow contract and calling services from the client side using
payment channels.

### Manipulating MultyPartyEscrow contract

All manipalation with MPE contract can be done via "snet-cli contract"
option, which is low level interface to smart contracts.

If you start ganache with the following mnemonics: 'gauge enact
biology destroy normal tunnel slight slide wide sauce ladder produce'.
Then after deploying platform-contracts you will have the following
addreses.

```bash
# Address of MultiPartyEscrow  :  0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e
# Address of Tokens            :  0x6e5f20669177f5bdf3703ec5ea9c4d4fe3aabd14
# First Address (snet identity):  0x592E3C0f3B038A0D673F19a18a773F993d4b2610
# Second Address (service)     :  0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
```

We will assume that snet-cli use the first address as identity, and
the service use the second address.

You can run the following test

```bash
# create identity in snet-cli (probably you've already done it) 
snet identity create snet-user key --private-key 0xc71478a6d0fe44e763649de0a0deb5a080b788eefbbcf9c6f7aef0dd5dbd67e0
snet identity snet-user

# deposit 1000000 cogs to MPE from the first address (0x592E3C0f3B038A0D673F19a18a773F993d4b2610)
snet contract SingularityNetToken --at 0x6e5f20669177f5bdf3703ec5ea9c4d4fe3aabd14 approve 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e 1000000 --transact -y
snet contract MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e  deposit  1000000 --transact -y

# check balance of the First account in MPE (it should be 1000000 cogs)
snet contract  MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e balances 0x592E3C0f3B038A0D673F19a18a773F993d4b2610
# 1000000

# open the channel for the second account (for 420000 cogs), groupID=0
# Expiration is set in block numbers. 
# You can see the last block number with the following command
snet mpe-client block_number 

# We set expiration as current_block - 1
EXPIRATION=$((`snet mpe-client block_number` - 1))
snet contract MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e openChannel  0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB 420000 $EXPIRATION 0 --transact -y

# We can check this channel
snet contract MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e channels 0
# ['0x592E3C0f3B038A0D673F19a18a773F993d4b2610', '0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB', 0, 420000, 0, <last_block - 1>]

# check balance of the First account in MPE (it should be 580000 now)
snet contract  MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e balances 0x592E3C0f3B038A0D673F19a18a773F993d4b2610
# 580000

#We can immediately claim timeout because expiration was set in the past
snet contract MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e channelClaimTimeout 0 --transact -y

# check balance of the First account in MPE (it should be 1000000 now)
snet contract  MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e balances 0x592E3C0f3B038A0D673F19a18a773F993d4b2610
# 1000000


# We can check the channel and see that it was suspended and nonce of the channel was incremented
snet contract MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e channels 0
# ['0x592E3C0f3B038A0D673F19a18a773F993d4b2610', '0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB', 0, 0, 1, 0]


# We put 420000 back to the channel end set expiration +6000 blocks in the future (~24 hours with 15 second per block)
EXPIRATION=$((`snet mpe-client block_number` + 6000))
snet contract MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e channelExtendAndAddFunds 0 $EXPIRATION 420000 --transact -y

# We check the channel (nonce is still 1)
snet contract MultiPartyEscrow --at 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e channels 0
# ['0x592E3C0f3B038A0D673F19a18a773F993d4b2610', '0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB', 0, 420000, 1, <...>]

# You can try to claim timeout now. It will not be possible ~24 hours... 
```

### Call the server using MPE channel

Here we consider low level functionality for calling services via snap-cli.
We assume the following
* You downloaded proto file for selected service (from IPFS metadata)
* You opened the payment channel in MPE with a given service group (see previous section)
* You know the endpoint of selected group (from IPFS metadata)

#### Compile protobuf for service at the given payment channel
 
```bash
# proto_dir - directory in which we have .proto file
# prot_file - name of .proto file
# 0         - channel_id of the channel

snet  mpe-client compile_from_file <proto_dir> <proto_file> 0
```
#### Call the service   

###### JSON parameters and modifiers

Parameters for the service itself have to be passed to snet-cli in JSON format 
(via cmdline parameter or via a JSON file, or via stdin).

For example:

```bash
'{"image_type": "jpg", "image": "<base64 encoded image>"}'
````

We've implemented several modifiers for this JSON parameter in order to simplify passing big files, and have possibility to actually pass binary data (and not only base64 encoded).

There are 3 possible modifiers: 
* file      - read from file
* b64encode - encode to base64
* b64decode - decode from base64

for example if you pass the following JSON as parameter then as "image" parameter we will use base64 encoded content of "1.jpeg"

```bash 
'{"image_type": "jpg", "file@b64enode@image": "1.jpeg"}'
```

If we remove b64encode modifier from the previous example then we will pass 1.jpeg image in binary format without base64 encoding.  

###### Make a call (using low level functionality)

Let's make a call to the server with the following parameters
* 0x39ee715b50e78a920120c1ded58b1a47f571ab75 - address of MultiPartyEscrow contract
* 0 - channel_id
* 1 - nonce of the channel
* 20010 - total amount which was already spent in this channel plus price for this call
* localhost:8080 - endpoint
* classify - name of method which we want to call
* '{"image_type": "jpg", "file@b64encode@image": "file.jpeg"}' - JSON parameters for the server. Because of modifier we will use base64 encoded content of file.jpeg as "image" parameter 

```bash
 snet mpe-client call_server_lowlevel 0x39ee715b50e78a920120c1ded58b1a47f571ab75 0 1 20010 localhost:8080 classify '{"image_type": "jpg", "file@b64encode@image": "file.jpeg"}'
``` 


