import { Buffer } from "node:buffer";

// Generate a keypair for Alice
const { publicKey: alicePublicKey, privateKey: alicePrivateKey } = await crypto
  .subtle.generateKey(
    { name: "X25519" },
    true,
    ["deriveBits", "deriveKey"],
  ) as CryptoKeyPair;

// Generate a keypair for Bob
const { publicKey: bobPublicKey, privateKey: bobPrivateKey } = await crypto
  .subtle.generateKey(
    { name: "X25519" },
    true,
    [
      "deriveBits",
      "deriveKey",
    ],
  ) as CryptoKeyPair;

// Alice generates a 32-byte shared secret
const aliceSharedSecret = await crypto.subtle.deriveBits(
  { name: "X25519", public: bobPublicKey },
  alicePrivateKey,
  256, // 32 bytes
);

const bobSharedSecret = await crypto.subtle.deriveBits(
  { name: "X25519", public: alicePublicKey },
  bobPrivateKey,
  256, // 32 bytes
);

// Compare the keys by hashing and comparing the outputs (Should output "Secrets are equal")
crypto.subtle.digest("SHA-256", aliceSharedSecret).then((a) =>
  crypto.subtle.digest("SHA-256", bobSharedSecret).then((b) => {
    console.log(
      Buffer.from(a).toString("hex") === Buffer.from(b).toString("hex")
        ? "Secrets are equal"
        : "Error",
    );
  })
);
