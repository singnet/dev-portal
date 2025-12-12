# ETCD Setup Guide

## Overview

ETCD is a distributed key-value store used by SingularityNET for payment channel management and service state storage. This guide covers setting up ETCD for your SingularityNET service deployment.

## When to Use This Guide

For most users, the **embedded ETCD** (which runs automatically with the daemon) is sufficient. Use this guide only if you need:

- External ETCD access for multiple daemons
- High-availability production deployments
- Separate ETCD infrastructure

If you are using embedded ETCD, skip this guide and proceed to the [Full Onboarding Guide](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/FullGuideOnboarding/).

## Prerequisites

Before starting the ETCD setup:

- Ubuntu 18.04 or higher
- Sudo permissions for the user
- Open ports for ETCD communication (2379, 2380)

> **Important:** If you plan to use domain-based certificates, your domain must be linked to your server's IP address BEFORE running the setup script. Add an A record in your domain's DNS settings pointing to your VPS IP.

## Setup Options

### Option 1: Single Node Docker Setup (Recommended for Development)

This is the simplest setup suitable for development and small-scale deployments.

### Option 2: Multi-node Cluster (Production)

For high availability and production environments.

## Single Node Docker Setup

### Step 1: Download Installation Script

```bash
# Download the automated setup script
wget https://raw.githubusercontent.com/singnet/platform-setup/main/docker-etcd-setup.sh

# Make it executable
chmod +x docker-etcd-setup.sh
```

### Step 2: Configure Network Settings (Optional)

If hosting ETCD on a separate network or using a custom domain, modify the configuration:

1. Open the `server.json` file after running the script
2. Add your domain to the hosts section:

```json
{
    "hosts": [
        "${public_ip}",
        "${private_ip}",
        "your.domain.com",  // Add your domain here
        "127.0.0.1"
    ]
}
```

### Step 3: Run Installation Script

```bash
# Execute the setup script
sudo bash docker-etcd-setup.sh
```

**Important Notes:**

- The script will create a data folder in your current directory
- **This folder contains your payment channel data - DO NOT DELETE IT**
- Back up this folder regularly to prevent loss of funds

### Step 4: Follow Script Prompts

The script will guide you through:

1. Setting certificate validity period (recommended: 365 days or more)
2. Configuring network interfaces
3. Setting up SSL certificates
4. Initializing the ETCD cluster

### Step 5: Verify Installation

If successful, you'll see: `ETCD INSTALLED SUCCESSFULLY`

Check the container status:

```bash
# Verify container is running
docker ps | grep etcd

# Check container logs
docker logs docker-etcd-node-1
```

## SSL Certificate Configuration

SSL certificates for your daemon should be generated AFTER the ETCD setup is complete. The recommended approach:

1. **First:** Link domain to your server (A record in DNS)
2. **Second:** Run ETCD setup script (handles ETCD-specific certificates)
3. **Third:** Generate daemon SSL certificates using Certbot

### Generate Domain Certificates for Daemon

After ETCD is running, generate SSL certificates for your daemon:

1. **Install Certbot:**

```bash
sudo apt update
sudo apt install certbot
```

2. **Generate Certificates:**

```bash
sudo certbot certonly --standalone -d your-domain.com
```

> **Note:** Port 80 must be temporarily open for Certbot verification.

3. **Verify Certificates:**

```bash
sudo certbot certificates
```

Output paths:
- Certificate: `/etc/letsencrypt/live/your-domain.com/fullchain.pem`
- Private Key: `/etc/letsencrypt/live/your-domain.com/privkey.pem`

4. **Verify Auto-renewal:**

```bash
sudo systemctl show certbot.timer
```

### Certificate Parameters for Daemon

Use the Certbot-generated certificates in your daemon configuration:

```json
{
    "ssl_cert": "/etc/letsencrypt/live/your-domain.com/fullchain.pem",
    "ssl_key": "/etc/letsencrypt/live/your-domain.com/privkey.pem"
}
```

The ETCD client certificates (generated during ETCD setup) are separate and used for ETCD communication:

```json
{
    "payment_channel_cert_path": "/var/lib/etcd/cfssl/client.pem",
    "payment_channel_ca_path": "/var/lib/etcd/cfssl/ca.pem",
    "payment_channel_key_path": "/var/lib/etcd/cfssl/client-key.pem"
}
```

