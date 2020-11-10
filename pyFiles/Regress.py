#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression,LogisticRegression
import matplotlib.pyplot as plt
from matplotlib.ticker import ScalarFormatter

def main():
    data_df = pd.read_excel('project graph success.xlsx')
    fig, ax = plt.subplots(figsize=(20,10))

    new_header = data_df.iloc[0] #grab the first row for the header
    data_df = data_df[1:] #take the data less the header row
    data_df.columns = new_header
    ki_ex = data_df['x']
    print(data_df['x'][0:5])
    print("New Line")
    data_df['x'] = data_df['x'].apply(lambda x: (np.log(x))*100) 
    print(data_df['x'][0:5])

    linear_regressor = LinearRegression()
    X=data_df['x'].values.reshape(-1,1)
    Y=data_df['y'].values.reshape(-1,1)


    linear_regressor.fit(X,Y)
    Y_Pred = linear_regressor.predict(X) # the new Y values are the ones predicted from the model

    plt.scatter(ki_ex, Y)
    plt.semilogx(ki_ex, Y_Pred, color='red')
    plt.ylabel('flood peak in descending')
    plt.xlabel('return period')
    plt.semilogx(ki_ex,Y)
    ax.xaxis.set_major_formatter(ScalarFormatter())
    plt.savefig('regression.png')



    # print('Y - intercept: '+linear_regressor.intercept_)

    # print('X - intercept: '+linear_regressor.coef_)

    print(str(linear_regressor.coef_[0][0])+'X'+'+'+str(linear_regressor.intercept_[0]))

if __name__ == '__main__':
    main()





