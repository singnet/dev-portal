# Update Group

Update group of organization

![Update group page](/assets/images/products/AIMarketplace/TUI/Screenshot2024-08-16at8.39.37PM.png)Update group page

```bash
# Format of the command in the SNET CLI

snet organization update-group [-h] [--payment-address PAYMENT_ADDRESS]
                               [--endpoints [ENDPOINTS [ENDPOINTS ...]]]
                               [--payment-expiration-threshold PAYMENT_EXPIRATION_THRESHOLD]
                               [--payment-channel-storage-type PAYMENT_CHANNEL_STORAGE_TYPE]
                               [--payment-channel-connection-timeout PAYMENT_CHANNEL_CONNECTION_TIMEOUT]
                               [--payment-channel-request-timeout PAYMENT_CHANNEL_REQUEST_TIMEOUT]
                               [--metadata-file METADATA_FILE]
                               [--registry-at REGISTRY_AT]
                               group_id
```

User Flow:

* Input your group id
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Input the path to the local metadata file
* Click the "Update group" button
