# First run install_and_start.sh
# Initial setup
cd ~/singnet
export GOPATH=`pwd`
export SINGNET_REPOS=${GOPATH}/src/github.com/singnet
export PATH=${GOPATH}/bin:${PATH}

cd $SINGNET_REPOS

# check balance (all tokens belongs to this idenity)
snet client balance

# deposit tokens to MPE 
snet client deposit 42000.22

# open channel with our service (organization=testo service_name=tests)
# channel with channel_id=0 should be created and initilized
snet client open_init_channel_registry testo2 tests 42 100000000 -y

# call the server using stateless logic
# You should replace <PATH_TO_YOUR_JPG> with path to some of your jpeg

snet client call 0 0.1 localhost:8080 classify '{"image_type": "jpg", "file@b64encode@image": "<PATH_TO_YOUR_JPG>"}'



