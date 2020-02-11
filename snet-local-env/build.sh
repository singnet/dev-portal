#!/bin/sh
DIR=$(dirname $0)

. ${DIR}/tag
docker build --build-arg TAG=${TAG} -t singularitynet/snet-local-env:${TAG} ${DIR}
