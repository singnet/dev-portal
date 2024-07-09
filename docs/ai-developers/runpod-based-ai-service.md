---
# Page settings
layout: default
keywords: runpod onboarding, Publish the service
comments: false
title: Runpod based AI service
description: Runpod based AI service

# Micro navigation
micro_nav: true
---

## Runpod based AI service

Repository with source code for this project can be found here: [Github](https://github.com/singnet/Hate-Speech-Runpod)

In this example Runpod will be used as a serverless GPU provider, allowing us to deploy Hate Detection service for minimal cost (pay for use basis)

The process is fairly simple and utilizes the ability of Daemon to use HTTP type services

Steps:
1. [Modify your code to be used on runpod](#1-modify-your-code)
2. [Build service docker image](#2-build-service-docker-image)
3. [Upload the image](#3-upload-the-image)
4. [Create a template](#4-create-a-template)
5. [Create the endpoint](#5-create-the-endpoint)
6. [Construct the proto file](#6-construct-the-proto-file)
7. [Publish the service](#7-publish-the-service)

### 1. Modify your code

To utilize runpod we have to slightly modify our code, to do that we need to add the runpod python library to our app.
```python
import torch
import runpod

from transformers import AutoTokenizer
from utils.TweetNormalizer import normalizeTweet
from utils.custom_model import CustomModel

def handler(event):
    model = torch.load('model_7')
    tokenizer = AutoTokenizer.from_pretrained("vinai/bertweet-large")

    context = {
        "model": model,
        "tokenizer": tokenizer
    }

    return process(event['input'], context)

def process(request, context):
    prompt = request["prompt"]
    model = context.get("model")
    tokenizer = context.get('tokenizer')

    text = [normalizeTweet(prompt)]
    text = tokenizer(text, padding='longest')
    text = {k: torch.tensor(v, device='cuda:0') for k, v in text.items()}

    out = model.forward(**text)
    for i, t in zip(out, prompt):
        res = {'text': prompt, 'hate': i[0].tolist(), 'abusing': i[1].tolist(), 'neutral': i[2].tolist(), 'spam': i[3].tolist()}

    return res

if __name__ == "__main__":
    runpod.serverless.start({'handler': handler})
```

First, we need to initialize our service through runpod.serverless.start method, which can be done with:
```python
if __name__ == "__main__":
    runpod.serverless.start({'handler': handler})
```
This method point to the handler function of our app, so replace the value of handler key with appropriate method.

On execute of this function event object is passed to your handler function, which will contain all of the data passed in request to the service.

In Hate Detection service handler function is responsible for model initialization, so we pass loaded model and request to process function. Output of process function will be returned on our request.

### 2. Build service docker image
The checkpoint for this model is open access, it's downloaded on build as mentioned in Dockerfile
```docker
FROM pytorch/pytorch:1.11.0-cuda11.3-cudnn8-runtime

WORKDIR /app
ADD . .

RUN apt-get update && apt-get install -y wget
# Install python packages.
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

# Download model
RUN wget https://snet-open-models.s3.amazonaws.com/hate-speech-detection/model_7 && python3 download.py

CMD python3 -u app.py
```

To build the image run the command:
```bash
docker build . -t hate-speech-detection
```

To test the image locally, you need to provide ```test_input.json``` file inside container with the request inside. If it is present, simply running the container will launch it in local mode.

### 3. Upload the image
Upload your image to any container registry, public or private (docker.hub; AWS ECR; Gitlab Registry etc.)

### 4. Create a template
Go to runpod user console, there go to [templates tab](https://www.runpod.io/console/user/templates) and create new template.

In this template specify:
 - Name of template,
 - Type of template - serverless in our case,
 - Container image (example: pytorch/pytorch:latest) which you uploaded in previous step,
 - Container registry credentials (if you uploaded your image to private registry),
 - Start command (isn't necessary with Dockerfile provided in this guide)
 - Disk space

Press "Save template"

### 5. Create the endpoint

Go to [serverless tab](https://www.runpod.io/console/serverless) in your runpod console and press "New endpoint"

Specify endpoint name and compatible GPUs (16GB GPU is more than enough for this example service)

Specify max worker numbers and idle timeout (you have limted workers available depending on your current account balance, and every service you deploy will count towards this limit and will reduce by max worker numbers for each service; idle timeout is time service keeps running after processing the request, waiting for new requests before scaling down)

Set max execution time for your service and choose the template you created in previous step, press deploy.

New endpoint will be created and in some time your service will be deployed and update its state to "Idle".

### 6. Construct the proto file
Format of proto file depends on inputs and outputs of your service.
Explanation: 

Let's take default request to the serverless service on runpod:
```json
{
  "input": {
    "prompt": "Hello World"
  }
}
```
It is formatted like json or python dict. Everything closed in "{}" translates to "message" in proto files.

So first, we will describe whole input like this (note that field names in request should be identical to var names in proto):
```protobuf
message data {      <-- name data is not strict, you can use whatever name
  Input input = 1;  <-- type Input will be mentioned later, var name is "input" because default request contains key input. This name is strict
}
```

Next, for key "input" we have another json-like structure, so we will deine it:
```protobuf
message Input {      <-- non strict name of structure, should be identical as var Type in parent object
  string prompt = 1; <-- name "prompt" is strict as it is used in request. var type is string as in request
}
```
That's all for input, it is fairly simple

Let's check default output from runpod:
```json
{
  "delayTime": 6091,
  "executionTime": 5601,
  "id": "sync-********-****-****-****-************-**",
  "output": {
    "abusing": 0.0034548593685030937,
    "hate": 0.0024814035277813673,
    "neutral": 0.013020938262343407,
    "spam": 0.9810428619384766,
    "text": "Hello World"
  },
  "status": "COMPLETED"
}
```

We will have to make similar structure in proto file for output. Let's return only output and status:
```protobuf
message output {        <-- Whole json structure of response
  results output = 1;   <-- Fetching output field with type "results" describing it
  string status = 2;    <-- Fetching status field with string type
}

message results {       <-- output field descriptor
  float abusing = 1;    <-- field "abusing" with type float
  float hate = 2;       <-- field "hate" with type float
  float neutral = 3;    <-- field "neutral" with type float
  float spam = 4;       <-- field "spam" with type float
  string text = 5;      <-- field "text" with type string
}
```
We don't need to specify all fields of output, only those you want to be returned by daemon. Everything not mentioned in proto file will be ignored.

And lastly we need to specify service, method and interaction:
```protobuf
service runsync {                           <-- service with name runsync; service name should be identical to the API method name from runpod
  rpc runsync(data) returns (output) {}     <-- rpc method, use same name as service name, takes "data" message and returns "output" message
}
```

So, in the end, your proto file should look like this:
```protobuf
syntax = "proto3";
package service;

message data {
  Input input = 1;
}

message Input {
  string prompt = 1;
}

message output {
  results output = 1;
  string status = 2;
}

message results {
  float abusing = 1;
  float hate = 2;
  float neutral = 3;
  float spam = 4;
  string text = 5;
}

service runsync {
  rpc runsync(data) returns (output) {}
}
```

### 7. Publish the service

For instruction on how to publish the service you can read [this article](https://dev.singularitynet.io/docs/ai-developers/SNET_Full_Guide_(Mainnet))

The process is quite similar, although you need to publish your service as "http" type which can be specified inside service metadata.

Also you will have to slightly alter the configuration of daemon:
```json
"passthrough_endpoint": "https://api.runpod.ai/v2/<your-endpoint-id>/",
"service_credentials": [
    {
      "key": "Authorization",
      "value": "Bearer <YOUR-RUNPOD-API-KEY>",
      "location": "header"
    }
]
```
For passthrough endpoint you need to provide API link with your service endpoint id, which can be found in runpod user console.

Also you will have to pass authorization token inside the header of request, this can be done by adding necessary info to "service_credentials" paramater of daemon config. 