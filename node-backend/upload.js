const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const app = express();
const port = process.env.UPLOAD_PORT || 3001;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restapi',
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Route to get product types
app.get('/types', (req, res) => {
  db.query('SELECT * FROM type', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route to upload product
app.post('/upload', upload.single('image'), (req, res) => {
  const { pro_name, type_id, price, amount, pro_description } = req.body;
  const image = req.file ? req.file.filename : '';
  
  const query = 'INSERT INTO product (pro_name, type_id, price, amount, image, pro_description) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [pro_name, type_id, price, amount, image, pro_description], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Product uploaded successfully' });
  });
});

app.listen(port, () => {
  console.log(`Upload server is running on http://localhost:${port}`);
});
