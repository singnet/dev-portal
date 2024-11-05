# Change Organization Owner

Change Organization’s owner

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/OrganizationOwnerPage.webp" alt="Change organization owner page"/>


```bash
# Format of the commands in the SNET CLI

snet organization change-owner [-h] [--gas-price GAS_PRICE]
                               [--wallet-index WALLET_INDEX] [--yes]
                               [--quiet | --verbose]
                               [--registry-at REGISTRY_ADDRESS]
                               ORG_ID OWNER_ADDRESS
```

User Flow:

* Input the organization ID and address of new owner&#x20;
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Change Owner" button
* Confirm/Deny the gas fee charges for the change transaction
