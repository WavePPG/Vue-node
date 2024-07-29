const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3005;

app.use(cors()); // เพื่อให้สามารถเชื่อมต่อกับ front-end
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // เส้นทางสำหรับไฟล์ภาพ

// สร้างการเชื่อมต่อกับฐานข้อมูล
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // แทนที่ด้วยรหัสผ่านของคุณ
  database: 'restapi',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// สร้าง API สำหรับดึงข้อมูลสินค้า
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM product';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
