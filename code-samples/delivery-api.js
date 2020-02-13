const express = require('express');
const app = express();
const port = 3000;

const fasterpay = require('fasterpay-node');

let gateway = new fasterpay.Gateway({
    publicKey: '<your public key>',
    privateKey: '<your private key>',
    isTest: 0 // Use 1 for Test Method
});

app.get('/deliver-goods', (req, res) => {
    let deliveryInfo = {
      "payment_order_id": '88777999',
      "merchant_reference_id": '1581593514527',
      "type": 'digital',
      "status": 'order_placed',
      "refundable": true,
      "details": 'Order Placed Today',
      "product_description": 'Golden Ticket',
      "public_key": gateway.getConfig().getPublicKey(),
      "shipping_address": {
        "email": 'jon.doe@example.com',
      },
      "notify_user": true
    };

    let response = gateway.Payment().deliver(deliveryInfo);
    res.send(response);
});

app.listen(port, () => {
    console.log(`The app is running on http://localhost:${port}`);
});
