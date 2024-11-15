# Daemon errors

The errors described here are most likely due to incorrect configuration of the daemon or service. Usually they need to be corrected by the service provider.

## Desciptions of codes

### 1

**Name: ServiceUnavailable** \
Purpose: This error means that the daemon could not access the service at the specified address.\
Solution: Check the daemon config param `passthrough_endpoint` and whether your service is available at the specified endopint.

### 2

**Name: InvalidMetadata** \
Purpose: Invalid service or organization metadata in ipfs or filecoin.\
Solution: Recheck and validate your service & organization metadata. You can use cli commands:
:::code-group

```sh [Terminal]
snet service validate-metadata --metadata-file service_metadata.json
```
:::

### 3

**Name: InvalidProto** \
Purpose: This error appears when a proto file was incorrectly written for http services and daemon can't marshal or unmarshal proto messages.\
Solution: Fix protofile and update it with cli or publisher.

### 4

**Name: HTTPRequestBuildError** \
Purpose: Can't create HTTP request to the service.\
Solution: Check the daemon config params: `passthrough_endpoint` & `service_credentials`.

### 5

**Name: InvalidServiceCredentials** \
Purpose: Invalid service credentials param
Solution: Recheck daemon config.
Example of valid service credentials in daemon config:

```json
"service_credentials": [
    {
      "key": "X-Custom-Header",
      "value": "example-value",
      "location": "header"
    }
  ],
```

### 6

**Name: InvalidConfig** \
Purpose: Invalid config
Solution: Recheck your config or generate a new one:
:::code-group

```sh [Terminal]
snetd-linux-amd64-v5.1.5 init
```

### 7

**Name: ReceiveMsgError** \
Purpose: This error can occur for several reasons: internal bugs, incorrect encoding in metadata, network problems.
Solution: If you are a customer, try the request again.
If you are the creator of the service, try changing the encoding to `proto` in metadata and check is your service available.