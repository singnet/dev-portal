# Manage Contacts

Add/Remove-all contact(s) in your local organization metadata

<figure><img src="../../../../../../public/assets/images/products/TUI/Screenshot 2024-08-16 at 8.35.24 PM.png" alt=""><figcaption><p>Manage Contacts page</p></figcaption></figure>

```bash
# Format of the commands in the SNET CLI

snet organization metadata-add-contact [-h] [--phone PHONE] [--email EMAIL]
                                       [--metadata-file METADATA_FILE]
                                       contact_type
                                       
snet organization metadata-remove-all-contacts [-h]
                                               [--metadata-file METADATA_FILE]
```

User Flow:

* If you would like to add a contact to your local metadata, input the type (and number and email)
* Input the path of your local metadata file
* Click the "Add Contact" or "Remove ALL Contacts" button, depending on what you would like to do
