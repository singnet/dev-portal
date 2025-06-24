# SDK Structure Update Documentation

This document explains recent structural changes in the SingularityNET JavaScript SDK repositories, highlighting how these modifications simplify usage and improve clarity.

## Previous SDK Repository Structure

Previously, the SingularityNET SDK for JavaScript comprised three main components within a **single repository**:

* **SNET SDK Core**: Core functionalities shared between Web and Node.js SDKs.
* **SNET NodeJS SDK**: Node.js-specific SDK implementations.
* **SNET WebJS SDK**: Browser-specific SDK implementations.

This unified repository approach forced users to clone the entire repository, even if they needed only one component.

## New Architecture

The diagram below clearly demonstrates the relationship between the core SDK and the environment-specific SDKs:

<ImageViewer src="/assets/images/products/SDK/new-js-sdk.png" alt="SDK-new"/>

## Updated SDK Repository Structure

For improved modularity and ease of use, the SDKs have now been split into three separate repositories:

* **[snet-sdk-js-core](https://github.com/singnet/snet-sdk-js-core)** *(Core SDK - no direct download required)*
  This core SDK provides essential functionalities including:

  * Daemon connection management.
  * Abstracted payment strategies.
  * Cross-platform support.
  * Ethereum payments system.

* **[snet-sdk-js-web](https://github.com/singnet/snet-sdk-js-web)** *(Web Browser SDK)*
  Extends the core SDK specifically for web environments:

  * Optimized for browsers.
  * Compatible with popular frameworks (e.g., React).
  * Detailed web integration setup with polyfills provided.
  * The ability to make Metmask payments using a browser extension.

* **[snet-sdk-js-node](https://github.com/singnet/snet-sdk-js-node)** *(Node.js SDK)*
  Extends the core SDK specifically for Node.js:

  * Optimized for backend applications.
  * Node.js environment specifics provided.
  * gRPC service interaction and generation of service-specific client libraries.
  * The ability to make Metmask payments using a private key.

## Advantages of This Update

* **Modular Approach**: Clear boundaries and focused repositories for targeted environments.
* **Simplified Installation**: Users download only the relevant SDK.
* **Easier Maintenance and Updates**: Independent versioning and releases.

## Core SDK Functionality Overview

The diagram below illustrates key functionalities provided by the `snet-sdk-core` package:

<ImageViewer src="/assets/images/products/SDK/core-sdk.png" alt="core-sdk"/>

Core SDK functionality includes:

* Various payment strategy implementations (`FreeCall`, `PaidCall`, `Prepaid`, `Default`).
* Payment channel and Ethereum transaction handling.
* Management of service metadata and account interactions.

## Installation Instructions

Now, users only need to clone the relevant repository according to their project requirements:

### Web SDK Users:

```bash
npm install snet-sdk-js-web
```

For detailed setup and usage examples, visit [snet-sdk-js-web](https://github.com/singnet/snet-sdk-js-web).

### Node.js SDK Users:

```bash
npm install snet-sdk-node
```

For detailed setup and usage examples, visit [snet-sdk-js-node](https://github.com/singnet/snet-sdk-js-node).

**Note**: Users do **not** need to install the core SDK (`snet-sdk-js-core`) explicitly, as it will be automatically managed through package dependencies.
