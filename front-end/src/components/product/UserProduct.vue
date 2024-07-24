<template>
  <div class="container mx-auto p-4">
    <div v-if="products.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md p-4 cursor-pointer"
        @click="goToProductDetail(product.id)"
      >
        <img
          :src="`http://localhost:3001/uploads/${product.image}`"
          alt="Product Image"
          class="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h3 class="text-xl font-semibold text-gray-800">{{ product.pro_name }}</h3>
        <p class="text-gray-600">Price: {{ product.price }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-600">
      <p>No products available.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetch('http://localhost:3001/products')
        .then(response => response.json())
        .then(data => {
          this.products = data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    goToProductDetail(id) {
      this.$router.push({ path: `/product/${id}` });
    },
  },
};
</script>

<style scoped>
</style>
