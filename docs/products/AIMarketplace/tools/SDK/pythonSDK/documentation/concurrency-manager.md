## module: sdk.concurrency_manager

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/concurrency_manager.py) to GitHub

Entities:
1. [ConcurrencyManager](#class-concurrencymanager)
   - [\_\_init\_\_](#__init__)
   - [concurrent_calls](#concurrent_calls)
   - [get_token](#get_token)
   - [__get_token](#__get_token)
   - [__get_stub_for_get_token](#__get_stub_for_get_token)
   - [__get_token_for_amount](#__get_token_for_amount)
   - [record_successful_call](#record_successful_call)

### Class `ConcurrencyManager`

extends: -

is extended by: -

#### description

`ConcurrencyManager` provides a mechanism for managing the concurrency of service calls in the SDK. 
It ensures that only a certain number of concurrent calls are made and handles the retrieval and management 
of tokens for making service calls.

#### attributes

- `__concurrent_calls` (int): The number of concurrent calls allowed.
- `__token` (str): The token used for concurrent calls.
- `__planned_amount` (int): The planned amount for the payment.
- `__used_amount` (int): The amount used for the payment.

#### methods

#### `__init__`

Initializes a new instance of the class.

###### args:

- concurrent_calls (int): The number of concurrent calls allowed.

###### returns:

- _None_

#### `concurrent_calls`

decorator: `@property`

Returns the number of concurrent calls allowed.

###### returns:

- The number of concurrent calls allowed. (int)

#### `get_token`

Retrieves a token for making service calls.

###### args:

- `service_client` (ServiceClient): The service client instance.
- `channel` (PaymentChannel): The payment channel instance.
- `service_call_price` (int): The price of a service call.

###### returns:

- The token for making service calls. (str)

#### `__get_token`

Retrieves a token for a service call.

###### args:

- `service_client` (ServiceClient): The service client instance.
- `channel` (PaymentChannel): The payment channel instance.
- `service_call_price` (int): The price of a service call.
- `new_token` (bool): Whether is needed a new token. Defaults to `False`.

###### returns:

- The token for the service call. (str)

###### raises:

- grpc.RpcError: If an error occurs while retrieving the token.

#### `__get_stub_for_get_token`

Retrieves the gRPC service stub for the TokenServiceStub.

###### args:

- `service_client` (ServiceClient): The service client instance.

###### returns:

- The gRPC service stub for the TokenServiceStub. (ServiceStub)

#### `__get_token_for_amount`

Retrieves a token for a given amount from the token service.

This function retrieves a token for a given amount from the token service. It first retrieves the nonce
from the channel state, then it creates a stub for the token service using the `get_stub_for_get_token`
method. It then imports the `token_service_pb2` module and retrieves the current block number from the
service client's SDK web3 instance. It generates a message using the `solidity_keccak` method from the
`web3.Web3` class and generates signatures using the `generate_signature` method from the service client.
It creates a `TokenRequest` object with the necessary parameters and sends it to the token service using
the `GetToken` method of the stub. Finally, it returns the token reply object containing the token.

###### args:

- `service_client` (ServiceClient): The service client instance.
- `channel` (PaymentChannel): The payment channel instance.
- `amount` (int): The amount for which the token is requested.

###### returns:

- The token reply object containing the token. (Any)

#### `record_successful_call`

Increments the `__used_amount` attribute by 1 to record a successful call.

###### returns:

- _None_

 