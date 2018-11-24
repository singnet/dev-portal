# SingularityNET naming standardisation

We currently provide a lot of freedom as to how entities in SingularityNET are named.

Unfortunately this can result in confusion as to how to capitalise and separate words in names.
This document is an attempt at a best practices guide. At some point these may get codified, such
that smart contracts and our software enforce them, but for now they are just for guidance.

## Service URI

A service URI consists of three things:
- Organization name
- Path prefix (optional)
- Service name

e.g. `snet/faces/face-detect`

Here `snet` is the organization, `faces` is a prefix for grouping related services, and `face-detect` is the service name.

Service authors *should* use lowercase alphanumerics, for each of these components. Multiple word components should
be [slugified with dashes](https://docs.djangoproject.com/en/2.1/ref/utils/#django.utils.text.slugify) ([wikipedia definition of "slug"](https://en.wikipedia.org/wiki/Clean_URL#Slug)) (i.e. dashes should separate the words).

This is analogous to a URL on the web. A domain name is case insensitive, and while a URL path can use captialisation, many web applications
will treat these paths as case insensitive.

### Internationalisation and UTF-8

These fields are 8bit characters so can support UTF-8. We don't currently explicitly test and support this in our tooling yet.

When we make a push to support this, a naming standard for other language may be necessary.

Domain names are a prior situation where the flexibility of unicode characters has resulted in naming confusion. Similar looking
characters are [used to trick the user into visiting the wrong domain](https://en.wikipedia.org/wiki/IDN_homograph_attack).
We should try to avoid this. The simplest way to avoid this in the short term is to only allow alphanumerics.

## Service Tags

Tags should follow the style of popular sites like [Stack Overflow](https://stackoverflow.com/)).

These are also lowercase slugified words, e.g. `example-tag` `tags-are-great` `opencog` `artificial-neural-network` etc.