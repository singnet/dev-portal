# Ethereum-Binance

### Algorithm of working with the Ethereum-Binance bridge

::: warning
Currently, the bridge between Ethereum and Binance Smart Chain works only for **CGV** and **RJV** tokens:  
[Bridge Link](https://bsc-bridge.singularitynet.io/)
:::

---

### General Information
When you load the bridge page, the default direction is from **Binance Smart Chain** to **Ethereum**, but you can always change it!

---

### Example Flow: From Ethereum to Binance Smart Chain

1. **Connect Accounts**  
   Connect an Ethereum account and a Binance Smart Chain account.

2. **Switch Network to "FROM"**  
   Set the network to the **FROM** direction (in this flow: Ethereum).

3. **Approve Tokens**  
   - Click the **"Approve"** button to begin the approval process.  
   - A **Metamask** wallet prompt will appear requesting approval for the specified amount of tokens.  
   - Approve at least the amount you intend to transfer.  
   - This step is required to allow the bridge to interact with your tokens securely.  
   > Approval in MetaMask enables the bridge's smart contract to manage a specified token in a specified amount and facilitate its transfer between networks. Learn more about token approvals [here](https://support.metamask.io/transactions-and-gas/transactions/what-is-a-token-approval/).

4. **Convert Tokens**  
   - Once the approval is complete, the **"Convert"** button will appear.  
   - Click **"Convert"** and follow the wallet prompts to sign the transaction.  
   - Tokens will be **burned** on the Ethereum network, and an equivalent amount will be **minted** on the Binance Smart Chain network.

5. **Switch to "TO" Network and Account**  
   Switch the network and account to **Binance Smart Chain** (in this flow: Binance).

6. **Claim Tokens**  
   - Click the **"Claim"** button in the **Transactions Tab** and confirm the transaction on the Binance Smart Chain network.  
   - Ensure you have sufficient funds for the gas fee.

> **Note:**  
> Transferring tokens and claiming tokens are paid operations. Ensure you have enough funds to cover the gas fees for both transfer and claim operations.

---

### Procedure: From Binance Smart Chain to Ethereum

1. **Connect Accounts**  
   Connect an Ethereum account and a Binance Smart Chain account.

2. **Switch Network to "FROM"**  
   Set the network to the **FROM** direction (in this flow: Binance Smart Chain).

3. **Approve Tokens**  
   - Click the **"Approve"** button to begin the approval process.  
   - A **Metamask** wallet prompt will appear requesting approval for the specified amount of tokens.  
   - Approve at least the amount you intend to transfer.  
   - This step is required to allow the bridge to interact with your tokens securely.  
   > Approval in MetaMask enables the bridge's smart contract to manage a specified token in a specified amount and facilitate its transfer between networks. Learn more about token approvals [here](https://support.metamask.io/transactions-and-gas/transactions/what-is-a-token-approval/).

4. **Convert Tokens**  
   - Once the approval is complete, the **"Convert"** button will appear.  
   - Click **"Convert"** and follow the wallet prompts to sign the transaction.  
   - Tokens will be **burned** on the Binance Smart Chain network, and an equivalent amount will be **minted** on the Ethereum network.

5. **Switch to "TO" Network and Account**  
   Switch the network and account to **Ethereum** (in this flow: Ethereum).

6. **Claim Tokens**  
   - Click the **"Claim"** button in the **Transactions Tab** and confirm the transaction on the Ethereum network.  
   - Ensure you have sufficient funds for the gas fee.

> **Note:**  
> Transferring tokens and claiming tokens are paid operations. Ensure you have enough funds to cover the gas fees for both transfer and claim operations.
