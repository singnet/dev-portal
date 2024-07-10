---
# Page settings
layout: default
keywords: staking
comments: false
title: SingularityNET SDK for Python
description: These instructions are for the development and use of the SingularityNET SDK for Python.

# Micro navigation
micro_nav: true

---
# snet-sdk-python
SingularityNET SDK for Python
## Getting Started
These instructions are for the development and use of the SingularityNET SDK for Python.
### Usage
The SingularityNET SDK allows you to import compiled client libraries for your service or services or choice and make calls to those services programmatically from your application by setting up state channels with the providers of those services and making gRPC calls to the SingularityNET daemons for those services by selecting a channel with sufficient funding and supplying the appropriate metadata for authentication.
Once you have installed the snet-sdk in your current environment and it's in your PYTHONPATH, you should import it and create an instance of the base sdk class:
```bash
from snet_sdk import Snet
import config
snet = Snet(private_key=config.private_key)
```

Now, the instance of the sdk can be used to instantiate clients for SingularityNET services. To interact with those services, the sdk needs to be supplied the compiled client libraries and a reference to their path on your file system.

To generate the client libraries, you need the SingularityNET Command Line Interface, or CLI, which you can download from PyPi, see https://github.com/singnet/snet-cli#installing-with-pip

Once you have the CLI installed, run the following command:
```
snet sdk generate-client-library python <org_id> <service_id>
```
snet sdk generate-client-library python <org_id> <service_id>

Optionally, you can specify an output path; otherwise it's going to be ./client_libraries/python/<org_id>/<service_id>

Now, by default the sdk is going to look for those client libraries in the ./grpc/<org_id>/<service_id> in the directory of the main process of the module it's being imported by.

Once you have the generated client libraries in place, you can create an instance of a SingularityNET service client:

```
client = snet.client("<org_id>", "<service_id>")
```

The client exposes the following properties and methods:
- All of the modules from the generated client library as client.grpc.<module_name. These are temporarily added to your PYTHONPATH and imported at runtime
- Functions to open, fund and extend state channels
- Functions to retrieve the list of state channels between you and the service provider from the Blockchain
- Functions to get the updated state for a specific channel from the service provider, signed by yourself
- Functions to generate and sign the required metadata to make gRPC calls to the service daemon
This is an example of how to make a call to a SingularityNET service in the snet organization with the example-service service_id using the base SDK and client instances created as shown before:
```
stub = client.grpc.example_service_pb2_grpc.CalculatorStub(client.grpc_channel)
request = calculator.grpc.example_service_pb2.Numbers(a=10, b=12)
result = stub.add(request)
print(result)
```

If you have no open state channels with the service provider, you can create one by calling the following function:
client.open_channel()

By default, this will create a channel with the shortest possible expiration date and the necessary amount to make 100 service calls.

Once an open channel is created and funded, the sdk will automatically find and use a funded, non-expired channel.

For more information about gRPC and how to use it with Python, please see:
- gRPC Basics - Python
- gRPC Python’s documentation
________________________________________
## Development
## Installing
### Prerequisites
- Python 3.6.5
- Node 8+ w/npm
________________________________________
Clone the git repository

```
$ git clone git@github.com:singnet/snet-sdk-python.git
$ cd snet-sdk-python
•	Install development/test Blockchain dependencies
$ ./scripts/Blockchain install
•	Install the package in development/editable mode
$ pip install -e .
```
### Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.
### License
This project is licensed under the MIT License - see the LICENSE file for details.
```
snet-sdk-java
```

### How to build
Integration testing is enabled by default. To run full build including integration tests use:
```
mvn install
```

Running integration tests is a time consuming process so to make fast build running unit tests only use:
```
mvn install -DskipITs
```

# snet-sdk-js

## Getting Started
This repo hosts multiple SDKs for JavaScript. Currently supported platforms
1.	Node.js using grpc-node
2.	Browser (Web) using grpc-web
    
You can find more details about each sdk within the respective package folders.

- Node.js under packages/nodejs directory
- Web under packages/web directory

These SDKs are under active development and not ready for production use yet. If you find any bug or something doesn't work as expected, please create an issue.

## Usage
All the SDKs assume that there is enough eth balance to cover the gas cost and AGIX tokens in the wallet to cover the service execution cost.

The SDKs chose a default Payment Channel Management Strategy,  which is the simplest form of picking an existing Payment Channel if any or creates a new Payment Channel if no channel is found. 

This can be easily overridden by providing your own strategy to the SDK at the time of construction. Documentation on creating custom strategies will be available soon.
## Development
This is a monorepo which is setup a little differently. It does not use any external tools like lerna or any other popular tool.

There are 3 packages out of which only 2 of them are published to npm
1.	core
2.	nodejs (published)
3.	web (published)

The way the core package is shared across nodejs and web is by creating a symlink to core under each package. This setup has been tested on macOS and should work on any standard Linux distribution but it has not been tested on Windows OS.
###	Build
Navigate to the specific package which needs to be build and then run the following command
npm run build
###	Publish
Navigate to the specific package which needs to be published and then run the following command
npm run publish
LICENSE file for details.

# snet-sdk-Java

Class diagram Image <Needed>

## How to build

Integration testing is enabled by default. To run full build including integration tests use:

```
mvn install
```

Running integration tests is a time consuming process so to make fast build running unit tests only use:

```
mvn install -DskipITs
```
