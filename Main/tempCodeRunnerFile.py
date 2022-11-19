master_key = open("masterkey").read()
    if len(master_key) > 16:
        print ("the length of master key is larger than 16 bytes, only the first 16 bytes are used")
        master_key = bytes(master_key[:16])