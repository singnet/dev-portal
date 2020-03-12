---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Compile gRPC API in Maven
description: Quick guide on compiling gRPC API in Maven

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
```xml
<project>
  ...
  <properties>
    <protobuf.version>3.5.1</protobuf.version>
    <grpc.version>1.20.0</grpc.version>
  </properties>
  ...
  <!-- load gRPC artifacts versions -->
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>io.grpc</groupId>
        <artifactId>grpc-bom</artifactId>
        <version>${grpc.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
  ...
  <dependencies>
    ...
    <!-- protobuf and gRPC dependencies -->
    <dependency>
      <groupId>com.google.protobuf</groupId>
      <artifactId>protobuf-java</artifactId>
      <version>${protobuf.version}</version>
    </dependency>
    <dependency>
      <groupId>io.grpc</groupId>
      <artifactId>grpc-netty-shaded</artifactId>
    </dependency>
    <dependency>
      <groupId>io.grpc</groupId>
      <artifactId>grpc-protobuf</artifactId>
    </dependency>
    <dependency>
      <groupId>io.grpc</groupId>
      <artifactId>grpc-stub</artifactId>
    </dependency>
    <dependency>
      <groupId>javax.annotation</groupId>
      <artifactId>javax.annotation-api</artifactId>
      <version>1.3.2</version>
    </dependency>
    ...
  </dependencies>
</project>
```

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
        <configuration>
          <!-- artifact to download binary protobuf compiler -->
          <protocArtifact>com.google.protobuf:protoc:${protobuf.version}:exe:${os.detected.classifier}</protocArtifact>
          <!-- make maven using GRPC plugin for compile-custom and test-compile-custom goals -->
          <pluginId>grpc-java</pluginId>
          <!-- artifact to download GRPC protobuf compiler plugin -->
          <pluginArtifact>io.grpc:protoc-gen-grpc-java:${grpc.version}:exe:${os.detected.classifier}</pluginArtifact>
          <!-- to not recompile protobuf each time -->
          <checkStaleness>true</checkStaleness>
          <protoSourceRoot>${project.build.directory}/proto</protoSourceRoot>
        </configuration>
        <executions>
          <execution>
            <goals>
              <!-- compile .proto files located under main directory -->
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
