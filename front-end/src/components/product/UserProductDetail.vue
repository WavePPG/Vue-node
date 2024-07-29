<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <div v-if="product" class="flex flex-col md:flex-row items-center">
      <img :src="`http://localhost:3001/uploads/${product.image}`" alt="product image" class="w-full md:w-1/2 rounded-lg shadow-md"/>
      <div class="mt-6 md:mt-0 md:ml-6">
        <h1 class="text-2xl font-bold text-gray-800">{{ product.pro_name }}</h1>
        <p class="text-gray-600 mt-2">Type: {{ product.typename }}</p>
        <p class="text-gray-600 mt-2">Price: ${{ product.price }}</p>
        <p class="text-gray-600 mt-2">Amount: {{ product.amount }}</p>
        <p class="text-gray-600 mt-4">{{ product.pro_description }}</p>
        <button @click="addToCart" class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Add to Cart
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">Loading product...</p>
    </div>
    <div v-if="showCartNotification" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-12 rounded-lg shadow-lg flex flex-col items-center text-center w-1/2 max-w-lg mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l1.38-5H6.6m-3.22-6H21M7 13l1.68 7M7 13h10m0 0l1.66 7M7 13l-.4-2M17 13l.4-2m0 0l1.38-5M7 13L5.4 6m15.2 0H5.4m15.2 0l-.4 2M7 13H5.4m0 0L3 3" />
        </svg>
        <span class="text-2xl font-bold">Item added to cart!</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/axiosInstance';

export default {
  name: 'UserProductDetail',
  data() {
    return {
      product: null,
      userId: null,
      showCartNotification: false, // สถานะแจ้งเตือน
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async created() {
    const productId = this.id;
    await this.fetchProduct(productId);
    const storedUserId = localStorage.getItem('user_id'); // ใช้ 'user_id' ให้ตรงกับตอนเก็บ
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      if (isNaN(this.userId)) {
        console.error('Failed to parse userId from localStorage');
      } else {
        console.log('User ID:', this.userId); // log userId
      }
    } else {
      console.error('No userId found in localStorage');
    }
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    async addToCart() {
      if (!this.userId) {
        console.error('User ID is not defined');
        return;
      }
      try {
        const response = await axios.post(`http://localhost:3003/cart/${this.userId}/add`, {
          productId: this.product.id,
          quantity: 1,
        });
        console.log('Added to cart:', response.data);
        this.showCartNotification = true; // แสดงแจ้งเตือน
        setTimeout(() => {
          this.showCartNotification = false; // ซ่อนแจ้งเตือนหลังจาก 3 วินาที
        }, 3000);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },
  },
};
</script>

<style scoped>
.product-image {
  max-height: 400px;
  object-fit: cover;
}
</style>
