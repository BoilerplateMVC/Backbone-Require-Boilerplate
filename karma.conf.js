// Karma configuration
module.exports = function (config) {
    
    config.set({

        //SET PHANTOMJS_BIN=<local_phantom_location>\phantomjs.exe
        
        // base path, that will be used to resolve files and exclude
        basePath: 'public/js',

        frameworks: ["jasmine", "requirejs"],
        // list of files / patterns to load in the browser
        files: [

	      { pattern: 'libs/**/*.js', included: false },
	      { pattern: 'app/**/*.js', included: false },
	      { pattern: 'app/**/*.html', included: false },
	      { pattern: 'test/specs/**/*.js', included: false },

	      'test/test-main.js',
	    ],

        preprocessors: {
            'app/**/*.js': 'coverage'
        },

        // list of files to exclude
        exclude: [
		    'app/init/DesktopInit.min.js'
	    ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: '../../coverage/'
        },

        // web server port
        port: 9876,


        // cli runner port
        runnerPort: 9100,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 90000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
