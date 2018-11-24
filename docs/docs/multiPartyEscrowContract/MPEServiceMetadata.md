# Overview

Service metadata is the off-chain descrition of SingularityNET service.
In order to use a SingularityNet service client need to know.

* Address of MultiPartyEscrow contract
* Service metadata

It should be noted that daemons of the service also need to know this metadata
in order to configure payment system.

There are three ways of providing this metadata to the clients and the daemons.

* as a simple json file
* as a IPFS hash. In this case the json metadata should be obtained from IPFS (IPFS hash should be crosschecked!)
* as a name of service in the Registry. In this case IPFS hash of metadata should be obtained from Registry via getMetadataIPFSHash
 
### Security notes

There are two important security notes.
* The client shoudn't use mpe_address from metadata as a solely source of MultiPartyEscrow contract address. 
  But he should check that its mpe_address corresponds to the mpe_address in metadata (cross validation of MultiPartyEscrow contract address)
* The client should check that hash of metadata correspond to IPFS hash, overwise the client can be attacked if ipfs client is compromised.

### Format of metadata


```bash
# version          - used to track format changes (current version is 1)
# display_name     - Display name of the service
# encoding         - Service encoding (proto or json)
# service_type     - Service type (grpc, jsonrpc or process)  
# payment_expiration_threshold - Service will reject payments with expiration less
#                                than current_block + payment_expiration_threshold.
#                                This field should be used by the client with caution.
#                                Client should not accept arbitrary payment_expiration_threshold
# model_ipfs_hash  - IPFS HASH to the .tar archive of protobuf service specification
# mpe_address      - Address of MultiPartyEscrow contract. 
#                    Client should use it exclusively for cross-checking of mpe_address, 
#                         (because service can attack via mpe_address)
#                    Daemon can use it directly if authenticity of metadata is confirmed
# pricing {}      -  Pricing model
#          Possible pricing models:
#          1. Fixed price
#              price_model   - "fixed_price"
#              price_in_cogs -  unique fixed price in cogs for all method (1 AGI = 10^8 cogs)
#              (other pricing models can be easily supported)
# groups[]       - group is the number of endpoints which shares same payment channel; 
#                   grouping strategy is defined by service provider; 
#                   for example service provider can use region name as group name
#      group_name - unique name of the group (human readable)
#      group_id   - unique id of the group (random 32 byte string in base64 encoding)
#      payment_address - Ethereum address to recieve payments
#
#endpoints[] - address in the off-chain network to provide a service
#      group_name 
#      endpoint - 127.0.0.1:1234 (or http://127.0.0.1:1234) - unique endpoint identifier
```

The python library for manipulating this metadata can be found here: https://github.com/singnet/snet-cli/blob/master/snet_cli/mpe_service_metadata.py
