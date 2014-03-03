module.exports = function(config) {
    config.set({
        basePath: './',

        files: [
            'public/js/lib/angular/angular.js',
            'public/js/bootstrap/js/ui-bootstrap-tpls-0.10.0.min.js',
            'public/js/lib/underscore-min.js',
            'public/js/lib/ansi_up.js',
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
        preprocessors : { 'public/js/app/**/*.js' : 'coverage' },

        autoWatch: false,
        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-junit-reporter',
            'karma-jasmine',
            'karma-coverage',
            'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],
        logLevel: config.LOG_DEBUG,
        junitReporter: {
            outputFile: 'shippable/testresults/unit.xml',
            suite: ''
        },

        reporters : ['progress','coverage','junit'],
        coverageReporter : {
            type:'cobertura',
            dir: 'shippable/codecoverage/',
            file: 'angular_coverage.xml'
        }

    })
}
