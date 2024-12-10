# If You Encountered an Error
Here we describe common errors and how to fix them yourself!

You may see the following errors when transferring from Cardano to Ethereum:

---

### Problem: `UTxO Balance Insufficient[x]`
**Description:** There are not enough free outputs on the wallet to pay for the transaction fee.  
**Solution:** Transfer some ADA from your wallet back to your wallet to create an additional output. We recommend sending at least **5 ADA** (minimum **2 ADA**).  

**Note:** This issue arises due to the Cardano library used. Our team is actively working on improvements to resolve this in the wallet and frontend.

---

### Problem: `Not enough ADA leftover to include non-ADA assets in a change address`
**Description:** The output with a token (e.g., AGIX) contains insufficient ADA.  
**Solution:** Send the desired token amount along with at least **2.5 ADA** from your wallet back to your wallet. This will create a new output with enough ADA to cover the fee.

---

### Problem: `You watch your created conversions become instantly expired`
**Description:** You are trying to create conversions too frequently.  
**Solution:** Pause for a moment and try creating the conversion later.

---

### Problem: `Huge transaction fee (CLAIM tokens) (e.g., 0.3 ETH or more)`
**Description:** This typically indicates an error in transaction creation or an internal wallet issue.  
**Solution:** Wait for some time and try the transaction again later.

---

### Problem: `Can't find Metamask`
**Description:** The browser does not detect the MetaMask extension.  
**Solution:** Install or reinstall the MetaMask extension.

---

### Problem: `WARNING! Connected Cardano account seems not to be active in your wallet. Check please and change connected to the bridge address as active in your wallet and fill in the amount you want to transfer.`

**Description:** The currently active wallet in your Cardano extension is different from the one connected to the bridge.  
**Solution:** Ensure the wallet connected to the bridge is active in your Cardano wallet, then proceed with the transfer.

---

### Problem: `WARNING! You changed address right before conversion! Please, change back connected to the bridge wallet as active in your wallet and repeat conversion.`

**Description:** The wallet address expected for the conversion is not active.  
**Solution:** Recheck the connected account and its address in your wallet. Ensure it matches the one shown in the wallets tab on the bridge portal.

---

### Problem: `Insufficient balance for conversion`
**Description:** Your wallet does not have enough of the token being transferred.  
**Solution:** Replenish your token balance before attempting the transfer again.

---

### Problem: `Minimum transaction amount is X`
**Description:** The amount entered is less than the minimum required for a transfer.  
**Solution:** Increase the amount to meet or exceed the minimum allowed for conversion.

---

### Problem: `Maximum transaction amount is X`
**Description:** The amount entered exceeds the maximum allowed for a transfer.  
**Solution:** Reduce the amount to fit within the maximum limit.

---

### Problem: `Insufficient pool balance`
**Description:** The bridge pool balance is insufficient to cover the entered amount.  
**Solution:** Wait and try again later when the pool balance increases.

---

### Problem: `Invalid amount`
**Description:** You entered a null or incorrect value.  
**Solution:** Enter a valid numerical value.

---

### Problem: `Decimal places exceeded`
**Description:** The token does not support as many decimal places as specified.  
**Solution:** Reduce the number of decimal places in your entry.
