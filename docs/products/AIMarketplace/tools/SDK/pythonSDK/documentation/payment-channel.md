## module: sdk.mpe.payment_channel

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/mpe/payment_channel.py) to GitHub

Entities:
1. [PaymentChannel](#class-paymentchannel)
   - [\_\_init\_\_](#__init__)
   - [add_funds](#add_funds)
   - [extend_expiration](#extend_expiration)
   - [extend_and_add_funds](#extend_and_add_funds)
   - [sync_state](#sync_state)
   - [_get_current_channel_state](#_get_current_channel_state)

### Class `PaymentChannel`

extends: -

is extended by: -

#### description

The PaymentChannel (payment_channel.py:8-65:135) class is responsible for managing a payment channel 
in the SingularityNET platform.

#### attributes

- `channel_id` (int): The ID of the payment channel.
- `web3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- `account` (Account): An instance of the `Account` class for interacting with the MultiPartyEscrow and SingularityNetToken contracts.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.
- `payment_channel_state_service_client` (ServiceStub): A stub for interacting with PaymentChannelStateService via gRPC.
- `state` (dict): The current state of the payment channel. It contains the following keys:
  - `nonce` (int): The current nonce of the payment channel.
  - `last_signed_amount` (int): The last signed amount of the payment channel.

#### methods

#### `__init__`

Initializes a new instance of the class. 

###### args:

- `channel_id` (str): The ID of the payment channel.
- `w3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- `account` (Account): An instance of the `Account` class for managing Ethereum accounts.
- `payment_channel_state_service_client` (ServiceStub): A stub for interacting with PaymentChannelStateService via gRPC.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with the MultiPartyEscrow contract.

###### returns:

- _None_

#### `add_funds`

Adds funds to the payment channel.

###### args:

- `amount` (int): The amount of funds to add to the payment channel.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `extend_expiration`

Extends the expiration time of the payment channel.

###### args:

- `expiration` (int): The new expiration time of the payment channel in blocks.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `extend_and_add_funds`

Extends the expiration time of a payment channel and adds funds to it.

###### args:

- `expiration` (int): The new expiration time of the payment channel in blocks.
- `amount` (int): The amount of funds to add to the channel.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `sync_state`

This method gets the channel state data from the MPE and the daemon and updates all values of the state field.

###### returns:

- _None_

#### `_get_current_channel_state`

Receives channel state data from the daemon via gRPC using PaymentChannelStateService and returns it.

###### returns:

- A tuple containing the current nonce and the current signed amount of funds. (tuple[int, int])

