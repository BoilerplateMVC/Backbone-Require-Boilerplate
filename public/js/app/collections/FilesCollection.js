// FilesCollection.js
// ------------------
define(["jquery","backbone","models/FileModel"],

  function($, Backbone, FileModel) {

    // Creates a new Backbone Collection class object
    var FilesCollection = Backbone.Collection.extend({

      initialize: function() {

        var self = this;

        this._githubJSONP(self.githubRateLimitUrl).done(function(data) {

          self.githubRateLimit = data.data.rate.remaining;

        });

      },

      localDataName: "github-data",

      // Tells the Backbone Collection that all of it's models will be of type FileModel (listed up top as a dependency)
      model: FileModel,

      cache: 3600000,

      // URL to check if the Github Rate Limit is exceeded
      githubRateLimitUrl: "https://api.github.com/rate_limit",

      // Github private client id
      client_id: "6731ef26223b1eee4f57",

      // Github private client secret
      client_secret: "ef3a6f8e62671f774f5cbb658285a9ab16c3a317",

      githubBasePath: "https://api.github.com/repos/gfranko/Backbone-Require-Boilerplate/contents/?ref=master&path=",

      // Sample JSON data that in a real app will most likely come from a REST web service
      githubFilePaths: [

        { path: "public/index.html", name: "index.html", start: 495, end: 845 },

        { path: "public/js/app/config/MobileInit.js", name: "MobileInit.js", start: 845, end: 1187 },

        { path: "public/js/app/config/DesktopInit.js", name: "DesktopInit.js", start: 1554, end: 1579 },

        { path: "public/js/app/routers/MobileRouter.js", name: "MobileRouter.js", start: 0, end: 0 },

        { path: "public/js/app/routers/DesktopRouter.js", name: "DesktopRouter.js", start: 1579, end: 1636 },

        { path: "public/js/app/views/View.js", name: "View.js", start: 1187, end: 1397 },

        { path: "public/js/app/templates/heading.html", name: "heading.html", start: 1397, end: 1479 },

        { path: "public/js/app/models/Model.js", name: "Model.js", start: 1636, end: 1680 },

        { path: "public/js/app/collections/Collection.js", name: "Collection.js", start: 1680, end: 1748 },

        { path: "deploy/app.build.js", name: "app.build.js", start: 1748, end: 2008 },

        { path: "public/SpecRunner.html", name: "SpecRunner.html", start: 2008, end: 2089 },

        { path: "public/js/test/config/TestInit.js", name: "TestInit.js", start: 2089, end: 2179 },

        { path: "public/js/test/specs/spec.js", name: "spec.js", start: 2179, end: 2291 }

      ],

      modernBrowser: window.sessionStorage && JSON && JSON.stringify && JSON.parse,

      getLocalData: function() {

        var self = this;

        if(self.modernBrowser) {

          return JSON.parse(JSON.parse(sessionStorage.getItem(self.localDataName))) || [];

        }

        else {

          return false;

        }

      },

      setLocalData: function(arr) {

        var self = this;

        if(self.modernBrowser) {

          sessionStorage.setItem(self.localDataName, JSON.stringify(arr));

        }

      },

      // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
      sync: function(method, model, options) {

        var self = this,
          count = 0,
          arr = [],
          jsonpArr = [],
          localData = self.getLocalData(),
          time = new Date().getTime(),
          currentFile,
          newdata,
          newmodel,
          files = [],
          // Creates a jQuery Deferred Object
          deferred = $.Deferred();

        // If one or many files are passed into the fetch options method
        if(options.files && options.files.length) {

          // Returns a new array that only includes the files that are passed into the fetch method (all other files are listed as undefined, which creates a sparse array)
          files = _.map(self.githubFilePaths, function(file, iterator) {

            if(_.contains(options.files, file.name)) {

              return file;

            }

            else {

              return undefined;

            }

          });

        }

        // If no files are passed into the fetch options method, then fetch all models
        else {

          files = self.githubFilePaths;

        }

        // If a modern browser is being used
        if(self.modernBrowser) {

          // Loops through all of the Github files
          for(var x = 0; x <= files.length - 1; x += 1) {

            if(files[x] === undefined) {

              continue;

            }

            count += 1;

            var file = files[x], iterator = x;

            localFile = _.find(localData, function(obj) {

              return obj.name === file.name;

            });

            // If there are already items stored in Session Storage for the current file
            if(localFile && localFile.content && localFile.cache) {

              // If the caching time has expired
              if((time - localFile.cache) >= self.cache) {

                // If the Github API hourly rate limit has not been reached
                if(self.githubRateLimit > 0) {

                  // Reduces the internal Github rate limit check
                  self.githubRateLimit -= 1;

                  // Adds the jsonp jQuery request to the local jsonp array
                  jsonpArr.push(self._githubJSONP(self.githubBasePath + file.path));

                  self.checkUpdate({ jsonpArr: jsonpArr, files: files, arr: arr, count: count, deferred: deferred });

                }

                // If the Github API hourly rate limit has been reached
                else {

                  // Triggers a custom "rateLimitExceeded" event
                  self.trigger("rateLimitExceeded");

                  // Breaks out of the each loop
                  return;

                }

              }

              // If the caching time has not expired
              else {

                var dfd = new $.Deferred();

                jsonpArr.push(dfd);

                self.checkUpdate({ jsonpArr: jsonpArr, files: files, arr: arr, count: count, deferred: deferred });

                dfd.resolve({ local: true, filename: localFile.name, content: localFile.content });

              }

            }

            // If there are not already items stored in Session Storage for the current file
            else {

              // If the Github API hourly rate limit has not been reached
              if(self.githubRateLimit > 0) {

                // Reduces the internal Github rate limit check
                self.githubRateLimit -= 1;

                // Adds the jsonp jQuery request to the local jsonp array
                jsonpArr.push(self._githubJSONP(self.githubBasePath + file.path));

                self.checkUpdate({ jsonpArr: jsonpArr, files: files, arr: arr, count: count, deferred: deferred });

              }

              // If the Github API hourly rate limit has been reached
              else {

                // Triggers a custom "rateLimitExceeded" event
                self.trigger("rateLimitExceeded");

                // Breaks out of the each loop
                return;

              }

            }

          }

        }

        // It is not a modern browser
        else {


        }

        // Returns the deferred object
        return deferred;

      },

      checkUpdate: function(obj) {

        var self = this,
          args,
          content,
          filename,
          newarr = _.filter(obj.files, function(file) {

            return file !== undefined;

          });

        // Once we have received the last file from Github, we add all of the File Models to the Files Collection
        if(newarr.length === obj.count) {

          // Is called when all of the Github jsonp requests are complete
          $.when.apply($, obj.jsonpArr).then(function() {

            args = Array.prototype.slice.call(arguments);

            // Only a single ajax call is returned
            if(_.isString(args[1])) {

              content = args[0];

              filename = content.data.name;

              // Adds a model to the collection
              self.addModel({ filename: filename, content: content });

            }

            // Two or more ajax calls are returned
            else {

              _.each(args, function(data) {

                if(data.local) {

                  content = data.content;

                  filename = data.filename;

                  // Adds a model to the collection
                  self.addModel({ local: true, filename: filename, content: content });

                }

                else {

                  content = data[0];
              
                  filename = content.data.name;

                  // Adds a model to the collection
                  self.addModel({ filename: filename, content: content });

                }

              });

            }

            // Saves the collection in local storage
            self.setLocalData(JSON.stringify(self));

            // Resolves the deferred object
            obj.deferred.resolve();

          });

        }

      },

      addModel: function(obj) {

        var self = this, currentCollection = self.toJSON(), newarr = [];

        newdata = { content: (obj.local ? obj.content : self.htmlEscape(self._parseGithubResponse({ "data": obj.content }))), cache: new Date().getTime() };

        newmodel = _.extend({ name: obj.filename }, newdata);

        _.each(currentCollection, function(model, iterator) {

          // If there is a duplicate model
          if(model.name === newmodel.name) {

            // Merge the old model with the new model
            newmodel = _.extend(model, newmodel);

            // Update the existing model with the new properties
            _.extend(self.at(iterator), newmodel);

            // Add a duplicate: true key to the new model (This will prevent it from getting added to the collection below)
            newmodel = _.extend(newmodel, { duplicate: true });

          }

        });

        self.trigger("fetched", newmodel);

        // Does not add a new model if it is a duplicate
        if(!newmodel.duplicate) {

          self.add(newmodel);

        }

      },

      // _githubJSONP
      // ------------
      //      Sends a signed jQuery JSONP request to Github
      _githubJSONP: function(url) {

        // Stores the model context in the local self variable
        var self = this;

          // jQuery JSONP request
          return $.ajax({

            url: url,

            data: "client_id=" + self.client_id + "&client_secret=" + self.client_secret,

            dataType: "jsonp"

          });

        },

        // _parseGithubResponse
        // --------------------
        //      Parses the Base 64 encoded Github response into text
        //      This method was heavily inspired by [James Ward](https://github.com/jamesward/github-files)
        _parseGithubResponse: function(obj) {

            // LOCAL VARIABLES
            var self = this,
                base64EncodedContent,
                content,
                contentArray,
                text;

            // If Github found content and the global `atob` method is available (not currently available in IE)
            if (obj.data.data.content != null && window.atob) {

                // If the encoding is base64
                if (obj.data.data.encoding === "base64") {

                    // Stores the content property inside of the local variable
                    base64EncodedContent = obj.data.data.content;

                    // Removes all new lines
                    base64EncodedContent = base64EncodedContent.replace(/\n/g, "");
    
                    // Stores the base64 encoded content inside of a local variable
                    content = window.atob(base64EncodedContent);
    
                    // Splits the content up into an array
                    contentArray = content.split("\n");

                    // Grabs all of the content from the array and stores the text in a local variable
                    text = contentArray.slice(0, contentArray.length).join("\n") || "";
                    
                }

                return text;

            }

        },

        // HTML Escape
        // -----------
        //      HTML encodes a string
        htmlEscape: function(str) {

          if(str != null) {
    
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

          }

        }

    });

    // Returns the Model class
    return FilesCollection;

  }

);