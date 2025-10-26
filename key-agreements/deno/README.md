# Deno

## ECDH

Can be run using `deno run -A ecdh.ts`.

The code will generate two keypairs, one for Alice and one for Bob.

It'll then generate a secret as Alice and one as Bob and validate that they're indeed equal.

## ML-KEM

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
