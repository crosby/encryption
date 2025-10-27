# Certificates

## Introduction

X.509 Certificates are attestations that an entity does in fact control a public key.

A key problem in cryptography is that we can't be sure if the public key that our counterparty holds actually belongs to them.

X.509 Certificates are _signed_ ASN.1 structures that includes information about:

1. The identity
2. The issuer
3. The public key
4. The validity (e.g. valid from and to)
5. The capabilities
6. The algorithm
7. The actual signature

The issuer of these certificates are referred to as CAs (Certificate Authorities). The idea is that if entity X whom we trust says that this particular key is owned by Bob then we can trust Bob.

## Certificate Chains

Certificate chains are where we might not inherently trust the CA that issued a certificate about Bob, but if we trust another CA who says we can trust that CA, then we can.

This is transitive trust.
