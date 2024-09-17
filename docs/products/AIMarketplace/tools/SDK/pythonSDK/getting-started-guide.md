
# snet-sdk-python

SingularityNET SDK for Python

## Package

The package is published in PyPI at the following link:

|Package                                       |Description                                                          |
|----------------------------------------------|---------------------------------------------------------------------|
|[snet.sdk](https://pypi.org/project/snet.sdk/)|Integrate SingularityNET services seamlessly into Python applications|

### Core concepts

The SingularityNET SDK allows you to make calls to SingularityNET services programmatically from your application.
To communicate between clients and services, SingularityNET uses [gRPC](https://grpc.io/).
To handle payment of services, SingularityNET uses 
[Ethereum state channels](https://dev.singularitynet.io/docs/concepts/multi-party-escrow/).
The SingularityNET SDK abstracts and manages state channels with service providers on behalf of the user and 
handles authentication with the SingularityNET services.

## Getting Started  
  
These instructions are for the development and use of the SingularityNET SDK for Python.

### Usage

To call a service on a SingularityNET platform, the user must be able to deposit funds (AGIX tokens) to the 
[Multi-Party Escrow](https://dev.singularitynet.io/docs/concepts/multi-party-escrow/) Smart Contract.
To deposit these tokens or do any other transaction on the Ethereum blockchain.

Once you have installed snet-sdk in your current environment, you can import it into your Python script and create an 
instance of the base sdk class:
```python
from snet import sdk
config = {
        "private_key": 'YOUR_PRIVATE_WALLET_KEY',
        "eth_rpc_endpoint": f"https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
        "email": "your@email.com",
        "concurrency": False,
        "identity_name": "local_name_for_that_identity",
        "identity_type": "key",
        "network": "sepolia",
        "force_update": False
    }

snet_sdk = sdk.SnetSDK(config)
```

The `config` parameter is a Python dictionary.
See [test_sdk_client.py](https://github.com/singnet/snet-sdk-python/blob/master/testcases/functional_tests/test_sdk_client.py) 
for a reference.

##### Config options description

- private_key: Your wallet's private key that will be used to pay for calls. Is **required** to make a call;   
- eth_rpc_endpoint: RPC endpoint that is used to access the Ethereum network. Is **required** to make a call;   
- email: Your email;  
- identity_name: Name that will be used locally to save your wallet settings. You can check your identities in the `~/.snet/config` file;   
- identity_type: Type of your wallet authentication. Note that snet-sdk currently supports only "key" identity_type;   
- network: You can set the Ethereum network that will be used to make a call;   
- force_update: If set to False, will reuse the existing gRPC stubs (if any) instead of downloading proto and regenerating them every time.   

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

### Free call 

If you want to use the free calls you will need to pass these arguments to the `create_service_client()` method:

```python    
free_call_auth_token_bin = "f2548d27ffd319b9c05918eeac15ebab934e5cfcd68e1ec3db2b92765",
free_call_token_expiry_block = 172800
```

You can receive these for a given service from the [Dapp](https://beta.singularitynet.io/)

Creating a service client with free calls included would look like this:
```python
service_client = snet_sdk.create_service_client(org_id="26072b8b6a0e448180f8c0e702ab6d2f", 
                                                service_id="Exampleservice",
                                                group_name="default_group",
                                                free_call_auth_token_bin="f2548d27ffd319b9c05918eeac15ebab934e5cfcd68e1ec3db2b92765",
                                                free_call_token_expiry_block=172800)
```

### Paid call

#### Open channel with the specified amount of funds and expiration

`open_channel()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function) opens a payment channel with the specified amount of AGIX tokens in cogs and expiration time. 
Expiration is payment channel's TTL in blocks. When opening a channel, funds are taken from MPE. So they must be 
pre-deposited on it. For this, you can use the `deposit_to_escrow_account()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function) 
method.

```python
snet_sdk.account.deposit_to_escrow_account(123456)
service_client.open_channel(amount=123456, expiration=33333)
```

You can also use the `deposit_and_open_channel()`[[1]](#1-this-method-uses-a-call-to-a-paid-smart-contract-function) 
method instead. It does the same as the previous one, but first deposits the specified amount of AGIX tokens in cogs 
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
print(f"The price in cogs for calling the service {service_client.service_id} is {price}")
# The price in cogs for calling the service Exampleservice is 1
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
# ('groups', [{'free_calls': 0, 'free_call_signer_address': '0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F', 'daemon_addresses': ['0x0709e9b78756b740ab0c64427f43f8305fd6d1a7'], 'pricing': [{'default': True, 'price_model': 'fixed_price', 'price_in_cogs': 1}], 'endpoints': ['http://node1.naint.tech:62400'], 'group_id': '/mb90Qs8VktxGQmU0uRu0bSlGgqeDlYrKrs+WbsOvOQ=', 'group_name': 'default_group'}])
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

---

###### 1 This method uses a call to a paid smart contract function.

---

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
