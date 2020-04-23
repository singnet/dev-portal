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
## Publishing Organization on Blockchain using snet-cli


### Setting Metadata

#### Create an Identity in snet-cli for Mainnet, if you already have an account with ether , then you can use it , as an example 

```sh
snet identity create test-user key --private-key <PVT-KEY> --network mainnet
```
#### Add the organization name, id and the type of organization
test-org-name is the organization name and test-org-id is the organization id. 

```sh
snet organization metadata-init test-org-name test-org-id individual
```
The following code snippet is included in the metadata file:  
```json
    "org_name": "test-org-name",
    "org_id": "test-org-id",
    "org_type": "individual",

```

#### Add in description about your organization
```sh
snet organization metadata-add-description [-h] [--description DESCRIPTION]
                                           [--short-description SHORT_DESCRIPTION]
                                           [--url URL]
                                           [--metadata-file METADATA_FILE]
```

Example 
```sh
snet organization metadata-add-description --description "Describe your organization details here " --short-description  "This is short description of your organization" --url "https://anyurlofyourorganization"
```

the below will be added in to the metadata file 
```json
    "description": {
        "description": "Describe your organization details here ",
        "short_description": "This is short description of your organization",
        "url": "https://anyurlofyourorganization"
    },
```


#### Add in Recipient and group details 
Use the same endpoint mentioned in the previous step, to setup the etcd cluster.  

**groups** : Multiple groups can be associated with an organization, one payment type is associated with every group.
**payment_address** : Address of the Service provider who would receive the payment
**payment_channel_storage_type** : Type of storage to manage payments ( For Example ETCD )
**endpoints** : Storage end points for the clients to connect.

```sh
snet organization add-group <group_name> <wallet_address> <etcd-end-point>
```

Example 
```sh
snet organization add-group default_groups 0x06A1D29e9FfA2415434A7A571235744F8DA2a514 https://your-etcdendpont:2379
```
This would append the below to the json
```json
"groups": [
        {
            "group_name": "default_groups",
            "group_id": "gz/+/M9l/qxpfNzPn+T2XmTSPMKyphYyxSsQSPhEJXA=",
            "payment": {
                "payment_address": "0x06A1D29e9FfA2415434A7A571235744F8DA2a514",
                "payment_expiration_threshold": 100,
                "payment_channel_storage_type": "etcd",
                "payment_channel_storage_client": {
                    "connection_timeout": "100s",
                    "request_timeout": "5s",
                    "endpoints": [
                        "https://your-etcdendpont:2379"
                    ]
                }
            }
        }
    ]

```

#### Add in any images related to your organization 

```sh
snet organization metadata-add-assets [-h] [--metadata-file METADATA_FILE] ASSET_FILE_PATH ASSET_TYPE
```
Example
```sh
snet organization metadata-add-assets image.png  hero_image
```
Appends the following snippet code to the json script

```json
    "assets": {
        "hero_image": "QmT3WWHEVsdQw5dD9TB4e1Xej2MfcQNrQS8FAHwBepG3HD/image.png"
    },


```

#### Add in any contact details related to your organization
```sh
snet organization metadata-add-contact [-h] [--phone PHONE] [--email EMAIL]
                                       [--metadata-file METADATA_FILE]
                                       contact_type
```
Example
```sh
 snet organization metadata-add-contact --phone 123456789 --email yourorg@yourorg support
```
Appends the following snippet code to the json script
```json
    "contacts": [
        {
            "contact_type": "support",
            "email_id": "yourorg@yourorg",
            "phone": "123456789"
        }
    ],

```
Now check the metadata file created 

```sh
cat organization_metadata.json
```

### Publish the organization 
Ensure that you have an account with Ether to perform update/delete/add services for a particular organization.

**Note** Only the owner is eligible to modify the metadata of an organization.



```sh
snet organization create mozi <addressofMember1>,<addressOfMember2>
```

See the [CLI documentation](http://snet-cli-docs.singularitynet.io/organization.html) for full details of actions the tool allows.



