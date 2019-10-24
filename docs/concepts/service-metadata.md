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
    "version": 2,
    "display_name": "Entity Disambiguation",
    "encoding": "proto",
    "service_type": "grpc",
    "model_ipfs_hash": "Qmdxxxhggjkkgk6wAB4GmGBekQfLoiLtXYv",
    "mpe_address": "0x34E2EeE197EfAAbEcC495FdF3B1781a3b894eB5f",
    "groups": [
        {
            "group_name": "default_group",
            "pricing": [
                {
                    "price_model": "fixed_price",
                    "price_in_cogs": 1,
                    "default": true
                }
            ],
            "endpoints": [
                "https://tz-services-1.snet.sh:8005"
            ],
            "group_id": "EoFmN3nvaXpf6ew8jJbIPVghE5NXfYupFF7PkRmVyGQ="
        }
    ],
    "assets": {
        "hero_image": "QmbaewdfafrpZdpug4WhhcmVVCEwUxjLQafq1/hero_named-entity-disambiguation.png"
    },
    "service_description": {
        "url": "https://dummy.io/sadds/users_guide/named-entity-disambiguation-service.html",
        "description": "Provide further clearity regaridng entities named within a piece of text. For example, \"Paris is the capital of France\", we would want to link \"Paris\" to Paris the city not Paris Hilton in this case."
    }
}
```

This metadata file can be directly edited before publishing to IPFS, or manipulated by `snet-cli` through [service subcommands that have the `metadata-*` prefix](http://snet-cli-docs.singularitynet.io/service.html#Sub-commands:).

The python module for manipulating this metadata directly can be found [here](https://github.com/singnet/snet-cli/blob/master/snet_cli/mpe_service_metadata.py).