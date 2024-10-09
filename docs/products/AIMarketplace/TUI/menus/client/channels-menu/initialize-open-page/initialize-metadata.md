# Initialize Metadata

Initialize channel using local organization metadata file

![Initialize Channel with Metadata page](/assets/images/products/AIMarketplace/TUI/Screenshot2024-08-17at6.19.26PM.png)Initialize Channel with Metadata page

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
