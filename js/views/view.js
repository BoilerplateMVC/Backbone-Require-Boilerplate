define(['jquery', 'backbone','models/model', 'text!templates/main.html'], function($, Backbone, Model, template){

    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: 'body',

        // View constructor
        initialize: function() {

            // Setting the view's model property to the passed in model
            this.model = new Model();

            // Setting the view's template property
            this.template = _.template( template, { model: this.model.toJSON() } );

        },

        events: {

            "click #example": "promptUser"

	    },

        render: function() {

            this.$el.find("#example").append(this.template);

        },

        promptUser: function() {

            prompt("Isn't this amazing?", "Yes, yes it is");

        }

    });
	
    // Returns the View class
    return View;
});