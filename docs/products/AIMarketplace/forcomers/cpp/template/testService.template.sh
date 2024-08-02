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

snet client call __ORGANIZATION_ID__ __SERVICE_ID__ default_group div "{\"a\":$1,\"b\":$2}" -y
