---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Developers

# Micro navigation
micro_nav: true

---
## Organization Setup

### Overview

An organization on the SingularityNet platform is a logical entity that groups together various services and the set of identities that can work on these services. The first step to setting up a service on the platform is to create an organization. All metadata that is common across services is stored at an organization level.
The key attributes of an organization are
* **Owner** 
    - This is an ethereum identity that represents the owner of the organization. 
    - The user with this identity has complete control of the organization and services under the organization. 
    - The user with this identity has alone can delete the organization from the SingularityNet platform

* **Members** 
    - These are a set of ethereum identities that can create and manage services
    - This enables the organization owner to include additional team members to collaborate on the different services
    - Users with this identity have complete control over all services but not on the organization

* **Groups**
    - Groups provide a mechanism of having multiple instances of a service in a geographically distributed manner
    - All service metadata can be managed at a group level
    - A group very roughly maps to a region in AWS but unlike in AWS is not a pre-determined list. Service owners can define the number of groups that they want


* **Payment Storage**
    - We use [etcd](etcd) for our payment storage which is defined at a group level
    - Refer to [etcd-setup](etcdsetup) on how to set up an etcd cluster

* **Payment Address**
    - This is an ethereum identity to which all payments will be processed.
    - This is defined at a group level
    - The user that has this identity alone can withdraw funds from this wallet
    - **NOTE: This address does not need to be a member of the organization**

### Creating ethereum identity

There are many ways to create an ethereum identity. A few a listed below. 
**In all cases the private key has to be stored securely as thats the only way to access the corresponding account.**

#### Using snet-cli

snet-cli is the command line utility to interact with the SIngularityNet platform. The following command can be used to create an identity

```sh
snet identity create test-user key --private-key <PVT-KEY> --network mainnet
```
See the <a href="http://snet-cli-docs.singularitynet.io/organization.html" target="_blank">CLI documentation</a> for full details of actions the tool allows.

#### Using Metamask

<a href="https://metamask.io/" target="_blank">Metamask</a> is a browser extension for interacting with Blockchain enabled websites, such as marketplace.  
In the initial startup, Metamask will prompt you to create an identity, which can be used in Blockchain transactions and for storing tokens.


