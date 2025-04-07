# Build daemon
## Prerequisites and dependencies

* [Go 1.23+](https://golang.org/dl/)
* [Protoc 29+](https://github.com/protocolbuffers/protobuf/releases)

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
./scripts/powershell/install_deps.ps1
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
./scripts/powershell/build.ps1 <linux/windows/darwin> <amd64/arm/arm64> <version>
```
:::

Example: 
```bash-vue
./scripts/build linux amd64 {{ $daemonVersion }}-custom
```
The final binaries will be in the `/build` folder.

If you are using a Unix-based system (for example, Linux or Mac OS), you need to give the rights to execute the file:
:::code-group

```sh-vue [Linux]
chmod +x ./build/snetd-darwin-amd64-{{ $daemonVersion }}-custom
```

```sh-vue [MacOS ARM]
chmod +x ./build/snetd-darwin-arm64-{{ $daemonVersion }}-custom
```

```sh-vue [MacOS Intel]
chmod +x ./build/snetd-darwin-amd64-{{ $daemonVersion }}-custom
```
:::

## Multi-compiling

If you want to build daemon for several platforms, run `./scripts/build_all_platforms <version>` instead
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