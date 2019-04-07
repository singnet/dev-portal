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
<div class="container">
        <div class="row">
            <div class="col-md-7">
                <div class="content">
                    <h2 id="add-content">Add content</h2>
<p>Content should be in <a href="https://daringfireball.net/projects/markdown/">Markdown</a> format and you shouldn’t remove <code class="highlighter-rouge">.yml</code> comments on top of the <code class="highlighter-rouge">.md</code> files, errors may occur if you remove them.</p>

<h3 id="homepage">Homepage</h3>
<p>In main <code class="highlighter-rouge">index.md</code> file you add your homepage documentation content. Don’t forget to setup variables on top of the file. We’ve already added all variables, all you have to do is to update them.</p>

<h3 id="pages">Pages</h3>
<p>To add new pages just create new <code class="highlighter-rouge">.md</code> file with proper <code class="highlighter-rouge">.yml</code> comments on top of the file. Pages use <code class="highlighter-rouge">default</code> layout template. Basic example of <code class="highlighter-rouge">default</code> layout template can be found in <code class="highlighter-rouge">default.md</code>.</p>

<h3 id="404-error-page">404 error page</h3>
<p>We have a custom 404 error page template. You can edit its content in <code class="highlighter-rouge">404.md</code>. If you’re hosting your site on Apache Web Servers, we’ve already added custom <code class="highlighter-rouge">.htaccess</code> file to update path to your 404 error page.</p>

<div class="callout callout--info">
<p><strong>Full 404 error page setup guide.</strong> You can find full 404 error page setup guide <a href="https://jekyllrb.com/tutorials/custom-404-page/">here</a>.</p>
</div>

<h2 id="external-and-internal-links">External and internal links</h2>
<p>All links on your website should link to internal pages. <br />
There’s few exception to this rule:</p>

<ul>
<li>In content you can use an external links.</li>
<li>On homepage header buttons you can use an external links but you have to set <code class="highlighter-rouge">external_url</code> to <code class="highlighter-rouge">true</code>. Same applies to author box on default and homepage layouts.</li>
<li>In footer social list you <strong>have</strong> to use an external links.</li>
</ul>

<h2 id="relative-urls">Relative URLs</h2>
<p>If you link internal pages in your content you have to add <code class="highlighter-rouge">baseurl</code> prefix to your links. This applies only to sites which will not be deployed in <code class="highlighter-rouge">root</code> directory of your server.</p>

<div class="callout callout--info">
<p><strong>Relative URLs configuration.</strong> In "Configuration" section you can read more about relative URLs configuration.</p>
</div>

<h2 id="syntax-highlighting">Syntax Highlighting</h2>
<p>You can call out code or a command within a sentence with single backticks. The text within the backticks will not be formatted.<br />
To format code or text into its own distinct block, use triple backticks.<br />
Best <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code">example</a> of this can be found <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code">here</a>.</p>

<p>Furthermore, you can add an optional language identifier to enable syntax highlighting in your fenced code block. Best <a href="https://help.github.com/articles/creating-and-highlighting-code-blocks/#syntax-highlighting">example</a> of this can be found <a href="https://help.github.com/articles/creating-and-highlighting-code-blocks/#syntax-highlighting">here</a>.</p>

<h2 id="examples">Examples</h2>
<p>To add example bar add following <code class="highlighter-rouge">html</code> above your code block.</p>

<div class="example"></div>
<div class="language-html highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"example"</span><span class="nt">&gt;</span>
<span class="nt">&lt;a</span> <span class="na">href=</span><span class="s">"#"</span> <span class="na">target=</span><span class="s">"blank"</span><span class="nt">&gt;</span>Preview<span class="nt">&lt;/a&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</code></pre></div></div>

<h2 id="callouts">Callouts</h2>
<p>To add callout to your documentation simply add following <code class="highlighter-rouge">html</code> code.<br />
Choose between few variations:</p>

<ul>
<li>Info: <code class="highlighter-rouge">callout--info</code></li>
<li>Warning: <code class="highlighter-rouge">callout--warning</code></li>
<li>Danger: <code class="highlighter-rouge">callout--danger</code></li>
<li>Success: <code class="highlighter-rouge">callout--success</code></li>
</ul>

<div class="example"></div>
<div class="language-html highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"callout callout--info"</span><span class="nt">&gt;</span>
<span class="nt">&lt;p&gt;&lt;strong&gt;</span>Lorem ipsum dolor sit amet!<span class="nt">&lt;/strong&gt;</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p&gt;</span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;/div&gt;</span>

<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"callout callout--warning"</span><span class="nt">&gt;</span>
<span class="nt">&lt;p&gt;&lt;strong&gt;</span>Lorem ipsum dolor sit amet!<span class="nt">&lt;/strong&gt;</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p&gt;</span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;/div&gt;</span>

<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"callout callout--danger"</span><span class="nt">&gt;</span>
<span class="nt">&lt;p&gt;&lt;strong&gt;</span>Lorem ipsum dolor sit amet!<span class="nt">&lt;/strong&gt;</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p&gt;</span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;/div&gt;</span>

<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"callout callout--success"</span><span class="nt">&gt;</span>
<span class="nt">&lt;p&gt;&lt;strong&gt;</span>Lorem ipsum dolor sit amet!<span class="nt">&lt;/strong&gt;</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p&gt;</span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</code></pre></div></div>

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

                </div><!-- /.content -->
            </div><!-- /.col -->

        </div><!-- /.row -->
</div><!-- /.container -->
