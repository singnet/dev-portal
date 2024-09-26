# Could not retrieve account information



The CLI, and by extension the TUI, doesn't have any validity checks when creating new identities. What we mean by this is, you can theoretically input whatever information you would like into fields like the private key of your wallet during identity creation. The CLI will create the identity with this invalid information, regardless.&#x20;

The issue comes into play when your default identity is invalid, meaning your default identity has faulty information. If this is the issue, the TUI cannot access your identity details (account number, balance, etc.) as your identity isn't a valid account.&#x20;

Therefore, you will always run into the error below, when trying to start the TUI, the application is attempting to print your account balance, but it cannot because your default identity is invalid.&#x20;

<figure><img src="../../../../public/assets/images/products/TUI/Screenshot 2024-08-15 at 6.50.11 AM.png" alt=""><figcaption><p>Invalid identity error on login</p></figcaption></figure>

### Step 1: Activate CLI-only mode

First things first, you need to activate the CLI-only mode, you can find exact instructions in the [execution section ](../getting-started/execution.md#cli-only-mode)



### Step 2: Create identity with the CLI

You then need to utilize this CLI command to create a new, valid, identity:

<figure><img src="../../../../public/assets/images/products/TUI/Screenshot 2024-08-15 at 7.02.38 AM.png" alt=""><figcaption><p>CLI create identity command documentation</p></figcaption></figure>

<pre class="language-bash"><code class="lang-bash"># NOTE: The &#x3C;> is shorthand for "fill this information in here"
# NOTE 2: For network choose mainnet or sepolia for testnet

# Format for wallet private key: 
snet identity create &#x3C;Identity_Name> key --network &#x3C;mainnet | sepolia> --key &#x3C;Wallet_Private_Key>

# Format for mnemonic:
snet identity create &#x3C;Identity_Name> mnemonic --network &#x3C;mainnet | sepolia> --mnemonic &#x3C;24_word_seed_phrase>

<strong># Format for keystore:
</strong>snet identity create &#x3C;Identity_Name> keystore --network &#x3C;mainnet | sepolia> --keystore-path &#x3C;Path_to_Keystore_File>

# Format for trezor:
# NOTE: You obviously need your device plugged in for this
snet identity create &#x3C;Identity_Name> trezor --network &#x3C;mainnet | sepolia>

# Format for ledger:
# NOTE: You obviously need your device plugged in for this
snet identity create &#x3C;Identity_Name> ledger --network &#x3C;mainnet | sepolia>
</code></pre>

<mark style="color:red;">NOTE</mark>: If you already have a different, valid, identity created. You can skip the new identity creation step and just switch to the valid identity you have already created. However, if you are unsure it is probably best to just create a new one.&#x20;



### Step 3: Switch to your new Identity

Run the following command to switch to the new identity you have created

```
snet identity <Identity_Name_of_new_identity>
```



### Step 4: Check your new identity is valid&#x20;

Just check if the CLI can print your account balance, if it can you have a valid identity.&#x20;

```
snet account balance
```

If you can see Ethereum, AGIX and MPE balances of your identity, you have a valid identity. Otherwise, please retry this guide and ensure you have the correct information for your cryptocurrency wallet. \
\
If you have a valid identity, you can the restart the TUI with your repective Operating System's run script, as detailed [here](../getting-started/execution.md)

