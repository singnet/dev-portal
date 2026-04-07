# Hosting-as-a-Service (HaaS)

## What is HaaS?

**Hosting-as-a-Service (HaaS)** is a managed infrastructure solution that eliminates the need to deploy and maintain your own daemon instances and AI services. Instead of handling installation, environment setup, and server provisioning manually, you provide your service configuration, and the platform automatically provisions, deploys, and manages everything for you.

HaaS supports two deployment modes:

- **Daemon Only** — the platform hosts and manages the daemon, while you run your AI service on your own infrastructure
- **Full-Stack Hosting** — the platform hosts both the daemon and your AI service, running your code on serverless GPU/CPU infrastructure via RunPod

Each HaaS deployment runs in an isolated, containerized environment with:

- Dedicated virtual machine
- Pre-configured runtime environment
- Automated daemon deployment and lifecycle management
- Built-in payment channel storage (ETCD)
- Automated infrastructure updates and maintenance
- Serverless AI service hosting with automatic scaling (Full-Stack mode)

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-workflow.png" alt="HaaS Deployment Workflow" pictureTitle="HaaS deployment process — Daemon Only mode"/>

> **Note:** The diagram above illustrates the Daemon Only workflow. In Full-Stack mode, you provide a GitHub repository instead of a service endpoint, and the platform builds and hosts your AI service automatically.



## HaaS vs Self-Hosted Daemon

Choose the deployment method that best fits your needs:

| Aspect | HaaS Full-Stack | HaaS Daemon Only | Self-Hosted Daemon |
|--------|----------------|-------------------|-------------------|
| **AI Service Hosting** | Managed by platform | You host the service | You host the service |
| **Daemon Hosting** | Managed by platform | Managed by platform | You maintain servers |
| **Infrastructure Setup** | Fully automated | Fully automated | Manual configuration required |
| **ETCD Configuration** | Pre-configured | Pre-configured | Manual setup required |
| **SSL Certificates** | Handled automatically | Handled automatically | You manage certificates |
| **Updates & Maintenance** | Automatic | Automatic | Manual updates |
| **Technical Expertise** | Beginner-friendly | Intermediate | Advanced |
| **Cost Structure** | Monthly subscription (FET tokens) | Monthly subscription (FET tokens) | Infrastructure costs only |
| **Scalability** | Automatic serverless scaling | Easy scaling | Manual scaling |



## When to Use HaaS

**Choose HaaS Full-Stack if:**

- You want the platform to host both your AI service and the daemon
- You want to focus purely on AI model development without managing any infrastructure
- You need serverless scaling for your AI workloads
- You want a single deployment pipeline from code to production

**Choose HaaS Daemon Only if:**

- You already have your AI service running on your own infrastructure
- You want managed daemon hosting without migrating your service
- You need quick deployment without server management
- You prefer predictable monthly costs
- You don't want to handle ETCD, SSL, or daemon configuration



## When to Use Self-Hosted Daemon

**Choose Self-Hosted if:**

- You need full control over infrastructure
- You have existing server infrastructure
- You want to minimize recurring costs
- You require custom daemon configurations
- You have DevOps expertise

> For self-hosted deployment instructions, see the [Full Onboarding Guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/FullGuideOnboarding/).



## Prerequisites

Before deploying with HaaS, ensure you have:

1. **Service Created (Not Published)**: Your service must be created through the Publisher Portal (Steps 1 and 2 completed) but NOT yet published to the blockchain. Once a service is published, HaaS deployment will no longer be available for that service.
2. **MetaMask Wallet**: With sufficient FET tokens for monthly subscription payment

**For Daemon Only mode, additionally:**

3. **AI Service Running**: Your actual AI service must be deployed and accessible via HTTP/HTTPS endpoint
4. **Service Endpoint**: Public URL where your AI service is accessible (e.g., `https://your-service.example.com`)
5. **Authorization** (optional): Key, value, and location for each authorization parameter if your service requires authentication

**For Full-Stack mode, additionally:**

3. **GitHub Repository**: A public or private repository with your AI service code, prepared according to the [Preparing Your AI Service Repository](/docs/products/DecentralizedAIPlatform/HaaS/preparing-repository/) guide
4. **GitHub App Installed**: The SingularityNET HaaS GitHub App must be installed on your repository (the platform will prompt you during setup)

### Naming Requirements

When creating your service (Steps 1 and 2), ensure your **Organization ID** and **Service ID** follow these rules:

- **Lowercase only**: Use only lowercase letters (a-z)
- **Allowed characters**: Letters, numbers, and hyphens (`-`)
- **No special characters**: Do not use uppercase letters, underscores, spaces, or other special characters

**Valid examples:**
- Organization ID: `my-company`, `acme-corp`, `ai-services`, `test-org`
- Service ID: `image-classifier`, `sentiment-analysis`, `translation-api`, `test-service`

**Invalid examples:**
- `MyCompany` (uppercase)
- `test_service` (underscore)
- `AI Services` (space and uppercase)



## Next Steps

- **Full-Stack mode:** [Prepare your AI service repository](/docs/products/DecentralizedAIPlatform/HaaS/preparing-repository/) before deploying
- **Both modes:** [Deploy your daemon with HaaS](/docs/products/DecentralizedAIPlatform/HaaS/deployment/)
- **After deployment:** [Manage your daemons and billing](/docs/products/DecentralizedAIPlatform/HaaS/daemon-management/)
