---
title: "Impact of Missing Data on Petrophysical Regression-Based Machine Learning Model Performance"
authors: "McDonald, A."
year: 2022
venue: "SPWLA 63rd Annual Logging Symposium"
type: "conference"
doi: "10.30632/SPWLA-2022-0125"
url: "https://www.researchgate.net/publication/361314163_Impact_of_Missing_Data_on_Petrophysical_Regression-Based_Machine_Learning_Model_Performance"
abstract: |
    Within the oil and gas industry, large volumes of data are gathered daily and will continue to grow into the future as technology develops. The quality of the data gathered has wide-ranging consequences that can impact future exploration, development, reserves estimation, and key financial decisions. Therefore, it is crucial that the data being used within petrophysical data driven machine learning models is of a high standard and free from invalid data. If poor quality data is fed into an algorithm, the output may be severely impacted in terms of statistical bias, and a reduction in accuracy and precision.

    Missing data is one of the most common issues faced when working with well log data sets. Gaps within logging curves can occur for a multitude of reasons: intermittent tool failure, complete tool failure, tool offsets recording data at different depths, and bad data being manually removed by interpreters. It is a common practice to either drop depth levels (listwise deletion) containing missing values or impute the values from empirical relationships or from machine learning models that have been developed using offset wells. Removal of depth levels containing missing values can reduce the amount of information available for training and validating data-driven machine learning algorithms. Imputation of values can introduce bias and impact the statistical distribution of the data.

    This study discusses the main causes behind missing data within well logs and the potential solutions that have been widely adopted within the data science and machine learning domains. To evaluate the impact of missing data on machine learning models, three commonly used algorithms, namely support vector regression, random forests, and artificial neural networks, were adopted for the prediction of bulk density. To understand the performance of the selected algorithms to missing data, the models were evaluated on a fixed test dataset and the training dataset was reduced in 10% increments to simulate varying levels of missing data.

    As the training dataset size is reduced, the performance of all three algorithms worsens, with results from the artificial neural network model being the most impacted and most variable. Results from the random forest algorithm were the least impacted and remained the most stable under decreasing training dataset size.
---
