## module: sdk.payment_strategies.paidcall_payment_strategy

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/payment_strategies/paidcall_payment_strategy.py) to GitHub

Entities:
1. [PaidCallPaymentStrategy](#class-paidcallpaymentstrategy)
   - [\_\_init\_\_](#__init__)
   - [get_price](#get_price)
   - [get_payment_metadata](#get_payment_metadata)
   - [select_channel](#select_channel)
   - [_has_sufficient_funds](#static-_has_sufficient_funds)
   - [_is_valid](#static-_is_valid)

### Class `PaidCallPaymentStrategy`

extends: `PaymentStrategy`

is extended by: -

#### description

The `PaidCallPaymentStrategy` class is a concrete implementation of the `PaymentStrategy` interface.
This is the simplest payment strategy among those presented. In it availability of channel, funds and 
expiration are checked before each call and the payment itself is made each call.

#### attributes

- `block_offset` (int): Block offset.
- `call_allowance` (int): The amount of allowed calls.

#### methods

#### `__init__`

Initializes a new instance of the class.

###### args:

- `block_offset` (int): Block offset.
- `call_allowance` (int): The amount of allowed calls. Defaults to 1.

###### returns:

- _None_

#### `get_price`

Returns the price of the service call using service client.

###### args:

- `service_client` (ServiceClient): The service client object.

###### returns:

- The price of the service call. (int)

#### `get_payment_metadata`

Creates and returns the payment metadata for a service client with the field `snet-paument-type` equals to `escrow`.

###### args:

- `service_client` (ServiceClient): The service client object.

###### returns:

- The payment metadata. (list[tuple[str, Any]])

#### `select_channel`

Retrieves the suitable payment channel from the MPE. Opens the channel, extends expiration 
and adds funds id it is necessary.

###### args:

- `service_client` (ServiceClient): The service client object.

###### returns:

- The payment channel for the service calling. (PaymentChannel)

#### static `_has_sufficient_funds`

Checks whether the payment channel has the required amount of funds.

###### args:

- `channel` (PaymentChannel): The payment channel to check.
- `amount` (int): The amount of funds in cogs to check.

###### returns:

- True if the channel has enough funds, False otherwise. (bool)

#### static `_is_valid`

Checks if the payment channel expires later than it should.

###### args:

- `channel` (PaymentChannel): The payment channel to check.
- `expiry` (int): The expiration time in blocks to check.

###### returns:

- True if the channel has enough expiration, False otherwise. (bool)

