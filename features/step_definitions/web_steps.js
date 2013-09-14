//Sample web steps
var stepDefs = function () {
    this.World = require("../support/world.js").World;

    //Navigate to page
    this.Given(/^I am on the "([^"]*)" page$/, function (url, callback) {
        this.visit(this.findURL(url), callback);
    });

    //Populate input text field
    this.Given(/^I enter "([^"]*)" in the "([^"]*)" field$/, function (text, field, callback) {
        var expect = this.expect;
        var field = "#" + field;
        this.browser.waitFor(field, 200, function (error) {
            this.setValue(field, text, callback)
        })
    });

    //Click a button
    this.When(/^I click on the "([^"]*)" button$/, function (btn, callback) {
        var expect = this.expect;
        var btnId = this.findButton(btn);
        this.browser.waitFor(btnId, 200, function (error) {
            this.click(btnId, callback);
        })

    });
    
    //verify page title
    this.Then(/^I see the "([^"]*)" page title$/, function(title, callback) {
        var assert = this.assert;
        var expect = this.expect;
       
        this.getUrlAndTitle(function(error,result){
            expect(error).to.be.null;
            assert.strictEqual(result.title.toLowerCase(),title.toLowerCase());
            callback();
        })
    });

}

module.exports = stepDefs;

