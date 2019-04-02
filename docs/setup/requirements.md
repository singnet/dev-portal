---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: System Requirements to Publish a SingularityNET Service
description: Getting your system ready

# extralink box
extralink:
    title: All Docs
    title_url: '/docs/all'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Back to tutorials
        url: '/tutorials/publish'
    next:
        content: View all docs
        url: '/docs/all'
---

## Step 2a. Setup your system

#### Requirements

- [Python 3.6+](https://www.python.org/downloads/)
- [Node 8+ with npm](https://nodejs.org/en/download/)
- [SNET CLI](https://github.com/singnet/snet-cli/releases)
    - libudev
    - libusb 1.0
- [SNET Daemon](https://github.com/singnet/snet-daemon/releases)

For example, installing the requirements using `Ubuntu 18.04`:

```
sudo apt-get update
sudo apt-get install wget git
sudo apt-get install python3 python3-pip
sudo apt-get install nodejs npm
sudo apt-get install libudev-dev libusb-1.0-0-dev
sudo pip3 install snet-cli

# !!! Change version to the latest snet-daemon from releases link above
SNETD_VERSION="v0.1.6"

wget https://github.com/singnet/snet-daemon/releases/download/$SNETD_VERSION/snetd-linux-amd64
chmod a+x snetd-linux-amd64
sudo mv snetd-linux-amd64 /usr/bin/snetd
```

Setup environment variables (they are explained later in this tutorial as they're used):

```
export ORGANIZATION_ID="$USER"-org
export ORGANIZATION_NAME="The $USER's Organization"

export SERVICE_ID=example-service
export SERVICE_NAME="SNET Example Service"
export SERVICE_IP=127.0.0.1
export SERVICE_PORT=7000

export DAEMON_HOST=$SERVICE_IP
export DAEMON_PORT=$SERVICE_PORT

export USER_ID = $USER
```

After installation, you can proceed with [Tutorial/Publish/Step3](https://dev.singularitynet.io/tutorials/publish/#step-3-setup-snet-cli-and-create-your-identity).