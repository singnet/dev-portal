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
#Publishing Organization on Blockchain

### Groups and Recipient information
**groups** : Multiple groups can be associated with an organization, one payment type is associated with every group.
**payment_address** : Address of the Service provider who would receive the payment
**payment_channel_storage_type** : Type of storage to manage payments ( For Example ETCD )
**endpoints** : Storage end points for the clients to connect.

### Setting Metadata

Create an Identity in snet-cli for mainnet , if you already have an account with ether , then you can use it , as an example 

```sh
snet identity create test-user key --private-key <PVT-KEY> --network mainnet
```

test-org-name is the organization name and test-org-id is the organization id. 


```sh
snet organization metadata-init test-org-name test-org-id
```


The etcd cluster has been set up from the previous step and you need to use the same endpoint 

```sh
snet organization add-group <group_name> <wallet_address> <etcd-end-point>
```
Add in any images related to your organization 

```sh
snet organization metadata-add-assets [-h] [--metadata-file METADATA_FILE] ASSET_FILE_PATH ASSET_TYPE
```

Add in any contact details related to your organization
```sh
snet organization metadata-add-contact [-h] [--phone PHONE] [--email EMAIL]
                                       [--metadata-file METADATA_FILE]
                                       contact_type
```

Now check the metadata file created 

```sh
cat organization_metadata.json
```

Members can update/delete/add services under the given organization , however
only the owner can modify the metadata of an organization.

Publish the organization . Please note you will need an account with Ether to do the below

```sh
snet organization create mozi <addressofMember1>,<addressOfMember2>
```

See the [CLI documentation](http://snet-cli-docs.singularitynet.io/organization.html) for full details of actions the tool allows.



