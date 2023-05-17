# FuzzBuzz
An algorithm that enables searching Fuzzy words over Encrypted Data

Before storing data to the cloud, the data is generally **encrypted** to ensure data security. However,
using the conventional search method to look through the encrypted cloud data is
intractable and inefficient for the data user. One way is that the user downloads all
the cipher data from the cloud and decrypts locally, but that will require a huge
amount of computing resources. Another way can be to provide the key to the cloud
and search after decrypting all data but that will anyway expose the data to the
cloud.

An efficient way should be to encrypt the data and then match with the stored
encrypted data. However, such schemes can only support the **exact keyword
search**, that is, tiny typos and format irregularities, which are, on the other hand,
characteristic of user searching activity and occur rather regularly, are not tolerated.
In this case, the exact keyword search might not return the documents of interest.

This project thus aims to implement an algorithm which is able to search through
**fuzzy (misspelled) keywords over the encrypted data** on a cloud based system,
in a secure way. Fuzzy keyword search significantly improves system usability by
delivering the matching files when users' searching inputs precisely match the preset
keywords, or in case when exact match fails, the closest feasible matching files
based on keyword similarity semantics.

The System Model can be described as follows:
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/5de8e323-17ac-499c-abba-bcebe2a50492)
