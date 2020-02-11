---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Manage Content
description: We've prepared a special guide for content management. Let's learn how to add syntax highlighting, examples, callouts and much more.

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
        content: Deployment
        url: '/docs/contribute/deployment'
---
## Add content

Content should be in [Markdown](https://daringfireball.net/projects/markdown/) format and you shouldn’t remove `.yml` comments on top of the `.md` files, errors may occur if you remove them.

### Homepage

In main `index.md` file you add your homepage documentation content. Don’t forget to setup variables on top of the file. We’ve already added all variables, all you have to do is to update them.

### Pages

To add new pages just create new `.md` file with proper `.yml` comments on top of the file. Pages use `default` layout template. Basic example of `default` layout template can be found in `default.md`.

### 404 error page

We have a custom 404 error page template. You can edit its content in `404.md`. If you’re hosting your site on Apache Web Servers, we’ve already added custom `.htaccess` file to update path to your 404 error page.

>__Full 404 error page setup guide.__ <br> You can find full 404 error page setup guide [here](https://jekyllrb.com/tutorials/custom-404-page/).

## External and internal links

All links on your website should link to internal pages.  
There’s few exception to this rule:

*   In content you can use an external links.
*   On homepage header buttons you can use an external links but you have to set `external_url` to `true`. Same applies to author box on default and homepage layouts.
*   In footer social list you __have__ to use an external links.

## Relative URLs

If you link internal pages in your content you have to add `baseurl` prefix to your links. This applies only to sites which will not be deployed in `root` directory of your server.

>__Relative URLs configuration.__ <br> In "Configuration" section you can read more about relative URLs configuration.

## Syntax Highlighting

You can call out code or a command within a sentence with single backticks. The text within the backticks will not be formatted.  
To format code or text into its own distinct block, use triple backticks.  
Best [example](https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code) of this can be found [here](https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code).

Furthermore, you can add an optional language identifier to enable syntax highlighting in your fenced code block. Best [example](https://help.github.com/articles/creating-and-highlighting-code-blocks/#syntax-highlighting) of this can be found [here](https://help.github.com/articles/creating-and-highlighting-code-blocks/#syntax-highlighting).

## Examples

To add example bar add following `html` above your code block.

```
<div class="example">
<a href="#" target="blank">Preview</a>
</div>

```

## Callouts

To add callout to your documentation simply add following `html` code.  
Choose between few variations:

*   Info: `callout--info`
*   Warning: `callout--warning`
*   Danger: `callout--danger`
*   Success: `callout--success`

```
<div class="callout callout--info">
<p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

<div class="callout callout--warning">
<p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

<div class="callout callout--danger">
<p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

<div class="callout callout--success">
<p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

```

>__Lorem ipsum dolor sit amet!__ <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<div class="callout callout--info">
    <p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

<div class="callout callout--warning">
    <p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

<div class="callout callout--danger">
    <p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

<div class="callout callout--success">
    <p><strong>Lorem ipsum dolor sit amet!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>
