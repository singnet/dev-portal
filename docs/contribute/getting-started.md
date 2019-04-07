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
<div class="container">
        <div class="row">
            <div class="col-md-7">
                <div class="content">
                    <h2 id="what-is-snet">What is the SingularityNET Developer Portal Theme?</h2>
<p>The SingularityNET Developer Portal Theme is <a href="https://jekyllrb.com/">Jekyll</a> theme created for project documentations.<br />
You can use it with <a href="https://pages.github.com/">GitHub</a> and <a href="https://about.gitlab.com/features/pages/">GitLab Pages</a> as well as a standalone project.</p>

<h2 id="what-is-jekyll">What is Jekyll?</h2>
<p><a href="https://jekyllrb.com/">Jekyll</a> is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like <a href="https://daringfireball.net/projects/markdown/">Markdown</a>) and <a href="https://github.com/Shopify/liquid/wiki">Liquid</a> renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favourite web server.</p>

<div class="callout callout--info">
<p><strong>Full Jekyll documentation</strong> You can find full Jekyll documentation <a href="https://jekyllrb.com/docs/home/" target="blank">here</a>.</p>
</div>

<h2 id="install-jekyll">Install Jekyll</h2>
<h3 id="requirements">Requirements</h3>
<p>Installing Jekyll should be straight-forward if all requirements are met. Before you start, make sure your system has the following:</p>

<ul>
<li>GNU/Linux, Unix, or macOS</li>
<li><a href="https://www.ruby-lang.org/en/downloads/">Ruby</a> version 2.0 or above, including all development headers</li>
<li><a href="https://rubygems.org/pages/download">RubyGems</a></li>
<li><a href="https://gcc.gnu.org/install/">GCC</a> and <a href="https://www.gnu.org/software/make/">Make</a> (in case your system doesn’t have them installed, which you can check by running <code class="highlighter-rouge">gcc -v</code> and <code class="highlighter-rouge">make -v</code> in your system’s command line interface)</li>
</ul>

<h3 id="install-with-rubygems">Install with RubyGems</h3>
<p>We suggest installing Jekyll via <a href="https://rubygems.org/pages/download">RubyGems</a>. On a terminal prompt, run the following commands:</p>

<div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>gem install jekyll
<span class="nv">$ </span>gem install jekyll-redirect-from
</code></pre></div></div>

<p>Jekyll’s gem dependencies are automatically installed by the first command, but the developer portal needs the `jekyll-redirect-from` plugin too.</p>

<div class="callout callout--info">
<p><strong>Full Jekyll installation guide</strong> You can find full Jekyll installation guide <a href="https://jekyllrb.com/docs/installation/" target="blank">here</a>.</p>
</div>

<h2 id="install-snet">Starting a local SingularityNET Developer Portal</h2>
<h3 id="download">Download</h3>
<p>Get the SingularityNET Developer Portal sources from <a href="https://github.com/singnet/dev-portal" target="_blank">Github</a>, either download an archive
or fetch with git clone.</p>

<h3 id="start-development-server">Start development server</h3>
<p>Jekyll comes with a built-in development server that will allow you to preview what the generated site will look like in your browser locally.</p>

<p>You can run this commands inside theme folder:</p>

<div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>jekyll serve
<span class="c"># A development server will run at http://localhost:4000/</span>
<span class="c"># Auto-regeneration: enabled. Use `--no-watch` to disable.</span>

<span class="nv">$ </span>jekyll serve <span class="nt">--no-watch</span>
<span class="c"># Same as `jekyll serve` but will not watch for changes.</span>

<span class="nv">$ </span>jekyll serve <span class="nt">--detach</span>
<span class="c"># Same as `jekyll serve` but will detach from the current terminal.</span>
<span class="c"># If you need to kill the server, you can `kill -9 1234` where "1234" is the PID.</span>
<span class="c"># If you cannot find the PID, then do, `ps aux | grep jekyll` and kill the instance.</span>
</code></pre></div></div>

<h2 id="directory-structure">Directory structure</h2>
<p>This is the basic directory structure which looks like this:</p>

