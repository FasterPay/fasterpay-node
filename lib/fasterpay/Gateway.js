const Config = require('./Config.js').Config;
const PaymentForm = require('./PaymentForm.js').PaymentForm;
const Signature = require('./Signature.js').Signature;
const Pingback = require('./Pingback.js').Pingback;
const Subscription = require('./Subscription.js').Subscription;
const Payment = require('./Payment.js').Payment;

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

    Subscription() {
        return new Subscription(this);
    }

    Payment() {
        return new Payment(this);
    }

    getConfig() {
        return this.config;
    }
}

module.exports = { Gateway: Gateway };
