const express = require('express');
const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

const app = express();
const port = 3004;

// Enable CORS for all routes
app.use(cors());

// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory store for transactions
const transactions = {};

// Generate QR Code endpoint
app.post('/generateQR', (req, res) => {
    const amount = parseFloat(_.get(req, ["body", "amount"]));
    const cartItems = _.get(req, ["body", "cartItems"], []);
    const mobileNumber = '0623607693'; // Replace with your actual mobile number
    const payload = generatePayload(mobileNumber, { amount });
    const options = {
        color: {
            dark: '#000000', // QR Code color
            light: '#FFFFFF', // Background color
        },
    };

    // Generate a unique transaction ID
    const transactionId = Date.now().toString();

    // Store the transaction details
    transactions[transactionId] = { amount, cartItems, status: 'pending' };

    QRCode.toDataURL(payload, options, (err, url) => {
        if (err) {
            console.error('QR Code generation failed:', err);
            return res.status(400).json({
                RespCode: 400,
                RespMessage: 'Failed to generate QR code: ' + err,
            });
        }
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'QR code generated successfully',
            Result: url,
            TransactionId: transactionId,
        });
    });
});

// Check Payment Status endpoint
app.post('/checkPaymentStatus', (req, res) => {
    const transactionId = _.get(req, ["body", "transactionId"]);
    const transaction = transactions[transactionId];

    if (!transaction) {
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'Transaction not found',
        });
    }

    // Simulate checking payment status
    const paymentStatus = {
        transactionId: transactionId,
        status: transaction.status, // This should be updated based on the actual payment status
        amount: transaction.amount,
        timestamp: new Date().toISOString(),
    };

    return res.status(200).json({
        RespCode: 200,
        RespMessage: 'Payment status retrieved successfully',
        Result: paymentStatus,
    });
});

// Endpoint to manually update the transaction status for testing purposes
app.post('/updateTransactionStatus', (req, res) => {
    const transactionId = _.get(req, ["body", "transactionId"]);
    const status = _.get(req, ["body", "status"]);

    if (!transactions[transactionId]) {
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'Transaction not found',
        });
    }

    transactions[transactionId].status = status;

    return res.status(200).json({
        RespCode: 200,
        RespMessage: 'Transaction status updated successfully',
    });
});

// Endpoint to retrieve order details
app.get('/orderDetails/:transactionId?', (req, res) => {
    const transactionId = req.params.transactionId;
  
    if (transactionId) {
        const transaction = transactions[transactionId];
      
        if (!transaction) {
          return res.status(400).json({
            RespCode: 400,
            RespMessage: 'Transaction not found',
          });
        }
      
        return res.status(200).json({
          RespCode: 200,
          RespMessage: 'Order details retrieved successfully',
          Result: {
            cartItems: transaction.cartItems,
            amount: transaction.amount,
          },
        });
    } else {
        const allTransactions = Object.keys(transactions).map(id => ({
            transactionId: id,
            ...transactions[id]
        }));
      
        return res.status(200).json({
          RespCode: 200,
          RespMessage: 'All transactions retrieved successfully',
          Result: allTransactions,
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
