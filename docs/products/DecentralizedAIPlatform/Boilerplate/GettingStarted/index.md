# Getting Started

### Prerequisites

-   Node.js (v18 or higher)

### Installation

1. Clone the repository and navigate to the directory:

```bash
git clone https://github.com/singnet/Web-JS-SDK-Boilerplate
cd Web-JS-SDK-Boilerplate
```

2. Copy the .env.example file to .env and update the values as necessary:

```bash
cp .env.example .env
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

### Environment Variables

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

### Configuring Service

The components that interact with the service are located in src/pages/calculator.
The app automatically chooses which service to display based on the `REACT_APP_NETWORK` selected:

-   For `sepolia`, it uses `Testcalculator`.
-   For `mainnet`, it uses `calculator`.

To configure the project to work with your service, you need to specify the `orgId` and `serviceId` in the `src/config/service.ts` file. There are two configurations: one for mainnet and one for sepolia testnet.

1. Open the `src/config/service.ts` file.
2. Update the `orgId` and `serviceId` values to match your desired SingularityNET service.
    ```typescript
    orgId: "your-organization-id",
    serviceId: "your-service-id"
    ```

### calculator Component

The `calculator/Testcalculator` component provides a user interface for interacting with your service on the `Mainnet/Sepolia` network. Below is a description of its main functions and how to use them.

#### UI Components

-   **Textarea**: The `Textarea` component is used to capture user input.
-   **ActionButton**: The `ActionButton` component is a custom button used to trigger the service call. It displays the cost of the service and shows a loading indicator when the user call process is in progress.
-   **DebugConsole**: The `DebugConsole` component is used to display debugging information when the application is in development mode. It is conditionally rendered based on the REACT_APP_ENV flag from the `.env`.

#### Functions

-   **newChat**: Adds a new chat message to the conversation, either from the user or the bot.\
    Usage example:
    ```typescript
    newChat('user', "This is a user's message.");
    newChat('bot', "This is a bot's response.");
    ```
-   **runService**: Sends a request to the text service with the user-provided text and handles the response. If the service returns a response successfully, it adds the response as a bot message in the chat.\
    Ensure you replace the service call and response handling in the `runService` function with the appropriate calls to your own service as defined in the protobuf files.

#### How to Use

1. **Entering Text**: In the text area provided, users can enter the text they wish to send to service. By default, there is a sample input text provided.
2. **Sending request**: After entering the text, users can click the `ActionButton` button. This will add the message to chat by `newChat` function and send the text to the service by `runService` function.
3. **Viewing Responses**: The responses from the service will be displayed in the chat area by `newChat` function. User messages will be distinguished from bot responses.

The component also displays the organization and service name configured in the `src/config/service.ts`.

### Generating JavaScript Files for Your Services

You will need to compile the `.proto` files from your service to JavaScript files and place them in the `src/calculator/assets` folder. After that, you can call functions from the generated js files in the service component, as it is done now in `calculator`

```typescript
    import { example } from "./assets/mainnet/summary_pb_service";
    ...
    await clientSDK.unary(example.TextSummary.summary, invokeOptions);
```

Apart from the steps mentioned at the official [documentation](https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/code-generation.md) to generate `js` stubs from `.proto` definitions, you also need to provide the namespace_prefix flag to the generator. Here is an example which illustrates the usage:

For Linux

```bash
protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
--js_out=import_style=commonjs,binary,namespace_prefix=\
[package name]_[org id]_[service]:. --ts_out=service=grpc-web:. \
[proto file name].proto
```

For Windows CMD

```bash
protoc ^
--plugin=protoc-gen-ts=%cd%/node_modules/.bin/protoc-gen-ts.cmd ^ --js_out=import_style=commonjs,binary,namespace_prefix=^
[package name]_[org id]_[service]:. --ts_out=service=grpc-web:. ^
[proto file name].proto
```