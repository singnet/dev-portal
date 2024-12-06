# If you encountered an error?
Here we describe common errors and how to fix them yourself!

You may see the following errors when transferring from Cardano to Ethereum:

1. `UTxO Balance Insufficient[x]` - That means, that there are not enough free outputs on the wallet to use to pay for comission. To solve this issue the user needs to transfer some amount of ADA from his/her wallet back to his/her wallet to create one more output. We recommend to re-send amount not less that **5 ADA** (min **2 ADA**).

This issues are arising due to Cardano library used. But our team is actively working on improvements to solve all this issues to be covered by wallet and our frontend themselves.

2. `Not enough ADA leftover to include non-ADA assets in a change address` - That means, that output with any Token (in our case AGIX) contains insufficient amount of ADA on it. 

To fix this issue the user need to send from his/her wallet back to his/her wallet desired amount of Token to transfer and 2.5 ADA (or more). After this action on your wallet will appear new output with needed amount of Token and ADA to pay for comission.

3. `You watch your created conversions become instant expired` - This suggests that you're trying to create conversions too often. Try it, pause for a moment and create a conversion a little later.

4. `Huge transaction fee (CLAIM tokens)` (from 0.3 ETH and more at the moment) - In most cases, this indicates an error when creating the transaction, but it can also be an internal wallet error - you should just wait a bit and try to make the transaction a bit later.

5. `Can't find Metamask` - This error means that there is no Metamask wallet extension in your browser. Try installing or reinstalling the extension.

6. `'WARNING! Connected cardano account seems not to be active in your wallet. Check please and change connected to the bridge address as active in your wallet and fill in the amount you want to transfer.'` - The error means that at the moment a different wallet from the one that was connected is active in the Cardano wallet.

7. `'WARNING! You changed address right before conversion! Please, change back connected to the bridge wallet as active in your wallet and repeat conversion.'` - The wallet does not have the cardano address expected for the conversion, recheck the connected account and its address with the address in the wallets tab in the bridge portal.

8. `Insufficient balance for conversion` - This error indicates that you do not have enough balance of the token being transferred and need to replenish it

9. `Minimum transaction amount is X` - The amount you entered is less than the minimum amount allowed for transfer. You need to increase the transfer amount for conversion.

10. `Maximum transaction amount is X` - The amount you entered is greater than the maximum amount allowed for transfer. It is necessary to decrease the transfer amount for conversion.

11. `Insufficient pool balance` - The bridge pool balance is insufficient to transfer the amount entered, try another time when the limit is higher.

12. `Invalid amount` - You entered a null or incorrect number, try entering a correct value

13. `Decimal places exceeded` - The token has fewer decimal characters than you specified - try decreasing the decimal value.