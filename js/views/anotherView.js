define(['jquery', 'backbone','models/model', 'views/view'], function($, Backbone, Model, MainView){

    // This view class shows how you can extend another Backbone view (or any other Backbone class for that matter)

    //Extending the mainView
    var AnotherView = MainView.extend({

        events: {

        }

    });
	
    // Returns a new view instance (allows you to use your view in a different module)
    return AnotherView;
});