# Change Organization Owner

Change Organization’s owner

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-16 at 8.44.45 PM.png" alt=""><figcaption><p>Change organization owner page</p></figcaption></figure>

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
