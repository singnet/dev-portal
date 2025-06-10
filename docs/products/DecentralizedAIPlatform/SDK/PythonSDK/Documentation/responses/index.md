# module: sdk.training.responses

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/training/responses.py) to GitHub

## Entities:
1. [ModelMethodMessage](#class-modelmethodmessage)
2. [ModelStatus](#class-modelstatus)
3. [Model](#class-model)
4. [TrainingMetadata](#class-trainingmetadata)
5. [MethodMetadata](#class-methodmetadata)
6. [to_string](#function-to-string)

## Class `ModelMethodMessage`

extends: `Enum`

is extended by: -

### description

This is an `enum` that represents the available methods that can be called in the training grpc service. 
It is used in the authorization messages.

### members

- `CreateModel`
- `ValidateModelPrice`
- `TrainModelPrice`
- `DeleteModel`
- `GetTrainingMetadata`
- `GetAllModels`
- `GetModel`
- `UpdateModel`
- `GetMethodMetadata`
- `UploadAndValidate`
- `ValidateModel`
- `TrainModel`

## Class `ModelStatus`

extends: `Enum`

is extended by: -

### description

This is an `enum` that represents the status of a model. It is used to convert status object in the grpc call 
response to a readable object.

### members

- `CREATED`
- `VALIDATING`
- `VALIDATED`
- `TRAINING`
- `READY_TO_USE`
- `ERRORED`
- `DELETED`

## Class `Model`

extends: -

is extended by: -

### description

It is a data class that represents a model. It is used to convert model object in the grpc call response to a 
readable object.

### attributes

- `model_id` (str): The id of the model.
- `status` (ModelStatus): The status of the model.
- `created_date` (str): The date when the model was created.
- `updated_date` (str): The date when the model was updated.
- `name` (str): The name of the model.
- `description` (str): The description of the model.
- `grpc_method_name` (str): The name of the gRPC method for which the model was created.
- `grpc_service_name` (str): The name of the gRPC service.
- `address_list` (list[str]): A list of addresses with the access of the model.
- `is_public` (bool): Whether the model is publicly accessible.
- `training_data_link` (str): The link to the training data (not used in SDK).
- `created_by_address` (str): The address of the user wallet who created the model.
- `updated_by_address` (str): The address of the user wallet who updated the model.

## Class `TrainingMetadata`

extends: -

is extended by: -

### description

It is a data class that represents the training metadata. It is used to convert training metadata object in the 
grpc call response to a readable object.

### attributes

- `training_enabled` (bool): Whether training is enabled on the service.
- `training_in_proto` (bool): Whether training is in proto format.
- `training_methods` (dict[str, list[str]]): Dictionary of the following form: rpc service name - list of rpc methods.

## Class `MethodMetadata`

extends: -

is extended by: -

### description

It is a data class that represents the method metadata. It is used to convert method metadata object in the
grpc call response to a readable object.

### attributes

- `default_model_id` (str): The default model id.
- `max_models_per_user` (int): The maximum number of models per user.
- `dataset_max_size_mb` (int): The maximum size of the dataset in MB.
- `dataset_max_count_files` (int): The maximum number of files in the dataset.
- `dataset_max_size_single_file_mb` (int): The maximum size of a single file in the dataset in MB.
- `dataset_files_type` (str): Allowed types of files in the dataset. (example: "jpg,png,mp3")
- `dataset_type` (str): The type of the dataset. (example: "zip,tar")
- `dataset_description` (str): Additional free-form requirements.

## Function `to_string`

Converts a data object to a string where each attribute is on a separate line with a name.

### args:

- `obj` (Any): The data object to convert to a string.

### returns:

- The string representation of the data object. (str)
