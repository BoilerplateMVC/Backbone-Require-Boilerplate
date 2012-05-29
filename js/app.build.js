//Install node.js, navigate to the js folder, and then run this command: "node r.js -o app.build.js"
({

  // Creates a js-optimized folder at the same folder level as your "js" folder and places the optimized project there
  dir: "../js-optimized",

  // 3rd party script alias names
  paths: {

    // Core Libraries
    modernizr: "libs/modernizr-2.5.3",
    jquery: "libs/jquery-1.7.2",
    underscore: "libs/lodash-0.2.1",
    backbone: "libs/backbone-0.9.2",

    // Require.js Plugins
    use: "plugins/use-0.3.0",
    text: "plugins/text-2.0.0"

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

  }, // end Use.js Configuration

  // Modules to be optimized:
  modules: [

    {
      name: "mobile"
    },

    {
      name: "desktop"
    }
  ]

})