define(['jquery', 'backbone','models/model'], function($, Backbone, Model){

    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: 'body',

        // View constructor
        initialize: function() {

            // Setting the view's model property to the passed in model
            this.model = new Model();

            // Setting the view's template property
            this.template = _.template( $("#example").html(), { model: this.model.toJSON() } );

        },

        events: {

            "click .example": "promptUser"

	    },

        render: function() {

            this.$el.append(this.template);

        },

        promptUser: function() {

            prompt("Isn't this amazing?", "Yes, yes it is");

        }

    });
	
    // Returns the View class
    return View;
});