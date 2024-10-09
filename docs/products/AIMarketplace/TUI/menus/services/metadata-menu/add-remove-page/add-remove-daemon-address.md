# Add/Remove Daemon Address

Add or remove an Ethereum public address of the daemon, in a given payment group of a service

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-17 at 6.03.04 PM.png" alt=""><figcaption></figcaption></figure>

```bash
# Format of the commands in the SNET CLI

snet service metadata-add-daemon-addresses [-h]
                                           [--metadata-file METADATA_FILE]
                                           group_name DAEMON ADDRESSES
                                           [DAEMON ADDRESSES ...]
                                           
snet service metadata-remove-all-daemon-addresses [-h]
                                                  [--metadata-file METADATA_FILE]
                                                  group_name
```

User Flow:

* Adding an address
  * Input the group name, daemon address to add, and local metadata file path
  * Click the "Add daemon address" button
* Removing ALL addresses
  * Input the group name, and local metadata file path
  * Click the "Remove all daemon addresses" button
