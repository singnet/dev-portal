#!/bin/sh

PWD="$( cd "$(dirname "$0")" ; pwd -P )"

#determine if mac
if uname -a | grep -q Darwin
then
    docker run --mount "type=bind,src=${PWD}/examples,dst=/home/singnet/src/github.com/singnet/examples" -ti singnet
else
    docker run --mount "type=bind,src=${PWD}/examples,dst=/home/singnet/src/github.com/singnet/examples" -ti singnet
fi
