module.exports = function(grunt){
    grunt.initConfig({
        mochaTest: {
            options: {
                require: './tests/mocha-setup.js',
                reporter: 'spec',
                captureFile: 'results.txt', // Optionally capture the reporter output to a file
                quiet: false, // Optionally suppress output to standard out (defaults to false)
                clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['**/__test__/*.js']
        }
    });
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['mochaTest']);
};
