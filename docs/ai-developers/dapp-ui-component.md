---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Developers

# Micro navigation
micro_nav: true

---

## Overview

The SingularityNET network allows developers to register their AI services on an open marketplace and charge for access. Though the expectation is that service consumers will primarily call services from code, the <a href="www.beta.singulaitynet.io" target="_bank">SingularityNET Dapp</a> offers a rich UI/UX for people to explore the services offered on the network. 
Providing an interface for consumers to interact with the service on the marketplace is a big driver for demand. 


## Core Tenets

1. Service developers are able to craft a custom UI locally
1. Service developers are able to register their custom UIs thru the publisher portal
1. Custom UIs handle collecting parameters and displaying results, while the SingularityNET Dapp itself handles the service request/response flow
1. <a href="http://custom-ui.singularitynet.io.s3-website-us-east-1.amazonaws.com/?path=/story/alerts-alertbox--live-source" target="_blank">SingularityNet storybook</a> enables custom UIs to match the overall style and aesthetic of the SingularityNET Marketplace. 

## Approach

### Explore SingularityNet storybook
<a href="http://custom-ui.singularitynet.io.s3-website-us-east-1.amazonaws.com/?path=/story/alerts-alertbox--live-source" target="_blank">SingularityNet storybook</a> is a UI component explorer for service developers. This lists all common components used in the marketplace and can be reused for your service.

### Build component locally

1. **Download the snet-dapp code**
```sh
    git clone git@github.com:singnet/snet-dapp.git
    cd snet-dapp
    npm install
    cp .env.sandbox .env
```

2. **Update `.env` file**
    1. **REACT_APP_SANDBOX_SERVICE_ENDPOINT** - The endpoint of the service running locally. `snetd` defaults to `http://localhost:8088`.
    2. **REACT_APP_SANDBOX_ORG_ID** - The `org_id` to which the service belongs. This value will be used for registering the custom UI
    3. **REACT_APP_SANDBOX_SERVICE_ID** - The `service_id` of the service. This value will be used for registering the custom UI
    <br/><br/> 

3. **Start the AI service** locally along with the snet daemon. Make sure the blockchain is disabled in the daemon configuration. 

4. **Building the custom UI**
    1. Generate `js` stubs from `.proto` files. 
        For the custom UI to talk to the services on SingularityNET platform via the DApp, we are using <a href="https://github.com/improbable-eng/grpc-web" target="_blank">gRPC-web</a> by improbable-eng. Apart from the steps mentioned at the official <a href="https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/code-generation.md" target="_blank">documentation</a> to generate `js stubs` from `.proto` definitions, you also need to provide the `namespace_prefix` flag to the generator. Here is an example which illustrates the usage
        ```sh
        protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --js_out=import_style=commonjs,binary,namespace_prefix=<uniq_name_space>:. \
        --ts_out=service=true:. \
        example_service.proto
        ```
        **uniq_name_space** should be a combination of `package_name` + `org_id` + `service_id`.
For the following <a href="https://github.com/singnet/example-service/blob/master/service/service_spec/example_service.proto" target="_blank">proto file</a> with `org_id=snet` and `service_id=example-service` the namespace_prefix would be `example_service_snet_example_service`. <br />
        **PS: All the `-` should be replaced by `_`**    
    2. You need to build the custom UI following the steps
        1. Create a new directory named after the `org-id` to which this service belongs inside `src/assets/thirdPartyServices`. It could be possible that the directory already exists, in which case you can use it instead of creating a new one.
        2. Create a new directory named after the `service-id` under the newly created directory in the above step e.g. for a service with org-id: snet and service-id: example-service you will have to do the following assuming you are at the root of the `snet-dapp`
        ```sh
            cd src/assets/thirdPartyServices
            mkdir snet
            cd snet
            mkdir example_service
            cd example_service
        ```
        3. Put the all the resources used by the custom UI under this directory including the `js stubs`
    <br/><br/>

5. **Register the custom UI** - Add an entry for the new service in `src/assets/thirdPartyServices/index.js` if it does not already exist. Add the following line towards the end of the file. Make sure to replace `orgId`, `serviceId` and `CustomUIComponent` accordingly. 
    ```sh
        thirdPartyCustomUIComponents.addCustomUIComponent(orgId, serviceId, CustomUIComponent);
    ```

6. **Run the DApp** - Assuming that the snet daemon is running on port `8088`, running the bellow commands should bring up the DApp in sandbox mode for local development.
    ```sh
    npm run sandbox
    ```
