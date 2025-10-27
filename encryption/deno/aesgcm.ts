// We can generate a 256-bit key just using Subtle.generateKey
let key = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"],
);

// Or we can use HKDF to generate 256-bit key material (see /hkdf/deno/main.ts)
const ikm = crypto.getRandomValues(new Uint8Array(32));
const salt = crypto.getRandomValues(new Uint8Array(32));
const info = new TextEncoder().encode("myapp v1 key material");
const base = await crypto.subtle.importKey(
  "raw",
  ikm,
  "HKDF",
  false,
  ["deriveBits"],
);
const keyMaterial = await crypto.subtle.deriveBits(
  { name: "HKDF", hash: "SHA-256", salt, info },
  base,
  256,
);
key = await crypto.subtle.importKey(
  "raw",
  keyMaterial,
  "AES-GCM",
  false,
  ["encrypt", "decrypt"],
);

// Generate a 96-bit/12-byte IV
const iv = crypto.getRandomValues(new Uint8Array(12));

// Define an AAD (Additional Authenticated Data)
const aad = new TextEncoder().encode("myapp v1 hdr");

// The plaintext we want to encrypt
const plaintext = new TextEncoder().encode("Hello!");

// Encrypt using AES-GCM
const ciphertext = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv, additionalData: aad, tagLength: 128 },
  key,
  plaintext,
);

// Decrypt using AES-GCM
const recovered = await crypto.subtle.decrypt(
  { name: "AES-GCM", iv, additionalData: aad, tagLength: 128 },
  key,
  ciphertext,
);

// Output the decoded decrypted content. Should print "Hello!"
console.log(new TextDecoder().decode(recovered));
