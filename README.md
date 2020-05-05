![logo](theme/assets/images/layout/logo.png)

Welcome to the [SingularityNET Developer Portal](https://dev.singularitynet.io).

Our Developer Portal provides documentation about the SingularityNET Platform and Marketplace. You will learn how to build and access AI services that are published onto the network as a service developer or as an end-user of services that other people have published.

## Overview

If you are just starting out, read the [getting started](https://dev.singularitynet.io/tutorials/getting-started) page.

If you are already familiar with Blockchain technology like MetaMask, Ethereum and AGI, then you may want to skip immediately to browsing the beta [Marketplace](http://beta.singularitynet.io).

## Setup

We welcome external contributions to our documentation, such as corrections, improvements, new tutorials, or any other suitable addition.

Please find our contribution guidelines [here](https://dev.singularitynet.io/docs/contribute/contribution-guidelines).

If you want to host the developer portal locally, or help us improve our documentation, here's what you need to install, assuming you already have ruby:

```sh
gem install --user-install jekyll
gem install --user-install jekyll-paginate
gem install --user-install jekyll-sitemap
gem install --user-install jemoji
```

```
git clone https://github.com/singnet/dev-portal.git
cd dev-portal
jekyll serve
```

Before making a pull request, please also check all links are valid:

```
gem install --user-install html-proofer
htmlproofer ./_site/ --only-4xx --empty-alt-ignore
```

## Stay up to date

In order to receive SingularityNET Developer Updates you can subscribe [here](https://dev.singularitynet.io/newsletter).