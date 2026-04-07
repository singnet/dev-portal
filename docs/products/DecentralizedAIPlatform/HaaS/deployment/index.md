# Deploying with HaaS

This guide walks you through the step-by-step process of deploying your daemon (and optionally your AI service) using HaaS through the Publisher Portal.

> **Before you begin:** Ensure you have completed the [Prerequisites](/docs/products/DecentralizedAIPlatform/HaaS/#prerequisites). If you are using Full-Stack mode, make sure your repository is prepared according to the [Preparing Your AI Service Repository](/docs/products/DecentralizedAIPlatform/HaaS/preparing-repository/) guide.



## Step 1: Access HaaS During Service Creation

After completing the first two steps of service creation in the Publisher Portal (service profile and metadata), you will reach the **Pricing & Distribution** step. At the top of this page, you will find:

**"TRY OUR HOSTING
DEPLOY DAEMON IN ONE CLICK"**

Click this banner to open the HaaS setup wizard.

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-entry-point.png" alt="HaaS entry point on the Pricing & Distribution page in the Publisher Portal"/>



## Step 2: Configure Daemon Hosting

The **Daemon Hosting Payment** modal will appear. The fields depend on your chosen deployment mode.

### Daemon Only Mode

Provide the endpoint of your externally hosted AI service:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| **Service Endpoint** | Yes | Public URL where your AI service is running | `https://api.yourservice.com` |
| **Authorization** | No | Key, value, and location for each auth parameter | Key: `Authorization`, Value: `Bearer token123`, Location: `Header` |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-payment-modal.png" alt="Daemon Hosting Payment modal showing Service Endpoint and Authorization fields"/>

> **Note:** Ensure your service endpoint is publicly accessible and properly configured to handle requests from the HaaS daemon.

### Full-Stack Mode

Provide your GitHub repository details instead of a service endpoint:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| **GitHub Account** | Yes | GitHub account or organization that owns the repository | `your-github-username` |
| **Repository Name** | Yes | Name of the repository with your AI service code | `my-ai-service` |

> **Note:** The SingularityNET HaaS GitHub App must be installed on the specified repository. The platform verifies the installation before proceeding. If the app is not installed, you will be prompted to install it.



## Step 3: Create and Pay

1. Click **Create** after filling in the required fields
2. MetaMask will prompt you to confirm the transaction
3. Approve the FET token payment for your first month of hosting

The monthly subscription covers:
- Virtual machine provisioning
- Daemon deployment and configuration
- ETCD storage setup
- SSL certificate management
- Full-Stack mode: AI service build, deployment, and hosting



## Step 4: Automatic Configuration

Once payment is confirmed, the platform automatically:

- Provisions dedicated infrastructure
- Deploys and configures the daemon
- Generates and applies SSL certificates
- Sets up payment channel storage (ETCD)
- Populates daemon configuration in your service settings
- **Full-Stack mode:** Builds and deploys your AI service from the GitHub repository

The following fields are automatically filled in your service configuration:

| Field | Description |
|-------|-------------|
| **Daemon Endpoint** | Public HTTPS endpoint for your hosted daemon (e.g., `https://<hash>.haas.singularitynet.dev`) |
| **HaaS Free Call Signer Address** | Ethereum address used for free call authentication |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-auto-filled.png" alt="Auto-filled daemon configuration showing Daemon Endpoint and HaaS Free Call Signer Address"/>

> **Note:** No ETCD configuration is required — HaaS uses a managed ETCD cluster automatically.

> **Note:** In Full-Stack mode, the AI service deployment progresses through the stages described in the [Deployment Lifecycle](/docs/products/DecentralizedAIPlatform/HaaS/preparing-repository/#deployment-lifecycle). Monitor progress in the [HaaS Dashboard](/docs/products/DecentralizedAIPlatform/HaaS/daemon-management/).



## Step 5: Complete Service Publication

After HaaS successfully deploys your daemon (and AI service in Full-Stack mode), complete the remaining service publication steps in the Publisher Portal. Once published, your service is live on the AI Marketplace with fully managed infrastructure.



## Next Steps

- [Manage your daemons, view logs, and handle billing](/docs/products/DecentralizedAIPlatform/HaaS/daemon-management/)
