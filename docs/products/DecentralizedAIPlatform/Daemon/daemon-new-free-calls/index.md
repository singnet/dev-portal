# Major Upgrade to Free Calls: Decentralized, Secure, and Flexible

We've released a major redesign of the **Free Call** mechanism used in the SingularityNET Platform.
This update brings better **security**, **provider-side control**, and **flexibility** — enabling both **Web2 and Web3** integrations.

## What's New?

### Key Architectural Changes

The following architectural changes make Free Calls more robust and decentralized.
Each service daemon is now responsible for managing and validating tokens, allowing full control over access logic and abuse protection.

## ✅ 1. Token generation is now fully decentralized

Previously, Free Call tokens were **issued and signed centrally** by the marketplace backend.
This made services dependent on the centralized infrastructure and introduced a trust assumption.

**Now**, tokens are **generated and signed by each service daemon individually**, using its own private key — one known only to the service provider.

* The **private key** used to sign Free Call tokens is configured locally via:

  ```json
  "private_key_for_free_calls": "<hex_key>"
  ```

* The **corresponding public key/address** is published in the service metadata,
  so clients and daemons can verify the authenticity of the token without any third party.

This change enables full **trustless validation** of tokens.

## ✅ 2. Balance checks to prevent abuse

To prevent abuse (e.g. using Free Calls with empty wallets), the daemon now performs a **minimum balance check** before allowing free calls.

```json
"min_balance_for_free_call": "1"
```

> This ensures that free calls are only available to legitimate users, not bots or throwaway wallets.

## ✅ 3. Custom token expiration (TTL)

Previously, all tokens had a fixed lifetime.
Now you can specify the expiration in blocks during the token request:

```protobuf
uint64 token_lifetime_in_blocks = 5;
```

This provides flexibility for session-style use cases and custom expiration strategies.

## ✅ 4. Per-address quotas

You can override global free call limits and define **custom limits for individual addresses**:

```json
"free_calls_per_address": {
  "0xabc...": 500,
  "0xdef...": 100
}
```

This enables special treatment for power users, testers, partners, or known actors.

## ✅ 5. Trusted signer support (optional Web2 backend access)

In addition to Web3 users signing requests with their own keys, service providers **can** allow **trusted backend signers** to request tokens **on behalf of users** — useful for Web2 integrations.

These are public addresses of backend systems that are allowed to bypass Web3 signatures and directly request free calls.

## Free Calls — Secure Execution Flow

Free Calls allow users to invoke services without paying per call, while ensuring security and abuse protection.
Here’s how it works after the redesign.

## Step 1. Requesting a Free Call Token

A client first requests a token from the service daemon by sending:

* **User address**
* **Signature** over a challenge message (used to prove ownership of the address)
* **Current block number**
* *(Optionally)* a **token lifetime** in blocks

## Step 2. Token Generation by the Daemon

The daemon generates the token with the following fields:

```plaintext
token_payload = [organization_id, daemon_group_name, user_or_backend_address, user_id, expiration_block]
```

It then signs this payload using its **private key**, and appends the expiration block to the signature:

```plaintext
final_token = SIGNATURE + expiration_block
```

* The **signature** proves authenticity (only the daemon knows the private key).
* The **expiration block** limits the token's lifespan.

This token is returned to the client.

## Step 3. Client Signs the Request with the Token

To perform the free call, the **client signs a message** that includes the token.
This ensures the token **can only be used by its owner**, and that it **hasn't been tampered with**.

The message the client signs is composed of:

```plaintext
[
  "__prefix_free_trial", // static prefix
  user_address,          // caller address
  user_id,               // optional
  organization_id,       // from metadata
  service_id,            // from metadata
  daemon_group_id,       // from metadata
  current_block_number,  // anti-replay mechanism
  free_call_token        // full token received from daemon
]
```

* The signature is included as `snet-payment-channel-signature-bin` in gRPC metadata.
* The original token is included as `snet-free-call-auth-token-bin`.

This signature **proves** that:

* The caller controls the address to which the token was issued.
* The request is recent (validated using current block number).

## Step 4. Daemon Verifies the Request

The daemon performs the following checks before allowing a Free Call:

| **Check**            | **Purpose**                                    |
| -------------------- | ---------------------------------------------- |
| **Token signature**  | Confirms the token was issued by this daemon   |
| **Token expiration** | Ensures token is not expired                   |
| **Client signature** | Ensures only the rightful owner uses the token |
| **Quota check**      | Checks free call allowance for the user        |
| **Balance check**    | Prevents abuse by empty wallets                |

## Benefits Summary

| **Feature**          | **Description**                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| Token origin         | Only the service provider can issue valid tokens (via its private key). |
| Decentralization     | No central backend dependency — all logic handled by the daemon.        |
| Abuse prevention     | Balance threshold prevents spamming from dust wallets.                  |
| Configurable TTL     | Each token can have a custom lifetime (in blocks).                      |
| Fine-grained control | Set call quotas per address and define trusted backend signers.         |

---

<ImageViewer src="/assets/images/products/AIMarketplace/daemon/daemon_new_free_calls.png" alt="Free Calls architecture"/>
