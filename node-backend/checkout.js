const express = require('express');
const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const mysql2 = require('mysql2');

const app = express();
const port = 3004;

// Enable CORS for all routes
app.use(cors());

// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory store for transactions
const transactions = {};

// สร้างการเชื่อมต่อกับฐานข้อมูล
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // แทนที่ด้วยรหัสผ่านของคุณ
  database: 'restapi',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Generate QR Code endpoint
app.post('/generateQR', (req, res) => {
    const amount = parseFloat(_.get(req, ["body", "amount"]));
    const cartItems = _.get(req, ["body", "cartItems"], []);
    const userId = _.get(req, ["body", "userId"]); // ดึง userId จากคำขอ
    const mobileNumber = '0623607693'; // Replace with your actual mobile number
    const payload = generatePayload(mobileNumber, { amount });
    const options = {
        color: {
            dark: '#000000', // QR Code color
            light: '#FFFFFF', // Background color
        },
    };

    if (!userId) {
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'User ID is required',
        });
    }

    // Generate a unique transaction ID
    const transactionId = Date.now().toString();

    // Store the transaction details in the database
    const insertTransactionQuery = `
        INSERT INTO transactions (user_id, amount, status)
        VALUES (?, ?, 'pending')
    `;

    db.query(insertTransactionQuery, [userId, amount], (error, results) => {
        if (error) {
            console.error('Error saving transaction:', error);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Failed to save transaction',
            });
        }

        const transactionId = results.insertId;

        // Store each cart item in transaction_items
        const insertItemQuery = `
            INSERT INTO transaction_items (transaction_id, product_id, pro_name, quantity, price)
            VALUES (?, ?, ?, ?, ?)
        `;

        cartItems.forEach(item => {
            db.query(insertItemQuery, [transactionId, item.productId, item.pro_name, item.quantity, item.price], (error) => {
                if (error) {
                    console.error('Error saving transaction item:', error);
                }
            });
        });

        // Generate the QR code
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

// เพิ่ม endpoint สำหรับบันทึกที่อยู่พร้อมเบอร์โทรศัพท์
app.post('/saveAddress', (req, res) => {
    const { user_id, address_line1, address_line2, city, state, postal_code, country, phone_number } = req.body;

    if (!user_id) {
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'User ID is required',
        });
    }

    const query = `
        INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country, phone_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [user_id, address_line1, address_line2, city, state, postal_code, country, phone_number], (error, results) => {
        if (error) {
            console.error('Error saving address:', error);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Failed to save address',
            });
        }

        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Address saved successfully',
        });
    });
});

// Endpoint สำหรับลบที่อยู่
app.post('/deleteAddress', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'Address ID is required',
        });
    }

    const query = 'DELETE FROM addresses WHERE id = ?';

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error deleting address:', error);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Failed to delete address',
            });
        }

        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Address deleted successfully',
        });
    });
});

// Endpoint สำหรับแก้ไขที่อยู่พร้อมเบอร์โทรศัพท์
app.post('/updateAddress', (req, res) => {
    const { id, address_line1, address_line2, city, state, postal_code, country, phone_number } = req.body;

    if (!id) {
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'Address ID is required',
        });
    }

    const query = `
        UPDATE addresses
        SET address_line1 = ?, address_line2 = ?, city = ?, state = ?, postal_code = ?, country = ?, phone_number = ?
        WHERE id = ?
    `;

    db.query(query, [address_line1, address_line2, city, state, postal_code, country, phone_number, id], (error, results) => {
        if (error) {
            console.error('Error updating address:', error);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Failed to update address',
            });
        }

        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Address updated successfully',
        });
    });
});

// Endpoint สำหรับดึงที่อยู่ที่มีอยู่ของผู้ใช้
app.get('/addresses/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT * FROM addresses WHERE user_id = ?
    `;

    db.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Error fetching addresses:', error);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Failed to fetch addresses',
            });
        }

        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Addresses retrieved successfully',
            Result: results,
        });
    });
});

// เพิ่ม endpoint สำหรับดึงข้อมูลธุรกรรมของผู้ใช้
app.get('/transactions/:userId', (req, res) => {
    const { userId } = req.params;
  
    const query = `
      SELECT t.id AS transaction_id, t.amount, t.date, t.status, 
             ti.product_id, ti.pro_name, ti.quantity, ti.price, 
             a.address_line1, a.address_line2, a.city, a.state, a.postal_code, a.country, a.phone_number
      FROM transactions t
      JOIN transaction_items ti ON t.id = ti.transaction_id
      LEFT JOIN addresses a ON t.user_id = a.user_id
      WHERE t.user_id = ?
      ORDER BY t.date DESC
    `;
  
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({
          RespCode: 500,
          RespMessage: 'Failed to fetch transactions',
        });
      }
  
      const transactions = results.reduce((acc, row) => {
        const { transaction_id, amount, date, status, product_id, pro_name, quantity, price, address_line1, address_line2, city, state, postal_code, country, phone_number } = row;
        const existingTransaction = acc.find(t => t.id === transaction_id);
  
        const item = { id: product_id, pro_name, quantity, price };
  
        if (existingTransaction) {
          existingTransaction.items.push(item);
        } else {
          acc.push({
            id: transaction_id,
            amount,
            date,
            status,
            address: { address_line1, address_line2, city, state, postal_code, country, phone_number },
            items: [item]
          });
        }
  
        return acc;
      }, []);
  
      return res.status(200).json({
        RespCode: 200,
        RespMessage: 'Transactions retrieved successfully',
        Result: transactions,
      });
    });
  });
  app.get('/admin/orders', (req, res) => {
    const query = `
        SELECT t.id AS transaction_id, t.user_id, t.amount, t.date, t.status, 
               ti.product_id, ti.pro_name, ti.quantity, ti.price, 
               u.username, u.email, 
               a.address_line1, a.address_line2, a.city, a.state, a.postal_code, a.country, a.phone_number
        FROM transactions t
        JOIN transaction_items ti ON t.id = ti.transaction_id
        JOIN users u ON t.user_id = u.id
        JOIN addresses a ON t.user_id = a.user_id
        ORDER BY t.date DESC
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Failed to fetch orders',
            });
        }

        const orders = results.reduce((acc, row) => {
            const { transaction_id, user_id, amount, date, status, product_id, pro_name, quantity, price, username, email, address_line1, address_line2, city, state, postal_code, country, phone_number } = row;
            const existingTransaction = acc.find(order => order.id === transaction_id);

            const item = { product_id, pro_name, quantity, price };

            if (existingTransaction) {
                existingTransaction.items.push(item);
            } else {
                acc.push({
                    id: transaction_id,
                    user_id,
                    amount,
                    date,
                    status,
                    username,
                    email,
                    address: { address_line1, address_line2, city, state, postal_code, country, phone_number },
                    items: [item]
                });
            }

            return acc;
        }, []);

        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Orders retrieved successfully',
            Result: orders,
        });
    });
});

app.post('/admin/orders/updateStatus', (req, res) => {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({
            RespCode: 400,
            RespMessage: 'Order ID and status are required',
        });
    }

    const query = `UPDATE transactions SET status = ? WHERE id = ?`;

    db.query(query, [status, orderId], (error, results) => {
        if (error) {
            console.error('Error updating order status:', error);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Failed to update order status',
            });
        }

        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Order status updated successfully',
        });
    });
});

  

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
