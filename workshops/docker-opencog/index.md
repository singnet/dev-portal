---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: OpenCog Workshop Examples
description: Here you will find some of the OpenCog Workshop Examples as presented during DEVOPS2018

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
In this OpenCog intro you will find some simple examples to work with OpenCog.

Prerequisites:
* [Docker CE](https://docs.docker.com/engine/installation/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* 64-bit OS
* 6GB of storage

The demo requires docker and 64-bit OS and about 6GB of storage for the docker image and data.

To run the demo, clone this repository as follows:
```
git clone https://github.com/singnet/opencog-workshops.git
```

## Running OpenCog

To load tar image:

```
docker load -i demo-opencog.tar
```

To build docker image instead run:

```
docker build docker -t demo-opencog
```

To start docker with simple examples notebook:  

```
docker run -p8888:8888  -it demo-opencog /home/relex/opencog-intro-master/notebook.sh
```

If the notebook is successully started you should be able to open it at localhost:8888 password for notebook is **password**.

## Running the VQA Demo
Fetch data for the VQA demo(on host, not inside a container):

```
wget https://s3-us-west-2.amazonaws.com/abelikov/data-small.tar.gz
```

Unpack:
```
tar -xvf data-small.tar.gz
```

To start VQA demo:

```
docker run -p8889:8888 -v `pwd`/data:/home/relex/projects/data -it demo-opencog /home/relex/projects/semantic-vision-1/experiments/opencog/pattern_matcher_vqa/vqa
```

If the notebook is successully started you should be able to open it at localhost:8889 password for notebook is **password**

Please proceed to open the interface-images-demo notebook and continue instructions there. 
