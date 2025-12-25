# snet-sdk-python

SingularityNET SDK for Python

## Package

The package is published in PyPI at the following link:

| Package                                        |Description                                                          |
|------------------------------------------------|---------------------------------------------------------------------|
| [snet-sdk](https://pypi.org/project/snet-sdk/) |Integrate SingularityNET services seamlessly into Python applications|

### Core concepts

The SingularityNET SDK allows you to make calls to SingularityNET services programmatically from your application.
To communicate between clients and services, SingularityNET uses [gRPC](https://grpc.io/).
To handle payment of services, SingularityNET uses 
[Ethereum state channels](https://dev.singularitynet.io/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe).
The SingularityNET SDK abstracts and manages state channels with service providers on behalf of the user and 
handles authentication with the SingularityNET services.

## Getting Started  
  
These instructions are for the development and use of the SingularityNET SDK for Python.

### Usage

To call a service on a SingularityNET platform, the user must be able to deposit funds (FET tokens) to the 
[Multi-Party Escrow](https://dev.singularitynet.io/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe) Smart Contract.
To deposit these tokens or do any other transaction on the Ethereum blockchain.

Once you have installed snet-sdk in your current environment, you can import it into your Python script and create an 
instance of the base sdk class:
```python
from snet import sdk

"""
SDK configuration provided by the application provider.
To run the application, replace 'private_key' and 'eth_rpc_endpoint' with your values.
"""
config = sdk.config.Config(
    private_key="YOUR_PRIVATE_KEY",  # Replace with your Ethereum private key
    eth_rpc_endpoint="https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",  # Replace with your Alchemy API key
    concurrency=False, 
    force_update=False 
)

# Initialize the SnetSDK instance
snet_sdk = sdk.SnetSDK(config)
```

The `config` parameter is an instance of the `Config` class.
See [config.py](https://dev.singularitynet.io/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/config/) 
for a reference.

#### Config parameters description

- `private_key`: Your wallet's private key that will be used to pay for calls. Is **required** in config;   
- `eth_rpc_endpoint`: RPC endpoint that is used to access the Ethereum network. Is **required** in config;
> To get your **Alchemy API Key**, follow [this guide](https://dev.singularitynet.io/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/).

- `wallet_index`: The index of the wallet that will be used to pay for calls;
- `ipfs_endpoint`: IPFS endpoint that is used to access IPFS;
- `concurrency`: If set to True, will enable concurrency for the SDK;
- `force_update`: If set to False, will reuse the existing gRPC stubs (if any) instead of downloading proto and regenerating them every time.   
- `mpe_contract_address`: The address of the Multi-Party Escrow smart contract;
- `token_contract_address`: The address of the SingularityNET token smart contract;
- `registry_contract_address`: The address of the Registry smart contract;
- `signer_private_key`: The private key of the signer. Used to sign the service call. Equals to `private_key` by default.

#### List organizations and their services

You can use the sdk client instance`s methods get_organization_list() to list all organizations and get_services_list("org_id") to list all services of a given organization.  

```python
orgs_list = snet_sdk.get_organization_list()
print(*orgs_list, sep="\n")
# ...
# GoogleOrg3
# 26072b8b6a0e448180f8c0e702ab6d2f
# 43416d873fcb454589900189474b2eaa
# ...
```

```python
org_id = "26072b8b6a0e448180f8c0e702ab6d2f"
services_list = snet_sdk.get_services_list(org_id=org_id)
print(*services_list, sep="\n")
# Exampleservice
```

### Calling the service

Now, the instance of the sdk can be used to create the service client instances, using `create_service_client()` method.  
Continuing from the previous code here is an example using `Exampleservice` from the `26072b8b6a0e448180f8c0e702ab6d2f` 
organization:

```python
service_client = snet_sdk.create_service_client(org_id="26072b8b6a0e448180f8c0e702ab6d2f", 
                                                service_id="Exampleservice",
                                                group_name="default_group")
```

After executing this code, you should have client libraries created for this service. They are located at the following 
path: `~/.snet/org_id/service_id/python/`

_Note_: Currently you can only save files to `~/.snet/`.  

The instance of service_client that has been generated can be utilized to invoke the methods that the service offers. 
You can list these using the `get_services_and_messages_info_as_pretty_string()` method:

```python
print(service_client.get_services_and_messages_info_as_pretty_string())
# Service: Calculator
#   Method: add, Input: Numbers, Output: Result
#   Method: sub, Input: Numbers, Output: Result
#   Method: mul, Input: Numbers, Output: Result
#   Method: div, Input: Numbers, Output: Result
# Message: Numbers
#   Field: float a
#   Field: float b
# Message: Result
#   Field: float value

```

To invoke the service's methods, you can use the `call_rpc()` method. This method requires the names of the method and 
data object, along with the data itself, to be passed into it. 
To continue with our example, here’s a call to the *mul* method of the *Exampleservice* from the 
*26072b8b6a0e448180f8c0e702ab6d2f* organization:

```python
result = service_client.call_rpc("mul", "Numbers", a=20, b=3)
print(f"Calculating 20 * 3: {result}") 
#  Calculating 20 * 3: 60.0
```

For more information about gRPC and how to use it with Python, please see:
- [gRPC Basics - Python](https://grpc.io/docs/tutorials/basic/python.html)
- [gRPC Python’s documentation](https://grpc.io/grpc/python/)

_Note_: In this example, the user doesn't deposit funds to MPE, doesn't open a channel, and doesn't 
perform other actions related to payment. In this case, the choice of payment strategy, as well as, if necessary, 
opening a channel and depositing funds into MPE occurs automatically. For more information on payment, please 
visit the [Payment](#payment) section.

## Payment

When creating a service client, you can select a payment strategy using the `payment_strategy_type` parameter:

```python
from snet.sdk import PaymentStrategyType

payment_strategy_type = PaymentStrategyType.<NAME>
```

These are four payment strategies:

- `PaymentStrategyType.DEFAULT`
- `PaymentStrategyType.FREE_CALL`
- `PaymentStrategyType.PAID_CALL`
- `PaymentStrategyType.PREPAID_CALL`

The default payment strategy selects one of the other three each time the service is called, depending on the 
availability of free calls, as well as the presence of parameters required for concurrent calls. While choosing 
a specific payment strategy will not allow you to switch to another. This is especially convenient when you want 
to use free calls without accidentally spending money.

> Note: If you don't specify еру `payment_strategy_type` parameter, the default payment strategy will be used.

### Free call 

If you want to use the free calls you will need to choose `PaymentStrategyType.FREE_CALL` as the payment strategy type.
Creating a service client with free calls included would look like this:

```python
service_client = snet_sdk.create_service_client(org_id="26072b8b6a0e448180f8c0e702ab6d2f", 
                                                service_id="Exampleservice",
                                                payment_strategy_type = PaymentStrategyType.FREE_CALL)
```

### Paid call

If you want to use regular paid calls you will need to choose `PaymentStrategyType.PAID_CALL` as the payment strategy type.
Creating a service client with paid calls would look like this:

```python
service_client = snet_sdk.create_service_client(org_id="26072b8b6a0e448180f8c0e702ab6d2f", 
                                                service_id="Exampleservice",
                                                payment_strategy_type = PaymentStrategyType.PAID_CALL)
```

There is no need to call functions for interacting with payment channels, because they are automatically 
managed by the SDK. But anyway you can use them if you want.

#### Open channel with the specified amount of funds and expiration

`open_channel()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function) opens a payment channel with the specified amount of ASI (FET) tokens in AFET and expiration time. 
Expiration is payment channel's TTL in blocks. When opening a channel, funds are taken from MPE. So they must be 
pre-deposited on it. For this, you can use the `deposit_to_escrow_account()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function) 
method.

```python
snet_sdk.account.deposit_to_escrow_account(123456)
service_client.open_channel(amount=123456, expiration=33333)
```

You can also use the `deposit_and_open_channel()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function) 
method instead. It does the same as the previous one, but first deposits the specified amount of ASI (FET) tokens in AFET 
into an MPE.

```python
service_client.deposit_and_open_channel(amount=123456, expiration=33333)
```

#### Extend expiration and add funds

`open_channel()` as well as `deposit_and_open_channel()` returns the payment channel. You can use it to add funds to it
and extend its expiration using the following methods: 
`add_funds()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function), 
`extend_expiration`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function) 
and `extend_and_add_funds()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function). 

```python
payment_channel = service_client.open_channel(amount=123456, expiration=33333)

payment_channel.add_funds(amount=123456)
payment_channel.extend_expiration(expiration=33333)

payment_channel.extend_and_add_funds(amount=123456, expiration=33333)
```

### Concurrent (Prepaid) call

Concurrent (prepaid) calls allow you to prepay for a batch of service calls in advance. This off-chain strategy 
is ideal for scenarios requiring high throughput and low latency. Unlike regular paid calls, the payment is done 
once upfront, and the SDK automatically manages the channel during usage.

If you want to use prepaid calls you will need to choose `PaymentStrategyType.PREPAID_CALL` as the payment strategy type
as well as pass the number of concurrent calls as the `concurrent_calls` parameter. Creating a service client with 
prepaid calls would look like this:

```python
service_client = snet_sdk.create_service_client(
    org_id="26072b8b6a0e448180f8c0e702ab6d2f",
    service_id="Exampleservice",
    group_name="default_group",
    payment_strategy_type=PaymentStrategyType.PREPAID_CALL,
    concurrent_calls=5  # Number of prepaid calls to allocate
)
```

Then you can make service calls as usual, and the SDK will use the prepaid pool internally:

```python
for i in range(5):
    response = service_client.call_rpc("add", "Numbers", a=1, b=2)
    print(f"Concurrent call {i+1} result:", response)
```

This model is especially useful for batch inference or rapid sequential calls without incurring on-chain transaction costs for each invocation.

### Train call

Some of the training methods, namely `upload_and_validate` and `train_model`, are paid as well as the regular service call. 
Accordingly, you need to pay some FET to take advantage of the training. For this, as for a regular service call, 
you need a payment channel with the required amount of funds on it and expiration (in Python SDK, the selection, 
opening or adding funds to the channel is done automatically). 

The only difference is that the price of a service call is a static number stored in the service metadata, whereas 
the price of calling the methods above is determined each time through the service provider before calling 
these methods. There are auxiliary methods `validate_model_price` and `train_model_price` respectively to determine 
the price of calling paid methods.

```python
validate_price = service_client.training.validate_model_price(model_id)
model_status = service_client.training.upload_and_validate(model_id, zip_path, validate_price)

# -------------------------------------------------------------------------------

train_price = service_client.training.train_model_price(model_id)
model_status = service_client.training.train_model(model_id, train_price)
```

## Other useful features

#### Get the current block number

Service client also provides several useful functions. If you need to find out the number of 
the current block in the blockchain, there is a `get_current_block_number()` method for this:

```python
block_number = service_client.get_current_block_number()
print(f"Current block is {block_number}")
# Current block is 6574322
```

#### Get the service call price

To find out the price of calling a service function, you need to use the `get_price()` method:

```python
price = service_client.get_price()
print(f"The price in AFET for calling the service {service_client.service_id} is {price}")
# The price in AFET for calling the service Exampleservice is 1
```

#### Get the metadata of the service

The metadata of services is stored in IPFS. To view it, you need to call the `get_service_metadata()` method, passing 
the organization id and the service id to it.

```python
service_metadata = snet_sdk.get_service_metadata(org_id="26072b8b6a0e448180f8c0e702ab6d2f", service_id="Exampleservice")
print(*service_metadata.m.items(), sep="\n", end="\n\n")
print(*service_metadata.get_tags(), sep=",", end="\n\n")
print(*service_metadata.get_all_endpoints_for_group(group_name="default_group"), sep=",", end="\n\n")

# ('version', 1)
# ('display_name', 'Example service')
# ('encoding', 'proto')
# ('service_type', 'grpc')
# ('model_ipfs_hash', 'QmeyrQkEyba8dd4rc3jrLd5pEwsxHutfH2RvsSaeSMqTtQ')
# ('mpe_address', '0x7E0aF8988DF45B824b2E0e0A87c6196897744970')
# ('groups', [{'free_calls': 0, 'free_call_signer_address': '0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F', 'daemon_addresses': ['0x0709e9b78756b740ab0c64427f43f8305fd6d1a7'], 'pricing': [{'default': True, 'price_model': 'fixed_price', 'price_in_afet': 1}], 'endpoints': ['http://node1.naint.tech:62400'], 'group_id': '/mb90Qs8VktxGQmU0uRu0bSlGgqeDlYrKrs+WbsOvOQ=', 'group_name': 'default_group'}])
# ('service_description', {'url': 'https://ropsten-v2-publisher.singularitynet.io/org', 'short_description': 'Example service', 'description': 'Example service'})
# ('media', [{'order': 1, 'url': 'https://ropsten-marketplace-service-assets.s3.us-east-1.amazonaws.com/26072b8b6a0e448180f8c0e702ab6d2f/services/d05c62bf9aa84843a195457d98417f4e/assets/20240327124952_asset.jpeg', 'file_type': 'image', 'asset_type': 'hero_image', 'alt_text': ''}])
# ('contributors', [{'name': 'test', 'email_id': ''}])
# ('tags', ['exampleservice'])
# 
# exampleservice
# 
# http://node1.naint.tech:62400
```

#### Get raw services and messages info

In the section [Calling the service](#calling-the-service) we already talked about the function 
`get_services_and_messages_info_as_pretty_string()`, with which you can get information about the methods and 
messages of a service. But if you need to process lists of services and messages, it is better to use the 
`get_services_and_messages_info()` method.

```python
services, messages = service_client.get_services_and_messages_info()
print(services)
print(messages)

# {'Calculator': [('add', 'Numbers', 'Result'), ('sub', 'Numbers', 'Result'), ('mul', 'Numbers', 'Result'), ('div', 'Numbers', 'Result')]}
# {'Numbers': [('float', 'a'), ('float', 'b')], 'Result': [('float', 'value')]}
```

## Training

With the SDK, you can also train models and use them when calling the service.

### Base pipeline

The sequence of basic actions is as follows:
1) Create models
2) Upload training dataset
3) Train the model
4) Call the service based on the new model

