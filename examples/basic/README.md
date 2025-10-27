# Basic Example

In this basic example, I wanted to pull together to do a basic message pass from Alice to Bob.

Alice has ML-DSA signing keys and ML-KEM key agreement keys. Bob has the same.

Assumptions are that they can trust each others public keys as belonging to them (i.e. we won't do CAs here).

The flow should look something like this:

1. Alice starts by encapsulating to Bob's public ML-KEM key producing a ciphertext and secret
1. Alice uses her ML-DSA key to create a signature of the ciphertext
1. Alice sends the ciphertext + signature to Bob
1. Bob verifies the signature using Alice's ML-DSA public key
1. Bob uses his private key to decapsulate the secret Alice first sent
1. Alice uses HKDF to deterministically create ephemeral key material to use for encryption
1. Alice derives an XChaCha20-Poly1305 key using the HKDF output and a random nonce
1. Alice encrypts the message 'Hello!' using the XChaCha20-Poly1305 key
1. Alice uses her ML-DSA key to create a signature of the encrypted message ciphertext
1. Alice sends the following to Bob:
    1. The encrypted message ciphertext
    1. The algorithm used (XChaCha20-Poly1305)
    1. The signature
    1. The nonce used to derive the XChaCha20-Poly1305 key
1. Bob receives the payload from Alice
1. Bob verifies the signature using Alice's ML-DSA public key
1. Bob uses HKDF to deterministically create the same key material for decryption using the decapsulated secret
1. Bob derives an XChaCha20-Poly1305 key using the HKDF output and the nonce Alice sent
1. Bob decrypts the payload ciphertext
