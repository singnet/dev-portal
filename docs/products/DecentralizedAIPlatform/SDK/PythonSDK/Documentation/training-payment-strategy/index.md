# module: sdk.payment_strategies.training_payment_strategy

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/payment_strategies/training_payment_strategy.py) to GitHub

## Entities:
1. [TrainingPaymentStrategy](#class-trainingpaymentstrategy)
    - [\_\_init\_\_](#init)
    - [get_price](#get-price)
    - [set_price](#set-price)
    - [get_model_id](#get-model-id)
    - [set_model_id](#set-model-id)
    - [get_payment_metadata](#get-payment-metadata)

## Class `TrainingPaymentStrategy`

extends: `PaidCallPaymentStrategy`

is extended by: -

### description

The `TrainingPaymentStrategy` class extends `PaidCallPaymentStrategy` class. The difference from the 
parent class is that for training, the call price is a dynamic value, and can be set using the appropriate 
setter before the call.

### attributes

- `_call_price` (int): The call price. Defaults to -1 (means that no price has been set).
- `_train_model_id` (str): The training model id. Defaults to empty string.

### methods

### `__init__`

Initializes a new instance of the class.

##### returns:

- _None_

### `get_price`

Returns the price of the service call - `_call_price` value.

##### returns:

- The price of the service call. (int)

##### raises:

- `Exception`: If no price has been set.

### `set_price`

Sets the price of the service call.

##### args:

- `call_price` (int): The price of the service call.

##### returns:

- _None_

### `get_model_id`

Returns the training model id - `_train_model_id` value.

##### returns:

- The training model id. (str)

### `set_model_id`

Sets the training model id.

##### args:

- `model_id` (str): The training model id.

##### returns:

- _None_

### `get_payment_metadata`

Creates and returns the payment metadata for a service client with the field `snet-payment-type` equals to `train-call`.

##### args:

- `service_client` (ServiceClient): The service client object.

##### returns:

- The payment metadata. (list[tuple[str, str]])
