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
          name: "libs/almond",
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
          name: "libs/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/app/config/DesktopInit.js",
          include: ["desktop"],
          out: "public/js/app/config/DesktopInit.min.js"
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', [
    'jshint'
  ]);
  grunt.registerTask('build', ['requirejs:desktop', 'requirejs:mobile']);

};