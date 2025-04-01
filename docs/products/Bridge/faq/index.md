# **FAQ: Bridge**

<AccordionItem :id="1">
    <template #title>
        <strong>1. What does the SingularityNET Bridge do?</strong>
    </template>
    <template #description>
        <p>The SingularityNET Bridge allows users to transfer tokens between the Ethereum and Cardano networks on a <strong>1:1 basis</strong>.</p> 
        <p>⚠️ <strong>Important:</strong> Transfers are restricted to identical tokens (e.g., AGIX on Ethereum to AGIX on Cardano).</p>
         <p><strong>Supported tokens include:</strong></p>
        <ul>
            <li><strong>AGIX</strong></li>
            <li><strong>NTX</strong></li>
            <li><strong>FET (ASI)</strong></li>
            <li><strong>WMTX</strong></li>
            <li><strong>RJV</strong></li>
            <li><strong>CGV</strong></li>
        </ul>
    </template>
</AccordionItem>

 <AccordionItem :id="2">
    <template #title>
        <strong>2. How long will it take for the conversion to complete?</strong>
    </template>
    <template #description>
        <p>The Bridge is moving tokens across two Blockchains and consequently will take a few minutes to complete, to clear their respective consensus mechanisms. If the chains are congested, conversion may take longer.</p>
        <p>In all cases, you can view the current state of the conversion in the <code>Transactions</code> tab of the Bridge.</p>
         <p>Please always check the status of the conversion before submitting a conversion again. In most cases, the transaction has been submitted and is waiting to be finalized by the blockchains.</p>
    </template>
</AccordionItem>

<AccordionItem :id="3">
    <template #title>
        <strong>3. What does the Status column on the Transactions page mean?</strong>
    </template>
    <template #description>
        <p>The Transactions page lists all your conversion requests. The page first lists all the open conversions followed by requests that have been completed.</p> 
        <p>Each conversion can be in one of the following states as referenced in the Status column:</p>
        <ul>
            <li><code>Initiated</code> 
            <p>The conversion request has been initiated, and the Bridge is waiting for confirmations from the blockchain before moving to the Processing state. <em>You do not have to take any action at this stage, just wait for the conversion to proceed.</em></p></li>
            <li><code>Processing</code> 
            <p>The Bridge is minting or burning tokens as part of the conversion. <em>You do not have to take any action at this stage, just wait for the conversion to proceed.</em></p></li>
            <li><code>Ready for Claim</code> 
            <p>This state applies to conversions from Cardano to Ethereum and indicates that the tokens have moved to the Ethereum side. <em>To claim the tokens, initiate the claim from the page. You will need to perform a wallet operation to claim the tokens into your wallet.</em></p></li>
            <li><code>Claim Initiated</code> 
            <p>This state applies to conversions from Cardano to Ethereum and indicates that the Bridge is waiting for confirmations from the Ethereum blockchain. <em>You do not have to take any action at this stage.</em></p></li>
            <li><code>Expired</code> 
            <p>The conversion request has expired. This typically occurs when the first step of moving tokens fails.</p>
              <ul>
                <li><strong>Ethereum to Cardano</strong>: This can happen if you signed for the conversion but did not complete the next step of transferring tokens.</li>
                <li><strong>Cardano to Ethereum</strong>: This can happen if you created a conversion but did not deposit tokens to the provided address or deposited an incorrect amount.</li>
              </ul></li> 
            <li><code>Success</code> 
            <p>Your conversion is successful, and the tokens have reached your wallet.</p></li>
        </ul>
    </template>
</AccordionItem>

 <AccordionItem :id="4">
    <template #title>
        <strong>4. How are my coneversions sorted on the Transactions page?</strong>
    </template>
    <template #description>
        <p>The Transactions page first displays open conversions i.e., conversions that are in the <code>Initiated</code>, <code>Processing</code>, <code>Ready for Claim</code> or <code>Claim initiated</code> state.</p>
        <p>All <code>Successful</code> or <code>Expired</code> conversion requests are then displayed sorted by the Creation time.</p>
    </template>
</AccordionItem>

 <AccordionItem :id="5">
    <template #title>
        <strong>5. Why did I see a black popup during conversion?</strong>
    </template>
    <template #description>
        <p>When a conversion is initiated the Bridge waits to get a confirmation from the web wallet used. Depending on the blockchain this can take some time. If the Bridge does not get back a confirmation in time or if an error occurred, the relevant message is displayed on screen.</p>
        <p>In such cases always, check the Transactions page to see the current status before you re-attempt the transfer. In some cases, it might take longer for the conversion to complete but the conversion is being processed.</p>
    </template>
</AccordionItem>

 <AccordionItem :id="6">
    <template #title>
        <strong>6. How do I expedite my transaction submitted on the Ethereum blockchain?</strong>
    </template>
    <template #description>
        <p>If your transaction is taking a lot of time, you may wish to speed it up as shown below:</p> <ImageViewer src="/assets/images/products/Bridge/faq.webp" alt="faq"/>
    </template>
</AccordionItem>