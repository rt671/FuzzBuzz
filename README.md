# FuzzBuzz
## An algorithm that enables searching Fuzzy words over Cloud Data

Before storing data in the cloud, the data is generally **encrypted** to ensure data security. However,
using the conventional search method to look through the encrypted cloud data is
intractable and inefficient for the data user. One way is that the user downloads all
the cipher data from the cloud and decrypts it locally, but that will require a huge
amount of computing resources. Another way can be to provide the key to the cloud
and search after decrypting all data but that will anyway expose the data to the
cloud.

An efficient way should be to encrypt the data and then match it with the stored
encrypted data. However, such schemes can only support the **exact keyword
search**, that is, tiny typos and format irregularities, which are, on the other hand,
characteristic of user searching activity and occur rather regularly, are not tolerated.
In this case, the exact keyword search might not return the documents of interest.

This project thus aims to implement an algorithm that is able to search through
**fuzzy (misspelled) keywords over the encrypted data** on a cloud-based system,
in a secure way. Fuzzy keyword search significantly improves system usability by
delivering the matching files when users' searching inputs precisely match the preset
keywords, or in a case when the exact match fails, the closest feasible matching files
based on keyword similarity semantics.

**The System Model** can be described as follows:
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/5de8e323-17ac-499c-abba-bcebe2a50492)

The system revolves around three main entities: 
1. Data owner, who uploads the text in the application
2. Cloud server which stores the encrypted documents and retrieves relevant documents on search
3. Data user, who searches for the documents and is allowed to make spelling mistakes

The above model is represented by the following algorithm:
1. The system at the data owner site scans the whole document to extract all of the distinct keywords and constructs the keyword set. For each keyword, a list
is prepared which contains the set of documents containing that particular keyword. Then the fuzzy key set is generated for each keyword by calculating the edit distance for each word. 

2. All the files are encrypted. The plain text of the documents is converted into the cipher text and index table into secured index. Then they are stored in the cloud. We use double encryption for each index value based on its row and column to increase security.

3. When the user wants to search any file in the cloud, he/she just queries the keyword, and the trapdoor is generated based on the keyword and the encryption algorithm’s key and sent to the cloud.

4. On receiving the trapdoor, the cloud server compares it with all the possible keywords in the index table. If the queried keyword doesn’t match completely
(is misspelled), we select the keyword with the minimum possible edit distance in the fuzzy set.

5. Finally the cloud returns the desired file to the user and it can easily be downloaded by the user on his/her system.


## Code Structure
- Backend
  Contains the database entities, and index.js is the main flow of the application, and runs the algorithm. It calls all the necessary functions implemented in the Main folder.
- Main
  Contains all the functions that make together the algorithm. This is the main part of our project. The functions are executed in the following order:
  - preprocess.py: Processes the text using NLP to remove stopwords, eliminate redundancy, etc.
  - indexing.py: Prepares an index from the keywords obtained, Creates an Inverted Index from the prepared index
  - encrypt_text.py: Encrypts the text using AES and stores it in the cloud
  - fuzzy_generation.py: Generates the fuzzy set for each keyword and modifies the inverted index
  - encrypt_index.py: Encrypts the index to obtain a secured index and stores it in the cloud
  - trapdoor.py: Generates the trapdoor set for the generated fuzzy set of the searched keyword
  - search.py: Searches for the match between trapdoor set elements and the encrypted inverted index
  - findnsort.py: Retrieves the corresponding documents from the cloud and sorts them based on the closest edit distance values to the trapdoor set elements
- index.csv shows the sample format of the inverted index with fuzzy keyword sets, sample_text_india.pdf is the sample text data about India

## Demonstration:
**UPLOADING DOCUMENTS**

- The data owner uploads the text in the application:
  
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/8ca6f4d3-c1f3-408c-9f0c-1622cb032139)


- The given text is processed, encrypted, and saved to the cloud:
  
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/1568c002-bb19-4169-a1d3-44944053d4a3)


- The inverted index is created, fuzzy sets are included, and the index is encrypted to become a secured index:
  
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/d3f78987-03c8-4108-9560-94c7de9a4f24)

**SEARCHING DOCUMENTS**

- The user enters keyword(s) to search for relevant documents (result is also shown):
  
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/0e2d60ae-0b8a-49a0-8349-18929f4fa655)

- Trapdoor is generated for the fuzzy sets of searched keywords:
  
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/304b9354-cfe9-4232-80a7-9f1980eb63cb)

The secured index is searched for a match with trapdoor set elements, the matched documents are then retrieved, sorted and returned:
![image](https://github.com/rt671/FuzzBuzz/assets/82562103/8a2277d7-573d-4306-aeff-761436b9ef08)





