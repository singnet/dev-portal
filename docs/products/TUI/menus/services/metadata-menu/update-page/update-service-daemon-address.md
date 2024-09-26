# Update Service Daemon Address

Update daemon addresses to the groups

<figure><img src="../../../../../../../public/assets/images/products/TUI/Screenshot 2024-08-17 at 6.04.21 PM.png" alt=""><figcaption><p>Update daemon address page</p></figcaption></figure>

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
