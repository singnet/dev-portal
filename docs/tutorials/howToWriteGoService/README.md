# Tutorial - How to write a SingularityNET service in Go

-------------------------------

_Before following this tutorial, make sure you've installed_

* _Docker (https://www.docker.com/)_
* _Metamask (https://metamask.io)_

_You will need a private-public key pair to register your service in SNET. Generate them in Metamask before you start this turorial._

-------------------------------

Run this tutorial from a bash terminal.

We'll use Go gRPC, for more details see https://grpc.io/docs/

In this tutorial we'll create a Go service and publish it in SingularityNET.

## Step 1 

Setup a `ubuntu:18.04` docker container using provided `Dockerfile`.

```
$ docker build --build-arg language=go -t snet_go_service https://github.com/singnet/wiki.git#master:/tutorials/Docker
$ docker run -p 7000:7000 -ti snet_go_service bash
```

From this point we follow the turorial in the Docker container's prompt.

```
# cd wiki/tutorials/howToWriteGoService
```

## Step 2

Create the skeleton structure for your service's project

```
# ./create_project.sh PROJECT_NAME SERVICE_NAME SERVICE_PORT
```

`PROJECT_NAME` is a short tag for your project. It will be used to name
project's directory and as a namespace tag in the .proto file.

`SERVICE_NAME` is...

`SERVICE_PORT` is the port number (in localhost) the service will listen to.

`create_project.sh` will create a directory named `PROJECT_NAME` with a basic
empty implementation of the service.

In this tutorial we'll implement a service with two methods:

* int div(int a, int b)
* string check(int a)

So we'll use this command line to create project's skeleton and go to its folder

```
# ./create_project.sh tutorial math-operations 7070
# cd /opt/singnet/go/src/tutorial
```

## Step 3

Now we'll customize the skeleton code to actually implement our basic service.
We need to edit `./service_spec/tutorial.proto` and define

* the data structures used to carry input and output of the methods, and
* the RPC API of the service.

Take a look at https://developers.google.com/protocol-buffers/docs/overview to
understand everything you can do in the `.proto` file.

In this tutorial our `./service_spec/tutorial.proto` will be like this:

```Java
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

In order to actually implement our API we need to edit `server.go`.

Look for `SERVICE_API` and replace `doSomething()` by our actual API methods:

```Go
func (s *server) Div(ctx context.Context, in *pb.IntPair) (*pb.SingleInt, error) {
	return &pb.SingleInt{V: in.A / in.B}, nil
}
func (s *server) Check(ctx context.Context, in *pb.SingleInt) (*pb.SingleString, error) {
	return &pb.SingleString{S: fmt.Sprintf("%v", in.V)}, nil
}
```
## Step 5

Now we'll write a client to test our server locally (without using the
blockchain). Edit `client.go`.

Look for `TEST_CODE` and replace `doSomething()` implementation by our
testing code:


```Go
func doSomething(conn *grpc.ClientConn) (*pb.SingleInt, error) {
	// Check the compiled proto file (.pb.go) to get this method name
	c := pb.NewServiceDefinitionClient(conn)
	// Set variables 'a' and 'b' to be sent to the server.
	var a int32 = 12
	var b int32 = 4
	if len(os.Args) > 2 {
		if i, err := strconv.ParseInt(os.Args[1], 10, 32); err == nil {
			a = int32(i)
		}
		if i, err := strconv.ParseInt(os.Args[2], 10, 32); err == nil {
			b = int32(i)
		}
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.Div(ctx, &pb.IntPair{A: a, B: b})
	if err != nil {
		return nil, err
	} else {
	    return r, nil
    }
}
```

## Step 6

To compile the protobuf file:

```
# ./build.sh
```

## Step 7

To test our server locally (without using the blockchain)

```
# ./server &
# ./client 12 4
```

You should have something like the following output:

```
# ./server &
[1] 4217
# Server listening on 0.0.0.0:7070
./client 12 4
3
```

At this point you have successfully built a gRPC Go service. The executables can 
be used from anywhere inside the container (they don't need anything from 
the installation directory) or outside the container if you have Go gRPC libraries installed.

The next steps in this tutorial will publish the service in SingularityNET.

## Step 8 (optional if you already have enough AGI and ETH tokens)

You need some AGI and ETH tokens. You can get then for free (using your github
account) here:

* AGI: https://faucet.singularitynet.io/
* ETH: https://faucet.kovan.network/

## Step 9

Create an "alias" for your private key.

```
# snet identity create MY_ID_NAME KEY_TYPE
```

Replace `MY_ID_NAME` by an id to identify your key in the `SNET-CLI`. This id
will not be seen by anyone. It's just a way to make it easier for you to refer
to your private key (you may have many, btw) in following 'snet' commands. This
alias is kept locally in the container and will vanish when it's shutdown.
`KEY_TYPE` can be either

* key
* rpc
* mnemonic
* ledger
* trezor

You may find detailed information regarding key types (and other `SNET-CLI`
features) in https://github.com/singnet/snet-cli

In this tutorial we'll use `KEY_TYPE == key`. Enter your private key when
prompted (in `Metamask`: menu -> details -> export private key)

## Step 10 (optional if you already have an organization) 

Create an organization and add your key to it.

```
# snet organization create ORGANIZATION_NAME PUBLIC_KEY
```

Replace `ORGANIZATION_NAME` by a name of your choice and replace `PUBLIC_KEY`
by the public key associated with the private key you used previously.

If you want to join an existing organization (e.g. SNET), ask the owner to add
your key before proceeding. In this tutorial we assume you'll use SNET.

## Setp 11

Edit a JSON configuration file for your service.  We already have a valid
`service.json` in project's folder looking like this:

```JSON
{
    "name": "math-operations",
    "service_spec": "service_spec/",
    "organization": "SNET",
    "path": "",
    "price": 0,
    "endpoint": "http://localhost:7000",
    "tags": [
        "[]"
    ],
    "metadata": {
        "description": ""
    }
}
``` 

Anyway we'll change it to add some useful information in `tags` and `description`.

```JSON
{
    "name": "math-operations",
    "service_spec": "service_spec/",
    "organization": "SNET",
    "path": "",
    "price": 0,
    "endpoint": "http://localhost:7000",
    "tags": ["tutorial", "math-operations", "basic"],
    "metadata": {
        "description": "A tutorial Go service"
    }
}
``` 

You could also use `SNET-CLI` build the JSON configuration file
using `snet service init` and answering the prompted questions.

## Step 12

First, make sure you killed the `server` proccess started in Step 7. Then
publish and start your service:

```
# ./publishAndStartService.sh PRIVATE_KEY
```

Replace `PRIVATE_KEY` by your private key (in `Metamask`: menu ->
details -> export private key).  This will start the SNET Daemon and your
service. If everything goes well you will see the blockchain trasaction logs
and then the following 3 messages (respectively from: SNET-CLI, your service and
SNET Daemon):

```
Service published!
Server listening on 0.0.0.0:7070
DEBU[0001] starting daemon                              
```

You can double check if it has been properly published using

```
# snet organization list-services SNET
```

Optionally you can un-publish the service

```
# snet service delete SNET math-operations
```

Actually, since this is just a tutorial, you are expected to un-publish your
service as soon as you finish the tests.

Other `snet` commands and options (as well as their documentation) can be found here: 
https://github.com/singnet/snet-cli

## Step 13

You can test your service making requests in command line

```
# ./testServiceRequest.sh 12 4
[blockchain log]
    response:
        v: 3
```

That's it. Remember to delete your service as explained in Step 12.

```
# snet service delete -y SNET math-operations
```
