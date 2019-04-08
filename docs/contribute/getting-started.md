---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Getting Started
description: In this section you'll find basic information about the SingularityNET Developer Portal theme and how to install it and use it properly.

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
        content: All Developer Portal Docs
        url: '/docs/contribute'
    next:
        content: Configuration
        url: '/docs/contribute/configuration'
---
## What is the SingularityNET Developer Portal Theme?

The SingularityNET Developer Portal Theme is [Jekyll](https://jekyllrb.com/) theme created for project documentations.  
You can use it with [GitHub](https://pages.github.com/) and [GitLab Pages](https://about.gitlab.com/features/pages/) as well as a standalone project.

## What is Jekyll?

[Jekyll](https://jekyllrb.com/) is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like [Markdown](https://daringfireball.net/projects/markdown/)) and [Liquid](https://github.com/Shopify/liquid/wiki) renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favourite web server.

>__Full Jekyll documentation__ <br> You can find full Jekyll documentation [here](https://jekyllrb.com/docs/home/).

## Install Jekyll

### Requirements

Installing Jekyll should be straight-forward if all requirements are met. Before you start, make sure your system has the following:

*   GNU/Linux, Unix, or macOS
*   [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.0 or above, including all development headers
*   [RubyGems](https://rubygems.org/pages/download)
*   [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (in case your system doesn’t have them installed, which you can check by running `gcc -v` and `make -v` in your system’s command line interface)

### Install with RubyGems

We suggest installing Jekyll via [RubyGems](https://rubygems.org/pages/download). On a terminal prompt, run the following commands:

```
$ gem install jekyll
$ gem install jekyll-redirect-from

```

Jekyll’s gem dependencies are automatically installed by the first command, but the developer portal needs the \`jekyll-redirect-from\` plugin too.

>__Full Jekyll installation guide__ <br> You can find full Jekyll installation guide [here](https://jekyllrb.com/docs/installation/).

## Starting a local SingularityNET Developer Portal

### Download

Get the SingularityNET Developer Portal sources from [Github](https://github.com/singnet/dev-portal), either download an archive or fetch with git clone.

### Start development server

Jekyll comes with a built-in development server that will allow you to preview what the generated site will look like in your browser locally.

You can run this commands inside theme folder:

```
$ jekyll serve
# A development server will run at http://localhost:4000/
# Auto-regeneration: enabled. Use `--no-watch` to disable.

$ jekyll serve --no-watch
# Same as `jekyll serve` but will not watch for changes.

$ jekyll serve --detach
# Same as `jekyll serve` but will detach from the current terminal.
# If you need to kill the server, you can `kill -9 1234` where "1234" is the PID.
# If you cannot find the PID, then do, `ps aux | grep jekyll` and kill the instance.

```

## Directory structure

This is the basic directory structure which looks like this:

```
snet/
├── theme/ # snet theme source files.
├── _config.yml # Stores Jekyll configuration data.
├── .eslintrc # ESlint configuration file.
├── .gitignore # Git related file which specifies intentionally untracked files to ignore.
├── .gitlab-ci.yml # File used by GitLab Runner to manage your project's jobs.
├── .htaccess # Configuration file for use on web servers running the Apache Web Server software.
├── 404.md # Error 404 layout markdown template.
├── default.md # Default layout markdown template.
├── favicon.ico # Favicon icon.
└── index.md # Homepage layout markdown template.

```

## Icons

List of icons you can use in some places such as social list in footer or buttons in homepage layout.

|ICON NAME|YML NAME|PREVIEW|
|:----------|:---------|:--------|
|Behance|`behance`| |
|Bitbucket|`bitbucket`| |
|Codepen|`codepen`| |
|Dribbble|`dribbble`| |
|Dropbox|`dropbox`| |
|Facebook|`facebook`| |
|GitHub|`github`| |
|GitLab|`gitlab`| |
|Google Plus|`google-plus`| |
|Gulp|`gulp`| |
|Instagram|`instagram`| |
|Kickstarter|`kickstarter`| |
|LinkedIn|`linkedin`| |
|Medium|`medium`| |
|Meetup|`meetup`| |
|Pocket|`pocket`| |
|Product Hunt|`producthunt`| |
|Reddit|`reddit`| |
|Skype|`skype`| |
|Slack|`slack`| |
|Stack Overflow|`stackoverflow`| |
|Trello|`trello`| |
|Tumblr|`tumblr`| |
|Twitter|`twitter`| |
|YouTube|`youtube`| |
|Arrow down|`arrow-down`| |
|Arrow left|`arrow-left`| |
|Arrow up|`arrow-up`| |
|Arrow right|`arrow-right`| |
|Arrow up|`arrow-up`| |
|Chevron down|`chevron-down`| |
|Chevron left|`chevron-left`| |
|Chevron right|`chevron-right`| |
|Chevron up|`chevron-up`| |
|Home|`home`| |
|Maximize|`maximize`| |
|X (Close)|`x`| |

## Change Log

All notable changes to this project will be documented here. This project adheres to [Semantic Versioning](http://semver.org/).

### \[v1.0.0\] - 2017-12-08

Initial release.

## Credits

List of vendor assets we used to create this theme:

*   [Bootstrap](https://github.com/twbs/bootstrap) ([MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE))
*   [normalize.css](https://github.com/necolas/normalize.css) ([MIT License](https://github.com/necolas/normalize.css/blob/master/LICENSE.md))
*   [jQuery](http://jquery.com) ([MIT License](https://tldrlegal.com/license/mit-license))
*   [jquery-match-height](https://github.com/liabru/jquery-match-height) ([MIT License](https://github.com/liabru/jquery-match-height/blob/master/LICENSE))
*   [simple-icons](https://github.com/simple-icons/simple-icons) ([CC0-1.0 License](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md))
*   [feather](https://github.com/colebemis/feather) ([MIT License](https://github.com/colebemis/feather/blob/master/LICENSE))
*   [Montserrat](https://fonts.google.com/specimen/Montserrat) ([SIL Open Font License, 1.1](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL))
*   [Noto Sans](https://fonts.google.com/specimen/Noto+Sans) ([Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html))
*   [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro) ([SIL Open Font License, 1.1](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL))
