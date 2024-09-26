# Opening and Initializing a payment channel

Using the left navigation bar, switch to the client menu.&#x20;

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

Then navigate to the "[Channel Open Initialize](../menus/client/channels-menu/initialize-open-page/open-initialize.md)" Page, which can be found at:

```
"Client Page" -> "Channels Page" -> "Initialize/Open Page" -> "Open Initialize Page"
```

If you have arrived at the correct page, you should see the menu shown below

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

Fill out the fields according to which organization you would like to create a channel with, and how many AGIX tokens you would like to add to the channel.&#x20;

**`Organization ID`** - ID of the organization who's service you would like to invoke. You can find a list of all the organization ids on a network with the [snet organization list ](https://snet-cli-docs.singularitynet.io/organization.html#list)command (executed through the custom command menu)

**`Payment Group`** - The name of the payment group for the service, most commonly default\_group

**`Amount`** - The amount of AGIX tokens you would like to add to the channel, adding more later costs gas fees as explained above.&#x20;

**`Expiration`** - The expiration time in blocks (\<int>), or in blocks related to the current\_block (+\<int>blocks), or in days related to the current\_block and assuming 15 sec/block (+\<int>days). For example `+2days` creates a channel that expires 2 days from when it was created.

Once you have put in the details, and assuming the organization ID is correct, you will receive a popup detailing the price and other transaction information. This popup gives you the chance to agree or deny to the charges for calling the service, as shown below:

{% embed url="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FOdEXvTsWnzaTpz7wE78K%2Fuploads%2FTnQu4hhWxy45WLmxeuXo%2FTUI%20Channel%20creation%20confirm.png?alt=media&token=c4d6f610-6035-4daa-a187-de6e3c71b97c" %}

Proceed with the channel creation, and you will receive one more dialogue indicating the successful creation of the channel:

{% embed url="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FOdEXvTsWnzaTpz7wE78K%2Fuploads%2F7gjZrhSbFNaeUVxV6fls%2FTUI%20Channel%20creation%20success.png?alt=media&token=bd792492-6ad4-4a3b-8090-b28988332c8f" %}

<mark style="color:red;">NOTE</mark>: If you receive an error stating something along the lines of `The process cannot get access to the file, because the file is being used by another process`, it is because the channel creation was confirmed too quickly. But don't worry, the channel has been created just fine
