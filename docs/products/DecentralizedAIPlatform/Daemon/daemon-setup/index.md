# Setup and run daemon

## Get the Latest Binary

Download the latest Daemon [from official github releases page](https://github.com/singnet/snet-daemon/releases/latest) or use terminal.

Select the file on the github page for your operating system and architecture and download it. Or copy the link to the desired file and change it in the examples below:

:::code-group

```sh [Linux]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/v5.1.5/snetd-linux-amd64-v5.1.5
```

```powershell [Windows Powershell/Cmd]
curl -O -L https://github.com/singnet/snet-daemon/releases/download/v5.1.5/snetd-windows-amd64-v5.1.5.exe
```

```sh [MacOS ARM]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/v5.1.5/snetd-darwin-arm64-v5.1.5
```

```sh [MacOS Intel]
curl -LJO https://github.com/singnet/snet-daemon/releases/download/v5.1.5/snetd-darwin-amd64-v5.1.5
```

:::

If you are using a Unix-based system (for example, Linux or Mac OS), you need to give the rights to execute the file:
:::code-group

```sh [Linux]
chmod +x ./snetd-darwin-amd64-v5.1.5
```

```sh [MacOS ARM]
chmod +x ./snetd-darwin-arm64-v5.1.5
```

```sh [MacOS Intel]
chmod +x ./snetd-darwin-amd64-v5.1.5
```

:::

## Configuration 

The daemon needs to be configured for it to work with the corresponding AI service.

You could create simple template config by: 
:::code-group

```sh [Linux]
./snetd-linux-amd64-v5.1.5 init
```

```powershell [Windows Powershell/Cmd]
.\snetd-windows-amd64-v5.1.5.exe init
```

```sh [MacOS ARM]
./snetd-darwin-arm64-v5.1.5 init
```

```sh [MacOS Intel]
./snetd-darwin-amd64-v5.1.5 init
```

:::

The init command will create a `snetd.config.json` in which you will need to change and add some parameters:

```json
{
        "blockchain_enabled": true,
        "blockchain_network_selected": "sepolia",
        "passthrough_endpoint":"YOUR_SERVICE_ENDPOINT",
        "service_id": "YOUR_SERVICE_ID",
        "organization_id": "YOUR_ORG_ID",
        "daemon_end_point": "127.0.0.1:8080",
        "daemon_group_name":"default_group",
        "passthrough_enabled": true,
        "payment_channel_storage_type": "etcd",
        "ipfs_end_point": "http://ipfs.singularitynet.io:80",
        "log": {
                "output": {
                        "type": ["file", "stdout"]
                }
        }  
}
```

### Config parameters

* **blockchain_network_selected**
  <br/>
  Should be `main` for production use or `sepolia` for testing.
   ```json
   "blockchain_network_selected": "main",
   ```

* **organization_id**
  <br/>
  ID of the organization (as set up on the SingularityNET platform) that this daemon belongs to.
   ```json
   "organization_id": "snet",
   ```   

* **service_id**
  <br/>
  ID of the service (as set up on the SingularityNET platform) that this daemon is proxys requests for. The daemon will fetch configuration from the SingularityNET platform based on the `organization_id` and `service_id`
   ```json
   "service_id": "example-service",
   ```   

* **ssl_cert and ssl_key**
  <br/>
  If you are using your own certificates (or from Let's Encrypt as described [here](/docs/products/DecentralizedAIPlatform/Daemon/daemon-ssl-setup/)) add the following two entries to the daemon config
   ```json
   "ssl_cert": "/etc/letsencrypt/live/<daemon_domain>/fullchain.pem",
   "ssl_key": "/etc/letsencrypt/live/<daemon_domain>/privkey.pem",
   ``` 

* **passthrough_endpoint**
  <br/>
  This is the AI service endpoint to which the daemon will proxy all requests.
   ```json
   "passthrough_endpoint": "http://localhost:3000",
   ``` 

* **daemon_end_point**
  <br/>
  This is the endpoint on which the daemon listens for requests and should be in the `<host>:<port>` format. This address should be publically accessible
   ```json
   "daemon_end_point": "0.0.0.0:7002",
   ```   

* **daemon_group_name**
This parameter defines the group the daemon belongs to. The group helps determine the recipient address for payments.
```json
"daemon_group_name":"default_group",
```

* **Etcd certs**
  <br/>
If the client endpoint is https, then you will need to add the following on your configuration to use
the certificates to connect:
```json
  "payment_channel_cert_path": "client.pem",
  "payment_channel_ca_path": "ca.pem",
  "payment_channel_key_path": "client-key.pem"
  ``` 


* **free_calls_users**
  <br/>
  You can set a separate number of allowed free calls for certain users of the marketplace
  ```json
  "free_calls_users": {
    "johndoe@gmail.com": 500,
    "snet@test.com": 100,
    "me@email.com": 150
  }
  ```

For a detailed list of configurations available, please check <a href="https://github.com/singnet/snet-daemon#configuration" target="_blank">configuration</a> page with all the available configurations.

## Start Daemon

:::code-group

```sh [Linux]
./snetd-linux-amd64-v5.1.5 --config <config_file_name>
```

```powershell [Windows Powershell/Cmd]
.\snetd-windows-amd64-v5.1.5.exe --config <config_file_name>
```

```sh [MacOS ARM]
./snetd-darwin-arm64-v5.1.5 --config <config_file_name>
```

```sh [MacOS Intel]
./snetd-darwin-amd64-v5.1.5 --config <config_file_name>
```

:::
