<template>
  <div class="container mx-auto p-4">
    <div v-if="product" class="flex flex-col md:flex-row md:space-x-6">
      <img :src="`http://localhost:3001/uploads/${product.image}`" alt="Product Image" class="w-full md:w-1/2 h-64 object-cover mb-4 rounded-lg shadow-md">
      <div class="flex-1">
        <h1 class="text-3xl font-bold mb-6">{{ product.pro_name }}</h1>
        <p class="text-gray-600 mb-2">Type: {{ product.typename }}</p>
        <p class="text-gray-800 font-bold text-lg mb-2">Price: {{ product.price }}</p>
        <p class="text-gray-600 mb-2">Amount: {{ product.amount }}</p>
        <p class="text-gray-700 mt-4">{{ product.pro_description }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-700">
      <p v-if="loading">Loading...</p>
      <p v-else>Failed to load product details.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,  // Ensure this is a string
      required: true,
    },
  },
  data() {
    return {
      product: null,
      loading: true,  // Add a loading state
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3001/products/${this.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Product data:', data); // Debug log to check data
        this.product = data;
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        this.loading = false;  // Ensure loading state is updated
      }
    },
  },
};
</script>

<style scoped>
</style>
