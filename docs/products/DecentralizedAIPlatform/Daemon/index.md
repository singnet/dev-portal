# What is Daemon?

A daemon is an adapter between an AI service and a client. The main task of the daemon is to track service calls, calculate the funds spent and redirect the call to the AI service. The daemon is able to access services using different protocols, depending on the service type. The daemon also stores the number of free calls spent. The daemon is the entry point of a request to the service, so it must be launched at a public address.

![Scheme](/assets/images/products/AIMarketplace/daemon/daemon_base.webp)

If you want to host your service, then you need to start and configure the daemon. Learn more about the setup [here](/docs/products/DecentralizedAIPlatform/Daemon/daemon-setup/).

if you want to learn more about architecture, then go to [this](/docs/products/DecentralizedAIPlatform/Daemon/daemon-architecture/) article.