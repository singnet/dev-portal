# Service Training via SDK

Currently, we support training only in the Python SDK, but we are actively working on integrating it into others.

## Step 1. Prerequisites

This is a quick guide on how to use the training functionality. For a more detailed description of the training and its 
functionality in the SDK, we recommend reading the following articles:
 - [Training concepts](/docs/products/DecentralizedAIPlatform/CoreConcepts/training/)
 - [Training in Python SDK](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/training/)

If you have not yet had experience calling services and using the SDK, we recommend you read the following guides:
- [Getting Ready to Call AI CheckUp](/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToCallAICheckUp/)
- [Service Calling via SDK](/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaSDK/)

## Step 2. Install the SDK

```sh [Python]
pip install snet.sdk
```

## Step 3. Configure keys

```python
import time
from snet import sdk
from snet.sdk.training.responses import ModelStatus


PRIVATE_KEY = "YOUR_PRIVATE_KEY"
ALCHEMY_KEY = "YOUR_ALCHEMY_KEY"
```

Change private key and alchemy key to your own.

## Step 4. Configure variables and base objects

```python
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

You should change the names `org_id`, `service_id`, `group_name`, and `grpc_method_name` to others depending on 
which service and method you want to call.

You can also use RPC endpoint of another provider.

## Step 5. Create a new model

All training functions are called through the `training` field of the `ServiceClient` class instance.

Don't forget to save the model id in a variable, it will be useful for further actions.

```python
model_name = "YOUR_MODEL_NAME"

new_model = service_client.training.create_model(grpc_method_name=grpc_method_name,
                                                 model_name=model_name)
model_id = new_model.model_id
```

You can also pass other parameters to the `create_model` method other training methods, more details 
[here](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/training/).

## Step 6. Upload your training data

Before uploading the training data, you first need to get the price of uploading and validating the dataset. 
The training data should be in the form of an archived set of files (e.g. ZIP).

```python
validate_price = service_client.training.validate_model_price(model_id)
zip_path = "PATH_TO_YOUR_DATASET_FILE"
model_status = service_client.training.upload_and_validate(model_id, zip_path, validate_price)
```

After this, you need to wait for the validation to complete. This will be indicated by the model status `VALIDATED`.
Model status can be gotten using the `get_model` or `get_all_models` methods.

## Step 7. Train your model

```python
train_price = service_client.training.train_model_price(model_id)
model_status = service_client.training.train_model(model_id, train_price)
```

Training the model can also take some time, so you need to wait for that too. 
Completion of training will be indicated by the model status `READY_TO_USE`.

## Step 8. Call the service!

Now you can call the method using your new model in the same way you would call a regular service. 
The only difference is that you also need to pass `model_id` to the `call_rpc` method.

```python
grpc_message_name = "RPC_MESSAGE_NAME"
parameters = {
    "param1": "value1",
    "param2": "value2"
}

result = service_client.call_rpc(grpc_method_name, grpc_message_name, model_id, **parameters)
```



