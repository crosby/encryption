import { ml_dsa65 } from "@noble/post-quantum/ml-dsa.js";
import { randomBytes } from "@noble/post-quantum/utils.js";

// ML-DSA requires a random a seed
const seed = randomBytes(32);

// Generate a public and private key using the seed
const { publicKey, secretKey } = ml_dsa65.keygen(seed);

// Generate a UTF-8 encoded binary representation of the message "Hello"
const msg = new TextEncoder().encode("Hello");

// Generate a signature by using the private key
const sig = ml_dsa65.sign(msg, secretKey);

// Generate a signature by using the private key
const ok = ml_dsa65.verify(sig, msg, publicKey);

// Should output "Signature Verified Successfully"
console.log(ok ? "Signature Verified Successfully" : "Error");
