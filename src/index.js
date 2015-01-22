var urlPath = require("url_path");


var reURL = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/;


module.exports = function sameOrigin(url, origin) {
    var parts, urlPort, testPort;

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

    urlPort = originParts[3];
    testPort = parts[3];

    return !(
        (parts[1] !== originParts[1]) ||
        (parts[2] !== originParts[2]) || !(
            (testPort === urlPort) ||
            (!testPort && (urlPort === "80" || urlPort === "443")) ||
            (!urlPort && (testPort === "80" || testPort === "443"))
        )
    );
};
