---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to Write a SingularityNET Service in C++
description: Getting started with C++ for your AI Service

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
        content: How to Write a SingularityNET Service in Go
        url: '/tutorials/go'
---

-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker ([https://www.docker.com/](https://www.docker.com/))_
* _Metamask ([https://metamask.io](https://www.docker.com/))_

_You will need a private-public key pair to register your service in SNET. Generate them in Metamask before you start this tutorial._

-------------------------------

Run this tutorial from a bash terminal.

We'll use C++ gRPC, for more details see https://grpc.io/docs/

In this tutorial we'll create a C++ service and publish it in SingularityNET.

## Step 1 

Setup and run a docker container. We'll install C++ gRPC stuff in a container
because of this warning from the authors: 

```
"WARNING: After installing with make install there is no easy way to uninstall,
which can cause issues if you later want to remove the grpc and/or protobuf
installation or upgrade to a newer version."
```

In this tutorial we'll develop our service inside the docker container.

Setup a `ubuntu:18.04` docker container (with current `SNET Daemon` version) using provided `Dockerfile`.

```
docker build \
    --build-arg language=cpp \
    -t snet_cpp_service https://github.com/singnet/dev-portal.git#master:/tutorials/docker

ETCD_HOST=$HOME/.snet/etcd/example-cpp-service/
ETCD_CONTAINER=/opt/singnet/etcd/
docker run -p 7000:7000 -v $ETCD_HOST:$ETCD_CONTAINER -ti snet_cpp_service bash
```

From this point we follow the tutorial in the Docker container's prompt.

```
cd dev-portal/tutorials/cpp
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
cd tutorial
```

## Step 3

Now we'll customize the skeleton code to actually implement our basic service.
We need to edit `src/service_spec/tutorial.proto` and define

* the data structures used to carry input and output of the methods, and
* the RPC API of the service.

Take a look at https://developers.google.com/protocol-buffers/docs/overview to
understand everything you can do in the `.proto` file.

In this tutorial our `src/service_spec/tutorial.proto` will be like this:

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

In order to actually implement our API we need to edit `src/server.cc`.

Look for `PROTO_TYPES` and replace the `using` statements to reflect our data
types defined in step 3.

```
using tutorial::ServiceDefinition;
using tutorial::IntPair;
using tutorial::SingleInt;
using tutorial::SingleString;
```

Now look for `SERVICE_API` and replace `doSomething()` by our actual API methods:

```
Status div(ServerContext* context, const IntPair* input, SingleInt* output) override {
    output->set_v(input->a() / input->b());
    return Status::OK;
}

Status check(ServerContext* context, const SingleInt* input, SingleString* output) override {
    if (input->v() != 0) {
        output->set_s("OK");
    } else {
        output->set_s("NOK");
    }
    return Status::OK;
}
```
## Step 5

Now we'll write a client to test our server locally (without using the
Blockchain). Edit `src/client.cc`.

Look for `PROTO_TYPES` and replace the `using` statements to reflect our data
types defined in Step 3.

```
using tutorial::ServiceDefinition;
using tutorial::IntPair;
using tutorial::SingleInt;
using tutorial::SingleString;
```

Now look for `TEST_CODE` and replace `doSomething()` implementation by our
testing code:


```
void doSomething(int argc, char** argv) {

    int n1 = atoi(argv[1]);
    int n2 = atoi(argv[2]);

    ClientContext context1;
    SingleInt divisor;
    SingleString checkDivisor;
    divisor.set_v(n2);
    Status status1 = stub_->check(&context1, divisor, &checkDivisor);
    if (! status1.ok()) { 
        std::cout << "doSomething rpc failed." << std::endl;
        return;
    }
    if (checkDivisor.s() != "OK") {
        std::cout << "Check failed." << std::endl;
        return;
    }

    ClientContext context2;
    IntPair input;
    SingleInt result;
    input.set_a(n1);
    input.set_b(n2);
    Status status2 = stub_->div(&context2, input, &result);
    if (status2.ok()) { 
        std::cout << result.v() << std::endl;
    } else {
        std::cout << "doSomething rpc failed." << std::endl;
    }
}
```

## Step 6

To build the service:

```
./build.sh
```

At this point you should have `server` and `client` in `bin/`

## Step 7

To test our server locally (without using the Blockchain)

```
./bin/server &
./bin/client 12 4
```

You should have something like the following output:

```
./bin/server &

# [1] 4217
# Server listening on 0.0.0.0:7070

./bin/client 12 4

# 3
```

At this point you have successfully built a gRPC C++ service. The executables
in `bin/` can be used from anywhere inside the container (they don't need
anything from the installation directory) or outside the container if you have
C++ gRPC libraries installed.

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