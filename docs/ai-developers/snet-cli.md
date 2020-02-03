---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: The SingularityNET Command Line Tools

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

page_nav:
    prev:
        content: Software
        url: '/docs/concepts/software'
    next:
        content: SDK
        url: '/docs/concepts/sdk'
---

---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: The SingularityNET Command Line Tools

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

page_nav:
    prev:
        content: Software
        url: '/docs/concepts/software'
    next:
        content: SDK
        url: '/docs/concepts/sdk'
---

The SingularityNET command line interface (CLI) is a primary tool used for supporting the service providers as follows:
* interacting with theplatform's smart contracts
* managing deployed services
* managing funds

**Note**: Soon the interface will support web-based dashboard and control panel.

For example, you can successfully complete the following operation at the CLI prompt:
* Create Organization Metadata, whcih can craete a JSAON format at the background
* Publish it to the Blockchain
* Add few tokens to your account
* Move your tokens 
* Create a channel and move some funds to the other channel
* Make a call to any service
* Signature signing using MetaMask
The CLI includes set of commands to interface with the blockchain as follows:
* creating and managing identities;
* registering and managing the organizations, members, services, types, and tags on the
SingularityNET Registry;
* claiming funds from customers using MPE and payment channels;
* reading and writing metadata and Protobuf specs about AI services (these are stored on IPFS, while basic service parameters can be fetched from blockchain contracts); and
* connecting to different networks like local testnets, Kovan, Ropsten, and the Ethereum mainnet.
* Providing service development and deployment support. 

*Note*: It can create services by generating service metadata, Protobuf specs, and code templates provided by the SingularityNET Foundation. The CLI interacts with daemons for each service.
Security-wise, the CLI follows the same guidelines as provided by Ethereum for storing the private keys. When user identities are created and registered with a client, the CLI safely stores the details on the local machine and retrieves them only when it needs to interact with the blockchain.

<img src="/assets/img/how_cli_works.jpg" width="400">

The CLI supports connection to four critical components:
* User identity management. 
    
    Involves user registration, managing identities and sessions, and locking/unlocking accounts for transacting with the blockchain. This component is local to the machine where the CLI is run.
* Sidecar proxy. Communicates to servers hosting AI services. 
    
    For example, some of the operations which Sidecar proxy can performs along with the main component are listed as follows:
    *  Payment management
    * Rate Limiting
    * Consolidating the number of request
    * Validation
    * Updates the state
* Registry contract. Deals with organizations, members, services, types, and tags.
    
    For example, your organization contract is created on the Blockchain and the service contract is created in the bloackchain. These operation together is considered Registry contract.
* MPE contract. Sends and receives funds and manages other functions related to payment channels; e.g., closing a channel or extending its expiry date.

    For example, Multiparty Contract is smart piece of executable programme which does the following:
    * Create a Channel
    * Depositing or withdrawing money from and to the channel
    * Validation of channel
    * Claims on channel
    
This tool is used extensively in our tutorials and guides, to install it, follow the [setup guide](/docs/setup/requirements).

See the [CLI documentation](http://snet-cli-docs.singularitynet.io/) for full details of actions the tool allows.
