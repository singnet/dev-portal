# Protocol Buffers

Protocol Buffers also know as Protobuf, is a method of data serialization. It provides a simple and efficient way of describing data that is to be stored or exchanged between systems. Its similar to XML and JSON but is
much smaller in size thereby improving performance of network communication. The method involves an interface description language that describes the structure of some data and a program that generates source code from that description for generating or parsing a stream of bytes that represents the structured data.

Google developed <a href="https://developers.google.com/protocol-buffers/docs/overview" target="_blank">Protocol Buffers</a> and provided a code generator for multiple languages under an open source license.

Data structures (called messages) and services are described in a proto definition file (.proto) and compiled with protoc. This compilation generates code that can be invoked by a sender or recipient of these data structures. For example, example.pb.cc and example.pb.h are generated from example.proto. They define C++ classes for each message and service in example.proto.

Canonically, messages are serialized into a binary wire format which is compact, forward- and backward-compatible, but not self-describing (that is, there is no way to tell the names, meaning, or full datatypes of fields without an external specification). There is no defined way to include or refer to such an external specification (schema) within a Protocol Buffers file. The officially supported implementation includes an ASCII serialization format,[6] but this format—though self-describing—loses the forward- and backward-compatibility behavior, and is thus not a good choice for applications other than debugging.

Protocol buffers are a language-neutral, platform-neutral extensible mechanism for serializing structured data.