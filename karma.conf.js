module.exports = function(config) {
    config.set({
        basePath: './',

        files: [
            'public/js/lib/angular/angular.js',
            'public/js/lib/angular/angular-*.js',
            'public/js/lib/angular/angular-mocks.js',
            'public/js/app/**/*.js',
            'tests/angular/**/*.js'
        ],

        exclude: [
            'public/js/lib/angular/angular-loader.js',
            'public/js/lib/angular/*.min.js',
            'public/js/lib/angular/angular-scenario.js'
        ],

        autoWatch: false,
        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-junit-reporter',
            'karma-jasmine',
            'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],
        logLevel: config.LOG_DEBUG,
        junitReporter: {
            outputFile: 'shippable/testresults/unit.xml',
            suite: ''
        }

    })
}