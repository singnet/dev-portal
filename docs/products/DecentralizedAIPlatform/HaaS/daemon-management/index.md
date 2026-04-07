# Managing Deployments and Billing

After deploying with HaaS, use the Publisher Portal dashboard to monitor status, view logs, manage subscriptions, and perform maintenance actions.



## Accessing the Dashboard

Navigate to **My Daemons** in the left sidebar of the Publisher Portal to open the deployments dashboard.

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-sidebar.png" alt="My Deployments page in the Publisher Portal showing the sidebar with My Daemons section, account balance, Top Up and Add New buttons, and a table of deployments with Organization ID and Service ID"/>



## My Deployments

The **My Deployments** page displays your account balance and all HaaS-managed deployments.

At the top of the page you will see:
- **Balance** — your current FET token balance on the platform
- **Top Up** — add funds to your account
- **Add New** — create a new deployment

The table lists all deployments with their **Organization ID** and **Service ID**.



## Deployment Details

Click on any deployment row to expand it. The expanded view shows two cards:

- **Daemon** — daemon ID, status, and last modified date with a **More** button
- **Hosted Service** — hosted service ID, status, and last modified date with a **More** button (only present in Full-Stack deployments)

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-deployment-expanded.png" alt="Expanded deployment row showing Daemon card with status UP and Hosted Service card with status INIT"/>



## Daemon Information

Click **More** on the Daemon card to view the full daemon details page:

- **Daemon ID** and **Service ID**
- **Status** — current operational state
- **Daemon Endpoint** — public HTTPS endpoint
- **Organization ID** and **Service Endpoint**
- **Last Modified Date**
- **Logs** — live daemon logs including configuration details, endpoints, and runtime information

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-daemon-detail.png" alt="Daemon Information page showing daemon configuration details and live logs"/>

### Daemon Status Indicators

| Status | Meaning |
|--------|---------|
| `INIT` | Daemon entity is created, awaiting deployment |
| `READY_TO_START` | Payment confirmed, daemon is ready to be deployed |
| `STARTING` | Daemon is being deployed |
| `RESTARTING` | Daemon is being redeployed |
| `UP` | Daemon is deployed and actively handling requests |
| `DOWN` | Daemon is stopped or subscription expired |
| `CLAIMING` | Daemon is temporarily running for one hour to enable fund withdrawal via CLI |
| `DELETING` | Daemon is being deleted |
| `ERROR` | Daemon encountered an error during deployment |



## Hosted Service Information

Click **More** on the Hosted Service card to view the AI service details page (Full-Stack deployments only):

- **Service ID**, **Organization ID**
- **Status** — current deployment stage
- **GitHub Account Name** and **GitHub Repository Name**
- **Last Commit** — link to the last deployed commit
- **Last Modified Date**
- **Metrics** — real-time graphs for:
  - **Invocations** — number of requests over time
  - **Duration** — request processing time
  - **Cold Starts** and **Warm Starts** — container startup metrics
- **Logs** — live service logs with request processing details

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-hosted-service-detail.png" alt="Hosted Service Information page showing GitHub details, performance metrics graphs, and live service logs"/>

### Hosted Service Status Indicators

| Status | Meaning |
|--------|---------|
| `INIT` | Service entity is created, awaiting deployment |
| `VALIDATING` | Repository structure and required files are being validated |
| `REGISTERING` | Service is being registered in the platform infrastructure |
| `PUSHING_NEW_VERSION` | Code is being prepared for the build pipeline |
| `BUILDING` | Docker image is being built from your repository |
| `DEPLOYING` | Container is being deployed to serverless infrastructure |
| `PROFILING` | Test request is being sent to verify the service |
| `UP` | Service is live and handling requests |
| `DOWN` | Service is stopped |
| `ERROR` | Deployment failed — check logs for details |



## Updating Your Service

### Daemon Only Deployments

To update the daemon configuration (service endpoint or authorization), use the daemon detail page.

> **Important:** Ensure your new service endpoint is accessible before updating to avoid downtime.

### Full-Stack Deployments

To update your AI service code, push changes to the connected GitHub repository. The platform detects the update and automatically redeploys through the full lifecycle.

No manual action is required in the Publisher Portal — the deployment is triggered by git push.



## Balance and Payments

### Balance History

From the **My Deployments** page, you can view your full payment history. The **Balance History** page shows:

| Column | Description |
|--------|-------------|
| **Type** | Transaction type (e.g., `INCOME`) |
| **Name** | Transaction name (e.g., `Top Up`) |
| **Amount** | FET token amount |
| **Timestamp** | Date and time of the transaction |

Expand any row to see additional details:

| Field | Description |
|-------|-------------|
| **Hash** | Blockchain transaction hash |
| **Status** | Transaction status (e.g., `SUCCESS`) |
| **Sender** | Wallet address of the sender |
| **Timestamp** | Precise timestamp |

You can filter transactions by **Sort order**, **Type**, **Status**, and **Period** (1h, 1d, 1w, 1m, 1y, All).

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-balance-history.png" alt="Balance History page showing a Top Up transaction with expanded details including transaction hash, status, and sender"/>

### Top Up

To add funds to your account:

1. Click **Top Up** on the My Deployments page
2. MetaMask will prompt you to approve the FET token transfer
3. Your balance will be updated after the transaction is confirmed

> **Tip:** Keep your balance funded to avoid service interruption.

### Fund Claiming

When your daemon is inactive (`DOWN` status), funds from service calls may remain in payment channels on the MPE (Multi-Party Escrow) contract. To withdraw these funds:

1. The daemon must be temporarily activated to provide claim signatures
2. **First 2-3 minutes:** Daemon is starting up and initializing
3. **After startup:** Use CLI commands to claim funds from payment channels

> **Important:** The actual fund transfer is performed via CLI commands, not through the HaaS interface. Wait 2-3 minutes after activation before attempting to claim.
