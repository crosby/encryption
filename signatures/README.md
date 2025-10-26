# Signatures

Modern day best practices indicate that Ed25519 (Edwards25519) signatures are best for most applications. Ed25519 provides:

* 128-bit security
* 64 byte signatures
* 256-bit/32-byte keys
* Fast performance
* Universal library support (as shown in the examples)
* Broad interoperability
* Strong security

Ed448 _could_ be used, but only if we need post-2050 longevity or need Suite B / CNSA 2.0 or FIPS 186-5 level of assurance.
