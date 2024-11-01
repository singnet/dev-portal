# Claim-expired

Claim all channels which are close to expiration date. We also claim all pending ‘payments in progress’ in case we ‘lost’ some payments.

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/ClaimExpiredPaymentsPage.webp" alt="Claim expired page"/>

```bash
# Format of the command in the SNET CLI

snet treasurer claim-expired [-h]
                             [--expiration-threshold EXPIRATION_THRESHOLD]
                             --endpoint ENDPOINT [--gas-price GAS_PRICE]
                             [--wallet-index WALLET_INDEX] [--yes]
                             [--quiet | --verbose]
```

User Flow:

* Input your daemon endpoint
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Claim" button
* Confirm/Deny the gas fee charges for the claim transaction
