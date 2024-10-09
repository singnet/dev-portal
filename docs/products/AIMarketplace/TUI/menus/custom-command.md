# Custom Command

<mark style="color:red;">NOTE</mark>: It is best for you to aquiant yourself with the [CLI documentation](http://snet-cli-docs.singularitynet.io/index.html) in general, even if you prefer to use the TUI. The CLI is the primary method of interacting with the SingularityNET marketplace (aside from the DApp) and is extremely helpful to learn.



The custom command page is slightly different. It allows you to run whatever command you would like with the CLI, through the TUI. This is primarily for commands that aren't already implemented into the TUI, or if you would like to run a command with a specific parameter combination that isn't possible.

<figure><img src="/assets/images/products/TUI/TUI Custom Command.png" alt=""><figcaption><p>Custom Command Page</p></figcaption></figure>

In essence, the page is very simple:

### Root command Input

* This is your base command (eg: account, identity, network, session, etc.)
* You can think of this is the object your command is affecting/altering
* A list of these can be found on the left-side purple navigation bar on the [CLI documentation](../../tools/CLI/snet-cli.md)

### Sub-command Input

* This is the sub-command for your base command
* Examples
  * Account (Base)
    * Withdraw (Sub)
    * Deposit (Sub)
    * Print (Sub)
* You can think of this as the function you are applying to your base command's object. Basically the actual functionality of the command you are trying to run.&#x20;
* A list of these can be found on the command page for the associated base command. For example, here are all the subcommands related to the base command [Contract](https://snet-cli-docs.singularitynet.io/contract.html)

### Command Arguments Input

* These are just the arguments for your command, these differ between sub-commands, so you should look at the [CLI documentation](../../tools/CLI/snet-cli.md) to understand exactly what parameters are required (or utilize the built-in page in the TUI if it exists)
* They MUST be seperated by spaces, not commas or anything else, and be in the order of **"POSITIONAL NAMED OPTIONAL"**

### Working Directory Input

* This is just to change the working directory of the custom command you would like to run
* For example, if your service (metadata, proto files, etc) are in another directory, you can run the command straight from that directory so the paths are easier.&#x20;
* The default is the root directory of the TUI

### Print traceback radio button

* Instructs the CLI to print the stack traceback for debugging.&#x20;

<mark style="color:red;">NOTE</mark>: You do not need to add the "snet" command as a prefix to the root command, that will be added automatically. This is primarily to prevent command injection and for a little bit of convenience.&#x20;
