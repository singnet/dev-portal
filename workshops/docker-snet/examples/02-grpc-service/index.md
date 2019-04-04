---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: "Example 2: Write & Publish gRPC Python Service"
description: This example shows you how to write and publish a gRPC Python service

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
---

Please see:
* [snet-cli repo documentation](https://github.com/singnet/snet-cli)
* [snet-daemon repo documentation](https://github.com/singnet/snet-daemon/)
* [gRPC python quickstart](https://grpc.io/docs/quickstart/python.html)


## Compile service API
```
cat echo_service.proto
python3 -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. ./echo_service.proto
```

## Start service server
```
cat echo_service.py
screen -d -m python3 echo_service.py
```

## Check that service works
```
cat echo_client.py
python3 echo_client.py
```

## Publish service to the Registry
```
snet identity publisher
snet service metadata_init . EchoService $PUBLISHER_ADDR --encoding proto --service_type grpc
snet service metadata_set_fixed_price 3
snet service metadata_add_endpoints http://127.0.0.1:8080
cat service_metadata.json
snet service publish ExampleOrganization EchoService --yes
```

## Start daemon
```
cat snetd.config.json
screen -d -m snetd-linux-amd64
```

## Call service via SingularityNet
```
snet identity caller
snet client open_init_channel_registry ExampleOrganization EchoService 50 57600 -y
snet client call 0 3 localhost:8080 echo '{"message": "hello"}'
```

## Stop the service
```
stop_service.sh
```

> Next Example
