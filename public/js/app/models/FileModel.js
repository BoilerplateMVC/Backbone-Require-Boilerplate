// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var FileModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {

            },

            defaults: {

                content: ""

            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return FileModel;

    }

);