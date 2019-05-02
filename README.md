# Welcome to FasterPay Node.js SDK

FasterPay Node.js SDK enables you to integrate the FasterPay's Checkout Page seamlessly without having the hassle of integrating everything from scratch. Once your customer is ready to pay, FasterPay will take care of the payment, notify your system about the payment and return the customer back to your Thank You page.

## Setting up the Node.js SDK for your project
```sh
$ npm install fasterpay-node --save
```

This example uses Express.js for the sake of simplicity.
```sh
$ npm install express --save
```

## Initiating Payment Request using PHP SDK
```javascript
const express = require('express');
const app = express();
const port = 3000;

const fasterpay = require('fasterpay-node');

let gateway = new fasterpay.Gateway({
    publicKey: '<your public key>',
    privateKey: '<your private key>',
    isTest: 0 // Use 1 for Test Method
});

let paymentForm = gateway.PaymentForm().buildForm({
    'description': 'Test order',
    'amount': '10',
    'currency': 'USD',
    'merchant_order_id': 'xxxxxx',
    'success_url': `http://localhost:${port}`
});

app.get('/', (req, res) => {
    res.send(paymentForm);
});

app.listen(port, () => {
    console.log(`The app is running on http://localhost:${port}`);
});

```
For more information on the API Parameters, refer to our entire API Documentation [here](https://docs.fasterpay.com/api#section-custom-integration)

## FasterPay Test Mode
FasterPay has a Sandbox environment called Test Mode. Test Mode is a virtual testing environment which is an exact replica of the live FasterPay environment. This allows businesses to integrate and test the payment flow without being in the live environment. Businesses can create a FasterPay account, turn on the **Test Mode** and begin to integrate the widget using the test integration keys.

### Initiating FasterPay Gateway in Test-Mode
```javascript
let gateway = new fasterpay.Gateway({
    publicKey: '<your public key>',
    privateKey: '<your private key>',
    isTest: 1 // Use 0 for Live Mode
});
```

### Questions?
* Common questions are covered in the [FAQ](https://www.fasterpay.com/support).
* For integration and API questions, feel free to reach out Integration Team via [integration@fasterpay.com](mailto:integration@fasterpay.com)
* For business support, email us at [merchantsupport@fasterpay.com](mailto:merchantsupport@fasterpay.com)
* To contact sales, email [sales@fasterpay.com](mailto:sales@fasterpay.com).
