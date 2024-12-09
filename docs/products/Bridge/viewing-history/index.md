# Viewing History

To view all the transactions, click on the `Transactions` tab on the main page

<ImageViewer src="/assets/images/products/Bridge/viewing-history.webp" alt="ViewingHistory"/>

---

### Transaction States

- **`Initiated`**  
  The conversion request has been initiated, and the Bridge is waiting for confirmations from the blockchain before moving to the **Processing** state.  
  _You do not have to take any action at this stage, just wait for the conversion to proceed._

---

- **`Processing`**  
  The Bridge is minting or burning tokens as part of the conversion.  
  _You do not have to take any action at this stage, just wait for the conversion to proceed._

---

- **`Ready for Claim`**  
  This state applies to conversions from **Cardano to Ethereum** and indicates that the tokens have moved to the Ethereum side.  
  _To claim the tokens, initiate the claim from the page. You will need to perform a wallet operation to claim the tokens into your wallet._
  
  _Claiming tokens on the Ethereum network is a paid operation. Ensure you have at least 0.005 ETH in your wallet to cover the gas fee for the claim transaction._

---

- **`Claim Initiated`**  
  This state applies to conversions from **Cardano to Ethereum** and indicates that the Bridge is waiting for confirmations from the Ethereum blockchain.  
  _You do not have to take any action at this stage._

---

- **`Expired`**  
  The conversion request has expired. This typically occurs when the first step of moving tokens fails.  

  - **Ethereum to Cardano**: This can happen if you signed for the conversion but did not complete the next step of transferring tokens. In this case, a conversion request was created, but no tokens were moved.  
  - **Cardano to Ethereum**: This can happen if you created a conversion but did not deposit tokens to the provided address or deposited an incorrect amount.

---

- **`Success`**  
  Your conversion is successful, and the tokens have reached your wallet.