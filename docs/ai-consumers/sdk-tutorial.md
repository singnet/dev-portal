---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: How to use the SingularityNET SDK
description: Building applications the depend on SingularityNET

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
SDK is a tool for AI customers to make calls to services.

The SDK simplifies the process of integrating with SingularityNET services and provides tooling to automatically augment gRPC client stubs with the necessary authorisations.

Note: SDK uses gRPC protocol for communication
### Basic usage of js sdk on Node.js
[Click here](https://github.com/singnet/snet-code-examples/tree/master/nodejs/client)

### Basic usage of python sdk 

For Installation steps 
```sh
#create a virtual environment, an example is shown below
python3 -m venv env #check your python version and set this accordingly , 
source env/bin/activate #activate your virtual environment

pip3 install snet-sdk
````
To view an example 
[Click here](https://github.com/singnet/snet-cli/blob/master/packages/sdk/testcases/functional_tests/test_sdk_client.py)

