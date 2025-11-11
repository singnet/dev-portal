# Hosting-as-a-Service (HaaS)

## What is HaaS?

**Hosting-as-a-Service (HaaS)** is a managed infrastructure solution that eliminates the need to deploy and maintain your own daemon instances. Instead of handling installation, environment setup, and server provisioning manually, you provide your service configuration, and the platform automatically provisions, deploys, and manages the daemon for you.

Each HaaS deployment runs in an isolated, containerized environment with:

- Dedicated virtual machine
- Pre-configured runtime environment
- Automated daemon deployment and lifecycle management
- Built-in payment channel storage (ETCD)
- Automated infrastructure updates and maintenance

---

## HaaS vs Self-Hosted Daemon

Choose the deployment method that best fits your needs:

| Aspect | HaaS (Managed) | Self-Hosted Daemon |
|--------|----------------|-------------------|
| **Infrastructure Setup** | ✅ Fully automated | ⚠️ Manual configuration required |
| **Server Management** | ✅ Managed by platform | ❌ You maintain servers |
| **ETCD Configuration** | ✅ Pre-configured | ⚠️ Manual setup required |
| **SSL Certificates** | ✅ Handled automatically | ⚠️ You manage certificates |
| **Updates & Maintenance** | ✅ Automatic | ❌ Manual updates |
| **Technical Expertise** | Beginner-friendly | Advanced |
| **Cost Structure** | Monthly subscription (FET tokens) | Infrastructure costs only |
| **Scalability** | ✅ Easy scaling | ⚠️ Manual scaling |

---

## When to Use HaaS

**Choose HaaS if:**

- You want to focus on AI service development, not infrastructure
- You need quick deployment without server management
- You prefer predictable monthly costs
- You don't want to handle ETCD, SSL, or daemon configuration
- You need reliable uptime with automated maintenance

---

## When to Use Self-Hosted Daemon

**Choose Self-Hosted if:**

- You need full control over infrastructure
- You have existing server infrastructure
- You want to minimize recurring costs
- You require custom daemon configurations
- You have DevOps expertise

> For self-hosted deployment instructions, see the [Full Onboarding Guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/FullGuideOnboarding/).

---

## Prerequisites

Before deploying with HaaS, ensure you have:

1. **Published Service**: Your service must be created through the Publisher Portal (Steps 1 and 2 completed)
2. **AI Service Running**: Your actual AI service must be deployed and accessible via HTTP/HTTPS endpoint
3. **MetaMask Wallet**: With sufficient FET tokens for monthly subscription payment
4. **Service Endpoint**: Public URL where your AI service is accessible (e.g., `https://your-service.example.com`)
5. **Authorization** (optional): API keys or authorization headers if your service requires authentication

---

## Deploying Your Daemon with HaaS

### Step 1: Access HaaS During Service Creation

After completing the first two steps of service creation in the Publisher Portal, you'll see the daemon configuration step. At the top of this page, you'll find:

**"TRY OUR HOSTING  
DEPLOY DAEMON IN ONE CLICK"**

Click this section to open the HaaS setup wizard.

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-entry-point.png" alt="HaaS Entry Point"/>

---

### Step 2: Configure Daemon Hosting

The **Daemon Hosting Payment** modal will appear with the following fields:

#### Required Configuration

| Field | Description | Example |
|-------|-------------|---------|
| **Monthly Cost** | Subscription price in FET tokens (displayed automatically) | `100 FET/month` |
| **Service Endpoint** | Public URL where your AI service is running | `https://api.yourservice.com` |

#### Optional Configuration

| Field | Description | Example |
|-------|-------------|---------|
| **Authorization Keys** | API keys, tokens, or headers if your service requires authentication | `Bearer YOUR_API_TOKEN` |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-payment-modal.png" alt="HaaS Payment Configuration"/>

> **Note:** Ensure your **Service Endpoint** is publicly accessible and properly configured to handle requests from the HaaS daemon.

---

### Step 3: Create and Pay

1. Click the **Create** button after filling in the required fields
2. MetaMask will prompt you to confirm the transaction
3. Approve the FET token payment for your first month of hosting

The transaction covers:
- Virtual machine provisioning
- Daemon deployment
- ETCD storage setup
- SSL certificate configuration
- One month of hosting service

---

### Step 4: Automatic Configuration

Once payment is confirmed, the platform automatically:

- Provisions dedicated infrastructure
- Deploys and configures the daemon
- Generates and applies SSL certificates
- Sets up payment channel storage (ETCD)
- Populates daemon configuration in your service settings

You'll see these fields automatically filled in your service configuration:

| Field | Description |
|-------|-------------|
| **Daemon Endpoint** | Public HTTPS endpoint for your hosted daemon |
| **Free Call Signer Address** | Ethereum address for free call authentication |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-auto-filled.png" alt="Auto-filled Daemon Configuration"/>

> **Note:** No ETCD configuration required — HaaS uses a managed ETCD cluster automatically.

