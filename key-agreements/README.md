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
