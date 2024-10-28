# Claim-all

Claim all channels. We also claim all pending ‘payments in progress’ in case we ‘lost’ some payments.

![Claim All Page](/assets/images/products/AIMarketplace/TUI/ClaimAllPaymentsPage.webp)Claim All page

```bash
# Format of the command in the SNET CLI

snet treasurer claim-all [-h] --endpoint ENDPOINT [--gas-price GAS_PRICE]
                         [--wallet-index WALLET_INDEX] [--yes]
                         [--quiet | --verbose]
```

User Flow:

* Input your daemon endpoint
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Claim" button
* Confirm/Deny the gas fee charges for the claim transaction