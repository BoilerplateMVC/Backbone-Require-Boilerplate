module.exports = function(grunt) {
  var amdclean = require('amdclean'),
    fs = require('fs'),
    amdclean_logic = function (data) {
      var outputFile = data.path;
      fs.writeFileSync(outputFile, amdclean.clean({
        'code': fs.readFileSync(outputFile),
        'globalObject': true,
        'globalObjectName': 'backbone_require_boilerplate',
        'rememberGlobalObject': false
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
          preserveLicenseComments: false,
          optimize: 'none',
          optimizeCss: 'standard',
          mainConfigFile: 'public/js/app/config/config.js',
          include: ['mobile'],
          out: 'public/js/app/init/MobileInit.min.js',
          onModuleBundleComplete: amdclean_logic
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
          preserveLicenseComments: false,
          optimize: 'none',
          mainConfigFile: 'public/js/app/config/config.js',
          include: ['desktop'],
          out: 'public/js/app/init/DesktopInit.min.js',
          onModuleBundleComplete: amdclean_logic
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
    },
    uglify: {
      desktopJS: {
        files: {
          'public/js/app/init/DesktopInit.min.js': ['public/js/app/init/DesktopInit.min.js']
        }
      },
      mobileJS: {
        files: {
          'public/js/app/init/MobileInit.min.js': ['public/js/app/init/MobileInit.min.js']
        }
      }
    }
  });

  grunt.registerTask('desktopBuild', function() {
    grunt.task.run(['requirejs:desktopJS', 'uglify:desktopJS', 'requirejs:desktopCSS']);
  });

  grunt.registerTask('mobileBuild', function() {
    grunt.task.run(['requirejs:mobileJS', 'uglify:mobileJS', 'requirejs:mobileCSS']);
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-plato');
   
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('complexity:report', 'plato');
  grunt.registerTask('build', ['desktopBuild', 'mobileBuild']);
  grunt.registerTask('default', ['test', 'build', 'complexity:report']);
};