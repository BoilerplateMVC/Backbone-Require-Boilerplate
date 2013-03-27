module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      mobile: {
        options: {
          baseUrl: "public/js/",
          paths: {
            "mobile": "app/config/MobileInit"
          },
          wrap: true,
          name: "libs/almond/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/app/config/MobileInit.js",
          include: ["mobile"],
          out: "public/js/app/config/MobileInit.min.js"
        }
      },
      desktop: {
        options: {
          baseUrl: "public/js/",
          paths: {
            "desktop": "app/config/DesktopInit"
          },
          wrap: true,
          name: "libs/almond/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/app/config/DesktopInit.js",
          include: ["desktop"],
          out: "public/js/app/config/DesktopInit.min.js"
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/js/app/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },
    /*
    // Still working on this
    jasmine: {
      src : 'public/js/app/*.js',
      options : {
        specs : 'js/test/specs/spec.js'
      }
    },*/
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'requirejs:desktop', 'requirejs:mobile']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('test', [
    'jshint', 
    //'jasmine'
    ]);
  grunt.registerTask('build', ['jshint', 'requirejs:desktop', 'requirejs:mobile']);

};