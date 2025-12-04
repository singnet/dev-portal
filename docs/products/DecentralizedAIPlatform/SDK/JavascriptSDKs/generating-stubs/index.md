# Generating Stubs for JS

This guide explains how to generate JavaScript stub files from `.proto` definitions. These stubs are required for building custom UIs in the [AI-UI Constructor](https://ai-ui-constructor.singularitynet.io/).

## Step 1. Install Protocol Buffers Compiler

### For Windows

1. Download the latest version of `protoc` for Windows from the official Google Protocol Buffers repository: [https://github.com/protocolbuffers/protobuf/releases](https://github.com/protocolbuffers/protobuf/releases).

2. Select the `protoc-<version>-win64.zip` file for the 64-bit Windows version and extract it to a convenient location (e.g., `C:\protoc`).

3. Add the `bin` folder from the extracted archive to the `PATH` environment variable:

```powershell
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\protoc\bin", [System.EnvironmentVariableTarget]::Machine)
```

4. Verify the installation:

```powershell
protoc --version
```

### For Linux

Follow the instructions on the official gRPC documentation: [https://grpc.io/docs/protoc-installation/](https://grpc.io/docs/protoc-installation/).

## Step 2. Install Required NPM Packages

Install the necessary packages for stub generation:

```sh
npm install --save-dev ts-protoc-gen google-protobuf grpc-web
```

## Step 3. Download `.proto` File for a Service

Download the `.proto` file for your service using the CLI:

```sh
snet service get-api-registry <org_id> <service_id> <proto_dir>
```

For more details, see the [CLI Manual](/docs/products/DecentralizedAIPlatform/CLI/Manual/).

## Step 4. Generate Stub Files

Navigate to the directory containing your `.proto` file and run the following command:

```sh
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary,namespace_prefix=<package_name>_<org_id>_<service_id>:. \
  --ts_out=service=grpc-web:. \
  <proto_file>.proto
```

Replace the placeholders:

| Placeholder | Description |
|-------------|-------------|
| `<package_name>` | Package name from your `.proto` file |
| `<org_id>` | Your organization ID |
| `<service_id>` | Your service ID |
| `<proto_file>` | Name of your `.proto` file (without extension) |

### Example

For a service with:
- Package name: `calculator`
- Organization ID: `my_org`
- Service ID: `calc_service`
- Proto file: `calculator.proto`

```sh
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary,namespace_prefix=calculator_my_org_calc_service:. \
  --ts_out=service=grpc-web:. \
  calculator.proto
```

## Step 5. Use Generated Files

After running the command, you will have the following generated files:

- `<proto_file>_pb.js` - Protocol buffer message definitions
- `<proto_file>_pb_service.js` - Service client definitions

Upload these files to the [AI-UI Constructor](https://ai-ui-constructor.singularitynet.io/) along with your UI code.
