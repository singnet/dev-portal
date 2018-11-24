#!/bin/bash

python3 -m grpc_tools.protoc -I./service_spec --python_out=./service_spec --grpc_python_out=./service_spec ./service_spec/tutorial.proto
