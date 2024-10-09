# Delete Service

Delete service registration from registry

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-17 at 6.06.52 PM.png" alt=""><figcaption><p>Delete Service page</p></figcaption></figure>

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>
snet service delete [-h] [--registry-at REGISTRY_AT] [--gas-price GAS_PRICE]
                    [--wallet-index WALLET_INDEX] [--yes]
                    [--quiet | --verbose]
                    ORG_ID SERVICE_ID
</code></pre>

User Flow:

* Input the org id and service id path for the service
* Input any optional parameters you would like
* Click the "Delete Service" button
