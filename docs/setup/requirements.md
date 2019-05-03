---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Setup Requirements
description: Getting your system ready

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

---


- [Python 3.6+](https://www.python.org/downloads/)
- [Node 8+ with npm](https://nodejs.org/en/download/)
- [SNET CLI](https://github.com/singnet/snet-cli/releases)
    - libudev
    - libusb 1.0
- [SNET Daemon](https://github.com/singnet/snet-daemon/releases)

For example, installing the requirements using `Ubuntu 18.04`:

```sh
sudo apt-get update
sudo apt-get install wget git
sudo apt-get install python3 python3-pip
sudo apt-get install nodejs npm
sudo apt-get install libudev-dev libusb-1.0-0-dev
sudo pip3 install snet-cli

# !!! Get the latest snet-daemon from Github releases
SNETD_VERSION=`curl -s https://api.github.com/repos/singnet/snet-daemon/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")'`

cd /tmp
wget https://github.com/singnet/snet-daemon/releases/download/${SNETD_VERSION}/snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz
tar -xvf snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz
sudo mv snet-daemon-${SNETD_VERSION}-linux-amd64/snetd /usr/bin/snetd
```

Setup environment variables (they are explained later in this tutorial as they're used):

```sh
export ORGANIZATION_ID="$USER"-org
export ORGANIZATION_NAME="The $USER's Organization"

export SERVICE_ID=example-service
export SERVICE_NAME="SNET Example Service"
export SERVICE_IP=127.0.0.1
export SERVICE_PORT=7000

export DAEMON_HOST=$SERVICE_IP
export DAEMON_PORT=$SERVICE_PORT

export USER_ID=$USER
```