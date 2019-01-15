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

snet account deposit 0.00000001 -y
snet channel open-init __ORGANIZATION_ID__ __SERVICE_ID__ 0.00000001 11000000 -y
snet client call 0 0.00000001 localhost:7000 div "{\"a\":$1,\"b\":$2}"
