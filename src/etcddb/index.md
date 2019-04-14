---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Throughput Tests
description: Throughput tests to run several etcd nodes locally and measure number of writes, and compare and set requests per seconds.

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

> NOTE: if you are reading this on the developer portal, please be aware that there are additional Go files in the repository found [here](https://github.com/singnet/dev-portal/tree/master/src/etcddb)

# etcd throughput

Number of clients: 10

Number of iterations: 500

Requests per seconds:

| op\nodes |   1 |   2|   3|   4|   5|   6|    7|    8|   9|  11|
|------    |-----|----|----|----|----|----|-----|-----|----|----|
| put      |7663 |1563|1455|1084| 986| 786|  677|  594| 466| 374|
| cas      |5918 |1640|1820|1321|1200|1156|  858|  721| 652| 529|


Put:

| Request  | Calls |
|----------|-------|
| writes   | 5000  |
| total    | 5000  |

Compare And Swap:

| Request  | Calls |
|----------|-------|
| reads    |  5000 |
| cas      |  5000 |
| total    | 10000 |
