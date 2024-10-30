
# module : sdk.training.training.py

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/training/training.py) to GitHub

## Entities:
1. [ModelMethodMessage](#class-modelmethodmessage)
2. [TrainingModel](#class-trainingmodel)
   - [\_\_init\_\_](#init)
   - [_invoke_model](#invoke-model)
   - [create_model](#create-model)
   - [get_model_status](#get-model-status)
   - [delete_model](#delete-model)
   - [update_model_access](#update-model-access)
   - [get_all_models](#get-all-models)

## Class `ModelMethodMessage`

extends: `Enum`

is extended by: -

### description

This is an `enum` that represents the available methods that can be called in the training grpc service.

### members

- `CreateModel` (str): The method to create a new model.
- `GetModelStatus` (str): The method to get the status of a model.
- `UpdateModelAccess` (str): The method to update the access of a model.
- `DeleteModel` (str): The method to delete a model.
- `GetAllModels` (str): The method to get all models.

## Class `TrainingModel`

extends: -

is extended by: -

### description

This is a class that represents a training gRPC service.

### attributes

- `training_pb2` (ModuleType): The gRPC service module.
- `training_pb2_grpc` (ModuleType): The gRPC service module.

### methods

### `__init__`

Initializes a new instance of the class. Imports gRPC service modules.

##### returns:

- _None_

### `_invoke_model`

Invokes the model by establishing a gRPC channel and generating an authorization request.

##### args:

- `service_client` (ServiceClient): The client object for the service.
- `msg` (ModelMethodMessage): The message containing the method to be invoked.

##### returns:

- A tuple containing the authorization request and the gRPC channel. (tuple[AuthorizationDetails, grpc.Channel])

##### raises:

- `ValueError`: If the scheme in the service metadata is not supported.

### `create_model`

Calls the `create_model` method in the gRPC training service stub to create a new model.

##### args:

- `service_client` (ServiceClient): The client object for the service.
-  `grpc_method_name` (str): The name of the gRPC method to be invoked.
- `model_name` (str): The name of the model to be created.
- `description` (str): A description of the model. Defaults to ''.
- `training_data_link` (str): A link to the training data. Defaults to ''.
- `grpc_service_name` (str): The name of the gRPC service. Defaults to 'service'.
- `is_publicly_accessible` (bool): Whether the model is publicly accessible. Defaults to False.
- `address_list` (list[str]): A list of addresses. Defaults to None.

##### returns:

- The response from the create model request. (Any)

_Note_: Returns an exception if an error occurs during the create model request.

### `get_model_status`

Calls the `get_model_status` method in the gRPC training service stub to get a model status.

##### args:

- `service_client` (ServiceClient): The client object for the service.
- `model_id` (str): The ID of the model whose status to be retrieved.

##### returns:

- The response from the get model status request. (Any)

_Note_: Returns an exception if an error occurs during the get model status request.

### `delete_model`

Calls the `delete_model` method in the gRPC training service stub to delete a model.

##### args:

- `service_client` (ServiceClient): The client object for the service.
- `model_id` (str): The ID of the model to be deleted.
- `grpc_service_name` (str): The name of the gRPC service. Defaults to 'service'.
- `grpc_method_name` (str): The name of the gRPC method to be invoked.

##### returns:

- The response from the delete model request. (Any)

_Note_: Returns an exception if an error occurs during the delete model request.

### `update_model_access`

Calls the `update_model_access` method in the gRPC training service stub to update the access of a model.

##### args:

- `service_client` (ServiceClient): The client object for the service.
- `model_id` (str): The ID of the model whose access to be updated.
- `grpc_method_name` (str): The name of the gRPC method to be invoked.
- `model_name` (str): The name of the model.
- `is_punlic` (bool): Whether the model is publicly accessible.
- `description` (str): A description of the model.
- `grpc_service_name` (str): The name of the gRPC service. Defaults to 'service'.
- `address_list` (list[str]): A list of addresses.

##### returns:

- The response from the update model access request. (Any)

_Note_: Returns an exception if an error occurs during the update model access request.

### `get_all_models`

Calls the `get_all_models` method in the gRPC training service stub to get all models.

##### args:

- `service_client` (ServiceClient): The client object for the service.
- `grpc_method_name` (str): The name of the gRPC method to be invoked.
- `grpc_service_name` (str): The name of the gRPC service. Defaults to 'service'.

##### returns:

- The response from the get all models request. (Any)

_Note_: Returns an exception if an error occurs during the get all models request.


