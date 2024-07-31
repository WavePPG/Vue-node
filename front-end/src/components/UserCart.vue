<template>
  <div class="min-h-screen flex flex-col">
    <div class="w-full max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md flex-grow">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.productId" class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img :src="`http://localhost:3001/uploads/${item.image}`" alt="product image" class="w-28 h-auto rounded-lg shadow-md"/>
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
    <footer class="bg-white text-gray-800 py-8 shadow-footer">
      <div class="container mx-auto flex flex-wrap justify-between items-start">
        <!-- Company Info -->
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h2 class="text-2xl font-bold">Comforty</h2>
          <p class="mt-2 text-gray-600">Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum. Cras egestas purus.</p>
          <div class="flex mt-4 space-x-4">
            <a href="#" class="text-gray-600"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-pinterest"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <!-- Category Links -->
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 class="text-xl font-semibold">Category</h3>
          <ul class="mt-2 space-y-2">
            <li><a href="#" class="hover:underline">Sofa</a></li>
            <li><a href="#" class="hover:underline">Armchair</a></li>
            <li><a href="#" class="hover:underline">Wing Chair</a></li>
            <li><a href="#" class="hover:underline">Desk Chair</a></li>
            <li><a href="#" class="hover:underline">Wooden Chair</a></li>
            <li><a href="#" class="hover:underline">Park Bench</a></li>
          </ul>
        </div>
        <!-- Support Links -->
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 class="text-xl font-semibold">Support</h3>
          <ul class="mt-2 space-y-2">
            <li><a href="#" class="hover:underline">Help & Support</a></li>
            <li><a href="#" class="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" class="hover:underline">Privacy Policy</a></li>
            <li><a href="#" class="hover:underline">Help</a></li>
          </ul>
        </div>
        <!-- Newsletter -->
        <div class="w-full md:w-1/4">
          <h3 class="text-xl font-semibold">Newsletter</h3>
          <form class="mt-2">
            <input type="email" class="p-2 rounded w-full mb-2 border border-gray-300" placeholder="Your email">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Subscribe</button>
          </form>
          <p class="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.</p>
        </div>
      </div>
    </footer>
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
.shadow-divider {
  height: 10px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0));
}
.shadow-footer {
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2); /* Adjust the shadow values as needed */
}
</style>
