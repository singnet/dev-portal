# Platform How-Tos

## Install SingularityNET CLI
Requires: [Python 3.6.5](https://www.python.org/downloads/release/python-365/)+

1. Run `pip3 install snet-cli`

## Create an Organization in the SingularityNET Registry
Requires: [Install SingularityNET CLI](#install-singularitynet-cli)

Organizations serve as the root level of organization for services and type repositories in the SingularityNET Registry. A combination of the organization name (globally unique), the path (optional per service or type repository), and the service or type repository name (organizationally unique) are intended to be interpreted as a hierarchical namespacing of the associated service or type repository, e.g. `<OrganizationName>/<Path>/<ServiceName>`. Note that because the path is optional, services and type repositories can be uniquely identified globally using a combination of organization name and service or type repository name.

1. Run `snet contract Registry createOrganization ExampleOrganization '["0xffffffffffffffffffffffffffffffffffffffff"]' --transact`, replacing `ExampleOrganization` with your desired organization name and `["0xffffffffffffffffffffffffffffffffffffffff"]` with the JSONified list of your desired initial members for the organization.

## Initialize Service Metadata
Requires: [Install SingularityNET CLI](#install-singularitynet-cli)

Optional: [Create an Organization in the SingularityNET Registry](#create-an-organization-in-the-singularitynet-registry)

Initializing the service metadata will create a `service.json` file in your current working directory containing this metadata. While not required, service developers may find it helpful to check this file into source control alongside their service implementation (e.g. https://github.com/singnet/example-service), along with the service's model directory.

1. Run `snet service init` and follow the interactive prompts to enter:
    - service name
    - service's model directory (relative to `$PWD`)
    - organization name
    - path
    - per-call price in `10 ** -8` AGI
    - service endpoint (make sure to include `http`/`https` and port number)
    - list of tags for service (using shell splitting, e.g. `tag1 "tag2 with spaces"`)
    - service description

## Publish Service Metadata
Requires: [Initialize Service Metadata](#initialize-service-metadata)

Publishing the service metadata will create an Agent contract if necessary (and record the resuting address in the `service.json` file), create a registration for the service in the Registry contract if necessary, and update all remote sources (e.g. Agent contract, Registry contract, data stored in IPFS) to be consistent against the `service.json` file 

1. Run `snet service publish` (append `--no-register` if you either haven't created an organization or don't yet want to publish the service to the Registry contract).

## Create a Service Model
The SingularityNET platform is designed around using [protobuf](https://developers.google.com/protocol-buffers/docs/proto#services) as its universal IDL for all services and types registered on the network. If the service is implemented using gRPC, then the model created for the service itself is sufficient for publishing on SingularityNET. For developers looking to publish JSON-RPC services or executables as services on SingularityNET, a new model will have to be created based on the input that the service expects.

SingularityNET's [example service](https://github.com/singnet/example-service) is a JSON-RPC service that expects requests to conform to the following JSONified schema: `{"jsonrpc": "2.0", "method": "classify", "params": {"image_type": <image_type>, "image": <image>}, "id": 1}`, where `<image_type>` is a string corresponding with the image type (e.g. `jpg`), and `<image>` is a string containing the base-64 encoded image. The responses it generates conform to the following JSONified schema: `{"jsonrpc": "2.0", "result": {"predictions": [<prediction>, ...], "confidences": [<confidence>, ...]}, "id": 0}`, where `<prediction>, ...` is a list of strings describing the image and `<confidence>, ...` is a list of floats indicating the confidence rating for each prediction.

In order to publish the service to SingularityNET, [this](https://github.com/singnet/example-service/blob/master/model/ExampleService.proto) model was created to describe the service's API.

Note that the request message schema as defined in the protobuf model map to the `params` object schema in the JSON-RPC request and the response message schema maps to the `result` object schema in the JSON-RPC response.

The process for creating a model for an executable as a service is similar. Currently, the executable must expect the request object as serialized JSON on STDIN and return the response object as serialized JSON on STDOUT. Thus, for the example above `echo '{"image_type": <image_type>, "image": <image>}' | /path/to/executable` should print `{"predictions": [<prediction>, ...], "confidences": [<confidence>, ...]}` to STDOUT.

## Configure SingularityNET Daemon
The SingularityNET daemon can be configured using a config file, environment variables, flags, or a combination. 
See [daemon configuration documentation](https://github.com/singnet/snet-daemon/blob/master/README.md#configuration) for the available configuration keys and their descriptions.

## Download a Service Model
Requires: [Install SingularityNET CLI](#install-singularitynet-cli)

Downloading a service's model files will retrieve the `.proto` files from IPFS as referenced from the service's current metadata on the blockchain.

1. Run `snet client get-model --agent-at <agent_address> <destination_directory>` where `<agent_address>` is the address for the service's Agent contract instance and `<destination_directory>` is the desired location at which to root the service's model.

## Compile a Service Model
Requires: [Download a Service Model](#download-a-service-model)

Requires: [grpcio-tools](https://pypi.org/project/grpcio-tools/)

Protobuf and gRPC have support for many [languages](https://grpc.io/docs/), but this example will focus on Python.

In order to call a SingularityNET service from another application, the service's model needs to be compiled so that the appropriate client stubs can be generated to communicate with the service's daemon.

1. Run `python -m grpc_tools.protoc -I<proto_parent_dir> --python_out=. --grpc_python_out=. <proto_file_path>`

For our example service, this should result in the files `ExampleService_pb2.py` and `ExampleService_pb2_grpc.py` in `$PWD`. `ExampleService_pb2.py` contains the Python definitions of the message types defined in the protobuf files, whereas `ExampleService_pb2_grpc.py` contains the Python client stubs and other RPC-related code.

## Generate Call Credentials
Requires: [Install SingularityNET CLI](#install-singularitynet-cli)

Requires: [PyYAML](https://pypi.org/project/PyYAML/)

Continuing with the example of integrating the example SingularityNET service into a Python application, the following code snippet exhibits one possible way of generating the auth parameters required to call the service.

```python
import subprocess
import yaml

...

agent_address = "0xf2B35821409baEe26aFcC955D7a332031003D95D"  # Example service deployed to Kovan
result = subprocess.check_output(["snet", "agent", "--at", agent_address, "create-jobs", "--funded", "--signed", "--no-confirm", "--max-price", "100000000"])
job = yaml.load(result)["jobs"][0]
job_address = job["job_address"]
job_signature = job["job_signature"]

...
```

## Call a Service
Requires: [Compile a Service Model](#compile-a-service-model), [Generate Call Credentials](#generate-call-credentials)

Continuing with the example of integrating the example SingularityNET service into a Python application, the following code snippet exhibits how to complete the process of calling the service.

```python
from ExampleService_pb2 import ClassifyRequest, ClassifyResponse
from ExampleService_pb2_grpc import ExampleServiceStub
import grpc
from google.protobuf.json_format import MessageToJson, Parse

...

image = "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"
endpoint = "18.233.195.25:8080" # Example service deployed to Kovan
channel = grpc.insecure_channel(endpoint)
stub = ExampleServiceStub(channel)

def serializer(*args, **kwargs):
	return bytes(MessageToJson(args[0], True, preserving_proto_field_name=True), "utf-8")

def deserializer(*args, **kwargs):
	return Parse(args[0], ClassifyResponse(), True)
  
stub.classify._request_serializer = serializer
stub.classify._response_deserializer = deserializer

response = stub.classify(ClassifyRequest(image=image, image_type="jpg"), metadata=[("snet-job-address", job_address), ("snet-job-signature", job_signature)])

...
```
