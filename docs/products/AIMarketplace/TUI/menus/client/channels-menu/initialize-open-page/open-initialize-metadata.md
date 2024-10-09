# Open Initialize Metadata

Open and initialize channel using local organization metadata file

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-17 at 6.22.41 PM.png" alt=""><figcaption><p>Open Initialize Metadata page</p></figcaption></figure>

```bash
# Format of the command in the SNET CLI

snet channel open-init-metadata [-h] [--registry-at REGISTRY_AT] [--force]
                                [--signer SIGNER]
                                [--multipartyescrow-at MULTIPARTYESCROW_AT]
                                [--gas-price GAS_PRICE]
                                [--wallet-index WALLET_INDEX] [--yes]
                                [--quiet | --verbose] [--open-new-anyway]
                                [--from-block FROM_BLOCK]
                                [--metadata-file METADATA_FILE]
                                ORG_ID group_name AMOUNT EXPIRATION
```

User flow:

* Input the organization id, group name, amount of AGIX to add to the channel, the duration of the channel before expiration and the local metadata file path
* Input any optional parameters you would like
* Click the "Open Initialize Metadata" button