##### `create_model`

To create a new model you need to call the `create_model` method. It takes the following parameters:
- `method_name` - name of the service method for which we want to create a new model 
(use [get_training_metadata](#get-training-metadata) method to get the list of available methods)
- `model_name` - name of the new model (you need to come up with this)
- `model_description`- description of the new model (optional) 
- `is_public_accessible` - whether the model is publicly accessible (optional, default: `False`)
- `addresses_with_access` - list of addresses with access to the model (optional) (makes sense only if `is_public_accessible` is _False_)

and returns a `Model` object with all the model information.

```python
new_model = service_client.training.create_model(method_name=grpc_method_name,
                                                 model_name=model_name)
model_id = new_model.model_id

print(new_model.status) # ModelStatus.CREATED
```

##### `upload_and_validate`

To upload the training dataset you need to call the `upload_and_validate` method. It takes the following parameters:
- `model_id` - id of the model
- `zip_path` - path to archive file with the training dataset
- `validate_price` - price of validating the dataset

and returns a `ModelStatus` object. 

```python
validate_price = service_client.training.validate_model_price(model_id)
zip_path = "PATH_TO_YOUR_DATASET_FILE"  
model_status = service_client.training.upload_and_validate(model_id, zip_path, validate_price)

print(model_status) # ModelStatus.VALIDATING
```

> Note: Dataset validation usually takes some time, so you should wait for the `VALIDATED` status of the model 
> (using the `get_model` or `get_all_models` methods) after sending the dataset for validation before proceeding 
> further with the model.

##### `train_model`

To train the model on an uploaded dataset you need to call the `train_model` method. It takes the following parameters:
- `model_id` - id of the model
- `train_price` - price of training the model

and returns a `ModelStatus` object.

```python
train_price = service_client.training.train_model_price(model_id)
model_status = service_client.training.train_model(model_id, train_price)

print(model_status) # ModelStatus.TRAINING
```

> Note: Model training usually takes some time, so you should wait for the `READY_TO_USE` status of the model 
> (using the `get_model` or `get_all_models` methods) after calling the `train_model` method before proceeding 
> further with the model.

Finally, to call the service, you must call the `call_rpc` method of the `ServiceClient` instance with an 
additional parameter `model_id` in a similar way:

```python
result = service_client.call_rpc(grpc_method_name, grpc_message_name, model_id=model_id, **parameters)
```

For more detailed description please refer to Developer Portal guides:
- [Service Training via SDK]()
- [Training in Python SDK]()

---

###### 1 This method uses a call to a paid smart contract function.

## Development

### Installing

#### Prerequisites

* [Python 3.10](https://www.python.org/downloads/release/python-31012/)  

---

* Clone the git repository  
```bash  
$ git clone git@github.com:singnet/snet-sdk-python.git
$ cd snet-sdk-python
```

* Install the required dependencies
```bash
$ pip install -r requirements.txt
```

* Install the package in development/editable mode  
```bash  
$ pip install -e .
```

## License  
  
This project is licensed under the MIT License - see the
[LICENSE](https://github.com/singnet/snet-sdk-python/blob/master/LICENSE) file for details.