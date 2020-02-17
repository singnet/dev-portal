
# Initial setup
cd
mkdir -p singnet/src/github.com/singnet
cd singnet
mkdir log
export GOPATH=`pwd`
export SINGNET_REPOS=${GOPATH}/src/github.com/singnet
export PATH=${GOPATH}/bin:${PATH}
export PATH=~/.local/bin/:${PATH}


# Init and start IPFS
ipfs init
ipfs bootstrap rm --all
ipfs config Addresses.API /ip4/127.0.0.1/tcp/5002
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8081
ipfs daemon >$GOPATH/log/ipfs.log 2>&1 &

# Start ganache and migrate contract 
# (and prepare npm package with local address for MultiPartyEscrow and Registry)

cd $SINGNET_REPOS

git clone https://github.com/singnet/platform-contracts

cd platform-contracts
npm install
npm install ganache-cli
npm run-script compile
./node_modules/.bin/ganache-cli --mnemonic 'gauge enact biology destroy normal tunnel slight slide wide sauce ladder produce' >$GOPATH/log/ganache.log 2>&1 &
./node_modules/.bin/truffle migrate --network local 
npm run package-npm


# SNET-CLI
cd $SINGNET_REPOS

git clone https://github.com/singnet/snet-cli

cd snet-cli
./scripts/Blockchain install

pip3 install -e .


# add local Ethereum network to the `snet` configuration with the name "local".
snet network create local http://localhost:8545

# Create First identity (snet-user = first ganache identity)
snet identity create snet-user rpc --network local

# switch to snet-user (we will switch automatically to local network)
snet identity snet-user

# switch to local ipfs endpoint
snet set  default_ipfs_endpoint http://localhost:5002

# Configure contract addresses for local network (for kovan addresess are already configured!)
snet set current_singularitynettoken_at 0x6e5f20669177f5bdf3703ec5ea9c4d4fe3aabd14
snet set current_registry_at            0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2
snet set current_multipartyescrow_at    0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e

# install DAEMON

cd $SINGNET_REPOS
git clone https://github.com/singnet/snet-daemon.git
cd snet-daemon

# Take last contracts from the master
pushd resources/Blockchain
npm install -S $SINGNET_REPOS/platform-contracts/build/npm-module
popd

./scripts/install
./scripts/build linux amd64
