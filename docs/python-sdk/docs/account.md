---
# Page settings
layout: default
keywords: Python SDK, documentation, account module
comments: false
title: `account` module
description: full technical documentation for the snet-sdk-python

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
---
## module: sdk.account

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/account.py) to GitHub

Entities:
1. [TransactionError](#class-transactionerror)
   - [\_\_init\_\_](#__init__)
   - [\_\_str\_\_](#__str__)
2. [Account](#class-account)
   - [\_\_init\_\_](#__init__-1)
   - [_get_nonce](#_get_nonce)
   - [_get_gas_price](#_get_gas_price)
   - [_send_signed_transaction](#_send_signed_transaction)
   - [send_transaction](#send_transaction)
   - [_parse_receipt](#_parse_receipt)
   - [escrow_balance](#escrow_balance)
   - [deposit_to_escrow_account](#deposit_to_escrow_account)
   - [approve_transfer](#approve_transfer)
   - [allowance](#allowance)

### Class `TransactionError`

extends: `Exception`

is extended by: -

#### description

`TransactionError` is a custom exception class that is raised when an Ethereum transaction receipt has a status of 0. 
This indicates that the transaction failed. Can provide a custom message. Optionally includes receipt

#### attributes

- `message` (str): The exception message.
- `receipt` (dict): The transaction receipt.

#### methods

#### `__init__`

Initializes the exception with the provided message and receipt.

###### args:

- `message` (str): The exception message.
- `receipt` (dict): The transaction receipt. Defaults to _None_.

###### returns:

- _None_

#### `__str__`

Returns a string representation of the `TransactionError` object.

###### returns:

- A string containing the `message` attribute of the TransactionError object. (str)

### Class `Account`

extends: -

is extended by: -

#### description

`Account` is responsible for managing the Ethereum account associated with the SingularityNET platform. 
It provides methods for interacting with the MultiPartyEscrow contract, the SingularityNetToken contract, and 
the Ethereum blockchain.

#### attributes

- `config` (dict): The configuration settings for the account. _Note_: In fact, this is the same config 
from `SnetSDK`.
- `web3` (Web3): An instance of the `Web3` class for interacting with the Ethereum blockchain.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class for interacting with 
the MultiPartyEscrow contract.
- `token_contract` (Contract): An instance of the `Contract` class from the `web3` library for interacting 
with the SingularityNET AGIX Token contract.
- `private_key` (str): The private key associated with the account.
- `signer_private_key` (str): The private key used for signing transactions.
- `address` (str): The Ethereum address associated with the account.
- `signer_address` (str): The Ethereum address used for signing transactions.
- `nonce` (int): The nonce value for the account.

#### methods

#### `__init__`

Initializes a new instance of the `Account` class.

###### args:

- `w3` (Web3): An instance of the `Web3` class.
- `config` (dict): A dictionary containing the configuration settings.
- `mpe_contract` (MPEContract): An instance of the `MPEContract` class.

###### returns:

- _None_

#### `_get_nonce`

Returns the next nonce for a transaction.

###### returns:

- The next nonce for a transaction. (int)

#### `_get_gas_price`

Calculates the gas price for a transaction.

Retrieves the current gas price from the Ethereum network using the web3 and increases it 
according to a certain algorithm so that the transaction goes faster.

###### returns:

- The calculated gas price. (int)

#### `_send_signed_transaction`

Sends a signed transaction to the Ethereum blockchain.

Builds a transaction using the given contract function and arguments, signs it with the private key of the account, 
and sends it to the Ethereum blockchain.

###### args:

- `contract_fn`: The contract function to be called.
- `*args`: The arguments to pass to the contract function.

###### returns:

- Hash of the sent transaction. (HexStr | str)

#### `send_transaction`

Sends a transaction by calling the given contract function with the provided arguments.

###### args:

- `contract_fn`: The contract function to be called.
- `*args`: The arguments to pass to the contract function.

###### returns:

- The transaction receipt indicating the success or failure of the transaction. (TxReceipt)

#### `_parse_receipt`

Parses the receipt of a transaction and returns the result as a JSON string.

###### args:

- `receipt` (TxReceipt): The receipt of the transaction.
- `event` (Event): The event to process the receipt with.
- `encoder` (JSONEncoder): The JSON encoder to use. Defaults to json.JSONEncoder.

###### returns:

- The result of processing the receipt as a JSON string. (str)

###### raises:

- TransactionError: If the transaction status is 0, indicating a failed transaction.

#### `escrow_balance`

Retrieves the escrow balance for the current account.

###### returns:

- The escrow balance in cogs. (int)

#### `deposit_to_escrow_account`

Deposit the specified amount of AGIX tokens in cogs into the MPE account.

###### args:

- `amount_in_cogs` (int): The amount of AGIX tokens in cogs to deposit.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `approve_transfer`

Approves a transfer of a specified amount of AGIX tokens in cogs to the MPE contract.

###### args:

- `amount_in_cogs` (int): The amount of AGIX tokens in cogs to approve for transfer.

###### returns:

- The transaction receipt of the transaction. (TxReceipt)

#### `allowance`

Retrieves the allowance of the current account for the MPE contract.

###### returns:

- The allowance in cogs. (int)

