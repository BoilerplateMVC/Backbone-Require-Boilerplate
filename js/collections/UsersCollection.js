define(["jquery","backbone","models/UserModel"], function($, Backbone, User) {

    var Users = Backbone.Collection.extend({

        model: User

    });

    // Returns the Model class
    return Users;

});