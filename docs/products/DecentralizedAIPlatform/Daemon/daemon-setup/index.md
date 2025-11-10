# Setup and Run Daemon

## Get the Latest Binary

Download the latest Daemon [from the official GitHub releases page](https://github.com/singnet/snet-daemon/releases/latest) or use the terminal.

Select the file on the GitHub page for your operating system and architecture and download it. Or copy the link to the desired file and change it in the examples below:

:::code-group

```sh-vue [Linux]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/{{ $daemonVersion }}/snetd-linux-amd64-{{ $daemonVersion }}
```

```powershell-vue [Windows Powershell/Cmd]
curl -O -L https://github.com/singnet/snet-daemon/releases/download/{{ $daemonVersion }}/snetd-windows-amd64-{{ $daemonVersion }}.exe
```

```sh-vue [MacOS ARM]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/{{ $daemonVersion }}/snetd-darwin-arm64-{{ $daemonVersion }}
```

```sh-vue [MacOS Intel]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/{{ $daemonVersion }}/snetd-darwin-amd64-{{ $daemonVersion }}
```

:::

If you are using a Unix-based system (for example, Linux or Mac OS), you need to give the file executable permissions:
:::code-group

```sh-vue [Linux]
chmod +x ./snetd-darwin-amd64-{{ $daemonVersion }}
```

```sh-vue [MacOS ARM]
chmod +x ./snetd-darwin-arm64-{{ $daemonVersion }}
```

```sh-vue [MacOS Intel]
chmod +x ./snetd-darwin-amd64-{{ $daemonVersion }}
```

:::

## Configuration 

The daemon needs to be configured to work with the corresponding AI service.

You can create a simple template configuration by running:
:::code-group

```sh-vue [Linux]
./snetd-linux-amd64-{{ $daemonVersion }} init
```

```powershell-vue [Windows Powershell/Cmd]
.\snetd-windows-amd64-{{ $daemonVersion }} init
```

```sh-vue [MacOS ARM]
./snetd-darwin-arm64-{{ $daemonVersion }} init
```

```sh-vue [MacOS Intel]
./snetd-darwin-amd64-{{ $daemonVersion }} init
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
  "ipfs_endpoint": "https://ipfs.singularitynet.io:443",
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
  "ipfs_endpoint": "https://ipfs.singularitynet.io:443",
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
  "private_key_for_metering": "<METERING_KEY>",
  "private_key_for_free_calls": "<FREE_CALL_KEY>",
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

- **free_calls_per_address**:  
  You can set a separate number of allowed free calls for certain addresses (not for web2 approach).

  ```json
  "free_calls_per_address": {
    "0x03607652d3ee4dad68ecea78f266906b421508d5": 500,
    "0x0709e9B78756B740ab0C64427f43f8305fD6D1A7": 100
  }
  ```

For a detailed list of configurations, check the [configuration page](https://github.com/singnet/snet-daemon#configuration) with all available options.

---

## Switching from Testnet (Sepolia) to Mainnet

If you initially deployed your service on the Sepolia testnet and want to migrate to Mainnet, you need to update several key parameters in your daemon configuration.

### Critical Configuration Changes

**1. Network Selection**

Change the blockchain network from Sepolia to Mainnet:

```json
// Before (Sepolia):
"blockchain_network_selected": "sepolia"

// After (Mainnet):
"blockchain_network_selected": "main"
```

---

**2. Ethereum RPC Endpoints**

Update both HTTP and WebSocket endpoints to point to Mainnet:

**Before (Sepolia):**
```json
"ethereum_json_rpc_http_endpoint": "http://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
"ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>"
```

**After (Mainnet):**
```json
"ethereum_json_rpc_http_endpoint": "http://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
"ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>"
```

---

**3. Organization and Service IDs**

**Important:** Organizations and services published on Sepolia testnet do NOT automatically exist on Mainnet. You must:

1. **Republish your organization** on Mainnet using CLI or Publisher Portal
2. **Republish your service** on Mainnet
3. **Update daemon configuration** with new Mainnet IDs:

```json
"organization_id": "<YOUR_MAINNET_ORG_ID>",
"service_id": "<YOUR_MAINNET_SERVICE_ID>"
```

> ⚠️ **Note:** Even if you use the same organization and service names, the IDs will be different on Mainnet.

---

### Parameters That DO NOT Change

The following configuration parameters typically remain the same when switching networks:

```json
{
  "daemon_endpoint": "0.0.0.0:<DAEMON_PORT>",
  "daemon_group_name": "<DAEMON_GROUP>",
  "service_endpoint": "http://<SERVICE_HOST>:<SERVICE_PORT>",
  "ssl_cert": "<PATH_TO_DOMAIN_CERTS>/fullchain.pem",
  "ssl_key": "<PATH_TO_DOMAIN_CERTS>/privkey.pem",
  "metering_enabled": true,
  "metering_endpoint": "https://marketplace-mt-v2.singularitynet.io",
  "private_key_for_metering": "<METERING_KEY>",
  "private_key_for_free_calls": "<FREE_CALL_KEY>",
  "payment_channel_storage_server": {
    // embedded ETCD configuration remains the same
  }
}
```

---

### Complete Configuration Comparison

**Testnet (Sepolia) Configuration:**
```json
{
  "blockchain_network_selected": "sepolia",
  "ethereum_json_rpc_http_endpoint": "http://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
  "ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
  "organization_id": "<TESTNET_ORG_ID>",
  "service_id": "<TESTNET_SERVICE_ID>"
}
```

**Mainnet Configuration:**
```json
{
  "blockchain_network_selected": "main",
  "ethereum_json_rpc_http_endpoint": "http://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
  "ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
  "organization_id": "<MAINNET_ORG_ID>",
  "service_id": "<MAINNET_SERVICE_ID>"
}
```

---

### Migration Checklist

Before switching to Mainnet, complete these steps:

**Prerequisites:**
- [ ] Sufficient ETH in your Mainnet wallet for gas fees (for publishing transactions)
- [ ] Valid Alchemy API key that works with Mainnet endpoints
- [ ] Backup of your Testnet configuration (for reference)

**Publishing on Mainnet:**
- [ ] Publish your organization on Mainnet (using CLI/Publisher Portal)
- [ ] Publish your service on Mainnet
- [ ] Note the new Mainnet organization_id and service_id

**Configuration Updates:**
- [ ] Update `blockchain_network_selected` to `"main"`
- [ ] Update `ethereum_json_rpc_http_endpoint` to Mainnet URL
- [ ] Update `ethereum_json_rpc_ws_endpoint` to Mainnet URL  
- [ ] Update `organization_id` to Mainnet organization ID
- [ ] Update `service_id` to Mainnet service ID

**Final Steps:**
- [ ] Save the updated configuration file
- [ ] Restart the daemon with the updated configuration
- [ ] Verify daemon connects to Mainnet (check logs)
- [ ] Test service call to ensure everything works

---

### Additional Considerations

**ETCD Data:**
- If using embedded ETCD, you may want to start with a fresh `data.etcd` directory
- Consider backing up your Testnet ETCD data before switching
- Testnet payment channels will not be valid on Mainnet

**Wallet and Tokens:**
- Testnet ETH and tokens (Sepolia ETH/AGIX) cannot be used on Mainnet
- Ensure your wallet has sufficient Mainnet ETH for gas fees
- Update any payment addresses if they differ between networks

**Verification:**

After restarting the daemon with Mainnet configuration, verify the connection:

```bash
# Check daemon startup logs
# Look for successful connection messages to Mainnet
# Example log output:
# INFO: Connected to Ethereum Mainnet
# INFO: Organization: <YOUR_MAINNET_ORG_ID>
# INFO: Service: <YOUR_MAINNET_SERVICE_ID>
```

## Start Daemon

:::code-group

```sh-vue [Linux]
./snetd-linux-amd64-{{ $daemonVersion }} --config <config_file_name>
```

```powershell-vue [Windows Powershell/Cmd]
.\snetd-windows-amd64-{{ $daemonVersion }}.exe --config <config_file_name>
```

```sh-vue [MacOS ARM]
./snetd-darwin-arm64-{{ $daemonVersion }} --config <config_file_name>
```

```sh-vue [MacOS Intel]
./snetd-darwin-amd64-{{ $daemonVersion }} --config <config_file_name>
```

:::
