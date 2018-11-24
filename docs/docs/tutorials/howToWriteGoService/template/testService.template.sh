#!/bin/bash

# Usage: testService.sh A B
#
# A and B are integers. B != 0
#
# Prints A / B

snet set current_agent_at __AGENT_ADDRESS__
#snet client call check "{\"v\":$2}"
snet client call -y div "{\"a\":$1,\"b\":$2}"
