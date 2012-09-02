define(['jquery','backbone','models/UserModel', 'views/UserView','collections/UsersCollection'], function($, Backbone, UserModel, UserView, UsersCollection){

    var Router = Backbone.Router.extend({

        initialize: function(){
        
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // All of your Backbone Routes (add more)
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home"

        },

        home: function() {

            // Creates a new Model instance and sets default values
            var user = new UserModel().set({ "firstname": "Greg", "lastname": "Franko", "email": "example@gmail.com", "phone": "703-243-7371" }),

                // Creates a new Collection instance (Adds the previous Model instance to the Collection)
                users = new UsersCollection([user]),

                // Instantiating the mainView instance
                mainView = new UserView({

                    // Declares the View's collection instance property
                    collection: users

                });

            // Renders all of the User Model's to the page
            mainView.render();

        }

    });

    // Returns the Router class
    return Router;

});