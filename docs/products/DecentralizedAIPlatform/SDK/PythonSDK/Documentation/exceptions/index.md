# module: sdk.training.exceptions

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/training/exceptions.py) to GitHub

## Entities:
1. [WrongDatasetException](#class-wrongdatasetexception)
2. [WrongMethodException](#class-wrongmethodexception)
3. [NoTrainingException](#class-notrainingexception)
4. [GRPCException](#class-grpcexception)
5. [NoSuchModelException](#class-nosuchmodelexception)

## Class `WrongDatasetException`

extends: `Exception`

is extended by: -

### description

This exception can be thrown when `_check_dataset` method of the `Training` class is called. 
If the dataset is not compliant, this exception will be thrown, detailing what incompatibilities the dataset has.

## Class `WrongMethodException`

extends: `Exception`

is extended by: -

### description

This exception is thrown when you try to call `Training` methods with the wrong grpc method name.

## Class `NoTrainingException`

This exception is thrown while calling the `training` field of the `ServiceClient` class and the training is not 
enabled in the service. 

## Class `GRPCException`

extends: `RpcError`

is extended by: -

### description

This exception is thrown when there is an error in the grpc call.

## Class `NoSuchModelException`

extends: `Exception`

is extended by: -

### description

This exception is thrown when you try to call `Training` methods with the non-existent model id.