# OpenSSL

```bash
# Generate an X25519 private key for Alice
openssl genpkey -algorithm x25519 -outform DER -out alice_priv.der

# Generate a public key from the private key for Alice
openssl pkey -in alice_priv.der -inform DER -pubout -outform DER -out alice_pub.der

# Generate an X25519 private key for Bob
openssl genpkey -algorithm x25519 -outform DER -out bob_priv.der

# Generate a public key from the private key for Bob
openssl pkey -in bob_priv.der -inform DER -pubout -outform DER -out bob_pub.der

# Observe that keys are 32 bytes each
openssl pkey -in alice_priv.der -text -noout

# Alice generates a shared secret
openssl pkeyutl -derive -inkey alice_priv.der -peerkey bob_pub.der -out alice.shared

# Bob generates a shared secret
openssl pkeyutl -derive -inkey bob_priv.der -peerkey alice_pub.der -out bob.shared

# Validate that they're equal (Should output "match")
cmp -s alice.shared bob.shared && echo match
```