<div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight"><code>snet/
├── theme/ <span class="c"># snet theme source files.</span>
├── _config.yml <span class="c"># Stores Jekyll configuration data.</span>
├── .eslintrc <span class="c"># ESlint configuration file.</span>
├── .gitignore <span class="c"># Git related file which specifies intentionally untracked files to ignore.</span>
├── .gitlab-ci.yml <span class="c"># File used by GitLab Runner to manage your project's jobs.</span>
├── .htaccess <span class="c"># Configuration file for use on web servers running the Apache Web Server software.</span>
├── 404.md <span class="c"># Error 404 layout markdown template.</span>
├── default.md <span class="c"># Default layout markdown template.</span>
├── favicon.ico <span class="c"># Favicon icon.</span>
└── index.md <span class="c"># Homepage layout markdown template.</span>
</code></pre></div></div>

<h2 id="icons">Icons</h2>
<p>List of icons you can use in some places such as social list in footer or buttons in homepage layout.</p>

<table>
<thead>
<tr>
<th style="text-align: left">Icon name</th>
<th style="text-align: left">YML name</th>
<th style="text-align: left">Preview</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left">Behance</td>
<td style="text-align: left"><code class="highlighter-rouge">behance</code></td>
<td style="text-align: left"><i class="icon icon--behance" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Bitbucket</td>
<td style="text-align: left"><code class="highlighter-rouge">bitbucket</code></td>
<td style="text-align: left"><i class="icon icon--bitbucket" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Codepen</td>
<td style="text-align: left"><code class="highlighter-rouge">codepen</code></td>
<td style="text-align: left"><i class="icon icon--codepen" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Dribbble</td>
<td style="text-align: left"><code class="highlighter-rouge">dribbble</code></td>
<td style="text-align: left"><i class="icon icon--dribbble" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Dropbox</td>
<td style="text-align: left"><code class="highlighter-rouge">dropbox</code></td>
<td style="text-align: left"><i class="icon icon--dropbox" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Facebook</td>
<td style="text-align: left"><code class="highlighter-rouge">facebook</code></td>
<td style="text-align: left"><i class="icon icon--facebook" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">GitHub</td>
<td style="text-align: left"><code class="highlighter-rouge">github</code></td>
<td style="text-align: left"><i class="icon icon--github" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">GitLab</td>
<td style="text-align: left"><code class="highlighter-rouge">gitlab</code></td>
<td style="text-align: left"><i class="icon icon--gitlab" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Google Plus</td>
<td style="text-align: left"><code class="highlighter-rouge">google-plus</code></td>
<td style="text-align: left"><i class="icon icon--google-plus" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Gulp</td>
<td style="text-align: left"><code class="highlighter-rouge">gulp</code></td>
<td style="text-align: left"><i class="icon icon--gulp" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Instagram</td>
<td style="text-align: left"><code class="highlighter-rouge">instagram</code></td>
<td style="text-align: left"><i class="icon icon--instagram" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Kickstarter</td>
<td style="text-align: left"><code class="highlighter-rouge">kickstarter</code></td>
<td style="text-align: left"><i class="icon icon--kickstarter" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">LinkedIn</td>
<td style="text-align: left"><code class="highlighter-rouge">linkedin</code></td>
<td style="text-align: left"><i class="icon icon--linkedin" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Medium</td>
<td style="text-align: left"><code class="highlighter-rouge">medium</code></td>
<td style="text-align: left"><i class="icon icon--medium" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Meetup</td>
<td style="text-align: left"><code class="highlighter-rouge">meetup</code></td>
<td style="text-align: left"><i class="icon icon--meetup" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Pocket</td>
<td style="text-align: left"><code class="highlighter-rouge">pocket</code></td>
<td style="text-align: left"><i class="icon icon--pocket" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Product Hunt</td>
<td style="text-align: left"><code class="highlighter-rouge">producthunt</code></td>
<td style="text-align: left"><i class="icon icon--producthunt" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Reddit</td>
<td style="text-align: left"><code class="highlighter-rouge">reddit</code></td>
<td style="text-align: left"><i class="icon icon--reddit" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Skype</td>
<td style="text-align: left"><code class="highlighter-rouge">skype</code></td>
<td style="text-align: left"><i class="icon icon--skype" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Slack</td>
<td style="text-align: left"><code class="highlighter-rouge">slack</code></td>
<td style="text-align: left"><i class="icon icon--slack" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Stack Overflow</td>
<td style="text-align: left"><code class="highlighter-rouge">stackoverflow</code></td>
<td style="text-align: left"><i class="icon icon--stackoverflow" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Trello</td>
<td style="text-align: left"><code class="highlighter-rouge">trello</code></td>
<td style="text-align: left"><i class="icon icon--trello" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Tumblr</td>
<td style="text-align: left"><code class="highlighter-rouge">tumblr</code></td>
<td style="text-align: left"><i class="icon icon--tumblr" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Twitter</td>
<td style="text-align: left"><code class="highlighter-rouge">twitter</code></td>
<td style="text-align: left"><i class="icon icon--twitter" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">YouTube</td>
<td style="text-align: left"><code class="highlighter-rouge">youtube</code></td>
<td style="text-align: left"><i class="icon icon--youtube" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Arrow down</td>
<td style="text-align: left"><code class="highlighter-rouge">arrow-down</code></td>
<td style="text-align: left"><i class="icon icon--arrow-down" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Arrow left</td>
<td style="text-align: left"><code class="highlighter-rouge">arrow-left</code></td>
<td style="text-align: left"><i class="icon icon--arrow-left" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Arrow right</td>
<td style="text-align: left"><code class="highlighter-rouge">arrow-right</code></td>
<td style="text-align: left"><i class="icon icon--arrow-right" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Arrow up</td>
<td style="text-align: left"><code class="highlighter-rouge">arrow-up</code></td>
<td style="text-align: left"><i class="icon icon--arrow-up" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Chevron down</td>
<td style="text-align: left"><code class="highlighter-rouge">chevron-down</code></td>
<td style="text-align: left"><i class="icon icon--chevron-down" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Chevron left</td>
<td style="text-align: left"><code class="highlighter-rouge">chevron-left</code></td>
<td style="text-align: left"><i class="icon icon--chevron-left" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Chevron right</td>
<td style="text-align: left"><code class="highlighter-rouge">chevron-right</code></td>
<td style="text-align: left"><i class="icon icon--chevron-right" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Chevron up</td>
<td style="text-align: left"><code class="highlighter-rouge">chevron-up</code></td>
<td style="text-align: left"><i class="icon icon--chevron-up" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Home</td>
<td style="text-align: left"><code class="highlighter-rouge">home</code></td>
<td style="text-align: left"><i class="icon icon--home" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">Maximize</td>
<td style="text-align: left"><code class="highlighter-rouge">maximize</code></td>
<td style="text-align: left"><i class="icon icon--maximize" style="font-size: 25px;"></i></td>
</tr>
<tr>
<td style="text-align: left">X (Close)</td>
<td style="text-align: left"><code class="highlighter-rouge">x</code></td>
<td style="text-align: left"><i class="icon icon--x" style="font-size: 25px;"></i></td>
</tr>
</tbody>
</table>

