# Frequently Asked Questions

## What does the SingularityNET Bridge do?

The Bridge provides a means to transfer AGIX tokens on Ethereum to AGIX tokens on Cardano and vice-versa on a 1:1 basis as promised in the phase two proposal.

## How long will it take for the conversion to complete?

The Bridge is moving tokens across two Blockchains and consequently will take a few minutes to complete, to clear their respective consensus mechanisms. If the chains are congested, conversion may take longer.

In all cases, you can view the current state of the conversion in the "Transactions" tab of the Bridge.

Please always check the status of the conversion before submitting a conversion again. In most cases, the transaction has been submitted and is waiting to be finalized by the blockchains.

## What does the Status column on the Transactions page mean?

The Transactions page lists all your conversion requests. The page first lists all the open conversions followed by requests that have been completed.

Each conversion can be in one of the following states as referenced in the Status column

* Initiated - The conversion request has been initiated and the Bridge is waiting for confirmations from the Blockchain before it moves to the Processing state. You do not have to do anything at this state, just wait for the conversion to move to the next state.

* Processing - The Bridge is minting/burning tokens as part of the conversion. You do not have to do anything at this state, just wait for the conversion to move to the next state.

* Ready for Claim - This state applies for conversions from Cardano to Ethereum and indicates that the tokens have moved to the Ethereum side. You need to claim the tokens from the Bridge. Initiate the claim from the page, you will need to perform a wallet operation to claim the tokens to your wallet

* Claim Initiated - This state applies for conversions from Cardano to Ethereum and indicates that the Bridge is waiting for confirmations from the Ethereum blockchain.  You do not have to do anything at this state.

* Expired - The conversion request has expired. This usually means that the first step of moving tokens did not succeed. 

    + Ethereum to Cardano - This can happen if you signed for the conversion but did not complete the next step of transferring tokens. In this case, a conversion request was created but no tokens were moved

    + Cardano to Ethereum - This can happen if you create a conversion but did not deposit tokens to the address provided to you or deposited a different amount from what you specified in the Bridge

* Success - Your conversion is successful, the tokens have reached your wallet

## How are my conversions sorted on the Transactions page?

The Transactions page first displays open conversions i.e., conversions that are in the Initiated, Processing, Ready for Claim or Claim initiated state.

All Successful or Expired conversion requests are then displayed sorted by the Creation time.

## I got a message on a Black popup when I initiated my conversion on the Home page. What happened to my conversion?

When a conversion is initiated the Bridge waits to get a confirmation from the web wallet used. Depending on the blockchain this can take some time. If the Bridge does not get back a confirmation in time or if an error occurred, the relevant message is displayed on screen. 

In such cases always, check the Transactions page to see the current status before you re-attempt the transfer. In some cases, it might take longer for the conversion to complete but the conversion is being processed.

## How do I expedite my transaction submitted on the Ethereum blockchain?

If your transaction is taking a lot of time, you may wish to speed it up as shown below 

![faq](/assets/images/products/Bridge/faq.webp)