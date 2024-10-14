## module: sdk.utils.ipfs_utils

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/utils/ipfs_utils.py) to GitHub

Entities:
1. [get_from_ipfs_and_checkhash](#function-get-from-ipfs-and-checkhash)
2. [bytesuri_to_hash](#function-bytesuri-to-hash)
3. [safe_extract_proto_from_ipfs](#function-safe-extract-proto-from-ipfs)
4. [get_ipfs_client](#function-get-ipfs-client)


### Function `get_from_ipfs_and_checkhash`

This function retrieves a file from IPFS and optionally verifies its integrity by 
checking the hash. If `validate` is True, it manually parses the IPFS block, extracts the file data, and verifies 
the hash using a multihash object. If the hash does not match, it raises an exception. If `validate` is False, 
it simply retrieves the file data. 

###### args:

- `ipfs_client` (ipfshttpclient.client.Client): The IPFS client instance.
- `ipfs_hash_base58` (Any): The base58-encoded IPFS hash of the file.
- `validate` (bool): A boolean indicating whether to validate the hash (default is True).

###### returns:

- The contents of the file retrieved from IPFS. (bytes)

###### raises:

- `Exception`: If the hash validation fails or if the IPFS hash is not a file.

### Function `bytesuri_to_hash`

Converts a bytes URI to a hash.

###### args:

- `s` (bytes): The bytes URI to convert.

###### returns:

- The hash extracted from the bytes URI. (str)

###### raises:

- `Exception`: If the input is not an IPFS URI.

### Function `safe_extract_proto_from_ipfs`

This function safely extracts a tar file from IPFS to a specified directory. It checks for potential security risks by:
- Ensuring the tar file does not contain directories
- Ensuring all contents are files
- Removing any existing files with the same name before extraction

If any of these checks fail, it raises an exception. Otherwise, it extracts the tar file to the specified directory.

###### args:

- `ipfs_client` (ipfshttpclient.client.Client): The IPFS client instance.
- `ipfs_hash` (str): The IPFS hash of the tar file to extract.
- `protodir` (str): The directory to extract the tar file to.

###### returns:

- _None_

###### raises:

- `Exception`: If the tarball contains directories or non-file entries.

### Function `get_ipfs_client`

Returns an IPFS client instance based on the provided configuration.

###### args:

- config (Config): The configuration object containing the IPFS endpoint.

###### returns:

- An IPFS client instance connected to the specified endpoint. (ipfshttpclient.client.Client)

