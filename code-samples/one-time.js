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
