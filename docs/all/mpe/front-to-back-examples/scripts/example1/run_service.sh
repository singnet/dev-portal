# First run install_and_start.sh
# Initial setup
cd ~/singnet
export GOPATH=`pwd`
export SINGNET_REPOS=${GOPATH}/src/github.com/singnet
export PATH=${GOPATH}/bin:${PATH}
export PATH=~/.local/bin/:${PATH}


# Download example service
cd $SINGNET_REPOS
git clone https://github.com/singnet/example-service.git
cd example-service 
. buildproto.sh

# Prepare metadata (payment address is the second ganache identity 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB)

snet service metadata-init service/service_spec Example1 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB --fixed-price 0.1 --endpoints localhost:8080

# Create organization test1
snet organization  create testo  --org-id testo -y

# Register our service
snet service publish testo tests -y

# Configure daemon
cat > snetd.config.json << EOF
{
   "ETHEREUM_JSON_RPC_ENDPOINT": "http://localhost:8545",
   "PASSTHROUGH_ENABLED": true,
   "PASSTHROUGH_ENDPOINT": "http://localhost:7003",
   "REGISTRY_ADDRESS_KEY": "0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2",
   "DAEMON_END_POINT": "localhost:8080",
   "IPFS_END_POINT": "http://localhost:5002",
   "ORGANIZATION_ID": "testo",
   "SERVICE_ID": "tests",
   "log": {
   "level": "debug",
   "output": {
   "type": "stdout"
      }
   }
}
EOF

# Start daemon
ln -s ../snet-daemon/build/snetd-linux-amd64 snetd

export PATH=./:$PATH

# Start service. It will find and start daemon automaticaly
python3 run_example_service.py
