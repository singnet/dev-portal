# Add/Remove Service Metadata Media

Add or remove (all) media in the service metadata

<figure><img src="../../../../../../../public/assets/images/products/TUI/Screenshot 2024-08-17 at 6.03.31 PM.png" alt=""><figcaption><p>Add/Remove Service Media page</p></figcaption></figure>

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
