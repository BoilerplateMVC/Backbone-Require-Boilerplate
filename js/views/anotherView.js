define(['jquery', 'backbone','models/model', 'views/view'], function($, Backbone, Model, view){

    // This view class shows how you can extend another Backbone view (or any other Backbone class for that matter)

    var self,

    //Extending
    anotherView = view.constructor.extend({

        el: "body",

        // View constructor
        initialize: function() {

            //Storing the view context
            self = this;

            //Setting the view's model property to the passed in model
            this.model = new Model({
                message: "You are now using Backbone, Lodash, Require, Modernizr, and jQuery! (Click Me)"
            });

        },

        events: {

        }

    });
	
    // Returns a new view instance (allows you to use your view in a different module)
    return new anotherView();
});