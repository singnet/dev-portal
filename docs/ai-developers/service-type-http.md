---
# Page settings
layout: default
keywords: http daemon
comments: false

# Micro navigation
micro_nav: true
---

## Introduction

If you want to integrate a simple http api instead of `grpc/jsonrpc/process`,
then you need to specify the `"daemon_type":"http"` parameter in the config and prepare the API and proto file.

Currently, only POST methods are supported. 
That is, your API can have 1 or more POST methods with a json body. 
Also, in the config for the `service_credentials` parameter, 
you can specify the parameters to be passed for all methods.
For example, the secret api key in the header.

## Example with simple flask API

Let's say we have a simple API on flask (the framework is not important). 
The API has two methods with different inputs:

```python
#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    input_data = json.loads(request.data)
    print(input_data['input_data'])
    return jsonify({'status': 'ok',
                    'result': 'simple_result'})

@app.route('/calculate', methods=['POST'])
def calculate():
    input_data = json.loads(request.data)
    print(input_data['number'])
    print(input_data['operation'])
    print(input_data['second_number'])
    return jsonify({'status': 'ok',
                    'result': 'simple_result'})

app.run()
```

Let's write a proto file so that the daemon understands
correctly how to work with your service:

```protobuf
syntax = "proto3";
package service;

// input struct for calculate method
message CalculateInput {
  uint64 number = 1;
  string operation = 2;
  uint64 second_number = 3;
}

// input struct for process method
message ProcessInput {
  string input_data = 1;
}

// API has the same outputs for both methods
message CommonOutput {
  string status = 1;
  string result = 2;
}


service ExampleService {
  // specify input and output types for each method
  // the method path (/calculate) should be named the same as in the proto file
  rpc calculate(CalculateInput) returns (CommonOutput) {}
  rpc process(ProcessInput) returns (CommonOutput) {}
}
```
If you need to send any additional parameters in query or headers,
you can specify them in `service_credentials` (works only for http service type):
The parameter accepts an array, example:

```json
[{"key": "X-Banana-API-Key",
"value": "646bd7d4-a3e1-46ba-b742-bc4504dc5b30",
"location": "header"}]
```

Location can be: query or header