// TestInit.js
require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {

    // Core Libraries
    // --------------
    "jquery": "libs/jquery",

    "jquerymobile": "libs/jquery.mobile",

    "underscore": "libs/lodash",

    "backbone": "libs/backbone",

    // Plugins
    // -------
    "backbone.validateAll": "libs/plugins/Backbone.validateAll",

    "bootstrap": "libs/plugins/bootstrap",

    "text": "libs/plugins/text",

    "jasminejquery": "libs/plugins/jasmine-jquery",

    // Application Folders
    // -------------------
    "collections": "app/collections",

    "models": "app/models",

    "routers": "app/routers",

    "templates": "app/templates",

    "views": "app/views"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

    // Twitter Bootstrap jQuery plugins
    "bootstrap": ["jquery"],

    // Jasmine-jQuery plugin
    "jasminejquery": ["jquery"],

    // jQuery Mobile
    "jquerymobile": ["jquery"],

    // Backbone
    "backbone": {

      // Lists jQuery and Underscore as dependencies
      "deps": ["underscore", "jquery"],

      // Exports the global 'window.Backbone' object
      "exports": "Backbone"

    },

    // Backbone.validateAll depends on Backbone
    "backbone.validateAll": ["backbone"]

  }

});