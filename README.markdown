Backbone-Require-Boilerplate
============================
![Example](http://backbonejs.org/docs/images/backbone.png) ![Example](http://requirejs.org/i/logo.png)

#Description
A Backbone.js and Require.js Boilerplate that promotes decoupling your JavaScript into modules, separating business logic from application logic using Models and Views, reusing your JavaScript between Desktop and Mobile Web versions, including non-AMD Compatible Third Party Scripts in your project, and optimizing all of your JavaScript (minify, concatenate, etc).

#Getting Started
   1. Clone this repository
   2. Download and install [Node.js](http://nodejs.org/#download) (this is used to run the Require.js Optimizer)
   3. Download, install, and start a local web server (eg. [XAMPP](http://www.apachefriends.org/en/xampp.html)).  Make sure to put this repository in your local web server's public folder (eg. htdocs).

   **Note**: A local web server is required because Backbone-Require-Boilerplate dynamically pulls in an HTML dependency (a template), and IE and Chrome have local security restrictions that do not allow this action.  If you don't want to download and install a local web server, then you should be able to test the code locally with Firefox.  Keep in mind that if you remove the template, the code will work fine locally in all browsers.
   4. Enjoy using Backbone.js, Require.js, jQuery, Lodash, and Modernizr (enjoyment optional)

#Tour of the Boilerplate Files

index.html
----------
   Uses a large portion of the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) HTML and CSS.  You will notice there is a JavaScript mobile browser detection script (inspired from [detectmobilebrowsers.com](http://detectmobilebrowsers.com/)) to determine if a user is using a mobile or desktop browser.

   If a mobile browser is found, then Require.js is included within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `mobile` (this tells Require.js to look for a mobile.js file in the js folder).  If a desktop device is found, then Require.js is included within the HTML page, and the Require.js script tag HTML5 data attribute, `data-main`, is set to `desktop` (this tells Require.js to look for a desktop.js file in the js folder).

   **Note**: You do not need to use the mobile detection script for your application.  I just put it in so that you could see an example of how to separate your Mobile and Desktop JavaScript logic.

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

   There is currently only one route listed (which gets called if there is no hash tag on the url), but feel free to create more for your application.  The only code worth noting in here is view.js's `render` method being called and anotherView.js's `promptUser` method is being called.  The render method will put the "Your Template says: You are now using Backbone, Lodash, Require, Modernizr, and jQuery!" text on the screen.  To call the view's `render` method, view.js is listed as a dependency and included on the page.  The promptUser method of the `anotherView` class will issue a text prompt immediately to the user.  You will not find a promptUser method inside of the `anotherView` class, but the method call will still work because the `anotherView` class extends view.js (which does have a promptUser method).

   **Note**: You must keep the `Backbone.history.start()` method call, since this is what triggers Backbone to start reacting to hashchange events

desktopRouter.js
----------------
   desktopRouter.js has the exact same code as *mobileRouter.js*.  The difference is this is where you can include desktop specific scripts that you do not want included in your mobile web application.

view.js
-------
   view.js will be used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery, backbone, model.js, and main.html.  You will notice that the string `text!` is included before main.html.  This tells Require.js to use the Require.js text plugin to dynamically include the main.html file (very handy for storing templates in separate files and then including them dynamically).  Keep in mind that the standard for Require.js plugins is to list the name of the plugin followed by an exclamation point before a dependency.

   The rest of the file is a pretty standard Backbone.js View class:
		
   Backbone.js View's have a one-to-one relationship with DOM elements, and a View's DOM element is listed in the `el` property.  After the `el` property is set, the View's model attribute is set to a new instance of the Model returned by model.js (which was listed at the top as a dependency).  Next, the View's `template` property is set using the [Underscore.js](https://github.com/documentcloud/underscore) `template` method ported to Lodash.

   **Note**: If you have read all of the documentation up until this point, you will most likely have already noticed that [lodash](https://github.com/bestiejs/lodash) is being used instead of Underscore.js.  Apart from having a bit better cross-browser performance and stability than Underscore.js, lodash also provides a custom build process.  Although I have provided a version of lodash that has all of the Underscore.js methods you would expect, you can download a custom build and swap that in.

   Next, you will find an `events` object with one property.  Here is where all of your View DOM event handlers associated with the HTML element referenced by your View's `el` property should be stored.  Keep in mind that Backbone is using the jQuery `delegate` method, so it expects a selector that is within your View's `el` property.  The one event handler I listed binds a click event to the View's `el` element (event delegation) and gives it an id context of `example`.  I then provide a method to be called when the event is triggered (by providing the method name).

   I am also declaring a `render` method on my View.  Backbone expects you to override the `render` method with your own functionality, so that is what I did.  All my `render` method does is append the View's template to the page.

   **Note**: You do not need to use Underscore.js templates.  In fact, you don't need to use templates at all.  I just included them so you would understand how to use them.

   Finally, I am returning a View class.

anotherView.js
--------------
   anotherView.js doesn't do much.  It is there to show you a pattern for extending Backbone View's.  anotherView.js extends view.js.

main.html
---------
   Your Underscore.js template.  Templates are typically a useful way for you to update your View (the DOM) if a Model attribute changes.  Templates are also useful when you have a lot of HTML and JavaScript that you need to fit together, and instead of concatenating HTML strings inside of your JavaScript, templates provide a cleaner solution.  Look at Underscore's documentation to read more about the syntax of Underscore.js templates.

model.js
--------
   model.js is used by both the mobile and desktop versions of your application.  It starts with a define method that lists jquery and backbone as dependencies.

   The rest of the file is a pretty standard Backbone.js Model class (with pretty much everything left up to you to complete), except...

   A default property, `message` with the string "You are now using Backbone, Lodash, Require, Modernizr, and jQuery!".  This will eventually be printed to the `index.html` page.

   Also, The Backbone.js `validate` method is provided for you.  This method is called any time an attribute of the model is set.  Keep in mind that all model attributes will be validated (once set), even if a different model attribute is being set/validated.  This does not make much sense to me, so feel free to create your own validation mechanism.

   Finally, a new Model class is returned.

app.build.js
------------
   This file is ready made for you to have your entire project optimized using the Require.js Optimizer (r.js).  The file is commented with instructions on how to use it, so I am not going to list the directions here.  If you have any questions just ask.

#FAQ

**What libraries have you included?**

   -Backbone, Require, jQuery, Lodash, and Modernizr

**What Require.js plugins are you using?**

   -The text plugin.  I was previously using Use.js to load non-AMD compatible scripts, but Require.js 2.0 now provides this functionality.

**Why are you not using the Require.js Internationalization plugin?**

   -I found that when I built using the Require.js Optimizer, only one lang-locale could be included per optimized file.  That would mean, that if you had to support 10 different langs/locales, you would need 20 different optimized builds (Desktop and Mobile).  If I am mistaken about this, please let me know, and I will update the Boilerplate with the Internationalization plugin.  A solution for including localized text is in the roadmap and will be included in a future release of the project.

**How do I use the Require.js Optimizer script for my project?**

   -Make sure that you have node.js installed.  Next, navigate inside of the js folder and run the command "node r.js -o app.build.js".  After the Require.js Optimizer is done minifying and concatenating your Desktop and Mobile Projects, it will create a js-optimized folder at the same folder level as the js folder.  Navigate inside of the js-optimized folder and look at both desktop.js and mobile.js (these files contain your entire projects).  Finally, inside of index.html, update the `data-main` attribute on both of the script tags that includes Require.js and your desktop and mobile projects.  Make sure to reference the js-optimized folder instead of the js folder.  That's it!

**Why haven't you included a unit testing framework with this boilerplate?**

   -Because I am lazy.  I will eventually get around to it.  My current favorite framework is Jasmine, so I will most likely be including that.

**You're not using Grunt for your build process?  Are you some sort of newb?**

   -Yes.  If someone could show me how to integrate the Require.js optimizer with Grunt I would be very appreciative.

**Do I have to use everything the boilerplate gives me?**

   -No!  Feel free to update the boilerplate to fit the needs of your application.  Certain things that you might not want/need include templates, mobile and desktop versions, Modernizr, etc.

**Do I need a local web server to test the boilerplate?**

   -Kind of.  The boilerplate works locally in Firefox, but both IE and Chrome complain about the Require.js text loader plugin, which dynamically pulls in a template.  If you are not able to use a local web server, such as XAMPP, [James Gibson](https://github.com/jamesgibson14) has provided the following instructions to test the boilerplate in IE9 and Chrome:

   IE 9: Add this code
   
      if (navigator.appName == 'Microsoft Internet Explorer' && location.toString().indexOf('file')==0) {

         window.XMLHttpRequest = function() {
   
            try {
   
               //this sets the HttpRequest to use different version which does allow local file access.
               return new ActiveXObject('MSXML2.XMLHTTP.3.0');
            
            }
            catch (ex) {
   
               return null;
   
            }
         }
      }

   Chrome: Make a shortcut to chrome with commanline args:

       drive:\PathToChrome\Chrome.exe --allow-file-access-from-files

**Can I contribute to this project?**

   -Please do!  I am learning just like you.

##Change Log

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
		  

	

