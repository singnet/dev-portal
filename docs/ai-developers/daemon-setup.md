---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: AI Developers

---


## Get the Latest Binary 
Download the latest Daemon [here](https://github.com/singnet/snet-daemon/releases/latest)

## SSL Configuration
The SingularityNet Daemon is designed to be deployed as a sidecar proxy alongside the service on a given host. All communication to the daemon needs to be secured using SSL and can be achieved in the following ways
* Set up the daemon behind an nginx server
* Use SSL certificates. <a href="https://dev.singularitynet.io/docs/ai-developers/daemon-ssl-setup/" target="_blank">This</a> guide walks thru the process of obtaining SSL certificates from Let's Encrypt


## Configuration 

The daemon needs to be configured for it to work with the corresponding AI service. For a detailed list of configurations available , please check [here](https://github.com/singnet/snet-daemon)
 ```json
{
 "daemon_end_point": "0.0.0.0:8088",
 "ipfs_end_point": "http://ipfs.singularitynet.io:80",
 "passthrough_enabled": true,
 "passthrough_endpoint": "http://localhost:3000",
 "organization_id": "yourorganization",
 "service_id": "yourserviceid",
 "payment_channel_cert_path": "/home/adminuser/Downloads/ca.pem",
 "payment_channel_ca_path": "/home/adminuser/Downloads/ca.pem",
 "payment_channel_key_path": "/home/adminuser/Downloads/client-key.pem",
 "blockchain_network_selected": "ropsten",
 "ethereum_json_rpc_endpoint": "https://ropsten.infura.io/v3/<YourRegisterdinfuraiID>"
}

``` 
You could also build a default configuration for Daemon by 
```sh
$ ./build/snetd-linux-amd64 init 
```

### Key Configurations
* **blockchain_network_selected**
  <br/>
  Should be main for production use. Other supported values are kovan,ropsten or local which are to be used for testing only
   ```json
   "blockchain_network_selected": "main",
   ```   

* **ssl_cert and ssl_key**
  <br/>
  If you are using your own certificates (or from Let's Encrypt as described <a href="https://dev.singularitynet.io/docs/ai-developers/daemon-ssl-setup/" target="_blank">here</a>) add the following two entries to the daemon config
   ```json
   "ssl_cert": "/etc/letsencrypt/live/<daemon_domain>/fullchain.pem",
   "ssl_key": "/etc/letsencrypt/live/<daemon_domain>/privkey.pem",
   ``` 
* **passthrough_endpoint**
  <br/>
  This is the AI service end point to which the daemon will proxy all requests.
   ```json
   "passthrough_endpoint": "http://localhost:3000",
   ``` 
* **daemon_end_point**
  <br/>
  This is the endpoint on which the daemon listens for requests and should be in the `<host>:<port>` format. This address should be publically accessible
   ```json
   "daemon_end_point": "0.0.0.0:7002",
   ```   

* **organization_id**
  <br/>
  ID of the organization (as set up on the SingularityNet platform) that this daemon belongs to.
   ```json
   "organization_id": "snet",
   ```   

* **service_id**
  <br/>
  ID of the service (as set up on the SingularityNet platform) that this daemon is proxys requests for. The daemon will fetch configuration from the SingularityNet platform based on the `organization_id` and `service_id`
   ```json
   "service_id": "example-service",
   ```   


The daemon <a href="https://github.com/singnet/snet-daemon#configuration" target="_blank">configuration</a> page has all the available configurations

## Start Daemon
```sh
./snetd-linux-amd64 --config <config_file_name>
```
