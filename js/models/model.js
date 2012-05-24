define(['jquery', 'use!backbone'], function($, Backbone) {

    var self,
        model = Backbone.Model.extend({

        // Model Constructor
        initialize: function() {

            //Storing the model context
            self = this;
        },

        // Any time a model attribute is set, this method is called
        validate: function(attrs) {

        }

    });

    // Returns the entire model (allows you to use your model in a different module)
    return model;

});