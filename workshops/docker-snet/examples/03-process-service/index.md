---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: "Example 3: Writing & Publishing a Command Line Python Service"
description: This example shows you how to write and publish a Python service with the command line

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


## Publish service to the Registry
```
snet identity publisher
snet service metadata_init . ProcessService $PUBLISHER_ADDR --encoding json --service_type process
snet service metadata_set_fixed_price 3
snet service metadata_add_endpoints http://127.0.0.1:8080
cat service_metadata.json
snet service publish ExampleOrganization ProcessService --yes
```

## Start daemon
```
cat snetd.config.json
screen -d -m snetd-linux-amd64
```

## Call service
```
snet identity caller
snet client open_init_channel_registry ExampleOrganization ProcessService 50 57600 -y
snet client call 1 3 localhost:8080 echo '{"message": "hello"}'
```

## Stop service
```
stop_service.sh
```

> Next Example
