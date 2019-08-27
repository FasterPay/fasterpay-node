const request = require('sync-request');

class Payment {
    constructor(gateway) {
        this.gateway = gateway;
    }

    refund(orderId, amount){
        let refundUrl = `${this.gateway.getConfig().getApiBaseUrl()}/payment/${orderId.toString(8)}/refund`;

        let apiResponse = request('POST', refundUrl, { headers: { 'X-ApiKey': this.gateway.getConfig().getPrivateKey() } }, { 'amount': amount });

        if (apiResponse.statusCode === 200) {
            return JSON.parse(apiResponse.getBody('utf8'));
        }

        return false;
    }
}

module.exports = { Payment: Payment };
