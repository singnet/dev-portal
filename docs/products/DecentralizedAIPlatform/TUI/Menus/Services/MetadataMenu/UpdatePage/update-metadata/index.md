# Update Metadata

Publish metadata in IPFS and update existed service

![Update service metadata page](/assets/images/products/AIMarketplace/TUI/Screenshot2024-08-17at6.04.48PM.png)Update service metadata page

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>
snet service update-metadata [-h] [--metadata-file METADATA_FILE]
                             [--update-mpe-address]
                             [--multipartyescrow-at MULTIPARTYESCROW_AT]
                             [--registry-at REGISTRY_AT]
                             [--gas-price GAS_PRICE]
                             [--wallet-index WALLET_INDEX] [--yes]
                             [--quiet | --verbose]
                             ORG_ID SERVICE_ID
</code></pre>

User Flow:

* Input the org id, service id, and local metadata file path for your service
* Input any optional parameters you would like
* Click the "Update Metadata" button
