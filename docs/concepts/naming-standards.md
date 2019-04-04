---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Naming Standards
description: About the standardisation of naming within the SingularityNET Network.

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

# Page navigation
page_nav:
    prev:
        content: Service Metadata
        url: '/docs/concepts/service-metadata'
    next:
        content: Software
        url: '/docs/concepts/software'
---

We currently provide a lot of freedom as to how entities in SingularityNET are named.

This can result in confusion as to how to capitalize and separate words in names. This document is a best practices guide. At some point these may get codified, such that smart contracts and our software can enforce them, but for now they are just for guidance.

## Service URI

A service URI consists of three things:

- Organization name
- Service name

e.g. `snet/face-detect`

Here `snet` is the organization, and `face-detect` is the service name.

Service authors *should* use lowercase alphanumerics, for each of these components. Multiple word components should
be [slugified with dashes](https://docs.djangoproject.com/en/2.1/ref/utils/#django.utils.text.slugify) ([wikipedia definition of "slug"](https://en.wikipedia.org/wiki/Clean_URL#Slug)) (i.e. dashes should separate the words).

This is analogous to a URL on the web. A domain name is case insensitive, and while a URL path can use capitalisation, many web applications will treat these paths as case insensitive.

## Service Display Name

The service metadata can specify a display name for showing in the Marketplace and in other UIs. We don't currently suggest any constraints on what this should be, except that it should be roughly similary to the service name used in the URI.

## Internationalization and UTF-8

These fields are 8bit characters so they can support UTF-8. We don't currently explicitly test and support this in our tooling yet.

When we make a push to support this, a naming standard for other languages may be necessary.

## Service Tags

Tags should follow the style of popular sites like [Stack Overflow](https://stackoverflow.com/)). These are also lowercase slugified words, e.g. `example-tag` `tags-are-great` `opencog` `artificial-neural-network` etc.
