---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Front-to-Back Example 1
description: Using the MPE payment system in SingularityNET with one replica configuration.

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

---

> NOTE: You can find the script files for this example on Github [here](https://github.com/singnet/dev-portal/tree/master/src/example1)

## DESCRIPTION

* install_and_start.sh - install and setup everything and start a local network
and IPFS
* run_service.sh - register and start a simple service (one payment
group one endpoint)
* run_client.sh  - make a call to the service
* run_treasurer.sh - run treasurer server in order to see list
of claimed channels, and claim your channels

Test should be run on a clean environment in the given order.

## Run tests in docker container

### Install everything

```sh
#I. Download example scripts and make sure that scripts are in the current directory.

git clone https://github.com/singnet/dev-portal
cd dev-portal/docs/all/mpe/front-to-back-examples/scripts/example1

#II. Run ubuntu:latest docker container and "mount" ./ to /example1
docker run -v `pwd`:/example1 -it ubuntu:latest

#III. Now you are inside a docker container. We will install everything.
. /example1/for_docker/install_all.sh
```

### Create docker image with everything installed (optional)

At this point you can "commit" your docker container.

1. Open new terminal on your main system (without closing your docker container!)
2. Using "docker ps" your get "container id" of your running container.
3. Type "docker commit <container_id> $USER/snet_example1"  

After this you will be able to use $USER/snet_example1 instead of ubuntu:latest (without running install_all.sh)
```sh
# you should be inside example1 directory
#cd dev-portal/docs/all/mpe/front-to-back-examples/scripts/example1
docker run -v `pwd`:/example1 -it $USER/snet_example1
```

### Register and run example service

```sh
# reset environment
. /example1/for_docker/reset_environment.sh

# register your service
. /example1/run_service.sh
```

### Run client

After running the service, the terminal will not return to you, so you will need to open a second terminal in your container.

1. You should open new terminal in your main system.
2. You should get "container id" of your running container by typing "docker ps"
3. You should type "docker exec -it <container_id> bash".

And your can run your client

```sh
. /example1/run_client.sh

# it should print "42.0"
```

### Run treasurer

```sh
. /example1/run_treasurer.sh
```
