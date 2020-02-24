---
# Page settings
layout: default
keywords: staking
comments: false

# Hero section
title: Staking

# Micro navigation
micro_nav: true

---
# Staking
Staking is the process of holding AGI tokens for rewards to support the operations of AI marketplace.
Staking will be used to increase AGI liquidity pool

## High Level Staking Requirements:

Liquidity plays a vital role to enable crypto to fiat (C2F) and fiat to crypto (F2C) gateway in the SingularityNet platform. One of the ways to get the liquidity into the platform is through Staking especially from the token holders.

Here are the high level requirements for the staking:
Foundation will periodically open a staking window. That period must be less than the staking period. If we start with a staking period of one month, we should have staking calls twice a month, with each call lasting for one week from announcement to being closed. During this window:
We will have a max staking amount allowed.
There will be a staking cap at a user level
There will be a staking cap at a window level as well
Users should be able to request to stake.
If we find the interest is not above the max allowed amount, we'll approve all requests. If we find that there is too much staking interest we will accept a partial amount from each user. 
The logic to accept partial amounts will be outside the contract
If accepted the complete or partial stake amount is moved to an approved state from where only the foundation can withdraw it for the duration of the stake. User can withdraw this amount after the end of the period only.
Any rejected amount is refunded to the user’s wallet automatically
Amount not considered for the stake has to be withdrawn by the user. They have to incur the gas cost of the withdrawal.
Staking period will be one month to start with
Should be configurable by the Admin/Owner of the contract
There should be a minimum and maximum amount to Stake, which will change over the lifetime of the contract.
Should be configurable by the Admin/Owner of the Contract
After the staking window expires the user can withdraw funds with the accumulated interest (also referred to as the bonus). If they don't place a request to withdraw before the staking period expires, their stake is automatically renewed and the amount is deducted from the available amount for the active staking window. 
Users should be notified shortly before their staking window expires so they can take action to withdraw the tokens if they so desire. No action implies automated renewal. 
Email notifications will be sent for users who stake via the Staking DApp. No emails are recorded on the contract
There may be a min time before expiration for withdrawal requests, equal to the time a staking window is open for commitments. So if a staking window will be open for one week, people must send their withdrawal request at least one week in advance of their stake expiring.
There will be an option to opt out from auto renewal. By default we will auto renew.
Rewards will be provided to the staking users. Initially we will announce a fixed amount of AGI for each staking window, and the reward will be spread equally per AGI staked.
We will change this staking reward approach in the future.
If for some reason there isn't enough funds to satisfy a user’s withdrawal request we need to fail the request and enable the user to request again at a later time. At the same time we should be alerted of such a condition
This reward strategy implies that people staking will not know the exact reward they get till the window closes.
Interest can be dynamic where the interest rate varies over the time (Not supported now)
Reward computation is as follows
Computation of reward when the staking window closes

Max stake at window level                  = Wmax
Actual stake                                        = S
Reward                                               = R
Reward per token in the pool              = R/(min(S,Wmax))

For an individual staking P tokens (P is less than or equal to individual max)
Amount considered for the individual  = ((Wmax/(max(Wmax,S)) * P) 
Reward for the individual                     =  R/(min(S,Wmax)) * ((Wmax/(max(Wmax,S)) * P)




The history of staking windows (total allowed amount, total interest, total reward, etc) should be recorded and transparent to the users
Staking DApp will display this
There should be Single account from the foundation to manage the Deposits/Withdraws from the staking contract
There should be a DApp to interface with the staking contract
We can revise the available staking amount and the allocated reward amount before each staking window "goes public". By that time we should know how much staked AGI from the most recently expired window has not been withdrawn, and therefore has been automatically renewed. This should be subtracted from our "max acceptable amount" automatically. 
This implies that if a new staking round will be called for only if we need to fill the liquidity pool. If the pool is full with no existing stakers withdrawing funds then we don't need a new liquidity round.
Further if we decide to reduce the liquidity pool when we already have existing stakers who are auto renewing the partial amount logic will apply here. To illustrate
Staking window opened with a max amount of 100K AGI
We got stakers for the entire 100K AGI none of who are opting out (so will auto renew in the next window)
When the time comes for the next window we decide to reduce the max amount of the window to 80K AGI (we are shrinking the liquidity pool)
We will then take a partial amount from each of the existing stakers to fill the 80K pool and notify them to withdraw the remaining amount
