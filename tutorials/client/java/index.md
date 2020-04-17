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
language. The content of the tutorial assumes reader is familiar with Java
programming language and Maven or Gradle project management system. One can
find the [full code of the tutorial
application](https://github.com/singnet/snet-sdk-java/tree/0.3.1/example/tutorial)
in Java SDK repository. SingularityNET [Java SDK API
documentation](https://jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/0.3.0/javadoc)
is located at Jitpack.  In order to complete the tutorial one should have [JDK
8 or greater](https://www.oracle.com/java/technologies/javase-downloads.html),
[Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) and
[Docker](https://www.docker.com/) installed on the local machine.

## Setup environment

We are going to use a local SingularityNET environment to run the tutorial
application. It simplifies the things and allow concentrating on the code only.
Nevetherless sometimes it leads to the additonal configuration parameters which
are described separately.

First start the environment docker using command below.

```sh
docker run -p 5002:5002 -p 8545:8545 -p 7000:7000 \
    -ti singularitynet/snet-local-env:3.0.0
```

This environment contains local Ethereum, local IPFS and local Example Service
instances. In order to use them we need propagating three network ports from
the environment. IPFS port `5002`, Ethereum JSON RPC  port `8545` and
SingularityNET daemon port `7000`.

## Setup project


Three things are required to setup the project correctly:
- add Java SDK as a dependency;
- download and unpack service gRPC API protobuf;
- compile protobuf to Java classes.

First step is trivial, second step is done using plugin provided by
SingularityNET SDK, third step is done using gRPC plugin. Please read next
paragraph before moving further because it explains SingularityNET plugin
parameters. Then move to one of the sections below depending on project
management system you are using.

In order to use a service one needs adding the service API as a part of
the project. API of the service is kept in the platform Registry.
SingularityNET SDK provides Maven and Gradle plugins which automate API
downloading and unpacking.

Plugins input number of parameters to get the API:
- `orgId` and `serviceId` parameters specify the service we are going to use;
- `outputDir` points to the location which is used to download the Protobuf API
  of the service;
- `javaPackage` sets the convenient package name to place the compiled API
  classes;
- `ethereumJsonRpcEndpoint` specifies the Ethereum network and RPC endpoint to
  use.

There are couple of additional parameters in the code below. `ipfsRpcEndpoint`
and `registryAddress` are optional we should specify them properly when we are
using a custom SingularityNET environment.

Next two sections explain how to setup [Maven](#maven) and [Gradle](#gradle)
projects.

### Maven

Add [Jitpack](https://jitpack.io) repository to the `project` section of the
Maven `pom.xml`.

```xml
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>
<pluginRepositories>
  <pluginRepository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </pluginRepository>
</pluginRepositories>
```

Add Java SDK artifact as a Maven compilation time dependency (`dependencies`
section of the `pom.xml`).

```xml
<dependency>
  <groupId>com.github.singnet.snet-sdk-java</groupId>
  <artifactId>snet-sdk-java</artifactId>
  <version>0.3.0</version>
</dependency>
```

Use `snet-maven-sdk-plugin` to download and unpack the API of the service. Add
the following code under `plugins` section of the Maven `pom.xml`.

```xml
<plugin>
  <groupId>com.github.singnet.snet-sdk-java</groupId>
  <artifactId>snet-sdk-maven-plugin</artifactId>
  <version>0.3.0</version>
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

Use Protobuf and gRPC Maven plugins to compile the API of the service.

```xml
<project>
  <build>
    ...
    <extensions>
      <extension>
        <groupId>kr.motd.maven</groupId>
        <artifactId>os-maven-plugin</artifactId>
        <version>1.6.2</version>
      </extension>
    </extensions>
    ...
    <plugins>
      ...
      <plugin>
        <groupId>org.xolstice.maven.plugins</groupId>
        <artifactId>protobuf-maven-plugin</artifactId>
        <version>0.6.1</version>
        <configuration>
          <protocArtifact>com.google.protobuf:protoc:3.5.1:exe:${os.detected.classifier}</protocArtifact>
          <pluginId>grpc-java</pluginId>
          <pluginArtifact>io.grpc:protoc-gen-grpc-java:1.20.0:exe:${os.detected.classifier}</pluginArtifact>
          <checkStaleness>true</checkStaleness>
          <protoSourceRoot>${project.build.directory}/proto</protoSourceRoot>
        </configuration>
        <executions>
          <execution>
            <goals>
              <goal>compile</goal>
              <goal>compile-custom</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
      ...
    </plugins>
  </build>
</project>
```

### Gradle

Add Maven Central and [Jitpack](https://jitpack.io) repositories and apply SingularityNET and
Protobuf plugins in `build.gradle` file.

```gradle
buildscript {
    repositories {
        jcenter()
        maven {
            url 'https://jitpack.io'
        }
    }
    dependencies {
        classpath 'com.github.singnet.snet-sdk-java:snet-sdk-gradle-plugin:0.3.0'
        classpath 'com.google.protobuf:protobuf-gradle-plugin:0.8.10'
    }
}

apply plugin: 'io.singularitynet.sdk'
apply plugin: 'com.google.protobuf'
```

Add Jitpack repository and add SingularityNET SDK artifact as a project
dependency.

```gradle
repositories {
    ...
    maven {
        url 'https://jitpack.io'
    }
}

dependencies {
    ...
    implementation 'com.github.singnet.snet-sdk-java:snet-sdk-java:0.3.0'
}
```

Add new task which uses SingularityNET plugin to get the API of the service and
unpack it into the `proto` directory. Add target directory into the Protobuf
source set.

```gradle
task getExampleServiceApi(type: io.singularitynet.sdk.gradle.GetSingularityNetServiceApi) {
    orgId = 'example-org'
    serviceId = 'example-service'
    javaPackage = 'io.singularitynet.service.exampleservice'
    outputDir = file("$buildDir/proto")
    ethereumJsonRpcEndpoint = new URL('http://localhost:8545')
    // for the custom environment only
    ipfsRpcEndpoint = new URL('http://localhost:5002')
    registryAddress = '0x4e74fefa82e83e0964f0d9f53c68e03f7298a8b2'
}

sourceSets {
    main {
        proto {
            srcDir "$buildDir/proto"
        }
    }
}
```

Configure Protobuf plugin to compile the API of the service. Add dependency on
the task which gets the API.

```gradle
protobuf {
    protoc { artifact = "com.google.protobuf:protoc:3.5.1" }
    plugins {
        java 
        grpc { artifact = "io.grpc:protoc-gen-grpc-java:1.20.0" }
    }
    generateProtoTasks {
        all().each { task ->
            task.dependsOn(getExampleServiceApi)
            task.builtins { remove java }
            task.plugins {
                grpc {}
                java {}
            }
        }
    }
}
```

## Setup SDK

SDK configuration contains properties which are required to initialize a
SingularityNET platform client. Most of the properties can be left with
default values.

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

Configuration is done and we are ready to create an instance of the `Sdk` class.

```java
Sdk sdk = new Sdk(config);
try {

    // service client code

} finally {
    sdk.close();
}
```

[Sdk](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/0.3.0/javadoc/io/singularitynet/sdk/client/Sdk.html)
class keeps a connection to the Ethereum endpoint and initializes Ethereum
smart contracts API. These resources should be released when an `Sdk` instance
is not needed anymore. 

## Create service client

Before opening connection to the service we need to specify a payment strategy.
[OnDemandPaymentChannelPaymentStrategy](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/0.3.0/javadoc/io/singularitynet/sdk/paymentstrategy/OnDemandPaymentChannelPaymentStrategy.html)
uses `MultiPartyEscrow` contract to pay for the service calls. It automatically
finds an appropriate payment channel or opens the new one.  It extends the
expiration date and adds the funds if it is required. It has two integer
parameters. First parameter specifies the minimal channel lifetime in Ethereum
blocks. Second parameter specifies the number of calls to prepay in the
channel.

```java
// 40320 is a week in Ethereum blocks assuming single block is mined in 15 seconds
OnDemandPaymentChannelPaymentStrategy paymentStrategy =
    new OnDemandPaymentChannelPaymentStrategy(sdk, 40320, 100);
```

`sdk.newServiceClient()` call opens a gRPC connection to the service client.

```java
ServiceClient serviceClient = sdk.newServiceClient("example-org",
        "example-service", "default_group", paymentStrategy);
try {

    // service client code

} finally {
    serviceClient.close();
}
```

Service endpoint group id has to be specified in addition to the organization
id and service id. It is used to select a service endpoint to connect. To get a
list of the service endpoint groups one can use `sdk.getMetadataProvider(String
orgId, String serviceId).getServiceMetadata()` call. See [ServiceMetadata
documentation](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/0.3.0/javadoc/io/singularitynet/sdk/registry/ServiceMetadata.html)
for details.

The service client keeps the opened gRPC connection and it should be closed
when not needed.

## Call service

Last code snippet is pretty close to the gRPC API usage pattern.

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
response on your console.

```
Response received: value: 42.0
```

On the real Ethereum network first call can take much more time than others.
The reason is the payment strategy sends an Ethereum transaction in order to
prepare the payment channel when appropriate channel is not found. The time to
mine the transaction depends on the current gas price and other conditions. On
mainnet it may take 1 minute or much more. Consequent calls are much faster
because the usage of the payment channel doesn't require making transactions.

There are two ways of making first call execution time predictable. First
option is creating a payment channel in advance. Use `Sdk` and
[BlockchainPaymentChannelManager](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/0.3.0/javadoc/io/singularitynet/sdk/mpe/BlockchainPaymentChannelManager.html)
to open a channel from the application. Or use
[snet-cli](/docs/ai-consumers/snet-cli) tool to open a channel from the command
line.

Second option is increasing a gas price by setting new value in configuration,
see [Configuration.Builder
documentation](https://javadoc.jitpack.io/com/github/singnet/snet-sdk-java/snet-sdk-java/0.3.0/javadoc/io/singularitynet/sdk/client/Configuration.Builder.html#setGasPrice-java.math.BigInteger-).
This way doesn't guarantee the execution time but can decrease the time to
mine the transaction.
