import pandas as pd
df = pd.read_csv("hello.csv")
inverted_index = df.to_dict()
print(inverted_index)