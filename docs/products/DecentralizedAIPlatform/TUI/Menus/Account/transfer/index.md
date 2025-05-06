# Transfer

Transfer AGI tokens inside MPE wallet

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/TransferAGIX.webp" alt="Transfer Page"/>

```bash
# Format of the command in the SNET CLI

snet account transfer [-h] [--multipartyescrow-at MULTIPARTYESCROW_AT]
                      [--gas-price GAS_PRICE] [--wallet-index WALLET_INDEX]
                      [--yes] [--quiet | --verbose]
                      RECEIVER AMOUNT
```

User Flow:

* Input the amount of ASI (FET) to transfer within the MPE wallet
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Transfer" button
* Confirm/Deny the gas fee charges for the transfer transaction