---

### Step 5: Complete Service Publication

After HaaS successfully deploys your daemon, complete the remaining service publication steps in the Publisher Portal. Your service is now live with a fully managed daemon infrastructure.

---

## Managing Your HaaS Daemons

### Accessing the HaaS Dashboard

Navigate to the **HaaS** section in the left sidebar of the Publisher Portal to view all your hosted daemons.

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-sidebar.png" alt="HaaS Sidebar Navigation"/>

---

### Daemon List Overview

The **My Daemons** page displays all your HaaS-managed daemons with the following information:

| Column | Description |
|--------|-------------|
| **ID** | Unique identifier for the daemon instance |
| **Status** | Current operational state (`INIT`, `READY_TO_START`, `DOWN`, `ERROR`) |
| **Expiry Date** | When your current subscription period ends |
| **Last Payment** | Date of your most recent payment or "no payment data available" |
| **Actions** | Management options (three-dot menu) |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-daemon-list.png" alt="HaaS Daemon List"/>

---

### Daemon Status Indicators

| Status | Meaning |
|--------|---------|
| `INIT` | Daemon is being initialized and deployed |
| `READY_TO_START` | Daemon is provisioned and ready to start |
| `RUNNING` | Daemon is active and handling requests |
| `DOWN` | Daemon is stopped or subscription expired |
| `ERROR` | Daemon encountered an error and requires attention |

---

### Daemon Management Actions

Click the **three-dot menu** (⋮) next to any daemon to access management options:

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-actions-menu.png" alt="HaaS Actions Menu"/>

---

#### Top Up

**Purpose:** Extend your daemon's subscription by paying for additional time.

**How it works:**
1. Click **Top Up**
2. Confirm the FET token payment for the next subscription period
3. MetaMask will prompt you to approve the transaction
4. Your daemon's expiry date will be extended by the purchased period

> **Tip:** Top up before your expiry date to avoid service interruption.

---

#### Detail

**Purpose:** View detailed information and status history for a specific daemon.

**What you'll see:**
- Current daemon status
- Full status change history with timestamps
- Configuration details
- Deployment information
- Service endpoint and authorization settings

This page helps you:
- Monitor daemon health
- Track status changes over time
- Debug issues with deployment or connectivity

---

#### Update Daemon Config

**Purpose:** Modify your daemon's service connection and authorization settings.

**What you can update:**
- **Service Endpoint**: Change the URL of your AI service if it moves
- **Authorization**: Update API keys, tokens, or authentication headers

**When to use this:**
- Your AI service moved to a new domain or port
- You rotated API keys or authentication tokens
- You changed your service's authentication requirements

> **Important:** Ensure your new service endpoint is accessible before updating to avoid downtime.

---

#### Run For Claiming

**Purpose:** Transfer accumulated funds from the daemon to your organization's payment address.

**How it works:**
1. Click **Run For Claiming**
2. The system initiates a claim process
3. Funds from paid service calls are transferred to the payment address specified in your organization settings
4. You'll receive a confirmation once the claim completes

**When to use this:**
- You want to withdraw accumulated earnings
- Regular scheduled fund collection
- Before daemon expiry to ensure no funds are left unclaimed

> **Note:** Claiming sends funds to the **organization payment address** configured during organization setup.

---

## Payment and Billing

### Subscription Model

HaaS operates on a **monthly subscription basis** paid in FET tokens:

- Payment is required **upfront** for each subscription period
- Subscription automatically expires if not renewed
- You can top up at any time to extend the expiry date
- Multiple daemons require separate subscriptions

---

### Important Payment Notes

**Subscription Management:**
- Monitor your daemon's expiry date in the dashboard
- Top up before expiry to maintain continuous service
- Expired daemons enter `DOWN` status and stop processing requests

**Fund Management:**
- Service call payments accumulate in the daemon's payment channels
- Use **Run For Claiming** regularly to withdraw earnings
- Unclaimed funds remain accessible even after subscription expiry

---

## Next Steps

### After Deploying with HaaS

**Your daemon is now live!** Here's what to do next:

1. **Test Your Service**
   - Use the [Service Calling via CLI](/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaCLI/) guide
   - Try the [Python SDK](/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/) or [JavaScript SDK](/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/)

2. **Monitor Your Daemon**
   - Check the HaaS dashboard regularly for status updates
   - Review the Detail page for any status changes or issues
   - Set calendar reminders for subscription renewal dates

3. **Manage Earnings**
   - Run claims periodically to collect service call payments
   - Monitor the Last Payment column in the daemon list

4. **Keep Service Updated**
   - Use **Update Daemon Config** if your service endpoint changes
   - Maintain your AI service uptime for best results

### Need Help?

For additional support:
- Visit our [community forum](https://community.singularitynet.io)
- Join our [Discord channel](https://discord.gg/snet)
- Check the [Publisher Portal Guide](/docs/products/DecentralizedAIPlatform/PublisherPortal/text-guide/) for general platform help
