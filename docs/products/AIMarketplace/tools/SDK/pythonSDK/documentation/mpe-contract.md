## module: sdk.mpe.mpe_contract

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/mpe/mpe_contract.py) to GitHub

Entities:
1. [MPEContract](#class-mpecontract)
   - [\_\_init\_\_](#__init__)
   - [balance](#balance)
   - [deposit](#deposit)
   - [open_channel](#open_channel)
   - [deposit_and_open_channel](#deposit_and_open_channel)
   - [channel_add_funds](#channel_add_funds)
   - [channel_extend](#channel_extend)
   - [channel_extend_and_add_funds](#channel_extend_and_add_funds)
   - [_fund_escrow_account](#_fund_escrow_account)

### Class `MPEContract`

extends: -

is extended by: -

#### description

The `MPEContract` class is responsible for interacting with the MultiPartyEscrow 
contract on the Ethereum blockchain. It provides methods for retrieving the balance of an address, depositing 
funds into the contract, opening a channel, adding funds to a channel, extending the expiration of a channel, and more.

#### attributes

- `web3` (Web3): An instance of the Web3 class for interacting with the Ethereum blockchain.
- `contract` (Contract): An instance of the `Contract` class from the `web3` library for interacting 
with the MultiPartyEscrow contract.
- `event_topics` (list): A list of event topics for the MultiPartyEscrow contract.
- `deployment_block` (int | BlockNumber): The block number at which the MultiPartyEscrow contract was deployed.

#### methods

#### `__init__`

Initializes a new instance of the class. The class is initialized with a Web3 object and an optional contract address. 
If no contract address is provided, it uses the default MultiPartyEscrow contract.

###### args:

- `w3` (Web3): An instance of the `Web3` class.
- `address` (str): The address of the MultiPartyEscrow contract. Defaults to None.

###### returns:

- _None_

#### `balance`

Returns the balance of the given address in the MPE contract in cogs.

###### args:

- `address` (str): The address to retrieve the balance for.

###### returns:

- The balance in cogs. (int)

#### `deposit`

Deposit the specified amount of AGIX tokens in cogs into the MultiPartyEscrow contract.

###### args:

- `account` (Account): The account instance used to send the transaction.
- `amount_in_cogs` (int): The amount of AGIX tokens in cogs to deposit.


###### returns:

- The transaction receipt of the deposit transaction. (TxReceipt)

#### `open_channel`

Opens a payment channel with the specified amount of AGIX tokens in cogs (taken from MPE) and expiration time.

###### args:

- `account` (Account): The account object used to send the transaction.
- `payment_address` (str): The address of the payment recipient.
- `group_id` (str): The ID of the payment group.
- `amount` (int): The amount of AGIX tokens in cogs to deposit into the channel.
- `expiration` (int): The expiration time of the payment channel in blocks.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `deposit_and_open_channel`

Opens a payment channel with the specified amount of AGIX tokens in cogs (which are previously deposited on MPE) 
and expiration time. The account must have sufficient allowance to perform the deposit, otherwise the account 
first approves the transfer.

###### args:

- `account` (Account): The account object used to send the transaction.
- `payment_address` (str): The address of the payment recipient.
- `group_id` (str): The ID of the payment group.
- `amount` (int): The amount of AGIX tokens in cogs first for deposit on MPE, then for deposit on the channel.
- `expiration` (int): The expiration time of the payment channel in blocks.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `channel_add_funds`

Adds funds to an existing payment channel.

###### args:

- `account` (Account): The account object used to sign the transaction.
- `channel_id` (int): The ID of the payment channel.
- `amount` (int): The amount of funds to add to the channel.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `channel_extend`

Extends the expiration time of a payment channel.

###### args:

- `account` (Account): The account object used to send the transaction.
- `channel_id` (int): The ID of the payment channel.
- `expiration` (int): The new expiration time of the payment channel in blocks.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `channel_extend_and_add_funds`

Extends the expiration time of a payment channel and adds funds to it.

###### args:

- `account` (Account): The account object used to send the transaction.
- `channel_id` (int): The ID of the payment channel.
- `expiration` (int): The new expiration time of the payment channel in blocks.
- `amount` (int): The amount of funds to add to the channel.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `_fund_escrow_account`

Funds the escrow account for the given account with the specified amount.

###### args:

- `account` (Account): The account object used to send the transaction and for which 
the escrow account needs to be funded.
- `amount` (int): The amount to be funded into the escrow account.

###### returns:

- The transaction receipt of the transaction. (TxReceipt | _None_)

