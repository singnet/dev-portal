# First run install_and_start.sh
# Initial setup
cd ~/singnet
export GOPATH=`pwd`
export SINGNET_REPOS=${GOPATH}/src/github.com/singnet
export PATH=${GOPATH}/bin:${PATH}

# check balance (all tokens belongs to this idenity)
snet client balance

# deposit tokens to MPE 
snet client deposit 42000.22

# open channel with our service (organization=testo service_name=tests)
# channel with channel_id=0 should be created and initilized
snet client open_init_channel_registry testo tests 42 100000000 -y

# call the server using stateless logic
snet client call 0 0.1 localhost:8080 add '{"a":10,"b":32}'
snet client call 0 0.1 localhost:8080 mul '{"a":6,"b":7}'
