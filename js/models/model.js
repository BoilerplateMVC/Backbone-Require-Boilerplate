define(['jquery', 'backbone'], function($, Backbone) {

    var Model = Backbone.Model.extend({

            defaults: {
	            message: "You are now using jQuery, Backbone, Lodash, Require, Modernizr, and Jasmine! (Click Me)"
            },

            // Model Constructor
            initialize: function() {

            },

            // Any time a model attribute is set, this method is called
            validate: function(attrs) {

            }

    });

    // Returns the Model class
    return Model;

});