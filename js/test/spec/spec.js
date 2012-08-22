define(['jquery','backbone','views/view','views/anotherView','models/model','jasminejquery'], function($, Backbone, MainView, AnotherView, Model) {

    // First Test Suite that contains all of the app's tests
    describe('Backbone-Require-Boilerplate (BRB)', function () {

        // Backbone Views Suite: contains all tests related to views
    	describe("Backbone Views", function() {

            // Runs before every View spec
    	    beforeEach(function() {

                // Puts the app's template in the DOM
    		    setFixtures("<script id='example' type='text/template'><h1>Your Template says:</h1><h3 class='example'><%= model.message %></h3></script>");

                // Creates a new MainView instance
                this.mainView = new MainView();

                // Creates a new AnotherView instance
                this.anotherView = new AnotherView();

    	    });

            it("should create an template property using the model's message property", function() {

                expect(this.mainView.template).toEqual("<h1>Your Template says:</h1><h3 class='example'>You are now using jQuery, Backbone, Lodash, Require, Modernizr, and Jasmine! (Click Me)</h3>");

            });

            it("should add a promptUser method to the view that extended the main view", function() {

                expect(this.anotherView.promptUser).toBeDefined();

            });

        }); // End of the Backbone Views test suite

        // Backbone Models Suite: contains all tests related to models
        describe("Backbone Models", function() {

            // Runs before every Model spec
            beforeEach(function() {

                // Creates a new Model instance
                this.model = new Model();

                // We are spying on the _validate method to see if it gets called
                spyOn(Model.prototype, "_validate").andCallThrough();

            });

            it("should create a message attribute", function() {

                expect(this.model.get("message")).toBeDefined();

            });

            it("should call the validate method when setting a property", function() {

            	this.model.set({ test: "test" });

                expect(Model.prototype._validate).toHaveBeenCalled();

            });

        }); // End of the Backbone Views test suite

    }); // End of the Backbone test suite

});