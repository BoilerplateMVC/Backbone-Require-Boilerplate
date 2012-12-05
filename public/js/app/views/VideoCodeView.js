// VideoCodeView.js
// ----------------
define(["jquery", "backbone", "collections/FilesCollection"],

    function($, Backbone, FilesCollection){

        var VideoView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".videocodecontainer",

            // View constructor
            initialize: function() {

                var self = this;

                prettyPrint();

                self.setupPopcorn();

                // Calls the view's render method
                this.render();

                self.collection.on("fetched", function(model) {

                    $(".videocode").html(model.content);

                    $(".videocode").show();

                    prettyPrint();

                });

                $(".video-button").on("click", function(e) {

                    e.preventDefault();

                    // Animates the html and body element scrolltops
                    $("html, body").animate({

                        // Sets the jQuery `scrollTop` to the top offset of the HTML div tag that matches the current list item's `data-unique` tag
                        "scrollTop": $(".videooverview").offset().top
                        
                    }, {

                        // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                        "duration": 1500

                    });

                });

                $(".btn-group .btn").on("click", function() {

                    if(self.popcorn.currentTime() === 0) {

                        self.popcorn.play();

                    }

                    self.popcorn.play($(this).attr("data-time"));

                });

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                //prettyPrint();

                // Maintains chainability
                return this;

            },

            setupPopcorn: function() {

                var self = this;

                self.popcorn = Popcorn.youtube("#video", "http://www.youtube.com/watch?v=5zCex8-ge-k");

                _.each(self.code, function(rule, iterator) {

                    rule = _.extend(rule, { view: self, iterator: iterator });

                    self.popcorn.code(rule);

                });


            },

            code: [

                {

                    name: "index.html",

                    start: 436,
 
                    end: 845,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["index.html"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "MobileInit.js",

                    start: 845,
 
                    end: 1187,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["MobileInit.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "View.js",

                    start: 1187,
 
                    end: 1397,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["View.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "heading.html",

                    start: 1397,
 
                    end: 1479,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["heading.html"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "View.js",

                    start: 1479,
 
                    end: 1554,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["View.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "DesktopInit.js",

                    start: 1554,
 
                    end: 1579,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["DesktopInit.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "DesktopRouter.js",

                    start: 1579,
 
                    end: 1636,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["DesktopRouter.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "Model.js",

                    start: 1636,
 
                    end: 1680,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["Model.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "Collection.js",

                    start: 1680,
 
                    end: 1748,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["Collection.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "app.build.js",

                    start: 1748,
 
                    end: 2008,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["app.build.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "SpecRunner.html",

                    start: 2008,
 
                    end: 2089,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["SpecRunner.html"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "TestInit.js",

                    start: 2089,
 
                    end: 2179,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["TestInit.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                },

                {

                    name: "spec.js",

                    start: 2179,
 
                    end: 2291,

                    onStart: function(options) {

                        options.view.collection.fetch({ files: ["spec.js"] });

                    },

                    onEnd: function(options) {

                        $(".videocode").empty();

                    }

                }

            ]

        });

        // Returns the View class
        return VideoView;

    }

);