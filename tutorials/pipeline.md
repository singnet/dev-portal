---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: How to Publish a SingularityNET Service
description: Getting your service deployed on to the SingularityNET platform

# extralink box
extralink:
    title: All Docs
    title_url: '/docs/all'
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
        content: View all docs
        url: '/docs/all'
---

## Overview

Combine multiple services toheter in a single pipeline and package it as more comphensive solution for cusotmers charging premium rates or simplify existent business workflows.

## Requirements

1. Download Snet Daemon and configure Link
2. Download Snet CLI and setup an identity Link
3. Get Eth and AGI
4. Create or join an organization

You can follow [this tutorial](https://dev.singularitynet.io/tutorials/publish/) from a bash terminal until **step 5**


## Step 1. Pick a combination of services  

You can head to the [beta DApp](https://beta.singularitynet.io) to find the services you want to combine and package it as cohesive solution.

Alternatively, you can use the Snet CLI and browse per Organization. Link

For this example we will combine sequencially  the following mainnet agents:

1. snet/language-detection 
2. snet/translation

You can quickly inspect the API models in the Ethereum registry for each service using the `CLI`

```sh
snet service get-api-registry snet language-detection .
cat LanguageDetection.proto 
```

```proto
syntax = "proto3";

message Input {
    string input = 1;
}

message Output {
    repeated Language language = 1;
}

message Language {
    string sentence = 1;
    repeated Prediction prediction = 2;
}

message Prediction {
    string language = 2;
    float confidence = 3;
}

service LanguageDetect {
    rpc infer (Input) returns (Output) {
    }
}
```

```sh
snet service get-api-registry snet translation .
cat translate.proto 
```

```proto
syntax = "proto3";

message Request {
  string text = 1;
  string source_language = 2;
  string target_language = 3;
}

message Result {
  string translation = 1;
}

service Translation {
    rpc translate(Request) returns (Result) {}

```

## Step 2. Create the pipeline's API model

As `SERVICE_DISPLAY_NAME` we pick `tradotto` being the past participle of the Italian verb "tradurre"(🇬🇧 to translate)

From the API models of chosen services we can detect the methods we need to call to offer a fancy translation service:

1. `LanguageDetect` via `snet/language-detection`
2. `Translation` via `snet/translation`

In order to keep future maintainence time of the pipeline to the minimum, we will use the messages of respective input and output.

For our example we define the following APi model via Protocol Buffer definition. Link

```proto
syntax = "proto3";

message Input {
    string input = 1;
}

message Result {
  string translation = 1;
}

service Tradotto {
  rpc translate (Input) returns (Result) {}
}

```


As you can see, we kept the same message encoding for our service in the pipeline and we created an ad hoc rpc that combines detection and translation. 


## Step 3. Create the backend service for the pipeline.

Along with Snet Daemon we need to run a simple backend service that combines the pipeline methods. For this example we do not need to run a web server, we will use a simple Python script and daemon will take care of expsing trough gRPC.


Install the SNET python SDK

```
pip install snet-sdk
```

Let's create a folder and an empty file called pipeline.py

```
mkdir tradotto && cd tradotto && touch pipeline.py
``` 

Let's add some code in it 

```python
from snet_sdk import Snet

MY_PRIVATE_KEY = 
INPUT_TEXT = 
TARGET_LANGUAGE =  

# Create Snet instance using a private key sourced via arguments 
snet = Snet(private_key=MY_PRIVATE_KEY, eth_rpc_endpoint="https://mainnet.infura.io")

# Instanciate clients for each service in the pipeline to use
lang_detection_client = snet.client("snet", "language-detection")
translation_client    = snet.client("snet", "translation")

# Execute the first service of the pipeline as intended
lang_detection_stub    = lang_detection_client.grpc.language_detection_pb2_grpc.LanguageDetectStub(lang_detection_client.grpc_channel)
lang_detection_request = lang_detection_client.grpc.language_detection_pb2.Input(input=INPUT_TEXT)
languages   = lang_detection_stub.infer(lang_detection_request).language
# For simplicity we pick the first language detected 
language = languages[0]

# Execute the second service of the pipeline as intended
translation_stub    = translation_client.grpc.translation_pb2_grpc.TranslationStub(translation_client.grpc_channel)
translation_request = translation_client.grpc.translation_pb2.Request(text=INPUT_TEXT, source_language=language, target_language=TARGET_LANGUAGE)
translation         = translation_stub.translate(translation_request).translation

# Now let's pack the reply as we specified 
print(translation_client.grpc.translation_pb2.Result(translation=translation))
```

Service is ready to run, but first we need to publish it on SingularityNET and configure the `SNET DAEMON`.

## Step 7. Prepare service metadata to publish the service

First we need to create a service metadata file. You can do it by running:

```
snet service metadata-init SERVICE_PROTOBUF_DIR SERVICE_DISPLAY_NAME PAYMENT_ADDRESS --endpoints SERVICE_ENDPOINT --fixed-price FIXED_PRICE
```

You need to specify the following parameters:
* `SERVICE_PROTOBUF_DIR` - Directory which contains protobuf files of your service: ```service/service_spec/``` in our example service.
* `SERVICE_DISPLAY_NAME` - Display name of your service. You can choose any name you want. 
* `PAYMENT_ADDRESS` - Ethereum account which will receive payments for this service. You should set it to your ethereum account. 
* `SERVICE_ENDPOINT` - Endpoint which will be used to connect to your service.
* `FIXED_PRICE` - Price in AGI for a single call to your service. We will set the price to 10^-8 AGI (remember that 10^-8 AGI = 1 COG).

```
ACCOUNT=`snet account print`
snet service metadata-init service/service_spec/ "$SERVICE_NAME" $ACCOUNT --endpoints http://$SERVICE_IP:$SERVICE_PORT --fixed-price 0.00000001

# describe your service and add an URL for further service's information.
snet service metadata-add-description --json '{"description": "Description of my Service.", "url": "https://service.users.guide"}'
```

This command will create a JSON configuration file: ```service_metadata.json```.

See details of service metadata in [mpe-metadata](https://dev.singularitynet.io/docs/all/mpe/mpe-metadata/).

## Step 8. Publish the service on SingularityNET

Now you can publish your service (```service_metadata.json``` is used implicitly) using:

```
snet service publish $ORGANIZATION_ID $SERVICE_ID -y
```

Check if your service has been properly published:

```
snet organization info $ORGANIZATION_ID
```

## Step 9. Run the service (and SNET Daemon)

Create a `SNET DAEMON` configuration file named `snetd.config.json`. 

```
cat > snetd.config.json << EOF
{
   "DAEMON_END_POINT": "$DAEMON_HOST:$DAEMON_PORT",
   "ETHEREUM_JSON_RPC_ENDPOINT": "https://ropsten.infura.io",
   "IPFS_END_POINT": "http://ipfs.singularitynet.io:80",
   "REGISTRY_ADDRESS_KEY": "0x5156fde2ca71da4398f8c76763c41bc9633875e4",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "ORGANIZATION_ID": "$ORGANIZATION_ID",
   "SERVICE_ID": "$SERVICE_ID",
   "PAYMENT_CHANNEL_STORAGE_SERVER": {
       "DATA_DIR": "/opt/singnet/etcd/"
   },
   "LOG": {
       "LEVEL": "debug",
       "OUTPUT": {
          "TYPE": "stdout"
       }
   }
}
EOF
```

Running the service will spawn an instance of `SNET DAEMON` automatically.

```
python3 pipeline.py 
```

At this point your service should be up and running. 