<h2 id="change-log">Change Log</h2>
<p>All notable changes to this project will be documented here.
This project adheres to <a href="http://semver.org/">Semantic Versioning</a>.</p>

<h3 id="v100---2017-12-08">[v1.0.0] - 2017-12-08</h3>
<p>Initial release.</p>

<h2 id="credits">Credits</h2>
<p>List of vendor assets we used to create this theme:</p>
<ul>
<li><a href="https://github.com/twbs/bootstrap">Bootstrap</a> (<a href="https://github.com/twbs/bootstrap/blob/master/LICENSE">MIT License</a>)</li>
<li><a href="https://github.com/necolas/normalize.css">normalize.css</a> (<a href="https://github.com/necolas/normalize.css/blob/master/LICENSE.md">MIT License</a>)</li>
<li><a href="http://jquery.com">jQuery</a> (<a href="https://tldrlegal.com/license/mit-license">MIT License</a>)</li>
<li><a href="https://github.com/liabru/jquery-match-height">jquery-match-height</a> (<a href="https://github.com/liabru/jquery-match-height/blob/master/LICENSE">MIT License</a>)</li>
<li><a href="https://github.com/simple-icons/simple-icons">simple-icons</a> (<a href="https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md">CC0-1.0 License</a>)</li>
<li><a href="https://github.com/colebemis/feather">feather</a> (<a href="https://github.com/colebemis/feather/blob/master/LICENSE">MIT License</a>)</li>
<li><a href="https://fonts.google.com/specimen/Montserrat">Montserrat</a> (<a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&amp;id=OFL">SIL Open Font License, 1.1</a>)</li>
<li><a href="https://fonts.google.com/specimen/Noto+Sans">Noto Sans</a> (<a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache License, version 2.0</a>)</li>
<li><a href="https://fonts.google.com/specimen/Source+Code+Pro">Source Code Pro</a> (<a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&amp;id=OFL">SIL Open Font License, 1.1</a>)</li>
</ul>

                </div><!-- /.content -->
            </div><!-- /.col -->
        </div><!-- /.row -->
</div><!-- /.container -->
