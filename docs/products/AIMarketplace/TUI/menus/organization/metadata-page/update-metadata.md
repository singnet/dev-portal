# Update Metadata

Update metadata on blockchain, pulling from local metadata file

![Update Metadata](/assets/images/products/AIMarketplace/TUI/Screenshot2024-08-16at8.35.52PM.png) Update Metadata Page

```bash
# Format of the command in the SNET CLI

snet organization update-metadata [-h] [--metadata-file METADATA_FILE]
                                  [--members ORG_MEMBERS]
                                  [--gas-price GAS_PRICE]
                                  [--wallet-index WALLET_INDEX] [--yes]
                                  [--quiet | --verbose]
                                  [--registry-at REGISTRY_ADDRESS]
                                  ORG_ID
```

User Flow:

* Input the organization ID, and local metadata file path
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Update metadata" button
* Confirm/Deny the gas fee charges for the deposit transaction
