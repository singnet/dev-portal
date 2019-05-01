FROM ubuntu:18.04

ARG language

ENV SINGNET_REPOS=/opt/singnet
ENV GOPATH=${SINGNET_REPOS}/go
ENV PATH=${GOPATH}/bin:${PATH}

RUN mkdir -p ${GOPATH}

RUN apt-get update && \
    apt-get install -y \
    apt-utils \
    nano \
    vim \
    git \
    wget \
    curl \
    zip \
    libudev-dev \
    libusb-1.0-0-dev

RUN apt-get install -y python3 python3-pip

RUN pip3 install snet-cli

RUN SNETD_VERSION=`curl -s https://api.github.com/repos/singnet/snet-daemon/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")'` && \
    cd /tmp && \
    wget https://github.com/singnet/snet-daemon/releases/download/${SNETD_VERSION}/snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz && \
    tar -xvf snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz && \
    mv snet-daemon-${SNETD_VERSION}-linux-amd64/snetd /usr/bin/snetd

RUN cd ${SINGNET_REPOS} && \
    git clone --depth 1 https://github.com/singnet/dev-portal.git

RUN if [ "$language" = "cpp" ]; then \
        apt-get install -y build-essential autoconf libtool pkg-config libgflags-dev libgtest-dev clang libc++-dev; \
        git clone -b $(curl -L https://grpc.io/release) https://github.com/grpc/grpc; \
        cd grpc; \
        git submodule update --init; \
        make; \
        make install; \
        apt-get install -y openjdk-8-jdk; \
        echo "deb [arch=amd64] http://storage.googleapis.com/bazel-apt stable jdk1.8" | tee /etc/apt/sources.list.d/bazel.list; \
        curl https://bazel.build/bazel-release.pub.gpg | apt-key add -; \
        apt-get update; \
        apt-get install -y bazel; \
        apt-get upgrade -y bazel; \
        bazel build :all; \
        make install; \
        cd third_party/protobuf; \
        make; \
        make install; \
    fi

RUN if [ "$language" = "go" ]; then \
        apt-get install -y golang go-dep golang-goprotobuf-dev golint; \
        go get -v -u google.golang.org/grpc; \
    fi

RUN if [ "$language" = "java" ]; then \
        apt-get install -y unzip openjdk-8-jdk; \
        curl -OL https://github.com/google/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip; \
        unzip protoc-3.6.1-linux-x86_64.zip -d protoc3; \
        mv protoc3/bin/* /usr/local/bin/; \
        mv protoc3/include/* /usr/local/include/; \
        rm -rf protoc3; \
        rm protoc-3.6.1-linux-x86_64.zip; \
        curl -OL http://central.maven.org/maven2/io/grpc/protoc-gen-grpc-java/1.16.1/protoc-gen-grpc-java-1.16.1-linux-x86_64.exe; \
        mv protoc-gen-grpc-java-1.16.1-linux-x86_64.exe /usr/local/bin/protoc-gen-grpc-java; \
        chmod +x /usr/local/bin/protoc-gen-grpc-java; \
    fi

WORKDIR ${SINGNET_REPOS}