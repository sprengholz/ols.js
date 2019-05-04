# ols.js
ols.js provides a Javascript implementation for ordinary least squares (OLS) regressions. It calculared test statistics, p-values, standard errors and the coefficient of determination (R²) for a given set of predictors X and a dependent variable y.
## Usage
ols.js requires two additional libraries:
- [math.js](https://github.com/josdejong/mathjs) (for matrix calculations)
- [jstat.js](https://github.com/jstat/jstat) (for significance testing)

After importing them, you need to create arrays holding the X and y values. If you want to include a constant intercept, provide it using a column of ones. For instance, if there are two predictors and 7 measurements, X should include 3 columns and 7 rows:
```javascript
X = math.matrix([
      [1, 41.9, 29.1],
      [1, 43.4, 29.3],
      [1, 43.9, 29.5],
      [1, 44.5, 29.7],
      [1, 47.3, 29.9],
      [1, 47.5, 30.3],
      [1, 47.9, 30.5]
    ]);

y = math.matrix([
      [251.3],
      [251.3],
      [248.3],
      [267.5],
      [273.0],
      [276.5],
      [270.3]
    ])
```
Calculate the regression by instantiating ols with both X and y:
```javascript
const result = new ols(X, y);
```
Afterwards you can access the results by calling the respective functions for beta estimates, standard errors, t- and p-values as well as the coefficient of determination.
```javascript
//each returning an array of numbers
betaEstimates = result.getBetaEstimates();
tStats = result.getTStats());
pValues = result.getPValues());
stdErrors = result.getStdErrors());

//returning a single number
R2  = result.getR2());
```
