# Withdraw

Withdraw AGI tokens from MPE wallet

![Withdraw Page](/assets/images/products/AIMarketplace/TUI/Screenshot2024-08-16at7.29.40AM.png) Withdraw Page

```bash
# Format of the command in the SNET CLI

snet account withdraw [-h] [--multipartyescrow-at MULTIPARTYESCROW_AT]
                      [--gas-price GAS_PRICE] [--wallet-index WALLET_INDEX]
                      [--yes] [--quiet | --verbose]
                      AMOUNT
```

User Flow:

* Input the amount of AGIX to withdraw from your MPE wallet
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Withdraw" button
* Confirm/Deny the gas fee charges for the withdraw transaction
