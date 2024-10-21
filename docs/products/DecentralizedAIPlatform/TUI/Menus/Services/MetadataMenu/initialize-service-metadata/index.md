# Initialize Service Metadata

Init metadata file with providing protobuf directory (which we publish in IPFS) and display\_name (optionally encoding, service\_type and payment\_expiration\_threshold)

![Initialize Service Metadata Page](/assets/images/products/AIMarketplace/TUI/ServiceMetadataInitializationPage.webp) Initialize Service Metadata Page

```bash
# Format of the command in the SNET CLI

snet service metadata-init [-h] [--metadata-file METADATA_FILE]
                           [--multipartyescrow-at MULTIPARTYESCROW_AT]
                           [--group-name GROUP_NAME]
                           [--endpoints [ENDPOINTS [ENDPOINTS ...]]]
                           [--fixed-price FIXED_PRICE]
                           [--encoding {proto,json}]
                           [--service-type {grpc,jsonrpc,process}]
                           PROTO_DIR DISPLAY_NAME
```

User flow:

* Input proto directory, path to your service directory and your service display name
* Input any optional parameters you would like
* Click the "Initialize service metadata" button
