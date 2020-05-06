---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Developers

---
## Service

The platform's primary reason for existence is to allow a diverse collection AI services to be bought and sold via a distributed marketplace. Anyone can publish the availability of their machine learning method, or integrated AI solution, and allow clients to interact with and pay for them directly.

These services are primarily meant to be AI or machine learning related, but there is no intrinsic limitation to what type of service can be offered. Indeed, the foundation or the community may end up implementing utility and adaptor services (such as image conversion) to allow services be composed more easily.

**A "service" is defined through it's specification and it's metadata.**

## Service Specification (Protocol Buffer Definition)

- Services define their API using <a href="https://developers.google.com/protocol-buffers/docs/reference/proto3-spec#service_definition" target="_blank">protocol buffers</a>. 
- This allows SingularityNET clients to determine the request/response schema programmatically. 
- The first step in setting up a service on the SingularityNet Platform is to define the service definition via protocol buffers.
- A sample proto file is available <a href="https://github.com/singnet/example-service/blob/master/service/service_spec/example_service.proto" target="_blank">here</a>


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


**Important:** Client must check that the hash of the metadata corresponds to the IPFS hash. Otherwise, If the IPFS client is compromised, the client system can become vulnerable to attack 
**Note:** By default, the snet-cli adheres to this verification. 


**Note**: 

The service provider needs to publish the details about the service in the Blockchain.

As a consumer, you may go the Blockchain or the Marketplace portal where the services are deployed.
Details like Service the price of the service ,
image depicting / related to the service , service type, description, the endpoint and how to make a request.

Please note that
- Singularity platform works on gRPC. Whenever you need to call you need a protofile.
- File management system such as IPFS stores the location of the hash and points to the associated protofile
    The IPFS can include a file and the same file returns same hash. 
    
## Metadata Overview

```
{
    "version": 1,
    "display_name": "Entity Disambiguation",
    "encoding": "proto",
    "service_type": "grpc",
    "model_ipfs_hash": "Qmd21xqgX8fkU4fD2bFMNG2Q86wAB4GmGBekQfLoiLtXYv",
    "mpe_address": "0x34E2EeE197EfAAbEcC495FdF3B1781a3b894eB5f",
    "groups": [
        {
            "group_name": "default_group",
            "free_calls": 12,
            "free_call_signer_address": "0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F",
            "daemon_address ": ["0x1234", "0x345"],
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
        "hero_image": "Qmb1n3LxPXLHTUMu7afrpZdpug4WhhcmVVCEwUxjLQafq1/hero_named-entity-disambiguation.png"
    },
    "service_description": {
        "url": "https://singnet.github.io/nlp-services-misc/users_guide/named-entity-disambiguation-service.html",
        "description": "Provide further clearity regaridng entities named within a piece of text. For example, \"Paris is the capital of France\", we would want to link \"Paris\" to Paris the city not Paris Hilton in this case.",
        "short_description": "text of 180 chars"
    },
    "contributors": [
            {
                "name": "dummy dummy",
                "email_id": "dummy@dummy.io"
            }
        ]
}

```

For more information about how to viewing the metadata using the python module, [CLI documentation](http://snet-cli-docs.singularitynet.io/) 