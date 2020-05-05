# SingularityNET Tokyo Workshop Notes

This file contains notes for the SingularityNET workshop on April 4th, 2019 in Tokyo. The presentation slides on Google Sheets [can be found here](https://docs.google.com/presentation/d/1NEKfZP75fCdLJUDG3jVbUY01h4nUaPB6PeTBKZnWjCI).

## Related Material

For this workshop we require basic working knowledge of these technologies:
  - [Docker](https://github.com/wsargent/docker-cheat-sheet)
  - [Protobuf](http://blakesmith.me/2012/09/05/a-primer-on-protocol-buffers.html)
  - [gRPC](https://medium.com/@philipshen13/a-short-introduction-to-grpc-419b620e2177)

Recommended reading from the SingularityNET profile
  - [SingularityNET Developer Portal](https://dev.singularitynet.io)
  - [SingularityNET Documentation](https://dev.singularitynet.io/docs)
  - [SingularityNET Daemon](http://dev.singularitynet.io/docs/concepts/daemon)
  - [SingularityNET Registry](http://dev.singularitynet.io/docs/concepts/registry)
  - [SingularityNET MPE](http://dev.singularitynet.io/docs/concepts/multi-party-escrow)

The tutorials can also be found here:
  - [Publisher Tutorial](https://dev.singularitynet.io/tutorials/publish/)


## Docker image
The Docker image is similar to the [one from the tutorial page](https://github.com/singnet/dev-portal/blob/master/tutorials/docker/Dockerfile), but also contains source code of [example-service](https://github.com/singnet/example-service) and all main SingularityNET components.

To download the image (~800MB):
```sh
docker pull vsbogd/snet-platform:latest
docker tag  vsbogd/snet-platform:latest snet-tokyo-workshop
```

To build it from scratch:
```sh
docker build -t snet-tokyo-workshop https://github.com/elggem/dev-portal.git#master:/workshops/tokyo-workshop-20190404
```

To run the docker container, do this:
```sh
docker run --name snet-container -p 7000:7000 -ti snet-tokyo-workshop bash
```

# Tutorial Instructions

## Setup Ethereum identity

To create a service or make calls to a service, we need to establish our identity on the Blockchain. To do this, follow these steps:

```sh
# Create Ethereum identity from scratch, using seed mnemonic
snet identity create --mnemonic '<my mnemonic>' YOURNAME mnemonic
# OR create identity from existing private key (can be copied from Metamask):
snet identity create YOURNAME key

# Switch to Ropsten network
snet network ropsten
# Look at current snet-cli settings
snet session
# Look at identity balance
snet account balance
```

To receive AGI/ETH on ropsten, faucets can be used
  - https://faucet.singularitynet.io/
  - https://faucet.metamask.io/

## Review & build service

```sh
cd example-service
# Review service API
cat ./service/service_spec/*.proto
# Install dependencies
pip3 install -r requirements.txt
# Build gRPC stubs
sh buildproto.sh
```

## Publish service

```sh
# Create organization
snet organization create --org-id <my-org-id> '<my organization name>'
# Initialize service metadata
snet service metadata-init ./service/service_spec "Example service" 0xETHEREUM_PAYMENT_DESTINATION --endpoints http://<my.ip>:7000 --fixed-price 0.00000001
# Add service description
snet service metadata-add-description --json '{"description": "<my service descrition>", "url": "<my service url>"}'
# Review metadata
cat service_metadata.json
# Publish service
snet service publish <my-org-id> example-service
# Review organization
snet organization info <my-org-id>
```

## Start service
```sh
# Prepare config for Ropsten
cp snetd_configs/snetd.ropsten.json snetd.config.json
# Edit config
# - set port in daemon_end_point to 7000
# - set organization_id to <my-org-id>
# - set log.type to "stdout"
vim snetd.config.json
# Start service and daemon
python3 run_example_service.py --daemon-config snetd.config.json
```

## Call service
Open new console and execute:
```sh
# Switch to the new docker instance
docker exec -it snet-container bash
# Review account balance
snet account balance
# Deposit AGI tokens to MPE wallet
snet account deposit 0.0000001
# Open payment channel
snet channel open-init <my-org-id> example-service 0.0000001 +10days
# Channel id is returned
# Look at the channel state
snet client get-channel-state <channel-id> http://localhost:7000
# Call method
snet client call <my-org-id> example-service mul '{"a": 7, "b": 6}'
# Look how channel state was changed
snet client get-channel-state <channel-id> http://localhost:7000
# Check account balance
snet account balance
```

## Claim money
```sh
# Claim all money as service publisher
snet treasurer claim-all --endpoint http://localhost:7000
# Look how channel state was changed
snet client get-channel-state <channel-id> http://localhost:7000
# Check account balance
snet account balance
```
