#!/bin/bash

# Usage: testService.sh CHANNEL_ID A B
#
# A and B are integers. B != 0
#
# Prints A / B

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]
  then
    echo "Invalid ARGUMENTS: ./testServiceRequest.sh CHANNEL_ID VALUE_A VALUE_B"
    exit 1
fi

snet client call $1 0.00000001 localhost:7000 div "{\"a\":$2,\"b\":$3}"
