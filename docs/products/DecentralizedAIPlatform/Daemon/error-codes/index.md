# Daemon Errors  

The errors described here are most likely due to incorrect configuration of the daemon or service. Usually, they need to be corrected by the service provider.  

## Descriptions of Codes

## **Name: ServiceUnavailable**  
### 1  

**Purpose:**  
The daemon could not access the service at the specified address.  

**Solution:**  
Check the daemon configuration parameter `service_endpoint` and ensure your service is available at the specified endpoint.  

## **Name: InvalidMetadata**  
### 2  

**Purpose:**  
Invalid service or organization metadata in IPFS or Filecoin.  

**Solution:**  
Recheck and validate your service & organization metadata using the following CLI command:  

```sh
snet service validate-metadata --metadata-file service_metadata.json
```  

## **Name: InvalidProto**  
### 3  

**Purpose:**  
The proto file for HTTP services is incorrectly written, causing the daemon to fail in marshalling or unmarshalling proto messages.  

**Solution:**  
Fix the proto file and update it using CLI or the publisher.  

## **Name: HTTPRequestBuildError**  
### 4  

**Purpose:**  
Unable to create an HTTP request to the service.  

**Solution:**  
Verify the daemon configuration parameters `service_endpoint` and `service_credentials`.  

## **Name: InvalidServiceCredentials**  
### 5  

**Purpose:**  
Invalid service credentials parameter.  

**Solution:**  
Recheck the daemon configuration. Example of valid service credentials:  

```json
"service_credentials": [
  {
    "key": "X-Custom-Header",
    "value": "example-value",
    "location": "header"
  }
]
```  

## **Name: InvalidConfig**  
### 6  

**Purpose:**  
The configuration is invalid.  

**Solution:**  
Recheck your configuration or generate a new one:  

```sh-vue
snetd-linux-amd64-{{ $daemonVersion }} init
```  

## **Name: ReceiveMsgError**  
### 7  

**Purpose:**  
This error can occur for several reasons:  
- Internal bugs  
- Incorrect encoding in metadata  
- Network problems  

**Solution:**  
- If you are a customer, retry the request.  
- If you are the service creator, ensure the encoding in metadata is set to `proto` and verify that your service is available.  

## **Name: BlockchainProviderLimitsExceed**  
### 8  

**Purpose:**  
This error occurs when:  
1. You are using a public `ethereum_rpc_endpoint`.  
2. Your endpoint’s request limit has been exhausted.  

**Solution:**  
1. **Switch to your own Alchemy API key:**  
   - Obtain an Alchemy API key by following the instructions here:  
     [Alchemy API Key Guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/).  
2. Update your daemon configuration with the appropriate fields:  

   **For Mainnet:**  
   ```json
   "ethereum_json_rpc_http_endpoint": "http://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
   "ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>"
   ```  

   **For Testnet (Sepolia):**  
   ```json
   "ethereum_json_rpc_http_endpoint": "http://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
   "ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>"
   ```  

   Replace `<YOUR_API_KEY>` with the API key you obtained from Alchemy.  
