import { ml_kem768 } from "@noble/post-quantum/ml-kem.js";
import { randomBytes } from "@noble/post-quantum/utils.js";

// First we generate a random seed needed for generating Alice's keys
const seed = randomBytes(64);

// Generate an ML-KEM keypair for Alice
const aliceKeys = ml_kem768.keygen(seed);

// Alice sends her public key to Bob

// Bob now generates a shared secret based on Alice's public key
const { cipherText, sharedSecret: bobShared } = ml_kem768.encapsulate(
  aliceKeys.publicKey,
);

// Bob sends ciphertext to Alice

// Alice can now generate the same shared secret from the ciphertext and her own secret key
const aliceShared = ml_kem768.decapsulate(cipherText, aliceKeys.secretKey);
