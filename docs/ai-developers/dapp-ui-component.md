---
# Page settings
layout: default
keywords: intro concepts, UI components, storybook,  Build component locally
comments: false
title: UI components
description: The SingularityNET network allows developers to register their AI services on an open marketplace and charge for access. 

# Micro navigation
micro_nav: true
---

## Overview

The SingularityNET network allows developers to register their AI services on an open marketplace and charge for access. Though the expectation is that service consumers will primarily call services from code, the <a href="https://beta.singularitynet.io/" target="_bank">SingularityNET Dapp</a> offers a rich UI/UX for people to explore the services offered on the network.
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

Install [Node.js and npm](https://nodejs.org/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install)

-   node version >=18
-   yarn version >=1.22.21

1. **Download the snet-dapp code**

    ```sh
    git clone git@github.com:singnet/snet-dapp.git
    cd snet-dapp
    yarn install
    cp .env.sandbox .env
    ```

2.  **Update `.env` file**

    1. `REACT_APP_SANDBOX_SERVICE_ENDPOINT`

        The daemon endpoint for call AI methods of your service.

    2. `REACT_APP_SANDBOX_ORG_ID` & `REACT_APP_SANDBOX_SERVICE_ID`

        The `org_id` to which the service belongs and the `service_id` of the service. The values set for these variables will be used for registering the custom ui.

3.  **Start the AI service**

    Start the AI service locally along with the snet daemon. Make sure the blockchain is disabled in the daemon configuration.

4.  **Building the custom UI**

    1. Make sure you are inside the repo directory.
    2. Check if you have an executable file `protoc-gen-ts` in the path `./node_modules/.bin/`. Else run `npm i -D ts-protoc-gen`
    3. Generate `js` stubs from `.proto` files.
       For the custom UI to talk to the services on SingularityNET platform via the DApp, we are using <a href="https://github.com/improbable-eng/grpc-web" target="_blank">gRPC-web</a> by improbable-eng. Apart from the steps mentioned at the official <a href="https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/code-generation.md" target="_blank">documentation</a> to generate `js stubs` from `.proto` definitions, you also need to provide the `namespace_prefix` flag to the generator.

        Here is an example which illustrates the usage

        For Linux

        ```sh
        protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --js_out=import_style=commonjs,binary,namespace_prefix=\
        [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. \
        [proto file name].proto
        ```

        For Windows CMD

        ```sh
        protoc ^
        --plugin=protoc-gen-ts=%cd%/node_modules/.bin/protoc-gen-ts.cmd ^ --js_out=import_style=commonjs,binary,namespace_prefix=^
        [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. ^
        [proto file name].proto
        ```

    4. The above script will generate four files. Copy the files `*pb.js` and `*pb_service.js` into your component's folder and ignore the rest.
    5. Also at the top of generated files, add `/**eslint-disable */`
    6. You need to build the custom UI following the steps:
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

5.  **Register the custom UI**

    Add an entry for the new service in `src/assets/thirdPartyServices/index.js` if it does not already exist. Add the following line towards the end of the file. Make sure to replace `orgId`, `serviceId` and `CustomUIComponent` accordingly.

    ```sh
    thirdPartyCustomUIComponents.addCustomUIComponen(orgId, serviceId, CustomUIComponent);
    ```

    For example with org_id="snet" and service_id="example-service":

    ```
    thirdPartyCustomUIComponents.addCustomUIComponent("snet", "example_service", ExampleServiceUI);
    ```

6.  **Run the DApp**

    Assuming that the snet daemon is running on the port that you specified in the REACT_APP_SANDBOX_SERVICE_ENDPOINT, running the bellow commands should bring up the DApp in sandbox mode for local development.

    ```sh
    yarn start
    ```

    or

    ```sh
    npm run start
    ```

7.  **Component development**

    To request a call, your component should use the props `service Client` and `isComplete`.
    - `serviceClient` provides methods for calling the service.
    - `isComplete` provides your service with information about the service's response.
    Example of a call service:  

    ```js
    import { ExampleService } from "./example_pb_service";

    const ExampleServiceUI = ({ serviceClient, isComplete }) => {

        <...>

        const parseResponse = (response) => {
            const { message, status, statusMessage } = response;

            if (status !== 0) {
                throw new Error(statusMessage);
            }
            setResponse(message.getResponse());
        };

        const runService = () => {
            const methodDescriptor = ExampleService.exampleServiceMethod;
            const request = new methodDescriptor.requestType();

            request.setUserInput(userInput);

            const props = {
                request,
                onEnd: (response) => parseResponse(response),
            };
            //serviceClient is prop
            serviceClient.unary(methodDescriptor, props);
        };

        <...>
        
        //isComplete is prop
        if (!isComplete) {
            return <ServiceInput />;
        } else {
            return <ServiceOutput />;
        }
    };
    ```
    The load indication is enabled using the Marketplace, you do not need to develop this part of the application.