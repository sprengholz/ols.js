/*
 * http://reliawiki.org/index.php/Multiple_Linear_Regression_Analysis
 * http://econ.rutgers.edu/paczkows/ecmt322/OLSExamples.pdf
 * Wikipedia for beta and r2 calculation
 * http://www.talkstats.com/threads/need-some-help-calculating-standard-error-of-multiple-regression-coefficients.5056/
 */

class ols {

    constructor (X, y) {
        
        // estimate betas
        
        var X_T = math.transpose(X);
        var gramian = math.multiply(X_T, X);
        var gramian_inv = math.inv(gramian);
        var moment = math.multiply(X_T, y)

        var beta_est = math.multiply(gramian_inv, moment);

        // store estimates

        this.beta_est = [];
        beta_est.forEach(be => {
            this.beta_est.push(math.round(be, 3));
        });
    

        // calculate and store R²
        
        var y_est = math.multiply(X, beta_est);
        var y_mean = math.mean(y);
        var var_explained = math.sum(math.square(math.subtract(y_est, y_mean)));
        var var_total = math.sum(math.square(math.subtract(y, y_mean)));

        this.r2 = var_explained/var_total;
        this.r2 = math.round(this.r2, 3);


        // calculate and store t statistics and p values (test if betas differ significantly from 0)

        var n = math.size(X).valueOf()[0];
        var p = math.size(X).valueOf()[1];
        var mse = 1 / (n-p) * math.sum(math.square(math.subtract(y, y_est)));
        var se = math.transpose(math.sqrt(math.diag(math.multiply(mse, gramian_inv))));
        se = math.resize(se, [p, 1]); // sequence to matrix form for further calculations
        this.stdErrors = [];
        se.forEach(stdError => {
            this.stdErrors.push(math.round(stdError, 3));
        });
        var t = math.dotDivide(beta_est, se);
        var df = n - p;
        this.pValues = [];
        this.tStats = [];
        t.forEach(tStat => {
            this.tStats.push(math.round(tStat, 3));
            var cdf = jStat.studentt.cdf(Math.abs(tStat), df);
            var pValue = 2 * (1 - cdf);
            this.pValues.push(math.round(pValue, 4));
        });        
    }

    getBetaEstimates() {
        return this.beta_est;
    }

    getR2(){
        return this.r2;
    }

    getTStats(){
        return this.tStats;
    }

    getPValues(){
        return this.pValues;
    }

    getStdErrors(){
        return this.stdErrors;
    }
}