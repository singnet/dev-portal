# Getting Ready to Call AI CheckUp

## 1. Creating Ethereum Wallet

To call the services published on our AI Marketplace Platform, the first thing you need is to create a wallet for working in the Ethereum network. You can learn more [here](https://metamask.io/download/).

## 2. Getting ETH currency to your wallet

Ether is used to pay for interactions on the blockchain (known as gas).

The transactions you make a call to SingularityNET are:
- Transfer AGIX into the multi-party escrow account,
- Transfer AGIX into the payment channel and set the timeout

After that, you interact with the service directly and won't need to pay for further transactions unless you want add more AGIX
or extend the timeout for the payment channel.

So how do you get Ether? The mainnet requires you to buy, but we're going to use a testnet for now.

Find out where to buy [here](https://coinmarketcap.com/currencies/ethereum/#Markets)

## 3. Getting AGIX tokens to your wallet

The `AGIX` tokens are used as payment for the use of services on the AI marketplace platform. Tokens are available on various centralized and decentralized exchanges where you can purchase them for further service calls. Find out where to buy tokens [here](https://coinmarketcap.com/currencies/singularitynet/#Markets).

## 4. Account in AI Marketplace
 
If you want to use AI marketplace and call services from the UI interface, you will need an account on our AI Platform. This account can also be used in our entire ecosystem. You can create account [here](https://beta.singularitynet.io/signup).

## 5. Setup Environment

This is necessary if you are going to use a non-UI service.
Setup `Python 3.10+` version for using `snet.sdk` or `snet.cli` or setup nodejs for using `snet-sdk` for `NodeJS`