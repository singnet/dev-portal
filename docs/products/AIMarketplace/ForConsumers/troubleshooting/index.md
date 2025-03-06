# Troubleshooting. Frequently Asked Questions
## General:

### Where do I get test coins for deploying my organization and service?
TEST ETH: You can get them on public faucet for the particular network you are trying to use. Here is a couple:
 - No requirements: https://sepolia-faucet.pk910.de/ 
 - Requires at least 0.001 ETH in mainnet network: https://www.infura.io/faucet/sepolia 
 - Requires at least 0.001 ETH in mainnet network: https://www.alchemy.com/faucets/ethereum-sepolia  

TEST AGIX: 

 - No requirements: https://faucet.singularitynet.io/

## snet.cli:

### Can I use older versions of python to install snet.cli:
We strongly recommend using python version specified in prerequisites section of our repository. It can work on older version of python, however we can't guarantee that all functionality will work as inteneded. Use it at your own disgression

### While trying to use test network I get this error: `Exception: Netowrk sepolia is not in config`
Regenerate the CLI config file. To do this move existing config file located in `$HOME/.snet/config` somewhere else. After that run any `snet` command, this will generate new config with correct networks. After that you can copy your identity information from the old config to the new one.

### When I try to update organization or service metadata I get `execution reverted: unauthorized invocation` error
To update organization metadata you have to use owner identity of said organization (use the same private wallet key)

To update service metadata you have to be owner of organization that published the service; or you have to be added as a member of that organization by it's owner

### I get this error while calling the serivce:
```json
{"jsonrpc":"2.0","id":1,"error":{"code":-32005,"message":"daily request count exceeded, request rate limited","data":{"rate":{"allowed_rps":1,"backoff_seconds":30,"current_rps":2.6333333333333333},"see":"https://infura.io/dashboard"}}}" 429 Too Many Requests"
```

This issue relates to the limitations of our public RPC endpoint. To resolve this, we recommend creating your own **Alchemy** account to obtain a private RPC endpoint. Below are the steps to update your configuration:

### Update `snet-cli` Configuration

1. Open the `snet-cli` configuration file:
   ```bash
   nano $HOME/.snet/config
   ```

2. Replace the existing `ethereum_json_rpc_endpoint` with your Alchemy endpoint:
   ```json
   "ethereum_json_rpc_endpoint": "https://eth-mainnet.g.alchemy.com/v2/<your-alchemy-api-key>"
   ```

3. Save the file. To get your **Alchemy API Key**, follow [this guide](/docs/products/DecentralizedAIPlatform/Daemon/alchemy-api/).

---

### Update Daemon Configuration for Services

If this issue occurs with your services, update their daemon configuration:

- Locate and open the daemon configuration file (e.g., `daemon_config.json`).
- Add or update:
   ```json
   "ethereum_json_rpc_endpoint": "https://eth-mainnet.g.alchemy.com/v2/<your-alchemy-api-key>"
   ```
- Restart the daemon to apply changes.

## SNET Daemon:
### Daemon crashes after the start on `enabling SSL support via X509 keypair` step
Check `payment_channel` section of your daemon config to ensure that path to ETCD certificates is valid.

Also check the certificates themselves, reference our publication guide for correct certificates configuration

### Daemon crashes after the start on `PaymentChannelStorageClient="&{ConnectionTimeout:1m40s RequestTimeout:5s Endpoints:[https://?.?.?.?:2379/]}"` step
Make sure you use corresponding etcd_endpoint/daemon_configuration. If you specified `https` as the protocol in the organization metadata here `"payment_channel_storage_client": {"endpoints": [https://?.?.?.?:2379/]` you need to provide etcd certificates to the daemon. 

And conversely, remove them if you are running ETCD embeded in the daemon (embeded ETCD can only use http endpoint).

## Publisher/Marketplace:
### Marketplace shows that my service is down, but it is actually running
Most probable cause for this behaviour is outdated domain certificates which your daemon is using for secure connection. Check thier validity and update if necessary. The simplest way to check this - open your daemon heartbeat endpoint in the browser `https://your-service-endpoint:port/heartbeat`. If there is an issue with certificates, your browser will notify you that the connection is not secure.

