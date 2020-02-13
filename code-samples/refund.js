const express = require('express');
const app = express();
const port = 3000;

const fasterpay = require('fasterpay-node');

let gateway = new fasterpay.Gateway({
    publicKey: '<your public key>',
    privateKey: '<your private key>',
    isTest: 0 // Use 1 for Test Method
});

app.get('/refund', (req, res) => {
  let refundResponse = gateway.Payment().refund(req.query.orderId, req.query.amount);
  res.send(refundResponse);
});

app.listen(port, () => {
    console.log(`The app is running on http://localhost:${port}`);
});
