define(['jquery', 'backbone'], function($, Backbone) {

    var Model = Backbone.Model.extend({

            defaults: {
	            message: "I'm the model message."
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