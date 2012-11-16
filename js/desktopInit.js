// desktopInit.js
require.config({

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {
      // Core Libraries
      "modernizr": "../libs/modernizr",
      "less": "../libs/less-1.3.0.min",
      "jquery": "../libs/jquery-1.8.2",
      "underscore": "../libs/lodash",
      "backbone": "../libs/backbone",
      // Require.js Plugins
      "backbone.validateAll": "../plugins/Backbone.validateAll",
      "bootstrap": "../plugins/bootstrap",
      "text": "../plugins/text-2.0.0"
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
      // Twitter Bootstrap jQuery plugins
      "bootstrap": ["jquery"],

      "backbone": {
          "deps": ["underscore", "jquery"],
          "exports": "Backbone"  //attaches "Backbone" to the window object
      },
      // Backbone.validateAll depends on Backbone.
      "backbone.validateAll": ["backbone"]
  },
  waitSeconds: 3    // dev only
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(['modernizr','less','jquery','backbone','routers/desktopRouter','bootstrap','backbone.validateAll'],
        function(Modernizr, Less, $, Backbone, DesktopRouter) {

    new DesktopRouter();

},function( msg){
    console.log( 'REQUIRE TIMEOUT ' + msg);
});