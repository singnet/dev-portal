Welcome to the SingularityNET Developer Portal! Let's build the Technological Singularity together!

The SingularityNET Developer Portal offers documentation about the SingularityNET Marketplace. It covers the details of the SingularityNET Platform and our associated decentralized network of AI services. With this portal, you will learn how to build and access AI services that are published onto the network as a service developer or an end-client.

You can find our portal at [dev.singularitynet.io](https://dev.singularitynet.io) and the current Alpha Marketplace at [alpha.singularitynet.io](http://alpha.singularitynet.io)

> SingularityNET is still under active development. The design is rapidly evolving and should be considered unstable until we release our beta platform in February 2019.

## Documentation Pages
- [All Documentation](/docs/all)
- [Documentation for AI Service Providers](/docs/provider)
- [Documentation for AI Service Buyers](/docs/buyer)
- [Multi-Party Escrow Documentation](/docs/all/mpe)
- [Tutorials](/tutorials)
- [Workshops](/workshops)
- [Developer Portal Documentation](/docs/contribute)

## SingularityNET Platform
- [Daemon](/docs/all/daemon)
- [Multi-Party Escrow](/docs/all/mpe/mpe)
- [Payment Channel Storage](/docs/all/mpe/payment-channel-storage)
- [Registry](/docs/all/registry)

## Platform Development
- Tutorials
	- [Build and deploy SingularityNET locally](/docs/all/deploy-singularitynet)
	- [Build, publish and run a sample service on the SingularityNET platform - Example 1](/docs/all/mpe/front-to-back-examples/example)
	- [Build, publish and run a sample service on the SingularityNET platform - Example 2](/tutorials/publish)
	- [Build a service in C++](/tutorials/cpp)
	- [Build a service in Go](/tutorials/go)
	- [Build a service in Java](/tutorials/java)
	- [Build a service in Python](/tutorials/python)
	- [Build an Opencog service](/tutorials/opencog)

## What is SingularityNET
SingularityNET is an open and decentralized network of AI services made accessible through the blockchain. AI developers publish their services onto the SingularityNET network where they can be used by anyone with an internet connection. AI developers are able to charge for the use of their services using the native AGI token -- an ERC20 token hosted on Ethereum.

AI services span the entire gamut of offerings in artificial intelligence and machine learning. AI developers can provide services for inference or model training across myriad domains such as image/video, speech, text, time-series, bio-AI, network analysis, etc. AI services can be as small as individual algorithms or large as end-to-end solutions and standalone AI applications. AI developers can also deploy autonomous AI agents that interoperate with other services on the network.

The SingularityNET platform and network can be broken down into several core components:

* **Agents:** An Agent is an AI service that has been published onto the SingularityNET network. The agent definition is stored on-chain in the registry with metadata such as endpoints stored off-chain in IPFS.

* **Registry**: AI services are published onto a publicly accessible central registry on the
blockchain. The registry maintains a list of active Agents on the network that expose services
which can be called using the AGI token.

* **Multiparty escrow**: A smart contract that facilitates transactions between users and AI service developers. It provides a wallet functionality (deposit and withdraw funds) as well as uni-directional payment channels between users and AI service developers enabling users to pay for service invocations

* **SNET Daemon:** An AI service developer exposes their service to the network by running
the SNET Daemon alongside their service. The SNET Daemon interacts with the blockchain to
facilitate authorization and payment for services and acts as a passthrough for making API
calls to the service.

* **SNET DApp:** The SingularityNET DApp is a front-end for exploring available AI services
and interacting with them through a web-UI.

## Contributing
We are welcoming external contributions to our documentation, such as corrections, improvements, new tutorials, or other suitable additions. Please find our contribution guidelines [here](/docs/contribute/contribution-guidelines).

## Developer updates
In order to receive SingularityNET Developer Updates please subscribe [here](/newsletter).

## Repository Structure
The SingularityNET Developer Portal is structured as follows:
```bash
├── index.md                    # Index page
├── sheet.md                    # Fact sheet with most important details
├── default.md                  # Example page
├── maintenance.md              # Maintenance page
├── docs.md                     # Documentation Index Page
├── docs                        # Documentation of files
│   ├── contribute              # Documentation for contributors
│   │   └── ...                 # Only documentation files for contributors
│   ├── provider                # Documentation for AI Providers
│   │   └── ...                 # Only documentation files for AI providers
│   ├── buyer                   # Documentation for AI Buyers
│   │   └── ...                 # Only documentation files for AI buyers
│   └── all                     # All Documentation
│       └── ...                 # All documentation files go here
├── workshops                   # Here you can find workshop material
│       └── ...                 # Relevant information per workshop
├── tutorials                   # Here you can find our tutorials
│   ├── index.md                # Index Page
│   ├── cpp		        # C++ Service Tutorial
│   │   └── ...                 # Only documentation files for C++
│   ├── docker.md               # Docker Tutorial
│   ├── go	                # Go Service Tutorial
│   │   └── ...                 # Only documentation files for Go
│   ├── java		        # Java Service Tutorial
│   │   └── ...                 # Only documentation files for Java
│   ├── opencog		        # OpenCog Service Tutorial
│   │   └── ...                 # Only documentation files for OpenCog 
│   ├── publish		        # Publish Services
│   │   └── ...                 # Only documentation files for publishing
│   ├── python		        # Python Service Tutorial
│   │   └── ...                 # Only documentation files for Python
│   └── ...                     # Any other tutorials
└── .gitignore
```

## Current State of Development
SingularityNET raised funds to build out our platform during our Token Generation Event (TGE) in December 2017. Since then we've been working quickly to build upon our platform and finalize designs for our production platform which will go into Beta in Feb 2019.

Active development on our platform is still continuing as we add additional capabilities to enable AI developers to begin launching services onto the network. Our goal is to help the community build out a vibrant network of useful AI services.

Designs for our production platform and associated development roadmap will also be published to the wiki as they are finalized.


## Planning
The SingularityNET Developer Portal is in active development. Below you will find what we plan to do next:

* [x] Launch the beta-version of the SingularityNET Developer Portal.
* [x] Pilot developer workshops in Helsinki on the 14th of December 2018.
* [ ] Launch a Meetup group.
* [ ] Create a developer workshop cookbook.
* [ ] Gather feedback from the community.
* [ ] Move all Github Wiki's to the SingularityNET Developer Portal.
* [ ] Implement feedback from the community that we decided to go with.
* [ ] For every tutorial, add a video demonstration.
* [ ] Roll out a global SingularityNET Developer Workshop program.


## Find out more
Further [resources to be found in our Fact Sheet](/sheet).
