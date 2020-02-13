const request = require('sync-request');

class Payment {
    constructor(gateway) {
        this.gateway = gateway;
    }

    refund(orderId, amount){
        let refundUrl = `${this.gateway.getConfig().getApiBaseUrl()}/payment/${orderId.toString(8)}/refund`;

        let apiResponse = this.processHttpRequest('POST', refundUrl, { 'X-ApiKey': this.gateway.getConfig().getPrivateKey() }, { 'amount': amount });

        return apiResponse;
    }

    deliver(deliveryInfo){
      let deliveryApiUrl = `${this.gateway.getConfig().getApiBaseUrl()}/api/v1/deliveries`;

      let apiResponse = this.processHttpRequest('POST', deliveryApiUrl, { 'X-ApiKey': this.gateway.getConfig().getPrivateKey() }, deliveryInfo);

      return apiResponse;
    }

    processHttpRequest(method, url, headers, data) {
      // console.log(data, headers, url, method);
      let apiResponse = request(method, url, {headers:headers, json: data })

      if (apiResponse.statusCode === 200) {
          return JSON.parse(apiResponse.getBody('utf8'));
      }

      return false;
    }
}

module.exports = { Payment: Payment };
