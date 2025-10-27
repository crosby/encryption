# Encryption

Current best practices for encryption are AEAD (Authenticated Encryption with Associated Data) with two of the best standards being
AES-GCM (Block cipher using Galois counter mode) and ChaCha20-Poly1305 (Stream cipher with Poly1305 MAC).

## AES-GCM

AES-GCM appears to be the best where hardware acceleration exists (e.g. servers, desktops).

AES-GCM requires:

* Key: A 32-byte random key (often the output from an HDKF)
* IV: Unique 12-byte initialization vector that should *not* be reused
* AAD: Additional authenticated data. It's not encrypted but includes information about the protocol/version etc
* Tag: This is like a 16-byte MAC that is computed over the ciphertext, AAD, IV and key. It validates that the ciphertext and AAD have not been tampered with

## XChaCha20-Poly1305

XChaCha20-Poly1305 appears to be best for places like WebCrypto, mobile, embedded/IoT since it's fast in software.

XChaCha20 is preferred over ChaCha20 since randomized nonces can be used safely without risk of collision.

ChaCha20 can still be used (and is by TLS 1.3/QUIC) but with counter-based nonces. This can be done but XChaCha20 protects developers from the risk of collisions breaking security.
