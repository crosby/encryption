import { ml_kem768 } from "@noble/post-quantum/ml-kem.js";
import { ml_dsa65 } from "@noble/post-quantum/ml-dsa.js";
import { randomBytes } from "@noble/post-quantum/utils.js";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";

// Generate a salt for this protocol
const salt = crypto.getRandomValues(new Uint8Array(32));
const aad = new TextEncoder().encode("basic v1");

// Generate keys for Alice
const aliceEncKeys = ml_kem768.keygen(randomBytes(64));
const aliceSignKeys = ml_dsa65.keygen(randomBytes(32));

// Generate keys for Bob
const bobEncKeys = ml_kem768.keygen(randomBytes(64));
const _bobSignKeys = ml_dsa65.keygen(randomBytes(32));

// Bob now generates a shared secret based on Alice's public key
const { cipherText, sharedSecret: aliceSharedSecret } = ml_kem768.encapsulate(
  bobEncKeys.publicKey,
);

// Alice signs the ciphertext
const kemSignature = ml_dsa65.sign(cipherText, aliceSignKeys.secretKey);

// Alice sends the ciphertext and signature to Bob
const kemPayload = {
  enc: cipherText,
  sig: kemSignature,
};
console.log("Alice sent KEM payload to Bob");

// Alice uses the salt, protocol and version to create key material
const aliceHkdf = await crypto.subtle.importKey(
  "raw",
  new Uint8Array(aliceSharedSecret),
  "HKDF",
  false,
  ["deriveBits"],
);

// Alice uses the output from the HKDF + nonce + AAD to derive an XChaCha20-Poly1305 key
const nonce = crypto.getRandomValues(new Uint8Array(24));
const aliceAead = xchacha20poly1305(
  new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "HKDF",
        hash: "SHA-256",
        salt,
        info: new TextEncoder().encode("basic v1"),
      },
      aliceHkdf,
      256,
    ),
  ),
  nonce,
  aad,
);

// The message Alice is sending to Bob
const msg = new TextEncoder().encode("Hello");

// Alice encrypts the message
const ciphertext = aliceAead.encrypt(msg);

// Alice signs the encrypted message
const messageSignature = ml_dsa65.sign(ciphertext, aliceSignKeys.secretKey);

// Alice sends the payload to Bob
const payload = {
  enc: ciphertext,
  alg: "XChaCha20-Poly1305",
  n: nonce,
  sig: messageSignature,
};
console.log("Alice sent message payload to Bob");

// Bob first verifies the signature from Alice from the KEM exchange
console.log(
  "Bob verified Alice's signature on ML-KEM exchange: ",
  ml_dsa65.verify(
    kemPayload.sig,
    kemPayload.enc,
    aliceSignKeys.publicKey,
  ),
);

// Bob then verifies the signature from Alice from the message exchange
console.log(
  "Bob verified Alice's signature on message payload: ",
  ml_dsa65.verify(
    payload.sig,
    payload.enc,
    aliceSignKeys.publicKey,
  ),
);

// Bob decapsulates the ciphertext of the shared secret from Alice
const bobSharedSecret = ml_kem768.decapsulate(
  kemPayload.enc,
  bobEncKeys.secretKey,
);

// Bob uses the salt, protocol and version to create key material
const bobHkdf = await crypto.subtle.importKey(
  "raw",
  new Uint8Array(bobSharedSecret),
  "HKDF",
  false,
  ["deriveBits"],
);

// Bob uses the output from the HKDF + nonce + AAD to derive an XChaCha20-Poly1305 key
const bobAead = xchacha20poly1305(
  new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "HKDF",
        hash: "SHA-256",
        salt,
        info: new TextEncoder().encode("basic v1"),
      },
      bobHkdf,
      256,
    ),
  ),
  nonce,
  aad,
);

// Bob then decrypts the message from Alice
const receivedMessage = bobAead.decrypt(payload.enc);

// Bob
console.log(new TextDecoder().decode(receivedMessage));
