---
# Page settings
layout: default
keywords: staking
comments: false

# Hero section
title: Stake Window

# Micro navigation
micro_nav: true

---

AGI token staking will happen in fixed time period windows -- if you stake your tokens, they'll be locked in the staking smart contract for at least one window. Before that window of time begins, there is a call for staking period, which lasts a fixed period again. 

During that call for staking period, any AGI token holder can submit a request for staking through our AGI <a href="https://staking.singularitynet.io" target="_blank">Staking DApp</a>. There is a minimum amount of AGI that can be staked, largely to ensure the operation is worthwhile for both the staker and the foundation, considering the gas costs of moving the tokens into the staking smart contract and then out of it along with rewards.

We currently don't have maximum amounts allowed per user, nor a cap on the amount we will accept for staking. We may enable per user caps in the future if we see the staking rewards are being concentrated in the hands of a few large tokenholders to the detriment of the wider community. We're unlikely to implement overall staking caps, but can't rule out the possibility in some distant future. Both possibilities exist in the smart contract code, should they be necessary.

At the end of the call for staking period, staking requests are officially accepted. If we enable either of those caps, then not all staking requests may be accepted. Right now, and for the duration of our initial staking experiments, all valid requests will be accepted. 
