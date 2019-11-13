#!/bin/sh

TAG=2.0.2

docker build --build-arg TAG=${TAG} -t singularitynet/snet-local-env:${TAG} .
docker tag vsbogd/snet-local-env:${TAG} singularitynet/snet-local-env:latest
