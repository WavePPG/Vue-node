require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql2 = require('mysql2');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendVerificationEmail = (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Account Verification',
    text: `Please verify your account by clicking the link: http://localhost:3000/verify-email?token=${token}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  let role = 'member';
  const verificationToken = crypto.randomBytes(20).toString('hex');

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO users (email, password, role, verified, verification_token) VALUES (?, ?, ?, ?, ?)';
    conn.execute(sql, [email, hash, role, false, verificationToken], (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      sendVerificationEmail(email, verificationToken);
      res.status(200).json({ message: 'User registered successfully. Please check your email to verify your account.', data: result });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Email verification endpoint
app.get('/verify-email', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Verification token is required' });
  }

  const sql = 'UPDATE users SET verified = true WHERE verification_token = ?';
  conn.execute(sql, [token], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    res.status(200).json({ message: 'Email verified successfully' });
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
    if (!user.verified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

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

// Request password reset endpoint
app.post('/request-password-reset', (req, res) => {
  const { email } = req.body;
  const resetToken = crypto.randomBytes(20).toString('hex');

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const sql = 'UPDATE users SET reset_token = ? WHERE email = ?';
  conn.execute(sql, [resetToken, email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `Please reset your password by clicking the link: http://localhost:3000/reset-password?token=${resetToken}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Password reset email sent' });
      }
    });
  });
});

// Reset password endpoint
app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  const sql = 'SELECT * FROM users WHERE reset_token = ?';
  conn.execute(sql, [token], async (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      console.log('No user found with the provided reset token.');
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    const user = results[0];
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);

    const updateSql = 'UPDATE users SET password = ?, reset_token = NULL WHERE id = ?';
    conn.execute(updateSql, [hash, user.id], (err, result) => {
      if (err) {
        console.error('Error executing update query:', err.message);
        return res.status(500).json({ message: err.message });
      }

      console.log('Password reset successfully for user id:', user.id);
      res.status(200).json({ message: 'Password reset successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
