module.exports = function(grunt) {
  var amdclean = require('amdclean'),
    fs = require('fs'),
    amdcleanLogic = function (data) {
      var outputFile = data.path;
      fs.writeFileSync(outputFile, amdclean.clean({
        'code': fs.readFileSync(outputFile),
        'globalObject': true,
        'globalObjectName': 'BRB',
        'rememberGlobalObject': false,
        'removeModules': ['text'],
        'prefixTransform': function(moduleName) {
          return moduleName.substring(moduleName.lastIndexOf('_') + 1, moduleName.length);
        },
        'wrap': {
          'start': '(function() {\n',
          'end': '\n}());'
        }
      }));
    };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      mobileJS: {
        options: {
          baseUrl: 'public/js/app',
          paths: {
            'mobile': 'init/MobileInit'
          },
          wrap: true,
          // name: "../libs/almond",
          onModuleBundleComplete: amdcleanLogic,
          preserveLicenseComments: false,
          optimize: 'uglify',
          optimizeCss: 'standard',
          mainConfigFile: 'public/js/app/config/config.js',
          include: ['mobile'],
          out: 'public/js/app/init/MobileInit.min.js'
        }
      },
      mobileCSS: {
        options: {
          optimizeCss: 'standard',
          cssIn: './public/css/mobile.css',
          out: './public/css/mobile.min.css'
        }
      },
      desktopJS: {
        options: {
          baseUrl: 'public/js/app',
          paths: {
            'desktop': 'init/DesktopInit'
          },
          wrap: true,
          // name: "../libs/almond",
          onModuleBundleComplete: amdcleanLogic,
          preserveLicenseComments: false,
          optimize: 'uglify',
          mainConfigFile: 'public/js/app/config/config.js',
          include: ['desktop'],
          out: 'public/js/app/init/DesktopInit.min.js'
        }
      },
      desktopCSS: {
        options: {
          optimizeCss: 'standard',
          cssIn: './public/css/desktop.css',
          out: './public/css/desktop.min.css'
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
    },
    plato: {
      your_task: {
        options : {
            exclude: /\.min\.js$/    // excludes source files finishing with ".min.js"
        },
        files: {
            'public/reports': ['public/js/app/**/*.js']
        }
      }
    }
  });

  grunt.registerTask('desktopBuild', function() {
    grunt.task.run(['requirejs:desktopJS', 'requirejs:desktopCSS']);
  });

  grunt.registerTask('mobileBuild', function() {
    grunt.task.run(['requirejs:mobileJS', 'requirejs:mobileCSS']);
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-plato');
   
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('minify', ['requirejs:desktopJS', 'requirejs:mobileJS']);
  grunt.registerTask('complexity:report', 'plato');
  grunt.registerTask('build', ['desktopBuild', 'mobileBuild']);
  grunt.registerTask('default', ['test', 'build', 'complexity:report']);
};