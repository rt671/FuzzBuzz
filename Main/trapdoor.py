from Crypto.Cipher import AES
from Crypto.Hash import MD5
import sys
from fuzzygeneration import addFuzzy

def build_trapdoor(MK, keyword):
    keyword_index = MD5.new()
    keyword_index.update(str(keyword).encode('utf-8'))
    # key = bytes.fromhex("0123456789abcdef0123456789abcdef")
    MK = MK.encode('utf-8')
    ECB_cipher = AES.new(MK, AES.MODE_ECB)
    # ECB_cipher = AES.new(key, AES.MODE_ECB)
    return ECB_cipher.encrypt(keyword_index.digest())

if __name__ == "__main__":

    keyword = sys.argv[1]
    fuzzySet = addFuzzy(keyword, 2)
    # print(fuzzySet)
    # keyword = "india"
    # master_key = open(master_key_file_name).read()
    master_key = "0123456789abcdef0123456789abcdef"
    # if len(master_key) > 16:
    #     print ("the length of master key is larger than 16 bytes, only the first 16 bytes are used")
    #     master_key = bytes(master_key[:16])

    trapdoor_file = open(keyword + "_trapdoor", "w+")
    # trapdoor_set =[]
    for word in fuzzySet:
        trapdoor_of_keyword = build_trapdoor(master_key, word)
        # print(word, trapdoor_of_keyword)
        trapdoor_file.write(str(trapdoor_of_keyword))

    # trapdoor_set += trapdoor_of_keyword + ' '

    # trapdoor_file.write(str(trapdoor_set))
    trapdoor_file.close()