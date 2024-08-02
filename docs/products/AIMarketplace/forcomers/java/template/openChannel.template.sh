#!/bin/bash

snet account deposit 0.00000001 -y
snet channel open-init __ORGANIZATION_ID__ default_group 0.00000001 +10days -y