# Key Agreements

Key agreements allow for parties to generate the same shared secret based on public and private keys.

## ECDH

Elliptic Curve Diffie-Hellman is the best pre-quantum key agreement for us to use. ECDH provides:

* 128-bit security
* Fast and constant time
* Broad support
* Simple API

### Best Practices

* In protocols it can be good to generate ephemeral keys (i.e. a new keypair every session)
    * Long-term identity key is used to sign the ephemeral public key
    * This provides forward secrecy (if the long-term identity key is compromised, past sessions are safe since they're different keys)
    * Good key separation (all sessions have unique shared secrets)
    * Replay protection (new keys provides fresh HKDF outputs per session)

## ML-KEM

ML-KEM is the NIST recommended post-quantum key encapsulation mechanism. It can be used in place of ECDH for deriving
shared secrets between parties.

The major difference here to ECDH which computes a shared secret, is that in ML-KEM, encapsulating a public key is non-deterministic.

This means that if Alice generates a keypair, then anyone can encapsulate her public key to get a secret and ciphertext.

Alice can then decapsulate the ciphertext to get the same shared secret.

Since it doesn't require Bob to have a keypair to encrypt to Alice, we can't be sure that the ciphertext that Alice receives
is actually from Bob. So we ML-KEM grants confidentiality but not authenticity. We likely need ML-DSA to supplement ML-KEM i.e.

1. Bob generates a ciphertext by encapsulating Alice's public key
2. Bob generates a signing keypair using ML-DSA
3. Bob uses his ML-DSA private key to sign the ciphertext
4. Bob sends the ciphertext + his ML-DSA signature to Alice
5. Alice uses Bob's public key to verify the signature
6. Alice decapsulates the ciphertext to get the same shared secret
