In exchange for providing tokens, the AGIX token holder who has staked their tokens is provided with a certain number of bonus AGIX tokens, similarly to fiat depositors earning interest. Users earn rewards for each stake window that they participate in.

> The essence of the Rewards Distribution Period is that in the pool the admin updates each user rewards in their stakes, which are elements of the associated list in the form of utxo. Every staking window the admin makes a promise and, with the exception of the first window, sends AGIX to pool address. The promise is a sum of AGIX that admin wants to send to the script in the next window, updating of promised amount takes place in the current window and the actual reward distribution for each user - in the future window. The reward will go to users only if they stay until the next Rewards Distribution Period.

During the first staking window, in the first Rewards Distribution Period, users do not receive any rewards yet, since users need to participate in staking for a whole staking window (Staking/WIthdrawal and Rewards Distribution Periods) to receive rewards. Thus, users can receive the first reward from their deposit, that was conducted in the 1st staking window, only in the 2d window in Rewards Distribution Period. And the user will be able to dispose of their freshly obtained rewards at the beginning of the 3rd window.

<br>

---

In Rewards Distribution Period the admin updates the user 's rewards according to the formula:

<br>

![formula](/public/assets/images/products/Staking/formula.png)

-   rewards - rewards already earned by the user, rewards earned from previous staking windows
-   deposited - user's deposits from previous staking windows plus deposit in this staking window during the Staking/Withdrawal Period
-   newDeposit - user's deposit in this staking window
-   totalDeposited - the sum of all deposited and accrued rewards to users in Staking/Withdrawal Period that was before current Rewards Distribution Period
-   totalRewards - how much rewards did the admin promise to deposit in the next staking window in order to distribute them among stakers
