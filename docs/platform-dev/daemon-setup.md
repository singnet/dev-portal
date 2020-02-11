---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: AI Developers

---


## Get the Latest Binary 
Download the latest Daemon [Released](https://github.com/singnet/snet-daemon/releases)

## Sample Configuration 

For a detailed list of configurations available , please check [here](https://github.com/singnet/snet-daemon)
 ```json
{
 "daemon_end_point": "0.0.0.0:8088",
 "ipfs_end_point": "http://ipfs.singularitynet.io:80",
 "passthrough_enabled": true,
 "passthrough_endpoint": "http://localhost:3000",
 "organization_id": "yourorganization",
 "service_id": "yourserviceid",
 "pvt_key_for_metering":"Provided to you already",

 "payment_channel_cert_path": "/home/adminuser/Downloads/ca.pem",
 "payment_channel_ca_path": "/home/adminuser/Downloads/ca.pem",
 "payment_channel_key_path": "/home/adminuser/Downloads/client-key.pem",
 "|Blockchain_network_selected": "ropsten",
 "ethereum_json_rpc_endpoint": "https://ropsten.infura.io/v3/<YourRegisterdinfuraiID>",
}

``` 