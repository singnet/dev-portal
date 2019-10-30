---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Organization Metadata
description: Describing your Organization details to the world

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

# Page navigation
page_nav:
    prev:
        content: Organization
        url: '/docs/concepts/Organization'
    next:
        content: Service
        url: '/docs/concepts/service'
---

The **organization metadata** is the off-chain description of a SingularityNET service and is, by default, hosted on the SingularityNET IPFS cluster.
In order to use a service, the client needs to know:

* The Organization metadata
* The Service metadata


There are three ways of providing this metadata to the clients and the daemons:

* as a simple JSON file
* as a IPFS hash that points to the JSON metadata
* as a name of service in the Registry - this can be resolved to an IPFS hash, pointing to the metadata, through the Registry's `OrgMetadataURI` method.
Please note that only the Owner of the Organization can modify the metadata 



A suspicious client should also check that hash of the metadata corresponds to the IPFS hash, otherwise the client can be attacked if the IPFS client is compromised.
Fortunately, the `snet-cli` does this by default.
`groups` Multiple groups can be associated with an organization , one payment type is associated with every 
`payment_address` Address of the Service provider who would receive the payment
`payment_channel_storage_type` Type of storge to manage payments ( For Example ETCD )
`endpoints` Storage end points for the clients to connect.
## Metadata Overview

```json
{
"org_name": "snet",
"org_id": "snet", 
"groups": [
    {
    "group_name": "default_group",
    "group_id": "EoFmN3nvaXpf6ew8jJbIPVghE5NXfYupFF7PkRmVyGQ=",
    "payment": {
        "payment_address": "0xd1C9246f6A15A86bae293a3E72F28C57Da6e1dCD",
        "payment_expiration_threshold": 100,
        "payment_channel_storage_type": "etcd",
        "payment_channel_storage_client": {
            "connection_timeout": "100s",
            "request_timeout": "5s",
            "endpoints": [
                "https://snet-etcd.singularitynet.io:2379"
            ]
        }
      }
    }
 ] 
}
```

This metadata file can be directly edited before publishing to IPFS, or manipulated by `snet-cli` through [service subcommands that have the `metadata-*` prefix](http://snet-cli-docs.singularitynet.io/service.html#Sub-commands:).
