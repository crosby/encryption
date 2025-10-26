// Generate a random IKM, salt and info label
const ikm = crypto.getRandomValues(new Uint8Array(32));
const salt = crypto.getRandomValues(new Uint8Array(32));
const info = new TextEncoder().encode("myapp v1 key material");

// In WebCrypto we need to generate a base key first using the IKM
const hkdfBase = await crypto.subtle.importKey(
  "raw",
  ikm,
  "HKDF",
  false,
  ["deriveBits"],
);

// Then we can use HKDF to generate random material (e.g. 256 bits) using the salt, info label and base
const okmBuf = await crypto.subtle.deriveBits(
  { name: "HKDF", hash: "SHA-256", salt, info },
  hkdfBase,
  256,
);
const okm = new Uint8Array(okmBuf);

// Output to Base64
console.log(btoa(String.fromCharCode(...okm)));
