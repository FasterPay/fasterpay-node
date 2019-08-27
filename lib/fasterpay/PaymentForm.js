const forIn = require('for-in');

class PaymentForm {
    constructor(gateway) {
        this.endPoint = '/payment/form';
        this.formAmountField = 'amount';
        this.formDescriptionField = 'description';
        this.formCurrencyField = 'currency';
        this.formApiKeyField = 'api_key';
        this.formMerchantOrderIdField = 'merchant_order_id';
        this.formSuccessUrl = 'success_url';
        this.formHashField = 'hash';

        this.formRecurringNameField = 'recurring_name';
        this.formRecurringSkuIdField = 'recurring_sku_id';
        this.formRecurringPeriodField = 'recurring_period';

        this.formRecurringTrialAmountField = 'recurring_trial_amount';
        this.formRecurringTrialPeriodField = 'recurring_trial_period';
        this.formSignatureField = 'sign_version';

        this.gateway = gateway;
    }

    getBasicPaymentFields() {
        return [
            this.formAmountField,
            this.formDescriptionField,
            this.formCurrencyField,
            this.formApiKeyField,
            this.formMerchantOrderIdField,
            this.formSuccessUrl
        ];
    }

    getSubscriptionPaymentFields() {
        return [
            this.formRecurringNameField,
            this.formRecurringSkuIdField,
            this.formRecurringPeriodField
        ];
    }

    getSubscriptionTrialFields() {
        return [
            this.formRecurringTrialAmountField,
            this.formRecurringTrialPeriodField
        ];
    }

    buildForm(parameters, options) {
        parameters[this.formApiKeyField] = this.gateway.getConfig().getPublicKey();
        parameters[this.formHashField] = this.gateway.Signature().calculateHash(parameters, parameters[this.formSignatureField]);

        let form = `<form align="center" method="post" action="${this.gateway.getConfig().getApiBaseUrl()}${this.endPoint}" name="fasterpay_payment_form" id="fasterpay_payment_form">`;

        forIn(parameters, function(value, key) {
            form += `<input type="hidden" name="${key}" value="${value}" />`;
        });

        if ('autoSubmit' in options && options['autoSubmit'] === true) {
            form += '<script>document.getElementById("fasterpay_payment_form").submit();</script>'
        }

        if ('hidePayButton' in options && options['hidePayButton'] === true) {
            form += '';
        } else {
            form += '<input type="Submit" value="Pay Now" id="fasterpay_submit"/></form>';
        }

        return form;
    }
}

module.exports = { PaymentForm: PaymentForm };
