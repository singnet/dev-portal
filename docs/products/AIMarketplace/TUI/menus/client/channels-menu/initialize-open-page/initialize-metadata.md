# Initialize Metadata

Initialize channel using local organization metadata file

<figure><img src="../../../../../../../public/assets/images/products/TUI/Screenshot 2024-08-17 at 6.19.26 PM.png" alt=""><figcaption><p>Initialize Channel with Metadata page</p></figcaption></figure>

```bash
# Format of the command in the SNET CLI

snet channel init-metadata [-h] [--registry-at REGISTRY_AT]
                           [--metadata-file METADATA_FILE]
                           [--multipartyescrow-at MULTIPARTYESCROW_AT]
                           [--wallet-index WALLET_INDEX]
                           ORG_ID group_name CHANNEL_ID
```

User flow:

* Input the organization id, group name, channel id and local metadata file path
* Input any optional parameters you would like
* Click the "Initialize Metadata" button
