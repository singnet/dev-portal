#!/bin/sh

if [ -z "$1" ]
  then
    echo "Invalid PRIVATE_KEY: ./publishAndStartService.sh PRIVATE_KEY"
    exit 1
fi

echo "Publishing your service. Please wait..."

TMP_FILE=/tmp/__SNET_SERVICE_PUBLISH_LOG.txt
rm -f $TMP_FILE
snet service publish -y 2>&1 | tee $TMP_FILE
python3 server.py &
AGENT_ADDRESS=$(cat $TMP_FILE | grep current_agent_at | cut -d" " -f3)
sed -i "s/__AGENT_ADDRESS__/$AGENT_ADDRESS/g" __DAEMON_CONFIG_FILE__
sed -i "s/__AGENT_ADDRESS__/$AGENT_ADDRESS/g" __TEST_SCRIPT_FILENAME__
sed -i "s/__PRIVATE_KEY__/$1/g" __DAEMON_CONFIG_FILE__
snetd --config __DAEMON_CONFIG_FILE__ &
sleep 3
