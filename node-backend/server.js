require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql2 = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const conn = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'restapi',
});

const secretKey = process.env.SECRET_KEY || 'temporary_secret_key'; // Use environment variable for the secret key

// Registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  let role = 'member';

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO users (email, password, role, verified) VALUES (?, ?, ?, ?)';
    conn.execute(sql, [email, hash, role, true], (err, result) => { // Set verified to true
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(200).json({ message: 'User registered successfully.', data: result });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
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


// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  conn.execute(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
});

// Protected route example
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    res.status(200).json({ message: 'Access granted', user: req.user });
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
});

// Reset password endpoint
app.post('/reset-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Email, old password, and new password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  conn.execute(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);

    const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
    conn.execute(updateSql, [hash, user.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(200).json({ message: 'Password reset successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
