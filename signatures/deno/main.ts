// Generate a key pair (see: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey)
const { privateKey, publicKey } = await crypto.subtle.generateKey(
  { name: "Ed25519" },
  true, // Allow keys to be exported so we can inspect them
  ["sign", "verify"],
) as CryptoKeyPair;

// Generate a UTF-8 encoded binary representation of the message "Hello"
const message = new TextEncoder().encode("Hello");

// Generate a signature by using the private key and passing
const sig = await crypto.subtle.sign(
  { name: "Ed25519" },
  privateKey,
  message,
);

// Verify the signature is correct using the public key
const ok = await crypto.subtle.verify(
  { name: "Ed25519" },
  publicKey,
  sig,
  message,
);

// Should output "Signature Verified Successfully"
console.log(ok ? "Signature Verified Successfully" : "Error");

// Export the private key as an array buffer in PKCS#8 DER format
const privateKeyDer = await crypto.subtle.exportKey("pkcs8", privateKey);

// Export the public key as an array buffer in SPKI DER format
const publicKeyDer = await crypto.subtle.exportKey("spki", publicKey);

// Write both of these keys to files. These files can then be used in other places
// like OpenSSL
await Deno.writeFile("ed25519_private.der", new Uint8Array(privateKeyDer));
await Deno.writeFile("ed25519_public.der", new Uint8Array(publicKeyDer));

// We can also convert from DER format to PEM
function derToPem(label: string, der: ArrayBuffer): string {
  // We start by creating a Uint8Array from the ArrayBuffer
  const charCodes = new Uint8Array(der);

  // Then we create a String from the char codes i.e. a string where each character equals each byte value in the Uint8Array
  const inputString = String.fromCharCode(...charCodes);

  // We then Base64 encode the string
  const b64 = btoa(inputString);

  // Finally (and optionally) we can line break every 64 characters
  // This isn't required but is a convention for easier readability
  // Ensure there isn't an extra new line at the end which breaks parsers
  const output = b64
    .replace(/(.{64})/g, "$1\n")
    .replace(/\n$/, "");

  return `-----BEGIN ${label}-----\n${output}\n-----END ${label}-----\n`;
}

await Deno.writeTextFile(
  "ed25519_private.pem",
  derToPem("PRIVATE KEY", privateKeyDer),
);
await Deno.writeTextFile(
  "ed25519_public.pem",
  derToPem("PUBLIC KEY", publicKeyDer),
);
