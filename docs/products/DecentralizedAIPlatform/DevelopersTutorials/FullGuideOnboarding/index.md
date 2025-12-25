# Full Onboarding Guide (Mainnet & Testnet)

This guide is designed for AI providers who want to publish their AI services on our marketplace.

> **Marketplace Links:**
> - **Mainnet:** [marketplace.singularitynet.io](https://marketplace.singularitynet.io)
> - **Testnet:** [testnet.marketplace.singularitynet.io](https://testnet.marketplace.singularitynet.io)

## Platform Architecture Overview

Before diving into the setup process, it is helpful to understand how the key components work together.

### Key Components

**ETCD** is a distributed key-value store that manages payment channel data. It tracks the state of payment channels between consumers and service providers. For most deployments, the embedded ETCD (which runs automatically with the daemon) is sufficient. External ETCD clusters are only needed for high-availability production setups.

**Daemon** is an adapter that sits between your AI service and clients. It handles authentication and authorization, payment channel management, request metering, and free call tracking. The daemon must be publicly accessible via HTTPS.

**Blockchain Registration** involves publishing your organization and service metadata to the Ethereum blockchain. This creates on-chain records that clients use to discover and connect to your service.

### Deployment Flow

The typical deployment sequence is:

1. **Prepare Infrastructure** - Set up your VPS/VM with a domain and open ports
2. **Install ETCD** - Either use embedded (automatic) or deploy standalone
3. **Generate SSL Certificates** - Domain must be linked to your server first
4. **Install and Configure Daemon** - Connect daemon to your AI service
5. **Register Organization** - Publish organization metadata to blockchain
6. **Register Service** - Publish service metadata to blockchain
7. **Launch Daemon** - Start accepting requests

## Onboarding Methods Overview

The SingularityNET platform provides three methods for publishing your AI service to the blockchain. All methods result in a service that can be called programmatically via CLI and SDK. The key difference lies in the interface used for publishing and whether you want your service to have a demo UI in the Marketplace.

### Method Comparison

| Method | Publishing Interface | Service Accessibility After Publishing | Marketplace UI Demo |
|--------|---------------------|---------------------------------------|-------------------|
| **[Publisher Portal](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaPublisher/)** | Web GUI | Marketplace + CLI + SDK | ✅ Yes (optional) |
| **[CLI](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaCLI/)** | Command line | CLI + SDK only | ❌ No |
| **[TUI](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaTUI/)** | Terminal menus | CLI + SDK only | ❌ No |

## Method Descriptions

### Publisher Portal

> **Best for:** Teams and developers who want maximum service visibility with marketplace UI demo

**What is it?**  
Web-based platform at https://publisher.singularitynet.io that provides a graphical interface for service publishing. Includes an integrated UI Sandbox for creating custom demonstration interfaces.

**Key Features**

| Feature | Description |
|---------|-------------|
| Visual Interface | Form-based inputs with real-time validation |
| UI Sandbox | Create custom demo interfaces for your service |
| Team Collaboration | Multiple users can manage the same organization |
| No CLI Required | Complete publishing without command-line knowledge |

**When to Choose Publisher Portal:**

- You want users to test your service directly in the Marketplace
- You need a visual interface for the publishing process
- Your team members have varying technical expertise
- You want to create a custom UI demo for better service presentation

**Limitations:**

- Requires manual steps (not suitable for automation)
- Needs web browser and MetaMask extension

---

### Command Line Interface (CLI)

> **Best for:** Developers who need automation and programmatic control

**What is it?**  
The `snet-cli` tool provides direct interaction with the blockchain through command-line operations. Services are fully functional but without marketplace UI demos.

**Key Features**

| Feature | Description |
|---------|-------------|
| Full Control | Direct manipulation of all parameters and metadata |
| Automation Ready | Scriptable commands for CI/CD pipelines |
| Batch Operations | Publish multiple services programmatically |
| Direct Blockchain Access | No intermediary services required |

**When to Choose CLI:**

- Your service will only be accessed via SDK or CLI (no web UI needed)
- You need to automate the publishing process
- You're integrating with existing DevOps workflows
- You require fine-grained control over configuration

**Limitations:**

- No marketplace UI demo capability
- Requires command-line proficiency
- Manual metadata file creation

---

### Text User Interface (TUI)

> **Best for:** Users who want terminal-based publishing with guided assistance

**What is it?**  
Terminal-based interface with interactive menus that guides you through the publishing process step by step.

**Key Features**

| Feature | Description |
|---------|-------------|
| Menu Navigation | Interactive menus - no need to memorize commands |
| Cross-Platform | Works on Windows, Linux, and macOS |
| No Browser Needed | Operates entirely in terminal |
| Guided Workflow | Step-by-step process with clear instructions |

**When to Choose TUI:**

- You prefer terminal but want guided assistance
- You're working on remote servers without GUI access
- You don't want to memorize CLI commands
- You need a middle ground between GUI and CLI

**Limitations:**

- No marketplace UI demo capability
- Less flexible than direct CLI commands
- Still requires terminal access

## Important Clarifications

### Service Accessibility

All methods publish to the same blockchain. The difference is only in how users can interact with your service.

- **Publisher Portal:** Service accessible via Marketplace UI + CLI + SDK
- **CLI/TUI:** Service accessible via CLI + SDK only

---

### Interoperability

Organizations and services are blockchain entities. Once created, they can be managed through any method later, can switch between methods as needed, and metadata can be updated using different tools.

---

### UI Demo Considerations

Only Publisher Portal allows creation of marketplace UI demos. UI demos increase service discoverability and allow users to test services without technical knowledge. This is optional but highly recommended for consumer-facing services. Note that UI demos cannot be added later if published via CLI/TUI.

## Quick Decision Guide

**Choose Publisher Portal if:**

- You want users to discover and test your service easily (Marketplace visibility)
- Multiple people will manage the service (Team collaboration)
- You prefer graphical interfaces
- You want to showcase your service with a custom UI demo

---

**Choose CLI if:**

- You need to script the publishing process (Automation)
- Your service is for programmatic use only (SDK-only access)
- Publishing is part of your CI/CD pipeline
- You need fine-grained configuration options

---

**Choose TUI if:**

- You're working on servers without GUI (Terminal environment)
- You want guided help without memorizing commands
- You're in a restricted environment without browser access
- You need a middle ground between full CLI and web interface

## Prerequisites

Before starting with any onboarding method, ensure you have:

1. **AI Service**: A functional service that accepts requests and returns responses
2. **Proto Files**: Protocol buffer definitions (.proto) describing your service interface
3. **Ethereum Wallet**: MetaMask wallet with approximately 0.01 ETH for transaction fees
4. **Infrastructure**: 
   - Python 3.10 or higher
   - Server with open ports for external access
   - SSL certificates (required for daemon)
5. **Domain** (optional): Custom domain name for service access

> **Important:** We recommend testing your service on **Testnet** first before deploying to Mainnet.
> 
> | Environment | Marketplace | Publisher Portal |
> |-------------|-------------|------------------|
> | **Testnet** | [testnet.marketplace.singularitynet.io](https://testnet.marketplace.singularitynet.io) | [testnet.publisher.singularitynet.io](https://testnet.publisher.singularitynet.io) |
> | **Mainnet** | [marketplace.singularitynet.io](https://marketplace.singularitynet.io) | [publisher.singularitynet.io](https://publisher.singularitynet.io) |

## Service Type Selection

Before deploying your AI, you need to set up a server that processes user requests. There are two types of service implementations available:

- **gRPC Service**
- **HTTP Service**

Each has its own advantages and use cases:

- **gRPC** is suitable for high-performance, strongly typed communication. It's ideal when you're working with structured data, multiple fields, and require efficient binary communication between client and server.
- **HTTP** is easier to set up and better suited for integrating existing REST APIs or simpler services. If your service already exposes an HTTP endpoint or you prefer working with JSON over HTTP, this may be the better option.

Learn how to integrate your service:

- [gRPC Integration Guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/IntegrationGRPCService/)
- [HTTP Integration Guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/IntegrationHTTPService/)

## Domain and VPS/VM Setup

> **Note:** This section is only for **self-hosted daemon deployment**. Skip this if using [HaaS](/docs/products/DecentralizedAIPlatform/HaaS/).

Before installing ETCD or generating SSL certificates, your domain must be linked to your VPS/VM.

### Linking Domain to Your Server

1. Purchase a domain from any domain registrar
2. Go to the DNS/Nameservers settings in your domain configuration
3. Add an **A record** pointing to your VPS/VM IP address
4. Wait for DNS propagation (can take up to 48 hours, usually faster)

### Verify Domain Configuration

Test that your domain resolves to your server:

```sh
ping your-domain.com
```

The response should show your server's IP address.

### Port Configuration

Ensure the following ports are accessible:

| Port | Purpose |
|------|--------|
| `<DAEMON_PORT>` | Daemon endpoint (must be publicly accessible) |
| `2379` | ETCD client communication (internal or external) |
| `2380` | ETCD peer communication (for clusters) |
| `80` | Required temporarily for Certbot SSL verification |

## ETCD Setup  

ETCD is a distributed key-value store used for payment channel management. You have two options:

### Option 1: Embedded ETCD (Recommended)

For most users, the **embedded ETCD** is sufficient. It runs automatically when `snet-daemon` starts and requires no additional installation.

The daemon configuration for embedded ETCD is included in the [Configuring the Daemon](#configuring-the-daemon) section below.

### Option 2: Standalone Docker ETCD

For production deployments or when you need external access to ETCD, use the Docker-based setup.

The installation script handles:

- Docker installation and configuration
- CFSSL tools for certificate generation
- ETCD Docker image deployment
- PKI infrastructure (CA, server, peer, client certificates)
- TLS encryption for ETCD communications

Follow the **[ETCD Setup Guide](/docs/products/DecentralizedAIPlatform/ETCD/)** for Docker-based installation.

> **Important:** If using the SNET ETCD setup script, your domain must already be linked to your server's IP address. Otherwise, certificate validation will fail. You can also generate SSL certificates manually using Certbot after the ETCD setup.

## Daemon Setup

### What is the Daemon?

A daemon is an adapter between an AI service and a client. Its primary responsibilities include:

- Tracking service calls
- Calculating funds spent per call
- Redirecting requests to the AI service
- Managing free call limits

The daemon must be deployed on a **public address** since it acts as the entry point for all incoming requests.

### Daemon Deployment Options

You have two options for deploying your daemon:

**Option 1: Hosting-as-a-Service (HaaS)** - Managed infrastructure
- Fully automated deployment and maintenance
- No server setup, SSL certificates, or ETCD configuration required
- Monthly subscription in FET tokens
- Available only through Publisher Portal
- See the [HaaS Guide](/docs/products/DecentralizedAIPlatform/HaaS/) for details

**Option 2: Self-Hosted Daemon** - Manual infrastructure setup
- Full control over infrastructure
- Requires server provisioning, domain configuration, SSL certificates, and ETCD setup
- Available through all onboarding methods (Publisher Portal, CLI, TUI)
- Follow the sections below for self-hosted setup

> **Note:** If you plan to use HaaS through the Publisher Portal, you can skip the following daemon setup sections (Domain Configuration, Installing the Daemon, Configuring the Daemon, and Launching the Daemon) as these are handled automatically.

## SSL Certificate Generation

> **Note:** This section is only for **self-hosted daemon deployment**. Skip this if using [HaaS](/docs/products/DecentralizedAIPlatform/HaaS/).

SSL certificates are required for secure HTTPS communication with your daemon. Generate certificates using Certbot after your domain is linked to your server.

### Prerequisites

- Domain must be registered and connected to your VPS IP address
- Domain should be properly forwarding to your server (verify with `ping`)
- Port 80 must be temporarily open for Certbot verification

### Installation and Certificate Generation

1. **Update system packages:**

   ```sh
   sudo apt update
   ```

2. **Install Certbot:**

   ```sh
   sudo apt install certbot
   ```

3. **Generate SSL certificate:**

   ```sh
   sudo certbot certonly --standalone -d your-domain.com
   ```

   Replace `your-domain.com` with your actual domain name.

4. **Verify certificate paths:**

   ```sh
   sudo certbot certificates
   ```

   Output will show:
   - Certificate Path: `/etc/letsencrypt/live/your-domain.com/fullchain.pem`
   - Private Key Path: `/etc/letsencrypt/live/your-domain.com/privkey.pem`

5. **Verify automatic renewal:**

   ```sh
   sudo systemctl show certbot.timer
   ```

These paths will be used in your daemon configuration as `ssl_cert` and `ssl_key` parameters.

## Installing the Daemon

> **Note:** This section is only for **self-hosted daemon deployment**. Skip this if using [HaaS](/docs/products/DecentralizedAIPlatform/HaaS/).

Get the latest version of the SingularityNET Daemon from the official GitHub releases page:

[https://github.com/singnet/snet-daemon/releases/latest](https://github.com/singnet/snet-daemon/releases/latest)

### Installation Steps for Linux

1. **Download the latest release:**

   ```sh-vue
   wget https://github.com/singnet/snet-daemon/releases/latest/download/snetd-linux-amd64-{{ $daemonVersion }}
   ```

2. **Ensure the daemon file is executable:**

   ```sh-vue
   chmod +x snetd-linux-amd64-{{ $daemonVersion }}
   ```

3. **Create a configuration file for the daemon:**

   ```sh
   touch snetd.config.json
   ```

4. *(Optional)* **Move the executable file to `/usr/bin` for system-wide access:**

   ```sh-vue
   sudo cp snetd-linux-amd64-{{ $daemonVersion }} /usr/bin/snetd
   ```

## Enabling Metering and Free Calls

Metering tracks service usage, and Free Calls allow users to test your service without payment. Both features require generating Ethereum keypairs.

### Key Generation Methods

You can generate keypairs using two methods:

| Method | When to Use |
|--------|-------------|
| **SNET Daemon** | Quick generation after daemon installation |
| **Python Script** | When daemon is not yet installed or for automation |

#### Method 1: Using SNET Daemon

After downloading the daemon binary:

```bash
./snetd generate-key
```

Output:
```
Private Key: <64-character hex string>
Address: <Ethereum address starting with 0x>
```

#### Method 2: Using Python Script

Requires `eth_account` package (`pip install eth-account`):

```python
from eth_account import Account
import secrets

key = secrets.token_hex(32)
acct = Account.from_key(key)
print("SAVE BUT DO NOT SHARE PRIVATE KEY")
print("Private key:", key)
print("Address:", acct.address)
```

> **Important:** Store the private key securely. It grants full control over the corresponding address and should never be shared.

### Using the Generated Credentials

The generated keys are used in two places:

| Purpose | Where Address is Used | Where Private Key is Used |
|---------|----------------------|---------------------------|
| **Metering** | Service metadata (`<METERING_ADDRESS>`) | Daemon config (`private_key_for_metering`) |
| **Free Calls** | Service metadata (`<FREE_CALL_SIGNER_ADDRESS>`) | Daemon config (`private_key_for_free_calls`) |

You can reuse the same keypair for both Metering and Free Calls, or generate separate credentials for better isolation.

## Configuring the Daemon

> **Note:** This section is only for **self-hosted daemon deployment**. Skip this if using [HaaS](/docs/products/DecentralizedAIPlatform/HaaS/).

To run the daemon, create and edit the configuration file named `snetd.config.json`. This file tells the daemon how to communicate with your AI service, blockchain, and payment storage.

Edit the configuration file:

```sh
$EDITOR snetd.config.json
```

### Example Configuration

Below are complete configuration examples for **Mainnet** and **Testnet (Sepolia)**. Replace all placeholders (`<...>`) accordingly.

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

### Placeholders to Replace

| Placeholder                 | Explanation                                                                                                  |
|-----------------------------|--------------------------------------------------------------------------------------------------------------|
| `<DAEMON_PORT>`             | Port number where the daemon will run (e.g., `7000`)                                                        |
| `<DAEMON_GROUP>`            | Group name for your daemon (`default_group`)                                                                |
| `<ORGANIZATION_ID>`         | Your organization's ID (after publishing organization)                                                      |
| `<SERVICE_ID>`              | Your service's ID (after publishing service)                                                                |
| `<SERVICE_HOST>`            | Address (IP or hostname) of your running AI service                                                         |
| `<SERVICE_PORT>`            | Port number on which your AI service is listening                                                           |
| `<PATH_TO_DOMAIN_CERTS>`    | Directory containing your domain certificates (`fullchain.pem` and `privkey.pem`)                           |
| `<METERING_KEY>`            | Previously generated private key for metering                                                               |
| `<FREE_CALL_KEY>`           | Previously generated private key for free calls                                                             |
| `<YOUR_API_KEY>`            | Alchemy API key for blockchain communication                                                                |

---

### Configuration Field Explanations

| Field                                  | Explanation                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| `blockchain_enabled`                   | Enables blockchain connectivity (always `true`)                       |
| `blockchain_network_selected`          | Blockchain network (`main` for Mainnet, `sepolia` for Testnet)       |
| `daemon_endpoint`                      | Address and port where daemon listens for incoming connections        |
| `daemon_group_name`                    | Name of payment group (defined earlier)                               |
| `organization_id`                      | ID referencing your published organization                            |
| `service_id`                           | ID referencing your published AI service                              |
| `service_endpoint`                     | Internal endpoint for your AI service                                 |
| `ssl_cert` and `ssl_key`              | SSL certificate paths for secure connections to daemon                |
| `metering_enabled`                     | Activates request metering functionality (`true`)                     |
| `metering_endpoint`                    | Endpoint for metering service (no changes required)                   |
| `private_key_for_metering`             | Ethereum private key for metering functionality                       |
| `private_key_for_free_calls`           | Ethereum private key for free calls functionality                     |
| `ethereum_json_rpc_http_endpoint`      | HTTP RPC endpoint for blockchain communication                        |
| `ethereum_json_rpc_ws_endpoint`        | WebSocket RPC endpoint for blockchain communication                   |
| `payment_channel_storage_server`       | Embedded ETCD setup (no modification required if using embedded ETCD) |
| `log`                                  | Daemon logging settings                                               |

## Switching Between Testnet and Mainnet

When moving from Sepolia testnet to Ethereum mainnet (or vice versa), you need to update specific parameters in your daemon configuration.

::: tip Marketplace URLs
| Network | Marketplace URL |
|---------|----------------|
| **Mainnet** | [marketplace.singularitynet.io](https://marketplace.singularitynet.io) |
| **Testnet (Sepolia)** | [testnet.marketplace.singularitynet.io](https://testnet.marketplace.singularitynet.io) |
:::

### Parameters to Change

| Parameter | Testnet (Sepolia) | Mainnet |
|-----------|-------------------|--------|
| `blockchain_network_selected` | `"sepolia"` | `"main"` |
| `ethereum_json_rpc_http_endpoint` | `https://eth-sepolia.g.alchemy.com/v2/<KEY>` | `https://eth-mainnet.g.alchemy.com/v2/<KEY>` |
| `ethereum_json_rpc_ws_endpoint` | `wss://eth-sepolia.g.alchemy.com/v2/<KEY>` | `wss://eth-mainnet.g.alchemy.com/v2/<KEY>` |

### Additional Considerations

- **Organization and Service IDs** must be re-registered on the target network (testnet registrations do not transfer to mainnet)
- **Payment Address** should be verified for the target network
- **Metering Endpoint** remains the same for both networks (`https://marketplace-mt-v2.singularitynet.io`)
- **ETCD Configuration** does not change between networks

### Switching Checklist

1. Update `blockchain_network_selected` in daemon config
2. Update both Alchemy RPC endpoints (HTTP and WebSocket)
3. Re-register your organization on the target network
4. Re-publish your service on the target network
5. Update `organization_id` and `service_id` in daemon config with new values
6. Restart the daemon

## Daemon Setup Summary

> **Note:** This summary is for **self-hosted daemon deployment** only.

At this point, the daemon cannot be started because the organization and service are not yet created. These steps will be covered next. You have completed:

- Domain and SSL certificate configuration
- Metering and free calls private key generation
- Daemon installation and preparation
- Configuration file setup

Proceed to the next step to create your Organization and Service.

If you prefer not to manage infrastructure, consider using [Hosting-as-a-Service (HaaS)](/docs/products/DecentralizedAIPlatform/HaaS/) available through the Publisher Portal.

## Organization Setup

To publish your organization, you can choose between two methods:

- **Publisher Portal**: Use this method if you plan to access your service via **Marketplace**, **CLI**, and **SDK** simultaneously. Follow the [Onboarding via Publisher guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaPublisher/) for this method.

- **CLI**: Choose this method if you only intend to access your service via **CLI** or **SDK**. Follow the steps below to publish via CLI.

---

### Step 1: Create an Identity in `snet-cli`

First, create an identity in `snet-cli`. You can create an identity with your existing crypto wallet private key or mnemonic seed phrase. Choose whichever option applies to you.

:::code-group

```bash[Testnet]
snet identity create <IDENTITY> key --private-key <PVT-KEY> --network sepolia
```

```bash[Mainnet]
snet identity create <IDENTITY> key --private-key <PVT-KEY> --network mainnet
```

:::

OR using mnemonic:

:::code-group

```bash[Testnet]
snet identity create <IDENTITY> mnemonic <MNEMONIC> --network sepolia
```

```bash[Mainnet]
snet identity create <IDENTITY> mnemonic <MNEMONIC> --network mainnet
```

:::

---

### Select Network

After creating an identity, select the network you will use (Testnet or Mainnet) by running one of the commands below:

:::code-group

```bash[Testnet]
snet network sepolia
```

```bash[Mainnet]
snet network mainnet
```

:::

---

### Step 2: Initialize Organization Metadata

Initialize your organization metadata using your chosen `org_name` and `org_id`. Ensure to use the same `<ORGANIZATION_ID>` later in the daemon configuration.

```bash
snet organization metadata-init <ORG_NAME> <ORGANIZATION_ID> individual
```

A file named `organization_metadata.json` will be created with the provided metadata:

```json
{
    "org_name": "<ORG_NAME>",
    "org_id": "<ORGANIZATION_ID>",
    "org_type": "individual",
    "description": {},
    "assets": {},
    "contacts": [],
    "groups": []
}
```

---

### Step 3: Add Organization Description

Add a detailed description, a short description, and your organization's URL.

```bash
snet organization metadata-add-description \
    --description "Describe your organization details here" \
    --short-description "This is a short description of your organization" \
    --url "https://yourorganizationurl.com"
```

After executing, your `organization_metadata.json` file will be updated:

```json
{
    "org_name": "<ORG_NAME>",
    "org_id": "<ORGANIZATION_ID>",
    "org_type": "individual",
    "description": {
        "description": "Describe your organization details here",
        "short_description": "This is a short description of your organization",
        "url": "https://yourorganizationurl.com"
    },
    "assets": {},
    "contacts": [],
    "groups": []
}
```

---

### Step 4: Add Recipient and Group Details

Next, specify the recipient details and payment group configuration.

- `payment_address`: Ethereum address to receive payments
- `payment_channel_storage_type`: Typically `etcd`
- `endpoint`: The endpoint depends on your setup:
  - Use `http://127.0.0.1:2379` if you're using embedded etcd
  - Use your public etcd endpoint URL if deploying externally
- `payment-expiration-threshold`: Usually set to `40320`

Example command:

```bash
snet organization add-group --payment-expiration-threshold 40320 default_group <wallet_address> <etcd-endpoint>
```

Final command example for embedded etcd:

```bash
snet organization add-group --payment-expiration-threshold 40320 default_group 0x06A1D29e9FfA2415434A7A571235744F8DA2a514 http://127.0.0.1:2379
```

Example for public etcd endpoint:

```bash
snet organization add-group --payment-expiration-threshold 40320 default_group 0x06A1D29e9FfA2415434A7A571235744F8DA2a514 https://your-public-etcd-endpoint:2379
```

This step updates the `groups` section in your `organization_metadata.json`:

```json
"groups": [
    {
        "group_name": "default_group",
        "group_id": "generated-group-id",
        "payment": {
            "payment_address": "0x06A1D29e9FfA2415434A7A571235744F8DA2a514",
            "payment_expiration_threshold": 40320,
            "payment_channel_storage_type": "etcd",
            "payment_channel_storage_client": {
                "connection_timeout": "100s",
                "request_timeout": "5s",
                "endpoints": [
                    "http://127.0.0.1:2379"
                ]
            }
        }
    }
]
```

---

### Step 5: (Optional) Add Assets and Contacts

You can optionally add assets (e.g., images) and contacts (email, phone) for your organization:

**Add an asset:**

```bash
snet organization metadata-add-assets image.png hero_image
```

**Add contact information:**

```bash
snet organization metadata-add-contact --phone 123456789 --email yourorg@yourorg support
```

---

### Step 6: Verify Metadata File

Check the metadata file you've created:

```bash
cat organization_metadata.json
```

You may manually edit this file if needed.

---

### Step 7: Publish Organization

Finally, publish your organization. Note that publishing creates an on-chain transaction, requiring ETH in your wallet account.

```bash
snet organization create <ORGANIZATION_ID>
```

## Service Setup

If you previously published your organization using the **Publisher Portal**, please use the Portal to create your services as well. If your organization was published using the **CLI**, follow the steps below.

---

### Step 1: Navigate to Your Service Directory

```bash
cd path/to/your/service
```

---

### Step 2: Initialize Service Metadata

Create a metadata file for your service using the following command:

```bash
snet service metadata-init \
    SERVICE_PROTOBUF_DIR \
    SERVICE_DISPLAY_NAME \
    --group-name PAYMENT_GROUP_NAME \
    --endpoints DAEMON_ENDPOINT \
    --fixed-price FIXED_PRICE \
    --service-type SERVICE_TYPE
```

Where:

- `SERVICE_PROTOBUF_DIR`: Directory containing your service's protobuf files
- `SERVICE_DISPLAY_NAME`: User-friendly name for your service (can be any name)
- `PAYMENT_GROUP_NAME`: The group name you defined earlier during [organization setup](#step-4-add-recipient-and-group-details)
- `DAEMON_ENDPOINT`: Public endpoint (domain or IP address with port) of your deployed daemon
- `FIXED_PRICE`: Price per service call in ASI (FET) (for example, `0.000000000000000001` ASI (FET) = 1 AFET)
- `SERVICE_TYPE`: Choose the service type you defined at the very beginning of this guide (`grpc` or `http`)

**Example:**

```bash
snet service metadata-init \
    service/service_spec \
    "your-service" \
    --group-name default_group \
    --fixed-price 0.00000001 \
    --endpoints https://<your-domain-or-public-ip>:<port> \
    --service-type grpc
```

---

### Step 3: Add a Service Description

Add details and a URL describing your service:

```bash
snet service metadata-add-description --json '{"description": "Description of my Service.", "url": "https://service.users.guide"}'
```

---

### Step 4: Add Daemon Metering Address

Enable metering by specifying the metering address generated earlier ([Metering address generation](#step-1-generate-keys)):

```bash
snet service metadata-add-daemon-addresses <GROUP_NAME> <METERING_ADDRESS>
```

Replace:
- `<GROUP_NAME>`: Your payment group name (e.g., `default_group`)
- `<METERING_ADDRESS>`: Previously generated Ethereum address used for metering

---

### Step 5: Publish the Service

Finally, publish your service. This creates an on-chain transaction, so ensure your wallet has enough ETH:

```bash
snet service publish <ORGANIZATION_ID> <SERVICE_ID>
```

**Example:**

```bash
snet service publish my_test_org my_test_service
```

---

### Step 6: Verify Service Publication

Check your service publication status using:

```bash
snet organization info <ORGANIZATION_ID>
```

## Final Configuration

Now that your **Organization** and **Service** have been successfully published, update your daemon configuration file by specifying the appropriate `<ORGANIZATION_ID>` and `<SERVICE_ID>` from the previous steps.

Edit your daemon configuration file:

```bash
$EDITOR snetd.config.json
```

Replace the placeholders as indicated below:

### Fields to Replace

- `<DAEMON_PORT>`: The port where the daemon will run
- `<DAEMON_GROUP>`: The group name defined earlier (`default_group`)
- `<ORGANIZATION_ID>`: Your published Organization ID
- `<SERVICE_ID>`: Your published Service ID
- `<SERVICE_HOST>`: The host address of your AI service
- `<SERVICE_PORT>`: The port your AI service is listening on
- `<PATH_TO_DOMAIN_CERTS>`: The directory containing your domain SSL certificates (`fullchain.pem` and `privkey.pem`)
- `<METERING_KEY>`: Your previously generated private key for metering
- `<FREE_CALL_KEY>`: Your previously generated private key for free calls
- `<YOUR_API_KEY>`: Your Alchemy API key. If you don't have one yet, follow the [Alchemy API Key Setup Guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/)

::: danger
For each reference to the embedded ETCD configuration in the daemon, do not delete the directory specified by `data_dir`. Deleting this folder will remove access to payment channel storage and prevent token withdrawals.
:::

## Launching the Daemon

> **Note:** This section is only for **self-hosted daemon deployment**. If you used [HaaS](/docs/products/DecentralizedAIPlatform/HaaS/), your daemon is already running.

After editing and saving your configuration file, start the daemon with the following command:

```bash
/path/to/snetd -c snetd.config.json
```

Upon successful startup, you will see:

```bash
INFO    Daemon successfully started and ready to accept requests
```

### Verify Daemon Status

Test that your daemon is running correctly:

```bash
curl https://your-domain.com:<DAEMON_PORT>/heartbeat
```

A successful response will include:

```json
{
  "daemonID": "...",
  "timestamp": "...",
  "status": "Online",
  "serviceheartbeat": {
    "serviceID": "<SERVICE_ID>",
    "status": "SERVING"
  }
}
```

## Next Steps

Your AI service is now published and running on the SingularityNET platform.

::: tip View Your Service on Marketplace
- **Mainnet:** [marketplace.singularitynet.io](https://marketplace.singularitynet.io)
- **Testnet:** [testnet.marketplace.singularitynet.io](https://testnet.marketplace.singularitynet.io)
:::

**Test Your Service:**

- [Service Calling via CLI](/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaCLI/)
- [Python SDK](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/)
- [JavaScript SDK](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/)