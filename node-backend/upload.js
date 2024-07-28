const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const fs = require('fs');
const app = express();
const port = process.env.UPLOAD_PORT || 3001;

// Ensure 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

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
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(`/${uploadDir}`, express.static(uploadDir));

// Middleware to authenticate user (mock implementation)
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    // Decode token and validate user (mock implementation)
    req.user = { id: 1, name: 'John Doe' }; // Mock user
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Route to get user information
app.get('/auth/user', authenticate, (req, res) => {
  res.json(req.user);
});

// Route to get product types
app.get('/types', (req, res) => {
  db.query('SELECT type_id AS id, type_name AS name FROM type', (err, results) => {
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

// Route to get all products with type name
app.get('/products', (req, res) => {
  const query = `
    SELECT p.*, t.type_name AS typename 
    FROM product p 
    JOIN type t ON p.type_id = t.type_id
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route to get a single product by ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.*, t.type_name AS typename 
    FROM product p 
    JOIN type t ON p.type_id = t.type_id 
    WHERE p.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(results[0]);
  });
});

// Route to update product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { pro_name, type_id, price, amount, pro_description } = req.body;

  const query = 'UPDATE product SET pro_name = ?, type_id = ?, price = ?, amount = ?, pro_description = ? WHERE id = ?';
  db.query(query, [pro_name, type_id, price, amount, pro_description, id], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Product updated successfully' });
  });
});

// Route to delete product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM product WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Product deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Upload server is running on http://localhost:${port}`);
});
