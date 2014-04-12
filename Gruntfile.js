module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'public/js/app/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    exec : {
        test: {
          command: "mkdir -p shippable/testresults && XUNIT_FILE=shippable/testresults/result.xml ./node_modules/mocha/bin/_mocha --timeout 5000 --reporter=xunit-file --recursive tests/node"

        },
        coverage : {
          command : "./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --timeout 5000 --recursive tests/node && ./node_modules/.bin/istanbul report cobertura --dir  shippable/codecoverage"
        },
        clean : {
          command : "rm -Rf coverage shippable"
        }
    }

  });
  grunt.registerTask('default', ['exec:clean','karma','exec:test','exec:coverage','jshint']);
};
