Backbone-Require-Boilerplate (BRB)
==================================
![Example](http://3.bp.blogspot.com/-JFOJ-k6tLnA/TsiKgBYPvqI/AAAAAAAAAT8/dGXeu0LeuTE/s320/backbone-js-logo.png) ![Example](http://requirejs.org/i/logo.png)

[Website](http://gregfranko.com/Backbone-Require-Boilerplate/)

#Description
A Backbone.js and Require.js Boilerplate that promotes decoupling your JavaScript into modules, separating business logic from application logic using Collections/Models and Views, reusing your JavaScript between Desktop and Mobile Web versions while using a mobile framework (jQuery Mobile), including non-AMD Compatible Third Party Scripts in your project, optimizing all of your JavaScript (minify, concatenate, etc), and unit testing your JavaScript.

#Getting Started
   1. Download and install [Node.js](http://nodejs.org/#download)
   2. Clone this repository
   3. On the command line, type `npm install nodemon -g` to install the [nodemon](https://github.com/remy/nodemon) library globally.  If it complains about user permissions type `sudo npm install nodemon -g`.
   4.  If you have installed [Grunt](http://gruntjs.com/) globally in the past, you will need to remove it first by typing `npm uninstall -g grunt`.  If it complains about user permissions, type `sudo npm uninstall -g grunt`.
   5.  Next, install the latest version of [Grunt](http://gruntjs.com/) by typing `npm install -g grunt-cli`.  If it complains about user permissions, type `sudo npm install -g grunt-cli`. 
   6. Navigate to inside of the **Backbone-Require-Boilerplate** folder and type `npm install`
   7. Next, type `nodemon` (this will start your Node.js web server and restart the server any time you make a file change thanks to the wonderful **nodemon** library)
   8. To view the demo page, go to `http://localhost:8001`
   9. To view the Jasmine test suite page, go to `http://localhost:8001/specRunner.html`
   10. Enjoy using Backbone, Require, Grunt, Lodash, Almond, jQuery, jQueryUI, jQuery Mobile, Twitter Bootstrap, and Jasmine (enjoyment optional)

#Tour of the Boilerplate Files

index.html
----------
   Uses a large portion of the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) HTML and CSS.  As you continue down the page to the first `<script>` tag, you will notice there is a `production` local JavaScript variable that is used to communicate to your application whether you would like to load production or development CSS and JavaScript files.

   _Mobile Detection Script_

   There is also a simple JavaScript mobile browser detection script that stores different production/development CSS and JavaScript files within a local `config` object based on whether a user is using a mobile or desktop browser.


   _Loading Files_

   The `loadFiles()` method is then used to load all of the correct CSS and JavaScript files.  Below is what get's included:

   _Mobile or Tablet Browser_

   If a mobile browser is found, then Require.js is included asynchronously within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `js/app/config/MobileInit` (this tells Require.js to look for a MobileInit.js file inside of the config folder).  The combined jQuery Mobile and common CSS file are also included asynchronously.

   _Desktop Browser_
   
   If a desktop device is found, then Require.js is included asynchronously within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `js/app/config/DesktopInit` (this tells Require.js to look for a DesktopInit.js file inside of the config folder).  The combined Bootstrap and common CSS file are also included asynchronously.

   **Note**:  You do not need to use the JavaScript mobile detection script for your application to use Backbone.js or Require.js. I just put it in so that you could see an example of how to separate your Mobile and Desktop JavaScript logic.

   _Production Mode_

   In production mode, your app's single minified and concatenated JavaScript file is loaded using Almond.js instead of Require.js.  Your application's minfied common CSS file is also included.

   _Development Mode_

  In development mode, your app's non-minified JavaScript files are loaded using Require.js instead of Almond.js.  Your application's non-minified common CSS file is also included.

   _Loader Methods_

   You will notice that the CSS files and the Require.js file are being included on the page via the `loadFiles()` method (which uses the `loadCss()` and `loadJS()` methods internally).  Require.js does not officially support [loading CSS files](http://requirejs.org/docs/faq-advanced.html#css), which is why I included the `loadCSS()` method to asynchronously include CSS files.  Loading CSS asynchronously also allows the flexibilty/mechanism to load different CSS files if a user is on a mobile/desktop device.

   I included the `loadJS()` method since the Desktop/Mobile versions of the boilerplate point Require.js to two different files.  Including Require.js asynchronously within the `loadJS` method provides the flexibility to do that.

   **Note:** Feel free to use the `loadCSS()` and `loadJS()` methods to load any other dependencies your application may have that you do not want to use Require.js for.

MobileInit.js
-------------
   MobileInit.js is only used if a mobile browser is detected.  This file includes your mobile Require.js configurations.

   If we look at the mobile Require.js configurations, we will see the first thing being configured are the paths.  Setting paths allow you to define an alias name and file path for any file that you like.

   Typically, you want to set a path for any file that will be listed as a dependency in more than one module (eq. jQuery, Backbone).  This saves you some typing, since you just have to list the alias name, and not the entire file path, when listing dependencies.  After all of the file paths are set, you will find the Shim configuration (Added in Require.js 2.0).
   

   The Shim configuration allows you to easily include non-AMD compatible JavaScript files with Require.js (a separate library such as [Use.js](https://github.com/tbranyen/use.js/) was previously needed for this).  This is very important, because Backbone versions > 0.5.3 no longer support AMD (meaning you will get an error if you try to use both Require.js and the latest version of Backbone).  This configuration is a much better solution than manually editing non-AMD compatible JavaScript files to make sure the code is wrapped in a `define` method.  Require.js creator [James Burke](http://tagneto.blogspot.com/) previously maintained AMD compatible forks of both Backbone.js and Underscore.js because of this exact reason.

         shim: {

            // Backbone
            "backbone": {

               // Depends on underscore/lodash and jQuery
               "deps": ["underscore", "jquery"],

              // Exports the global window.Backbone object
              "exports": "Backbone"

            },

         }

   The Shim configuration also takes the place for the old Require.js `order` plugin.  Within the Shim configuration, you can list files and their dependency tree.  An example is jQuery plugins being dependent on jQuery:

         shim: {

            // Twitter Bootstrap plugins depend on jQuery
            "bootstrap": ["jquery"]

         }

   **Note**: You do not need a shim configuration for [jQuery](http://www.jquery.com) or [lodash](https://github.com/bestiejs/lodash) because they are both AMD compatible.

   After Require.js is configured, you will notice the `require` method is called.  The `require` method is asynchronously including all of the files/dependencies passed into the first parameter (jQuery, Backbone, Lodash, mobileRouter, etc) into the page.

   After all of those files are included on the page, two internal jQuery Mobile properties are turned off to allow Backbone.js to handle all of the routing.

            // Prevents all anchor click handling
            $.mobile.linkBindingEnabled = false;

            // Disabling this will prevent jQuery Mobile from handling hash changes
            $.mobile.hashListeningEnabled = false;

   Finally, a new router instance is instantiated to allow you to use Backbone's routing mechanism (keep reading below for more clarification).

   **Note**: You don't need to instantiate a new router instance if you aren't using a Backbone Router class.

DesktopInit.js
--------------
   DesktopInit.js is only used if a desktop browser is detected.  This is where your desktop Require.js configurations will be.

   This file is the exact same as MobileInit.js, except it has a few different dependencies (Twitter Bootstrap instead of jQuery Mobile, etc)

MobileRouter.js
---------------
   mobileRouter.js is where you can include mobile specific scripts that you do not want included in your desktop application.  This file starts with a define method that lists jquery, backbone, and View.js as dependencies.  Keep in mind that jQuery and Backbone had already been previously loaded in mobile.js, but Require.js is smart enough not to load dependencies more than once.

   It is best practice to list out all of your dependencies for every file, regardless of whether or not they expose global objects and are already included in the page.  This is also especially important for the Require.js optimizer (which needs to determine which files depend on which other files).  

   **Note**: If your dependencies do not expose global objects, then it is absolutely mandatory to list it as a dependency, since Require.js does not allow global variables (meaning your modules are private and cannot be accessed by other modules or code without explicitly listing them as dependencies).

   The rest of the file is a pretty standard Backbone.js Router class:

   There is currently only one route listed (which gets called if there is no hash tag on the url), but feel free to create more for your application.

   **Note**: You must keep the `Backbone.history.start()` method call, since this is what triggers Backbone to start reacting to hashchange events.

   When your default route is invoked, a new View instance is created, which calls the render method immediately to append the header template to the page.

DesktopRouter.js
----------------
   DesktopRouter.js has the exact same code as **MobileRouter.js**.  The difference is this is where you can include desktop specific scripts that you do not want included in your mobile web application.

View.js
-----------
   View.js will be used by both the mobile and desktop versions of your application.  It starts with a define method that lists all of its dependencies.

   The rest of the file is a pretty standard Backbone.js View class:
		
   Backbone.js View's have a one-to-one relationship with DOM elements, and a View's DOM element is listed in the `el` property.  After the `el` property is set, the View's model attribute is set to a new instance of the Model returned by Model.js (which was listed at the top as a dependency).  Next, the View's `render` method is called within the View's constructor, aka `initialize()` method, and the View's `template` property is set and appended to the page using the [Underscore.js](https://github.com/documentcloud/underscore) `template` method ported to Lodash.

   **Note**: If you have read all of the documentation up until this point, you will most likely have already noticed that [lodash](https://github.com/bestiejs/lodash) is being used instead of Underscore.js.  Apart from having a bit better cross-browser performance and stability than Underscore.js, lodash also provides a custom build process.  Although I have provided a version of lodash that has all of the Underscore.js methods you would expect, you can download a custom build and swap that in.  Also, it doesn't hurt that Lodash creator, [John-David Dalton](https://twitter.com/jdalton), is an absolute performance and API consistency maniac =)

   Next, you will find an `events` object.  Here is where all of your View DOM event handlers associated with the HTML element referenced by your View's `el` property should be stored.  Keep in mind that Backbone is using the jQuery `delegate` method, so it expects a selector that is within your View's `el` property.  I did not include any events by default, so you will have to fill those in yourself.  Below is an example of having an events object with one event handler that calls a View's `someMethod()` method when an element with a class name of _someElement_ is clicked.

            // View Event Handlers
            events: {

               "click .someElement": "someMethod"

            },

   I am also declaring a `render` method within the View.  Backbone expects you to override the `render` method with your own functionality, so that is what I did.  All my `render` method does is append the View's template to the page.

   **Note**: You do not need to use Underscore.js templates.  In fact, you don't need to use templates at all.  I just included them so you would understand how to use them.

   Finally, I am returning the View class.

heading.html
------------
 This file includes a template that is included via the Require.js [text plugin](https://github.com/requirejs/text).  Templates are typically a useful way for you to update your View (the DOM) if a Model attribute changes.  They are also useful when you have a lot of HTML and JavaScript that you need to fit together, and instead of concatenating HTML strings inside of your JavaScript, templates provide a cleaner solution.  Look at Underscore's documentation to read more about the syntax of Underscore.js templates.

Model.js
--------
   Model.js is used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery and backbone as dependencies.

   The rest of the file is a pretty standard Backbone.js Model class.

   Like other Backbone.js classes, there is an `initialize()` method that acts as the Model's constructor function.  There is also a **defaults** object that allows you to set default Model properties if you wish.

   Finally, The Backbone.js `validate` method is provided for you.  This method is called any time an attribute of the model is set.  Keep in mind that all model attributes will be validated (once set), even if a different model attribute is being set/validated.  This does not make much sense to me, so if you prefer only the Model attributes that are currently being saved/set to be validated, then use the validateAll option provided by [Backbone.validateAll](https://github.com/gfranko/Backbone.validateAll).

   Finally, a new Model class is returned.

Collection.js
------------------
   Collection.js is used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery, backbone, and UserModel.js as dependencies.

   The rest of the file is a pretty standard Backbone.js Collection class that is used to store all of your Backbone Models.  The Collection model property is set to indicate that all Models that will be within this Collection class will be of type Model (the dependency that is passed into the file).

   Finally, a new Collection class is returned.

Gruntfile.js
------------
   This file is ready made for you to have your entire project optimized using Grunt.js, the [Require.js Optimizer](https://github.com/jrburke/r.js/) and [almond.js](https://github.com/jrburke/almond).

   Grunt.js is a JavaScript command line task runner that allows you to easily automate common development tasks such as code linting, minification, and unit testing.

   **Note:** Running the Jasmine Tasks with Grunt has not been implemented yet.

   Almond.js a lightweight AMD shim library created by [James Burke](https://github.com/jrburke), the creator of Require.js.  Almond is meant for small to medium sized projects that use one concatenated/minified JavaScript file.  If you don't need some of the advanced features that Require.js provides (lazy loading, etc) then Almond.js is great for performance.

   Backbone-Require-Boilerplate sets you up to use Require.js in development and Almond.js in production.  By default, Backbone-Require-Boilerplate is in _development_ mode, so if you want to try out the production build, read the production instructions below.

   **Production Build Instructions**

   Navigate to the root directory of the Backbone-Require-Boilerplate folder and type **grunt** and wait a few seconds for the build to complete.

   **Note:** If you are on a Windows machine, you will have to type `grunt.cmd`

   Once the script has finished, you will see that both _DesktopInit.min.js_ and _MobileInit.min.js_, and the _mobile.min.css_ and _desktop.min.css_ files will be created/updated.

   Next, update the `production` local variable inside of **index.html** to be **true**.

   And that's it!  If you have any questions just create in an issue on Github.

SpecRunner.html
---------------
   This file is the starting point to your Jasmine test suite and outputs the results of your Jasmine tests.  It includes Require.js and points it to **testInit.js** for all of the proper configurations.

TestInit.js
-----------
   This file includes all of the Require.js configurations for your Jasmine unit tests.  This file will look very similar to the **MobileInit.js** and **DesktopInit.js** files, but will also include Jasmine and the jasmine-jquery plugin as dependencies.

   You will also notice a _specs_ array that will allow you to add as many specs files as your application needs (Specs folders are where your unit tests are).  The boilerplate only includes one specs js file by default, so only one specs item is added to the array.  Finally, once the specs file is included by the `require()` call, Jasmine is initialized

spec.js
-------
   This file contains all of your Jasmine unit tests.  Only seven tests are provided, with unit tests provided for Views, Models, Collections, and Routers (Mobile and Desktop).  I'd write more, but why spoil your fun?  Read through the tests and use them as examples to write your own.

   The entire file is wrapped in an AMD define method, with all external module (file) dependencies listed.  The Jasmine tests should be self explanatory (BDD tests are supposed to describe an app's functionality and make sense to non-techy folk as well), but if you have any questions, just file an issue and I'll respond as quickly as I can.


#FAQ

**What libraries have you included?**

   -Backbone, Require, Grunt, Lodash, Almond, jQuery, jQueryUI, jQuery Mobile, Twitter Bootstrap, and Jasmine (w/the jasmine-jquery plugin)

**What Require.js plugins are you using?**

   -Just the Require.js text plugin, since it provides an easy way to keep templates in their own folders (instead of just embedding them in your html files).  I was previously using Use.js to load non-AMD compatible scripts, but Require.js 2.0 now provides this functionality.

**Why are you not using the Require.js Internationalization plugin?**

   -I found that when I built using the Require.js Optimizer, only one lang-locale could be included per optimized file.  That would mean, that if you had to support 10 different langs/locales, you would need 20 different optimized builds (Desktop and Mobile).  If I am mistaken about this, please let me know, and I will update the Boilerplate with the Internationalization plugin.  A solution for including localized text is in the roadmap and will be included in a future release of the project.

**Why are you using Grunt for the build?**

   -Grunt comes jam packed with features and plugins to help improve project automation tasks.  Although the main job of Grunt (within Backbone-Require-Boilerplate) is to run the Require.js optimizer, it is also for other tasks such as JSHinting your code.

**What Grunt plugins are you using?**

   - The boilerplate uses the **grunt-contrib-requirejs** plugin to run the Require.js optimizer and the **grunt-contrib-jshint** plugin to automate JSHint code quality checking.  Both plugins are maintained by the core Grunt team.

**What Grunt tasks can I use?**

   - The boilerplate provides `test`, `build`, and `default` tasks.

   - The `test` task will only JSHint your code for quality.  You can run the `test` task by typing `grunt test`.

   - The `build` task will concatenate and minify your Desktop/Mobile JavaScript and CSS files using the Require.js optimizer.  You can run the `build` task by typing `grunt build`.

   - The `default` task will run both the `test` and `build` tasks.  You can run the `default` task by typing `grunt`.

**Do I have to use everything the boilerplate gives me?**

   -No!  Feel free to update the boilerplate to fit the needs of your application.  Certain things that you might not want/need include templates, mobile and desktop versions, jQuery Mobile, etc.

**Do I need a web server to test the boilerplate?**

   -Yep, because the Require.js text plugin dynamically pulls in template files via ajax (which is not allowed with the `File://` local extension.  Luckily for you I have provided an easy to use Node.js web server for convenience.

**Why did you not include a package manager such as Bower, Volo, or Jam?**

   -I ultimately decided against including a package manager. I agree that using a package manager for this boilerplate is the ultimate solution, but the JS package management space is in a state of flux. A browser package management solution has not been adopted by the community yet. Obviously, this may change.

**Can I contribute to this project?**

   -Please do!  I am learning just like you.  If you want to contribute, please send pull requests to the dev branch.

##Change Log

`1.4.0` - April 6, 2013

**A huge thank you to [Nick Pack](https://github.com/nickpack) for helping to implement Grunt in this release**

- Added Grunt.js support run the Require.js optimization build.
- Updated the `loadJS()` and `loadCSS()` methods and removed the HTML5 **DOMContentLoaded** event
- Updated all libraries to the latest versions.

`1.3.0` - December 31, 2012

- Updated the `loadCSS()` method to now support an array of arguments

- Removed the `loadRequireJS()` method

- Added the `loadJS()` method (supports an array of arguments)

- Added a new **production** local variable inside of _index.html_ to easily turn on and off production/development mode

- _Production_ mode no longer includes Require.js (This was accidentally being included along with Almond.js) [#14](https://github.com/gfranko/Backbone-Require-Boilerplate/issues/14)

- The common CSS file is now being included after all libraries/application files have been loaded.  This allows you to easily override 3rd party CSS rules (Bootstrap, jQuery Mobile, etc) [#14](https://github.com/gfranko/Backbone-Require-Boilerplate/issues/14)

`1.2.0` - December 1, 2012

Special thanks to [Mark Simon](https://github.com/msimonc) - This release would not have happened without him

- Added jQuery Mobile support

- Added jQueryUI support

- Upgraded all libs to their latest versions

- Included a Node.js server for convenience in testing BRB

- Removed the add/remove users example and reverted this project back to just a boilerplate

- Added Desktop and Mobile Router Jasmine tests

- Added the Require.js text plugin back in (since I now figured out how to use it with Jasmine)

`1.1.0` - October 19, 2012

- Upgraded to Require.js 2.1.1

- Upgraded to r.js 2.1.1

- Upgraded to almond.js 0.2.0

- Upgraded to Lodash 0.8.2

- Upgraded to jQuery 1.8.2

`1.0.0` - September 19, 2012

- Added Almond.js to the production build process.

Thanks to [James Burke](https://github.com/jrburke) for helping with the updated build script!

`0.9.0` - September 2, 2012

- Complete rewrite of the Boilerplate example.  The example now illustrates how to make a simple add/remove user table with Backbone Collections, Models, and Views.

- Upgraded to Lodash 0.6.1

- Upgraded to jQuery 1.8.1

- Added [Backbone.validateAll](https://github.com/gfranko/Backbone.validateAll)

`0.8.0` - August 22, 2012

- Added Project Nickname: **BRB** - Seriously how did I not see that before.

- Added Jasmine Unit Tests!  Two unit tests were added for both Views and Models.

- **BREAKING CHANGE**: The Require.js text plugin was removed, and an inline html template was used instead.

- Upgraded to Lodash 0.5.2


`0.7.0` - August 10, 2012

- Upgraded to Require.js 2.0.5 and r.js 2.0.5 [documentation](http://tagneto.blogspot.com/2012/08/requirejs-205-released.html)

- Upgraded to Lodash 0.4.2

- Upgraded to jQuery 1.8.0 [documentation](http://blog.jquery.com/2012/08/09/jquery-1-8-released/)

`0.6.0` - June 13, 2012

- Upgraded to Require.js 2.0.2 and r.js 2.0.2 [documentation](http://tagneto.blogspot.ca/2012/06/requirejs-202-released.html)

- Upgraded to Lodash 0.3.1

`0.5.0` - June 5, 2012

- All modules now return a class instead of an instance
- The self variable has been removed from all modules (scoping issue)
- The Require.js Optimizer build file (app.build.js) has been simplified by adding a `mainConfigFile` option that points to the desktop main file.  Keep in mind that all of your mobile and desktop shims and paths need to be in desktopInit.js

`0.4.0` - June 1, 2012

- Upgraded to Require.js 2.0.1 and r.js 2.0.1
- Added anotherView.js to demonstrate how to extend Backbone.js Views/Classes
- Upgraded `model.js` to now return a Model instance instead of a Model Class
- Updated documentation

`0.3.0` - June 1, 2012

- Upgraded to Lodash 0.2.2
- Removed the Lodash Shim configuration (not needed because Lodash is AMD compatible)
- Updated documentation

`0.2.0` - May 29, 2012

- Upgraded to Require.js 2.0, text.js 2.0, and r.js 2.0.
- Removed Use.js because Require.js 2.0 now includes this functionality (using the Shim configuration)
- Replaced all the minified JavaScript files with unminified/documented JavaScript files (you can minify these files using the Require.js Optimizer script provided)

`0.1.0` - May 24, 2012

- Initial Backbone-Require-Boilerplate release.  Added source code and documentation.

##Contributors
[Greg Franko](https://github.com/gfranko), [Nick Pack](https://github.com/nickpack), [Brett Jones](https://github.com/brettjonesdev)

## License
Copyright (c) 2012 Greg Franko  
Licensed under the MIT license.		
		  

	

