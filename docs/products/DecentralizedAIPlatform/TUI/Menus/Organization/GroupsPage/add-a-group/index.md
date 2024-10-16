# Add a Group

Add group to organization in local organization metadata&#x20;

![Add Group page](/assets/images/products/AIMarketplace/TUI/Screenshot2024-08-16at8.39.25PM.png)Add Group page

```bash
# Format of the command in the SNET CLI

snet organization add-group [-h]
                            [--payment-expiration-threshold PAYMENT_EXPIRATION_THRESHOLD]
                            [--payment-channel-storage-type PAYMENT_CHANNEL_STORAGE_TYPE]
                            [--payment-channel-connection-timeout PAYMENT_CHANNEL_CONNECTION_TIMEOUT]
                            [--payment-channel-request-timeout PAYMENT_CHANNEL_REQUEST_TIMEOUT]
                            [--metadata-file METADATA_FILE]
                            [--registry-at REGISTRY_AT]
                            group_name payment_address
                            [endpoints [endpoints ...]]
```

User Flow:

* Input your group name, endpoints, and payment address
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Input the path to the local metadata file to edit
* Click the "Add group" button
