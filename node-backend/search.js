const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3005;

app.use(cors()); // Enable CORS
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Static path for image files

// Create a connection to the database
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your password
  database: 'restapi',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API to fetch product data
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

// API to fetch category data with icons
app.get('/api/categories', (req, res) => {
  const query = 'SELECT * FROM type';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    const categories = results.map(category => {
      return {
        ...category,
        icon: getCategoryIcon(category.type_name) // Add icon based on type_name
      };
    });
    res.json(categories);
  });
});

function getCategoryIcon(typeName) {
  switch (typeName) {
    case 'สินค้าทั่วไป':
      return 'https://example.com/icons/general.png';
    case 'Electronic':
      return 'https://example.com/icons/electronic.png';
    case 'ตกแต่งห้อง':
      return 'https://example.com/icons/decoration.png';
    case 'สวนสวย':
      return 'https://example.com/icons/garden.png';
    default:
      return 'https://example.com/icons/default.png';
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
