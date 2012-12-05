// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/FileModel", "views/VideoCodeView", "collections/FilesCollection", "views/IconsView"],
        
    function($, Backbone, FileModel, VideoView, FilesCollection, IconsView) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {

                var self = this;

                // Instantiates a new Collection which will contain all of File Models
                self.files = new FilesCollection();

                // Instantiates a new View which will render the BRB video
                self.video = new VideoView({ collection: self.files }),

                self.icons = new IconsView();

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                
                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function() {

            }
    
        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);