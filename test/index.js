var tape = require("tape"),
    sameOrigin = require("..");


tape("sameOrigin(url, origin) should return true if the url is from the same origin", function(assert) {

    assert.equal(sameOrigin("http://bob.com/request", "http://test.com"), false);

    assert.equal(sameOrigin("http://test.com:9999/request", "http://test.com:3000"), false);
    assert.equal(sameOrigin("http://test.com:1234/request", "http://test.com:443"), false);
    assert.equal(sameOrigin("http://test.com:4321/request", "http://test.com:80"), false);

    assert.equal(sameOrigin("http://test.com:9999/request", "http://test.com:9999"), true);

    assert.equal(sameOrigin("https://test.com/request", "https://test.com:80"), true);
    assert.equal(sameOrigin("https://test.com/request", "https://test.com:443"), true);

    assert.end();
});
