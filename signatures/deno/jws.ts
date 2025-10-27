import { CompactSign, compactVerify } from "jose";

// Generate an Ed25519 key pair
const { privateKey, publicKey } = await crypto.subtle.generateKey(
  { name: "Ed25519" },
  true,
  ["sign", "verify"],
) as CryptoKeyPair;

// The plaintext we'll be signing
const plaintext = new TextEncoder().encode("Hello!");

// Sign arbitrary payload to a compact JWS
const jws = await new CompactSign(plaintext)
  .setProtectedHeader({ alg: "Ed25519", kid: "ed25519-1", typ: "JWS" })
  .sign(privateKey);

console.log("JWS: ", jws);

// Verify that the signature was correct using the public key
await compactVerify(
  jws,
  publicKey,
).then(() => console.log("Signature Successfully Verified!"));
