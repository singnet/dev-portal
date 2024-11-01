# Add/Remove Service Metadata Media

Add or remove (all) media in the service metadata

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/AddRemoveServiceMediaPage.webp" alt="Add/Remove Service Media page"/>

```bash
# Format of the commands in the SNET CLI

snet service metadata-add-media [-h] [--hero_image]
                                [--metadata-file METADATA_FILE]
                                MEDIA_URL
                                
snet service metadata-remove-all-media [-h] [--metadata-file METADATA_FILE]
```

User Flow:

* Adding media
  * Input the media url, and local metadata file path
  * Click the "Add media" button
* Removing media
  * Input the local metadata file path
  * Click the "Remove all Media" button
