# SingularityNET Platform Onboarding Checkup

</br>
<ImageViewer src="/assets/images/products/AIMarketplace/Marketplace/ReadyToOnboardingCheckUp.webp" alt="Checkup"/>

This document describes the mandatory items that must be implemented in order to get into the Decentralized AI Platform and AI Marketplace:

The fastest method for onboarding on our Platform and publish your service is via [Publisher](/docs/products/DecentralizedAIPlatform/DevelopersTutorials/OnboardingViaPublisher/). In addition to this method, see the other ways of onboarding your service.

### 1. AI Service

First and most important, you must have a service that is able to accept requests and return responses to them.

### 2. Created .proto file of your AI service

Requires the creation of the described [.proto](https://protobuf.dev/) interfaces of your service calls to the Daemon via GRPC Protocol.

### 3. Ethereum Wallet

You will need a [metamask wallet](https://metamask.io/) and some ETH for transactions (about 0.01 ETH) to publish the organization and publish the service

### 4. Account on Publisher Portal (optional if you want to use CLI/TUI)

Register an account to create and publish an organization and services: https://publisher.singularitynet.io/

### 5. Virtual machine with IP address and Python

Your virtual machine must have:

    1. Python version 3.10 or higher installed
    2. Open a port on a virtual machine or cloud server to allow access to it over the internet.

### 6. Domain name (optional)

If you want to use a domain name to access your service, you will need to purchase it from a provider.

### 7. ETCD set up on Virtual Machine

In the process of publishing your service, you will have to install and configure:
[ETCD database](https://etcd.io/) and security certificates (more details in the instructions).

### 8. Daemon up and running on Virtual Machine

In the process of publishing your service, you will have to install and configure:
Latest version of [Daemon](https://github.com/singnet/snet-daemon) for your service. It must also be installed and configured.

Note! Your ETCD, Daemon and services can be on different machines or on one - on your preference.
To make sure everything works and test your service, you can go through the exact same process in Sepolia testnet on test publisher portal: https://testnet.publisher.singularitynet.io

And if ready for publish your service use: https://publisher.singularitynet.io/





## Step 1: Register

Register an account to create and publish an organization and services: https://publisher.singularitynet.io/

You will need a [metamask](https://metamask.io/) wallet and some ETH for transactions (about 0.01 ETH) to publish the organization and publish the service 

## Step 2: Setting up the environment

Write proto standard interfaces for your service. Configure the ETCD and run the configured Daemon.

## Step 3: Testing


To make sure everything works and test your service, you can go through the exact same process on Sepolia testnet.


## Step 4: Publish

After setting up the environment and connecting the service to the daemon, you will need to collect all the data and go through the update process on the [platform](https://publisher.singularitynet.io/).

An alternative publishing option is to publish via the CLI / TUI.