### I started my service and daemon, but marketplace still shows that service is offline
Marketplace updates the status of the service on specified schedule, if you want to update it immediately you can send a GET request to this API, replace `org-id` and `service-id` with your org and service respectively
```
https://marketplace-mt-v2.singularitynet.io/service-status/org/<org-id>/service/<service-id>/health/reset
```


## Alerting mechanism - Emails Alerts


### Mainnet Alerts
Alert messages are sent through the email Id : no-reply@signularitynet.io
Subject : The service '**service-name**' is terminated for Mainnet network


### What to do when I receive an alert?
- Check whether the daemon end point heartbeats are healthy, and view the daemon logs
- Restart the daemon, and analyse why the daemon has suspended.
- Incorporate the post details in the document here as well. 

### How much time does it take for the service to become healthy on Dapp again?

The platform uses exponential back-off retry to test the health of the service. Each time a health check fails, an email message is sent to Service developer ( progressive delay in the next health check ). 


**Note**: The maximum time a test can take on the health service is 12hrs.

### How to configure service metadata to receive alerts ?
Obtain the latest version of snet-cli and run the following command:

```sh
snet service metadata-add-contributor <CONTACTNAME> <EMAILID> --metadata-file <MD_FILE>
```

Your metadata snippet should look like the following:

```json
"contributors": [
           {
               "name": "dummy dummy",
               "email_id": "dummy@dummy.io"
           }
]

```

### How to I configure the service heartbeat?

