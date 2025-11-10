# Generating Stubs for JS

## Step 1. Install Protocol Buffers Compiler

### For Windows:

1. Download the latest version of `protoc` for Windows from the official Google Protocol Buffers repository: [https://github.com/protocolbuffers/protobuf/releases](https://github.com/protocolbuffers/protobuf/releases).
   
2. Select the `protoc-<version>-win64.zip` file for the 64-bit Windows version and extract it to a convenient location (e.g., `C:\protoc`).

3. Add the `bin` folder from the extracted archive to the `PATH` environment variable so that `protoc` can be called from any directory:

```powershell
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\protoc\bin", [System.EnvironmentVariableTarget]::Machine)
```

4. Verify the `protoc` installation by running the command:

```powershell
protoc --version
```

If installed correctly, the `protoc` version will be displayed.

### For Linux:

To install `protoc` on Linux, please follow the instructions provided on the official gRPC documentation site: [https://grpc.io/docs/protoc-installation/](https://grpc.io/docs/protoc-installation/).
This guide includes steps for various distributions and provides the latest installation instructions.

## Step 2. Install Required npm Packages

Install the necessary packages for generating TypeScript stubs:

```sh
npm install ts-protoc-gen google-protobuf @types/google-protobuf grpc-web
```

## Step 3. Download `.proto` file for a Service

Download `.proto` file for a Service, using the following CLI command:

```sh
snet service get-api-registry <org_id> <SERVICE_ID> <PROTO_DIR>
```

For more details, please check the [CLI](/docs/products/DecentralizedAIPlatform/CLI/) or 
[CLI Manual](/docs/products/DecentralizedAIPlatform/CLI/Manual/)

## Step 4. Generate stub files for JavaScript/TypeScript

Navigate to the directory where the `.proto` file is located, and run the following commands to generate the necessary stub files:

1. Navigate to the directory with the `.proto` file:

```sh
cd <PATH_TO_PROTO_DIR>
```

2. Generate JavaScript and TypeScript stub files:

### For Linux:

```sh
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary,namespace_prefix=\
[package name]_[org id]_[service]:. --ts_out=service=grpc-web:. \
  [proto file name].proto
```

### For Windows (CMD):

```cmd
protoc ^
  --plugin=protoc-gen-ts=%cd%/node_modules/.bin/protoc-gen-ts.cmd ^
  --js_out=import_style=commonjs,binary,namespace_prefix=^
[package name]_[org id]_[service]:. --ts_out=service=grpc-web:. ^
  [proto file name].proto
```

**Placeholder Explanation:**
- `[package name]` - The package name defined in your .proto file
- `[org id]` - Your organization ID on the SingularityNET platform
- `[service]` - Your service name
- `[proto file name]` - The name of your .proto file

**Example:**

For a service with:
- Package name: `example_service`
- Organization ID: `test`
- Service name: `Calculator`
- Proto file: `example.proto`

### Linux:
```sh
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary,namespace_prefix=\
example_service_test_Calculator:. --ts_out=service=grpc-web:. \
  example.proto
```

### Windows (CMD):
```cmd
protoc ^
  --plugin=protoc-gen-ts=%cd%/node_modules/.bin/protoc-gen-ts.cmd ^
  --js_out=import_style=commonjs,binary,namespace_prefix=^
example_service_test_Calculator:. --ts_out=service=grpc-web:. ^
  example.proto
```

These commands will create JavaScript and TypeScript stub files required for the service.
