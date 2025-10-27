# Encryption

## Introduction

This repository represents my investigations into modern day cryptographic best-practices. It follows on from reading
"Real World Cryptography" by David Wong. I wanted to experiment with how to actually do the following in various languages:

1. Key generation
1. Key exchanges
1. Digital signatures
1. Hashing
1. Encryption
1. Certificates
1. Decentralized Identities

It focuses on modern best-practices (as of 2025) and includes additional practical research into how and when to actually use
these primitives in the development of modern secure protocols.

I've generally explored these themes in the following language (with maybe more to come in the future):

1. OpenSSL
1. Deno
1. Rust

## TODO

* [x] Ed25519 key generation and signatures
* [x] X25519 asymmetric key agreements
* [x] HKDF-SHA-256 KDF (key derivation function)
* [x] SHA-256 hashing
* [ ] Argon2id for password hashing
* [x] ML-KEM (Kyber) (Key encapsulation mechanism)
* [x] ML-DSA (Dilithium) signatures to replace Ed25519
* [x] Post-Quantum DIDs

## Formats

There appear to be two formats for storing generated keys:

* PEM (Privacy-Enhanced Mail)
* DER (Distinguished Encoding Rules)

Neither are outdated but appear to have different use cases:

PEM appears to be used for storing keys in human-readable and easily movable format (i.e. compatibility between systems, easy to copy/paste etc).

DER appears to be useful for network protocols, binary interfaces, in-memory representations etc.

DER is encoded using ASN.1 (Abstract Syntax Notation One) which is a schema language used to define how complex data structures are represented in binary for transmission or storage.

PKCS#8 is often how private keys are exported. PKCS#8 (or Public-Key Cryptography Standards #8 (RFC 5208 / RFC 5958)) is an ASN.1 _container format_ that defines `version`, `algorithm`, `privateKey` and an optional array of `attributes`.

SPKI is how public keys can be exported. SPKI (or SubjectPublicKeyInfo (RFC 5280 §4.1)) is an ASN.1 _container format_ that defines
`algorithm` and `subjectPublicKey`.

PKCS#8 and SPKI exported keys are ASN.1 wrappers in a universal format that ensures keys are portable across compliant libraries.
