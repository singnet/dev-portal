# Invoke a service with the TUI

### Step 1: Deposit AGIX in MPE

Once you have some AGIX in your wallet, you can deposit it into your [Multi-party Escrow](https://dev.singularitynet.io/docs/ai-developers/mpe/) with the [deposit page](/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/deposit/) (found in the account page), as shown below.&#x20;

![Account Deposit Page](/assets/images/products/AIMarketplace/TUI/TUIDeposit.webp)Account Deposit Page

Fill in the amount of AGIX you would like to deposit into your MPE, scroll down and click `Deposit`

You can also click the radio button for `Verbose Printing` if you would like to see all the financial transaction details.

If the AGIX is deposited successfully, you should receive a popup similar to this:

![Deposit confirmation window](/assets/images/products/AIMarketplace/TUI/TUIDepositConfirm.webp)Deposit confirmation window

The TUI will then redirect to the account page, where you will notice the AGIX amount in your MPE has been updated, to reflect the new deposit, like below.

![Example Account Page](/assets/images/products/AIMarketplace/TUI/TUIAccountPage.webp)Example Account Page

### Step 2: Initialize a channel

Using the left navigation bar, switch to the client menu.&#x20;

![Client Page](/assets/images/products/AIMarketplace/TUI/TUIClientPage.webp)Client Page

Then navigate to the "[Channel Open Initialize](/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/open-initialize/)" Page, which can be found at:

```
"Client Page" -> "Channels Page" -> "Initialize/Open Page" -> "Open Initialize Page"
```

If you have arrived at the correct page, you should see the menu shown below

![Channel Open Initialize page](/assets/images/products/AIMarketplace/TUI/TUIChannelOpenInit.webp)Channel Open Initialize page

Fill out the fields according to which organization you would like to create a channel with, and how many AGIX tokens you would like to add to the channel.&#x20;

**`Organization ID`** - ID of the organization who's service you would like to invoke. You can find a list of all the organization ids on a network with the [snet organization list ](https://snet-cli-docs.singularitynet.io/organization.html#list)command (executed through the custom command menu)

**`Payment Group`** - The name of the payment group for the service, most commonly default\_group

**`Amount`** - The amount of AGIX tokens you would like to add to the channel, adding more later costs gas fees as explained above.&#x20;

**`Expiration`** - The expiration time in blocks (\<int>), or in blocks related to the current\_block (+\<int>blocks), or in days related to the current\_block and assuming 15 sec/block (+\<int>days). For example `+2days` creates a channel that expires 2 days from when it was created.

Once you have put in the details, and assuming the organization ID is correct, you will receive a popup detailing the price and other transaction information. This popup gives you the chance to agree or deny to the charges for calling the service, as shown below:

![Confirmation dialog for opening and initializing channel](/assets/images/products/AIMarketplace/TUI/TUIChannelCreationConfirm.webp)Confirmation dialog for opening and initializing channel

Proceed with the channel creation, and you will receive one more dialogue indicating the successful creation of the channel:

![Channel Open-Init success](/assets/images/products/AIMarketplace/TUI/TUIChannelCreationSuccess.webp)Channel Open-Init success

<mark style="color:red;">NOTE</mark>: If you receive an error stating something along the lines of `The process cannot get access to the file, because the file is being used by another process`, it is because the channel creation was confirmed too quickly. But don't worry, the channel has been created just fine. You can move on to the next step of the process

### Step 3: Call the service

Once you have opened and initialized a channel, with AGIX deposited in it. You can invoke services from the organization you initialized the channel for.&#x20;

Navigate to the client page, and open the "[Call](/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/call/)" Menu. You should be greeted with the menu below

![Client Call Menu - Filled out with example details](/assets/images/products/AIMarketplace/TUI/TUIClientCall.webp)Client Call Menu - Filled out with example details

As you can see pictured above, we have filled out the basic details to call the "add" function under the `ExampleService` service, created by SingularityNET. You must do the same for whatever service you are trying to call.&#x20;

<mark style="color:red;">NOTE</mark>: In the parameters input, you can utilize a path to a JSON file, containing your service call parameters, or you can directly insert JSON into the service call. You may run into issues with sending JSON directly in the service call as pictured above (usually only on Windows), you can find more information in the [FAQ](/docs/products/DecentralizedAIPlatform/TUI/FAQ/).

Once you have inserted all the necessary information, you can scroll down and click on `View Server Call Price`. This should display a confirmation dialogue on your screen, detailing the AGIX cost of the service invocation you would like to execute.&#x20;

![Client call confirmation dialogue](/assets/images/products/AIMarketplace/TUI/TUIClientCallConfirm.webp)Client call confirmation dialogue

Upon confirmation, you will recieve another dialogue with the output from the service invokation:

![Client call success dialogue](/assets/images/products/AIMarketplace/TUI/TUIClientCallSuccess.webp)Client call success dialogue 

You have now successfully invoked a service through the SNET marketplace. Congratulations.&#x20;
