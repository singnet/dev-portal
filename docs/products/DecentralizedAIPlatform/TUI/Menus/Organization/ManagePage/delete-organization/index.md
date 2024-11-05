# Delete Organization

Delete an organization

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/DeleteOrganizationPage.webp" alt="Delete organization page"/>


```bash
# Format of the commands in the SNET CLI

snet organization delete [-h] [--gas-price GAS_PRICE]
                         [--wallet-index WALLET_INDEX] [--yes]
                         [--quiet | --verbose]
                         [--registry-at REGISTRY_ADDRESS]
                         ORG_ID
```

User Flow:

* Input the organization ID
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Delete" button
* Confirm/Deny the gas fee charges for the delete transaction
