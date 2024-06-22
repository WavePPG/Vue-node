require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql2 = require('mysql2');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const conn = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'restapi',
});

const secretKey = process.env.SECRET_KEY || 'temporary_secret_key'; // Use environment variable for the secret key

// Admin Login endpoint
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const sql = 'SELECT * FROM admins WHERE username = ?';
  conn.execute(sql, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const admin = results[0];

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username, role: 'admin' }, secretKey, { expiresIn: '1h' });

    // Update token in the database
    const updateTokenSql = 'UPDATE admins SET token = ? WHERE id = ?';
    conn.execute(updateTokenSql, [token, admin.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: 'Admin login successful', token });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
