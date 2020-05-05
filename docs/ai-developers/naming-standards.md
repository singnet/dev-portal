---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: AI Developers
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
## Naming standards
Currently, a lot of flexibility is provided as to how entities in SingularityNET are defined by naming standards.

Initially, the naming standard can result in difficulty to recognize between capitalization and separation of words in names. But these named standard is proposed to be implemented within the code, so that the smart contracts and the software can enforce the named standard definition efficiently in SingularityNET.

This following section describes the naming standards for your reference.

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

The service metadata can specify a display name for showing in the Marketplace and in other UIs and it should remain similar to the service name used in the URI.

## Internationalization and UTF-8

These fields are 8bit characters compliance, and can support UTF-8. These fields are not currently tested and supported in the tooling yet.

**Note** Naming standard for other languages are required, when you attempt to support these fields.

## Service Tags

Tags should follow the style of popular sites like [Stack Overflow](https://stackoverflow.com/)). The service tags are defined in  lowercase slugified words, e.g. `example-tag` `tags-are-great` `opencog` `artificial-neural-network` etc.
