import sys
from Crypto.Cipher import AES
from Crypto.Hash import MD5

def encrypt_doc(text, MK):
    keyword_index = MD5.new()
    keyword_index.update(str(text).encode('utf-8'))
    MK = MK.encode('utf-8')
    MK_length = len(MK)
    if MK_length>16:
        MK = MK[:16]
    if MK_length < 16:
        MK += bytes(16 - MK_length)
    ECB_cipher = AES.new(MK, AES.MODE_ECB)
    return ECB_cipher.encrypt(keyword_index.digest())

cleaned_doc = sys.argv[1]
cleaned_doc = cleaned_doc[1:-1]
# print(cleaned_doc)
password = sys.argv[2]
encrypted_stuff = encrypt_doc(cleaned_doc, password)
print(encrypted_stuff)
