# Extend Add

Set new expiration for the channel and add funds

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-17 at 6.23.35 PM.png" alt=""><figcaption><p>Extend Add page</p></figcaption></figure>

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>
snet channel extend-add [-h] [--expiration EXPIRATION] [--force]
                        [--amount AMOUNT]
                        [--multipartyescrow-at MULTIPARTYESCROW_AT]
                        [--gas-price GAS_PRICE] [--wallet-index WALLET_INDEX]
                        [--yes] [--quiet | --verbose]
                        CHANNEL_ID
</code></pre>

User flow:

* Input the channel id
* Input any optional parameters you would like
* Click the "Extend Add" button
