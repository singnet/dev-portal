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

This tutorial explains how to create SingularityNET service client in Java
language. Full code of the tutorial application can be found at [Java SDK
repository](https://github.com/singnet/snet-sdk-java/tree/master/example/cli/cntk-image-recognition),
SDK javadoc is located at [Jitpack](https://jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc)

## Get AGI tokens

TODO

## Setup project

First of all we need making new Java project. SingularityNET Java SDK contains
plugins to support two most popular project management tools in Java world
Maven and Gradle. We will use Maven in examples below. One can find Gradle
related documentation in [Gradle plugin GitHub
repo](https://github.com/singnet/snet-sdk-java/tree/master/gradle-plugin).
More information on Maven in [Maven in 5
minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
tutorial.

Add Java SDK artifact into Maven `pom.xml` `dependencies` section:

```xml
<dependency>
  <groupId>com.github.singnet.snet-sdk-java</groupId>
  <artifactId>snet-sdk-java</artifactId>
  <version>master-SNAPSHOT</version>
</dependency>
```

In order to use a service one need to add the service API as dependency of the
project. Service API is kept in platform Registry. One can get it from Registry
using `snet-sdk-maven-plugin`. Add the following XML under `plugins` section of
the Maven `pom.xml`:

```xml
<plugin>
  <groupId>com.github.singnet.snet-sdk-java</groupId>
  <artifactId>snet-sdk-maven-plugin</artifactId>
  <version>master-SNAPSHOT</version>
  <executions>
    <execution>

      <configuration>
        <orgId>snet</orgId>
        <serviceId>cntk-image-recon</serviceId>
        <outputDir>${project.build.directory}/proto</outputDir>
        <javaPackage>io.singularitynet.service.cntkimagerecon</javaPackage>
        <ethereumJsonRpcEndpoint>https://mainnet.infura.io/v3/e7732e1f679e461b9bb4da5653ac3fc2</ethereumJsonRpcEndpoint>
      </configuration>

      <goals>
        <goal>get</goal>
      </goals>

    </execution>
  </executions>
</plugin>
```

Organization id and service id parameters specify a service we are going to
use. Output directory specifies a location which is used to unpack service
Protobuf API. Java package sets convenient package name to keep
compiled API classes. Ethereum JSON RPC enpoint specifies Ethereum network
to use. One can find full list of parameters in [Maven plugin GitHub
repo](https://github.com/singnet/snet-sdk-java/tree/master/maven-plugin).

Use Protobuf and gRPC Maven plugins in order to compile the API of the service.
`protoSourceRoot` of the `protobuf-maven-plugin` should include `outputDir`
directory which is passed to `snet-sdk-maven-plugin`. More
information about gRPC plugins usage is [here](/tutorials/client/java/grpc-maven).

## Setup SDK

Configuration contains main properties to initialize SingularityNET platform
client. For most of properties default values can be used safely. Three 
properties are required to be passed:

```java
Configuration config = Configuration.newBuilder()
    .setEthereumJsonRpcEndpoint(Configuration.MAINNET_INFURA_ETHEREUM_JSON_RPC_ENDPOINT)
    .setIdentityType(Configuration.IdentityType.PRIVATE_KEY)
    .setIdentityPrivateKey(Utils.hexToBytes("<PRIVATE-KEY-IN-HEX>"))
    .build();
```

Ethereum JSON RPC Endpoint property selects Ethereum network to use and JSON
RPC endpoint to use. One can use Infura URL with own project id, see [Infura
Getting Started](https://infura.io/docs) in order to do that. But for the
experiment we will use SingularityNET project id URL which is available as
Configuration constant.

Identity type selects the type of identity used. In our example we will use
private key identity passing private key via "identity private key" property.
Utility method `Utils.hexToBytes()` is used to convert private key in hex string
to the array of bytes.

When configuration is done we are ready to create an `Sdk` instance:

```java
Sdk sdk = new Sdk(config);
try {
    ...
} finally {
    sdk.close();
}
```

`Sdk` class keeps connection to the Ethereum endpoint and initializes Ethereum
smart contracts API. These resources should be released when `Sdk` is not
needed anymore. We will put all service usage code into `try` block
after `Sdk` initialization and close `Sdk` in `finally` block.

## Create service client

Before opening connection to the service we need to specify a payment strategy.
`OnDemandPaymentChannelPaymentStrategy` uses `MultiPartyEscrow` contract to pay
for service calls. It automatically finds appropriate channel or opens new one.
It extends expiration date and adds funds if it is required.  First parameter
specifies minimal channel lifetime, and second specifies number of calls to
prepay in channel:

```java
OnDemandPaymentChannelPaymentStrategy paymentStrategy =
    new OnDemandPaymentChannelPaymentStrategy(sdk, 40320 /* about a week in
    Ethereum blocks */, 100);
```

`sdk.newServiceClient()` call below opens gRPC connection to the service client:

```java
ServiceClient serviceClient = sdk.newServiceClient("snet", "cntk-image-recon",
    "default_group", paymentStrategy);
try {
    ...
} finally {
    client.close();
}
```

In addition to organization id and service id, service endpoint group id has to
be specified. It is used to select the service endpoint to connect. To get a
list of service endpoint groups one can use `sdk.getMetadataProvider(String
orgId, String serviceId).getServiceMetadata()` call. See [ServiceMetadata
documentation](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc/io/singularitynet/sdk/registry/ServiceMetadata.html)
for details.

As service client keeps gRPC connection opened it should be closed after usage.
We place the code which calls the service into `try` block and call
`client.close()` method in `finally` section.

## Call service

Last code snippet is pretty close to the gRPC API usage pattern:

```java
RecognizerBlockingStub stub = serviceClient.getGrpcStub(RecognizerGrpc::newBlockingStub);
Input input = Input.newBuilder()
    .setModel("ResNet152")
    .setImgPath("https://d2z4fd79oscvvx.cloudfront.net/0027071_1_single_rose_385.jpeg")
    .build();
Output output = stub.flowers(input);
System.out.println("Response received: " + output);
```

First we need to create gRPC stub for the service we are going to use. After
that construct gRPC request, call the service and print response. Both
synchronous and asynchronous gRPC stubs can be created.

## Run application

Compile and run the application. If it goes well you should see the following
response on your console:
```
Response received: delta_time: "4.1049"
top_5: "{1: \'90.81%: rose\', 2: \'02.67%: carnation\', 3: \'01.96%: corn poppy\', 4: \'01.10%: ball moss\', 5: \'00.79%: garden phlox\'}"
```

Usually first run will take much time. The reason is payment strategy sends
Ethereum transaction in order to open new payment channel. The time to finish
the transaction depends on current gas price. On mainnet it may take 1 minute
and in rare cases much more. Consequent calls will be much faster as usage of
the payment channel doesn't require transaction at all.

There are two ways of making first call execution time predictable. First
option is to create a payment channel in advance. Use `Sdk` and
[BlockchainPaymentChannelManager](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc/io/singularitynet/sdk/mpe/BlockchainPaymentChannelManager.html)
to open channel from the application. Or use
[snet-cli](/docs/ai-consumers/snet-cli) tool to openc channel from command
line.

Second option is to increase gas price by setting new value in configuration,
see [Configuration.Builder
documentation](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/master-SNAPSHOT/javadoc/io/singularitynet/sdk/client/Configuration.Builder.html#setGasPrice-java.math.BigInteger-).
This way doesn't guarantee the execution time but may make mining transaction
much faster.
