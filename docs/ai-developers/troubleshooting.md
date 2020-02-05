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

## Troubleshooting

# Alerting mechanism 
## Emails Alerts

### Mainnet Alerts
Alert messages are sent through the email Id : no-reply@signularitynet.io 
Subject : The service example-service is terminated for mainnet network
### opsten Alerts 
Alert messages are sent through the mail id : test-no-reply@singularitynet.io 
Subject : The service example-service is terminated for ropsten network
### Slack Alerts 
Subscribe for slack alerts on the channel   #mainnet-service-alerts for production monitoring. 

###What to do when I receive an alert ?
- Check whether the daemon end point heartbeats are healthy, and view the daemon logs
- Restart the daemon, and analyse why the daemon has suspended.
- Incorporate the post details in the document here as well. 

###How much time does it take for the service to become healthy on Dapp again?

The platform uses exponential back-off retry to test the health of the service. Each time a health check fails, an email message is sent to Service developer ( progressive delay in the next health check ). 


**Note**: The maximum time a test on the health service is 12hrs.

###How to configure service metadata to receive alerts ?
Obtain the latest version of snet-cli and run the following command:

```
snet service metadata-add-contributor <CONTACTNAME> <EMAILID> --metadata-file <MD_FILE>
```

Your metadata snippet should look like the following:

```
"contributors": [
           {
               "name": "dummy dummy",
               "email_id": "dummy@dummy.io"
           }

```

### How to I configure the service heartbeat?

- Refer to the documentation provided.
- or the service heartbeat implementation, follow the standard health checking protocol as defined in gRPC Health Checking Protocol link. 

**Note**: The service must use the same proto and implement the heartbeat functionality.

### How to check or receive notification about certificate expiration ? 
Prior to the expiration of certificate, an email message is sent and a slack alert within 30 days. The email message is sent frequently until the certificate is renewed. 

**Note** This task is performed once in three days. 

###Mainnet Alerts
Alert messages are sent through the email Id : no-reply@signularitynet.io 
Subject :
```
certificates are about to expire for service %s for %s network.
```
###Ropsten Alerts 
Alert messages are sent through the mail id : test-no-reply@singularitynet.io 
Subject :
```
certificates are about to expire for service %s for %s network.
```

#Common Setups

##NGINX
### Setting up your own ETCD cluster 

To set up your own ETCD cluster please follow the link here

### Certificates for ETCD 
For snet, all ETCD storage, appropriate certificates are available at drive  

To renew the ETCD Client Certificates for SNET Organisation:
- Run the etcd-client-certificates-generation job.
- This task generates the client-certificates in this path.
        
For other Organisations, follow the below steps to regenerate the etcd client certificates.
- Download the cfssl & cfssljson using the below commands

```
curl -s -L -o cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
curl -s -L -o cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd6
```

- Copy the ca.pem, ca-key.pem, ca-config.json & client.json that you previously used for generating the etcd certificates.
- Run the below command to generate the client certificates.

### How to deploy an Organization and a Service on Ropsten? 
Complete the following steps listed in the document 

###Allow the shared drive to monitor service configurations. 
A folders already exists for all services under snet , this folder name is mapped to the service_id of your service.

Upload the configuration information, regression test results, hero image and the demon configurations details to the respective folders 
https://drive.google.com/drive/folders/0AJYSxYnxHqLVUk9PVA
