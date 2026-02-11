# def detect_hash_type(hash_value):
#     if len(hash_value) == 32:
#         return "MD5"
#     elif len(hash_value) == 40:
#         return "SHA1"
#     elif len(hash_value) == 64:
#         return "SHA256"
#     elif hash_value.startswith("$2b$") or hash_value.startswith("$2a$"):
#         return "bcrypt"
#     else:
#         return "Unknown"


def detect_hash_type(h):
    h = h.strip()
    if h.startswith("$2b$") or h.startswith("$2a$"):
        return "bcrypt"
    if h.startswith("$argon2"):
        return "argon2"
    if h.startswith("blake2b$"):
        return "blake2"
    if len(h) == 64:
        return "sha256"
    if len(h) == 128:
        return "sha512"
    return "unknown"