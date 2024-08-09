---
# Page settings
layout: default
keywords: staking, cardano, ntx
comments: false
title: Staking withdraw
description: Staking withdraw

# Micro navigation
micro_nav: true
---

NTX token staking/withdrawing happens in fixed time period windows. The Staking/Withdrawal period starts from the start time of the pool indicated in the pool parameters. Users deposit their NTX into the pool.

If the user's stake already exists and they want to deposit more NTX, then the confirmed stake for the future window (not current one!) is previous deposit summed up with a new one. Newly deposited tokens will be credited as a deposit only for the next window after their deposit.

Example:

-   Window 1: User deposits 5 NTX
    -   Confirmed stake = 0 NTX
    -   New deposit = 5 NTX
-   Window 2: User deposits 10 NTX
    -   Confirmed stake = 5 NTX
    -   New deposit = 10 NTX
-   Window 3:
    -   User’s final (confirmed) stake = 15 NTX

<br>
In considered period users are allowed to:

-   Deposit NTX tokens to the contract, thereby taking part in the staking
-   Update their deposit (do re-deposit)
-   Withdraw deposited NTX together with already earned awards

<br>
<b>Remember that you can only withdraw all of your funds (deposited + rewards) from staking pool </b>
