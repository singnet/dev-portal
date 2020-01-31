---
# Page settings
layout: default
keywords: intro concepts
comments: false



---

## Service Metadata
The service metadata is the off-chain description of a SingularityNET service and is, by default, hosted on the SingularityNET IPFS cluster. To use a service, the client needs to know the following:
- The service metadata
- The address of Multi-Party Escrow (MPE) contract
Fortunately, the latter is included in the metadata. 

The daemon which allows access to the service, needs information about the metadata to configure the payment systems.

There are three ways of providing metadata details to the clients and the daemons:
- Simple JSON file
- IPFS hash that points to the JSON metadata
- Name of service in the Registry - this can be resolved to an IPFS hash, pointing to the metadata, through the Registry’s getMetadataIPFSHash method.

**Note:** The client using the mpe_address from the metadata should not adhere to this as a primary source of information, for the sake of security. The client should check that this address corresponds to the expected mpe_address . 

The following are the defaults MPE addresses for various networks:
- Mainnet - 0x9c9252ec9fa844e2c7bd2e6f54bec2901938479f
- Ropsten - 0x7e6366fbe3bdfce3c906667911fc5237cc96bd08
- Kovan (deprecated) - 0x39f31ac7b393fe2c6660b95b878feb16ea8f3156

**Important:** Client must check that the hash of the metadata corresponds to the IPFS hash. Otherwise, If the IPFS client is compromised, the client system can become vulnerable to attack 
**Note:** By default, the snet-cli adheres to this verification. 

## Metadata Overview

```
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
You can edit the metadata file before publishing to IPFS, or perform changes using snet-cli through service subcommands that have the metadata-* prefix.
For more information about how to manipulate the metadata using the python module, **click on this link here.**