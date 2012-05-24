define(['jquery', 'use!backbone','models/model', 'text!templates/main.html'], function($, Backbone, Model, template){

    var self,

	view = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: 'body',

        // View constructor
        initialize: function() {

            //Storing the view context
            self = this;

            //Setting the view's model property to the passed in model
            this.model = new Model({
                message: "You are now using Backbone, Require, Modernizr, and jQuery! (Click Me)"
            });

            this.template = _.template( template, { model: this.model.toJSON() } );

        },

        events: {
            "click #example": "promptUser"
	    },

        render: function() {

            self.$el.find("#example").append(self.template);

        },

        promptUser: function() {
            prompt("Isn't this amazing?", "Yes, yes it is");
        }

    });
	
    // Returns the entire view (allows you to use your view in a different module)
    return new view();
});