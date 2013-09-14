var tests = [];
for (var file in window.__karma__.files) {
    if (/.spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: 'base/app',

    paths: {

      // Core Libraries
      // --------------
      "jquery": "../libs/jquery",

      "jqueryui": "../libs/jqueryui",

      "jquerymobile": "../libs/jquery.mobile",

      "underscore": "../libs/lodash",

      "backbone": "../libs/backbone",

      // Plugins
      // -------
      "backbone.validateAll": "../libs/plugins/Backbone.validateAll",

      "bootstrap": "../libs/plugins/bootstrap",

      "text": "../libs/plugins/text",

      "jasminejquery": "../libs/plugins/jasmine-jquery"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // jQuery Mobile
      "jquerymobile": ["jquery"],

      // Twitter Bootstrap jQuery plugins
      "bootstrap": ["jquery"],

      // jQueryUI
      "jqueryui": ["jquery"],

      // Backbone
      "backbone": {

        // Depends on underscore/lodash and jQuery
        "deps": ["underscore", "jquery"],

        // Exports the global window.Backbone object
        "exports": "Backbone"

      },

      // Backbone.validateAll plugin that depends on Backbone
      "backbone.validateAll": ["backbone"],

      // Jasmine-jQuery plugin
      "jasminejquery": ["jquery"]

    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

