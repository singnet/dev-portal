# Training in Python SDK

## Overview

On the SNET platform, the training functionality allows you to create and train your models on services 
(on which training is enabled), and then use them to invoke methods of those services. For a more detailed look at 
the concepts and details of training, we recommend visiting [this page](/docs/products/DecentralizedAIPlatform/CoreConcepts/training/).

All the description and instructions below are for developing and using the Python SDK, specifically to work 
with training on the side of AI services users.

If you have not yet had experience calling services and using the SDK, we recommend you read the following guides:
- [Getting Ready to Call AI CheckUp](/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToCallAICheckUp/)
- [Python SDK Getting Started Guide](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)

To learn more about the Python SDK, we recommend visiting [docs page](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/).

## Configuration

As usual to work with services in the Python SDK, you need to:

- install the package

```sh
pip install snet.sdk
```

- import the SDK and create basic objects

```python
from snet import sdk


PRIVATE_KEY = "YOUR_PRIVATE_KEY"
ALCHEMY_KEY = "YOUR_ALCHEMY_KEY"

org_id = "ORG_ID"
service_id = "SERVICE_ID"
group_name = "GROUP_NAME"
grpc_method_name = "METHOD_NAME"

config = sdk.config.Config(private_key=PRIVATE_KEY,
                           eth_rpc_endpoint=f"https://eth-sepolia.g.alchemy.com/v2/{ALCHEMY_KEY}",
                           concurrency=False)

snet_sdk = sdk.SnetSDK(config)
service_client = snet_sdk.create_service_client(org_id=org_id,
                                                service_id=service_id,
                                                group_name=group_name)
```

You can also use RPC endpoint of another provider.

Now we need to use the `training` field of the `ServiceClient` instance to call the training methods.

```python
service_client.training.<METHOD_NAME>
```

## Payment

Some of the training methods, namely `upload_and_validate` and `train_model`, are paid as well as the regular service call. 
Accordingly, you need to pay some AGIX to take advantage of the training. For this, as for a regular service call, 
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

## Methods

Let's take a look at all the training methods that are in the Python SDK.

### Base pipeline

The sequence of basic actions is as follows:
1) Create models
2) Upload training dataset
3) Train the model
4) Call the service based on the new model

To create a new model you need to call the `create_model` method. It takes the following parameters:
- `method_name` - name of the service method for which we want to create a new model
- `model_name` - name of the new model
- `model_description`- description of the new model (optional)
- `is_public_accessible` - whether the model is publicly accessible (optional, default: `False`)
- `addresses_with_access` - list of addresses with access to the model (optional)

and returns a `Model` object with all the model information.

```python
new_model = service_client.training.create_model(method_name=grpc_method_name,
                                                 model_name=model_name)
model_id = new_model.model_id

print(new_model.status) # ModelStatus.CREATED
```

To upload the training dataset you need to call the `upload_and_validate` method. It takes the following parameters:
- `model_id` - id of the model
- `zip_path` - path to archive file with the training dataset
- `validate_price` - price of validating the dataset (check [Payment](#payment) section above)

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

To train the model on an uploaded dataset you need to call the `train_model` method. It takes the following parameters:
- `model_id` - id of the model
- `train_price` - price of training the model (check [Payment](#payment) section above)

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

### Additional methods

In addition to the basic ones, there are also methods for working with models and retrieving metadata:
1) `get_training_metadata`
2) `get_method_metadata`
3) `get_model`
4) `get_all_models`
5) `update_model`
6) `delete_model`

`get_training_metadata` allows you to get the metadata about the training in the service:

```python
training_metadata = service_client.training.get_training_metadata()

print(training_metadata)
# training_enabled: True
# training_in_proto: True
# training_methods: {'service1': ['rpc1', 'rpc2'], 'service2': ['rpc3', 'rpc4']}
```

`get_method_metadata` allows you to get the requirements for the dataset on which the model will be trained 
for a particular service method. It takes the following parameters:

- `method_name` - name of the service method
- `model_id` - id of the model (optional)

```python
method_metadata = service_client.training.get_method_metadata(grpc_method_name)

print(method_metadata)
# default_model_id: 'default'
# max_models_per_user: 5
# dataset_max_size_mb: 50
# dataset_max_count_files: 10
# dataset_max_size_single_file_mb: 10
# dataset_files_type: 'jpg, png, jpeg'
# dataset_type: 'zip, tar'
# dataset_description: 'dataset description'
```

`get_model` allows you to get the `Model` object with all the model information for a particular model. 
It takes `model_id` as a parameter.

```python
model = service_client.training.get_model(model_id)

print(model)
# model id: 6a3b5c4
# status: ModelStatus.VALIDATED
# created date: 10-02-2025
# updated date: 10-02-2025
# name: model_name
# description: model_description
# grpc method name: call_service
# grpc service name: ProMethods
# address list: ['0x1234567890123456789012345678901234567890']
# is public: False
# training data link: 
# created by address: 0x1234567890123456789012345678901234567890
# updated by address: 0x1234567890123456789012345678901234567890
```

`get_all_models` allows you to get all the models in the service, but you can use filters if needed. 
It takes the following parameters:
- `statuses` - list of statuses of the models (optional)
- `is_public` - whether the model is public or not (optional)
- `grpc_method_name` - name of the rpc service method (optional)
- `grpc_service_name` - name of the rpc service (optional)
- `model_name` - name of the model (optional)
- `created_by_address` - address of the user who created the model (optional)

