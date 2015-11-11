module.exports = function(grunt){
    grunt.initConfig({
//        mochaTest: {
//            test: {
//                options: {
//                    require: './tests/blanket',
//                    reporter: 'spec',
//                    quiet: false, // Optionally suppress output to standard out (defaults to false)
//                },
//                src: ['**/__test__/*.js']
//            },
//            coverage:{
//                options : {
//                    require: './tests/bable-setup.js',
//                    reporter: 'html-cov',
//                    quiet: false,
//                    captureFile: 'coverage.html'
//                },
//                src: ['**/__test__/*.js']
//            }
//        }
        mocha_istanbul: {
            target : {
                options : {
                    dryRun: true,
                    ui: true,
                    scriptPath: require.resolve('babel-istanbul'),
                    istanbulOptions: '--use-babel-runtime',
                    require: './tests/bable-setup.js'
                    //mochaOptions: '--require ./tests/bable-setup.js' 
                }
            },
            coverage: {
                src: ['**/__test__/*.js'], 
                options : {
                    dryRun: false,
                    coverageFolder: 'coverage',
                    root: './app/auth-server',
                    excludes: ['**/__test__/*.js'],
                    print: 'detail',
                    //scriptPath: require.resolve('babel-istanbul'),
                    //istanbulOptions: ['--use-babel-runtime'],
                    //mochaOptions: ['require ./tests/bable-setup.js'],
                    require: './tests/bable-setup.js',
                    recursive: true
                    // reportFormats:  ['lcov', 'html'] 
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.registerTask('test', ['mocha_istanbul:coverage']);
};


