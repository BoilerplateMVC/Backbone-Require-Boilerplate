define(['jquery','backbone','views/view', 'views/anotherView'], function($, Backbone, MainView, AnotherView){

    var Router = Backbone.Router.extend({

        initialize: function(){
           
        Backbone.history.start();

        },

        routes: {

            '': 'home'

        },

        'home': function(){

            // Instantiating mainView and anotherView instances
            var mainView = new MainView(),
                anotherView = new AnotherView();

            // Renders the mainView template
            mainView.render();

            // anotherView.js extends view.js.  anotherView.js does not have a promptUser method, so looks up the prototype chain and uses the view.js promptUser method instead.
            anotherView.promptUser();
        }
    });

    return Router;
});