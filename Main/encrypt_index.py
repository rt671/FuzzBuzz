import pandas as pd
from Crypto.Cipher import AES
from Crypto.Hash import MD5
from Crypto.Random import random
import numpy as np
import time
import hashlib
from PyPDF2 import PdfFileWriter, PdfFileReader
import sys
import json
import ast

def build_trapdoor(MK, keyword):
    keyword_index = MD5.new()
    keyword_index.update(str(keyword).encode('utf-8'))
    # print(keyword_index)
    # key=bytes(MK,'hex');
    key = bytes.fromhex("0123456789abcdef0123456789abcdef")
    ECB_cipher = AES.new(key, AES.MODE_ECB)
    return ECB_cipher.encrypt(keyword_index.digest())

def build_codeword(ID, trapdoor):
    ID_index = MD5.new()
    ID_index.update(str(ID).encode('utf-8'))
    ECB_cipher = AES.new(trapdoor, AES.MODE_ECB)
    # print(ECB_cipher)
    return ECB_cipher.encrypt(ID_index.digest())

def build_index(master_key, ID, keyword_list):
    secure_index = [0] * len(keyword_list)
    for i in range(len(keyword_list)):
        codeword = build_codeword(ID, build_trapdoor(master_key, keyword_list[i]))
        secure_index[i] = codeword
    random.shuffle(secure_index)
    return secure_index

def searchable_encryption(index_table, master_key):
    # raw_data = pd.read_csv(index_table)
    # features = list(raw_data)
    # print(raw_data)
    # raw_data = raw_data.values
    # print(raw_data)
    # document_number = [i for i in range(0, len(features)) if features[i] in keyword_type_list]

    # index_header = []
    # for i in range(1, len(keyword_type_list) + 1):
    #     index_header.append("doc_" + str(i))
    document_index = {}
    # start_time = time.time()
    cntr=0
    for keyArr, valArr in index_table.items():
        # record = raw_data[row]
        for key in keyArr:
            enckey = build_index(master_key, cntr, key)
            # add enckey to an encrypted key array

        for val in valArr:
            encval = build_index(master_key, cntr, val)
            #add encval to an encrypted val array

        document_index[encrypted key array (tuple)]  = encrypted val array
        
        # document_index.append(res)
        cntr+=1
    # print("hello")
    print(document_index)
    # time_cost = time.time() - start_time
    # print (time_cost)
    # document_index_dataframe = pd.DataFrame(np.array(document_index), columns=features)
    # document_index_dataframe.to_csv("yes_index.csv") #document.split(".")[0] + 

    # encr_index_table = {}
    # i=0
    # for key in index_table:
    #     encr_row = build_index(i, index_table[key])
    #     encr_index_table[key] = encr_row

def encrypt_doc(doc_name, master_key):
    out = PdfFileWriter()
    file = PdfFileReader(doc_name)
    num = file.numPages
    for idx in range(num):
        page = file.getPage(idx)        
        out.addPage(page)

    password = master_key
    out.encrypt(password)

    with open(doc_name + "_encrypted.pdf", "wb") as f:
        out.write(f)

if __name__ == "__main__":
    master_key = "0123456789abcdef0123456789abcdef"
    # master_key = open("masterkey").read()
    # if len(master_key) > 16:
    #     print ("the length of master key is larger than 16 bytes, only the first 16 bytes are used")
    #     master_key = bytes(master_key[:16])

    # keyword_list_file_name = input("please input the file stores keyword type:  ")
    # keyword_type_list = open("keywordlist").read().split(",")
    # document_name="D:\work\BTP\CODE\Backend\index.csv"
    doc_text = sys.argv[1]
    index_str = sys.argv[2]
    # print(doc_text)
    # print(index_str)
    # index_str = index_str[1:-3]
    # print("THE STRING IS ", index_str)

    json_acceptable_string = index_str.replace("'", "\"")
    # print(json_acceptable_string)
    # index_table = json.loads(json_acceptable_string)
    # print(index_table)
    index_table = ast.literal_eval(json_acceptable_string)
    print(index_table)
    # index_name = "D:/work/BTP/CODE/Backend/index.csv"
    # searchable_encryption(index_table, master_key)
    # encrypt_doc(doc_text, master_key)
    # print ("Finished")
