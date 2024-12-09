# Frequently Asked Questions

## What does the SingularityNET Bridge do?

The Bridge provides a means to transfer `AGIX` tokens on Ethereum to `AGIX` tokens on Cardano and vice-versa on a 1:1 basis, as well as other supported tokens: `NTX`, `FET (ASI)`, `WMTX`, `RJV`, and `CGV`.

## How long will it take for the conversion to complete?

The Bridge is moving tokens across two Blockchains and consequently will take a few minutes to complete, to clear their respective consensus mechanisms. If the chains are congested, conversion may take longer.

In all cases, you can view the current state of the conversion in the `Transactions` tab of the Bridge.

Please always check the status of the conversion before submitting a conversion again. In most cases, the transaction has been submitted and is waiting to be finalized by the blockchains.

## What does the Status column on the Transactions page mean?

The Transactions page lists all your conversion requests. The page first lists all the open conversions followed by requests that have been completed.

Each conversion can be in one of the following states as referenced in the Status column

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

## How are my conversions sorted on the Transactions page?

The Transactions page first displays open conversions i.e., conversions that are in the `Initiated`, `Processing`, `Ready for Claim` or `Claim` initiated state.

All `Successful` or `Expired` conversion requests are then displayed sorted by the Creation time.

## I got a message on a Black popup when I initiated my conversion on the Home page. What happened to my conversion?

When a conversion is initiated the Bridge waits to get a confirmation from the web wallet used. Depending on the blockchain this can take some time. If the Bridge does not get back a confirmation in time or if an error occurred, the relevant message is displayed on screen. 

In such cases always, check the Transactions page to see the current status before you re-attempt the transfer. In some cases, it might take longer for the conversion to complete but the conversion is being processed.

## How do I expedite my transaction submitted on the Ethereum blockchain?

If your transaction is taking a lot of time, you may wish to speed it up as shown below 

<ImageViewer src="/assets/images/products/Bridge/faq.webp" alt="faq"/>