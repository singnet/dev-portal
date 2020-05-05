#!/bin/sh

start_environment.sh

cd ${ROOT}
git clone --depth 1 https://github.com/singnet/example-service.git
cd example-service
pip3 install -r requirements.txt
sh buildproto.sh

snet identity deployer
ACCOUNT=`snet account print`
snet organization metadata-init example-org example-org organization
snet organization add-group default_group $ACCOUNT http://localhost:2379
snet organization create example-org -y

snet service metadata-init service/service_spec "Example Service" \
	--group-name default_group --endpoints http://localhost:7000 \
	--fixed-price 0.00000001
snet service metadata-add-description --json '{"description": "Example service description", "url": "https://example.service.users.guide"}'
snet service metadata-set-free-calls default_group 15
snet service metadata-set-freecall-signer-address default_group ${DEPLOYER_ADDR}
snet service publish example-org example-service -y

rm snetd_configs/*
cat <<EOF >snetd_configs/snetd.local.json
{
  "daemon_end_point": "0.0.0.0:7000",
  "ipfs_end_point": "http://localhost:5002",
  "blockchain_network_selected": "local",
  "passthrough_enabled": true,
  "passthrough_endpoint": "http://localhost:7003",
  "organization_id": "example-org",
  "service_id": "example-service",
  "pvt_key_for_metering": "c71478a6d0fe44e763649de0a0deb5a080b788eefbbcf9c6f7aef0dd5dbd67e0",

  "log": {
    "level": "debug",
    "output": {
      "current_link": "./snetd-local.log",
      "file_pattern": "./snetd-local.%Y%m%d.log",
      "rotation_count": 0,
      "rotation_time_in_sec": 86400,
      "type": "file"
    }
  }
}
EOF

snet identity deployer
snet account deposit 1000 -y
snet account transfer $CALLER_ADDR 300 -y
snet account transfer $PUBLISHER_ADDR 300 -y
snet identity caller
snet channel open-init example-org default_group 3 +10days -y
