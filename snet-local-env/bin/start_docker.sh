#!/bin/sh

start_environment.sh

cd ${ROOT}/example-service
python3 run_example_service.py >${LOG}/example-service.stdout.log 2>&1 &

cat /etc/motd

cd ${ROOT}
bash
