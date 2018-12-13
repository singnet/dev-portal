#!/bin/bash

# Usage: testService.sh A B
#
# A and B are integers. B != 0
#
# Prints A / B

if [ -z "$1" ] || [ -z "$2" ]
  then
    echo "Invalid ARGUMENTS: ./testServiceRequest.sh VALUE_A VALUE_B"
    exit 1
fi

snet client deposit 0.00000001 -y
snet client open_init_channel_registry __ORGANIZATION_NAME__ __SERVICE_NAME__ 0.00000001 11000000 -y
snet client call 0 0.00000001 localhost:7000 div "{\"a\":$1,\"b\":$2}"
