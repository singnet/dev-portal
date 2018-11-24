# SingularityNET Documentation Wiki

> SingularityNET is still under active development. The design is
> rapidly evolving and should be considered unstable until we release our Beta platform later this year.

## Contents

- [Resources](doc/Resources.md)

### SNET Platform
- [Overview](doc/Overview.md)
- [Daemon](doc/SingularityNET-Daemon.md)
- [Registry](doc/SingularityNET-Registry.md)
- [Getting Started](doc/Getting-Started.md)
- [Platform How-Tos](doc/Platform-How-Tos.md)

### SNET Platform Development

- [Tutorial: Build and deploy SingularityNET locally](doc/Tutorial:-Build-and-deploy-SingularityNET-locally.md)

## Welcome to the SingularityNET Wiki

This is the community maintained wiki covering the details of the SingulairtyNET platform and our associated decentralized network of AI services.
It includes information describing how to build and access AI services that are published onto the network as a service developer or an end-client.

### What is SingularityNET?

SingularityNET is an open and decentralized network of AI services made accessible through 
the blockchain. AI developers publish their services onto the SingularityNET network where they can be used by anyone with 
an internet connection. AI deveopers are able to charge for the use of their services using the 
native AGI token -- an ERC20 token hosted on Ethereum.

AI services span the entire gamut of offerings in artificial intelligence and machine learning.
AI developers can provide services for inference or model training across myriad domains
such as image/video, speech, text, time-series, bio-AI, network analysis, etc. AI services can
be as small as individual algorithms or large as end-to-end solutions and standalone AI applications.
AI developers can also deploy autonomous AI agents that interoperate with other services on
the network.

The SingularityNET platform and network can be broken down into several core components:

* **Agents:** An Agent is an AI service that has been published onto the SingularityNET network. It has an 
associated Agent contract that manages pricing and exposes metadata such as the service endpoint.
End users interact with the Agent contract on-chain to purchase access to a service using 
SingularityNET's native AGI token.

* **Registry**: AI services are published onto a publicly accessible central registry on the
blockchain. The registry maintains a list of active Agents on the network that expose services
which can be called using the AGI token.

* **SNET Daemon:** An AI service developer exposes their service to the network by running
the SNET Daemon alongside their service. The SNET Daemon interacts with the blockchain to 
facilitate authorization and payment for services and acts as a passthrough for making API
calls to the service.

* **Escrow:** Currently exposed as a *Job* contract on the blockchain, AGI funds are held 
in escrow during interaction between an end-user and an Agent The escrow is funded before a
service can be called and funds are not released from escrow until the services have been
delivered.

* **SNET DApp:** The SingularityNET DApp is a front-end for exploring available AI services 
and inetracting with them through a web-UI. 

### Current state of development

SingularityNET raised funds to build out our platform during our Token Generation Event (TGE) in
December 2017. Since then we've been working quickly to build upon our platform and 
finalize designs for our production platform which will go into Beta later in 2018.

Active development on our platform is still continuing as we add additional capabilities to enable
AI developers to begin launching services onto the network. Our goal is to help the community
build out a vibrant network of useful AI services.

Designs for our production platform and associated development roadmap will also be published to the
wiki as they are finalized.

### Find out more 

To get started with the SingularityNET platform review the [Overview](doc/Overview.md) and 
[Getting Started](doc/Getting-Started.md) pages.

Further [Resources](doc/Resources.md),
including information on how to acquire AGI tokens.

