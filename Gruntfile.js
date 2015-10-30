module.exports = function(grunt){
    grunt.initConfig({
        karma: {
            options: {
                configFile: 'tests/karma.conf.js',
                files: ['../**/__karma__/*.js']
            },
            development: {
                singleRun: false,
                autoWatch: true,
            },
            single: {
                singleRun: true
            },
        }
    });
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['karma:single']);
};
