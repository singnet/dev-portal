# module: sdk.utils.call_utils

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/utils/call_utils.py) to GitHub

Entities:
1. [_ClientCallDetails](#class-clientcalldetails)
2. [create_intercept_call_func](#function-create-intercept-call_func)

## Class `_ClientCallDetails`

extends `grpc.ClientCallDetails`, `namedtuple`

is extended by: -

## Function `create_intercept_call_func`

##### args:

- `get_metadata_func` (callable): The function to get metadata for the call.
- `service_client` (ServiceClient): The service client to use for the call.

##### returns:

- The function to intercept the call. (callable)