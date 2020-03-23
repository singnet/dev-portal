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
Staking is the process of holding AGI tokens for rewards to support the operations of AI marketplace.
It is an elegant way of securing an additional pool of AGI tokens usable for mediating the exchanges of AGI tokens to fiat as needed. 

## [Overview](#overview)

We will use staked AGI tokens to fund the Fiat-Crypto gateway liquidity pool, and users who agree to lock up their tokens for a time period to help us with that will be rewarded, initially with bonus tokens from the Foundation and possibly later with additional rewards.

We decided to enable staking before the Fiat-Crypto gateway is ready to benefit from this liquidity pool, as we believe this will be a valuable learning exercise for us and for the community, and it will allow us to fine-tune any parameters and work out any kinks before deploying the staked tokens for their ultimate purpose. So for the time being, tokens will just be locked in the AGI Staking smart contract, but users will receive their rewards nonetheless.

## [Calls for Staking](#staking-calls)

AGI token staking will happen in fixed time period windows -- if you stake your tokens, they'll be locked in the staking smart contract for at least one window. Before that window of time begins, there is a call for staking period, which lasts a fixed period again. 

During that call for staking period, any AGI token holder can submit a request for staking through our forthcoming AGI Staking DApp. There is a minimum amount of AGI that can be staked, largely to ensure the operation is worthwhile for both the staker and the foundation, considering the gas costs of moving the tokens into the staking smart contract and then out of it along with rewards.

We currently don't have maximum amounts allowed per user, nor a cap on the amount we will accept for staking. We may enable per user caps in the future if we see the staking rewards are being concentrated in the hands of a few large tokenholders to the detriment of the wider community. We're unlikely to implement overall staking caps, but can't rule out the possibility in some distant future. Both possibilities exist in the smart contract code, should they be necessary.

At the end of the call for staking period, staking requests are officially accepted. If we enable either of those caps, then not all staking requests may be accepted. Right now, and for the duration of our initial staking experiments, all valid requests will be accepted. 

## [Staking Window Timeline](#staking-timeline)

Once the call for staking period is over and requests are accepted, a staking window of the specified time period begins. Tokens are locked in the staking smart contract for the duration of that window.  Towards the end of the window, two things happen:

* A new call for staking period begins, as described above. There is a time window during which users can request their tokens back at the end of the current window. 

* If users don't request their tokens back, they default to be automatically re-staked in the next window, along with the reward tokens. Users can turn off auto-renewal, in which case their tokens will not be re-staked; instead, they will sit in the smart contract, available for withdrawal. Users can then withdraw their tokens at their convenience. All these operations can be done through the easy to use AGI Staking Dapp.

Right after the staking window is over, the staking rewards are delivered to users, proportionally to their share of the overall staked pool in that window. 

The diagram below shows the timeline (with sample time periods) of the key events (calls for staking, withdrawal windows, rewards delivery and the chaining of consecutive staking windows)

![staking](/assets/img/staking/staking_sequence.jpg)

