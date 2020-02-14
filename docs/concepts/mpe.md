---
# Page settings
layout: default
keywords: Multi-Party Escrow, MPE, Multi Party Escrow
comments: false

# Hero section
title: Multi-Party Escrow
---
An Escrow contract defines the conditional transaction between two transacting parties through an Escrow account. 
The Multi-party Escrow (MPE) smart contract API and the payment channel together enable payments in the SingularityNet platform with a minimal number of on-blockchain interactions between AI Consumers and AI service providers.

It helps to understand the meanings of a few terms relevant to MPE: 

**Escrow**: An escrow account is a wallet into which the client sends a certain amount of funds into a payment channel that the service provider can claim from the channel on demand. 
AGI Tokens: A cryptocurrency token used by the SingularityNet platform to represent the funds in the Escrow accounts. The cryptocurrency has a price value like any other currency of the world and an upper limit of currency supply.

**Wallet**: A function that supports the deposit and withdrawal of AGI Tokens and is the virtual container for escrowing funds.
Payment Channel: The mode of payment from the Escrow account to the recipient. SingularityNET uses atomic unidirectional payment channel that the recipient need not close at the time of withdrawal of AGI tokens (funds).

Note: A payment channel is a tool that enables off-chain transactions between parties without the delay imposed by blockchain block formation times and without compromising the transactional security. For details, see also: Payment Channel. 

The MPE contract has the following functionalities:
* Wallet with a deposit and withdraw function.The AI Consumers can deposit AGI tokens into an MPE and can withdraw their AGI tokens that are left in the channel, if any, after the contract period expires. 
* Unidirectional payment channel between AI Consumers and service providers along with functions for managing these channels.
