# Hosting-as-a-Service (HaaS)

## What is HaaS?

**Hosting-as-a-Service (HaaS)** is a managed infrastructure solution that eliminates the need to deploy and maintain your own daemon instances and AI services. Instead of handling installation, environment setup, and server provisioning manually, you provide your service configuration, and the platform automatically provisions, deploys, and manages everything for you.

:::: tip Two Deployment Modes
| Mode | What the Platform Hosts | What You Provide |
|------|------------------------|-----------------|
| **Daemon Only** | Daemon | Your AI service running on your own infrastructure |
| **Full-Stack** | Daemon + AI Service | AI model to invoke |
::::

Each HaaS deployment runs in an isolated, containerized environment with:

- Pre-configured runtime environment
- Automated daemon deployment and lifecycle management
- Built-in payment channel storage (ETCD)
- Automated infrastructure updates and maintenance
- Serverless AI service hosting with automatic scaling (Full-Stack mode)


## HaaS vs Self-Hosted Daemon

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

### Full-Stack Mode

Best if you want the platform to handle **everything** — both your AI service and the daemon:

- Focus purely on AI model development without managing any infrastructure
- Serverless scaling for your AI workloads
- Single deployment pipeline from code to production

### Daemon Only Mode

Best if you **already have** your AI service running on your own infrastructure:

- Managed daemon hosting without migrating your service
- Quick deployment without server management
- No need to handle ETCD, SSL, or daemon configuration

### Self-Hosted Daemon

Best if you need **full control** over infrastructure:

- Existing server infrastructure you want to reuse
- Custom daemon configurations
- Minimize recurring costs

::: tip
For self-hosted deployment instructions, see the [Full Onboarding Guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/FullGuideOnboarding/).
:::

## Prerequisites

Before deploying with HaaS, ensure you have:

1. **Service Created (Not Published)** — your service must be created through the Publisher Portal (Steps 1 and 2 completed) but **not yet published** to the blockchain
2. **MetaMask Wallet** — with sufficient FET tokens for monthly subscription payment

:::: tip Additional Requirements by Mode

**Daemon Only:**
- AI service deployed and accessible via HTTP/HTTPS endpoint
- Public URL for the service (e.g., `https://your-service.example.com`)
- Authorization parameters (optional) — key, value, and location

**Full-Stack:**
- GitHub repository prepared according to the [repository setup guide](/docs/products/DecentralizedAIPlatform/HaaS/preparing-repository/)
- SingularityNET HaaS GitHub App installed on your repository
::::


## Next Steps

| Step | Link | When |
|------|------|------|
| Prepare your repository | [Preparing AI Service Repository](/docs/products/DecentralizedAIPlatform/HaaS/preparing-repository/) | Full-Stack mode — before deploying |
| Deploy your daemon | [Deploying with HaaS](/docs/products/DecentralizedAIPlatform/HaaS/deployment/) | Both modes |
| Manage and monitor | [Managing Deployments & Billing](/docs/products/DecentralizedAIPlatform/HaaS/daemon-management/) | After deployment |
