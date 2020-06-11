---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Micro navigation
micro_nav: true

---

## State Service Calls 

As the name suggests, this call will be used by the client to determine the next amount to sign to make a service call. 

Daemon keeps track of the off chain state of the channel
Details involve Channel Id Nonce,Amount signed , Signature and the nonce of the channel 
, and in order to sign the amount for the next call, the client needs to know the amount it had last signed (X), the new call will be signed with an amount X + P , where X is the last signed amount and P is the price 

Daemon also sends back the last signed signature of the old nonce ( in case a claim is in progress or a claim was made)


![Stateservice](/assets/img/daemon/stateservice.png)


## Pay Per use calls 
The client signs in for the next cumulative amount ( i.e X+P), where X is the amount last amount signed on the given Channel Id and Nonce
![Pay per use](/assets/img/daemon/payperusecalll.png)


## Control Service Calls 

### List-unclaimed requests


### Start-claim request/requests

### List-in-progress

## Concurrent calls 


