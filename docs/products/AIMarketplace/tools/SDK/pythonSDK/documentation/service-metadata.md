## module: sdk.metadata_provider.service_metadata

[Link](https://github.com/singnet/snet-sdk-python/blob/master/snet/sdk/metadata_provider/service_metadata.py) to GitHub

Entities:
1. [AssetType](#class-assettype)
   - [is_single_value](#is_single_value)
2. [MPEServiceMetadata](#class-mpeservicemetadata)
   - [\_\_init\_\_](#__init__)
   - [set_simple_field](#set_simple_field)
   - [set_fixed_price_in_cogs](set_fixed_price_in_cogs)
   - [set_method_price_in_cogs](set_method_price_in_cogs)
   - [add_group](#add_group)
   - [remove_group](#remove_group)
   - [get_tags](#get_tags)
   - [add_tag](#add_tag)
   - [remove_tag](#remove_tag)
   - [add_asset](#add_asset)
   - [remove_all_assets](#remove_all_assets)
   - [remove_asset](#remove_asset)
   - [add_endpoint_to_group](#add_endpoint_to_group)
   - [remove_all_endpoints_for_group](#remove_all_endpoints_for_group)
   - [is_group_name_exists](#is_group_name_exists)
   - [get_group_by_group_id](#get_group_by_group_id)
   - [set_free_calls_for_group](#set_free_calls_for_group)
   - [set_freecall_signer_address](#set_freecall_signer_address)
   - [get_json](#get_json)
   - [get_json_pretty](#get_json_pretty)
   - [set_from_json](#set_from_json)
   - [load](#load)
   - [save_pretty](#save_pretty)
   - [\_\_getitem\_\_](#__getitem__)
   - [\_\_contains\_\_](#__contains__)
   - [get_group_name_nonetrick](#get_group_name_nonetrick)
   - [get_group](#get_group)
   - [get_group_id_base64](#get_group_id_base64)
   - [get_group_id](#get_group_id)
   - [get_payment_address](#get_payment_address)
   - [add_daemon_address_to_group](#add_daemon_address_to_group)
   - [remove_all_daemon_addresses_for_group](#remove_all_daemon_addresses_for_group)
   - [get_all_endpoints_for_group](#get_all_endpoints_for_group)
   - [get_all_group_endpoints](#get_all_group_endpoints)
   - [get_all_endpoints_with_group_name](#get_all_endpoints_with_group_name)
   - [get_endpoints_for_group](#get_endpoints_for_group)
   - [add_contributor](#add_contributor)
   - [remove_contributor_by_email](#remove_contributor_by_email)
   - [group_init](#group_init)
   - [add_media](#add_media)
   - [remove_media](#remove_media)
   - [remove_all_media](#remove_all_media)
   - [swap_media_order](#swap_media_order)
   - [change_media_order](#change_media_order)
   - [_is_asset_type_exists](#_is_asset_type_exists)
   - [add_description](#add_description)
3. [load_mpe_service_metadata](#function-load_mpe_service_metadata)
4. [mpe_service_metadata_from_json](#function-mpe_service_metadata_from_json)

### Class `AssetType`

extends: `Enum`

is extended by: -

#### description

This is an `enum` that represents the type of asset in the service metadata.

#### members

- `HERO_IMAGE` (str): The hero image asset type. Equals to "hero_image".
- `IMAGES` (str): The images asset type. Equals to "images".
- `DOCUMENTATION` (str): The documentation asset type. Equals to "documentation".
- `TERMS_OF_USE` (str): The terms of use asset type. Equals to "terms_of_use".

#### methods

#### `is_single_value`

Static method. Checks if the asset type is a single value (`HERO_IMAGE`, `DOCUMENTATION` or `TERMS_OF_USE`).

###### args:

- `asset_type` (str): The asset type to check.

###### returns:

- `True` if the asset type is a single value, `False` otherwise. (bool)

### Class `MPEServiceMetadata`

extends: -

is extended by: -

#### description

This class represents the service metadata.

#### attributes

- `m` (dict): A dictionary that contains all the service metadata fields.

#### methods

#### `__init__`

Initializes a new instance of the class. Initializes the `m` dict with empty of default values.

###### returns:

- _None_

#### `set_simple_field`

Sets a new value for a specified field in the `m` dict. Supported fields are: `display_name`, `encoding`, 
`model_ipfs_hash`, `mpe_address`, `service_type`, `payment_expiration_threshold`, `service_description`. 
If the field is not supported, an exception is raised.

###### args:

- `f` (str): The field name to set.
- `v` (Any): The value to set.

###### returns:

- _None_

###### raises:

- `Exception`: If the field name is unknown.

#### `set_fixed_price_in_cogs`

Sets a new value for the `fixed_price` field in the specified payment group.

###### args:

- `group_name` (str): The name of the payment group.
- `price` (int): The new value for the `fixed_price` field.

###### returns:

- _None_

###### raises:

- `Exception`: If the payment group with the specified name is not found.

#### `set_method_price_in_cogs`

Sets the price for a specific method in a service within a payment group. It checks if the group exists, then updates 
the pricing details accordingly. If the pricing model or service does not exist, it creates a new one.

###### args:

- `group_name` (str): The name of the payment group.
- `package_name` (str): The name of the package.
- `service_name` (str): The name of the service.
- `method` (str): The name of the method.
- `price` (int): The new price for the method.

###### returns:

- _None_

###### raises:

- `Exception`: If the payment group with the specified name is not found.

#### `add_group`

Adds a new payment group to the `m` dict.

###### args:

- `group_name` (str): The name of the new payment group.

###### returns:

- _None_

###### raises:

- `Exception`: If the payment group with the specified name already exists.

#### `remove_group`

Removes a payment group from the `m` dict.

###### args:

- `group_name` (str): The name of the payment group to remove.

###### returns:

- _None_

#### `get_tags`

Returns the list of tags from the `m` dict. If the `tags` field does not exist, an empty list is returned.

###### returns:

- The list of tags. (list[str])

#### `add_tag`

Adds a new tag to the `tags` field in the `m` dict. If the tag already exists, it is not added again.

###### args:

- `tag_name` (str): The name of the new tag.

###### returns:

- _None_

#### `remove_tag`

Removes a tag from the `tags` field in the `m` dict. If the tag does not exist, nothing happens.

###### args:

- `tag_name` (str): The name of the tag to remove.

###### returns:

- _None_

#### `add_asset`

Adds a new asset to the `assets` field in the `m` dict. If the asset already exists, it is not added again.

###### args:

- `asset_ipfs_hash` (str): The IPFS hash of the asset.
- `asset_type` (str): The type of the asset.

###### returns:

- _None_

###### raises:

- `Exception`: If the asset type is not supported.

#### `remove_all_assets`

Removes all assets from the `assets` field in the `m` dict.

###### returns:

- _None_

#### `remove_asset`

Removes an asset from the `assets` field in the `m` dict. If the asset does not exist, nothing happens. 
If the asset type is not supported, an exception is raised.

###### args:

- `asste_type` (str): The type of the asset to remove.

###### returns:

- _None_

###### raises:

- `Exception`: If the asset type is not supported.

#### `add_endpoint_to_group`

Checks the endpoint is valid and adds it to the `endpoints` field of the specified payment group in the `m` dict. 
If the endpoint is not valid of if the group does not exist or if the endpoint is already present, an exception is 
raised.

###### args:

- `group_name` (str): The name of the payment group.
- `endpoint` (str): The new endpoint to add.

###### returns:

- _None_

###### raises:

- `Exception`: If the payment group with the specified name is not found, if the endpoint is not valid, or if the 
endpoint is already present.

#### `remove_all_endpoints_from_group`

Removes all endpoints from the `endpoints` field of the specified payment group in the `m` dict. If the group 
does not exist, an exception is raised.

###### args:

- `group_name` (str): The name of the payment group.

###### returns:

- _None_

###### raises:

- `Exception`: If the payment group with the specified name is not found.

#### `is_group_name_exists`

Checks if the payment group with the specified name exists in the `m` dict.

###### args:

- `group_name` (str): The name of the payment group.

###### returns:

- _True_ if the payment group exists, _False_ otherwise. (bool)

#### `get_group_by_group_id`

Returns group with given group id (returns _None_ if it doesn't exist).

###### args:

- `group_id` (str): The id of the payment group.

###### returns:

- The group with the given id. (dict[str, Any] | None)

#### `set_free_calls_for_group`

Sets the `free_calls` field of the specified payment group in the `m` dict, if the group exists.

###### args:

- `group_name` (str): The name of the payment group.
- `free_calls` (int): The new value for the `free_calls` field - amount of free calls.

###### returns:

- _None_

#### `set_freecall_signer_address`

Sets the `freecall_signer_address` field of the specified payment group in the `m` dict, if the group exists.

###### args:

- `group_name` (str): The name of the payment group.
- `freecall_signer_address` (str): The new value for the `freecall_signer_address` field.

###### returns:

- _None_

#### `get_json`

Returns the JSON representation of the `m` dict.

###### returns:

- The JSON representation of the `m` dict. (str)

#### `get_json_pretty`

Returns the pretty-printed JSON representation of the `m` dict.

###### returns:

- The pretty-printed JSON representation of the `m` dict. (str)

#### `set_from_json`

Sets the `m` dict from the service metadata JSON representation.

###### args:

- `j` (str): The service metadata JSON representation.

###### returns:

- _None_

#### `load`

Loads the service metadata from the specified file and sets it in the `m` dict.

###### args:

- `file_name` (str): The name of the file containing the service metadata.

###### returns:

- _None_

#### `save_pretty`

Saves the pretty-printed JSON representation of the `m` dict to the specified file.

###### args:

- `file_name` (str): The name of the file to save.

###### returns:

- _None_

#### `__getitem__`

Overrides the `__getitem__` Python special method. Returns the value associated with the given key from 
the `m` dict.

###### args:

- `key` (str): The name of the field.

###### returns:

- The value associated with the given key. (Any)

#### `__contains__`

Overrides the `__contains__` Python special method.

###### args:

- `key` (str): The name of the field.

###### returns:

- _True_ if the key is in the `m` dict, _False_ otherwise. (bool)

#### `get_group_name_nonetrick`

Returns a group name from metadata. If no group name is provided (group_name=None), it checks if there's only one 
group in the metadata and returns its name. If there are multiple groups, it raises an exception, requiring a 
specific group name to be provided. If a group name is provided, it simply returns that name.

###### args:

- `group_name` (str): The name of the payment group. Defaults to _None_.

###### returns:

- The name of the payment group. (str)

###### raises:

- `Exception`: If there are no groups in the metadata or if there are multiple groups in the metadata and no 
group name is provided.

#### `get_group`

Retrieves a group from metadata by its name. If no name is provided, it uses `get_group_name_nonetrick` to determine 
the name. Searches for a matching group in the metadata and returns it. If no matching group is found, 
raises an exception.

###### args:

- `group_name` (str): The name of the payment group. Defaults to _None_.

###### returns:

- The payment group. (dict[str, Any])

###### raises:

- `Exception`: If no group with the specified name is found in the `m` dict.

#### `get_group_id_base64`

Returns the group id base64 encoded.

###### args:

- `group_name` (str): The name of the payment group. Defaults to _None_.

###### returns:

- The group id base64 encoded. (str)

#### `get_group_id`

Returns the group id as bytes from `m` dict. 

###### args:

- `group_name` (str): The name of the payment group. Defaults to _None_.

###### returns:

- The group id. (bytes)

#### `get_payment_address`

Returns the payment address of the group from `m` dict.

###### args:

- `group_name` (str): The name of the payment group. Defaults to _None_.

###### returns:

- The payment address. (str)

#### `add_daemon_address_to_group`

Adds a daemon address to the `daemon_addresses` field of the specified payment group in the `m` dict.

###### args:

- `group_name` (str): The name of the payment group.
- `daemon_address` (str): The new daemon address to add.

###### returns:

- _None_

###### raises:

- `Exception`: If the payment group with the specified name does not exist.

#### `remove_all_daemon_addresses_for_group`

Removes all daemon addresses from the `daemon_addresses` field of the specified payment group in the `m` dict.

###### args:

- `group_name` (str): The name of the payment group.

###### returns:

- _None_

###### raises:

- `Exception`: If the payment group with the specified name does not exist.

#### `get_all_endpoints_for_group`

Returns all endpoints from the `endpoints` field of the specified payment group in the `m` dict.

###### args:

- `group_name` (str): The name of the payment group.

###### returns:

- The list of endpoints. (list[str])

#### `get_all_group_endpoints`

Returns all endpoints from the `endpoints` of all payment groups in the `m` dict.

###### returns:

- The list of endpoints. (list[str])

#### `get_all_endpoints_with_group_name`

Returns all endpoints from the `endpoints` for all payment groups in the `m` dict as dict with the group name as key
and the list of endpoints as value.

###### returns:

- Group names with lists of endpoints. (dict[str, list[str]])

#### `get_endpoints_for_group`

Returns a list of endpoints that belong to a specific payment group. If no group name is provided, it will use 
the default group name (if only one group exists).

###### args:

- `group_name` (str): The name of the payment group. Defaults to _None_.

###### returns:

- The list of endpoints. (list[str])

#### `add_contributor`

Adds a contributor to the `contributors` field of the `m` dict.

###### args:

- `name` (str): The name of the contributor.
- `email_id` (str): The email id of the contributor.

###### returns:

- _None_

#### `remove_contributor_by_email`

Removes contributors with the specified email from the `contributors` field of the `m` dict.

###### args:

- `email_id` (str): The email id of the contributor.

###### returns:

- _None_

#### `group_init`

Initializes a new payment group in the `m` dict. Prompts the user to enter several fields, such as fixed price, 
endpoints, etc.

###### args:

- `group_name` (str): The name of the payment group.

###### returns:

- _None_

###### raises:

- `Exception`: If user enters same endpoints.
- `ValueError`: If user enters non-integer fixed price.

#### `add_media`

Adds a new media to the `media` field of the `m` dict.

###### args:

- `url` (str): The url of the media.
- `media_type` (str): The type of the media.
- `hero_img` (bool): Whether the media is a hero image. Defaults to _False_.

###### returns:

- _None_

#### `remove_media`

Removes an individual media from the `media` field of the `m` dict using unique order key.

###### args:

- `order` (int): The order of the media.

###### returns:

- _None_

###### raises:

- `Exception`: If the media with the specified order does not exist.

#### `remove_all_media`

Removes all individual media from the `media` field of the `m` dict.

###### returns:

- _None_

#### `swap_media_order`

Swap orders of two different media given their individual orders.

###### args:

- `move_from` (int): The order of the first media to be moved.
- `move_to` (int): The order of the second media to be moved.

###### returns:

- _None_

###### raises:

- `Exception`: If at least one of the media with the specified orders does not exist.

#### `change_media_order`

Mini REPL to change order of all individual media

###### returns:

- _None_

#### `_is_asset_type_exists`

Returns whether the asset type exists in the media field of the `m` dict.

###### returns:

- _True_ if the asset type exists, _False_ otherwise. (bool)

#### `add_description`

Adds a new description to the `description` field of the `m` dict. Prompts the user to enter user guide url,
service long description and service short description.

###### returns:

- _None_

### Function `load_mpe_service_metadata`

Loads the service metadata from the JSON file to `MPEServiceMetadata` object.

###### args:

- `f` (str): The name of the file containing the service metadata as JSON.

###### returns:

- The service metadata. (MPEServiceMetadata)

### Function `mpe_service_metadata_from_json`

Loads the service metadata from the JSON string to `MPEServiceMetadata` object.

###### args:

- `j` (str): The service metadata JSON representation.

###### returns:

- The service metadata. (MPEServiceMetadata)

