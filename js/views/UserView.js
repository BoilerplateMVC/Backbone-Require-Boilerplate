define(['jquery', 'backbone','models/UserModel'], function($, Backbone, UserModel){

    var View = Backbone.View.extend({

        el: "section#main",

        // View constructor
        initialize: function() {

            // Setting the view's template property
            this.template = _.template( $("#example").html(), { users: this.collection } );

            // The render method is called when Models are added or removed to the Collection
            this.collection.on("add remove", this.render, this);

            // Twitter Bootstrap Modal Logic
            $("#myModal").on("hidden", function() {
  
                // Reset's the form input fields
                $("form#createUser input").val("");

                // Clear's any error messages
                $(".errors").empty();

            });

        },

        // Event Handlers
        events: {

            "mouseenter tr": "showRemoveOption",

            "mouseleave tr": "hideRemoveOption",

            "click .icon-remove": "removeUser",

            "click #create": "addUser"

        },

        // Renders all of the User models on the UI
        render: function() {

            // Setting the view's template property
            this.template = _.template( $("#example").html(), { users: this.collection } );

            this.$el.find("#model tbody").html(this.template);

            return this;

        },

        // Creates a new User model, validates the model, and adds it to the users Collection
        addUser: function() {

            var user = new UserModel();

            user.set({ "firstname": $("#firstname").val(), "lastname": $("#lastname").val(), "email": $("#email").val(), "phone": $("#phone").val() }, {error: function(obj, error) {

                $(".errors").text(error.error);

                $("#" + error.field).focus();

            }});

            if(user.isValid()) {

                this.collection.add(user);

                $("#myModal").modal("hide");

            }

        },

        // Removes a user from the users Collection
        removeUser: function(event) {

            var id = $(event.currentTarget).closest("tr").attr("data-id");

            this.collection.remove(this.collection.at(id));

        },

        // Makes the close icon visible
        showRemoveOption: function(event) {

            $(event.currentTarget).find(".icon-remove").show();

        },

        // Hides the close icon visible
        hideRemoveOption: function(event) {

            $(event.currentTarget).find(".icon-remove").hide();

        }

    });
	
    // Returns the View class
    return View;
});