# OpenSSL Hashing

## SHA-256

```bash
# Output a SHA-256 binary hash encoded to Base64
echo -n "Hello" | openssl dgst -sha256 -binary | openssl base64
```

```bash
# Generate a short message to sign
printf 'hello\n' > msg.txt

# Output a SHA-256 binary hash encoded to Base64
openssl dgst -sha256 -binary msg.txt | openssl base64
```

## SHA-512

```bash
# Output a SHA-256 binary hash encoded to Base64
echo -n "Hello" | openssl dgst -sha512 -binary | openssl base64
```
