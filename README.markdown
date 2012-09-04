Backbone-Require-Boilerplate (BRB)
==================================
![Example](http://backbonejs.org/docs/images/backbone.png) ![Example](http://requirejs.org/i/logo.png)

#Description
A Backbone.js and Require.js Boilerplate that promotes decoupling your JavaScript into modules, separating business logic from application logic using Collections/Models and Views, reusing your JavaScript between Desktop and Mobile Web versions, including non-AMD Compatible Third Party Scripts in your project, optimizing all of your JavaScript (minify, concatenate, etc), and unit testing your JavaScript.

#Getting Started
   1. Clone this repository
   2. Download and install [Node.js](http://nodejs.org/#download) (this is used to run the Require.js Optimizer)
   3. Open index.html to view the demo page.
   4. Open SpecRunner.html to view the test suite page.
   5. Enjoy using Backbone.js, Require.js, jQuery, Lodash, Modernizr, Twitter Bootstrap, and Jasmine! (enjoyment optional)

#Tour of the Boilerplate Files
**Note**: The Boilerplate has been updated to provide a more useful example (Add/Remove Users)

index.html
----------
   Uses a large portion of the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) HTML and CSS.  You will notice there is a JavaScript mobile browser detection script (inspired from [detectmobilebrowsers.com](http://detectmobilebrowsers.com/)) to determine if a user is using a mobile or desktop browser.

   If a mobile browser is found, then Require.js is included within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `mobile` (this tells Require.js to look for a mobile.js file in the js folder).  If a desktop device is found, then Require.js is included within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `desktop` (this tells Require.js to look for a desktop.js file in the js folder).

   **Note**: You do not need to use the mobile detection script for your application.  I just put it in so that you could see an example of how to separate your Mobile and Desktop JavaScript logic.

   This file also includes an Underscore.js (via Lodash) template.  The template is used with the project add/remove user example to iterate over all of the user models inside of the users collection, and display the models inside of an HTML table.

   **Note**: Templates are typically a useful way for you to update your View (the DOM) if a Model attribute changes.  They are also useful when you have a lot of HTML and JavaScript that you need to fit together, and instead of concatenating HTML strings inside of your JavaScript, templates provide a cleaner solution.  Look at Underscore's documentation to read more about the syntax of Underscore.js templates.

mobile.js
---------
   mobile.js is only used if a mobile browser is detected.  This file includes your mobile Require.js configurations.

   If we look at the mobile Require.js configurations, we will see the first thing being configured are the paths.  Setting paths allow you to define an alias name and file path for any file that you like.

   Typically, you want to set a path for any file that will be listed as a dependency in more than one module (eq. jQuery, Backbone).  This saves you some typing, since you just have to list the alias name, and not the entire file path, when listing dependencies.  After all of the file paths are set, you will find the Shim configuration (Added in Require.js 2.0).
   

   The Shim configuration allows you to easily include non-AMD compatible JavaScript files with Require.js (a separate library such as [Use.js](https://github.com/tbranyen/use.js/) was previously needed for this).  This is very important, because Backbone versions > 0.5.3 no longer support AMD (meaning you will get an error if you try to use both Require.js and the latest version of Backbone).  This configuration is a much better solution than manually editing non-AMD compatible JavaScript files to make sure the code is wrapped in a `define` method.  Require.js creator [James Burke](http://tagneto.blogspot.com/) previously maintained AMD compatible forks of both Backbone.js and Underscore.js because of this exact reason.

   **Note**: You do not need a shim configuration for [lodash](https://github.com/bestiejs/lodash) because [lodash](https://github.com/bestiejs/lodash) is AMD compatible.

   After Require.js is configured, you will notice the `require` method is called.  The `require` method is asynchronously including all of the files/dependencies passed into the first parameter (Modernizr, jQuery, Backbone, Lodash, mobileRouter) into the page.  Lodash is also included since it is listed as a dependency to Backbone in the Require.js Shim configuration.

   After all of those files are included on the page, a new router instance is instantiated to allow you to use Backbone's routing mechanism (keep reading below for more clarification).

   **Note**: You don't need to instantiate a new router instance if you aren't using a Backbone Router class.

desktop.js
----------
   desktop.js is only used if a desktop browser is detected.  This is where your desktop Require.js configurations will be.

   This file is the exact same as mobile.js, except it lists desktopRouter.js as a dependency instead of mobileRouter.js.

mobileRouter.js
---------------
   mobileRouter.js is where you can include mobile specific scripts that you do not want included in your desktop application.  This file starts with a define method that lists jquery, backbone, and view.js as dependencies.  Keep in mind that jQuery and Backbone had already been previously loaded in mobile.js, but Require.js is smart enough not to load dependencies more than once.

   It is best practice to list out all of your dependencies for every file, regardless of whether or not they expose global objects and are already included in the page.  This is also especially important for the Require.js optimizer (which needs to determine which files depend on which other files).  

   **Note**: If your dependencies do not expose global objects, then it is absolutely mandatory to list it as a dependency, since Require.js does not allow global variables (meaning your modules are private and cannot be accessed by other modules or code without explicitly listing them as dependencies).

   The rest of the file is a pretty standard Backbone.js Router class:

   There is currently only one route listed (which gets called if there is no hash tag on the url), but feel free to create more for your application.

   **Note**: You must keep the `Backbone.history.start()` method call, since this is what triggers Backbone to start reacting to hashchange events.

   When your default route is invoked, a new user Model is created (Default values are pre-populated so that this user model is shown when the page is rendered).  A new users Collection is then created to hold all of the user Models and a new user View is created to handle all updates to the UI.  The user View's render method is called immediately to show all of the user Models inside of the users Collection.

desktopRouter.js
----------------
   desktopRouter.js has the exact same code as *mobileRouter.js*.  The difference is this is where you can include desktop specific scripts that you do not want included in your mobile web application.

UserView.js
-----------
   UserView.js will be used by both the mobile and desktop versions of your application.  It starts with a define method that lists all of its dependencies.

   The rest of the file is a pretty standard Backbone.js View class:
		
   Backbone.js View's have a one-to-one relationship with DOM elements, and a View's DOM element is listed in the `el` property.  After the `el` property is set, the View's model attribute is set to a new instance of the Model returned by model.js (which was listed at the top as a dependency).  Next, the View's `template` property is set using the [Underscore.js](https://github.com/documentcloud/underscore) `template` method ported to Lodash.

   **Note**: If you have read all of the documentation up until this point, you will most likely have already noticed that [lodash](https://github.com/bestiejs/lodash) is being used instead of Underscore.js.  Apart from having a bit better cross-browser performance and stability than Underscore.js, lodash also provides a custom build process.  Although I have provided a version of lodash that has all of the Underscore.js methods you would expect, you can download a custom build and swap that in.

   Next, an event handler is set on the UserView's Collection property.  The event handler triggers the UserView's render method any time Models are added or removed to the Collection.

   Next, you will find an `events` object.  Here is where all of your View DOM event handlers associated with the HTML element referenced by your View's `el` property should be stored.  Keep in mind that Backbone is using the jQuery `delegate` method, so it expects a selector that is within your View's `el` property.

   I am also declaring a `render` method on my View.  Backbone expects you to override the `render` method with your own functionality, so that is what I did.  All my `render` method does is append the View's template to the page.

   **Note**: You do not need to use Underscore.js templates.  In fact, you don't need to use templates at all.  I just included them so you would understand how to use them.

   Finally, I am returning the View class.

UserModel.js
------------
   UserModel.js is used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery and backbone as dependencies.

   The rest of the file is a pretty standard Backbone.js Model class that is used to model user data.

   Default first name, last name, email, and phone properties are listed.  All User Model's will eventually be printed to the `index.html` page.

   Common validators and RegEx pattern checking are also listed for convenience in the example.

   Also, The Backbone.js `validate` method is provided for you.  This method is called any time an attribute of the model is set.  Keep in mind that all model attributes will be validated (once set), even if a different model attribute is being set/validated.  This does not make much sense to me, so if you prefer only the Model attributes that are currently being saved/set to be validated, then use the validateAll option provided by [Backbone.validateAll](https://github.com/gfranko/Backbone.validateAll).

   Finally, a new Model class is returned.

UsersCollection.js
------------------
   UsersCollection.js is used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery, backbone, and UserModel.js as dependencies.

   The rest of the file is a pretty standard Backbone.js Collection class that is used to store all of the User Models.  The Collection model property is set to the UserModel class.

   Finally, a new Collection class is returned.

app.build.js
------------
   This file is ready made for you to have your entire project optimized using the Require.js Optimizer (r.js).  The file is commented with instructions on how to use it, so I am not going to list the directions here.  If you have any questions just ask.

SpecRunner.html
---------------
   This file sets up your Require.js/Backbone/Jasmine test configuration.  Since this file is in a different folder location than index.html, the Require.js path and baseUrl configurations are updated.  This page loads all third-party dependencies (jquery, backbone, etc) since they are listed as dependencies in spec.js, dynamically includes all of your specs (your tests) via spec.js, and then allows Jasmine to test your tests.  Fun!

spec.js
-------
   This file contains all of your Jasmine unit tests.  Only five tests are provided, with unit tests provided for Views, Models, and Collections.  I'd write more, but why spoil your fun?

   The entire file is wrapped in an AMD define method, with all external module (file) dependencies listed.  The Jasmine tests should be self explanatory (BDD tests are supposed to describe an app's functionality and make sense to non-techy folk as well), but if you have any questions, just file an issue and I'll respond as quickly as I can.


#FAQ

**What libraries have you included?**

   -Backbone, Require, jQuery, Lodash, Modernizr, Twitter Bootstrap, and Jasmine (w/the jasmine-jquery plugin)

**What Require.js plugins are you using?**

   -None.  I was previously using Use.js to load non-AMD compatible scripts, but Require.js 2.0 now provides this functionality.

**Why are you not using the Require.js Internationalization plugin?**

   -I found that when I built using the Require.js Optimizer, only one lang-locale could be included per optimized file.  That would mean, that if you had to support 10 different langs/locales, you would need 20 different optimized builds (Desktop and Mobile).  If I am mistaken about this, please let me know, and I will update the Boilerplate with the Internationalization plugin.  A solution for including localized text is in the roadmap and will be included in a future release of the project.

**Why are you no longer using the Require.js text plugin?**

   -I found that the text plugin was causing problems when I created my Jasmine unit tests, so I opted to use nested templates inside of my HTML file instead.

**How do I use the Require.js Optimizer script for my project?**

   -Make sure that you have node.js installed.  Next, navigate inside of the js folder and run the command "node r.js -o app.build.js".  After the Require.js Optimizer is done minifying and concatenating your Desktop and Mobile Projects, it will create a js-optimized folder at the same folder level as the js folder.  Navigate inside of the js-optimized folder and look at both desktop.js and mobile.js (these files contain your entire projects).  Finally, inside of index.html, update the `data-main` attribute on both of the script tags that includes Require.js and your desktop and mobile projects.  Make sure to reference the js-optimized folder instead of the js folder.  That's it!

**You're not using Grunt for your build process?  Are you some sort of newb?**

   -Yes.  If someone could show me how to integrate the Require.js optimizer with Grunt I would be very appreciative.

**Do I have to use everything the boilerplate gives me?**

   -No!  Feel free to update the boilerplate to fit the needs of your application.  Certain things that you might not want/need include templates, mobile and desktop versions, Modernizr, etc.

**Do I need a web server to test the boilerplate?**

   -Nope!

**Can I contribute to this project?**

   -Please do!  I am learning just like you.  If you want to contribute, please send pull requests to the dev branch.

##Change Log

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
- The Require.js Optimizer build file (app.build.js) has been simplified by adding a `mainConfigFile` option that points to the desktop main file.  Keep in mind that all of your mobile and desktop shims and paths need to be in desktop.js

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
Greg Franko

## License
Copyright (c) 2012 Greg Franko  
Licensed under the MIT license.		
		  

	

