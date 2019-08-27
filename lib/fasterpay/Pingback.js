class Pingback {
    constructor(gateway) {
        this.gateway = gateway;
    }

    validate(requestParams) {
        let signVersion = 'v1';
        let headers = requestParams.headers;

        if ('x-fasterpay-signature-version' in headers) {
            signVersion = headers['x-fasterpay-signature-version'];
        }

        if (signVersion === 'v1'){
            return this.validateV1(headers);
        } else {
            return this.validateV2(requestParams);
        }

        return false;
    }

    validateV1(headers) {
        if (Object.keys(headers).length === 0) {
            return false;
        }

        if (!('x-apikey' in headers)) {
            return false;
        }

        if (headers['x-apikey'] === `${this.gateway.getConfig().getPrivateKey()}`) {
            return true;
        }

        return false;
    }

    validateV2(requestParams) {
        let headers = requestParams.headers;
        let body = requestParams.body;

        if (Object.keys(headers).length === 0) {
            return false;
        }

        if (!('x-fasterpay-signature' in headers)) {
            return false;
        }

        let currentTs = Math.round(new Date().getTime()/1000);

        if ((currentTs - body.pingback_ts) > 300) {
            return false;
        }

        return this.gateway.Signature().calculatePingbackHash(requestParams['rawBody'], headers['x-fasterpay-signature']);
    }
}

module.exports = { Pingback: Pingback };
