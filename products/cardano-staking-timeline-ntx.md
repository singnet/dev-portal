---
# Page settings
layout: default
keywords: staking, cardano, ntx
comments: false
title: Staking Timeline
description: Staking Timeline

# Micro navigation
micro_nav: true

---

A single window has the following stages
* Staking/Withdrawal Period
* Rewards Distribution Period

<img src="/assets/img/cardano-staking/window-ntx.png" alt="Cardano Staking Window" style="max-width: 410px; width: 100%; height: auto;">

As the staking pool starts, the Staking/Withdrawal Period begins and users can send tokens to pool in order to stake them. Tokens aren’t locked in the on-chain script, users can withdraw their deposited amount plus earned rewards in any time during Staking/Withdrawal Period.

Tokens must be deposited <b> before </b> the start of the Staking/Withdrawal Period for which user want to receive a reward.

After the Staking/Withdrawal Period is over, then comes Rewards Distribution Period. For past Staking/Wintdrawal Period in current window the staking rewards are accrued to users, proportionally to their share of the overall staked pool in that period.

<br>
  Example of accruing rewards logic for user:
  * Window 1: User deposits 5 NTX
    * New deposit = 5 NTX
    * Rewards = 0 NTX
  * Window 2: User deposits 10 NTX
    * Confirmed stake  = 5 NTX
    * New deposit = 10 NTX
    * Rewards (1) are accrued to user for 5 NTX stake
  * Window 3: User doesn’t deposit anything
    * Confirmed stake = 15 NTX
    * Rewards (2) are accrued to user for 15 NTX stake + rewards(1)
  * Window 4:
    * User’s final (confirmed) stake = 15 NTX
    * Rewards are accrued to user for 15 NTX stake + rewards(2)
<br>

Examples of user’s behavior:
![window 3](/assets/img/cardano-staking/window3-ntx.png)
<br>
![window 2](/assets/img/cardano-staking/window2-ntx.png)
<br>
![window 1](/assets/img/cardano-staking/window1-ntx.png)

