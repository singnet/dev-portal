# Call

Call server. We ask state of the channel from the server if needed. Channel should be already initialized.

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-17 at 6.16.25 PM.png" alt=""><figcaption><p>Call service page</p></figcaption></figure>

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
