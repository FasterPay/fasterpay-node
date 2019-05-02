const crypto = require('crypto');
// @TODO Replace 3rd party http-build-query with native querystring
const httpBuildQuery = require('http-build-query');

class Signature {
    constructor(gateway) {
        this.gateway = gateway;
    }

    calculateHash(parameters) {
        let keys = Object.keys(parameters);
        let keysSorted = keys.sort(function(a, b) { return a[0] > b[0]; });
        let parametersSorted = {};

        keysSorted.forEach(key => {
            parametersSorted[key] = parameters[key];
        });

        return crypto.createHash('sha256').update(`${httpBuildQuery(parametersSorted)}${this.gateway.getConfig().getPrivateKey()}`).digest('hex');
    }
}

module.exports = { Signature: Signature };
