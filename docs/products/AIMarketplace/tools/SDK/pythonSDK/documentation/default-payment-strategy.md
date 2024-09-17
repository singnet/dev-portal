## module: sdk.payment_strategies.default_payment_strategy

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/payment_strategies/default_payment_strategy.py) to GitHub

Entities:
1. [DefaultPaymentStrategy](#class-defaultpaymentstrategy)
   - [\_\_init\_\_](#__init__)
   - [set_concurrency_token](#set_concurrency_token)
   - [set_channel](#set_channel)
   - [get_payment_metadata](#get_payment_metadata)
   - [get_concurrency_token_and_channel](#get_concurrency_token_and_channel)

### Class `DefaultPaymentStrategy`

extends: `PaymentStrategy`

is extended by: -

#### description

The `DefaultPaymentStrategy` class is an implementation of the `PaymentStrategy`. It defines and returns 
payment metadata for a given service client, taking into account free calls, concurrency, and various 
payment strategies. In fact, it is not an implementation of a payment strategy on its own, this class is used 
by default and selects a payment strategy from `FreeCallPaymentStrategy`, `PaidCallPaymentStrategy` 
and `PrePaidPaymentStrategy`.

#### attributes

- `concurrent_calls` (int): The number of concurrent calls allowed.
- `concurrencyManager` (ConcurrencyManager): An instance of the `ConcurrencyManager` class for managing concurrency.
- `channel` (PaymentChannel): The payment channel used for a specific service call.

#### methods

#### `__init__`

Initializes a new instance of the class.

###### args:

- `concurrent_calls` (int): The number of concurrent calls allowed. Defaults to 1.

###### returns:

- _None_

#### `set_concurrency_token`

Sets the concurrency token for the concurrency manager.

###### args:

- `token` (str): The token to be set.

###### returns:

- _None_

#### `set_channel`

Sets a new channel object.

###### args:

- `channel` (PaymentChannel): The channel to set for the `DefaultPaymentStrategy` object.

###### returns:

- _None_

#### `get_payment_metadata`

Retrieves payment metadata for the specified service client. Depending on several conditions, creates 
an instance of one of the `FreeCallPaymentStrategy`, `PaidCallPaymentStrategy` and `PrePaidPaymentStrategy` 
classes and calls the method of the same name in it.

###### args:

- `service_client` (ServiceClient): The service client object.

###### returns:

- The payment metadata. (list[tuple[str, Any]])

#### `get_concurrency_token_and_channel`

Retrieves the concurrency token and channel for a given service client.

###### args:

- `service_client` (ServiceClient): The service client instance.

###### returns:

- The concurrency token and channel. (tuple[str, PaymentChannel])

