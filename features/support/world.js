var expect = require('chai').expect;
var assert = require('chai').assert;
var webdriverjs = require("webdriverjs");
var client = webdriverjs.remote({
    desiredCapabilities: {
        // You may choose other browsers
        browserName: 'firefox' //firefox// //phantomjs//
    },
    // webdriverjs has a lot of output which is generally useless
    // However, if anything goes wrong, remove this to see more details
    logLevel: 'verbose'
});
client.addCommand('hasText', function (selector, text, callback) {
    this.getText(selector, function (error, result) {
        expect(result).to.have.string(text);
        callback();
    });
});

client.addCommand('waitUntilVisible', function (element, callback) {
    var self = this;

    function checkElement() {
        self.isVisible(element, function (error, result) {
            if (result === true) {
                callback();
            } else {
                setTimeout(checkElement, 500);
            }
        });
    }

    checkElement();
});

client.addCommand("getUrlAndTitle", function (callback) {
    this.url(function (err, urlResult) {
        this.getTitle(function (err, titleResult) {
            var specialResult = { url: urlResult.value, title: titleResult };
            if (typeof callback == "function") {
                callback(err, specialResult);
            }
        })
    });
});


client.addCommand("getUrl", function (url, callback) {
    this.url(function (err, urlResult) {
        this.getTitle(function (err, titleResult) {
            var specialResult = { url: urlResult.value, title: titleResult };
            if (typeof callback == "function") {
                callback(err, specialResult);
            }
        })
    });
});


client.init();


var World = function World(callback) {
    this.assert = assert;
    this.expect = expect;
    this.browser = client; // this.browser will be available in step definitions
    var baseurl = "http://localhost:8001";

    this.visit = function (url, callback) {
        this.browser.url(url, callback);
    };

    this.getUrlAndTitle = function (callback) {
        this.browser.getUrlAndTitle(callback);
    };

    this.hasText = function (selector, text, callback) {
        this.browser.hasText(selector, text, callback);
    };


    this.findURL = function (url) {
        return baseurl;
    }

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};

exports.World = World;
