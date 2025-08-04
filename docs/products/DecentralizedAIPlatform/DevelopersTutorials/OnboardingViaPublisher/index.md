# Guide to Publishing an Organization and Service via Publisher

## You can watch the video for easy understanding:

<iframe width="560" height="315" src="https://www.youtube.com/embed/8AtkPUYLy8g?si=cEpyujqdisaS35Xg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## **Organization Setup**

Follow these simple steps to register your organization clearly and quickly on the SingularityNET Publisher Portal.

---

### **Step 1: Access the Publisher Portal**

To begin publishing your AI services, open the Publisher Portal:

* Go to [https://publisher.singularitynet.io](https://publisher.singularitynet.io) in your browser.

Once on the page, you have two main options to proceed:

* Click [**Get Started**](https://publisher.singularitynet.io/enroll) to begin the registration flow.

  > This button will take you directly to the account login and onboarding process.

* Alternatively, you can explore the [**How It Works**](https://publisher.singularitynet.io/howitworks) section at the top to learn more about the platform.

---

### **Step 2: Choose Organization Type**

Select the most appropriate option based on how you plan to publish services:

* **Organization** *(for teams, companies, or formal business entities)*

  > Recommended if your services are backed by a legal entity or team collaboration.

* **Individual** *(for solo developers or contributors)*

  > Choose this if you are publishing services personally, without affiliation to a registered company.

* **Accept Invitation** *(join an existing organization)*

  > Use this if you received an invitation to join a team that already exists in the Publisher Portal.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/OrganizationType.png" alt="Organization Type"/>

---

### **Step 3: Fill Organization Details**

Provide clear and accurate information:

* **Org ID** *(required)*  
  > Unique ID used by CLI/SDK users.

* **Organization Name** *(required)*  
  > Publicly visible name on the marketplace.

* **DUNS Number** *(optional)*  
  > Unique business identifier (skip if unavailable).

* **Website URL** *(required)*  
  > Official organization website.

* **Phone Number** *(required)*  
  > Contact number with country code.

* **Registered Address** *(optional)*  
  > Official business registration address.

* **Mailing Address** *(optional)*  
  > Default is the registered address if not provided.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/OrganizationDetails.png" alt="Organization Details"/>

---

### **Step 4: Add Descriptions & Visuals**

Make your organization stand out clearly to potential users:

* **Org ID** *(required)*  
  > Unique ID used by CLI/SDK users.

* **Short Description** *(required, max 160 chars)*  
  > Concise summary visible on the marketplace.

* **Long Description** *(required, max 5000 chars)*  
  > Detailed organization profile with objectives and services.

* **Website URL** *(required)*  
  > Official organization website.

* **Choose Storage Type** *(required)*
  > Select where your service assets (e.g., icons, metadata) will be stored:
  >
  > * **IPFS** – Use standard decentralized IPFS storage.
  > * **Filecoin** – Store files via Lighthouse on the Filecoin network. Requires a **Lighthouse API Key** for uploading.

* **Lighthouse API Key** *(only for Filecoin)*
  > Needed to upload files via Lighthouse. Generate it from your [Lighthouse dashboard](https://www.lighthouse.storage/) after signing up.

* **Organization Profile Image** *(required)*  
  > Visual identity for your organization on the marketplace.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/OrganizationProfile.png" alt="Organization Profile"/>

---

### **Step 5: Set Up Support Information**

Provide users easy ways to contact you:

* **Support Email** *(required)*  
  > For user inquiries and assistance.

* **Support Number** *(optional)*  
  > Additional phone contact for support.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/OrganizationSupport.png" alt="Organization Support"/>

---

### **Step 6: Configure Payment & ETCD**

Critical settings for secure operations:

* **Payment Address** *(required)*  
  Ethereum address to receive ASI (FET) tokens.
  > 📌 Ensure secure access to this address.

* **ETCD Endpoint** *(required)*  
  Default internal ETCD endpoint:

  ```URL
  http://127.0.0.1:2379
  ```
  
  > 📌 Public setups require accessible ETCD endpoint  
  (e.g., `http://etcd.yourdomain.com:2379`).  
  More info [here](/docs/products/DecentralizedAIPlatform/Daemon/daemon-etcd-setup/).

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/PaymentAddress.webp" alt="Payment Details"/>

---

### **Step 7: Confirm and Publish**

Finalize your organization's blockchain registration:

* Click **Connect MetaMask** and confirm ownership of your Ethereum wallet address to complete the registration process.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/PublishOrganizationToBlockchain.webp" alt="Publishing to Blockchain"/>

* Sign the publishing transaction via MetaMask to register your organization on the blockchain.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/MetamaskConfirmation.webp" alt="MetaMask Confirmation"/>

### ✨ **Your organization is now successfully registered!**

## **Service Setup**

### **Step 1: Basic Service Information**

Provide the essential information about your AI service:

* **AI Service Name** *(required, max 50 chars)*  
  > The name users will see on the marketplace.

* **Service ID** *(required)*  
  > Unique identifier for your service, used by CLI or SDK users.

* **Short Description** *(required, max 160 chars)*  
  > Brief summary displayed on the marketplace.

* **Long Description** *(required, max 5000 chars)*  
  > Detailed explanation of your AI service’s capabilities, functionalities, and use cases.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/AIServiceProfileInformation.webp" alt="AI Service Profile Information"/>

---

### **Step 2: Additional Service Details**

Enhance discoverability and presentation on the marketplace:

* **Tags** *(optional, max 20)*  
  > Relevant keywords that help users discover your service.

* **Project URL** *(required)*  
  > Link to the publicly accessible service website associated with your organization.

* **Contributors** *(required)*  
  > Names or identifiers of contributors involved in creating your service.

* **AI Service Profile Image** *(required)*  
  > Visual representation of your AI service on the marketplace.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/ServiceTags.webp" alt="Service Tags"/>

---

### **Step 3: UI Demo Settings**

Configure how users will interact with your service through the Marketplace interface:

* **Enable Demo** *(required)*

  > Turn **OFF** if the service is available only via CLI/SDK, or **ON** if you want users to test it directly on the marketplace via a web-based UI.

* **Upload Demo Files** *(optional)*

  > Upload a `.zip` archive containing your custom UI files for the service demo.
  >
  > You can create your own interface using the [UI Sandbox Portal](https://ai-ui-constructor.singularitynet.io/) — [learn more here](/docs/products/DecentralizedAIPlatform/QuickStartGuides/CreatingUIForTheService/).

* **⚠️ UI Processing Delay**

  > After uploading your UI archive, processing may take **up to 5 minutes**.
  >
  > Even if you finish all steps, the UI may not appear immediately. Just wait a few minutes and refresh the page.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/ServiceDemo.png" alt="Service Demo"/>

---

### **Step 4: Daemon Configuration**

Define critical settings for your AI service daemon:

* **AI Service Price** *(required)*  
  > Specify the price in ASI (FET) tokens per individual service call.

* **Demo Free Calls** *(required)*  
  > Set the number of free trial calls new users can make.

* **Daemon Endpoint** *(required)*  
  > Publicly accessible URL where your daemon will be hosted. Must start with `https://`.

* **Metering Address and Free Call signer (Ethereum public address)** *(required)*  
  > Generate a keypair for metering and free-call authentication using either a Python script or the built-in `snetd` Daemon tool:

:::code-group

```bash
./snetd generate-key
```

```python
from eth_account import Account
import secrets

key = secrets.token_hex(32)
acct = Account.from_key(key)
print("SAVE BUT DO NOT SHARE PRIVATE KEY")
print("Private key: ", key)
print("Address: ", acct.address)
```

:::

> 📌 **Important:** Keep your private key secure and confidential.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/ServiceDaemon.png" alt="Service Daemon"/>


---

### **Step 5: Service Type and Proto Files**

Complete your AI service definition:

* **Service Type** *(required)*
  > Choose your service implementation type — [`grpc`](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/IntegrationGRPCService/) or [`http`](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/IntegrationHTTPService/).
  > See the guides above to learn how to set up each type.

* **Upload Proto Files** *(required)*  
  > Upload a `.zip` archive containing the `.proto` definition files for your AI service.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/ServiceProto.png" alt="Uploading Proto Files"/>

---

### **Step 6: Confirm & Publish**

* After filling in all required information, click to confirm and launch your AI service.
* Confirm the transaction using **MetaMask** to complete the publication process.

<ImageViewer src="/assets/images/products/AIMarketplace/publisher/MetamaskConfirmation.webp" alt="MetaMask Confirmation"/>

### ✨ **Your AI service is now successfully published!**

## **Set Up & Launch the Daemon**

This section explains how to configure, install, and run the SingularityNET Daemon, which manages billing, service requests, and blockchain interaction for your AI service.

### 🚩 **Step 1: Preparation Steps**

Before you run your daemon, complete the following preparations:

#### **1.1 Generate Alchemy API Key**

Follow the [Alchemy API Key Setup Guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/) to generate your API key.  
Add these keys to your daemon configuration:

* **Mainnet**:
```json
"ethereum_json_rpc_http_endpoint": "https://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
"ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>"
```

* **Testnet (Sepolia)**:
```json
"ethereum_json_rpc_http_endpoint": "https://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
"ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>"
```

Replace `<YOUR_API_KEY>` with your actual Alchemy API key.

#### **1.2 Generate Metering and Free Call Private Key**

You can generate a keypair for metering and free-call authentication using either a Python script or the built-in `snetd` Daemon tool:

:::code-group

```bash
./snetd generate-key
```

```python
from eth_account import Account
import secrets

key = secrets.token_hex(32)
acct = Account.from_key(key)
print("SAVE BUT DO NOT SHARE PRIVATE KEY")
print("Private key: ", key)
print("Address: ", acct.address)
```

:::

Save your private key securely.

---

### 🚩 **Step 2: Download & Install the Daemon**

Download the latest version of the SingularityNET daemon from the [official GitHub repository](https://github.com/singnet/snet-daemon/releases/latest):

Select the appropriate binary for your operating system (e.g., `linux-amd64`, `linux-arm64`, `darwin-amd64`, or `windows-amd64`) from the latest release:

* [👉 Latest snet-daemon Release](https://github.com/singnet/snet-daemon/releases/latest)

Example command for Linux (amd64):

```bash-vue
wget https://github.com/singnet/snet-daemon/releases/latest/download/snetd-linux-amd64-{{ $daemonVersion }}
chmod +x snetd-linux-amd64-{{ $daemonVersion }}
sudo mv snetd-linux-amd64-{{ $daemonVersion }} /usr/bin/snetd
```

> 📌 Ensure the daemon binary has executable permissions (`chmod +x`) before moving it to `/usr/bin`.

---

### 🚩 **Step 3: Configure Daemon (`snetd.config.json`)**

Below is a complete example configuration, assuming you're using **embedded ETCD** (default, recommended for most setups).  

> 📌 If you're deploying a **public ETCD instance** (advanced setups), specify your public ETCD endpoint in the configuration below. More information on ETCD setup [here](/docs/products/DecentralizedAIPlatform/Daemon/daemon-etcd-setup/).

:::code-group

```json[Testnet]
{
  "blockchain_enabled": true,
  "blockchain_network_selected": "sepolia",
  
  "daemon_endpoint": "0.0.0.0:<DAEMON_PORT>",
  "daemon_group_name": "<DAEMON_GROUP>",
  
  "organization_id": "<ORGANIZATION_ID>",
  "service_id": "<SERVICE_ID>",
  "service_endpoint": "http://<SERVICE_HOST>:<SERVICE_PORT>",
  
  "ssl_cert": "<PATH_TO_DOMAIN_CERTS>/fullchain.pem",
  "ssl_key": "<PATH_TO_DOMAIN_CERTS>/privkey.pem",
  
  "metering_enabled": true,
  "metering_endpoint": "https://marketplace-mt-v2.singularitynet.io",
  "private_key_for_metering": "<METERING_KEY>",

  "private_key_for_free_calls": "<FREE_CALL_KEY>",
  
  "ethereum_json_rpc_http_endpoint": "https://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
  "ethereum_json_rpc_ws_endpoint": "wss://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
  
  "payment_channel_storage_server": {
    "client_port": 2379,
    "cluster": "storage-1=http://127.0.0.1:2380",
    "data_dir": "data.etcd",
    "enabled": true,
    "host": "127.0.0.1",
    "id": "storage-1",
    "log_level": "info",
    "peer_port": 2380,
    "scheme": "http",
    "startup_timeout": "1m",
    "token": "your-unique-token"
  },
  
  "log": {"level": "debug", "output": {"type": "stdout"}}
}
```

```json[Mainnet]
{
  "blockchain_enabled": true,
  "blockchain_network_selected": "main",
  
  "daemon_endpoint": "0.0.0.0:<DAEMON_PORT>",
  "daemon_group_name": "<DAEMON_GROUP>",
  
  "organization_id": "<ORGANIZATION_ID>",
  "service_id": "<SERVICE_ID>",
  "service_endpoint": "http://<SERVICE_HOST>:<SERVICE_PORT>",
  
  "ssl_cert": "<PATH_TO_DOMAIN_CERTS>/fullchain.pem",
  "ssl_key": "<PATH_TO_DOMAIN_CERTS>/privkey.pem",
  
  "metering_enabled": true,
  "metering_endpoint": "https://marketplace-mt-v2.singularitynet.io",
  "private_key_for_metering": "<METERING_KEY>",

  "private_key_for_free_calls": "<FREE_CALL_KEY>",
  
  "ethereum_json_rpc_http_endpoint": "https://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
  "ethereum_json_rpc_ws_endpoint": "wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>",
  
  "payment_channel_storage_server": {
    "client_port": 2379,
    "cluster": "storage-1=http://127.0.0.1:2380",
    "data_dir": "data.etcd",
    "enabled": true,
    "host": "127.0.0.1",
    "id": "storage-1",
    "log_level": "info",
    "peer_port": 2380,
    "scheme": "http",
    "startup_timeout": "1m",
    "token": "your-unique-token"
  },
  
  "log": {"level": "debug", "output": {"type": "stdout"}}
}
```

:::

::: danger
For each reference to the embedded ETCD configuration in the daemon, do not delete the directory specified by `data_dir`. Deleting this folder will remove access to payment channel storage and prevent token withdrawals.
:::

---

### 🚩 **Placeholders to Replace**

| Placeholder                 | Explanation                                                         |
|-----------------------------|---------------------------------------------------------------------|
| `<DAEMON_PORT>`             | Port for the daemon (e.g., `7000`).                                 |
| `<DAEMON_GROUP>`            | Daemon payment group (`default_group`).                             |
| `<ORGANIZATION_ID>`         | ID from your registered organization.                               |
| `<SERVICE_ID>`              | ID from your published service.                                     |
| `<SERVICE_HOST>`            | IP or hostname of your AI service.                                  |
| `<SERVICE_PORT>`            | Port number your service listens on.                                |
| `<PATH_TO_DOMAIN_CERTS>`    | Path to your SSL domain certificates.                               |
| `<METERING_KEY>`            | Private key generated for metering.                                 |
| `<FREE_CALL_KEY>`           | Private key generated for free calls.                               |
| `<YOUR_API_KEY>`            | Alchemy API key (see preparation step).                             |

---

### 🚩 **Configuration Fields Explained**

| Field                                        | Description                                                  |
|----------------------------------------------|--------------------------------------------------------------|
| `blockchain_enabled`                         | Enables blockchain integration (`true`).                     |
| `blockchain_network_selected`                | Network: `main` (Mainnet) or `sepolia` (Testnet).            |
| `daemon_endpoint`                            | Address and port where daemon listens.                       |
| `daemon_group_name`                          | Payment group name.                                          |
| `organization_id`, `service_id`              | IDs linking to your published org and service.               |
| `service_endpoint`                           | Your AI service's internal URL.                              |
| `ssl_cert`, `ssl_key`                        | Paths to SSL certificate files.                              |
| `metering_enabled`, `metering_endpoint`      | Metering settings; usually remain unchanged.                 |
| `private_key_for_metering`                   | Private Ethereum key for service call metering.              |
| `private_key_for_free_calls`                 | Private Ethereum key for service call free call.             |
| `ethereum_json_rpc_http/ws_endpoint`         | Blockchain connection endpoints.                             |
| `payment_channel_storage_server`             | Embedded ETCD configuration; no modification if default.     |
| `log`                                        | Logging settings for daemon operations.                      |

---

### 🚩 **Step 4: Launch the Daemon**

Save your configuration and run the daemon using these commands:

```bash
screen -S daemon_session
snetd -c snetd.config.json
```

> 📌 Using `screen` ensures the daemon remains active even after closing your terminal.

Upon successful startup, the daemon will show this confirmation:

```log
INFO ✅ Daemon successfully started and ready to accept requests
```

> Press Ctrl + A + D to disconnect from screen session.

Verify daemon status (optional):

```bash
curl <DAEMON_DOMAIN>:<DAEMON_PORT>/heartbeat
```

Successful output looks like:

```json-vue
{
  "daemonID": "2f2d493591eca925e84a933953b769471078e7b2d96b37565a30d3ef37585bba",
  "timestamp": "1743002956",
  "status": "Online",
  "serviceheartbeat": {
    "serviceID": "<SERVICE_ID>",
    "status": "SERVING"
  },
  "daemonVersion": "{{ $daemonVersion }}",
  "trainingEnabled": false,
  "trainingInProto": false,
  "trainingMethods": [],
  "dynamicPricing": {},
  "blockchainEnabled": true,
  "blockchainNetwork": "main",
  "storageClientCertDetails": {
    "validFrom": "",
    "validTill": ""
  }
}
```

---

### ✨ **Your daemon is now successfully installed and running!**
