# Call

Call server. We ask state of the channel from the server if needed. Channel should be already initialized.

![Call service page](/assets/images/products/AIMarketplace/TUI/ClientCallServerPage.webp)Call service page

```bash
# Format of the command in the SNET CLI

snet client call [-h] [--service SERVICE] [--wallet-index WALLET_INDEX]
                 [--multipartyescrow-at MULTIPARTYESCROW_AT]
                 [--save-response FILENAME]
                 [--save-field SAVE_FIELD SAVE_FIELD] [--endpoint ENDPOINT]
                 [--channel-id CHANNEL_ID] [--from-block FROM_BLOCK] [--yes]
                 [--skip-update-check]
                 ORG_ID SERVICE_ID group_name METHOD [PARAMS]
```

User flow:

* Input the org id, service id, group name, method and a JSON formatted list of parameters
* Input any optional parameters you would like
* Click the "Call service" button
