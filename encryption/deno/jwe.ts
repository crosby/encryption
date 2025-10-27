import { compactDecrypt, CompactEncrypt } from "jose";

// Define the plaintext that we'll be encrypting
const plaintext = new TextEncoder().encode("Hello!");

// Generate a new AES-GCM key. See /encryption/deno/chacha.ts for using XChaCha20-Poly1305 instead.
const key = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"],
);

// Encrypt the plaintext using the AES-GCM key. We're using `alg: "dir"` here which means direct encryption
// which avoids any key wrapping or encapsulation that we may want to implement separately.
const jwe = await new CompactEncrypt(plaintext)
  .setProtectedHeader({
    alg: "dir",
    enc: "A256GCM",
    kid: "aes-1",
    typ: "JWE",
  })
  .encrypt(key);

// Decrypt using the key
const { plaintext: recovered } = await compactDecrypt(
  jwe,
  key,
);

console.log(
  "Decrypted: ",
  new TextDecoder().decode(recovered),
);
