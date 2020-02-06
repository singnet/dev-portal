---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Consumers

# Micro navigation
micro_nav: true

---

## Introduction to MPE

#Common errors returned by the Daemon

###Payment signer is not valid

Check if the port number of your daemon matches exactly to what was deployed on Service metadata.

For Ropsten make sure you have the below config 
```
"free_call_signer_address": "0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F",
"metering_end_point": "https://ropsten-marketplace.singularitynet.io/metering",
```

For mainnet make sure you have the below config 
```
"free_call_signer_address":"0x3Bb9b2499c283cec176e7C707Ecb495B7a961ebf",
"metering_end_point": "https://mainnet-marketplace.singularitynet.io/metering",
```

### Free call limit has been exceeded.
You have exceeded the number of permitted free calls. So, calls can now be done only using the paid mode alone 

- End point deployed from Service metadata should be assigned to the same port / domain the daemon is starting. 

### Rate limiting, too many requests to handle”
The number of request has increased along with the rate limiting, either retry again later or configure your daemon for [rate limiting](https://github.com/singnet/snet-daemon/tree/master/ratelimit) 

### Unexpected payment type”
The supported payment types are free-call / escrow