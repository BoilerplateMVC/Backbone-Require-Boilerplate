// VideoCodeView.js
// ----------------
define(["jquery", "backbone", "collections/FilesCollection"],

    function($, Backbone, FilesCollection) {

        var VideoView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".videocodecontainer",

            // View constructor
            initialize: function() {

                var self = this;

                self.setupPopcorn();

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

                // Maintains chainability
                return this;

            },

            setupPopcorn: function() {

                var self = this, rule, videocode = $(".videocode");

                self.popcorn = Popcorn.youtube("#video", "http://www.youtube.com/watch?v=5zCex8-ge-k");

                _.each(self.collection.githubFilePaths, function(file) {

                    console.log(file);

                    var rule = {

                        name: file.name,

                        start: file.start,

                        end: file.end,

                        onStart: function(options) {

                            console.log('test');

                            self.collection.fetch({ files: [file.name] });

                        },

                        onEnd: function(options) {

                            videocode.empty();

                        }

                    };

                    self.popcorn.code(rule);

                });

                self.collection.on("fetched", function(model) {

                    videocode.html(model.content);

                    if(videocode.text().length) {

                        videocode.show();

                        prettyPrint();

                    }

                    else {

                        videocode.hide();

                    }

                });


            }

        });

        // Returns the View class
        return VideoView;

    }

);