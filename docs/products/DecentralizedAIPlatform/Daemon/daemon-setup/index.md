# Setup and Run Daemon

## Get the Latest Binary

Download the latest Daemon [from the official GitHub releases page](https://github.com/singnet/snet-daemon/releases/latest) or use the terminal.

Select the file on the GitHub page for your operating system and architecture and download it. Or copy the link to the desired file and change it in the examples below:

:::code-group

```sh [Linux]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/v5.2/snetd-linux-amd64-v5.2
```

```powershell [Windows Powershell/Cmd]
curl -O -L https://github.com/singnet/snet-daemon/releases/download/v5.2/snetd-windows-amd64-v5.2.exe
```

```sh [MacOS ARM]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/v5.2/snetd-darwin-arm64-v5.2
```

```sh [MacOS Intel]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/v5.2/snetd-darwin-amd64-v5.2
```

:::

If you are using a Unix-based system (for example, Linux or Mac OS), you need to give the file executable permissions:
:::code-group

```sh [Linux]
chmod +x ./snetd-darwin-amd64-v5.2
```

```sh [MacOS ARM]
chmod +x ./snetd-darwin-arm64-v5.2
```

```sh [MacOS Intel]
chmod +x ./snetd-darwin-amd64-v5.2
```

:::

## Configuration 

The daemon needs to be configured to work with the corresponding AI service.

You can create a simple template configuration by running:
:::code-group

```sh [Linux]
./snetd-linux-amd64-v5.2 init
```

```powershell [Windows Powershell/Cmd]
.\snetd-windows-amd64-v5.2.exe init
```

```sh [MacOS ARM]
./snetd-darwin-arm64-v5.2 init
```

```sh [MacOS Intel]
./snetd-darwin-amd64-v5.2 init
```

:::

The `init` command will create a `snetd.config.json` file. You will need to modify and add some parameters to this file:

### Example Configuration for Mainnet
```json
{
  "blockchain_enabled": true,
  "blockchain_network_selected": "main",
  "daemon_endpoint": "0.0.0.0:<DAEMON_PORT>",
  "daemon_group_name": "<DAEMON_GROUP>",
  "ipfs_endpoint": "http://ipfs.singularitynet.io:80",
  "organization_id": "<ORGANIZATION_ID>",
  "service_id": "<SERVICE_ID>",
  "service_endpoint": "http://<SERVICE_HOST>:<SERVICE_PORT>",
  "ethereum_json_rpc_http_endpoint": "http://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
  "ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
  "log": {"level": "debug", "output": {"type": "stdout"}}
}
```

### Example Configuration for Testnet (Sepolia)
```json
{
  "blockchain_enabled": true,
  "blockchain_network_selected": "sepolia",
  "daemon_endpoint": "0.0.0.0:<DAEMON_PORT>",
  "daemon_group_name": "<DAEMON_GROUP>",
  "ipfs_endpoint": "http://ipfs.singularitynet.io:80",
  "organization_id": "<ORGANIZATION_ID>",
  "service_id": "<SERVICE_ID>",
  "service_endpoint": "http://<SERVICE_HOST>:<SERVICE_PORT>",
  "payment_channel_cert_path": "<PATH_TO_ETCD_CERTS>/client.pem",
  "payment_channel_ca_path": "<PATH_TO_ETCD_CERTS>/ca.pem",
  "payment_channel_key_path": "<PATH_TO_ETCD_CERTS>/client-key.pem",
  "ssl_cert": "<PATH_TO_DOMAIN_CERTS>/fullchain.pem",
  "ssl_key": "<PATH_TO_DOMAIN_CERTS>/privkey.pem",
  "metering_enabled": true,
  "metering_endpoint": "https://marketplace-mt-v2.singularitynet.io",
  "pvt_key_for_metering": "<METERING_KEY>",
  "ethereum_json_rpc_http_endpoint": "http://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
  "ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
  "log": {"level": "debug", "output": {"type": "stdout"}}
}
```

### Config Parameters

- **blockchain_network_selected**:  
  Set to `"main"` for Mainnet or `"sepolia"` for Testnet.
  ```json
  "blockchain_network_selected": "main",
  ```

- **organization_id**:  
  The ID of the organization (as set up on the SingularityNET platform) that this daemon belongs to.
  ```json
  "organization_id": "snet",
  ```

- **service_id**:  
  The ID of the service (as set up on the SingularityNET platform) that this daemon proxies requests for.
  ```json
  "service_id": "example-service",
  ```

- **ethereum_json_rpc_http_endpoint and ethereum_json_rpc_ws_endpoint**:  
  The daemon requires HTTP and WebSocket (WS) endpoints to interact with the Ethereum blockchain. These endpoints are provided by Alchemy.  
  - For **Mainnet**:  
    ```json
    "ethereum_json_rpc_http_endpoint": "http://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
    "ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>"
    ```  
  - For **Testnet (Sepolia)**:  
    ```json
    "ethereum_json_rpc_http_endpoint": "http://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
    "ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>"
    ```  
  Replace `<YOUR_API_KEY>` with your Alchemy API key. If you don’t have one, follow the [Alchemy API Key Setup Guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/).


- **ssl_cert and ssl_key**:  
  If you are using your own certificates (or from Let's Encrypt as described [here](/docs/products/DecentralizedAIPlatform/Daemon/daemon-ssl-setup/)), add these entries to the daemon config:
  ```json
  "ssl_cert": "/etc/letsencrypt/live/<daemon_domain>/fullchain.pem",
  "ssl_key": "/etc/letsencrypt/live/<daemon_domain>/privkey.pem",
  ```

- **service_endpoint**:  
  The AI service endpoint to which the daemon will proxy all requests.
  ```json
  "service_endpoint": "http://localhost:3000",
  ```

- **daemon_endpoint**:  
  The endpoint on which the daemon listens for requests. This should be in the `<host>:<port>` format and publicly accessible.
  ```json
  "daemon_endpoint": "0.0.0.0:7002",
  ```

- **daemon_group_name**:  
  The group the daemon belongs to. This helps determine the recipient address for payments.
  ```json
  "daemon_group_name": "default_group",
  ```

- **Etcd certs**:  
  If the client endpoint is HTTPS, add the following to use the certificates for the connection:
  ```json
  "payment_channel_cert_path": "client.pem",
  "payment_channel_ca_path": "ca.pem",
  "payment_channel_key_path": "client-key.pem"
  ```

- **free_calls_users**:  
  You can set a separate number of allowed free calls for certain users of the marketplace:
  ```json
  "free_calls_users": {
    "test@mail.com": 500,
    "snet@test.com": 100,
    "me@email.com": 150
  }
  ```

For a detailed list of configurations, check the [configuration page](https://github.com/singnet/snet-daemon#configuration) with all available options.

## Start Daemon

:::code-group

```sh [Linux]
./snetd-linux-amd64-v5.2 --config <config_file_name>
```

```powershell [Windows Powershell/Cmd]
.\snetd-windows-amd64-v5.2.exe --config <config_file_name>
```

```sh [MacOS ARM]
./snetd-darwin-arm64-v5.2 --config <config_file_name>
```

```sh [MacOS Intel]
./snetd-darwin-amd64-v5.2 --config <config_file_name>
```

:::
