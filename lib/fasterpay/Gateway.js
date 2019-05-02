const Config = require('./Config.js').Config;
const PaymentForm = require('./PaymentForm.js').PaymentForm;
const Signature = require('./Signature.js').Signature;
const Pingback = require('./Pingback.js').Pingback;

class Gateway {
    constructor(config) {
        this.config = new Config(config);
    }

    PaymentForm() {
        return new PaymentForm(this);
    }

    Signature() {
        return new Signature(this);
    }

    Pingback() {
        return new Pingback(this);
    }

    getConfig() {
        return this.config;
    }
}

module.exports = { Gateway: Gateway };
