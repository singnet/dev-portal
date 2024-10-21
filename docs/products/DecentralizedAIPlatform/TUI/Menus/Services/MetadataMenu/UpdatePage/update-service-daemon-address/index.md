# Update Service Daemon Address

Update daemon addresses to the groups

![Update daemon address page](/assets/images/products/AIMarketplace/TUI/UpdateServiceDaemonAddressPage.webp)Update daemon address page

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>
snet service metadata-update-daemon-addresses [-h]
                                              [--metadata-file METADATA_FILE]
                                              group_name DAEMON ADDRESSES
                                              [DAEMON ADDRESSES ...]
</code></pre>

User Flow:

* Input the group name, daemon address(es) you would like to add to the group, and local metadata file path for your service&#x20;
* Click the "Update Daemon Address" button
