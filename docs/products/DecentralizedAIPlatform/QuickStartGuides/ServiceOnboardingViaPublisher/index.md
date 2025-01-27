# Service Onboarding via Publisher

## You can watch the video for easy understanding:

<iframe width="560" height="315" src="https://www.youtube.com/embed/8AtkPUYLy8g?si=cEpyujqdisaS35Xg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## How to register on Publisher?

1. Go to the page [here](https://publisher.singularitynet.io/)
2. Select type of company: Organization, Individual or Accept Invitation

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/RegistrationOfOrganization.webp" alt="TRegistration"/>

3. Org ID: Identification for your company. You can choose every available id. this data will be used by users when accessing via the CLI
4. Organization name: Consumers will see it
5. DUNS Number: Optional field. You can skip it if you don't have this number.
6. Website URL: Optional field. Your organization’s website must be publicly available and the domain name must be associated with your organization.
7. Phone number: Optional field. Your company’s number including your country code.
8. Registered Address: Optional field. Your organization’s registered address
9. Mailing Address: Optional field. Your organization’s mailing address. By default, it is the same as the registration address
   <ImageViewer src="/assets/images/products/AIMarketplace/publisher/DescriptionOfOrganization.webp" alt="Description"/>
10. Short description: Preview description of your company. Max 160 characters.
11. Long description: Expanded description of your company. Max 5000 characters.
12. Organization Profile Image. Every organization have a profile image. This profile picture will be visible to consumers
13. Support email: This email needs to AI Marketplace users to contact you about questions and other.
14. Support Number: Optional field. Contact number for customers.
    <ImageViewer src="/assets/images/products/AIMarketplace/publisher/PaymentAddress.webp" alt="Payment"/>
15. Payment address: The Ethereum address to which all payments will be processed for this group. The address of the etcd you have deployed should be here. It doesn’t matter if it’s public or local, the main thing is that the daemon can reach etcd through it.
16. ETCD Endpoint: all the ETCD endpoints that will be used. Details [here](/docs/products/DecentralizedAIPlatform/UsedTechnologies/etcd/)

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/PublishOrganizationToBlockchain.webp" alt="Publishing Organization to Blockchain"/>
17. Connect MetaMask: This is necessary to confirm your account ownership this address will be used to confirm any changes associated with this organization. you must have an active metamask extension and give it access to this site.
<ImageViewer src="/assets/images/products/AIMarketplace/publisher/MetamaskConfirmation.webp" alt="Publishing Organization to Blockchain"/>

## How to create a service?

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/CreatingNewService.webp" alt="Creating New Service"/>
1. AI Service Name: max 50 char
2. Service ID: Identification for your service. You can choose every available id. This data will be used by users when accessing via the CLI
3. Short description: Preview description of your service. Max 160 characters.
4. Long description: Expanded description of your company. Max 5000 characters.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/AIServiceProfileInformation.webp" alt="Publishing Organization to Blockchain"/>
5. Tags: The tags will be shown on the page od your service on the marketplace, as well as help users find your service by keywords. You can add up to 20 tags
6. Project URL: Your service’s website must be publicly available and the domain name must be associated with your organization
7. Contributors
8. AI Service Profile Image: This picture will be visible to consumers on marketplace page

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/ServiceTags.webp" alt="Creating New Service"/>
9. Enable Demo: If your service should be available only through the CLI/SDK, then set the Enable Demo flag to off.
10. Upload Demo Files: If your service should be available on the marketplace, then upload files for your interface.
11. AI Service price: the price of one service request.
12. Demo Free Calls: number of free demo calls to your service
13. Daemon endpoint: Daemon endpoint is the public address where you plan to host the daemon. Must start with http/https.
14. Daemon Addresses: The Ethereum public address
<ImageViewer src="/assets/images/products/AIMarketplace/publisher/PublishOrganizationToBlockchain.webp" alt="Price"/>
How to get: Open PyCharm and run a program that will generate an address and a private key:
```py
from eth_account import Account
accut = Account.create()
print(‘Your address: ’ + accut.address)
print(‘Your private key: ’ + accut.key.hex())
```
15. Type of your service: You need to choose the appropriate type of service
16. Upload the Proto files: .zip file that contains proto files of your AI service
<ImageViewer src="/assets/images/products/AIMarketplace/publisher/UploadingTheProtoFiles.webp" alt="Proto"/>
17. Waiting...
18. Launch AI Service: Confirm in MetaMask
<ImageViewer src="/assets/images/products/AIMarketplace/publisher/MetamaskConfirmation.webp" alt="Proto"/>

Here’s the complete documentation with the example configuration added at the end:


## How to Create & Start Daemon (Billing & Service Setup)

### Preparation Steps:

1. **Generate an API Key in Alchemy**  
   Follow the [Alchemy API Key Setup Guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/) to create and obtain your API key. This key will be used by your daemon to interact with the Ethereum blockchain.

   After obtaining the API key, you will need to add the following fields to your daemon configuration:

   - **For Mainnet:**  
     ```json
     "ethereum_json_rpc_http_endpoint": "http://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
     "ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>"
     ```

   - **For Testnet (Sepolia):**  
     ```json
     "ethereum_json_rpc_http_endpoint": "http://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
     "ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>"
     ```

   Replace `<YOUR_API_KEY>` with the API key you copied from Alchemy.

2. **Specify the Private Key for Metering in the Daemon Config**  
   The `pvt_key_for_metering` field in the daemon configuration requires the **private key of an Ethereum wallet**.  

3. **Configure the Passthrough Endpoint**  
   The `passthrough_endpoint` is the endpoint where your service is hosted. The daemon will send user requests to this endpoint.

4. **Finalize the Daemon Config**  
   Copy config or download a JSON file
<ImageViewer src="/assets/images/products/AIMarketplace/publisher/CreatingDaemonConfig.webp" alt="DaemonConfig"/>


---

### Example Daemon Configuration

Here’s an example of a complete daemon configuration file:

```json
{
    "blockchain_enabled": true,
    "blockchain_network_selected": "sepolia",
    "daemon_end_point": "0.0.0.0:62401",
    "daemon_group_name": "default_group",
    "ipfs_end_point": "http://ipfs.singularitynet.io:80",
    "organization_id": "Naint1",
    "service_id": "ServNaint7",
    "passthrough_enabled": true,
    "passthrough_endpoint": "http://127.0.0.1:7004",
    "payment_channel_cert_path": "/home/nlp/certs/cfssl/client.pem",
    "payment_channel_ca_path": "/home/nlp/certs/cfssl/ca.pem",
    "payment_channel_key_path": "/home/nlp/certs/cfssl/client-key.pem",
    "ssl_cert": "/home/nlp/certs/domain/fullchain.pem",
    "ssl_key": "/home/nlp/certs/domain/privkey.pem",
    "payment_channel_storage_type": "etcd",
    "pvt_key_for_metering": "<YOUR_PRIVATE_KEY>",
    "ethereum_json_rpc_http_endpoint": "http://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
    "ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
    "log": { "level": "debug", "output": { "type": "stdout" } }
}
```

### Fields to Replace:
- `<YOUR_PRIVATE_KEY>`: Replace with your Ethereum wallet’s private key.
- `<YOUR_API_KEY>`: Replace with your Alchemy API key.

### Now we will install the daemon and run it with the downloaded config

1. Download daemon config according to your system
   <ImageViewer src="/assets/images/products/AIMarketplace/publisher/DownloadDaemon.webp" alt="Download Daemon"/>

2. Change rules on Daemon file using ‘chmod’ util

```sh
chmod +x snetd-linux-amd64-v5.1.3
```

3. Start screen util (If you haven't this util you need install it). It is necessary that the session with started demon does not end when you close terminal.
   screen -S YourName
   <ImageViewer src="/assets/images/products/AIMarketplace/publisher/ChmodAndScreenCommands.webp" alt="Screen"/>
4. Start Daemon in this session
   ./snetd-linux-amd64-v5.1.3 -c snetd.config.json
   <ImageViewer src="/assets/images/products/AIMarketplace/publisher/ConfigPowershell.webp" alt=" Config"/>
5. Press Ctrl + A + D to disconnect from screen session
6. Check daemon:

```sh
curl localhost:62401/heartbeat
```
