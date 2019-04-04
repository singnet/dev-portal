---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: Running SingularityNET on a Raspberry Pi
description: Building applications for the Raspberry Pi that can use or integrate with SingularityNET

# extralink box
extralink:
    title: All Docs
    title_url: '/docs/all'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
# page_nav:
#     prev:
#         content: How to Call a Service
#         url: '/tutorials/call-a-service'
#     next:
#         content: How to Publish a Service
#         url: '/tutorials/publish'
---

## Running snet-daemon on Raspbbery Pi

As of version 0.1.9 we have begun [publishing ARM releases for the daemon](https://github.com/singnet/snet-daemon/releases).

This should work on Raspberry Pi 1 model B and up.

```
wget https://github.com/singnet/snet-daemon/releases/download/v0.1.9/snet-daemon-v0.1.9-linux-arm6.tar.gz
tar xfvz snet-daemon-v0.1.9-linux-arm6.tar.gz 

```