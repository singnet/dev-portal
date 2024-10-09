# Manage Assets

Add assets or remove all assets from local organization metadata

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-16 at 8.34.07 PM.png" alt=""><figcaption><p>Manage Assets Organization Metdata page</p></figcaption></figure>

```sh
# Format of the commands in the SNET CLI

snet organization metadata-add-assets [-h] [--metadata-file METADATA_FILE]
                                      ASSET_FILE_PATH ASSET_TYPE
                                      
snet organization metadata-remove-all-assets [-h]
                                             [--metadata-file METADATA_FILE]
```

User Flow:

* If you would like to add a hero image to your local metadata, input the path (Only for Add Asset)
* Input the path of your local metadata file
* Click the "Add Asset" or "Remove ALL Assets" button, depending on what you would like to do
