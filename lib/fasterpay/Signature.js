const crypto = require('crypto');
const httpBuildQuery = require('http-build-query');

class Signature {
    constructor(gateway) {
        this.gateway = gateway;
    }

    calculateHash(parameters, sign_version='v1') {
        let keys = Object.keys(parameters);
        let keysSorted = keys.sort(function(a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();

            return (a < b) ? -1 : (a > b) ? 1 : 0;
        });

        let parametersSorted = {};

        keysSorted.forEach(key => {
            parametersSorted[key] = parameters[key];
        });

        if(sign_version == 'v2'){
            let encodedString = this.getEncodedString(parametersSorted);
            return crypto.createHmac('sha256', `${this.gateway.getConfig().getPrivateKey()}`).update(encodedString).digest('hex');
        } else {
            return crypto.createHash('sha256').update(`${httpBuildQuery(parametersSorted)}${this.gateway.getConfig().getPrivateKey()}`).digest('hex');
        }
    }

    getEncodedString(parameters) {
        let encodedString = '';
        let keys = Object.keys(parameters);

        keys.forEach(key => {
            encodedString += `${key}=${parameters[key]};`;
        });

        return encodedString;
    }

    calculatePingbackHash(pingbackData, expectedSignature) {
        let expectedSignatureBuffer = Buffer.from(expectedSignature, 'hex');
        let calculatedHashBuffer = Buffer.from(crypto.createHmac('sha256', `${this.gateway.getConfig().getPrivateKey()}`).update(pingbackData).digest('hex'), 'hex');

        return crypto.timingSafeEqual(expectedSignatureBuffer, calculatedHashBuffer);
    }
}

module.exports = { Signature: Signature };
