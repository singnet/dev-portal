# Print Initialized Channels Filter Organization

Print initialized channels for the given org (all payment group).

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/PrintInitializedChannelsForOrganizationPage.webp" alt="Print Initialized Channels Filter Organization"/>

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>
snet channel print-initialized-filter-org [-h] [--registry-at REGISTRY_AT]
                                          [--only-id]
                                          [--filter-sender | --filter-signer | --filter-my]
                                          [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                          [--wallet-index WALLET_INDEX]
                                          ORG_ID group_name
</code></pre>

User flow:

* Input the organization ID and Group Name
* Input any optional parameters you would like
* Click the "Print Initialized Filter Organization" button
