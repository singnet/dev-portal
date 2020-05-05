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
    - The user with this identity can transfer ownership to another user

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

* **Assets**
    - Images for the Organization. 
    - These images will be displayed on the SingularityNet Marketplace DApp

* **Contacts**
    - Different contact details of the organization

## Creating ethereum identity

[This](../ethereum-identity) section has details on creating an ethereum identity.

## Publishing an organization using snet-cli

[This](../organization-setup-sent-cli) section gives a step by step guide on publishing an organization using the snet-cli

