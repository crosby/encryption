# OpenSSL HKDF

```bash
# Derive a key using HKDF which requires an input key, a salt and info
openssl kdf -keylen 32 \
  -kdfopt digest:SHA256 \
  -kdfopt hexkey:$(openssl rand -hex 32) \
  -kdfopt hexsalt:$(openssl rand -hex 32) \
  -kdfopt hexinfo:$(printf 'session v1' | xxd -p -c 999) \
  -binary HKDF > key.bin

# Verify that the output is 32 bytes
wc -c key.bin
```
