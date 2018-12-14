#!/bin/sh
PWD="$( cd "$(dirname "$0")" ; pwd -P )"
docker run --user $(id -u):$(id -g) --mount "type=bind,src=${PWD}/examples,dst=/home/singnet/src/github.com/singnet/examples" -ti singnet
