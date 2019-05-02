const Config = require('./fasterpay/Config.js').Config;
const Gateway = require('./fasterpay/Gateway.js').Gateway;
const PaymentForm = require('./fasterpay/PaymentForm.js').PaymentForm;
const Pingback = require('./fasterpay/Pingback.js').Pingback;
const Signature = require('./fasterpay/Signature.js').Signature;

module.exports = {
    Config: Config,
    Gateway: Gateway,
    PaymentForm: PaymentForm,
    Pingback: Pingback,
    Signature: Signature
};
