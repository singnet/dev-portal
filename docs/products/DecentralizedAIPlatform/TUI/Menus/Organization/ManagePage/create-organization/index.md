# Create Organization

Create an Organization

![Create Organization page](/assets/images/products/AIMarketplace/TUI/CreateOrganizationPage.webp)Create Organization page

```bash
# Format of the commands in the SNET CLI

snet organization create [-h] [--metadata-file METADATA_FILE]
                         [--members ORG_MEMBERS] [--gas-price GAS_PRICE]
                         [--wallet-index WALLET_INDEX] [--yes]
                         [--quiet | --verbose]
                         [--registry-at REGISTRY_ADDRESS]
                         ORG_ID
```

User Flow:

* Input the organization ID
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Create" button
* Confirm/Deny the gas fee charges for the create transaction
