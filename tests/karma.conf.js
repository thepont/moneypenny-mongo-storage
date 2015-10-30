var _browsers = ['Firefox', 'Chrome'];

module.exports = function(config) {
    config.set({
        browsers: _browsers,
        frameworks: ['jasmine', 'sinon'],
        reporters: ['mocha', 'html', 'coverage', 'junit'],
        singleRun: true,
        autoWatch: false,
        autoWatchBatchDelay: 400
//        coverageReporter: {
//            dir: process.env.CIRCLE_ARTIFACTS || 'coverage',
//            reporters: ['html']
//        },
//        junitReporter: {
//            outputDir: process.env.CIRCLE_TEST_REPORTS || 'junit'
//       }
    });
};