and returns a list of `Model` objects.

`update_model` allows you to change the model information. It takes the following parameters:
- `model_id` - id of the model
- `model_name` - name of the model (optional)
- `description` - description of the model (optional)
- `addresses_with_access` - list of addresses of the users who can call the service (optional)

```python
model = service_client.training.create_model(method_name=grpc_method_name,
                                                 model_name="mdel_name") # made a mistake
model_id = model.model_id

model = service_client.training.update_model(model_id, model_name="model_name", # fixed the mistake
                                    description="model_description", # added a description
                                    addresses_with_access=["0x1234567890123456789012345678901234567890"]) # added an address
```

`delete_model` allows you to delete the model from the service. It takes `model_id` as a parameter:

```python
model_status = service_client.training.delete_model(model_id)

print(model_status)
# ModelStatus.DELETED
```

## Exceptions

Exceptions may occur while using the training functionality in the Python SDK. Here's a list of them, with 
explanations and solutions:

- `NoTrainingException`

This exception is thrown while calling the `training` field of the `ServiceClient` instance and the training is not 
enabled in the service. In this case, there is no possibility to use the training functionality in a given service.

> Note: It can also be thrown in case the service is not available at all.

- `WrongMethodException`

This exception is thrown when you try to call training methods with the wrong grpc method name. In this case, 
you should use another name for the method. To get available methods, you can use the `get_training_metadata`.

- `NoSuchModelException`

This exception is thrown when you try to call training methods with the non-existent model id. In this case,
check whether the model exists or not using the `get_all_models` method. If the model does not exist, use another 
id or create a new model.

- `WrongDatasetException`

This exception can be thrown when you try to call `upload_and_validate` method with an inappropriate dataset. 
The point is that the dataset is checked for compliance with the requirements (which can be obtained via the 
`get_method_metadata` method) on the SDK side before loading. If the dataset is not compliant, this exception 
will be thrown, detailing what incompatibilities the dataset has.

```text
snet.sdk.training.exceptions.WrongDatasetException: Dataset check failed:
	Too big dataset size: 24.65625 MB > 10 MB
	Wrong file type: `jpg` in file: `metaverse-avatar-collage-concept.jpg`. Allowed file types: png, mp3, txt
	Too big file `metaverse-avatar-collage-concept.jpg` size: 24.287109375 MB > 5 MB
	Wrong file type: `wav` in file: `result.wav`. Allowed file types: png, mp3, txt
```



## Model status

There are several statuses of the model:
- `CREATED`: after `create_model` method
- `VALIDATING`: after the `upload_and_validate` method and until validation is complete
- `VALIDATED`: after validation has been successful
- `TRAINING`: after the `train_model` method and until training is complete
- `READY_TO_USE`: after training has been successful
- `DELETED`: after `delete_model` method
- `ERRORED`: can occur during validation or training if something went wrong on the service provider's side

## Example

This a sample of how to use the training functionality in the Python SDK with the base pipeline.

```python
import time
from snet import sdk
from snet.sdk.training.responses import ModelStatus


PRIVATE_KEY = "YOUR_PRIVATE_KEY"
ALCHEMY_KEY = "YOUR_ALCHEMY_KEY"


def main():
    org_id = "ORG_ID"
    service_id = "SERVICE_ID"
    group_name = "GROUP_NAME"
    grpc_method_name = "METHOD_NAME"
    
    config = sdk.config.Config(private_key=PRIVATE_KEY,
                               eth_rpc_endpoint=f"https://eth-sepolia.g.alchemy.com/v2/{ALCHEMY_KEY}",
                               concurrency=False)
    
    snet_sdk = sdk.SnetSDK(config)
    service_client = snet_sdk.create_service_client(org_id=org_id,
                                                    service_id=service_id,
                                                    group_name=group_name)

    model = service_client.training.create_model(method_name=grpc_method_name,
                                                 model_name="model_name")
    model_id = model.model_id

    validate_price = service_client.training.validate_model_price(model_id)

    zip_path = "PATH_TO_YOUR_DATASET_FILE"  
    model_status = service_client.training.upload_and_validate(model_id, zip_path, validate_price)
    
    models = service_client.training.get_all_models()
    model = [model for model in models if model.model_id == model_id][0]
    status = model.status
    while status != ModelStatus.VALIDATED:
        time.sleep(5)
        models = service_client.training.get_all_models()
        model = [model for model in models if model.model_id == model_id][0]
        status = model.status

    train_price = service_client.training.train_model_price(model_id)
    model_status = service_client.training.train_model(model_id, train_price)

    models = service_client.training.get_all_models()
    model = [model for model in models if model.model_id == model_id][0]
    status = model.status
    while status != ModelStatus.READY_TO_USE:
        time.sleep(5)
        models = service_client.training.get_all_models()
        model = [model for model in models if model.model_id == model_id][0]
        status = model.status
        print(f"\nModel status: {status}")
        
    result = service_client.call_rpc(grpc_method_name, grpc_message_name, model_id=model_id, **parameters)
    print(f"\nResult: {result}")

    
if __name__ == "__main__":
    main()
    
```
