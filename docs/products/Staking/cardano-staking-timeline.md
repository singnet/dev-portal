A single window has the following stages
* Staking/Withdrawal Period
* Rewards Distribution Period

![window](/public/assets/images/products/Staking/window.jpg)

As the staking pool starts, the Staking/Withdrawal Period begins and users can send tokens to pool in order to stake them. Tokens aren’t locked in the on-chain script, users can withdraw their deposited amount plus earned rewards in any time during Staking/Withdrawal Period.

Tokens must be deposited <b> before </b> the start of the Staking/Withdrawal Period for which user want to receive a reward.

After the Staking/Withdrawal Period is over, then comes Rewards Distribution Period. For past Staking/Wintdrawal Period in current window the staking rewards are accrued to users, proportionally to their share of the overall staked pool in that period.

<br>
  Example of accruing rewards logic for user:
  * Window 1: User deposits 5 AGIX
    * New deposit = 5 AGIX
    * Rewards = 0 AGIX
  * Window 2: User deposits 10 AGIX
    * Confirmed stake  = 5 AGIX
    * New deposit = 10 AGIX
    * Rewards (1) are accrued to user for 5 AGIX stake
  * Window 3: User doesn’t deposit anything
    * Confirmed stake = 15 AGIX
    * Rewards (2) are accrued to user for 15 AGIX stake + rewards(1)
  * Window 4:
    * User’s final (confirmed) stake = 15 AGIX
    * Rewards are accrued to user for 15 AGIX stake + rewards(2)
<br>

Examples of user’s behavior:
![window 3](/public/assets/images/products/Staking/window3.jpg)
<br>
![window 2](/public/assets/images/products/Staking/window2.jpg)
<br>
![window 1](/public/assets/images/products/Staking/window1.jpg)

