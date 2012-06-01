define(['jquery','backbone','views/view', 'views/anotherView'], function($, Backbone, mainView, anotherView){

    var self,
        Router = Backbone.Router.extend({

        initialize: function(){
           
        Backbone.history.start();
            self = this;

        },

        routes: {

            '': 'home'

        },

        'home': function(){

            // Renders the mainView template
            mainView.render();

            // anotherView.js extends view.js.  anotherView.js does not have a promptUser method, so looks up the prototype chain and uses the view.js promptUser method instead.
            anotherView.promptUser();
        }
    });

    return Router;
});