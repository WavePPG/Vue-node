// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // ใช้ cors middleware

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
