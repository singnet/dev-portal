# UI Sandbox version 1

The online UI Sandbox currently in the active development stage. This is will be a powerful and versatile development environment that provides tools for creating custom modules and services, online compilation, fast file upload and export, and a library of components for accelerated interface development.

Now is available `Marketplace Sandbox mode`. Here you can test the UI of your AI service which you want to host in AI Marketplace. To use this application, you should install it locally and load your UI components into it. It let you checking behavior of UI in AI Marketplace.

## Getting Started

Cloning this repo:

```
git clone git@github.com:singnet/snet-dapp.git
```

Go to project folder:

```
cd snet-dapp
```

Get dependencies:

```
yarn install
```

Create the env file:

```
cp .env.sandbox .env
```

1.  Update `.env` file to reflect the actual values for each environment variable.

    1. `REACT_APP_SANDBOX_SERVICE_ENDPOINT`

        The daemon endpoint for call AI methods of your service.

    2. `REACT_APP_SANDBOX_ORG_ID` & `REACT_APP_SANDBOX_SERVICE_ID`

        The `org_id` to which the service belongs and the `service_id` of the service. The values set for these variables will be used for registering the custom ui.

2.  Start the AI service locally along with the snet daemon. Make sure the blockchain is disabled in the daemon configuration.
3.  Building the custom ui

    1. Generate stubs:

    ```sh
    protoc -I="." --js_out=import_style=commonjs,binary:. <file_name>.proto
    protoc-gen-grpc -I="." --grpc_out=grpc_js:. <file_name>.proto
    ```

    For more details please check the [Generating stubs for JS tutorial](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/generating-stubs/)

    2.  You need build the custom UI following the steps

        Create a new directory named after the `org-id` to which this service belongs inside `src/assets/thirdPartyServices`. It could be possible that the directory already exists, in which case you can use it instead of creating a new one.

        Create a new directory named after the `service-id` under the newly created directory in the above step

        e.g. for a service with org-id: snet and service-id: example-service you will have to do the following assuming you are at the root of the `snet-dapp`

            cd src/assets/thirdPartyServices
            mkdir snet
            cd snet
            mkdir example_service
            cd example_service

        Put the all the resources used by the custom ui under this directory including the `js stubs`.

4.  Register the custom ui

    Add an entry for the new service in `src/assets/thirdPartyServices/index.js` if it does not already exist. Add the following line towards the end of the file. Make sure to replace `orgId`, `serviceId` and `CustomUIComponent` accordingly.

        thirdPartyCustomUIComponents.addCustomUIComponent(orgId, serviceId, CustomUIComponent);

5.  Assuming that the snet daemon is running on the port that you specified in the REACT_APP_SANDBOX_SERVICE_ENDPOINT, running the bellow commands should bring up the DApp in sandbox mode for local development.

    ```
    yarn start
    ```

    or

    ```
    npm run start
    ```
