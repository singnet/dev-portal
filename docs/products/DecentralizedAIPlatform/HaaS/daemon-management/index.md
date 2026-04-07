# Managing Daemons and Billing

After deploying your daemon with HaaS, use the Publisher Portal dashboard to monitor status, manage subscriptions, and perform maintenance actions.



## Accessing the HaaS Dashboard

Navigate to **My Daemons** in the left sidebar of the Publisher Portal to view all your hosted daemons.

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-sidebar.png" alt="Publisher Portal sidebar with My Daemons section highlighted"/>



## Daemon List Overview

The **My Daemons** page displays all your HaaS-managed daemons:

| Column | Description |
|--------|-------------|
| **ID** | Unique identifier for the daemon instance |
| **Status** | Current operational state of the daemon |
| **Expiry Date** | When your current subscription period ends |
| **Last Payment** | Date of your most recent payment or "no payment data available" |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-daemon-list.png" alt="My Daemons page showing a list of daemons with their status, expiry date, and last payment"/>



## Daemon Status Indicators

| Status | Meaning |
|--------|---------|
| `INIT` | Daemon entity is created, awaiting payment |
| `READY_TO_START` | Payment confirmed, daemon is ready to be deployed |
| `STARTING` | Daemon is being deployed |
| `RESTARTING` | Daemon is being redeployed |
| `UP` | Daemon is deployed and actively handling requests |
| `DOWN` | Daemon is stopped or subscription expired |
| `CLAIMING` | Daemon is temporarily running for one hour to enable fund withdrawal via CLI |
| `DELETING` | Daemon is being deleted |
| `ERROR` | Daemon encountered an error during deployment |

For Full-Stack deployments, the hosted AI service has its own status indicators — see the [Deployment Lifecycle](/docs/products/DecentralizedAIPlatform/HaaS/preparing-repository/#deployment-lifecycle).



## Daemon Actions

Click the **three-dot menu** next to any daemon to access management options:

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-actions-menu.png" alt="Daemon actions dropdown menu showing Top Up, Detail, Update daemon config, and Run For Claiming options"/>



### Top Up

Extend your daemon's subscription by paying for additional time.

1. Click **Top Up**
2. MetaMask will prompt you to approve the FET token payment
3. Your daemon's expiry date will be extended by the purchased period

> **Tip:** Top up before your expiry date to avoid service interruption. When you top up after expiration, the daemon restarts and the new subscription period begins from the moment of payment.



### Detail

View detailed information and status history for a specific daemon:

- Current daemon status
- Full status change history with timestamps
- Configuration details
- Deployment information
- Service endpoint and authorization settings

Use this page to monitor daemon health, track status changes over time, and debug deployment or connectivity issues.



### Update Daemon Config

Modify your daemon's service connection and authorization settings.

**What you can update:**
- **Service Endpoint** — change the URL if your AI service moves
- **Authorization** — update API keys, tokens, or authentication headers

**When to use:**
- Your AI service moved to a new domain or port
- You rotated API keys or authentication tokens
- You changed your service's authentication requirements

> **Important:** Ensure your new service endpoint is accessible before updating to avoid downtime.

> **Note:** This option is only available for **Daemon Only** deployments. In **Full-Stack** mode, the service endpoint is managed automatically. To update your AI service, push changes to the GitHub repository — the platform will detect the update and redeploy.



### Run For Claiming

Temporarily activate an inactive daemon to enable fund withdrawal from payment channels.

**Availability:**
- Only available when daemon status is `DOWN`
- Can be used **once every 24 hours**

**How it works:**

1. When your subscription expires, the daemon becomes inactive (`DOWN` status)
2. Funds from service calls remain in payment channels on the MPE (Multi-Party Escrow) contract
3. To withdraw these funds via CLI, you need signatures from the daemon
4. Click **Run For Claiming** to temporarily activate the daemon
5. Daemon status changes to `CLAIMING` and runs for **one hour**
6. **First 2-3 minutes:** Daemon is starting up and initializing
7. **After startup:** Use CLI commands to claim funds from payment channels

> **Important:** This feature activates the daemon for one hour specifically to provide the signatures needed for claiming funds through the MPE contract. The actual fund transfer is performed via CLI commands, not through the HaaS interface. Wait 2-3 minutes after activation before attempting to claim.



## Payment and Billing

### Subscription Model

HaaS operates on a **monthly subscription basis** paid in FET tokens:

- Payment is required **upfront** for each month
- The daemon automatically becomes unavailable when the subscription expires
- You can top up at any time to extend the expiry date
- Multiple daemons require separate subscriptions

### Subscription Management

- Monitor your daemon's expiry date in the dashboard
- Top up before expiry to maintain continuous service
- Expired daemons enter `DOWN` status and stop processing requests
- When you top up after expiration, the daemon restarts and the new subscription period begins from the moment of payment

### Fund Management

- Service call payments accumulate in payment channels on the MPE contract
- When your subscription expires, use **Run For Claiming** to temporarily activate the daemon if you need to withdraw funds via CLI
- Unclaimed funds remain in payment channels and can be accessed using the claiming feature at any time
