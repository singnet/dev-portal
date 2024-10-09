# Delete Organization

Delete an organization

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-16 at 8.49.29 PM.png" alt=""><figcaption><p>Delete organization page</p></figcaption></figure>

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
