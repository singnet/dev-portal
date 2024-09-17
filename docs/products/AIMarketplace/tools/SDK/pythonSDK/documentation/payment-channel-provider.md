## module: sdk.mpe.payment_channel_provider

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/mpe/payment_channel_provider.py) to GitHub

Entities:
1. [PaymentChannelProvider](#class-paymentchannelprovider)
   - [\_\_init\_\_](#__init__)
   - [get_past_open_channels](#get_past_open_channels)
   - [open_channel](#open_channel)
   - [deposit_and_open_channel](#deposit_and_open_channel)
   - [_get_newly_opened_channel](#_get_newly_opened_channel)

### Class `PaymentChannelProvider`

extends: `object`

is extended by: -

#### description

A class for managing payment channels.

#### attributes

- `web3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.
with the MultiPartyEscrow contract.
- `event_topics` (list): A list of event topics for the MultiPartyEscrow contract.
- `deployment_block` (int | BlockNumber): The block number at which the MultiPartyEscrow contract was deployed.
- `payment_channel_state_service_client` (ServiceStub): A stub for interacting with PaymentChannelStateService via gRPC.

#### methods

#### `__init__`

Initializes a new instance of the class. 

###### args:

- `w3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- payment_channel_state_service_client` (ServiceStub): A stub for interacting with PaymentChannelStateService via gRPC.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.

###### returns:

- _None_

#### `get_past_open_channels`

Extracts a list of all past open payment channels from the blockchain, filters it by account and payment group, 
and returns it.

###### args:

- `account` (Account): The account object to filter the channels by its address and signer address.
- `payment_address` (str): The payment address to filter the channels by.
- `group_id` (str): The group ID to filter the channels by.
- `starting_block_number` (int): The starting block number of the block range. Defaults to 0.
- `to_block_number` (int): The ending block number of the block range. Defauls to _None_.

###### returns:

- A list of payment channels. (list[PaymentChannel])

#### `open_channel`

Opens a payment channel with the specified amount of AGIX tokens in cogs (taken from MPE) and expiration time. 
And then returns it.

###### args:

- `account` (Account): The account object used to send the transaction.
- `amount` (int): The amount of AGIX tokens in cogs to deposit into the channel.
- `expiration` (int): The expiration time of the payment channel in blocks.
- `payment_address` (str): The address of the payment recipient.
- `group_id` (str): The ID of the payment group.

###### returns:

- The newly opened payment channel. (PaymentChannel)

#### `deposit_and_open_channel`

Opens a payment channel with the specified amount of AGIX tokens in cogs (which are previously deposited on MPE) 
and expiration time. And then returns it.

###### args:

- `account` (Account): The account object used to send the transaction.
- `amount` (int): The amount of AGIX tokens in cogs to deposit into the channel.
- `expiration` (int): The expiration time of the payment channel in blocks.
- `payment_address` (str): The address of the payment recipient.
- `group_id` (str): The ID of the payment group.

###### returns:

- The newly opened payment channel. (PaymentChannel)

#### `_get_newly_opened_channel`

Retrieves the newly opened payment channel from blockchain based on the given data.

###### args:

- `receipt` (dict): The receipt of the transaction that opened the payment channel.
- `account` (Account): The account object associated with the payment channel.
- `payment_address` (str): The payment address of the payment channel.
- `group_id` (str): The ID of the payment group.

###### returns:

- The newly opened payment channel. (PaymentChannel)

###### raises:

- Exception: If no payment channels are found for the given data.

