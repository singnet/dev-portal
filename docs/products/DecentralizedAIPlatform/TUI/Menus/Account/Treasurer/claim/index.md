# Claim

Claim given channels. We also claim all pending ‘payments in progress’ in case we ‘lost’ some payments.

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/PaymentClaimPage.webp" alt="Claim page"/>

```bash
# Format of the command in the SNET CLI

snet treasurer claim [-h] --endpoint ENDPOINT [--gas-price GAS_PRICE]
                     [--wallet-index WALLET_INDEX] [--yes]
                     [--quiet | --verbose]
                     CHANNELS [CHANNELS ...]
```

User Flow:

* Input the channel ids of channels to claim payments from
* Input your daemon endpoint
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Claim" button
* Confirm/Deny the gas fee charges for the claim transaction
