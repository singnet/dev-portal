# Extend Add Organization

Set new expiration and add funds for the channel for the given service

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/ChannelExtendAddPage.webp" alt="Extend Add Organization page"/>

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>snet channel extend-add-for-org [-h] [--registry-at REGISTRY_AT]
                                [--expiration EXPIRATION] [--force]
                                [--amount AMOUNT]
                                [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                [--gas-price GAS_PRICE]
                                [--wallet-index WALLET_INDEX] [--yes]
                                [--quiet | --verbose]
                                [--group-name GROUP_NAME]
                                [--channel-id CHANNEL_ID]
                                [--from-block FROM_BLOCK]
                                ORG_ID group_name
</code></pre>

User flow:

* Input the organization id and the payment group name for the service
* Input any optional parameters you would like
* Click the "Extend Add Organization" button
