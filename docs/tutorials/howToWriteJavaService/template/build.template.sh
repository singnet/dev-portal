#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]
  then
    echo "Invalid arguments: ./build.sh PROJECT_NAME APP_TYPE"
    exit 1
fi

PROJECT_NAME=$1
APP_TYPE=$2

JAVA_OUT=$(pwd)/src/main/java
PROTO_PATH=$(pwd)/src/main/java/service_spec
PROTO_FILE=$PROJECT_NAME.proto
protoc -I="$PROTO_PATH" --java_out="$JAVA_OUT" "$PROTO_PATH/$PROTO_FILE"
protoc --plugin=protoc-gen-grpc-java=/usr/local/bin/protoc-gen-grpc-java --grpc-java_out="$JAVA_OUT" --proto_path="$PROTO_PATH" "$PROTO_FILE"

# Cleaning compiled sources
rm -rf ./out/
mkdir -p out

# Adding to classpath
javac -cp ./libs/grpc-alts-1.16.1.jar:./libs/grpc-context-1.16.1.jar:./libs/grpc-core-1.16.1.jar:./libs/grpc-netty-shaded-1.16.1.jar:./libs/grpc-protobuf-1.16.1.jar:./libs/grpc-protobuf-lite-1.16.1.jar:./libs/grpc-stub-1.16.1.jar:./libs/guava-21.0.jar:./libs/opencensus-api-0.17.0.jar:./libs/opencensus-contrib-grpc-metrics-0.17.0.jar:./libs/proto-google-common-protos-1.0.0.jar:./libs/protobuf-java-3.5.1.jar:./libs/protobuf-java-util-3.5.1.jar ./src/main/java/*.java -d ./out/

# Copy jar to out path
cp libs/*.jar ./out/

# Extract compiled class files
cd ./out/
for a in `ls -1 *.jar`; do jar -xf $a; done

# Removing all jars files
rm *.jar
cd ..

# Jar packaging
if [ "$APP_TYPE" = "server" ]
then
	jar -cvfm JavaServer.jar ./src/main/resources/META-INF/SERVER_MANIFEST.MF -C ./out/ .
	mv ./JavaServer.jar ./bin/JavaServer.jar 
fi
if [ "$APP_TYPE" = "client" ]
then
	jar -cvfm JavaClient.jar ./src/main/resources/META-INF/CLIENT_MANIFEST.MF -C ./out/ .
	mv ./JavaClient.jar ./bin/JavaClient.jar 
fi

# Cleaning compiled sources
rm -rf ./out/
mkdir -p out