FROM ubuntu:latest

ENV SNET_ROOT=/root/snet

RUN mkdir -p ${SNET_ROOT} && \
    cd ${SNET_ROOT}

RUN SNETD_VERSION=`curl -s https://api.github.com/repos/singnet/snet-daemon/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")'` && \

# Update, install SNET Daemon and its dependencies
RUN apt-get update && \
    apt-get install -y wget && \
    mkdir snet-daemon && \
    cd snet-daemon && \
    wget -q https://github.com/singnet/snet-daemon/releases/download/${SNETD_VERSION}/snet-daemon-v${SNETD_VERSION}-linux-amd64.tar.gz && \
    tar -xvf snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz  && \
    mv ./snet-daemon-${SNETD_VERSION}-linux-amd64/snetd /usr/bin/snetd && \
    cd .. && \
    rm -rf snet-daemon

# Update, install SNET CLI dependencies, Python3.6 and SNET-CLI
RUN apt-get install -y \
        git \
        libudev-dev \
        libusb-1.0-0-dev \
        nodejs \
        npm \
        python3 \
        python3-pip && \
    cd /opt && \
    git clone https://github.com/singnet/snet-cli && \
    cd snet-cli && \
    ./scripts/Blockchain install && \
    pip3 install -e .


WORKDIR ${SNET_ROOT}
