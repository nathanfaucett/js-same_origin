sameOrigin
=======

same origin url checker

```javascript
var sameOrigin = require("@nathanfaucett/same_origin");


sameOrigin("http://bob.com/request", "http://test.com") === false;

sameOrigin("http://test.com:9999/request", "http://test.com:3000") === false;
sameOrigin("http://test.com:1234/request", "http://test.com:443") === false;
sameOrigin("http://test.com:4321/request", "http://test.com:80") === false;

sameOrigin("http://test.com:9999/request", "http://test.com:9999") === true;

sameOrigin("https://test.com/request", "https://test.com:80") === true;
sameOrigin("https://test.com/request", "https://test.com:443") === true;
```
