# Contract

```sh
usage: snet contract [-h] COMMAND ...
```

## Commands

## MultiPartyEscrow

MultiPartyEscrow contract

```sh
snet contract MultiPartyEscrow [-h]
                               [--at ADDRESS] FUNCTION ...
```

#### contract identity arguments

`--at`

    

\> contract address

#### MultiPartyEscrow functions

`FUNCTION`

    

Possible choices: balances, channels, nextChannelId, token, usedMessages,
deposit, withdraw, transfer, openChannel, openChannelByThirdParty,
depositAndOpenChannel, multiChannelClaim, channelClaim, channelExtend,
channelAddFunds, channelExtendAndAddFunds, channelClaimTimeout

#### Sub-commands

##### balances

balances function

```sh
snet contract MultiPartyEscrow balances [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] ADDRESS
```

###### Positional Arguments

`ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### channels

channels function

```sh
snet contract MultiPartyEscrow channels [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] UINT256
```

###### Positional Arguments

`UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### nextChannelId

nextChannelId function

```sh
snet contract MultiPartyEscrow nextChannelId [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### token

token function

```sh
snet contract MultiPartyEscrow token [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### usedMessages

usedMessages function

```sh
snet contract MultiPartyEscrow usedMessages [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] BYTES32
```

###### Positional Arguments

`BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### deposit

deposit function

```sh
snet contract MultiPartyEscrow deposit [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] value_UINT256
```

###### Positional Arguments

`value_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### withdraw

withdraw function

```sh
snet contract MultiPartyEscrow withdraw [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] value_UINT256
```

###### Positional Arguments

`value_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### transfer

transfer function

```sh
snet contract MultiPartyEscrow transfer [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] receiver_ADDRESS value_UINT256
```

###### Positional Arguments

`receiver_ADDRESS`

    
`value_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### openChannel

openChannel function

```sh
snet contract MultiPartyEscrow openChannel [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] signer_ADDRESS recipient_ADDRESS groupId_BYTES32 value_UINT256 expiration_UINT256
```

###### Positional Arguments

`signer_ADDRESS`

    
`recipient_ADDRESS`

    
`groupId_BYTES32`

    
`value_UINT256`

    
`expiration_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### openChannelByThirdParty

openChannelByThirdParty function

```sh
snet contract MultiPartyEscrow openChannelByThirdParty [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] sender_ADDRESS signer_ADDRESS recipient_ADDRESS groupId_BYTES32 value_UINT256 expiration_UINT256 messageNonce_UINT256 v_UINT8 r_BYTES32 s_BYTES32
```

###### Positional Arguments

`sender_ADDRESS`

    
`signer_ADDRESS`

    
`recipient_ADDRESS`

    
`groupId_BYTES32`

    
`value_UINT256`

    
`expiration_UINT256`

    
`messageNonce_UINT256`

    
`v_UINT8`

    
`r_BYTES32`

    
`s_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### depositAndOpenChannel

depositAndOpenChannel function

```sh
snet contract MultiPartyEscrow depositAndOpenChannel [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] signer_ADDRESS recipient_ADDRESS groupId_BYTES32 value_UINT256 expiration_UINT256
```

###### Positional Arguments

`signer_ADDRESS`

    
`recipient_ADDRESS`

    
`groupId_BYTES32`

    
`value_UINT256`

    
`expiration_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### multiChannelClaim

multiChannelClaim function

```sh
snet contract MultiPartyEscrow multiChannelClaim [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] channelIds_UINT256 actualAmounts_UINT256 plannedAmounts_UINT256 isSendbacks_BOOL v_UINT8 r_BYTES32 s_BYTES32
```

###### Positional Arguments

`channelIds_UINT256[]`

    
`actualAmounts_UINT256[]`

    
`plannedAmounts_UINT256[]`

    
`isSendbacks_BOOL[]`

    
`v_UINT8[]`

    
`r_BYTES32[]`

    
`s_BYTES32[]`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### channelClaim

channelClaim function

```sh
snet contract MultiPartyEscrow channelClaim [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] channelId_UINT256 actualAmount_UINT256 plannedAmount_UINT256 v_UINT8 r_BYTES32 s_BYTES32 isSendback_BOOL
```

###### Positional Arguments

`channelId_UINT256`

    
`actualAmount_UINT256`

    
`plannedAmount_UINT256`

    
`v_UINT8`

    
`r_BYTES32`

    
`s_BYTES32`

    
`isSendback_BOOL`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### channelExtend

channelExtend function

```sh
snet contract MultiPartyEscrow channelExtend [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] channelId_UINT256 newExpiration_UINT256
```

###### Positional Arguments

`channelId_UINT256`

    
`newExpiration_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### channelAddFunds

channelAddFunds function

```sh
snet contract MultiPartyEscrow channelAddFunds [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] channelId_UINT256 amount_UINT256
```

###### Positional Arguments

`channelId_UINT256`

    
`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### channelExtendAndAddFunds

channelExtendAndAddFunds function

```sh
snet contract MultiPartyEscrow channelExtendAndAddFunds [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] channelId_UINT256 newExpiration_UINT256 amount_UINT256
```

###### Positional Arguments

`channelId_UINT256`

    
`newExpiration_UINT256`

    
`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### channelClaimTimeout

channelClaimTimeout function

```sh
snet contract MultiPartyEscrow channelClaimTimeout [-h]
                               [--transact]
                               [--wallet-index WALLET_INDEX]
                               [--yes]
                               [--quiet | --verbose] channelId_UINT256
```

###### Positional Arguments

`channelId_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## Registry

Registry contract

```sh
snet contract Registry [-h]
                       [--at ADDRESS] FUNCTION ...
```

#### contract identity arguments

`--at`

    

\> contract address

#### Registry functions

`FUNCTION`

    

Possible choices: supportsInterface, createOrganization,
changeOrganizationOwner, changeOrganizationMetadataURI,
addOrganizationMembers, removeOrganizationMembers, deleteOrganization,
createServiceRegistration, updateServiceRegistration,
deleteServiceRegistration, listOrganizations, getOrganizationById,
listServicesForOrganization, getServiceRegistrationById

#### Sub-commands

##### supportsInterface

supportsInterface function

```sh
snet contract Registry supportsInterface [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] interfaceId_BYTES4
```

###### Positional Arguments

`interfaceId_BYTES4`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### createOrganization

createOrganization function

```sh
snet contract Registry createOrganization [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 orgMetadataURI_BYTES members_ADDRESS
```

###### Positional Arguments

`orgId_BYTES32`

    
`orgMetadataURI_BYTES`

    
`members_ADDRESS[]`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### changeOrganizationOwner

changeOrganizationOwner function

```sh
snet contract Registry changeOrganizationOwner [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 newOwner_ADDRESS
```

###### Positional Arguments

`orgId_BYTES32`

    
`newOwner_ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### changeOrganizationMetadataURI

changeOrganizationMetadataURI function

```sh
snet contract Registry changeOrganizationMetadataURI [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 orgMetadataURI_BYTES
```

###### Positional Arguments

`orgId_BYTES32`

    
`orgMetadataURI_BYTES`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### addOrganizationMembers

addOrganizationMembers function

```sh
snet contract Registry addOrganizationMembers [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 newMembers_ADDRESS
```

###### Positional Arguments

`orgId_BYTES32`

    
`newMembers_ADDRESS[]`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### removeOrganizationMembers

removeOrganizationMembers function

```sh
snet contract Registry removeOrganizationMembers [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 existingMembers_ADDRESS
```

###### Positional Arguments

`orgId_BYTES32`

    
`existingMembers_ADDRESS[]`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### deleteOrganization

deleteOrganization function

```sh
snet contract Registry deleteOrganization [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32
```

###### Positional Arguments

`orgId_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### createServiceRegistration

createServiceRegistration function

```sh
snet contract Registry createServiceRegistration [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 serviceId_BYTES32 metadataURI_BYTES
```

###### Positional Arguments

`orgId_BYTES32`

    
`serviceId_BYTES32`

    
`metadataURI_BYTES`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### updateServiceRegistration

updateServiceRegistration function

```sh
snet contract Registry updateServiceRegistration [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 serviceId_BYTES32 metadataURI_BYTES
```

###### Positional Arguments

`orgId_BYTES32`

    
`serviceId_BYTES32`

    
`metadataURI_BYTES`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### deleteServiceRegistration

deleteServiceRegistration function

```sh
snet contract Registry deleteServiceRegistration [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 serviceId_BYTES32
```

###### Positional Arguments

`orgId_BYTES32`

    
`serviceId_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### listOrganizations

listOrganizations function

```sh
snet contract Registry listOrganizations [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### getOrganizationById

getOrganizationById function

```sh
snet contract Registry getOrganizationById [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32
```

###### Positional Arguments

`orgId_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### listServicesForOrganization

listServicesForOrganization function

```sh
snet contract Registry listServicesForOrganization [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32
```

###### Positional Arguments

`orgId_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### getServiceRegistrationById

getServiceRegistrationById function

```sh
snet contract Registry getServiceRegistrationById [-h]
                       [--transact]
                       [--wallet-index WALLET_INDEX]
                       [--yes]
                       [--quiet | --verbose] orgId_BYTES32 serviceId_BYTES32
```

###### Positional Arguments

`orgId_BYTES32`

    
`serviceId_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

## SingularityNetToken

SingularityNetToken contract

```sh
snet contract SingularityNetToken [-h]
                                  [--at ADDRESS] FUNCTION ...
```

#### contract identity arguments

`--at`

    

\> contract address

#### SingularityNetToken functions

`FUNCTION`

    

Possible choices: DEFAULT_ADMIN_ROLE, MINTER_ROLE, PAUSER_ROLE, allowance,
approve, balanceOf, burn, burnFrom, decimals, decreaseAllowance, getRoleAdmin,
getRoleMember, getRoleMemberCount, grantRole, hasRole, increaseAllowance,
name, paused, renounceRole, revokeRole, symbol, totalSupply, transfer,
transferFrom, mint, pause, unpause

#### Sub-commands

##### DEFAULT_ADMIN_ROLE

DEFAULT_ADMIN_ROLE function

```sh
snet contract SingularityNetToken DEFAULT_ADMIN_ROLE [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### MINTER_ROLE

MINTER_ROLE function

```sh
snet contract SingularityNetToken MINTER_ROLE [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### PAUSER_ROLE

PAUSER_ROLE function

```sh
snet contract SingularityNetToken PAUSER_ROLE [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### allowance

allowance function

```sh
snet contract SingularityNetToken allowance [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] owner_ADDRESS spender_ADDRESS
```

###### Positional Arguments

`owner_ADDRESS`

    
`spender_ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### approve

approve function

```sh
snet contract SingularityNetToken approve [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] spender_ADDRESS amount_UINT256
```

###### Positional Arguments

`spender_ADDRESS`

    
`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### balanceOf

balanceOf function

```sh
snet contract SingularityNetToken balanceOf [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] account_ADDRESS
```

###### Positional Arguments

`account_ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### burn

burn function

```sh
snet contract SingularityNetToken burn [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] amount_UINT256
```

###### Positional Arguments

`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### burnFrom

burnFrom function

```sh
snet contract SingularityNetToken burnFrom [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] account_ADDRESS amount_UINT256
```

###### Positional Arguments

`account_ADDRESS`

    
`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### decimals

decimals function

```sh
snet contract SingularityNetToken decimals [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### decreaseAllowance

decreaseAllowance function

```sh
snet contract SingularityNetToken decreaseAllowance [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] spender_ADDRESS subtractedValue_UINT256
```

###### Positional Arguments

`spender_ADDRESS`

    
`subtractedValue_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### getRoleAdmin

getRoleAdmin function

```sh
snet contract SingularityNetToken getRoleAdmin [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] role_BYTES32
```

###### Positional Arguments

`role_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### getRoleMember

getRoleMember function

```sh
snet contract SingularityNetToken getRoleMember [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] role_BYTES32 index_UINT256
```

###### Positional Arguments

`role_BYTES32`

    
`index_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### getRoleMemberCount

getRoleMemberCount function

```sh
snet contract SingularityNetToken getRoleMemberCount [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] role_BYTES32
```

###### Positional Arguments

`role_BYTES32`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### grantRole

grantRole function

```sh
snet contract SingularityNetToken grantRole [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] role_BYTES32 account_ADDRESS
```

###### Positional Arguments

`role_BYTES32`

    
`account_ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### hasRole

hasRole function

```sh
snet contract SingularityNetToken hasRole [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] role_BYTES32 account_ADDRESS
```

###### Positional Arguments

`role_BYTES32`

    
`account_ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### increaseAllowance

increaseAllowance function

```sh
snet contract SingularityNetToken increaseAllowance [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] spender_ADDRESS addedValue_UINT256
```

###### Positional Arguments

`spender_ADDRESS`

    
`addedValue_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### name

name function

```sh
snet contract SingularityNetToken name [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### paused

paused function

```sh
snet contract SingularityNetToken paused [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### renounceRole

renounceRole function

```sh
snet contract SingularityNetToken renounceRole [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] role_BYTES32 account_ADDRESS
```

###### Positional Arguments

`role_BYTES32`

    
`account_ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### revokeRole

revokeRole function

```sh
snet contract SingularityNetToken revokeRole [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] role_BYTES32 account_ADDRESS
```

###### Positional Arguments

`role_BYTES32`

    
`account_ADDRESS`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### symbol

symbol function

```sh
snet contract SingularityNetToken symbol [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### totalSupply

totalSupply function

```sh
snet contract SingularityNetToken totalSupply [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### transfer

transfer function

```sh
snet contract SingularityNetToken transfer [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] recipient_ADDRESS amount_UINT256
```

###### Positional Arguments

`recipient_ADDRESS`

    
`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### transferFrom

transferFrom function

```sh
snet contract SingularityNetToken transferFrom [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] sender_ADDRESS recipient_ADDRESS amount_UINT256
```

###### Positional Arguments

`sender_ADDRESS`

    
`recipient_ADDRESS`

    
`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### mint

mint function

```sh
snet contract SingularityNetToken mint [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose] to_ADDRESS amount_UINT256
```

###### Positional Arguments

`to_ADDRESS`

    
`amount_UINT256`

    

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### pause

pause function

```sh
snet contract SingularityNetToken pause [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

##### unpause

unpause function

```sh
snet contract SingularityNetToken unpause [-h]
                                  [--transact]
                                  [--wallet-index WALLET_INDEX]
                                  [--yes]
                                  [--quiet | --verbose]
```

###### Named Arguments

`--transact`

    

Invoke contract function as transaction

Default: `'call'`

###### transaction arguments

`--wallet-index`

    

Wallet index of account to use for signing (defaults to
session.identity.default_wallet_index)

`--yes, -y`

    

Skip interactive confirmation of transaction payload

Default: `False`

`--quiet, -q`

    

Quiet transaction printing

Default: `False`

`--verbose, -v`

    

Verbose transaction printing

Default: `False`

