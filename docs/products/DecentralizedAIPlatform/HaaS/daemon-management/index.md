# Managing Deployments and Billing

After deploying with HaaS, use the Publisher Portal deployments dashboard to monitor status, view logs, metrics and perform maintenance actions.

## Accessing the Dashboard

Navigate to **My Deployments** in the left sidebar of the Publisher Portal to open the deployments dashboard.

At the main page you will see:

| Element | Description |
|---------|-------------|
| **Balance** | Your current FET token balance on the platform |
| **Top Up** | Button to add funds to your account |
| **History** | Button to check your balance history |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-sidebar.png" alt="Publisher Portal sidebar with My Deployments section highlighted"/>

The deployments table lists all your services with their **Organization ID** and **Service ID**:

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-deployments-list.png" alt="My Deployments page showing account balance, Top Up and History buttons, and a table of deployments"/>

## Deployment Details

Click on any deployment row to expand it. The expanded view shows two cards:

| Card | Description |
|------|-------------|
| **Daemon** | Daemon ID, status, last modified date, and a **More** button for full details |
| **Hosted Service** | Hosted service ID, status, last modified date, and a **More** button (Full-Stack only) |

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-deployment-daemon-only.png" alt="Expanded deployment row showing Daemon card with Edit and More buttons, and AI Service Not Hosted placeholder"/>

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-deployment-expanded.png" alt="Expanded deployment row showing Daemon card with status UP and Hosted Service card with status INIT"/>

## Daemon Information

Click **More** on the Daemon card to view the full daemon details page:

| Field | Description |
|-------|-------------|
| **Daemon ID** | Unique identifier |
| **Service ID** | Associated service |
| **Status** | Current operational state |
| **Daemon Endpoint** | Public HTTPS endpoint |
| **Organization ID** | Parent organization |
| **Service Endpoint** | Connected AI service URL |
| **Last Modified Date** | Last status change |

The page also includes **Logs** — live daemon logs with configuration details, endpoints, and runtime information.

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-daemon-detail.png" alt="Daemon Information page showing daemon configuration details and live logs"/>

### Daemon Status Indicators

| Status | Meaning |
|--------|---------|
| `INIT` | Daemon entity is created, awaiting deployment |
| `STARTING` | Daemon is being deployed |
| `UP` | Daemon is deployed and actively handling requests |
| `DOWN` | Daemon is stopped or subscription expired |
| `ERROR` | Daemon encountered an error during deployment |

## Hosted Service Information

::: tip
This section applies only to **Full-Stack** deployments.
:::

Click **More** on the Hosted Service card to view the AI service details page:

| Field | Description |
|-------|-------------|
| **Service ID** | Unique identifier |
| **Organization ID** | Parent organization |
| **Status** | Current deployment stage |
| **GitHub Account Name** | Repository owner |
| **GitHub Repository Name** | Repository name |
| **Last Commit** | Link to the last deployed commit |
| **Last Modified Date** | Last status change |

The page also includes:

- **Metrics** — real-time graphs for Invocations, Duration, Cold Starts, and Warm Starts
- **Logs** — live service logs with request processing details

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-hosted-service-detail.png" alt="Hosted Service Information page showing GitHub details, performance metrics graphs, and live service logs"/>

### Hosted Service Status Indicators

| Status | Meaning |
|--------|---------|
| `INIT` | Service entity is created, awaiting deployment |
| `STARTING` | Service is being built and deployed |
| `UP` | Service is live and handling requests |
| `DOWN` | Service is stopped |
| `ERROR` | Deployment failed — check logs for details |

## Updating Your Service

### Daemon Only Deployments

Update the daemon configuration (service endpoint or authorization) by clicking the **Edit** button on the daemon detail page. A modal will appear where you can modify the service endpoint and authorization parameters.

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-daemon-edit.png" alt="Daemon edit modal showing Service Endpoint and Authorization fields with Create button"/>

::: warning
Ensure your new service endpoint is accessible before updating to avoid downtime.
:::

### Full-Stack Deployments

Push changes to the connected GitHub repository. The platform detects the update and automatically redeploys through the full lifecycle — no manual action required.

## Balance and Payments

### Top Up

To add funds to your account:

1. Click **Top Up** on the My Deployments page
2. MetaMask will prompt you to approve the FET token transfer
3. Your balance will be updated after the transaction is confirmed

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-topup-modal.png" alt="Top Up Account modal showing FET amount input with Cancel and Proceed buttons"/>

::: tip
Keep your balance funded to avoid service interruption. When you top up after expiration, the daemon restarts and the new subscription period begins from the moment of payment.
:::

### Balance History

View your full payment history from the My Deployments page. The Balance History page shows:

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

You can filter transactions by **Sort order**, **Type**, **Status**, and **Period** (1h, 1d, 1w, 1m, 1y, All).

<ImageViewer src="/assets/images/products/AIMarketplace/haas/haas-balance-history.png" alt="Balance History page showing a Top Up transaction with expanded details including transaction hash, status, and sender"/>

