# Deno

The `main.ts` walks through the basic setup of generating `Ed25519` keypairs and using them to sign and verify
generated digital signatures.

## Ed25519

The example code can be run using `deno run -A ed25519.ts`.

## ML-DSA

The example code can be run using `deno run -A mldsa.ts`.

## JWS

The example code can be run using `deno run -A jws.ts`.

_Note: At the time this was created, ML-DSA support in Deno/WebCrypto is not accepted. So we're sticking with Ed25519 for now._
