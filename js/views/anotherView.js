define(['jquery', 'backbone','models/model', 'views/view'], function($, Backbone, Model, view){

    // This view class shows how you can extend another Backbone view (or any other Backbone class for that matter)

    //Extending
    var AnotherView = view.extend({

        el: "body",

        // View constructor
        initialize: function() {

            //Setting the view's model property to the passed in model
            this.model = Model;

        },

        events: {

        }

    });
	
    // Returns a new view instance (allows you to use your view in a different module)
    return AnotherView;
});