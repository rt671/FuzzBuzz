import csv
import sys
from fuzzygeneration import addFuzzy

n_doc=4
inverted_index = {}

def createIndex(fuzzySet, doc_no, doc_id):
    inverted_index["document"] = inverted_index.get("document", [""]*n_doc)
    inverted_index["document"][doc_no] = doc_id
    key = tuple(fuzzySet)
    inverted_index[key]= inverted_index.get(key, [0]*n_doc)
    inverted_index[key][doc_no] +=1

# def addFuzzy(keyword):
#     # Set the maximum edit distance
#     max_distance = 2

#     # Generate a set of fuzzy keywords using the distance algorithm from the fuzzywuzzy package
#     fuzzy_keywords = set()
#     fuzzy_keywords.add(keyword)  # Add the given keyword to the set

#     # Generate variations of the keyword by removing or adding letters
#     for i in range(len(keyword)):
#         fuzzy_keywords.add(keyword[:i] + keyword[i + 1:])  # Remove a letter
#         for c in "abcdefghijklmnopqrstuvwxyz":
#             fuzzy_keywords.add(keyword[:i] + c + keyword[i:])  # Add a letter
#             fuzzy_keywords.add(keyword[:i] + c + keyword[i + 1:])  # Substitute a letter

#     print("Without filtering", fuzzy_keywords)
#     print(len(fuzzy_keywords))
#     # Filter the fuzzy keywords to include only those with a distance of 2 or less
#     fuzzy_keywords = {word for word in fuzzy_keywords if fuzz.distance(word, keyword, max_distance) <= max_distance}

#     # Print the fuzzy keyword set
#     print("With filtering", fuzzy_keywords)
#     print(len(fuzzy_keywords))
#     return fuzzy_keywords

# # ans = addFuzzy("cat")

# fuzzy_keywords = []
# def addFuzzy2(keyword, d):
#     if d>1:
#         addFuzzy2(keyword, d-1)
    
#     if d==0:
#         fuzzy_keywords.append(keyword)
#     else:
#         for k in range(len(fuzzy_keywords)):
#             for j in range(1, 2*len(fuzzy_keywords)):
#                 if j&1:
#                     fuzzkey = fuzzy_keywords[k]
#                     fuzzkey.insert('*', math.floor((j+1)/2))
#                 else:
#                     fuzzkey = fuzzy_keywords[k]
#                     fuzzkey[math.floor(j/2)] = '*'
                
#                 if fuzzkey not in fuzzy_keywords:
#                     fuzzy_keywords.append(fuzzkey)
#     print(fuzzy_keywords)
#     return fuzzy_keywords

# addFuzzy2("cat", 1)

def handleFuzzy(doc, doc_no, doc_id):
    for term in doc.split():
        fuzzySet = addFuzzy(term, 1)
        createIndex(fuzzySet, doc_no, doc_id)

cleaned_doc = sys.argv[1]
cleaned_doc = cleaned_doc[1:-1]
key = sys.argv[2]

# print("\nThe cleaned text is: \n", cleaned_doc)
handleFuzzy(cleaned_doc, 0, key)
print(str(inverted_index))

# indexTable = createIndex(fuzzySet, 0)
# print("\nThe inverted index table: \n", indexTable)
# CODE

# index_header = ["keyword"]
# for i in range(1, (n_doc) + 1):
#     index_header.append("doc_" + str(i))

# csvstr=""
# for key,value in inverted_index.items():
#     # print(key, value)
#     s = str(value)
#     keystr = str(key)
#     csvstr += f"{keystr},{s[1:-1]}" + "\n"
#     print(csvstr)

# with open('index.csv', 'w',  encoding="utf-8", newline='') as csvfile:
#     writer = csv.DictWriter(csvfile, fieldnames=index_header)
#     writer.writeheader()
#     for key,value in inverted_index.items():
#         s = str(value)
#         keystr = str(key)
#         # print(csvstr)
#         # writer.writerow(csvstr)
#         writer.writerow([keystr, s[1:-1]])
    # csvfile.write(csvstr.split("\n"))

# writer = csv.writer(csvfile)
#   writer.writerow([tuple_string])

with open("hello.csv", "w") as outfile:
    writerfile = csv.writer(outfile)
    writerfile.writerow(inverted_index.keys())        
    writerfile.writerows(zip(*inverted_index.values()))
