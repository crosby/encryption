import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";

// Generate a 256-bit key. Usually this would come from an HKDF
const key = crypto.getRandomValues(new Uint8Array(32));

// Generate a 192-bit nonce. This is the same as the IV in AES-GCM.
// It can be safely randomized in XChaCha20 but is unsafe to randomize in ChaCha20
const nonce = crypto.getRandomValues(new Uint8Array(24));

// Define an AAD (Additional Authenticated Data)
const aad = new TextEncoder().encode("myapp v1 hdr");

// The plaintext we want to encrypt
const plaintext = new TextEncoder().encode("Hello!");

// Create the XChaCha20-Poly1305 cipher using the key, nonce and aad
const aead = xchacha20poly1305(key, nonce, aad);

// Encrypt using the cipher
const ciphertext = aead.encrypt(plaintext);

// Decrypt using the cipher
const recovered = aead.decrypt(ciphertext);

// Output the decoded decrypted content. Should print "Hello!"
console.log(new TextDecoder().decode(recovered));
