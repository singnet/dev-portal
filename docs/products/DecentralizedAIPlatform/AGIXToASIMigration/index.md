# ASI (FET) Migration and Legacy AGIX Transition

The SingularityNET platform has transitioned to the new ASI (FET) token infrastructure. Legacy support for AGIX is deprecated. All new services use ASI (FET) by default, and existing AGIX services require a minor update to trigger automatic migration. 

Domains, contracts, and tools have been updated accordingly, with clear separation between ASI (FET) and Legacy AGIX environments.

## What's New

* **[Marketplace](https://marketplace.singularitynet.io) and [Publisher](https://publisher.singularitynet.io) migrated to ASI (FET)** token support.
* **All new services use ASI (FET)** by default.
* **Legacy AGIX support is deprecated**, but [still accessible](https://agix-marketplace.singularitynet.io).
* **New contract addresses** for [ASI (FET)](https://etherscan.io/address/0xaea46a60368a7bd060eec7df8cba43b7ef41ad85) token and [MPE](https://etherscan.io/address/0xdF8d4826E016aFA8803d94A716FEB70aD5D2B8Ac).
* [**New CLI/SDK releases**](#tools-and-packages) support both ASI (FET) and Legacy AGIX modes.
* [**Instructions provided**](#withdrawing-funds-from-agix-mpe) for migrating services and claiming funds.


This page provides a complete overview of the new infrastructure based on the ASI (FET) token and how to transition from deprecated AGIX services. It includes domain links, contract addresses, package updates, and instructions for developers working with the SingularityNET platform.

## Domains

Below are updated domains for the ASI (FET) and Legacy AGIX versions of Marketplace and Publisher.

### Marketplace

| Version         | Mainnet URL                                                                              | Testnet URL                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **ASI (FET)**   | [https://marketplace.singularitynet.io](https://marketplace.singularitynet.io)           | [https://testnet.marketplace.singularitynet.io](https://testnet.marketplace.singularitynet.io)           |
| **Legacy AGIX** | [https://agix-marketplace.singularitynet.io](https://agix-marketplace.singularitynet.io) | [https://testnet.agix-marketplace.singularitynet.io](https://testnet.agix-marketplace.singularitynet.io) |

### Publisher

| Network     | URL                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------ |
| **Mainnet** | [https://publisher.singularitynet.io](https://publisher.singularitynet.io)                 |
| **Testnet** | [https://testnet.publisher.singularitynet.io](https://testnet.publisher.singularitynet.io) |

#### ⚠️ Auto-Migration Notice

* If you had previously published services with AGIX token support, make a small change to any parameter in your service and re-publish. Your service will be **automatically migrated to ASI (FET)**.
* **All new services** are published using the ASI (FET) token by default.

## Smart Contracts

### Token Contracts

| Token     | Network | Address                                      |
| --------- | ------- | -------------------------------------------- |
| ASI (FET) | Mainnet | `0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85` |
| ASI (FET) | Testnet | `0x3A54192862D1c52C8175d4912f1f778d1E3C2449` |
| AGIX      | Mainnet | `0x5B7533812759B45C2B44C19e320ba2cD2681b542` |
| AGIX      | Testnet | `0xf703b9aB8931B6590CFc95183be4fEf278732016` |

### MultiPartyEscrow (MPE) Contracts

| Token     | Network | MPE Address                                  |
| --------- | ------- | -------------------------------------------- |
| ASI (FET) | Mainnet | `0xdF8d4826E016aFA8803d94A716FEB70aD5D2B8Ac` |
| ASI (FET) | Testnet | `0x042d31F61c598eADcAc729B845406514521db520` |
| AGIX      | Mainnet | `0x5e592F9b1d303183d963635f895f0f0C48284f4e` |
| AGIX      | Testnet | `0x7E0aF8988DF45B824b2E0e0A87c6196897744970` |

## Withdrawing Funds from AGIX MPE

You can withdraw remaining AGIX from open payment channels using:

```bash
snet account withdraw <AMOUNT> --multipartyescrow-at <AGIX_MPE_CONTRACT_ADDRESS>
```

Or via the [Legacy AGIX Marketplace](https://agix-marketplace.singularitynet.io/) under **Account** section.

### Registry Contract (not changed)

| Network     | Address                                      |
| ----------- | -------------------------------------------- |
| **Mainnet** | `0x247DEbEBB766E4fA99667265A158060018D5f4F8` |
| **Testnet** | `0x4DCc70c6FCE4064803f0ae0cE48497B3f7182e5D` |

> Registry contract remains the same. However, users **must migrate their services** from AGIX MPE to ASI (FET) MPE.

## Tools and Packages

### Daemon

* [Latest FET-compatible Daemon Release](https://github.com/singnet/snet-daemon/releases/latest)

Before migration:

```bash
snet treasurer claim-all --endpoint <DAEMON_ENDPOINT>
```

Use this to claim funds from all payment channels.

### CLI

* [Latest CLI Release](https://github.com/singnet/snet-cli/releases/latest)

By default, the CLI is configured to use the ASI (FET) token and MPE contracts. This ensures compatibility with the current version of the platform and all new services.

#### Using Legacy AGIX Contracts

If you need to continue working with services on the Legacy AGIX infrastructure, you must manually override the default configuration by specifying the Legacy AGIX contract addresses. This is especially relevant for backward compatibility or services that haven't yet been migrated.

```bash
snet set current_singularitynettoken_at <AGIX_TOKEN_CONTRACT>
snet set current_multipartyescrow_at <AGIX_MPE_CONTRACT>
```

### Python SDK Configuration

* [Latest Python SDK Release](https://github.com/singnet/snet-sdk-python/latest)

By default, the SDK will use ASI (FET) infrastructure unless otherwise specified. If you want to explicitly use Legacy AGIX, you need to provide the corresponding MPE and token contract addresses as shown below.

To use a specific MPE and token contract (for either ASI or AGIX):

```python
from snet import sdk

config = sdk.config.Config(
    private_key="YOUR_PRIVATE_KEY",
    eth_rpc_endpoint="https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
    concurrency=False,
    force_update=False,
    mpe_contract_address="AGIX_MPE_CONTRACT_ADDRESS",
    token_contract_address="AGIX_TOKEN_CONTRACT_ADDRESS"
)

snet_sdk = sdk.SnetSDK(config)
```

* To use **Legacy AGIX**, provide the `AGIX_MPE_CONTRACT_ADDRESS` and `AGIX_TOKEN_CONTRACT_ADDRESS` explicitly.
* If you do **not** specify these fields, the SDK will default to using the latest ASI (FET) contracts.

Replace the addresses depending on the desired token (ASI or AGIX).

## Summary

* [Marketplace](https://marketplace.singularitynet.io/) and [Publisher](https://publisher.singularitynet.io/) now support ASI (FET) with updated domains.
* Legacy AGIX contracts and flows remain available but are deprecated.
* Use CLI/SDK options to switch between tokens as needed.
* Migrate all services to ASI (FET) and withdraw AGIX funds via [CLI](https://github.com/singnet/snet-cli) or [AGIX Marketplace](https://agix-marketplace.singularitynet.io/).
* Dev Portal to be updated with clear segmentation and links.
