#!/bin/sh

if [ -z "$1" ]
  then
    echo "Invalid PAYMENT_ADDRESS: ./publishAndStartService.sh PAYMENT_ADDRESS"
    exit 1
fi

TMP_FILE=/tmp/__SNET_SERVICE_PUBLISH_LOG.txt
rm -f $TMP_FILE

if [ "$(snet organization info __ORGANIZATION_ID__ 2>&1 | tee $TMP_FILE)" != 0 ]
  then
    echo "Creating the __ORGANIZATION_ID__ organization. Please wait..."
    snet organization metadata-init "__ORGANIZATION_ID__" __ORGANIZATION_ID__ individual
    snet organization add-group default_group "$1" http://127.0.0.1:2379
    snet organization create __ORGANIZATION_ID__ -y 2>&1 | tee $TMP_FILE
fi

echo "Publishing your service. Please wait..."

snet service \
    metadata-init \
    __PROTO_DIR__ \
    "__SERVICE_ID__" \
    --group-name default_group \
    --fixed-price 0.00000001 \
    --endpoints http://localhost:7000
snet service publish __ORGANIZATION_ID__ __SERVICE_ID__ -y 2>&1 | tee $TMP_FILE

python3 server.py &
snetd --config __DAEMON_CONFIG_FILE__ &
sleep 3
