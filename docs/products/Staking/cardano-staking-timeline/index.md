# Staking Timeline
A single window has the following stages
* Staking/Withdrawal Period
* Rewards Distribution Period

<ImageViewer src="/assets/images/products/Staking/window.webp" alt="Window"/>

As the staking pool starts, the Staking/Withdrawal Period begins and users can send tokens to pool in order to stake them. Tokens aren’t locked in the on-chain script, users can withdraw their deposited amount plus earned rewards in any time during Staking/Withdrawal Period.

Tokens must be deposited <b> before </b> the start of the Staking/Withdrawal Period for which user want to receive a reward.

After the Staking/Withdrawal Period is over, then comes Rewards Distribution Period. For past Staking/Wintdrawal Period in current window the staking rewards are accrued to users, proportionally to their share of the overall staked pool in that period.

<br>
  Example of accruing rewards logic for user:
  * Window 1: User deposits 5 ASI (FET)
    * New deposit = 5 ASI (FET)
    * Rewards = 0 ASI (FET)
  * Window 2: User deposits 10 ASI (FET)
    * Confirmed stake  = 5 ASI (FET)
    * New deposit = 10 ASI (FET)
    * Rewards (1) are accrued to user for 5 ASI (FET) stake
  * Window 3: User doesn’t deposit anything
    * Confirmed stake = 15 ASI (FET)
    * Rewards (2) are accrued to user for 15 ASI (FET) stake + rewards(1)
  * Window 4:
    * User’s final (confirmed) stake = 15 ASI (FET)
    * Rewards are accrued to user for 15 ASI (FET) stake + rewards(2)
<br>

Examples of user’s behavior:
![window 3](/assets/images/products/Staking/window3.webp)
<br>
![window 2](/assets/images/products/Staking/window2.webp)
<br>
![window 1](/assets/images/products/Staking/window1.webp)

