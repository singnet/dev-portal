## module: sdk.payment_strategies.freecall_payment_strategy

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/payment_strategies/freecall_payment_strategy.py) to GitHub

Entities:
1. [FreeCallPaymentStrategy](#class-freecallpaymentstrategy)
   - [is_free_call_available](#is_free_call_available)
   - [get_payment_metadata](#get_payment_metadata)
   - [generate_signature](#generate_signature)

### Class `FreeCallPaymentStrategy`

extends: `PaymentStrategy`

is extended by: -

#### description

The `FreeCallPaymentStrategy` class is a concrete implementation of the `PaymentStrategy` interface.
It allows you to use free calls (which can be received from the [Dapp](https://beta.singularitynet.io/)) to 
call services. 

#### methods

#### `is_free_call_available`

Checks if a free call is available for a given service client.

###### args:

- `service_client` (ServiceClient): The service client instance.

###### returns:

- True if a free call is available, False otherwise. (bool)

###### raises:

-  Exception: If an error occurs while checking the free call availability.

_Note_: If any exception occurs during the process, it returns False.

#### `get_payment_metadata`

Retrieves the payment metadata for a service client with the field `snet-paument-type` equals to `free-call` 
using the provided free call configuration.

###### args:

- `service_client` (ServiceClient): The service client instance.

###### returns:

- The payment metadata. (list[tuple[str, Any]])

#### `generate_signature`

Generates a signature for the given service client using the provided free call configuration.

###### args:

- `service_client` (ServiceClient): The service client instance.

###### returns:

- A tuple containing the generated signature and the current block number. (tuple[bytes, int])

###### raises:

- Exception: If any of the required parameters for the free call strategy are missing.
