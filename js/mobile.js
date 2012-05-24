// Sets the require.js configuration for your application.
require.config({
  
  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  paths: {

    // Core Libraries
    modernizr: "libs/modernizr-2.5.3.min",
    jquery: "libs/jquery-1.7.2.min",
    underscore: "libs/lodash-0.2.0.min",
    backbone: "libs/backbone-0.9.2.min",

    // Require.js Plugins
    use: "plugins/use-0.3.0.min",
    text: "plugins/text-1.0.8.min"

  },

  // Sets the use.js configuration for your application
  use: {

    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"  //attaches "Backbone" to the window object
    },

    underscore: {
      attach: "_" //attaches "_" to the window object
    }

  } // end Use.js Configuration
  
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(['modernizr','jquery','use!backbone','routers/mobileRouter'], function(Modernizr, $, Backbone, Mobile) {

	// Instantiates a new Router
    this.router = new Mobile();
});