---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: Set up 

---
- [Python 3.6+](https://www.python.org/downloads/)

- [Create a Virtual env](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

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
sudo pip3 install snet-cli #( Install snet-cli)
sudo pip3 install snet-sdk #( this also installs snet-cli)

# !!! Get the latest snet-daemon from Github releases
SNETD_VERSION=`curl -s https://api.github.com/repos/singnet/snet-daemon/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")'`

cd /tmp
wget https://github.com/singnet/snet-daemon/releases/download/${SNETD_VERSION}/snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz
tar -xvf snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz
sudo mv snet-daemon-${SNETD_VERSION}-linux-amd64/snetd /usr/bin/snetd
```
