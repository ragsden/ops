module.exports = function(config) {
    config.set({
        basePath: './',

        files: [
            'public/js/lib/angular/angular.js',
            'public/js/lib/angular/angular-*.js',
            'public/js/app/**/*.js',
            'public/js/lib/angular/angular-mocks.js',
            'tests/angular/**/*.js',
            'node_modules/should/should.js'
        ],

        exclude: [
            'public/js/lib/angular/angular-loader.js',
            'public/js/lib/angular/*.min.js',
            'public/js/lib/angular/angular-scenario.js'
        ],

        autoWatch: false,
        singleRun: true,

        frameworks: ['mocha'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-junit-reporter',
            'karma-mocha',
            'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],

        junitReporter: {
            outputFile: 'shippable/testresults/unit.xml',
            suite: ''
        }

    })
}