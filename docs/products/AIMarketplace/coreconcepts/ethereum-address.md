# Ethereum Address

An Ethereum address is a 64 character hex string generated subject to various rules defined in the <a href="https://ethereum.github.io/yellowpaper/paper.pdf" target="_blank">Ethereum yellow paper</a>. It represents a unique account on the Ethereum network and has an associated private key. This private key is requried to prove ownership of the address and has to be kept safe.


## Ethereum address as an account 
It is possible to create an ethereum address programatically. Once created this account can be used to send and receive ETH as well as ERC 20 tokens. 

The address is composed of the prefix "0x", a common identifier for hexadecimal, concatenated with the rightmost 20 bytes of the Keccak-256 hash (big endian) of the ECDSA public key (the curve used is the so-called secp256k1, the same as Bitcoin). In hexadecimal, 2 digits represent a byte, meaning addresses contain 40 hexadecimal digits. An example of an Ethereum address is 0xb794f5ea0ba39494ce839613fffba74279579268. Contract addresses are in the same format, however, they are determined by sender and creation transaction nonce.[36] User accounts are indistinguishable from contract accounts given only an address for each and no blockchain data.

The ethereum account is also referred to as a wallet. Common applications to manage the wallet are
* <a href="https://metamask.io/" target="_blank">Metamask</a> - It is a crypto wallet - available as a browser extension - that can create and manage Ethereum accounts. Metamask is the primary way to interact with DApps on the SingualrityNet platform
* <b>Hardware wallet</b> - It is a crypto wallet in the form of specialized hardware to safely store the private key associated with the address. 

## Ethereum address as a contract
The smart contracts deployed on the Ethereum blockchain are also identified by an address. There is no private key associated with this address, rather its based on the code of the smart contract itself.
The contact's address is deterministically computed from the address of its creator (sender) and how many transactions the creator has sent (nonce). The sender and nonce are RLP encoded and then hashed with Keccak-256.
This address is used to interact with the contract.