- Refer to the [documentation](https://github.com/singnet/snet-daemon/blob/master/metrics/README.md) provided.
- or the service heartbeat implementation, follow the standard health checking protocol as defined in [gRPC Health Checking] (https://github.com/grpc/grpc/blob/master/doc/health-checking.md) Protocol link. 

**Note**: The service must use the same proto and implement the heartbeat functionality.

### How to check or receive notification about certificate expiration ? 
Prior to the expiration of certificate, an email message is sent and a slack alert within 30 days. The email message is sent frequently until the certificate is renewed. 

**Note** This task is performed once in three days. 

### Mainnet Alerts on Certificates
Alert messages are sent through the email Id : no-reply@signularitynet.io 
Subject :
```
certificates are about to expire for service %s for %s network.
```
### Sepolia Alerts on Certificates
Alert messages are sent through the mail id : test-no-reply@singularitynet.io 
Subject :
```
certificates are about to expire for service %s for %s network.
```

## Common Setups

### NGINX
Since there is no direct support for grpc-web(dapp)from nginx, we can make a below hack in the config file of the nginx to work with both grpc-web(dapp) and grpc(sdk,snet-cli) calls.
```powershell
server {
    listen 1449 ssl http2;
    server_name `domain-name`;
    ssl_certificate `pem-file`; # managed by Certbot
    ssl_certificate_key `key-file`; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
 
    location / {
 
    #
    ## Any request with the content-type application/grpc+(json|proto|customType) will not enter the
    ## if condition block and make a grpc_pass while rest of the requests enters into the if block
    ## and makes a proxy_prass request. Explicitly grpc-web will also enter the if block.
    #
 
    if ($content_type !~ 'application\/grpc(?!-web)(.*)'){
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Transfer-Encoding,Custom-Header-1,X-Accept-Content-Transfer-Encoding,X-Accept-Response-Streaming,X-User-Agent,X-Grpc-Web,content-type,snet-current-block-number,snet-free-call-user-id,snet-payment-channel-signature-bin,snet-payment-type,x-grpc-web';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
        proxy_pass http://reroute_url;
    }
    grpc_pass grpc://reroute_url;
    }}
```
 
The above config works based on the content-type of the request. Whenever the grpc-web(dapp) makes a call to nginx, the content-type would be application/grpc-web and this content-type is not been handled by nginx with grpc_pass.
Hence, only those requests with grpc specified  content-type application/grpc+(proto|json|customType) works with grpc_pass while rest of the requests will work with proxy_pass.


### Setting up your own ETCD cluster 

To set up your own ETCD cluster please follow the [link](/docs/products/DecentralizedAIPlatform/Daemon/daemon-etcd-setup/)

### Certificates for ETCD 

To renew the ETCD Client Certificates for SNET Organization:
- Run the [etcd-client-certificates-generation](https://eu-central-1.console.aws.amazon.com/codesuite/codebuild/projects/etcd-client-certificates-generation/history?region=eu-central-1) job.
- This task generates the client-certificates in this [path](https://s3.console.aws.amazon.com/s3/buckets/codepipeline-us-east-1-publish/etcd/certificates/?region=us-east-1&tab=overview).
        
For other Organizations, follow the below steps to regenerate the etcd client certificates.
- Download the cfssl & cfssljson using the below commands

```sh
[curl -s -L -o cfssl] (https://pkg.cfssl.org/R1.2/cfssl_linux-amd64) 
[curl -s -L -o cfssl] (https://pkg.cfssl.org/R1.2/cfssl_linux-amd64)
```

- Copy the ca.pem, ca-key.pem, ca-config.json & client.json that you previously used for generating the etcd certificates.
- Run the below command to generate the client certificates.

### How to deploy an Organization and a Service on Sepolia? 
Complete the following steps listed in the [document](https://drive.google.com/open?id=1w9zYYB5HxrlXCgUKzCsgGbXRGzm75Cm0n0qbPeMhrRU) 


## Common issues with Daemon start

###You need to specify a valid signer address, such as 'free_call_signer_address' as part of the curation process to support free calls”

```bash
 snet service metadata-set-freecall-signer-address default_group $SIGNERADDRESS --metadata-file $MD_FILE
```

### Specify a valid private key 'pvt_key_for_metering' to include during the service publication process.”
When you enable the free calls and Metering, specify the private key to initialize the Daemon Otherwise, the  Daemon sends the request to metering, which checks the associated public address mapped in the configuration of that Daemon.

```bash
snet service metadata-add-daemon-addresses default_group $DAEMONADDRESS --metadata-file $MD_FILE
```

### Unable to create etcd client
To learn about how to configure the etcd certificate, refer to the [document](https://docs.google.com/document/d/1w9zYYB5HxrlXCgUKzCsgGbXRGzm75Cm0n0qbPeMhrRU/edit#heading=h.gtjqvnsibkk3) for configuration with example. 

### Metering authentication failed. Please verify the configuration”
When you enable the free calls and Metering, specify the private key to initialize the Daemon. The Daemon will initialize, only if the configured Pvt key config matches the public Address of the Daemon registered for metering.

Daemon addresses are registered for a given Org, Group id  and service id .
You need to re-publish the service again with the correct public address . Please use the 
Following command to do so 

```bash
snet service metadata-add-daemon-addresses default_group $DAEMONADDRESS --metadata-file $MD_FILE
```

## Common errors returned by the Daemon

### Payment signer is not valid for free calls

Check if the port number of your daemon matches exactly to what was deployed on Service metadata.
```bash
 snet service metadata-set-freecall-signer-address default_group $SIGNERADDRESS --metadata-file $MD_FILE
```

### Free call limit has been exceeded
You have exceeded the number of permitted free calls. So, calls can now be done only using the paid mode alone 

- End point deployed from Service metadata should be assigned to the same port / domain the daemon is starting. 

### Rate limiting, too many requests to handle”
The number of request has increased along with the rate limiting, either retry again later or configure your daemon for [rate limiting](https://github.com/singnet/snet-daemon/tree/master/ratelimit) 

### Unexpected payment type”
The supported payment types are free-call / escrow

### ETCD client connection issues 
```bash


github.com/singnet/snet-daemon/etcddb.getTlsConfig(0xc4207800c0, 0x1, 0x4)
        /ext-go/1/src/github.com/singnet/snet-daemon/etcddb/etcddb_client.go:107 +0x3f6
```
Please re check the etcd end point in organization metadata ,if the end point is valid , please check if you have the correct certificates ( for https connection) on your daemon [config](https://github.com/singnet/snet-daemon/tree/master/etcddb#etcd-client-configuration)

### gRPC message size (RESOURCE_EXHAUSTED)

If one (or more) of your components shows these kind of log:

Daemon:
```
level=warning msg="gRPC handler returned error" error="rpc error: code = ResourceExhausted desc = Received message larger than max (5937252 vs. 4194304)"
```
SNET-CLI and/or your service's gRPC server:
```sh
Error: <_InactiveRpcError of RPC that terminated with:
	status = StatusCode.RESOURCE_EXHAUSTED
	details = "Received message larger than max (5937252 vs. 4194304)"
	debug_error_string = "{"created":"@1585584826.407968689","description":"Received message larger than max (5937252 vs. 4194304)","file":"src/core/ext/filters/message_size/message_size_filter.cc","file_line":191,"grpc_status":8}"
>
```

Then you need to increase the MAX_MESSAGE_SIZE of the gRPC components, first set it in your Daemon by adding
this key to its `snetd.config.json`:

```json
"max_message_size_in_mb": 10,
```

Note: You can find out more about this key [here](https://github.com/singnet/snet-daemon#other-properties).

Next step is to increase the message size in your service's gRPC server:

```go
server : = grpc.NewServer(
        grpc.MaxSendMsgSize(10 * 1024 * 1024),
        grpc.MaxRecvMsgSize(10 * 1024 * 1024),
)
```

```python
server = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers), options=[
        ('grpc.max_send_message_length', 10 * 1024 * 1024),
        ('grpc.max_receive_message_length', 10 * 1024 * 1024)])
```
A practical python example can be found [here](https://github.com/singnet/dnn-model-services/blob/master/services/sound-spleeter/service/sound_spleeter_service.py#L62).

## Common Daemon warnings (in the logs)

### “Unable to publish metrics”
If you make calls using SDK / snet-cli, the issue is resolved once if the daemon supports metering.

### Invalid hex address specified/missing for 'authentication_address' in configuration , you cannot make remote update to current configurations”
Ignore: This was more towards the operator UI use case, need modification in the next release. 

### msg="error determining current block" error="403 Forbidden

Update your daemon configuration:

1. Open `daemon_config.json`.
2. Add or update:
   ```json
   "ethereum_json_rpc_endpoint": "https://eth-mainnet.g.alchemy.com/v2/<your-alchemy-api-key>"
   ```
3. Restart the daemon.

**Note**: Use your own Alchemy API key. [Get it here](https://www.alchemy.com/).



### How do I set up a new host ?
Typically you will need to do the below 
- Domain Name 
- GPU/Without GPU
- RAM Required
- HD Required
- Ports for public access
- Public Key to setup the user
- Certificates for HTTPS 

### How do I get the latest version of Daemon 
All latest released versions of Daemon are available [here](https://github.com/singnet/snet-daemon/releases)
- Download the latest 
- untar

You need to manually configure the path to refer to this binary.

### How do I get the latest version of snet-Client 

```bash
pip install --upgrade snet-cli  
```
 
**Note**: manually configure the path to refer to this binary.

### When there is proto change?
Ensure that you re deploy the service with the latest proto 
```bash
snet service metadata-init --metadata-file $MD_FILE `pwd`/$YOURGITREPONAME/$PATHFORSERVICESPEC "$DISPLAYNAME" --encoding proto --service-type grpc --group-name default_group
```
Also make sure  your stubs are updated on the Dapp Components

# DAPP

### My Service is not visible on Dapp 
- Ensure the services have been published on the network for testing

    
  After curation, the service becomes available on Dapp 

- Keep the below links for reference 
    
    Dapp for Sepolia: https://testnet-marketplace.singularitynet.io/
    
    Dapp for Mainnet: http://beta.singularitynet.io/

### How to make a call from the DAPP
- Open the respective service’s page.
- In the Service Demo section, you will notice the Free calls pending count, provided  you have already logged in to the system.
- Click on the **RUN FOR FREE** button. (If your free calls are exhausted, you will find options to create a wallet or to use your existing MetaMask wallet )
    
    You will be taken to the service’s input screen.
- Fill in the necessary details.
- Click on INVOKE.

**Note**: Don’t close the application, until the results are displayed  on the same screen after service execution. 

### Where do I see the components I can reuse on Dapp 

- Check for the reusable components code here  => snet-dapp-monorepo/packages/shared/src/components.
- You could also run yarn storybook to view the demo of the components.
- While importing, import the components from => snet-dapp-monorepo/packages/dist/components.

### How do I raise a Pull request for DApp
- Raise pull requests using “snet-dapp-monorepo/development”.
- After merging in the development. It will be deployed to the Sepolia network: https://testnet-marketplace.singularitynet.io/

### When does my Pull request gets merged to Master 
- If your changes are seen in [Sepolia](https://testnet-marketplace.singularitynet.io/). 
    
    Inform the concerned authority to merge the changes from development to master. This is then deployed to Mainnet network: http://beta.singularitynet.io/
    
### Whom and How  do I reach out for help/Support 
Use the email tech-support@singularitynet.io for any questions / issues related to the platform.