## ETCD Certificate Management

### Initial Certificate Generation

Certificates are generated automatically during setup. For manual generation:

```bash
# Generate CA certificate
cfssl gencert -initca ca-csr.json | cfssljson -bare ca

# Generate server certificate
cfssl gencert \
    -ca=ca.pem \
    -ca-key=ca-key.pem \
    -config=ca-config.json \
    -profile=server \
    server.json | cfssljson -bare server

# Generate peer certificate
cfssl gencert \
    -ca=ca.pem \
    -ca-key=ca-key.pem \
    -config=ca-config.json \
    -profile=peer \
    member-1.json | cfssljson -bare member-1

# Generate client certificate
cfssl gencert \
    -ca=ca.pem \
    -ca-key=ca-key.pem \
    -config=ca-config.json \
    -profile=client \
    client.json | cfssljson -bare client
```

### Certificate Renewal

When ETCD certificates expire:

1. Navigate to the certificate directory
2. Run the renewal commands above
3. Restart the ETCD container:

```bash
docker restart docker-etcd-node-1
```

## Container Management

### Common Docker Commands

```bash
# Start container
docker start docker-etcd-node-1

# Stop container
docker stop docker-etcd-node-1

# Restart container
docker restart docker-etcd-node-1

# View logs
docker logs docker-etcd-node-1

# Follow logs in real-time
docker logs -f docker-etcd-node-1

# Check container status
docker inspect docker-etcd-node-1
```

### Troubleshooting

#### Container Won't Start

```bash
# Check logs for errors
docker logs docker-etcd-node-1

# Common issues:
# - Port already in use
# - Certificate problems
# - Disk space issues
# - Permission problems
```

#### Port Conflicts

```bash
# Check if ports are in use
netstat -tulpn | grep -E '2379|2380'

# Find process using port
lsof -i :2379
```

#### Data Recovery

If container crashes:

1. Stop the container
2. Backup the data directory
3. Check data integrity
4. Restart with clean state if needed

## Production Best Practices

### High Availability Setup

For production, consider:

1. **Multi-node cluster** (minimum 3 nodes)
2. **Regular backups** of data directory
3. **Monitoring and alerting**
4. **Automated certificate renewal**
5. **Dedicated storage volume**

### Backup Strategy

```bash
# Create backup
tar -czf etcd-backup-$(date +%Y%m%d).tar.gz /path/to/etcd/data

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backup/etcd"
DATA_DIR="/var/lib/etcd"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/etcd-backup-$DATE.tar.gz $DATA_DIR

# Keep only last 30 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

### Monitoring

Monitor these metrics:

- Container health status
- Disk usage
- Memory consumption
- Network latency
- Certificate expiration dates

### Security Considerations

1. **Firewall Rules:** Only allow necessary ports
2. **SSL/TLS:** Always use encrypted connections
3. **Access Control:** Limit client access
4. **Regular Updates:** Keep Docker and ETCD updated
5. **Audit Logs:** Enable and monitor access logs

## Integration with SingularityNET

### Daemon Configuration

Add ETCD endpoints to your daemon configuration:

```json
{
    "payment_channel_storage_type": "etcd",
    "payment_channel_storage_client": {
        "connection_timeout": "5s",
        "request_timeout": "3s",
        "endpoints": ["https://your.domain.com:2379"]
    }
}
```

### Testing Connection

```bash
# Test ETCD connectivity
etcdctl --endpoints=https://your.domain.com:2379 \
         --cert=/path/to/client.pem \
         --key=/path/to/client-key.pem \
         --cacert=/path/to/ca.pem \
         endpoint health
```

## Additional Resources

- [ETCD Official Documentation](https://etcd.io/docs/)
- [Docker ETCD Image](https://hub.docker.com/r/bitnami/etcd)
- [SingularityNET Daemon Setup](https://github.com/singnet/snet-daemon)
- [Certificate Management with CFSSL](https://github.com/cloudflare/cfssl)

## Support

For issues or questions:

1. Check daemon logs for ETCD connection errors
2. Verify network connectivity
3. Ensure certificates are valid
4. Contact SingularityNET support if issues persist