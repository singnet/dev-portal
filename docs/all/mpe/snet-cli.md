---
# Page settings
layout: default
keywords:
comments: true

# Hero section
title: Using the SNET-CLI to pass parameters to a service
description: In this document, we look at how to pass parameters to a service in the SNET-CLI and how to pass binary parameters via a command line interface.

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

## JSON parameters

Parameters for a service have to be passed to the snet-cli in a JSON format. There are three ways of passing this JSON:
* via a cmdline parameter;
* via JSON file; and
* via stdin.

For example in [this front-to-back example](front-to-back-examples/example.md#make-a-call-using-stateless-logic) we need to pass the following JSON as a parameter for the "add" method to our service:
`{"a":10,"b":32}`

We can use three ways:
```bash
# via cmdline parameter
snet client call 0 0.1 localhost:8080 add '{"a":10,"b":32}'

# via json file
echo '{"a":10,"b":32}' > p.txt
snet client call 0 0.1 localhost:8080 add p.txt

# via stdin
echo '{"a":10,"b":32}' | snet client call 0 0.1 localhost:8080 add
```

## Modifiers

We've implemented several modifiers for this JSON parameter in order to simplify passing big files and to have the possibility to pass binary data (and not only base64 encoded data).

There are 3 possible modifiers:
* file      - read from file;
* b64encode - encode to base64; and
* b64decode - decode from base64.

For example, if you pass the following JSON as a parameter, then as an "image" parameter we will use the base64 encoded content of "1.jpeg"

```bash
'{"image_type": "jpg", "file@b64encode@image": "1.jpeg"}'
```

If we remove the b64encode modifier from the previous example, then we will pass 1.jpeg image in binary format without base64 encoding.  
