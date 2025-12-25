
# module : sdk.mpe.payment_channel_provider

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/mpe/payment_channel_provider.py) to GitHub

## Entities:
1. [PaymentChannelProvider](#class-paymentchannelprovider)
   - [\_\_init\_\_](#init)
   - [update_cache](#update-cache)
   - [_event_data_args_to_dict](#event-data-args-to-dict)
   - [_get_all_channels_from_blockchain_logs_to_dicts](#get-all-channels-from-blockchain-logs-to-dicts)
   - [_get_channels_from_cache](#get-channels-from-cache)
   - [get_past_open_channels](#get-past-open-channels)
   - [open_channel](#open-channel)
   - [deposit_and_open_channel](#deposit-and-open-channel)
   - [_get_newly_opened_channel](#get-newly-opened-channel)

## Class `PaymentChannelProvider`

extends: `object`

is extended by: -

### description

A class for managing payment channels.

### attributes

- `web3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.
with the MultiPartyEscrow contract.
- `event_topics` (list): A list of event topics for the MultiPartyEscrow contract.
- `deployment_block` (int | BlockNumber): The block number at which the MultiPartyEscrow contract was deployed.
- `mpe_address` (ChecksumAddress): The address of the MultiPartyEscrow contract.
- `channels_file` (Path): The path to the cache file for payment channels. 
Equals to `~/.snet/cache/mpe/MPE_ADDRESS/channels.pickle`.

### methods

### `__init__`

Initializes a new instance of the class. 

##### args:

- `w3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- payment_channel_state_service_client` (ServiceStub): A stub for interacting with PaymentChannelStateService via gRPC.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.

##### returns:

- _None_

### `update_cache`

Updates the cache with channels from blockchain logs for the MPE contract. Cache is stored as a pickle file.
It stores the list of payment channels and last read block number. If there is no cache, logs are retrieved starting 
from the deployment block up to the current block, and the following times, starting from the last read block.

##### returns:

- _None_

### `_event_data_args_to_dict`

Converts event data into a dictionary, keeping only the required fields.

##### args:

- `event_data` (dict[str, Any]): The event to convert to a dictionary.

##### returns:

- A dictionary containing the event data. (dict[str, Any])

### `_get_all_channels_from_blockchain_logs_to_dicts`

Retrieves all payment channels from the blockchain logs with a given block range and returns them as a list 
of dictionaries.

##### args:

- `starting_block_number` (int): The starting block number of the block range.
- `to_block_number` (int): The ending block number of the block range.

##### returns:

- A list of payment channel dictionaries. (list[dict[str, Any]])

### `_get_channels_from_cache`

Updates cache with using `update_cache` and retrieves all payment channels from the cache.

##### returns:

- A list of payment channel dictionaries. (list[dict[str, Any]])

### `get_past_open_channels`

Extracts a list of all past open payment channels from the cache, filters it by account and payment group, 
and returns it.

##### args:

- `account` (Account): The account object to filter the channels by its address and signer address.
- `payment_address` (str): The payment address to filter the channels by.
- `group_id` (str): The group ID to filter the channels by.
- `payment_channel_state_service_client` (Any): Stub for interacting with PaymentChannelStateService via gRPC to 
pass it to PaymentChannel instances.

##### returns:

- A list of payment channels. (list[PaymentChannel])

### `open_channel`

Opens a payment channel with the specified amount of ASI (FET) tokens in AFET (taken from MPE) and expiration time. 
And then returns it.

##### args:

- `account` (Account): The account object used to send the transaction.
- `amount` (int): The amount of ASI (FET) tokens in AFET to deposit into the channel.
- `expiration` (int): The expiration time of the payment channel in blocks.
- `payment_address` (str): The address of the payment recipient.
- `group_id` (str): The ID of the payment group.
- `payment_channel_state_service_client` (Any): Stub for interacting with PaymentChannelStateService via gRPC to 
pass it to PaymentChannel instances.

##### returns:

- The newly opened payment channel. (PaymentChannel)

### `deposit_and_open_channel`

Opens a payment channel with the specified amount of ASI (FET) tokens in AFET (which are previously deposited on MPE) 
and expiration time. And then returns it.

##### args:

- `account` (Account): The account object used to send the transaction.
- `amount` (int): The amount of ASI (FET) tokens in AFET to deposit into the channel.
- `expiration` (int): The expiration time of the payment channel in blocks.
- `payment_address` (str): The address of the payment recipient.
- `group_id` (str): The ID of the payment group.
- `payment_channel_state_service_client` (Any): Stub for interacting with PaymentChannelStateService via gRPC to 
pass it to PaymentChannel instances.

##### returns:

- The newly opened payment channel. (PaymentChannel)

### `_get_newly_opened_channel`

Retrieves the newly opened payment channel from cache (which is previously updated) based on the given data.

##### args:

- `receipt` (dict): The receipt of the transaction that opened the payment channel.
- `account` (Account): The account object associated with the payment channel.
- `payment_address` (str): The payment address of the payment channel.
- `group_id` (str): The ID of the payment group.
- `payment_channel_state_service_client` (Any): Stub for interacting with PaymentChannelStateService via gRPC to 
pass it to PaymentChannel instances.

##### returns:

- The newly opened payment channel. (PaymentChannel)

##### raises:

- Exception: If no payment channels are found for the given data.

