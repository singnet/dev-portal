> NOTE: You can find the script files for this example on Github [here](https://github.com/singnet/dev-portal/tree/master/src/example2)

# DESCRIPTION

The second example of running and using a JSON-RPC service:
(https://github.com/singnet/example-service)

* [install_and_start.sh](https://github.com/singnet/dev-portal/tree/master/src/example1/install_and_start.sh) - (exactly the
same as in the first example) install and setup everything and start local network
and IPFS
* run_service.sh - register and start simple service (one payment
group one endpoint)
* run_client.sh  - make a call to the service
* [run_treasurer.sh](https://github.com/singnet/dev-portal/tree/master/src/example1/run_treasurer.sh) - (exactly the
same as in the first example) run treasurer server in order to see list
of claimed channels, and claim your channels

Test should be run on clean environment in the given order.
