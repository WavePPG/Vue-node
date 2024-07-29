const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.CART_PORT || 3003;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
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
  console.log('Connected to the database.');
});

// เพิ่มสินค้าไปยังตะกร้า
app.post('/cart/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const getProductQuery = 'SELECT amount FROM product WHERE id = ?';
  db.query(getProductQuery, [productId], (err, productResults) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (productResults.length === 0) {
      return res.status(404).send('Product not found');
    }

    const availableQuantity = productResults[0].amount;

    const checkCartQuery = `SELECT * FROM cart WHERE user_id = ? AND productId = ?`;
    db.query(checkCartQuery, [userId, productId], (err, cartResults) => {
      if (err) {
        console.error('Error checking cart:', err);
        return res.status(500).send('Internal Server Error');
      }

      const currentQuantity = cartResults.length > 0 ? cartResults[0].quantity : 0;
      const newQuantity = currentQuantity + quantity;

      if (newQuantity > availableQuantity) {
        return res.status(400).send('Quantity exceeds available stock');
      }

      if (cartResults.length > 0) {
        const updateCartQuery = `
          UPDATE cart SET quantity = ?
          WHERE user_id = ? AND productId = ?
        `;
        db.query(updateCartQuery, [newQuantity, userId, productId], (err, result) => {
          if (err) {
            console.error('Error updating cart:', err);
            return res.status(500).send('Internal Server Error');
          }
          res.send({ message: 'Cart updated successfully' });
        });
      } else {
        const insertCartQuery = `
          INSERT INTO cart (user_id, productId, quantity)
          VALUES (?, ?, ?)
        `;
        db.query(insertCartQuery, [userId, productId, quantity], (err, result) => {
          if (err) {
            console.error('Error inserting into cart:', err);
            return res.status(500).send('Internal Server Error');
          }
          res.send({ message: 'Item added to cart successfully' });
        });
      }
    });
  });
});



// ลบสินค้าออกจากตะกร้า
app.post('/cart/:userId/remove', (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  const deleteCartQuery = `
    DELETE FROM cart WHERE user_id = ? AND productId = ?
  `;

  db.query(deleteCartQuery, [userId, productId], (err, result) => {
    if (err) {
      console.error('Error deleting from cart:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send({ message: 'Item removed from cart successfully' });
  });
});


// เพิ่ม API สำหรับอัปเดตจำนวนสินค้าในตะกร้า
app.post('/cart/:userId/update', (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const getProductQuery = 'SELECT amount FROM product WHERE id = ?';
  db.query(getProductQuery, [productId], (err, productResults) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (productResults.length === 0) {
      return res.status(404).send('Product not found');
    }

    const availableQuantity = productResults[0].amount;

    if (quantity > availableQuantity) {
      return res.status(400).send('Quantity exceeds available stock');
    }

    const updateCartQuery = `
      UPDATE cart SET quantity = ?
      WHERE user_id = ? AND productId = ?
    `;
    db.query(updateCartQuery, [quantity, userId, productId], (err, result) => {
      if (err) {
        console.error('Error updating cart:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.send({ message: 'Cart quantity updated successfully' });
    });
  });
});


// ดึงข้อมูลสินค้าจากตะกร้า
app.get('/cart/:userId', (req, res) => {
  const { userId } = req.params;

  const getCartQuery = `
    SELECT c.productId, c.quantity, p.pro_name, p.price, p.image
    FROM cart c
    JOIN product p ON c.productId = p.id
    WHERE c.user_id = ?
  `;

  db.query(getCartQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching cart:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // ตรวจสอบข้อมูลแต่ละรายการให้แน่ใจว่ามีค่าที่ถูกต้อง
    const items = results.map(item => ({
      ...item,
      image: item.image || '', // ให้ค่าเริ่มต้นเป็นค่าว่างหากไม่มีค่า image
    }));

    res.send({ userId, items });
  });
});

app.listen(port, () => {
  console.log(`Cart service running on port ${port}`);
});
