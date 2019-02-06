FROM ubuntu:latest

ENV SNET_ROOT=/root/snet

RUN mkdir -p ${SNET_ROOT} && \
    cd ${SNET_ROOT}

# SNET Daemon v0.1.6
# Update, install SNET Daemon and its dependencies
RUN apt-get update && \
    apt-get install -y wget && \
    mkdir snet-daemon && \
    cd snet-daemon && \
    wget -q https://github.com/singnet/snet-daemon/releases/download/v0.1.6/snet-daemon-v0.1.6-linux-amd64.tar.gz && \
    tar -xvf snet-daemon-v0.1.6-linux-amd64.tar.gz  && \
    mv ./snet-daemon-v0.1.6-linux-amd64/snetd /usr/bin/snetd && \
    cd .. && \
    rm -rf snet-daemon

# SNET CLI v0.1.9
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
    ./scripts/blockchain install && \
    pip3 install -e .


WORKDIR ${SNET_ROOT}
