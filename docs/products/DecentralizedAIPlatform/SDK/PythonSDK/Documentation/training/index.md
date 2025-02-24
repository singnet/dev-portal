# module: sdk.training.training.py

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/training/training.py) to GitHub

Entities:
1. [Training](#class-training)
   - [\_\_init\_\_](#init)
   - [get_model_id_object](#get-model-id-object)
   - [create_model](#create-model)
   - [validate_model_price](#validate-model-price)
   - [train_model_price](#train-model-price)
   - [delete_model](#delete-model)
   - [get_training_metadata](#get-training-metadata)
   - [get_all_models](#get-all-models)
   - [get_model](#get-model)
   - [get_method_metadata](#get-method-metadata)
   - [update_model](#update-model)
   - [upload_and_validate](#upload-and-validate)
   - [train_model](#train-model)
   - [_call_method](#call-method)
   - [_get_training_stub](#get-training-stub)
   - [_get_auth_details](#get-auth-details)
   - [_check_method_name](#check-method-name)
   - [_check_training](#check-training)
   - [_check_dataset](#check-dataset)
   - [_get_grpc_channel](#get-grpc-channel)

## Class `Training`

extends: -

is extended by: -

### description

`Training` is a class that is responsible for the training functionality of the service and interacting with it

### attributes

- `training_daemon` (ModuleType): The module containing the training daemon stubs.
- `training_daemon_grpc` (ModuleType): The module containing the training daemon gRPC stubs.
- `training` (ModuleType): The module containing the training stubs.
- `service_client` (ServiceClient): The `ServiceClient` instance.
- `is_enabled` (bool): Whether the training is enabled.
- `payment_strategy` (TrainingPaymentStrategy): The payment strategy used for training.

### methods

### `__init__`

Initializes the `Training` object. Imports the necessary modules and initializes the `TrainingPaymentStrategy` 
object. Sets the `is_enabled` attribute using the `_check_training` method.

##### args:

- `service_client` (ServiceClient): The `ServiceClient` instance.
- `training_added` (bool): Whether the training is added in service proto file. Defaults to _False_.

##### returns:

- _None_

### `get_model_id_object`

Converts the model ID from a string to an object from stub.

##### args:

- `model_id` (str): The model ID to convert.

##### returns:

- The stub object for the model ID. (Any)

### `create_model`

Creates a necessary request object `NewModelRequest(AuthorizationDetails, NewModel)` from stub and calls the 
`create_model` grpc method using the `_call_method` method.

##### args:

- `method_name` (str): The name of the service method for which we want to create a new model.
- `model_name` (str): The name of the model.
- `model_description` (str): The description of the model. Defaults to empty string.
- `is_public_accessible` (bool): Whether the model is publicly accessible. Defaults to _False_.
- `addresses_with_access` (list[str]): A list of addresses with access to the model. Defaults to empty list.

##### returns:

- The newly created model. (Model)

### `validate_model_price`

Creates a necessary request object `AuthValidateRequest(AuthorizationDetails, model_id, training_data_link)` from 
stub and calls the `validate_model_price` grpc method using the `_call_method` method.

##### args:

- `model_id` (str): The model ID to validate.

##### returns:

- Price of validating the model. (int)

##### raises:

- `NoSuchModelException`: If the model with the specified ID does not exist.
- `GRPCException`: If the gRPC call fails.

### `train_model_price`

Creates a necessary request object `CommonRequest(AuthorizationDetails, model_id)` from stub and calls the 
`train_model_price` grpc method using the `_call_method` method.

##### args:

- `model_id` (str): The model ID to train.

##### returns:

- Price of training the model. (int)

##### raises:

- `NoSuchModelException`: If the model with the specified ID does not exist.
- `GRPCException`: If the gRPC call fails.

### `delete_model`

Creates a necessary request object `CommonRequest(AuthorizationDetails, model_id)` from stub and calls the 
`delete_model` grpc method using the `_call_method` method.

##### args:

- `model_id` (str): The model ID to delete.

##### returns:

- Status of the model. (ModelStatus)

##### raises:

- `NoSuchModelException`: If the model with the specified ID does not exist.
- `GRPCException`: If the gRPC call fails.

### `get_training_metadata`

Calls the `get_training_metadata` grpc method using the `_call_method` method with empty request.

##### returns:

- Information about the training on the service. (TrainingMetadata)

### `get_all_models`

Creates a necessary request object `AllModelsRequest` from stub and calls the 
`get_all_models` grpc method using the `_call_method` method. Use arguments as the filters to get all models.

##### args:

- `statuses` (list[ModelStatus]): Statuses by which models need to be filtered. Defaults to _None_ (no filter).
- `is_public` (bool): Whether the models are public or not. Defaults to _None_ (no filter).
- `grpc_method_name` (str): The name of the gRPC method to call. Defaults to empty string (no filter).
- `grpc_service_name` (str): The name of the gRPC service to call. Defaults to empty string (no filter).
- `model_name` (str): The name of the model. Defaults to empty string (no filter).
- `created_by_address` (str): The address of the user who created the model. Defaults to empty string (no filter).

##### returns:

- List of models. (list[Model])

### `get_model`

Creates a necessary request object `CommonRequest(AuthorizationDetails, model_id)` from stub and calls the 
`get_model` grpc method using the `_call_method` method.

##### args:

- `model_id` (str): The model ID to get.

##### returns:

- Price of training the model. (int)

##### raises:

- `NoSuchModelException`: If the model with the specified ID does not exist.
- `GRPCException`: If the gRPC call fails.

### `get_method_metadata`

Creates a necessary request object `MethodMetadataRequest(grpc_method_name, grpc_service_name, model_id)` from stub 
and calls the `get_method_metadata` grpc method using the `_call_method` method. You can get metadata by `method_name` 
or `model_id`.

##### args:

- `method_name` (str): The name of the service method for which we want to get metadata.
- `model_id` (str): The model ID for which we want to get metadata.

##### returns:

- Object with dateset requirements. (MethodMetadata)

### `update_model`

Creates a necessary request object `UpdateModelRequest` from stub and calls the 
`get_model` grpc method using the `_call_method` method.

##### args:

- `model_id` (str): The model ID to update.
- `model_name` (str): New name of the model. (Optional)
- `description` (str): New description of the model. (Optional)
- `addresses_with_access` (list[str]): Updated list of addresses with access to the model. (Optional)

##### returns:

- Updated model. (Model)

##### raises:

- `NoSuchModelException`: If the model with the specified ID does not exist.
- `GRPCException`: If the gRPC call fails.

### `upload_and_validate`

Checks dataset using the `_check_dataset` method. Sets price and model id into payment strategy. Creates a 
generator that returns request objects `UploadInput` with file data one byte at a time. Calls the `upload_and_validate` 
grpc method using the `_call_method` method. 

##### args:

- `model_id` (str): The model ID to validate.
- `zip_path` (str | Path | PurePath): The path to the dataset.
- `price` (int): The price of the method call.

##### returns:

- Status of the model. (ModelStatus)

##### raises:

- `NoSuchModelException`: If the model with the specified ID does not exist.
- `GRPCException`: If the gRPC call fails.

### `train_model`

Sets price and model id into payment strategy. Creates a necessary request object `UpdateModelRequest` from stub 
and calls the `train_model` grpc method using the `_call_method` method.

##### args:

- `model_id` (str): The model ID to train.
- `price` (int): The price of the method call.

##### returns:

- Status of the model. (ModelStatus)

##### raises:

- `NoSuchModelException`: If the model with the specified ID does not exist.
- `GRPCException`: If the gRPC call fails.

### `_call_method`

Calls the specified gRPC training method and returns the response.

##### args:

- `method_name` (str): The name of the gRPC method to call.
- `request_data` (Any): The request data to pass to the gRPC method.
- `paid` (bool): Whether the method is paid or not. Defaults to _False_.

##### returns:

- Response from the gRPC method. (Any)

##### raises:

- `GRPCException`: If the gRPC call fails.

### `_get_training_stub`

Creates a gRPC stub for the training with gRPC channel. 

##### args:

- `paid` (bool): Whether the method is paid or not. Defaults to _False_.

##### returns:

- gRPC stub. (Any)

### `_get_auth_details`

Creates a necessary request object `AuthorizationDetails` from stub with user data and signature.

##### args:

-`method_msg` (ModelMethodMessage): The message of the method.

##### returns:

- Authorization stub object. (Any)

### `_check_method_name`

Checks if the specified method name is valid using `get_services_and_messages_info` method of the service client.

##### args:

- `method_name` (str): The name of the method.

##### returns:

- Service name and method name. (tuple[str, str])

##### raises:

- `WrongMethodException`: If the method name is invalid.

### `_check_training`

Checks if training is enabled in the service using `get_training_metadata` method.

##### returns:

- Whether training is enabled or not. (bool)

### `_check_dataset`

Checks the dataset for compliance with the requirements (which is obtained via the `get_method_metadata` method).

##### args:

- `model_id` (str): The model ID.
- `zip_path` (str | Path | PurePath): The path to the dataset.

##### returns:

- _None_

##### raises:

- `WrongDatasetException`: If the dataset is not valid.

### `_get_grpc_channel`

Creates a gRPC channel for paid methods.

##### args:

- `base_channel` (grpc.Channel): The base gRPC channel.

##### returns:

- gRPC channel with interceptor for paid training methods. (grpc.Channel)
