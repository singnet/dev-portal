# Frequently Asked Questions

# General:

## Where do I get test coins for deploying my organization and service?
TEST ETH: You can get them on public faucet for the particular network you are trying to use. Here is a couple:
 - No requirements: https://sepolia-faucet.pk910.de/ 
 - Requires at least 0.001 ETH in mainnet network: https://www.infura.io/faucet/sepolia 
 - Requires at least 0.001 ETH in mainnet network: https://www.alchemy.com/faucets/ethereum-sepolia  

TEST AGIX: Our AGIX faucet will be updated soon to support Sepolia network

# SNET-cli:
## Can I use older versions of python to install SNET-cli:
We strongly recommend using python version specified in prerequisites section of our repository. It can work on older version of python, however we can't guarantee that all functionality will work as inteneded. Use it at your own disgression

## While trying to use test network I get this error: `Exception: Netowrk sepolia is not in config`
Regenerate the CLI config file. To do this move existing config file located in `$HOME/.snet/config` somewhere else. After that run any `snet` command, this will generate new config with correct networks. After that you can copy your identity information from the old config to the new one.

## When I try to update organization or service metadata I get `execution reverted: unauthorized invocation` error
To update organization metadata you have to use owner identity of said organization (use the same private wallet key)

To update service metadata you have to be owner of organization that published the service; or you have to be added as a member of that organization by it's owner

## I get this error while calling the serivce:
```json
{"jsonrpc":"2.0","id":1,"error":{"code":-32005,"message":"daily request count exceeded, request rate limited","data":{"rate":{"allowed_rps":1,"backoff_seconds":30,"current_rps":2.6333333333333333},"see":"https://infura.io/dashboard"}}}" 429 Too Many Requests"
```

This is an issue with our public RPC endpoint. We are currently working on the solution to this problem. At this moment we recomend creating your own infura account to get private RPC endpoint. You have to update endpoint url inside your snet-cli config file which is located here: `$HOME/.snet/config`. Replace existing values to your own infura or similar RPC providers, but be aware that you need to use same network.

If you have this issue calling your own services, update the daemon configuration of your services. Add this value to your daemon config: `'ethereum_json_rpc_endpoint': 'https://mainnet.infura.io/v3/<your-endpoint-id>'` 

# SNET-daemon:
## Daemon crashes after the start on `enabling SSL support via X509 keypair` step
Check `payment_channel` section of your daemon config to ensure that path to ETCD certificates is valid.

Also check the certificates themselves, reference our publication guide for correct certificates configuration

## Daemon crashes after the start on `PaymentChannelStorageClient="&{ConnectionTimeout:1m40s RequestTimeout:5s Endpoints:[https://?.?.?.?:2379/]}"` step
Make sure you use corresponding etcd_endpoint/daemon_configuration. If you specified `https` as the protocol in the organization metadata here `"payment_channel_storage_client": {"endpoints": [https://?.?.?.?:2379/]` you need to provide etcd certificates to the daemon. 

And conversely, remove them if you are running ETCD embeded in the daemon (embeded ETCD can only use http endpoint).

# Publisher/Marketplace:
## Marketplace shows that my service is down, but it is actually running
Most probable cause for this behaviour is outdated domain certificates which your daemon is using for secure connection. Check thier validity and update if necessary. The simplest way to check this - open your daemon heartbeat endpoint in the browser `https://your-service-endpoint:port/heartbeat`. If there is an issue with certificates, your browser will notify you that the connection is not secure.

## I started my service and daemon, but marketplace still shows that service is offline
Marketplace updates the status of the service on specified schedule, if you want to update it immediately you can send a GET request to this API, replace `org-id` and `service-id` with your org and service respectively
```url
https://marketplace-mt-v2.singularitynet.io/service-status/org/<org-id>/service/<service-id>/health/reset
```
