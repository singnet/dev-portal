
# module : sdk.payment_strategies.payment_strategy

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/payment_strategies/payment_strategy.py) to GitHub

## Entities:
1. [PaymentStrategy](#abstract-class-paymentstrategy)
   - [get_payment_metadata](#abstract-get-payment-metadata)
   - [get_price](#abstract-get-price)

## Abstract Class `PaymentStrategy`

extends: `object`

is extended by: `DefaultPaymentStrategy`, `DefaultPaymentStrategy`, `PaidCallPaymentStrategy`, `PrePaidPaymentStrategy`

### description

Abstract base class for payment strategies. Defines the interface for organizing payment strategy.

### methods

### abstract `get_payment_metadata`

Determines and returns payment metadata for a specified service client.

##### args:

- `service_client` (ServiceClient): The service client object.

##### returns:

- Payment metadata. (list[tuple[str, Any]])

### abstract `get_price`

Returns the price for calling a service using the provided client service.

##### args:

- `service_client` (ServiceClient): The service client object.

##### returns:

- Price of calling service in AFET. (int)

