# OpenSSL

## Key Generation

In PEM format:

```bash
# Generate a private key in PEM format
openssl genpkey -algorithm ed25519 -out ed25519_private.pem

# Generate a public key from the secret key
openssl pkey -in ed25519.sk -pubout -out ed25519_public.pem
```

In DER (DER PKCS#8 ASN.1) format:

```bash
# Generate a private key in DER format
openssl genpkey -algorithm ed25519 -outform DER -out ed25519_private.der

# Generate a public key from the secret key
openssl pkey -in ed25519_private.der -inform DER -pubout -outform DER -out ed25519_public.der
```

Inspect the keys (either PEM or DER formatted keys work fine here):

```bash
# Inspect the private key and observe that both public and private keys are 32 bytes
openssl pkey -in ed25519_private.pem -text -noout
```

Converting keys from DER to PEM:

```bash
openssl pkey -in ed25519_private.der -inform DER -out ed25519_private.pem -outform PEM
openssl pkey -in ed25519_public.der -inform DER -pubin -out ed25519_public.pem -outform PEM
```

Signing using either PEM or DER formatted keys (neither require specific openssl arguments):

```bash
# Generate a short message to sign
printf 'hello\n' > msg.txt

# Generate a digest using SHA-512 and the private key
openssl pkeyutl -sign -inkey ed25519_private.pem -in msg.txt -out msg.sig

# Verify that the signature is indeed 64 bytes
wc -c msg.sig

# Verify the signature against the public key and message (should return "Signature Verified Successfully")
openssl pkeyutl -verify -pubin -inkey ed25519_public.pem -in msg.txt -sigfile msg.sig
```
