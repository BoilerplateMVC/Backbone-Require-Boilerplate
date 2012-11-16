//  desktopRouter.js
define(["jquery","backbone","models/UserModel", "views/UserView","collections/UsersCollection",'views/view', 'views/anotherView','text!templates/desktopMain.html'],
        function($, Backbone, UserModel, UserView, UsersCollection, MainView, AnotherView, template){

    $('#contentAttachPoint').html( template);

    var Router = Backbone.Router.extend({

        initialize: function() {
            console.log( 'desktopRouter initialize');
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },

        // All of your Backbone Routes (add more)
        routes: {
            // When there is no hash bang on the url, the home method is called
            "": "home",
            "ver1": "_ver1"
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

        },
        _ver1: function() {
            // Instantiating mainView and anotherView instances
            var mainView = new MainView(),
                anotherView = new AnotherView();

            // Renders the mainView template
            mainView.render();

            // anotherView.js extends view.js.  anotherView.js does not have a promptUser method, so JavaScript looks up the prototype chain and uses the view.js promptUser method instead.
            anotherView.promptUser();
        }
    });

    // Returns the Router class
    return Router;

});