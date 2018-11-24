# Getting Started

## Service Owner/Creator

### Create an Organization
The SingularityNET Registry groups Service Registrations into Organizations that have globally unique names.
Organizations are intended to represent real-world organizations such as groups or corporations that develop
SingularityNET services, though they can be employed as seen fit by the user.

Existence of an Organization under which to register a Service is required to expose a SingularityNET service
for discovery using the DApp or other tools.

Take a look at [this](Platform-How-Tos.md#create-an-organization-in-the-singularitynet-registry)
how-to to get an Organization created if one doesn't already exist for your use.

### Prepare a Service for Use on SingularityNET
The SingularityNET platform is designed such that a variety of different types of services can easily be exposed
for discovery and consumption using SingularityNET. Given a JSON-RPC/gRPC service or an executable that is implemented
to be invoked on a per-request basis, the following steps are necessary to offer the service to consumers
through the SingularityNET platform.

#### Create a Service Model
If a JSON-RPC or executable is being prepared for SingularityNET without having been published before, it is likely
that a protobuf service model doesn't exist to describe the service's API. Our Daemon uses the protobuf language as
a universal IDL to describe all SingularityNET service APIs so that a consistent protocol can be relied upon
regardless of individual design decisions made by different service developers. See
[this](Platform-How-Tos.md#create-a-service-model) how-to guide for an
example of how to create a protobuf model that encodes the API exposed by your service. Note that if you're trying to
publish an existing gRPC service to the SingularityNET network, you've probably already created the required model.

#### Initialize Service Metadata
We designed the SingularityNET CLI and other tools to make the creation and administraton of SingularityNET services
as easy as managing software packages published to repositories like PyPI or NPM. Service metadata can be declared
in local files designed to be checked in and managed by source control alongside the implementation code for your
service. See [this](Platform-How-Tos.md#initialize-service-metadata) how-to guide for
more details on how to get started with declaring your service's metadata.

#### Publish Service to Network
Once you have the service model and metadata completed on your local filesystem, it's easy to get this information
published to the SingularityNET platform. Creation of an Agent, Service Registration, and uploading of the service
metadata and model to IPFS can be completed at the same time by following
[this](Platform-How-Tos.md#publish-service-metadata) how-to guide.

### Deploy a Service with SingularityNET Daemon

Download a copy of the daemon executable for your platform on the daemon's
[releases](https://github.com/singnet/snet-daemon/releases) page

#### Configure the Daemon
The daemon's configuration must be fine-tuned to match the requirements of your specific service implementation.
See [this](Platform-How-Tos.md#configure-singularitynet-daemon) how-to guide for
a detailed description of each configuration key.

#### Run the Service and Daemon
Once the deamon has been configured the last step is to run your service and daemon together on the same host.
Once the processes start, the daemon is ready to accept incoming requests from consumers through the SingularityNET
platform.

## Service Consumer

### Browsing Agents in the Registry
Navigate to the SingularityNET Alpha [dapp](http://alpha.singularitynet.io) where you can browse through different
services on SingularityNET.

### Calling a Service Using the Dapp
This is a current work in progress. Please check back soon for directions.

### Calling a Service Using the CLI
This is a current work in progress. Please check back soon for directions.
