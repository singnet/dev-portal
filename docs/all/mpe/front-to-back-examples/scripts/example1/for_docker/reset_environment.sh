# This is a part of circleci functional tests
# This script does following:
# - restart ipfs
# - restart ganache and remigrate platform-contracts
# - set correct networks/*json for Registry and MultiPartyEscrow (but not for SingularityNetToken !)
# - reset .snet configuration
# - add snet-user to snet-cli with first ganache idenity

cd ~/singnet
export GOPATH=`pwd`
export SINGNET_REPOS=${GOPATH}/src/github.com/singnet
export PATH=${GOPATH}/bin:${PATH}

      

# I. restart ipfs
killall ipfs || echo "supress an error"

sudo rm -rf ~/.ipfs/
ipfs init
ipfs bootstrap rm --all
ipfs config Addresses.API /ip4/127.0.0.1/tcp/5002
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8081
nohup ipfs daemon > ipfs.log 2>&1 &


# II. restart ganache and remigrate platform-contracts
killall node || echo "supress an error"

cd $SINGNET_REPOS/platform-contracts
nohup ./node_modules/.bin/ganache-cli --mnemonic 'gauge enact biology destroy normal tunnel slight slide wide sauce ladder produce' 2>&1 > ~/singnet/ganache.log &
./node_modules/.bin/truffle migrate --network local


# III. remove old snet-cli configuration
rm -rf ~/.snet

# IV. Configure SNET-CLI.

# Create First identity (snet-user = first ganache)
# We will automatically create new configuration file with default values
snet identity create snet-user key --private-key 0xc71478a6d0fe44e763649de0a0deb5a080b788eefbbcf9c6f7aef0dd5dbd67e0

# Add local network and switch to it
snet network create local http://localhost:8545
snet network local

# set correct ipfs endpoint
snet set  default_ipfs_endpoint http://localhost:5002


# Configure contract addresses for local network (it will not be necessary for kovan or mainnet! )
snet set current_singularitynettoken_at 0x6e5f20669177f5bdf3703ec5ea9c4d4fe3aabd14
snet set current_registry_at            0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2
snet set current_multipartyescrow_at    0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e
