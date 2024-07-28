<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Your Cart</h1>
      <div v-if="cartItems.length > 0">
        <div class="flex flex-col md:flex-row md:space-x-6 mb-6" v-for="item in cartItems" :key="item.id">
          <img :src="`http://localhost:3001/uploads/${item.product.image}`" alt="Product Image" class="w-full md:w-1/4 h-32 object-cover mb-4 rounded-lg shadow-md">
          <div class="flex-1">
            <h2 class="text-2xl font-bold">{{ item.product.pro_name }}</h2>
            <p class="text-gray-600">Price: {{ item.product.price }}</p>
            <div class="flex items-center mt-4">
              <button @click="decreaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <p class="text-gray-600 mx-2">Quantity: {{ item.quantity }}</p>
              <button @click="increaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>
            <p class="text-gray-600 mt-4">{{ item.product.pro_description }}</p>
          </div>
          <div class="flex items-center justify-center md:justify-end">
            <button @click="removeFromCart(item.id)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
          </div>
        </div>
        <div class="text-right">
          <h2 class="text-2xl font-bold">Total: {{ totalPrice }}</h2>
          <button @click="checkout" class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Checkout</button>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-700">Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [],
        loading: true,
      };
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    },
    created() {
      this.fetchCartItems();
    },
    methods: {
      async fetchCartItems() {
        try {
          const response = await fetch('http://localhost:3003/cart', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this.cartItems = data.filter(item => item.product.pro_name !== 'Test Product');
        } catch (error) {
          console.error('Error fetching cart items:', error);
        } finally {
          this.loading = false;
        }
      },
      async updateCartItemQuantity(item, quantity) {
        try {
          const response = await fetch(`http://localhost:3003/cart/${item.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ quantity }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`Updated quantity of item ${item.id} to ${quantity}`);
          await this.fetchCartItems();
        } catch (error) {
          console.error('Error updating cart item quantity:', error);
        }
      },
      increaseQuantity(item) {
        if (item.quantity < item.product.amount) {
          this.updateCartItemQuantity(item, item.quantity + 1);
        } else {
          alert('Cannot add more items than available in stock.');
        }
      },
      decreaseQuantity(item) {
        if (item.quantity > 1) {
          this.updateCartItemQuantity(item, item.quantity - 1);
        } else {
          this.removeFromCart(item.id);
        }
      },
      async removeFromCart(cartItemId) {
        try {
          const response = await fetch(`http://localhost:3003/cart/${cartItemId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`Removed item ${cartItemId} from cart`);
          this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
        } catch (error) {
          console.error('Error removing cart item:', error);
        }
      },
      checkout() {
        const totalAmount = this.totalPrice;
        this.$router.push({ name: 'CheckOut', query: { total: totalAmount } });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  