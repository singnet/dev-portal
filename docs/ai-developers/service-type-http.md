---
# Page settings
layout: default
keywords: http daemon, Scheme, api
comments: false
title: HTTP service type
description: HTTP service type

# Micro navigation
micro_nav: true
---

## Introduction

If you would like to integrate a simple HTTP API instead of `gRPC/JSONRPC/process` service types, 
then you will need to prepare the API (check for limitations) and write correct proto files. 
Then specify the `service_type = http` parameter when creating your AI service.

## Scheme

![The scheme of the daemon's work with http services](/assets/img/daemon/daemon_http.png)

## Limitations
* Currently, only POST methods are supported;
* Only json in body of request supported;
* No streaming supported;
* Only one proto file for service.

If you run into limitations or get errors, then contact support or [open an issue on github](https://github.com/singnet/snet-daemon/issues/new).
We will try to help you.

## Example

Let's say we have a simple API on flask (the framework and programming language is not important).
The API has two POST methods with different inputs:

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

If you need to send any additional parameters for all methods (for example, the secret api key),
you can specify them in daemon config parameter `service_credentials`.
The parameter accepts an array, example:

```
"service_credentials":[
    {
      "key": "example_body_param",
      "value": 12345,
      "location": "body"
    },
    {
      "key": "X-API-Key",
      "value": "546bd7d4-d3e1-46ba-b752-bc45e4dc5b39",
      "location": "header"
    }
  ],
```

With this example daemon will add `example_body_param` with value `12345` in body to all request to HTTP service. 
Also, all requests to service will be with `X-API-Key` header.

Location can be: query, header, body. Key and location must be string.
