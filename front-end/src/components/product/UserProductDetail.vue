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
        <button @click="addToCart" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add to Cart</button>
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
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: null,
      loading: true,
      user: null,
    };
  },
  created() {
    this.fetchProduct();
    this.fetchUser();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3001/products/${this.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Product data:', data);
        this.product = data;
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchUser() {
      try {
        const response = await fetch(`http://localhost:3001/auth/user`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('User data:', userData);
        this.user = userData;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async addToCart() {
      if (!this.user) {
        alert('Please log in to add items to your cart.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3003/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            productId: this.product.id,
            quantity: 1,
            product: this.product,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cartData = await response.json();
        console.log('Cart data:', cartData);
        alert('Product added to cart successfully.');
      } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      }
    },
  },
};
</script>

<style scoped>
</style>
