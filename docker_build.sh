#!/bin/sh

TAG=2.0.2

docker build --build-arg TAG=${TAG} -t vsbogd/snet-local-env:${TAG} .
docker tag vsbogd/snet-local-env:${TAG} vsbogd/snet-local-env:latest
