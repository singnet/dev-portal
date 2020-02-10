---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Consumers

# Micro navigation
micro_nav: true

---

## Organization Metadata

The organization metadata is the description of a SingularityNET service and is, by default, hosted on the SingularityNET IPFS cluster. In order to use a service, the client needs to know the following:
- The Organization metadata
- The Service metadata
There are three ways of providing this metadata to the clients and the daemons:
- Simple JSON file
- IPFS hash that points to the JSON metadata
- Name of service in the Registry 
    The Name of service in the Registry, can be resolved to an IPFS hash, pointing to the metadata, using the Registry’s OrgMetadataURI method. 
    **Note:** Only the Owner of the Organization can modify the metadata.
**Important:** Client must check that the hash of the metadata corresponds to the IPFS hash. Otherwise, If the IPFS client is compromised, the client system can become vulnerable to attack
**Note:** By default, the snet-cli adheres to this verification.

## Description of Fields in metadata file
The following is the list of filed types and their description.
**type** : Describes of this is an Individual or a Company organization contacts : Stores the contacts related to an Organization , you can have multiple contacts contact_type : Describes the contact type , example support etc; email_id : Email associated with this contact phone : Phone number associated with this contact
**assets** : used to refer to the image associated with an Organization. Image is uploaded on to ipfs and referenced here.
**groups** : Multiple groups can be associated with an organization, one payment type is associated with every group.
**payment_address** : Address of the Service provider who would receive the payment
**payment_channel_storage_type** : Type of storage to manage payments ( For Example ETCD )
**endpoints** : Storage end points for the clients to connect.

## Metadata example

```
"org_name": "snet",
"org_id": "snet", 

 "type": "individual",
    "contacts": [
        {
            "contact_type": "support",
            "email_id": "abcd@abcdef.com",
            "phone": "1234567890"
        },
        {
            "contact_type": "contact-us",
            "email_id": "dummy@abcdef.com",
            "phone": "1234567890"
        }
    ],
    "description": {
        "description": "Describe your organization details here ",
        "short_description": "This is short description of your organization",
        "url": "https://anyurlofyourorganization"
    },
    "assets": {
        "hero_image": "QmNW2jjz11enwbRrF1mJ2LdaQPeZVEtmKU8Uq7kpEkmXCc/hero_orgImage.png"
    },
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
                "https://etcdendpoint:2379"
            ]
        }
      }
    }
 ] 
}

```

This metadata file can be directly edited before publishing to IPFS, or manipulated by snet-cli through service subcommands that have the metadata-* prefix.
