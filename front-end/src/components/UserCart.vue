<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.productId" class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <img :src="`http://localhost:3001/uploads/${item.image}`" alt="product image" class="w-20 h-20 rounded-lg shadow-md"/>
          <div class="ml-4">
            <h2 class="text-lg font-bold text-gray-800">{{ item.pro_name }}</h2>
            <p class="text-gray-600">Price: {{ item.price.toFixed(2) }} บาท</p>
            <p class="text-gray-600">Quantity: 
              <input type="number" v-model.number="item.quantity" @change="updateQuantity(item)" min="1" :max="item.availableQuantity" class="w-16 border-2 border-gray-300 p-1 rounded">
            </p>
            <p class="text-gray-600">Available: {{ item.availableQuantity }}</p>
          </div>
        </div>
        <button @click="removeFromCart(item.productId)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Remove</button>
      </div>
      <div class="flex justify-between items-center mt-6">
        <p class="text-lg font-bold text-gray-800">Total: {{ totalPrice }} บาท</p>
        <button @click="checkout" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Checkout</button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserCart',
  data() {
    return {
      cartItems: [],
      userId: null
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity, 10);
        return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
      }, 0).toFixed(2);
    }
  },
  async created() {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      if (isNaN(this.userId)) {
        console.error('Failed to parse userId from localStorage');
      } else {
        console.log('User ID:', this.userId);
        await this.fetchCartItems();
      }
    } else {
      console.error('No userId found in localStorage');
    }
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await axios.get(`http://localhost:3003/cart/${this.userId}`);
        this.cartItems = response.data.items.map(item => ({
          ...item,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity, 10),
          availableQuantity: item.availableQuantity // Add available quantity from the server response
        }));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    async updateQuantity(item) {
      if (item.quantity > item.availableQuantity) {
        alert('Quantity exceeds available stock');
        item.quantity = item.availableQuantity;
        return;
      }

      try {
        const response = await axios.post(`http://localhost:3003/cart/${this.userId}/update`, {
          productId: item.productId,
          quantity: item.quantity,
        });
        console.log('Updated cart:', response.data);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    },
    async removeFromCart(productId) {
      try {
        const response = await axios.post(`http://localhost:3003/cart/${this.userId}/remove`, {
          productId: productId,
        });
        console.log('Removed from cart:', response.data);
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },
    checkout() {
      this.$router.push({ name: 'CheckOut' });  // ใช้ $router เพื่อพาไปยังหน้า CheckOut
    }
  }
};
</script>

<style scoped>
/* No scoped styles needed as we're using Tailwind CSS */
</style>
