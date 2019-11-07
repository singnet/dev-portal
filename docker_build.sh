#!/bin/sh

TAG=2.0.2

docker build --build-arg TAG=2.0.2 -t vsbogd/snet-local-env:${TAG} .
