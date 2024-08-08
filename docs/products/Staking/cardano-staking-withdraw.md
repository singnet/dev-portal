AGIX token staking/withdrawing happens in fixed time period windows. The Staking/Withdrawal period starts from the start time of the pool indicated in the pool parameters. Users deposit their AGIX into the pool.

If the user's stake already exists and they want to deposit more AGIX, then the confirmed stake for the future window (not current one!) is previous deposit summed up with a new one. Newly deposited tokens will be credited as a deposit only for the next window after their deposit.

Example:

-   Window 1: User deposits 5 AGIX
    -   Confirmed stake = 0 AGIX
    -   New deposit = 5 AGIX
-   Window 2: User deposits 10 AGIX
    -   Confirmed stake = 5 AGIX
    -   New deposit = 10 AGIX
-   Window 3:
    -   User’s final (confirmed) stake = 15 AGIX

<br>
In considered period users are allowed to:

-   Deposit AGIX tokens to the contract, thereby taking part in the staking
-   Update their deposit (do re-deposit)
-   Withdraw deposited AGIX together with already earned awards

<br>
<b>Remember that you can only withdraw all of your funds (deposited + rewards) from staking pool </b>
