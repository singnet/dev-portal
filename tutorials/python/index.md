---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to Write a SingularityNET Service in Python
description: Getting started with Python for your AI Service

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Back to tutorials
        url: '/tutorials'
    next:
        content: How to Write a SingularityNET Service with OpenCog
        url: '/tutorials/opencog'
---

-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker ([https://www.docker.com/](https://www.docker.com/))_
* _Metamask ([https://metamask.io](https://www.docker.com/))_

_You will need a private-public key pair to register your service in SNET. Generate them in Metamask before you start this tutorial._

-------------------------------

Run this tutorial from a bash terminal.

We'll use Python gRPC, for more details see https://grpc.io/docs/

In this tutorial we'll create a Python service and publish it in SingularityNET.

## Step 1 

Setup a `ubuntu:18.04` docker container (with current `SNET Daemon` version) using provided `Dockerfile`.

```
docker build \
    --build-arg language=python \
    -t snet_python_service https://github.com/singnet/dev-portal.git#master:/tutorials/docker

ETCD_HOST=$HOME/.snet/etcd/example-python-service/
ETCD_CONTAINER=/opt/singnet/etcd/
docker run -p 7000:7000 -v $ETCD_HOST:$ETCD_CONTAINER -ti snet_python_service bash
```

From this point we follow the tutorial in the Docker container's prompt.

```
cd dev-portal/tutorials/python
```

## Step 2

Create the skeleton structure for your service's project

```
./create_project.sh PROJECT_NAME ORGANIZATION_ID SERVICE_ID SERVICE_PORT
```

`PROJECT_NAME` is a short tag for your project. It will be used to name
project's directory and as a namespace tag in the .proto file.

`ORGANIZATION_ID` is the id of an organization that you are a member or owner. 

`SERVICE_ID` is the id of your service.

`SERVICE_PORT` is the port number (in localhost) the service will listen to.

`create_project.sh` will create a directory named `PROJECT_NAME` with a basic
empty implementation of the service.

In this tutorial we'll implement a service with two methods:

* int div(int a, int b)
* string check(int a)

So we'll use this command line to create project's skeleton

```
./create_project.sh tutorial my-org math-operations 7070
cd /opt/singnet/tutorial
```

## Step 3

Now we'll customize the skeleton code to actually implement our basic service.
We need to edit `./service_spec/tutorial.proto` and define

* the data structures used to carry input and output of the methods, and
* the RPC API of the service.

Take a look at https://developers.google.com/protocol-buffers/docs/overview to
understand everything you can do in the `.proto` file.

In this tutorial our `./service_spec/tutorial.proto` will be like this:

```
syntax = "proto3";

package tutorial;

message IntPair {
    int32 a = 1;
    int32 b = 2;
}

message SingleInt {
    int32 v = 1;
}

message SingleString {
    string s = 1;
}

service ServiceDefinition {
    rpc div(IntPair) returns (SingleInt) {}
    rpc check(SingleInt) returns (SingleString) {}
}
```

Each `message` statement define a data structure used either as input or output
in the API. The `service` statement defines the RPC API itself.

## Step 4

In order to actually implement our API we need to edit `server.py`.

Look for `SERVICE_API` and replace `doSomething()` by our actual API methods:

```
class ServiceDefinition(pb2_grpc.ServiceDefinitionServicer):
    def __init__(self):
        self.a = 0
        self.b = 0
        self.response = None

    def div(self, request, context):
        self.a = request.a
        self.b = request.b
        self.response = pb2.SingleInt()
        self.response.v = int(self.a / self.b)
        return self.response

    def check(self, request, context):
        self.response = pb2.SingleString()
        self.response.s = "{}".format(request.v)
        return self.response
```
## Step 5

Now we'll write a client to test our server locally (without using the
Blockchain). Edit `client.py`.

Look for `TEST_CODE` and replace `doSomething()` implementation by our
testing code:

```
def doSomething(channel):
    a = 12
    b = 4
    if len(sys.argv) == 3:
        a = int(sys.argv[1])
        b = int(sys.argv[2])
    # Check the compiled proto file (.py) to get method names
    stub = pb2_grpc.ServiceDefinitionStub(channel)
    response = stub.div(pb2.IntPair(a=a, b=b))
    print("{}".format(response.v))
    return response
```

## Step 6

To compile the protobuf file:

```
./build.sh
```

## Step 7

To test our server locally (without using the Blockchain)

```
python3 server.py &
python3 client.py 12 4
```

You should have something like the following output:

```
python3 server.py &

# [1] 4217
# Server listening on 0.0.0.0:7070

python3 client.py 12 4

# 3
```

At this point you have successfully built a gRPC Python service. The executables can 
be used from anywhere inside the container (they don't need anything from 
the installation directory) or outside the container if you have Python gRPC libraries installed.

The next steps in this tutorial will publish the service in SingularityNET.

## Step 8

Now you must follow the [publish](https://dev.singularitynet.io/tutorials/publish/)
tutorial to publish this service or use our script (next step).

You'll also need a `SNET CLI` identity (check step 3 from [publish](https://dev.singularitynet.io/tutorials/publish/#step-3-setup-snet-cli-and-create-your-identity) tutorial).

## Step 9

First, make sure you killed the `server` process started in Step 7.

Then
publish and start your service:

```
./publishAndStartService.sh PAYMENT_ADDRESS
```

Replace `PAYMENT_ADDRESS` by your public key (wallet).

Example:

```
./publishAndStartService.sh 0x501e8c58E6C16081c0AbCf80Ce2ABb6b3f91E717
```

This will start the `SNET Daemon` and your service. If everything goes well you will 
see the Blockchain transaction logs and then the following messages 
(respectively from: your service and `SNET Daemon`):

```
# [Blockchain log]
# Server listening on 0.0.0.0:7070
# [daemon initial log]
# INFO[0002] Blockchain is enabled: instantiate payment validation interceptor 
# INFO[0002]                                               PaymentChannelStorageClient="&{ConnectionTimeout:5s RequestTimeout:3s Endpoints:[http://127.0.0.1:2379]}"
# INFO[0002] Default payment handler registered            defaultPaymentType=escrow
# DEBU[0002] starting daemon                              
```

You can double check if it has been properly published using

```
snet organization list-services my-org
```

Optionally you can un-publish the service

```
snet service delete my-org math-operations
```

Actually, since this is just a tutorial, you are expected to un-publish your
service as soon as you finish the tests.

Other `snet` commands and options (as well as their documentation) can be found 
[here](https://github.com/singnet/snet-cli).

## Step 10

You can test your service making requests in command line:

The `openChannel.sh` script will open and initialize a new payment channel, it'll 
output the new channel id (that will be used by `testServiceRequest.sh`):

```
./openChannel.sh

# [Blockchain log]
# #channel_id
# 10
```

In this example the channel id is `10`.

Now you can run `testServiceRequest.sh VALUE_A VALUE_B`:

```
./testServiceRequest.sh 12 4

# [Blockchain log]
#   response:
#       v: 3
```

That's it. Remember to delete your service as explained in Step 9.

```
snet service delete my-org math-operations
```