var _browsers = ['Firefox', 'Chrome'];

module.exports = function(config) {
    config.set({
        browsers: _browsers,
        frameworks: ['jasmine', 'sinon'],
        reporters: ['mocha', 'html', 'coverage', 'junit'],
        singleRun: true,
        autoWatch: false,
        autoWatchBatchDelay: 400,
        webpack: {
            resolve : {
                extensions: ['','.js','.jsx']
            },
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules\/(?!@auditr|bd-        stampy).*/,
                        loader: 'babel-loader'
                    }
                ],
                postLoaders: [{
                    test: /\.jsx?$/,
                    exclude: /(node_modules\/(?!@auditr).*|tests)/,
                    loader: 'istanbul-instrumenter'
                }]
            },
            externals: undefined
        },
        webpackServer: {
            noInfo: true
        },
        coverageReporter: {
            dir: process.env.CIRCLE_ARTIFACTS || 'coverage',
            reporters: ['html']
        },
        junitReporter: {
            outputDir: process.env.CIRCLE_TEST_REPORTS || 'junit'
        }
    });
};

