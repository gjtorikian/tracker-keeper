var assert = require("assert"),
    webdriver = require("selenium-webdriver"),
    server = require('./server');

describe("testing javascript in the browser", function() {
  before(function () {
    server();
  });

  beforeEach(function() {
    if (process.env.SAUCE_USERNAME != undefined) {
      this.browser = new webdriver.Builder()
      .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
      .withCapabilities({
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        build: process.env.TRAVIS_BUILD_NUMBER,
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        browserName: "chrome"
      }).build();
    } else {
      this.browser = new webdriver.Builder()
      .withCapabilities({
        browserName: "chrome"
      }).build();
    }

    return this.browser.get("http://localhost:8888/index.html");
  });

  afterEach(function() {
    return this.browser.quit();
  });

  it("should block YouTube embeds", function(done) {
    var html = this.browser.findElement(webdriver.By.css('html'));
    this.browser.wait(webdriver.until.elementLocated(webdriver.By.css('.dnt-warning')), 10000, 'Could not locate the child element within the time specified');
    html.getInnerHtml().then(function(text) {
      console.log(text)
      assert(/does not respect DNT/.test(text));
      done();
    });
  });
});
