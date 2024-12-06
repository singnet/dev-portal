# Selecting Networks

The bridge currently supports Ethereum and Cardano blockchain networks. Use the dropdown on the homepage of the bridge to select the network and the direction of conversion:

<ImageViewer src="/assets/images/products/Bridge/selecting-networks.webp" alt="SelectingNetworks"/>

# Choosing Assets

The bridge currently supports the following tokens on the Ethereum and Cardano networks: `AGIX`, `NTX`, `FET (ASI)`, `WMTX`, `RJV`, and `CGV`. Once you have selected the chain and the direction of conversion, use the token dropdown to select the token to convert.

<ImageViewer src="/assets/images/products/Bridge/choosing-assets.webp" alt="ChoosingAssets"/>

# Initiating Conversion

Algorithm of working with Ethereum-Cardano bridge:

Bridging tokens from one chain to another involves the following steps

1.  Set up the token pair

2.  Authorize (Approve) the bridge to transfer tokens on the Ethereum side on your behalf. This involves a web3 wallet interaction. This is a one time, if you dont change the default value - you will not need to authorize for every conversion.
    Important: at this point, you are not yet transferring tokens to another network. You are only allowing the smart contract access to interact with the tokens. This step is mandatory.

3.  Once authorized you can initiatite the conversion.
    If you enter correct values in the field with the number of tokens and the number of allowed tokens is less than or equal to the number entered - you will see the Convert button

    1. You will first be prompted for a signature to track that you are initiating the conversion

    2. When converting from Ethereum to Cardano you will be prompted to transfer tokens to the contract. These tokens will be burnt on the Ethereum chain and equivalent tokens minted on the Cardano chain

    3. When converting from Cardano to Ethereum you will be provided a deposit address. Conversion will be initiaited when tokens are transferred to the deposit address.

# Viewing History

Details of all the transactions done using the coverter bridge

To view all the transactions, click on the transactions tab on the main page

you would something like the below

<ImageViewer src="/assets/images/products/Bridge/viewing-history.webp" alt="ChoosingAssets"/>

-   Initiated - The conversion request has been initiated and the Bridge is waiting for confirmations from the Blockchain before it moves to the Processing state. You do not have to do anything at this state, just wait for the conversion to move to the next state.

-   Processing - The Bridge is minting / burning tokens as part of the conversion. You do not have to do anything at this state, just wait for the conversion to move to the next state.

-   Ready for Claim - This state applies for conversions from Cardano to Ethereum and indicates that the tokens have moved to the Ethereum side. You need to claim the tokens from the Bridge. Initiate the claim from the page, you will need to perform a wallet operation to claim the tokens to your wallet

-   Claim Initiated - This state applies for conversions from Cardano to Ethereum and indicates that the Bridge is waiting for confirmations from the Ethereum blockchain. You do not have to do anything at this state.

-   Expired - The conversion request has expired. This usually means that the first step of moving tokens did not succeed.

    -   Ethereum to Cardano - This can happen if you signed for the conversion but did not complete the next step of transferring tokens. In this case a conversion request was created but no tokens were moved

    -   Cardano to Ethereum - This can happen if you create a conversion but did not deposit tokens to the address provided to you or deposited a different amount from what you specified in the Bridge

-   Success - Your conversion is successful, the tokens have reached your wallet
