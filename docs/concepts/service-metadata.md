---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Service Metadata
description: Describing your AI services to the world

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
        content: Service
        url: '/docs/concepts/service'
    next:
        content: Naming Standards
        url: '/docs/concepts/naming-standards'
---

The **service metadata** is the off-chain description of a SingularityNET service and is, by default, hosted on the SingularityNET IPFS cluster.
In order to use a service, the client needs to know:

* The service metadata
* The address of [Multi-Party Escrow (MPE) contract](/docs/concepts/multi-party-escrow)

Fortunately the latter is included in the metadata. The daemon allowing access to the service also needs to know this metadata, in order to configure the necessary payment systems.

There are three ways of providing this metadata to the clients and the daemons:

* as a simple JSON file
* as a IPFS hash that points to the JSON metadata
* as a name of service in the Registry - this can be resolved to an IPFS hash, pointing to the metadata, through the Registry's `getMetadataIPFSHash` method.

As a security concern the client shoudn't use `mpe_address` from the metadata as a sole source of the MPE contract address. The client should check that this address corresponds to the `mpe_address` it was expecting. The defaults MPE addresses for various networks are:

* Mainnet - `{{ site.data.contracts.mainnet.mpe }}`
* Ropsten - `{{ site.data.contracts.ropsten.mpe }}`
* Kovan (deprecated) - `{{ site.data.contracts.kovan.mpe }}`

A suspicious client should also check that hash of the metadata corresponds to the IPFS hash, otherwise the client can be attacked if the IPFS client is compromised.
Fortunately, the `snet-cli` does this by default.

## Metadata Overview

```js
{
    // used to track format changes (current version is 1)
    "version": 1,
    // Display name of the service
    "display_name": "example-service",
    // Service encoding (proto or json)
    "encoding": "proto",
    // Service type (grpc, jsonrpc or process)
    "service_type": "grpc",
   
    // IPFS HASH to the .tar archive of protobuf service specification
    "model_ipfs_hash": "QmSUGHW24YPjwMVhUnDwLExk4tgM8fVAKZCLqtLafbBQAu",
    // Address of MultiPartyEscrow contract.
    // - Client should use it for cross-checking of mpe_address
    // - Daemon can use it directly if authenticity of metadata is confirmed
    "mpe_address": "0x7E6366Fbe3bdfCE3C906667911FC5237Cc96BD08",
 
    "pricing": {
        "price_model": "fixed_price",
        "price_in_cogs": 10
    },
    // group is the number of endpoints which shares same payment channel
    //      grouping strategy is defined by service provider;
    //      for example service provider can use region name as group name
    //    group_name - unique name of the group (human readable)
    //    group_id   - unique id of the group (random 32 byte string in base64 encoding)
    //    payment_address - Ethereum address to recieve payments
  "groups": [
         {
             "group_name": "default_group",
                // Pricing model
                // Design supports for Multiple pricing models:
                // 1. Fixed price
                //    price_model   - "fixed_price"
                //    price_in_cogs -  unique fixed price in cogs for all method (1 AGI = 10^8 cogs)
                // (other pricing models can be easily supported)
             "pricing": [
                 {
                     "price_model": "fixed_price",
                     "price_in_cogs": 1,
                     "default": true
                 }
             ],
             // Each entry specifies an endpoint URL for where the service is available,
             // and the corresponding payment group the replica belonds to
             "endpoints": [
                 "https://tz-services-1.snet.sh:8005"
             ],
             "group_id": "EoFmN3nvaXpf6ew8jJbIPVghE5NXfYupFF7PkRmVyGQ="
         }
     ],
    // Associate your service with an image 
     "assets": {
            "hero_image": "Qmb1n3LxPXLHTUMu7afrpZdpug4WhhcmVVCEwUxjLQafq1/hero_named-entity-disambiguation.png"
        },
      //Description of your service and add any links you wish to further link it with 
        "service_description": {
            "url": "https://singnet.github.io/nlp-services-misc/users_guide/named-entity-disambiguation-service.html",
            "description": "Provide further clearity regaridng entities named within a piece of text. For example, \"Paris is the capital of France\", we would want to link \"Paris\" to Paris the city not Paris Hilton in this case."
        }
 
}
```

This metadata file can be directly edited before publishing to IPFS, or manipulated by `snet-cli` through [service subcommands that have the `metadata-*` prefix](http://snet-cli-docs.singularitynet.io/service.html#Sub-commands:).

The python module for manipulating this metadata directly can be found [here](https://github.com/singnet/snet-cli/blob/master/snet_cli/mpe_service_metadata.py).
