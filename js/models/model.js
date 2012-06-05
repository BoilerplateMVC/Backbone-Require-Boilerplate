define(['jquery', 'backbone'], function($, Backbone) {

    var Model = Backbone.Model.extend({

            defaults: {
	            message: "You are now using Backbone, Lodash, Require, Modernizr, and jQuery! (Click Me)"
	        },

            // Model Constructor
            initialize: function() {

            },

            // Any time a model attribute is set, this method is called
            validate: function(attrs) {

            }

    });

    // Returns the entire model (allows you to use your model in a different module)
    return Model;

});