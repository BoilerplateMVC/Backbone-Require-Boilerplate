// IconView.js
// -----------
define(["jquery", "backbone"],

    function($, Backbone){

        var IconsView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".icons",

            // View constructor
            initialize: function() {

                this.$el.find(".icon").popover({ trigger: "hover" });

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return IconsView;

    }

);