# module: sdk.payment_strategies.freecall_payment_strategy

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/payment_strategies/freecall_payment_strategy.py) to GitHub

## Entities:
1. [FreeCallPaymentStrategy](#class-freecallpaymentstrategy)
   - [get_free_calls_available](#get_free_calls_available)
   - [get_payment_metadata](#get_payment_metadata)
   - [generate_signature](#generate_signature)
   - [get_free_call_token_details](#get_free_call_token_details)

## Class `FreeCallPaymentStrategy`

extends: `PaymentStrategy`

is extended by: -

### description

The `FreeCallPaymentStrategy` class is a concrete implementation of the `PaymentStrategy` interface.
It allows you to use free calls (which can be received from the daemon) to 
call services. 

### methods

### `get_free_calls_available`

Using grpc calls to the daemon, it gets a free call token, and also gets and returns the number of free calls 
available.

##### args:

- `service_client` (ServiceClient): The service client instance.

##### returns:

- Amount of free calls available. (int)

##### raises:

-  Exception: If an error occurs while checking the free call availability.

_Note_: If an error occurs specifically during the grpc call to `GetFreeCallsAvailable`, 0 will be returned.

### `get_payment_metadata`

Retrieves the payment metadata for a service client with the field `snet-payment-type` equals to `free-call` 
using the provided free call configuration.

##### args:

- `service_client` (ServiceClient): The service client instance.

##### returns:

- The payment metadata. (list[tuple[str, Any]])

### `generate_signature`

Generates a signature for the given service client using the provided free call configuration.

##### args:

- `service_client` (ServiceClient): The service client instance.
- `current_block_number` (int, optional): The current block number. Defaults to _None_.
- `with_token` (bool, optional): Whether to include the free call token in the signature. Defaults to _True_.

##### returns:

- A tuple containing the generated signature and the current block number. (tuple[bytes, int])

##### raises:

- Exception: If any of the required parameters for the free call strategy are missing.

### `get_free_call_token_details`

Sends a request to the daemon and receives a free call token and its details.

##### args:

- `service_client` (ServiceClient): The service client instance.
- `current_block_number` (int, optional): The current block number. Defaults to _None_.

##### returns:

- A tuple containing the free call token and the token expiration block number. (tuple[str, int])

##### raises:

- Exception: If an error occurred while receiving the token.