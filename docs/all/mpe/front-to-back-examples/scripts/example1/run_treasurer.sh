# First run install_and_start.sh

# Service has second ganache idendity (--wallet-index 1)
# Print list of unclaimed channels and total sum of unclaimed funds
snet treasurer print-unclaimed --endpoint localhost:8080 --wallet-index 1

# claim all channels
snet treasurer claim-all --endpoint localhost:8080  --wallet-index 1 -y

# You can check balance of the service (second ganache identity address=0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB)
snet account balance --account 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
