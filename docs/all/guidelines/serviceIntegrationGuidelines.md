![singnetlogo](assets/singnet-logo.jpg 'SingularityNET')

[singnet-home]: https://www.singularitynet.io
[singnet-github]: https://github.com/singnet
[dnn-github]: https://github.com/singnet/dnn-model-services
[contribution-guidelines]: https://github.com/singnet/wiki/blob/master/guidelines/CONTRIBUTING.md
[docs-templates]: https://github.com/singnet/wiki/blob/master/templates
[cpp-tutorial]: https://github.com/singnet/wiki/tree/master/tutorials/howToWriteCPPService
[java-tutorial]: https://github.com/singnet/wiki/tree/master/tutorials/howToWriteJavaService
[go-tutorial]: https://github.com/singnet/wiki/tree/master/tutorials/howToWriteGoService
[python-tutorial]: https://github.com/singnet/wiki/tree/master/tutorials/howToWritePythonService
[opencog-tutorial]: https://github.com/singnet/wiki/tree/master/tutorials/howToWriteOpencogService
[service-tutorial]: https://github.com/singnet/wiki/tree/master/tutorials/howToPublishService
[naming-standards]: https://github.com/singnet/wiki/blob/master/doc/Naming-Standards.md
[grpc]: https://grpc.io/
[grpc-docs]: https://grpc.io/docs/
[opencog]: https://opencog.org/
[opencog-services]: https://github.com/singnet/opencog-services

# Guidelines for service integration in SingularityNET

These are guidelines to help SingularityNET developers to write/integrate new
AI services to the platform.

- [Supported languages](#languages)
- [AI frameworks](#frameworks)
- [Third-party code and models](#thirdparty)
- [Service documentation](#docs)
- [Contributing to existing projects](#contributing)

## <a name="languages"></a> Supported languages

SingularityNET services use [gRPC][grpc] which is an open-source universal RPC
framework. So any new service must provide its API in gRPC.

gRPC supports several programming languages and a guide for each of them is
available [here][grpc-docs].

- C++
- Java
- Python
- Go
- Ruby
- C#
- Node.js
- Android Java
- Objective-C
- PHP

There are tutorials with step-by-step instructions for implementing a new
service in each of these languages:

- [How to write a SingularityNET service in C++][cpp-tutorial]
- [How to write a SingularityNET service in Python][python-tutorial]
- [How to write a SingularityNET service in Java][java-tutorial]
- [How to write a SingularityNET service in Go][go-tutorial]

If you already have a gRPC service, this tutorial explains how to publish it in
SingularityNET:

- [How to publish a service][service-tutorial]

Make sure you follow our [naming standardisation guidelines][naming-standards].

## <a name="frameworks"></a> AI frameworks

There are a couple of AI frameworks integrated to SingularityNET so you
can just add new functionalities to services which are already published.

- [Opencog][opencog]: an open-source software project aimed at directly
confronting the AGI challenge, using mathematical and biological inspiration
and professional software engineering techniques.

There are tutorials with step-by-step instructions on how to extend the
existing AI framework service in order to implement new functionalities:

- [How to write an Opencog service for SingularityNET][opencog-tutorial]

## <a name="thirdparty"></a> Third-party code and models

Before publishing a service based on third-party code or model(s), make sure
you follow all the guidelines below.

1. The service is FREE.
1. The main documentation of the service (e.g. README.md) mentions (crystal clear)
that the service is based on third-party work.
1. The original work (code, paper, model etc) is clearly mentioned and properly
linked in README.
1. The authors of the original code or model(s) are clearly mentioned 
in README.
1. Any licenses attached to the original work is mentioned in README.
1. The terms of any license attached to the original work allows its use in
SNET.

See [this example][dnn-github] of third-party based service documentation which
is fully compliant with these guidelines.

## <a name="docs"></a> Service documentation

All the following documentation is mandatory for any service.

1. **README** (see our recommended [templates][docs-templates]) describing the
structure of the repository and how to build/test the service. This is a sort
of "developer's guide" aimed at people interested in extending or reusing the
service.
1. **docs/index.html** pointed by standard Github Pages describing how to use
the service. This is the "user's guide" of your service.
1. **LICENSE** with SNET standard license.

If you are extending an existing service. Follow any particular guidelines of
the specific project and make sure you update all the aforementioned documents
accordingly.

See [this example][opencog-services] of service documentation which
is fully compliant with these guidelines.

## <a name="contributing"></a> Contributing to existing projects

SingularityNET have several AI service integration projects. See our
[github][singnet-github] for a list of them. Before contributing to any of
thees, please read our [contribution guidelines][contribution-guidelines].
