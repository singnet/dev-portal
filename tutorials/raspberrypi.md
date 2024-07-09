---
# Page settings
layout: default
keywords:
comments: false
title: Running snet-daemon on Raspbbery Pi
description: Running snet-daemon on Raspbbery Pi

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

## Running snet-daemon on Raspbbery Pi

As of version 0.1.9 we have begun [publishing ARM releases for the daemon](https://github.com/singnet/snet-daemon/releases).

This should work on Raspberry Pi 1 model B and up.

```
wget https://github.com/singnet/snet-daemon/releases/download/v0.1.9/snet-daemon-v0.1.9-linux-arm6.tar.gz
tar xfvz snet-daemon-v0.1.9-linux-arm6.tar.gz 

```