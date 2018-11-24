# First run install_and_start.sh
# Initial setup
cd ~/singnet
export GOPATH=`pwd`
export SINGNET_REPOS=${GOPATH}/src/github.com/singnet
export PATH=${GOPATH}/bin:${PATH}

cd $SINGNET_REPOS
mkdir treasurer
cd treasurer


# Configure treasurer server. There is only one difference from the daemon --- we provide real PRIVATE_KEY

cat > snetd.config.json << EOF
{
   "PRIVATE_KEY": "04899d5fd471ce68f84a5ec64e2e4b6b045d8b850599a57f5b307024be01f262",
   "DAEMON_LISTENING_PORT": 8080,
   "ETHEREUM_JSON_RPC_ENDPOINT": "http://localhost:8545",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "REGISTRY_ADDRESS_KEY": "0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2",
   "DAEMON_END_POINT": "localhost:8080",
   "IPFS_END_POINT": "http://localhost:5002",
   "ORGANIZATION_NAME": "testo",
   "SERVICE_NAME": "tests",
   "log": {
   "level": "debug",
   "output": {
   "type": "stdout"
      }
   }
}
EOF

# Check the list of channels in use
../snet-daemon/build/snetd-linux-amd64 list channels

# Claim channel 0
../snet-daemon/build/snetd-linux-amd64 claim  --channel-id 0

# You can check balance of the service (second ganache identity address=0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB)
# Unfortunately we should provide address of the token contract by hands
snet client balance --account 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB


