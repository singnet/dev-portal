# Initialize Metadata

Initialize metadata for organization (locally)

![Initialize Metadata page](/assets/images/products/AIMarketplace/TUI/InitializeMetadataPage.webp)Initialize Metadata page

```bash
# Format of the command in the SNET CLI

snet organization metadata-init [-h] [--registry-at REGISTRY_AT]
                                [--metadata-file METADATA_FILE]
                                ORG_NAME ORG_ID ORG_TYPE
```

User Flow:

* Input the organization name and id for the organization metadata you want to create
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Input the organization type
* Click the "Initialize" button

<mark style="color:red;">NOTE</mark>: The metadata file will be saved to the TUI directory, if you do not specify a directory to initialize the metadata in.&#x20;
