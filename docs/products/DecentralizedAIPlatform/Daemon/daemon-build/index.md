# Build daemon
## Prerequisites and dependencies

* [Go 1.22+](https://golang.org/dl/)
* [Protoc 25.0+](https://github.com/protocolbuffers/protobuf/releases)

Protoc (libprotoc), golang and $GOPATH/bin are recommended to be in environment variables.


## Installing

Clone the git repository

```bash
git clone git@github.com:singnet/snet-daemon.git
cd snet-daemon
```

**Install dependencies and generate bindings**
:::code-group

```bash [Bash]
./scripts/install_deps
```

```powershell [Windows (Powershell)]
./scripts/install_deps.ps1
```
:::

## Build snet-daemon

Please note using ldflags, the latest tagged version, sha1 revision and the build time are set as
part of the build. You need to pass the version as shown in the example below:

:::code-group

```bash [Bash]
./scripts/build <linux/windows/darwin> <amd64/arm/arm64> <version>
```

```powershell [Windows (Powershell)]
./scripts/build.ps1 <linux/windows/darwin> <amd64/arm/arm64> <version>
```
:::

Example: 
```bash
./scripts/build linux amd64 v5.1.6-custom
```
The final binaries will be in the `/build` folder.

If you are using a Unix-based system (for example, Linux or Mac OS), you need to give the rights to execute the file:
:::code-group

```sh [Linux]
chmod +x ./build/snetd-darwin-amd64-v5.1.6-custom
```

```sh [MacOS ARM]
chmod +x ./build/snetd-darwin-arm64-v5.1.6-custom
```

```sh [MacOS Intel]
chmod +x ./build/snetd-darwin-amd64-v5.1.6-custom
```
:::

## Multi-compiling

If you want to build daemon for several platforms, run `./scripts/build-all <version>` instead
of `./scripts/build`.

You can edit the script to choose the specific platforms, but by default it will build for Linux, Darwin (OSX), and
Windows.

## FAQ

### Daemon panic with `proto: file "record.proto" is already registered`

It is necessary to set an environment variable `GOLANG_PROTOBUF_REGISTRATION_CONFLICT=warn`

### Custom blockchain network or provider

Add custom network to `resources/blockchain_network_config.json` before ./scripts/build.

If you want to change the endpoints to your own, then you need to change the fields `ethereum_json_rpc_http_endpoint` and `ethereum_json_rpc_ws_endpoint`. 
For ethereum_json_rpc_ws_endpoint, the provider must support a connection via websockets.