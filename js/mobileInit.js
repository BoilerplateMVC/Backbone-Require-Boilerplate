// mobileInit.js
require.config({
  
  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  paths: {

      // Core Libraries
      "modernizr": "../libs/modernizr",
      "jquery": "../libs/jquery-1.8.2",
      "jquery.mobile": "../libs/jquery.mobile-1.2.0",
      "bootstrap": "../plugins/bootstrap",
      "underscore": "../libs/lodash",
      "backbone": "../libs/backbone",
      "iscroll": "../libs/iscroll-lite4.2",
      "backbone.validateAll": "../plugins/Backbone.validateAll",
      // Require.js Plugins
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
require(['modernizr','jquery','jquery.mobile','backbone','iscroll','routers/mobileRouter','bootstrap','backbone.validateAll'],
        function(Modernizr, $, JqueryMobile, Backbone, iScroll, MobileRouter) {

    new MobileRouter();

},function( msg){
    console.log( 'REQUIRE TIMEOUT ' + msg);
});