apt-get update
apt-get -y install sudo wget git python3-pip  nodejs npm libudev-dev libusb-1.0-0-dev psmisc
apt-get -y install golang go-dep golang-goprotobuf-dev golint
# install IPFS
wget https://dist.ipfs.io/go-ipfs/v0.4.17/go-ipfs_v0.4.17_linux-amd64.tar.gz
tar xvfz go-ipfs_*.tar.gz
cp ./go-ipfs/ipfs /usr/local/bin

. /example1/install_and_start.sh
