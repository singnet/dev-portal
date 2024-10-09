# Open Initialize

Open and initialize channel using organization metadata from Registry

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-17 at 6.22.25 PM.png" alt=""><figcaption><p>Open Initialize Channel Page</p></figcaption></figure>

```bash
# Format of the command in the SNET CLI

snet channel open-init [-h] [--registry-at REGISTRY_AT] [--force]
                       [--signer SIGNER]
                       [--multipartyescrow-at MULTIPARTYESCROW_AT]
                       [--gas-price GAS_PRICE] [--wallet-index WALLET_INDEX]
                       [--yes] [--quiet | --verbose] [--open-new-anyway]
                       [--from-block FROM_BLOCK]
                       ORG_ID group_name AMOUNT EXPIRATION
```

User flow:

* Input the organization id, group name, amount of AGIX to add to the channel, and the duration of the channel before expiration
* Input any optional parameters you would like
* Click the "Open Initialize" button
