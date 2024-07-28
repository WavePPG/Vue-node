const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.CART_PORT || 3003;

app.use(cors());
app.use(express.json());

// Mock data for demonstration purposes
let cartItems = [
  // Example item for testing purposes
  { id: 1, userId: 1, productId: 1, quantity: 1, product: { pro_name: 'Test Product', price: 100, amount: 10, image: 'test.jpg', pro_description: 'Test description' } },
];

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

// Fetch user's cart items
app.get('/cart', authenticate, (req, res) => {
  const userId = req.user.id;
  const userCartItems = cartItems.filter(item => item.userId === userId);
  res.json(userCartItems);
});

// Add item to cart
app.post('/cart', authenticate, (req, res) => {
  const userId = req.user.id;
  const { productId, quantity, product } = req.body;
  const newItem = {
    id: cartItems.length + 1,
    userId,
    productId,
    quantity,
    product
  };
  cartItems.push(newItem);
  res.status(201).json(newItem);
});

// Update item quantity in cart
app.put('/cart/:id', authenticate, (req, res) => {
  const userId = req.user.id;
  const itemId = parseInt(req.params.id, 10);
  const { quantity } = req.body;

  const item = cartItems.find(item => item.id === itemId && item.userId === userId);
  if (!item) {
    return res.status(404).send('Item not found');
  }

  if (quantity > item.product.amount) {
    return res.status(400).send('Quantity exceeds available stock');
  }

  item.quantity = quantity;
  res.json(item);
});

// Remove item from cart
app.delete('/cart/:id', authenticate, (req, res) => {
  const userId = req.user.id;
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = cartItems.findIndex(item => item.id === itemId && item.userId === userId);
  
  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  cartItems.splice(itemIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Cart service running on port ${port}`);
});
