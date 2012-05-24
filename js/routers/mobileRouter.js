define(['jquery','use!backbone','views/view'], function($, Backbone, mainView){

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
        }
    });

    return Router;
});