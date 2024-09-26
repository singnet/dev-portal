# Update Metadata

Update metadata on blockchain, pulling from local metadata file

<figure><img src="../../../../../../public/assets/images/products/TUI/Screenshot 2024-08-16 at 8.35.52 PM.png" alt=""><figcaption></figcaption></figure>

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
