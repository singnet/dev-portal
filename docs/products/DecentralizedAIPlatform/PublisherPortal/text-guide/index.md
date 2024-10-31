# Onboarding on Publisher

## How to register on Publisher?

1. Go to the page [here](https://publisher.singularitynet.io/)
2. Select type of company: Organization, Individual or Accept Invitation
![Registration](/assets/images/products/AIMarketplace/publisher/RegistrationOfOrganization.webp)
3. Org ID: Identification for your company. You can choose every available id. this data will be used by users when accessing via the CLI
4. Organization name: Consumers will see it
5. DUNS Number: Optional field. You can skip it if you don't have this number.
6. Website URL: Optional field. Your organization’s website must be publicly available and the domain name must be associated with your organization.
7. Phone number: Optional field. Your company’s number including your country code.
8. Registered Address: Optional field. Your organization’s registered address
9. Mailing Address: Optional field. Your organization’s mailing address. By default, it is the same as the registration address
![Description](/assets/images/products/AIMarketplace/publisher/DescriptionOfOrganization.webp)
10. Short description: Preview description of your company. Max 160 characters.
11. Long description: Expanded description of your company. Max 5000 characters.
12. Organization Profile Image. Every organization have a profile image. This profile picture will be visible to consumers
13. Support email: This email needs to AI Marketplace users to contact you about questions and other.
14. Support Number: Optional field. Contact number for customers.
![Payment Address](/assets/images/products/AIMarketplace/publisher/PaymentAddress.webp)
15. Payment address: The Ethereum address to which all payments will be processed for this group. The address of the etcd you have deployed should be here. It doesn’t matter if it’s public or local, the main thing is that the daemon can reach etcd through it.
16. ETCD Endpoint: all the ETCD endpoints that will be used. Details [here](/docs/products/DecentralizedAIPlatform/UsedTechnologies/etcd/)
![Publishing Organization to Blockchain](/assets/images/products/AIMarketplace/publisher/PublishOrganizationToBlockchain.webp)
17. Connect MetaMask: This is necessary to confirm your account ownership this address will be used to confirm any changes associated with this organization. you must have an active metamask extension and give it access to this site.
<img src="/assets/images/products/AIMarketplace/publisher/MetamaskConfirmation.webp" style="width:40%">

## How to create a service?

![Creating New Service](/assets/images/products/AIMarketplace/publisher/CreatingNewService.webp)
1. AI Service Name: max 50 char
2. Service ID: Identification for your service. You can choose every available id. This data will be used by users when accessing via the CLI
3. Short description: Preview description of your service. Max 160 characters.
4. Long description: Expanded description of your company. Max 5000 characters.
![Service Profile Information](/assets/images/products/AIMarketplace/publisher/AIServiceProfileInformation.webp)
5. Tags: The tags will be shown on the page od your service on the marketplace, as well as help users find your service by keywords. You can add up to 20 tags
6. Project URL: Your service’s website must be publicly available and the domain name must be associated with your organization
7. Contributors
8. AI Service Profile Image: This picture will be visible to consumers on marketplace page
![Tags](/assets/images/products/AIMarketplace/publisher/ServiceTags.webp)
9. Enable Demo: If your service should be available only through the CLI/SDK, then set the Enable Demo flag to off.
10. Upload Demo Files: If your service should be available on the marketplace, then upload files for your interface.
11. AI Service price: the price of one service request.
12. Demo Free Calls: number of free demo calls to your service
13. Daemon endpoint: Daemon endpoint is the public address where you plan to host the daemon. Must start with http/https.
14. Daemon Addresses: The Ethereum public address
![Price](/assets/images/products/AIMarketplace/publisher/PublishOrganizationToBlockchain.webp)
How to get: Open PyCharm and run a program that will generate an address and a private key:
```py
from eth_account import Account
accut = Account.create()
print(‘Your address: ’ + accut.address)
print(‘Your private key: ’ + accut.key.hex())
```
15. Type of your service: You need to choose the appropriate type of service
16. Upload the Proto files: .zip file that contains proto files of your AI service
![Proto](/assets/images/products/AIMarketplace/publisher/UploadingTheProtoFiles.webp)
17. Waiting...
18. Launch AI Service: Confirm in MetaMask
<img src="/assets/images/products/AIMarketplace/publisher/MetamaskConfirmation.webp" style="width:40%">

## How to create&start Daemon (billing & service setup)

### It requires some preparation:
1. Create an [Infura](https://www.infura.io/) account that will be used by your daemon to interact with the blockchain and generate API key
![Infura HomePage](/assets/images/products/AIMarketplace/publisher/InfuraHomePage.webp)
2. After visiting the Infura homepage, you will already have one generated API key, you can copy it
![Infura Key](/assets/images/products/AIMarketplace/publisher/InfuraKey.webp)
3. The address of your generated key must be specified in the daemon config. It will be used to validate daemon calls on the blockchain network
After downloading the service and publishing it (PUBLISHED status), you can complete the daemon config

1. Passthrough_endpoint is the endpoint on which your service is located, to which the daemon will send user requests.
2. Pvt_key_for_metering – key that we generate in Infura
![Daemon Config](/assets/images/products/AIMarketplace/publisher/CreatingDaemonConfig.webp)
3. Copy config or download a JSON file

The JSON file will look something like this
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
  "log": {"level": "debug", "output": {"type": "stdout"}}
}
```
### Now we will install the daemon and run it with the downloaded config
1. Download daemon config according to your system
![Download Daemon](/assets/images/products/AIMarketplace/publisher/DownloadDaemon.webp)

2. Change rules on Daemon file using ‘chmod’ util
```sh
chmod +x snetd-linux-amd64-v5.1.3
```
3. Start screen util (If you haven't this util you need install it). It is necessary that the session with started demon does not end when you close terminal.
screen -S YourName
![Screen](/assets/images/products/AIMarketplace/publisher/ChmodAndScreenCommands.webp)
4. Start Daemon in this session
./snetd-linux-amd64-v5.1.3 -c snetd.config.json
![Config](/assets/images/products/AIMarketplace/publisher/ConfigPowershell  .webp)
5. Press Ctrl + A + D to disconnect from screen session
6. Check daemon:
```sh
curl localhost:62401/heartbeat
```
## Invite Workflow - Adding members to an Organization 
The platform provides a simple workflow to add new members, the owner just needs to add the email address of the member, the system sends invitation to the member based on accept invitation 
 and also ensures all the required details like (Wallet address) of the member are furnished when the invitation is accepted.
 ![Invite Members](/assets/images/products/AIMarketplace/publisher/Invite_Workflow.webp) 

 ## Claim easily from Publisher portal
Claims can now be availed using the publisher portal.
![Claim](/assets/images/products/AIMarketplace/publisher/WalletAccount.webp) 
