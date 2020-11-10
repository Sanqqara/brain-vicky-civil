#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression,LogisticRegression
import matplotlib.pyplot as plt 

def main():
    data_df = pd.read_excel('project graph success.xlsx')
 
    new_header = data_df.iloc[0] #grab the first row for the header
    data_df = data_df[1:] #take the data less the header row
    data_df.columns = new_header
   
    # data_df['x'] = data_df['x'].apply(lambda x: (np.log(x))*100)


    X=data_df['x'].values.reshape(-1,1)
    Y = data_df['y'].to_list()
    # Y=data_df['y'].values.reshape(-1,1)

    # print(X)
    # print(Y)

    linear_regressor = LogisticRegression(solver='liblinear', random_state=0)
    linear_regressor.fit(X,Y)

    print(linear_regressor.score(X,Y))
    #print(linear_regressor.intercept_)
    # print(linear_regressor.coef_)
    # Y_Pred = linear_regressor.predict(X)
    #
    #
    # plt.scatter(X, Y)
    # plt.plot(X, Y_Pred, color='red', label = str(linear_regressor.coef_[0][0])+'X'+'+'+str(linear_regressor.intercept_[0]))
    # plt.ylabel('flood peak in descending')
    # plt.xlabel('return period')
    #
    # plt.xticks(np.arange(0,1000,100))
    # plt.savefig('regression2.png')



    # print('Y - intercept: '+linear_regressor.intercept_)

    # print('X - intercept: '+linear_regressor.coef_)

    # print(str(linear_regressor.coef_[0][0])+'X'+'+'+str(linear_regressor.intercept_[0]))

if __name__ == '__main__':
    main()





