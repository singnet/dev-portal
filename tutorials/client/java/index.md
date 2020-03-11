---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Build a client in Java
description: Learn how to develop an application which calls SingularityNET service using Java language

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Back to tutorials
        url: '/tutorials'
    next:
        content: View all docs
        url: '/docs'
---

## Overview

This tutorial explains how to create a SingularityNET service client in Java
language. Full code of the tutorial application can be found at [Java SDK
repository](https://github.com/singnet/snet-sdk-java/tree/master/example/cli/example-service),
SingularityNET Java SDK API documentation is located at
[Jitpack](https://jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc).
In order to complete the tutorial one should have JDK 8 or greater, Maven and
Docker installed on the local machine.

## Setup environment

We are going to use a local SingularityNET environment to run the tutorial
application. It simplifies the things and allow concentrating on the code only.
Nevetherless sometimes it leads to the additonal configuration parameters. I
will pay your attention on this when it happens.

First start the environment docker using command below:

```sh
docker run -p 5002:5002 -p 8545:8545 -p 7000:7000 \
    -ti singularitynet/snet-local-env:3.0.0
```

This environment contains local Ethereum, local IPFS and local Example Service
instances. In order to use them we need propagating three network ports from
the environment. IPFS port `5002`, Ethereum JSON RPC  port `8545` and
SingularityNET daemon port `7000`.

## Setup project

Make new Java project using Maven (see [Maven project
page](https://maven.apache.org/index.html)). For example you can use the
command below:

```sh
mvn archetype:generate \
    -DgroupId=org.example.app \
    -DartifactId=example-client \
    -DarchetypeArtifactId=maven-archetype-quickstart \
    -DarchetypeVersion=1.4 \
    -DinteractiveMode=false
```

SingularityNET Java SDK includes two plugins to support both Maven and Gradle
project management system. This tutorial uses Maven. Gradle usage
documentation can be found at [Gradle plugin GitHub
repo](https://github.com/singnet/snet-sdk-java/tree/master/plugin/gradle).

Add Java SDK artifact as a Maven compilation time dependency (`dependencies`
section of the `pom.xml`):

```xml
<dependency>
  <groupId>com.github.singnet.snet-sdk-java</groupId>
  <artifactId>snet-sdk-java</artifactId>
  <version>master-SNAPSHOT</version>
</dependency>
```

In order to use a service one needs adding the service API as a dependency of
the project. API of the service is kept in the platform Registry.
`snet-maven-sdk-plugin` automates API downloading and unpacking. To use the
plugin add the following code under `plugins` section of the Maven `pom.xml`:

```xml
<plugin>
  <groupId>com.github.singnet.snet-sdk-java</groupId>
  <artifactId>snet-sdk-maven-plugin</artifactId>
  <version>master-SNAPSHOT</version>
  <executions>
    <execution>

      <configuration>
        <orgId>example-org</orgId>
        <serviceId>example-service</serviceId>
        <outputDir>${project.build.directory}/proto</outputDir>
        <javaPackage>io.singularitynet.service.exampleservice</javaPackage>
        <ethereumJsonRpcEndpoint>http://localhost:8545</ethereumJsonRpcEndpoint>
        <!-- for the custom environment only -->
        <ipfsRpcEndpoint>http://localhost:5002</ipfsRpcEndpoint>
        <registryAddress>0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2</registryAddress>
      </configuration>

      <goals>
        <goal>get</goal>
      </goals>

    </execution>
  </executions>
</plugin>
```

`orgId` and `serviceId` parameters specify the service we are going to use.
`outputDir` points to the location which is used to download the Protobuf API
of the service. `javaPackage` sets the convenient package name to place the
compiled API classes. `ethereumJsonRpcEndpoint` specifies the Ethereum network
to use. Full list of the parameters can be found at [Maven plugin GitHub
repo](https://github.com/singnet/snet-sdk-java/tree/master/pligin/maven).

Last couple of parameters `ipfsRpcEndpoint` and `registryAddress` are optional
but here we should specify them properly because we are using a custom
SingularityNET environment.

Use Protobuf and gRPC Maven plugins to compile the API of the service.
`protoSourceRoot` of the `protobuf-maven-plugin` should include `outputDir`
directory which is passed to `snet-sdk-maven-plugin`. More information about
gRPC plugins usage can be found [here](/tutorials/client/java/grpc-maven).

## Setup SDK

SDK configuration contains properties which are required to initialize a
SingularityNET platform client. Most of the properties can be left with
default values:

```java
Configuration config = Configuration.newBuilder()
    .setEthereumJsonRpcEndpoint("http://localhost:8545")
    .setIdentityType(Configuration.IdentityType.PRIVATE_KEY)
    .setIdentityPrivateKey(Utils.hexToBytes("04899d5fd471ce68f84a5ec64e2e4b6b045d8b850599a57f5b307024be01f262"))
    // for the custom environment only
    .setIpfsEndpoint("http://localhost:5002")
    .setRegistryAddress(new Address("0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2"))
    .setMultiPartyEscrowAddress(new Address("0x5c7a4290f6f8ff64c69eeffdfafc8644a4ec3a4e"))
    .build();
```

Ethereum JSON RPC Endpoint is a required property which selects the Ethereum
network and JSON RPC endpoint to use. Experienced Ethereum users can use Infura
URL with own project id here, see [Infura Getting
Started](https://infura.io/docs). But for the sake of simplicity we use
SingularityNET project id Infura URL which is available as a `Configuration`
constant.

Identity type is a required property which selects the type of the Ethereum
identity to use. In our example we use a private key identity. To configure it
properly we add a private key via "identity private key" property. Utility
method `Utils.hexToBytes()` is used to convert the hex string containing
private key to the array of bytes. Here we use the private key of the Ethereum
identity which is predefined in the local environment.

Like in the Maven plugin configuration last three parameters are optional, but
we should specify them to play with a custom environment.

Configuration is done and we are ready to create an instance of the `Sdk` class:

```java
Sdk sdk = new Sdk(config);
try {

    // service client code

} finally {
    sdk.close();
}
```

`Sdk` class keeps a connection to the Ethereum endpoint and initializes
Ethereum smart contracts API. These resources should be released when an `Sdk`
instance is not needed anymore. 

## Create service client

Before opening connection to the service we need to specify a payment strategy.
`OnDemandPaymentChannelPaymentStrategy` uses `MultiPartyEscrow` contract to pay
for the service calls. It automatically finds an appropriate payment channel or
opens the new one.  It extends the expiration date and adds the funds if it is
required. It has two integer parameters. First parameter specifies the minimal
channel lifetime in Ethereum blocks. Second parameter specifies the number of
calls to prepay in the channel:

```java
OnDemandPaymentChannelPaymentStrategy paymentStrategy =
    new OnDemandPaymentChannelPaymentStrategy(sdk, 40320 /* about a week in
    Ethereum blocks assuming single block is mined in 15 seconds */, 100);
```

`sdk.newServiceClient()` call opens a gRPC connection to the service client:

```java
ServiceClient serviceClient = sdk.newServiceClient("snet", "cntk-image-recon",
    "default_group", paymentStrategy);
try {

    // service client code

} finally {
    client.close();
}
```

Service endpoint group id has to be specified in addition to the organization
id and service id. It is used to select a service endpoint to connect. To get a
list of the service endpoint groups one can use `sdk.getMetadataProvider(String
orgId, String serviceId).getServiceMetadata()` call. See [ServiceMetadata
documentation](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc/io/singularitynet/sdk/registry/ServiceMetadata.html)
for details.

The service client keeps the opened gRPC connection and it should be closed
when not needed.

## Call service

Last code snippet is pretty close to the gRPC API usage pattern:

```java
CalculatorBlockingStub stub = serviceClient.getGrpcStub(CalculatorGrpc::newBlockingStub);
Numbers numbers = Numbers.newBuilder()
    .setA(7)
    .setB(6)
    .build();
Result result = stub.mul(numbers);
System.out.println("Response received: " + result);
```

First we create gRPC stub for the gRPC interface we are going to use.
Then construct gRPC request, call the service and print the response. Both
synchronous and asynchronous gRPC stubs are supported.

## Run application

Compile and run the application. If it goes well you should see the following
response on your console:
```
Response received: delta_time: "4.1049"
top_5: "{1: \'90.81%: rose\', 2: \'02.67%: carnation\', 3: \'01.96%: corn poppy\', 4: \'01.10%: ball moss\', 5: \'00.79%: garden phlox\'}"
```

On the real Ethereum network first call can take much more time than others.
The reason is the payment strategy sends an Ethereum transaction in order to
prepare the payment channel when appropriate channel is not found. The time to
mine the transaction depends on the current gas price and other conditions. On
mainnet it may take 1 minute or much more. Consequent calls are much faster
because the usage of the payment channel doesn't require making transactions.

There are two ways of making first call execution time predictable. First
option is creating a payment channel in advance. Use `Sdk` and
[BlockchainPaymentChannelManager](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc/io/singularitynet/sdk/mpe/BlockchainPaymentChannelManager.html)
to open a channel from the application. Or use
[snet-cli](/docs/ai-consumers/snet-cli) tool to open a channel from the command
line.

Second option is increasing a gas price by setting new value in configuration,
see [Configuration.Builder
documentation](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc/io/singularitynet/sdk/client/Configuration.Builder.html#setGasPrice-java.math.BigInteger-).
This way doesn't guarantee the execution time but can decrease the time to
mine the transaction.
