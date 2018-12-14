FROM ubuntu:18.04

# update apt and sudo
RUN apt-get update
RUN apt-get install sudo

# add unprivileged user
RUN adduser --disabled-password --gecos '' singnet
RUN adduser singnet sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER singnet
RUN umask 0000
RUN echo 'umask 0000' >> ${HOME}/.bashrc

# setup environment variables
ENV ROOT /home/singnet
ENV GOPATH ${ROOT}
ENV BIN ${GOPATH}/bin
ENV PATH ${BIN}:${PATH}
ENV LOG ${ROOT}/log
ENV IPFS ${ROOT}/ipfs
ENV SINGNET ${GOPATH}/src/github.com/singnet

# setup folders needed
RUN mkdir -p ${BIN}
RUN mkdir -p ${LOG}
RUN mkdir -p ${IPFS}
RUN mkdir -p ${SINGNET}

# install git
RUN sudo apt-get install -y git
# install NodeJS dev environment
RUN sudo apt-get install -y nodejs npm
RUN sudo npm install -g ganache-cli truffle
# install Python dev environment
RUN sudo apt-get install -y python3 python3-pip
# install other libraries
RUN sudo apt-get install -y libudev-dev libusb-1.0-0-dev
# additional tools
RUN sudo apt-get install -y net-tools screen vim wget

# install IPFS
ENV IPFS_PATH ${IPFS}
RUN sudo apt-get install -y curl
COPY ./install_ipfs.sh ${GOPATH}/bin/
RUN install_ipfs.sh
# setup IPFS
RUN ipfs init
RUN ipfs bootstrap rm --all
RUN ipfs config Addresses.API /ip4/127.0.0.1/tcp/5002
RUN ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8081

# token-contracts
WORKDIR ${SINGNET}
RUN git clone https://github.com/singnet/token-contracts
WORKDIR ${SINGNET}/token-contracts
RUN git checkout -b demo v1.0.0

# plaform-contracts
WORKDIR ${SINGNET}
RUN git clone https://github.com/singnet/platform-contracts
WORKDIR ${SINGNET}/platform-contracts
RUN git checkout -b demo v0.2.4
RUN npm install

# snet-cli
WORKDIR ${SINGNET}
RUN git clone https://github.com/singnet/snet-cli
WORKDIR ${SINGNET}/snet-cli
#RUN git checkout -b demo v0.1.8
RUN ./scripts/blockchain install
RUN sudo pip3 install -e .

# snet-daemon
WORKDIR ${SINGNET}
RUN git clone https://github.com/singnet/snet-daemon
WORKDIR ${SINGNET}/snet-daemon
RUN git checkout -b demo v0.1.3
WORKDIR /tmp
RUN wget https://github.com/singnet/snet-daemon/releases/download/v0.1.3/snetd-0.1.3.tar.gz && \
    tar -xvf snetd-0.1.3.tar.gz && \
    mv ./linux-amd64/snetd ${BIN}/snetd-linux-amd64

# wiki
WORKDIR ${SINGNET}
RUN git clone https://github.com/singnet/wiki

# publish Ethereum related environment variables
ENV NETWORK_ID 12345
ENV DEPLOYER_ADDR 0x592E3C0f3B038A0D673F19a18a773F993d4b2610
ENV DEPLOYER_KEY 0xc71478a6d0fe44e763649de0a0deb5a080b788eefbbcf9c6f7aef0dd5dbd67e0
ENV CALLER_ADDR 0x3b2b3C2e2E7C93db335E69D827F3CC4bC2A2A2cB
ENV CALLER_KEY 0x04899d5fd471ce68f84a5ec64e2e4b6b045d8b850599a57f5b307024be01f262
ENV PUBLISHER_ADDR 0x0067b427E299Eb2A4CBafc0B04C723F77c6d8a18
ENV PUBLISHER_KEY 0xba398df3130586b0d5e6ef3f757bf7fe8a1299d4b7268fdaae415952ed30ba87
ENV TOKEN_ADDR 0x6e5f20669177f5bdf3703ec5ea9c4d4fe3aabd14
ENV REGISTRY_ADDR 0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2
ENV MULTIPARTYESCROW_ADDR 0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e

# setup snet-cli
#RUN snet network create --force local http://127.0.0.1:8545
RUN snet || true
COPY ./add_local_network.sh ${GOPATH}/bin
RUN add_local_network.sh
RUN snet identity create deployer key --private-key ${DEPLOYER_KEY}
RUN snet identity create caller key --private-key ${CALLER_KEY}
RUN snet identity deployer
RUN snet network local
RUN snet set default_ipfs_endpoint http://localhost:5002
RUN snet set current_singularitynettoken_at ${TOKEN_ADDR}
RUN snet set current_registry_at ${REGISTRY_ADDR}
RUN snet set current_multipartyescrow_at ${MULTIPARTYESCROW_ADDR}

COPY ./start_environment.sh ${GOPATH}/bin/
COPY ./stop_service.sh ${GOPATH}/bin
CMD start_environment.sh
