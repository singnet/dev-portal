Please see:

-   [snet-cli repo documentation](https://github.com/singnet/snet-cli)
-   [snet-daemon repo documentation](https://github.com/singnet/snet-daemon/)

## Publish service to the Registry

```sh
snet identity publisher
snet service metadata_init . ProcessService $PUBLISHER_ADDR --encoding json --service_type process
snet service metadata_set_fixed_price 3
snet service metadata_add_endpoints http://127.0.0.1:8080
cat service_metadata.json
snet service publish ExampleOrganization ProcessService --yes
```

## Start daemon

```sh
cat snetd.config.json
screen -d -m snetd-linux-amd64
```

## Call service

```sh
snet identity caller
snet client open_init_channel_registry ExampleOrganization ProcessService 50 57600 -y
snet client call 1 3 localhost:8080 echo '{"message": "hello"}'
```

## Stop service

```sh
stop_service.sh
```