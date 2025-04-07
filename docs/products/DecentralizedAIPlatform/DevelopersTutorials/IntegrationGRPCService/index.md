# Integration gRPC Service

## Introduction

If you want to integrate your AI service using `gRPC`, you will need to:

1. Prepare the correct `.proto` file;
2. Generate the gRPC server/client code;
3. Implement the server using your framework of choice;
4. Specify the `service_type = grpc` parameter when creating your AI service.

gRPC is a powerful and efficient communication protocol that supports multiple programming languages, and is fully supported by our daemon.

If you encounter issues or limitations, feel free to contact support or [open an issue on GitHub](https://github.com/singnet/snet-daemon/issues/new). We’ll help you out!

## Example

Let’s say we want to create a simple gRPC service with one method `call` that accepts a query and returns multiple answer fields.

### 1. Proto file

Create a `.proto` file describing your service (e.g., `example.proto`):

```proto
syntax = "proto3";

package example;

// Input message
message Query {
    string query = 1;
    bool _type = 2;
}

// Output message
message Answer {
    string answer = 1;
    string answer2 = 2;
    string answer3 = 3;
}

// Service definition
service Example {
    rpc call(Query) returns (Answer) {}
}
```

### 2. Install gRPC tools

Install the necessary Python packages:

```bash
python -m pip install grpcio grpcio-tools
```

### 3. Generate gRPC code

Use the `protoc` compiler to generate Python bindings from your `.proto` file:

```bash
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. example.proto
```

This will generate two files: `example_pb2.py` and `example_pb2_grpc.py`.

### 4. Create the gRPC server

```python
import time
import logging
import argparse
from concurrent import futures

import grpc
import example_pb2
import example_pb2_grpc
from utility import Model  # your internal model or logic

_ONE_DAY_IN_SECONDS = 60 * 60 * 24

# Server implementation
class ExampleServicer(example_pb2_grpc.ExampleServicer):
    def __init__(self):
        self.model = Model()

    def call(self, request, context):
        try:
            query = request.query
            _type = request._type
            result, result2, result3 = self.model.predict(query, _type)
            print(result, result2, result3)
        except Exception as e:
            print("Error: {}".format(e))
            raise Exception("Error: {}".format(e))
        return example_pb2.Answer(answer=result, answer2=result2, answer3=result3)

def serve():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", type=str, default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8010)
    args = parser.parse_args()

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    example_pb2_grpc.add_ExampleServicer_to_server(ExampleServicer(), server)
    server.add_insecure_port(f"{args.host}:{args.port}")
    server.start()
    print("Server started")

    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    logging.basicConfig()
    serve()
```

### 5. Create the gRPC client

```python
import time
import logging
import argparse

import grpc
import example_pb2
import example_pb2_grpc

def ExampleClient(stub):
    s_time = time.time()
    query = "some query"
    _type = True

    response = stub.call(example_pb2.Query(query=query, _type=_type))
    r_time = time.time() - s_time

    print('\n########################################################################################\n')
    print("{:.3}s\n{}".format(r_time, response.answer))
    print('\n########################################################################################\n')

def run():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1", type=str)
    parser.add_argument("--port", default=8010, type=int)
    args = parser.parse_args()

    with grpc.insecure_channel(f"{args.host}:{args.port}") as channel:
        stub = example_pb2_grpc.ExampleStub(channel)
        ExampleClient(stub)

if __name__ == '__main__':
    logging.basicConfig()
    run()
```
