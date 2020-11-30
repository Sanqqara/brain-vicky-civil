from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status
import pandas as pd
from numpy import log as ln
import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression
import matplotlib.pyplot as plt
from matplotlib.ticker import ScalarFormatter

app = FlaskAPI(__name__)

@app.route("/api/main", methods=["GET", "POST"])
def printFF():
    return("HEllo world")


@app.route("/api/test", methods=["POST"])
def getTest():
    req_data = request.get_json()
    # data = pd.read_dict(req_data)
    # print(req_data["data"][0])
    # print(pd.DataFrame(req_data['data']))
    # values = pd.Series()
    rainList = []
    orderList = []
    index = 0
    for x in req_data['data']:
        # rainKeys[index] = x.keys()
        # index += index
        # print(index)
        # print((x.keys()))
        # print((x.values()))
        orderList.append(x.keys())
        rainList.append(x.values())
    rainDf = pd.DataFrame(orderList, columns=["Order(m)"])
    rainDf["FLOOD PEAK"] = pd.DataFrame(rainList)
    data2 = rainDf.copy()
    data2['Flood peaks in descending order'] = data2['FLOOD PEAK']
    data2.drop('FLOOD PEAK', inplace=True, axis=1)

    data3 = data2.copy()
    data3['Order(m)'] = data3['Flood peaks in descending order'].rank(ascending=False)
    data4 = data3.copy()

    data4['Return period'] = (
    len(data4['Flood peaks in descending order'])+1)/data4['Order(m)']

    data4['Reduced Variate'] = - \
ln(ln(data4['Return period']/(data4['Return period']-1)))
    data_df = data4[['Return period', 'Flood peaks in descending order']]
    data_df.columns = ['x', 'y']

    ki_ex = data_df['x']  # the original data
    data_df['x'] = data_df['x'].apply(lambda x: (np.log(x))*100)

    linear_regressor = LinearRegression()
    X = data_df['x'].values.reshape(-1, 1)
    Y = data_df['y'].values.reshape(-1, 1)
    returnPeriod = req_data["returnPeriod"]
    # Y = Y[:-1]
    print("X: ", len(Y[:-1]))
    linear_regressor.fit(X[:-1], Y[:-1])
    slope = linear_regressor.coef_ * 100
    intercept = linear_regressor.intercept_
    q_value = slope * ln((int(req_data["returnPeriod"]))) + intercept
    print("The Q value is: ", q_value[0][0]) # test step
    print("Data here...", type(int(req_data["returnPeriod"])))
    
    # q_value = q_value.tolist()
    q_value = np.ndarray.tolist(q_value)
    intercept = np.ndarray.tolist(intercept)
    slope = np.ndarray.tolist(slope)

    # The graph
    fig, ax = plt.subplots(figsize=(20,10))

    Y_Pred = linear_regressor.predict(X[:-1])
    print("Y_Pred: ", Y_Pred)

    returnPeriodColumn = req_data["returnPeriodColumn"]
    # returnPeriodColumn = pd.Series(returnPeriodColumn)
    plt.scatter(returnPeriodColumn[:-1], data_df["y"][:-1])
    plt.semilogx(returnPeriodColumn[:-1], Y_Pred, color="red")
    plt.semilogx(returnPeriodColumn, Y)
    # print(len(returnPeriodColumn)) = 41
    # print(len(Y_Pred)) = 40
    # print(len(data_df["y"])) = 41
    # print(returnPeriodColumn.pop())
    # for i in returnPeriodColumn:
    #     print("i:, ", i)
    # plt.plot(np.unique(returnPeriodColumn), np.poly1d(np.polyfit(returnPeriodColumn, Y_Pred, 1))(np.unique(returnPeriodColumn)))
    ax.xaxis.set_major_formatter(ScalarFormatter())
    plt.ylabel('flood peak in descending')
    plt.xlabel('return period')
    plt.savefig("test44.png")

    return ({"q_value": q_value, "slope": slope, "intercept": intercept})

if __name__ == "__main__":
    app.run(debug=True)