# module : sdk.utils.ipfs_utils

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/utils/ipfs_utils.py) to GitHub

## Entities:
1. [get_from_ipfs_and_checkhash](#function-get-from-ipfs-and-checkhash)
2. [get_ipfs_client](#function-get-ipfs-client)

## Function `get_from_ipfs_and_checkhash`

This function retrieves a file from IPFS and optionally verifies its integrity by 
checking the hash (if `validate` is True). If the hash does not match, it raises an exception. If `validate` is False, 
it simply retrieves the file data. 

##### args:

- `ipfs_client` (ipfshttpclient.client.Client): The IPFS client instance.
- `ipfs_hash_base58` (Any): The base58-encoded IPFS hash of the file.
- `validate` (bool): A boolean indicating whether to validate the hash (default is True).

##### returns:

- The contents of the file retrieved from IPFS. (bytes)

##### raises:

- `Exception`: If the hash validation fails or if the IPFS hash is not a file.

## Function `get_ipfs_client`

Returns an IPFS client instance based on the provided configuration.

##### args:

- config (Config): The configuration object containing the IPFS endpoint.

##### returns:

- An IPFS client instance connected to the specified endpoint. (ipfshttpclient.client.Client)

