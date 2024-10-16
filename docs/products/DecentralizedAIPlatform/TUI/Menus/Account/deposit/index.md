# Deposit

Initiates the process to deposit AGIX tokens into the MPE wallet.

![Deposit Page](/assets/images/products/AIMarketplace/TUI/Screenshot2024-08-16at7.30.09AM.png)Deposit Page

```bash
# Format of the command in the SNET CLI

snet account deposit [-h] [--singularitynettoken-at SINGULARITYNETTOKEN_AT]
                     [--multipartyescrow-at MULTIPARTYESCROW_AT]
                     [--gas-price GAS_PRICE] [--wallet-index WALLET_INDEX]
                     [--yes] [--quiet | --verbose]
                     AMOUNT
```

User Flow:

* Input the amount of AGIX to deposit into your MPE wallet
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Deposit" button
* Confirm/Deny the gas fee charges for the deposit transaction
