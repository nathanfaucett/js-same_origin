var urlPath = require("url_path"),
    environment = require("environment");


var reURL = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    browserOriginParts;


module.exports = sameOrigin;


function sameOrigin(url, origin) {
    var parts, originParts;

    if (!urlPath.isAbsoluteURL(url)) {
        return true;
    }

    parts = reURL.exec(url.toLowerCase());
    if (!parts) {
        return false;
    }

    originParts = reURL.exec(origin.toLowerCase());
    if (!originParts) {
        return false;
    }

    return campare(parts, originParts);
}

if (environment.browser) {
    browserOriginParts = reURL.exec(location.origin.toLowerCase()) || [];

    sameOrigin.browser = function(url) {
        var parts;

        if (!urlPath.isAbsoluteURL(url)) {
            return true;
        }

        parts = reURL.exec(url.toLowerCase());
        if (!parts) {
            return false;
        }

        return campare(parts, browserOriginParts);
    };
}

function campare(a, b) {
    var aPort = a[3],
        bPort = b[3];

    return !(
        (a[1] !== b[1]) ||
        (a[2] !== b[2]) || !(
            (aPort === bPort) ||
            (!aPort && (bPort === "80" || bPort === "443")) ||
            (!bPort && (aPort === "80" || aPort === "443"))
        )
    );
}
