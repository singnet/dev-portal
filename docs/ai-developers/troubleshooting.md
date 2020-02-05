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

# Common issues with Daemon start

###You need to specify a valid signer address, such as 'free_call_signer_address' as part of the curation process to support free calls”

Refer to the document on metering configurations with example.

###Specify a valid private key 'pvt_key_for_metering' to include during the service publication process.”
When you enable the free calls and Metering, specify the private key to initialize the Daemon Otherwise, the  Daemon sends the request to metering, which checks the associated public address mapped in the configuration of that Daemon.

Refer to the document on metering configurations and an example 

### unable to create etcd client
To learn about how to configure the etcd certificate configuration with an example, refer to the document 

###Metering authentication failed. Please verify the configuration”
When you enable the free calls and Metering, specify the private key to initialize the Daemon. The Daemon will initialize, only if the configured Pvt key config matches the public Address of the Daemon registered for metering.

Daemon addresses are registered for a given Org, Group id  and service id .
You need to re-publish the service again with the correct public address . Please use the 
Following command to do so 

```
snet service metadata-add-daemon-addresses default_group $DAEMONADDRESS --metadata-file $MD_FILE
```
If the issue is still unresolved, contact the #services-integration channel

#Common errors returned by the Daemon

###Payment signer is not valid

Check if the port number of your daemon matches exactly to what was deployed on Service metadata.

For Ropsten make sure you have the below config 
```
"free_call_signer_address": "0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F",
"metering_end_point": "https://ropsten-marketplace.singularitynet.io/metering",
```

For mainnet make sure you have the below config 
```
"free_call_signer_address":"0x3Bb9b2499c283cec176e7C707Ecb495B7a961ebf",
"metering_end_point": "https://mainnet-marketplace.singularitynet.io/metering",
```

### Free call limit has been exceeded.
You have exceeded the number of permitted free calls. So, calls can now be done only using the paid mode alone 

- End point deployed from Service metadata should be assigned to the same port / domain the daemon is starting. 

### Rate limiting, too many requests to handle”
The number of request has increased along with the rate limiting, either retry again later or configure your daemon for rate limiting 

### Unexpected payment type”
The supported payment types are free-call / escrow

# Common Daemon warnings (in the logs)

### “Unable to publish metrics”
If you make calls using  SDK / snet-cli, the issue is resolved once the daemon supports metering .

###invalid hex address specified/missing for 'authentication_address' in configuration , you cannot make remote update to current configurations”
Ignore: This was more towards the operator UI use case, need modification in the next release. 

###msg="error determining current block" error="403 Forbidden
Add the the following link: 

```
"ethereum_json_rpc_endpoint": "https://mainnet.infura.io/v3/e7732e1f679e461b9bb4da5653ac3fc2" 
```
n your daemon configuration. Ideally  you should have your own project Id on infura. 

###How do I set up a new host 
Post your request on the #services-integration channel with the following details: 
- Domain Name 
- GPU/Without GPU
- RAM Required
- HD Required
- Ports for public access
- Public Key to setup the user

###How do I get the latest version of Daemon 
All latest released versions of Daemon are available here.

With the newer version of Daemon getting released, a script is available for you. 
- Download the latest (Will automatically pull the latest one for you) 
- untar

You  need to manually configure the path to refer to this binary.

### How do I get the latest version of snet-Client 

```
pip install --upgrade snet-cli  
```
 
**Note**: manually configure the path to refer to this binary.

###Where do I update service details 
Retain this sheet on your Fav / Handy . All new services / updates to the existing services are necessarily done here .
### Whom do I reach out to for any changes on mainnet  
Post your query on the channel #services-integration 
If you do not hear back in a day , please escalate to the concerned authority.
###What to when I notice a proto change?
Ensure that the proto file is updated and checked into Git.
If the path of your proto has changed indicate it in the column ‘FOLDER Location to your proto definition in Github’ on the document here . 

Post your query on the channel #services-integration 

#DAPP

###My Service is not visible on Dapp 
- Ensure whether the service has been published on the network you are testing?
    
    If the service has been published successfully, then approach the channel ##services-integration to curate the service.
    
    After curation, the service becomes available on Dapp 

- Keep the below links handy 
    
    Dapp for Ropsten: http://enhanced-marketplace.s3-website-us-east-1.amazonaws.com/
    
    Dapp for Mainnet: http://beta.singularitynet.io/

###How to make a call from the DAPP
- Open the respective service’s page.
- In the Service Demo section. You will see the Free calls pending count, provided that you are already logged in to the system.
- Click on the RUN FOR FREE button. (If your free calls are exhausted, you will find options to create a wallet or to use your existing MetaMask wallet )
    
    You will be taken to the service’s input screen.
- Fill in the necessary details.
- Click on INVOKE.

**Note**: Don’t close the application, until the service is executes, and the results are displayed  on the same screen. 

###Where do I see the components I can reuse on Dapp 

- Check for the reusable components’ code here  => snet-dapp-monorepo/packages/shared/src/components.
- You could also run yarn storybook to view the demo of the components.
- While importing, Import the components from => snet-dapp-monorepo/packages/dist/components.
###How do I raise a Pull request for DApp
- Raise pull requests against “snet-dapp-monorepo/development”.
- Once it is merged in the development. It will be deployed to the ropsten network:http://enhanced-marketplace.s3-website-us-east-1.amazonaws.com/
###When does my Pull request gets merged to Master 
- If your changes are shown in ropsten. Inform the concerned authority to merge the changes from development to master. This is then deployed to mainnet network: http://beta.singularitynet.io/
###Whom and How  do I reach out for help/Support 
Please use the channel #platform-support for any questions / issues related to platform 
- Use the #services-integration
- If no response is received within a Day’s time, escalate to the concerned authority.
###Utilization  stats 
- Summary of failed / successful calls 
- Work in progress 

