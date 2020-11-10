import pandas as pd
from numpy import log as ln
import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression
import math

import warnings
warnings.filterwarnings('ignore')

sheetName = input('Enter Sheet name: ')
year_number = int(
    input("Enter the number of years you want to get the return period for: "))
# sheetName = sheetName+".xlsx" # test step
# print(sheetName) # test step

data = pd.read_excel(sheetName)

data2 = data.copy()
data2['Order(m)'] = 0
data2.sort_values(by=['FLOOD PEAK'], ascending=False, inplace=True)
data2['Flood peaks in descending order'] = data2['FLOOD PEAK']
data2.drop('FLOOD PEAK', inplace=True, axis=1)

data3 = data2.copy()
data3['Order(m)'] = data3['Flood peaks in descending order'].rank(
    ascending=False)

data4 = data3.copy()
data4['Return period'] = (
    len(data4['Flood peaks in descending order'])+1)/data4['Order(m)']
# print(len(data4['Flood peaks in descending order'])) # test step
data4['Reduced Variate'] = - \
    ln(ln(data4['Return period']/(data4['Return period']-1)))

# print(data4.head()) # test step

data_df = data4[['Return period', 'Flood peaks in descending order']]
# print(data_df.head()) # test step

data_df.columns = ['x', 'y']
# print(data_df.head()) # test step
ki_ex = data_df['x']  # the original data
# converting the values using log
data_df['x'] = data_df['x'].apply(lambda x: (np.log(x))*100)

linear_regressor = LinearRegression()
X = data_df['x'].values.reshape(-1, 1)
Y = data_df['y'].values.reshape(-1, 1)

linear_regressor.fit(X, Y)
# Y_Pred = linear_regressor.predict(X) # the new Y vaues are the ones predicted from the model

# print(linear_regressor.coef_)

slope = linear_regressor.coef_ * 100
intercept = linear_regressor.intercept_

q_value = slope * ln(year_number) + intercept

# print("The Q value is: ", q_value[0][0]) # test step

# ----------------------GENERATE AR VALUE----------------------

breadth = float(input("Enter the breadth: "))
depth = float(input("Enter the depth: "))
z_value = float(input("Enter the Z value: "))

# number_of_iterations = 1000
# ar_value_list = []
# while(number_of_iterations > 1):
#     area = (breadth * depth) + z_value*(depth*depth)
#     # print("Area: ", area)
#     mid = 1 + math.pow(z_value, 2)

#     perimeter = breadth + (2 * depth * (math.pow((mid), 0.5)))
#     # print("Perimeter: ", perimeter)
#     r_value = area / perimeter

#     ar_value = area * math.pow(r_value, (2/3))

#     # print("ar_value: ", ar_value)
#     ar_value_list.append(ar_value)

#     # depth += 0.0026593750000000003
#     depth += 0.0001
#     number_of_iterations -= 1
    
    # the goal is to generate as many ar values as possible, the value that is immeadiately above the qns value will be used
    # add the ar values to an array then 

# ----------------------THE MANNING VALUES----------------------
manning_values = {
    "Asbestos cement": 0.011,
    "Asphalt": 0.016,
    "Brass": 0.011,
    "Brick and cement mortar sewers": 0.015,
    "Canvas": 0.012,
    "Cast or Ductile iron, new": 0.012,
    "Clay tile": 0.014,
    "Concrete - steel forms": 0.011,
    "Concrete (Cement) - finished": 0.012,
    "Concrete - wooden forms": 0.015,
    "Concrete - centrifugally spun": 0.013,
    "Copper": 0.011,
    "Corrugated metal": 0.022,
    "Earth, smooth": 0.018,
    "Earth channel - clean": 0.022,
    "Earth channel - gravelly": 0.025,
    "Earth channel - weedy": 0.030,
    "Earth channel - stony, cobbles": 0.035,
    "Earth channel - pasture, farmland": 0.035,
    "Floodplains - light brush": 0.050,
    "Floodplains - heavy brush": 0.075,
    "Floodplains - trees": 0.15,
    "Galvanised iron": 0.016,
    "Glass": 0.010,
    "Gravel, firm": 0.023,
    "Lead": 0.011,
    "Masonry": 0.025,
    "Metal - corrugated": 0.022,
    "Natural streams - clean and straight": 0.030,
    "Natural streams - major rivers": 0.035,
    "Natural streams - sluggish with deep pools": 0.040,
    "Natural channels, very poor condition": 0.060,
    "Plastic": 0.009,
    "Polythylene PE - Corrugated with smooth inner walls": 0.012, # estimate
    "Polythylene PE - Corrugated with corrugated inner walls": 0.021, # estimate
    "Polyvinyl Chloride PVC - with smooth inner walls": 0.010, # estimate
    "Rubble Masonry": 0.020, # estimate
    "Steel - Coal-tar enamel": 0.010,
    "Steel - smooth": 0.012,
    "Steel - New unlined": 0.011,
    "Steel - Riveted": 0.019,
    "Vitrified clay sewer pipe": 0.014, # estimate
    "Wood - planned": 0.012,
    "Wood - unplaned": 0.013,
    "Wood stave pipe, small diameter": 0.012, #estimate
    "Wood stave pipe, large diameter": 0.013 # estimate
}

# ask the client for height one and height two and the distance between the two....they can also be asked for the direct slope
s_value = float(input("Enter the slope: "))
s_value = s_value / 100
n_value = float(input("Enter the n_value: "))
# h1 = input("Enter h1: ")
# h2 = input("Enter h2: ")
# distance = input("Enter the distance: ")

qns_value = (0.417 * n_value)/math.pow(s_value, 0.5) # ensure you change the 0..417 value above to be the dynamic Q value

print("qns_value = ", qns_value)
 # the minimum value is the 
 # if the difference betwwen the AR(2/3) value and QNS is too large, tell the user to input a lower value of D
 # a change in the D value should be the one 
number_of_iterations = -1000
while(number_of_iterations < 1):
    area = (breadth * depth) + z_value*(depth*depth)
    # print("Area: ", area)
    mid = 1 + math.pow(z_value, 2)

    perimeter = breadth + (2 * depth * (math.pow((mid), 0.5)))
    # print("Perimeter: ", perimeter)
    r_value = area / perimeter # hydraulic radius

    ar_value = area * math.pow(r_value, (2/3))

    # print("ar_value: ", ar_value)
    if(ar_value >= qns_value):
        print("Depth = ", depth)
        print("AR value = ", ar_value)
        # number_of_iterations += 1
        break

    # depth += 0.0026593750000000003
    depth += 0.0001


# for v in ar_value_list:
#     if(v >= qns_value):
#         print("the AR value is: ", v)
#         break