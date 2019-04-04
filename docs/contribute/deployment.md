---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Deployment
description: The SingularityNET Development Portal is always ready to deploy! You can host your own version on private web hosting, GitHub Pages or GitLab Pages. Choose the most suitable solution and deploy!

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
        content: Theme Updates
        url: '/docs/contribute/theme-updates'
---
<div class="container">
        <div class="row">
            <div class="col-md-7">
                <div class="content">
                    <h2 id="web-hosting-providers-ftp">Web hosting providers (FTP)</h2>
<p>To upload a Jekyll site to a web host using FTP, simply run the <code class="highlighter-rouge">JEKYLL_ENV=production jekyll build</code> command and copy the generated <code class="highlighter-rouge">_site</code> folder to the root folder of your hosting account.</p>

<h2 id="github-pages">GitHub Pages</h2>
<div class="callout callout--info">
<p><strong>What are GitHub Pages?</strong> <a href="https://pages.github.com/" target="blank">GitHub Pages</a> are public web pages for users, organisations, and repositories, that are freely hosted on GitHub’s <code>github.io</code> domain or on a custom domain name of your choice.</p>
</div>
<div class="callout callout--info">
<p><strong>Full GitHub Pages deployment guide.</strong> We recommend you to read full GitHub Pages deployment guide <a href="http://jekyllrb.com/docs/github-pages/" target="blank">here</a>.</p>
</div>
<div class="callout callout--warning">
<p><strong>Set relative URLs properly!</strong> Please take a look at Relative URLs part of "Configuration" section before you deploy your site.</p>
</div>
<div class="callout callout--warning">
<p><strong>Build site with environment variable!</strong> Please build your site with proper environment variable before you deploy. Your build command should look like this <code>JEKYLL_ENV=production jekyll build</code>.</p>
</div>

<h3 id="user-and-organisation-pages">User and Organisation Pages</h3>
<p>User and organisation pages live in a special GitHub repository dedicated to only the GitHub Pages files. This repository must be named after the account name. For example, <a href="https://github.com/mojombo/mojombo.github.io">@mojombo’s user page repository</a> has the name <code class="highlighter-rouge">mojombo.github.io</code>.</p>

<p>Content from the <code class="highlighter-rouge">master</code> branch of your repository will be used to build and publish the GitHub Pages site, so make sure your <code class="highlighter-rouge">_site</code> directory content is stored there.</p>

<h3 id="project-pages">Project Pages</h3>
<p>Unlike user and organisation pages, project pages are kept in the same repository as the project they are for, except that the website content is stored in a specially named <code class="highlighter-rouge">gh-pages</code> branch or in a <code class="highlighter-rouge">/docs</code> folder on the <code class="highlighter-rouge">master</code> branch.</p>

<p>Content from the <code class="highlighter-rouge">gh-pages</code> branch or <code class="highlighter-rouge">/docs</code> folder on your <code class="highlighter-rouge">master</code> branch of your repository will be used to build and publish the GitHub Pages site, so make sure your <code class="highlighter-rouge">_site</code> directory content is stored there.</p>

<p>Output will become available under a subpath of your user pages subdomain, such as <code class="highlighter-rouge">username.github.io/project</code> (unless a custom domain is specified).</p>

<h2 id="gitlab-pages">GitLab Pages</h2>
<div class="callout callout--info">
<p><strong>What are GitLab Pages?</strong> With <a href="https://about.gitlab.com/features/pages/" target="blank">GitLab Pages</a> you can create static websites for your GitLab projects, groups, or user accounts. Connect as many customs domains as you like and bring your own TLS certificate to secure them.</p>
</div>
<div class="callout callout--info">
<p><strong>Full GitLab Pages deployment guide.</strong> We recommend you to read full GitLab Pages deployment guide <a href="https://docs.gitlab.com/ee/user/project/pages/" target="blank">here</a>.</p>
</div>
<div class="callout callout--warning">
<p><strong>Set relative URLs properly!</strong> Please take a look at Relative URLs part of "Configuration" section before you deploy your site.</p>
</div>
<div class="callout callout--warning">
<p><strong>Build site with environment variable!</strong> Please build your site with proper environment variable before you deploy. Your build command should look like this <code>JEKYLL_ENV=production jekyll build</code>.</p>
</div>

<h3 id="user-and-organisation-pages-1">User and Organisation Pages</h3>
<p>User and organisation pages live in a special GitLab repository dedicated to only the GitLab Pages files. This repository must be named after the account name.</p>

<p>For example, if you create a project called <code class="highlighter-rouge">john.gitlab.io</code> under your username, <code class="highlighter-rouge">john</code>, your project URL will be <code class="highlighter-rouge">https://gitlab.com/john/john.gitlab.io</code>. Once you enable GitLab Pages for your project, your website will be published under <code class="highlighter-rouge">https://john.gitlab.io</code>.</p>

<p>Content from the <code class="highlighter-rouge">gl-pages</code> branch of your repository will be used to build and publish the GitLab Pages site, so make sure your <code class="highlighter-rouge">_site</code> directory content is stored there.</p>

<h3 id="project-pages-1">Project Pages</h3>
<p>Unlike user and organisation pages, project pages are kept in the same repository as the project they are for, except that the website content is stored in a specially named <code class="highlighter-rouge">gl-pages</code> branch.</p>

<p>Content from the <code class="highlighter-rouge">gl-pages</code> branch of your repository will be used to build and publish the GitLab Pages site, so make sure your <code class="highlighter-rouge">_site</code> directory content is stored there.</p>

<p>Output will become available under a subpath of your user pages subdomain, such as <code class="highlighter-rouge">username.gitlab.io/project</code> (unless a custom domain is specified).</p>

                </div><!-- /.content -->
            </div><!-- /.col -->
        </div><!-- /.row -->
</div><!-- /.container -->
