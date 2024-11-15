# SingularityNET Boilerplate User Guide

Welcome to the SingularityNET Boilerplate User Guide! This document will provide step-by-step instructions on setting up, configuring, and using the boilerplate project to integrate with SingularityNET services.

## Step 1. Dependencies

Before you begin, ensure you have the `Node.js (v18 or higher)` installed on your machine

If you don't have Node.js installed, you can follow the official installation instructions provided by Node.js:

Go to the official Node.js website: [Node.js Download.](https://nodejs.org/en)
Follow the instructions for your specific operating system (Windows, macOS, or Linux).
These instructions will guide you through the process of downloading and installing the latest version of Node.js, including npm, the Node.js package manager.

After installation, verify that Node.js was installed correctly by running the following command in your terminal:

```bash
  node -v
```

Ensure that the version displayed is v18 or higher.

## Step 2. Installation

Follow these steps to set up the project:

1. **Clone the repository and navigate to the directory:**

```bash
  git clone https://github.com/singnet/Web-JS-SDK-Boilerplate
  cd Web-JS-SDK-Boilerplate
```

2. **Copy the .env.example file to .env and update the values as necessary:**

```bash
  cp .env.example .env
```

3. **Configure environment variables**

The project requires certain environment variables to be set in the `.env` file. Below is a list of the required variables and their descriptions:

| Variable Name                         | Description                                                              | Where to Get It                               |
| ------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| `REACT_APP_ENV`                       | Specifies the environment (`development` or `production`).               | Set this manually.                            |
| `REACT_APP_ALCHEMY_API_KEY`           | API key for accessing Alchemy services.                                  | [Alchemy API Keys](https://alchemy.com)       |
| `REACT_APP_PARTICLE_AUTH_PROJECT_ID`  | Project ID for Particle authentication.                                  | [Particle Network](https://particle.network/) |
| `REACT_APP_PARTICLE_AUTH_CLIENT_KEY`  | Client key for Particle authentication.                                  | [Particle Network](https://particle.network/) |
| `REACT_APP_PARTICLE_AUTH_APP_ID`      | Application ID for Particle authentication.                              | [Particle Network](https://particle.network/) |
| `REACT_APP_NETWORK`                   | Specifies the blockchain network to connect to (`mainnet` or `sepolia`). | Set this manually.                            |
| `REACT_APP_INFURA_PROJECT_ID`         | Project ID for accessing Infura services.                                | [Infura](https://infura.io)                   |
| `REACT_APP_WALLET_CONNECT_PROJECT_ID` | Project ID for Wallet Connect integration.                               | [Wallet Connect](https://walletconnect.com/)  |

4. **Install the required dependencies:**

```bash
  npm install
```

5. **Start the development server:**

```bash
  npm start
```

After setting up, you can run the project on `localhost:3000` to see it in action. The project comes pre-configured with two example services: one for the Ethereum Mainnet and one for the Sepolia Testnet. You can connect your wallet and send a message to the example service to see how it works.

## Step 3. Generating JavaScript Files for Your Services

To interact with your own SingularityNET services, you need to compile the `.proto` files from your service to JavaScript files

### Steps to Generate JS Files

```sh
protoc -I="." --js_out=import_style=commonjs,binary:. <file_name>.proto
protoc-gen-grpc -I="." --grpc_out=grpc_js:. <file_name>.proto
```

For more details please check the [Generating stubs for JS tutorial](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/generating-stubs/)

After that you need to place them in the `src/ExampleService/assets` folder to use it in your service component.

## Step 4. Interact with your service

### Configure the Service

To configure the project to work with your service, you need to specify the `orgId` and `serviceId` in the `src/config/service.ts` file. There are two configurations: one for mainnet and one for sepolia testnet.

1. Open the `src/config/service.ts` file.
2. Update the `orgId` and `serviceId` values to match your desired SingularityNET service.
   orgId: "your-organization-id",
   serviceId: "your-service-id"

### Adapt the ExampleService Component

The `ExampleService/TestExampleService` component provides a user interface for interacting with your service on the Mainnet/Sepolia network.

#### Make call to your service

1. **change `runService` function**: Send a request to your service with the user-provided text and handle the response. Replace the service call and response handling in the `runService` function with the appropriate calls to your own service as defined in the protobuf files.

```typescript
import { example } from './assets/mainnet/summary_pb_service';

async function runService(text) {
    const invokeOptions = {
        request: { text: text },
        host: 'https://your-service-host',
    };

    try {
        const response = await clientSDK.unary(
            example.TextSummary.summary,
            invokeOptions
        );
        newChat('bot', response.getText());
    } catch (error) {
        console.error('Error running service:', error);
    }
}
```

2. **use `newChat` funtion to display messages**: When you want to display messages from a user or a service in the chat, simply call the newChat function, providing the sender and the message.

```typescript
newChat('user', "This is a user's message.");
newChat('bot', "This is a bot's response.");
```