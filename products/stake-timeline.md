---
# Page settings
layout: default
keywords: staking
comments: false

# Hero section
title: Stake Timeline

# Micro navigation
micro_nav: true

---

A single staking session has the following stages

* Stake window Period
* Staking Period
* Opt-out Period
* Withdrawal Period

Once the call for staking period is over and requests are accepted, a staking window of the specified time period begins. Tokens are locked in the staking smart contract for the duration of that window.  Towards the end of the window, two things happen:

* A new call for staking period begins. There is a time window during which users can request their tokens back at the end of the current window. 

* If users don't request their tokens back, they default to be automatically re-staked in the next window, along with the reward tokens. Users can turn off auto-renewal, in which case their tokens will not be re-staked; instead, they will sit in the smart contract, available for withdrawal. Users can then withdraw their tokens at their convenience. All these operations can be done through the easy to use AGI <a href="https://staking.singularitynet.io" target="_blank">Staking DApp</a>.

Right after the staking window is over, the staking rewards are delivered to users, proportionally to their share of the overall staked pool in that window. 

The diagram below shows the timeline (with sample time periods) of the key events (calls for staking, withdrawal windows, rewards delivery and the chaining of consecutive staking windows)

![staking](/assets/img/staking/staking_sequence.jpg)

