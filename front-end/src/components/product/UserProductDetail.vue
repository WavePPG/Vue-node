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
  </div>
</template>

<script>
import axios from '@/services/axiosInstance';

export default {
  name: 'UserProductDetail',
  data() {
    return {
      product: null,
      userId: null
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
