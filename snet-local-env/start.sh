#!/bin/sh
DIR=$(dirname $0)

. ${DIR}/tag
docker run --name 'snet-local-env' \
	-p 5002:5002 -p 8545:8545 -p 7000:7000 \
	-ti singularitynet/snet-local-env:${TAG}
