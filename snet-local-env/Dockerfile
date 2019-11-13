ARG TAG
FROM singularitynet/snet-platform:${TAG}

# setup environment variables
ENV ROOT /opt/singnet
ENV BIN ${ROOT}/bin
ENV PATH ${BIN}:${PATH}
ENV LOG ${ROOT}/log
ENV IPFS ${ROOT}/ipfs
ENV GANACHE ${ROOT}/ganache
ENV GANACHE_MNEMONIC 'gauge enact biology destroy normal tunnel slight slide wide sauce ladder produce'
ENV ETCD ${ROOT}/etcd

# setup folders needed
RUN mkdir -p ${BIN}
RUN mkdir -p ${LOG}
RUN mkdir -p ${IPFS}
RUN mkdir -p ${GANACHE}
RUN mkdir -p ${ETCD}

# Install local Ethereum network
RUN npm install -g ganache-cli@6.2.4 truffle@4.1.14
# Install other tools
RUN apt-get install -y lsof net-tools telnet screen vim nano

# install IPFS
ENV IPFS_PATH ${IPFS}
RUN export IPFS_VERSION=v0.4.18 && \
	cd /tmp && \
	wget https://dist.ipfs.io/go-ipfs/${IPFS_VERSION}/go-ipfs_${IPFS_VERSION}_linux-amd64.tar.gz && \
	tar xzf go-ipfs_${IPFS_VERSION}_linux-amd64.tar.gz && \
	cd go-ipfs && \
	mv ipfs ${BIN} && \
	cd .. && \
	rm -rf go-ipfs*
RUN ipfs init
RUN ipfs bootstrap rm --all
RUN ipfs config Addresses.API /ip4/0.0.0.0/tcp/5002
RUN ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8081

# install etcd
RUN export ETCD_VERSION=v3.3.13 && \
	cd /tmp && \
    wget https://github.com/etcd-io/etcd/releases/download/${ETCD_VERSION}/etcd-${ETCD_VERSION}-linux-amd64.tar.gz && \
	tar -zxvf etcd-${ETCD_VERSION}-linux-amd64.tar.gz && \
	cd etcd-${ETCD_VERSION}-linux-amd64/ && \
	mv etcd etcdctl ${BIN} && \
	cd .. && \
	rm -rf etcd-${ETCD_VERSION}-linux-amd64*

# plaform-contracts
WORKDIR ${ROOT}
RUN git clone --depth 1 -b v0.3.4 https://github.com/singnet/platform-contracts
WORKDIR ${ROOT}/platform-contracts
RUN npm install
COPY ./bin/deploy_contracts.sh ${BIN}
RUN deploy_contracts.sh

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
WORKDIR ${ROOT}
RUN snet || true
COPY ./bin/add_local_network.sh ${BIN}
RUN add_local_network.sh
RUN snet identity create deployer key --private-key ${DEPLOYER_KEY}
RUN snet identity create caller key --private-key ${CALLER_KEY}
RUN snet identity deployer
RUN snet network local
RUN snet set default_ipfs_endpoint http://localhost:5002
RUN snet set current_singularitynettoken_at ${TOKEN_ADDR}
RUN snet set current_registry_at ${REGISTRY_ADDR}
RUN snet set current_multipartyescrow_at ${MULTIPARTYESCROW_ADDR}

# deploy example-service
COPY ./bin/start_environment.sh ${BIN}
COPY ./bin/deploy_example_service.sh ${BIN}
RUN deploy_example_service.sh

# additional scripts
COPY ./bin/ ${BIN}
COPY ./README.md ${ROOT}
COPY ./motd /etc/motd

RUN snet identity deployer
CMD start_docker.sh
