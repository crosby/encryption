import { ml_dsa65 } from "@noble/post-quantum/ml-dsa.js";
import { ml_kem768 } from "@noble/post-quantum/ml-kem.js";
import { randomBytes } from "@noble/post-quantum/utils.js";
import { base64url } from "multiformats/bases/base64";

// Generate ML-DSA-65 signing keys
const { publicKey: signingPublicKey, secretKey: _signingSecretKey } = ml_dsa65
  .keygen(randomBytes(32));

// Generate ML-KEM key agreement keys
const { publicKey: encPublicKey, secretKey: _encSecretKey } = ml_kem768.keygen(
  randomBytes(64),
);

// Since the DID spec doesn't natively support ML-DSA and ML-KEM keys, we can rely
// on it's extendability and just represent these keys as multibase.
// The multibase format is just a tag and the key material encoded using a scheme.
// Here we're just using the Base64 URL No Padding scheme (https://www.w3.org/TR/cid-1.0/#multibase-0)
function multibase(algTag: string, raw: Uint8Array): string {
  const tag = new TextEncoder().encode(algTag + "\0");
  const bytes = new Uint8Array(tag.length + raw.length);
  bytes.set(tag, 0);
  bytes.set(raw, tag.length);
  return base64url.encode(bytes);
}

// The DID that we're creating
const did = "did:example:richard";

// The verification method is our ML-DSA signing key
const signingMethod = {
  id: `${did}#key-1`,
  type: "MLDSAVerificationKey2025",
  controller: did,
  publicKeyMultibase: multibase("mldsa65-pub", signingPublicKey),
  meta: { alg: "ML-DSA-65", hash: "SHA-512/Shake", keySize: 32 },
};

// The encryption method is our ML-KEM key
const encryptionMethod = {
  id: `${did}#key-2`,
  type: "MLKEMKeyAgreement2025",
  controller: did,
  publicKeyMultibase: multibase("mlkem768-pub", encPublicKey),
  meta: { alg: "ML-KEM-768" },
};

// The DIDDoc for the DID
const diddoc = {
  "@context": ["https://www.w3.org/ns/did/v1"],
  id: did,
  verificationMethod: [signingMethod, encryptionMethod],
  authentication: [signingMethod.id],
  keyAgreement: [encryptionMethod.id],
};

// Output the DIDDoc
console.log(diddoc);
