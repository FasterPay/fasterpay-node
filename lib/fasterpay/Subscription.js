const request = require("sync-request");

class Subscription {
    constructor(gateway) {
        this.gateway = gateway;
    }

    cancel(subcsriptionId){
    	let cancelUrl = `${this.gateway.getConfig().getApiBaseUrl()}/api/subscription/${subcsriptionId.toString(8)}/cancel`;

    	let apiResponse = request('POST', cancelUrl, { headers: {'X-ApiKey': this.gateway.getConfig().getPrivateKey() }});
    	
    	if(apiResponse.statusCode == 200) {
    		return JSON.parse(apiResponse.getBody('utf8'));
    	} 
    	return false;
    }
}

module.exports = { Subscription: Subscription };