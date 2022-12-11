import pandas as pd
import sys

def getDocArray(index):
    ind = pd.read_csv("hello.csv")
    # print(ind)
    df = ind.iloc[:,[index]] # Select columns by Index
    print(df)

index = sys.argv[1]
getDocArray(7)