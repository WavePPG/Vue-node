<template>
  <div class="container mx-auto p-4">
    <!-- Hero Section -->
    <div class="bg-gray-100 p-8 rounded-lg shadow-md flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Discover Our New Collection</h1>
        <p class="text-gray-600 my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
        <button class="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow">Buy Now</button>
      </div>
      <img :src="heroImage" alt="New Collection" class="w-1/3 rounded-lg">
    </div>

    <!-- Category Section -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-800">Browse The Range</h2>
      <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="text-center">
        <img :src="diningImage" alt="Dining" class="w-full h-48 object-cover mb-4 rounded-lg">
        <h3 class="text-xl font-semibold text-gray-800">Dining</h3>
      </div>
      <div class="text-center">
        <img :src="livingImage" alt="Living" class="w-full h-48 object-cover mb-4 rounded-lg">
        <h3 class="text-xl font-semibold text-gray-800">Living</h3>
      </div>
      <div class="text-center">
        <img :src="bedroomImage" alt="Bedroom" class="w-full h-48 object-cover mb-4 rounded-lg">
        <h3 class="text-xl font-semibold text-gray-800">Bedroom</h3>
      </div>
    </div>

    <!-- Products Section -->
    <div v-if="products.length">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">Our Products</h2>
      <div class="relative">
        <button @click="prevPage" :disabled="currentPage === 0" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-l-lg">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-12">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white rounded-lg shadow-md cursor-pointer relative product-box"
            @click="goToProductDetail(product.id)"
          >
            <div class="relative">
              <img
                :src="`http://localhost:3001/uploads/${product.image}`"
                alt="Product Image"
                class="product-image"
              />
              <div v-if="product.isNew" class="absolute top-0 right-0 m-4 bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-full">New</div>
              <div v-if="product.discount" class="absolute top-0 left-0 m-4 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">-{{ product.discount }}%</div>
            </div>
            <div class="p-4">
              <h3 class="text-xl font-semibold text-gray-800">{{ product.pro_name }}</h3>
              <p class="text-gray-600">{{ product.description }}</p>
              <p class="text-gray-800 font-bold">{{ product.price }}</p>
            </div>
          </div>
        </div>
        <button @click="nextPage" :disabled="currentPage >= maxPage" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-r-lg">
          <i class="fas fa-chevron-right"></i>
        </button>
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
      heroImage: 'https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2023/03/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg',
      diningImage: 'https://patreeda.com/wp-content/uploads/2020/11/cover-nologo.jpg',
      livingImage: 'https://www.maneerin.co.th/wp-content/uploads/2023/03/ALT-Text_-%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B5%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B8%AE%E0%B8%A7%E0%B8%87%E0%B8%88%E0%B8%B8%E0%B9%89%E0%B8%A2.jpg',
      bedroomImage: 'https://blog.ghbank.co.th/wp-content/uploads/2021/11/shutterstock_705889837-1.jpg',
      currentPage: 0,
      itemsPerPage: 5,
    };
  },
  computed: {
    paginatedProducts() {
      const start = this.currentPage * this.itemsPerPage;
      return this.products.slice(start, start + this.itemsPerPage);
    },
    maxPage() {
      return Math.ceil(this.products.length / this.itemsPerPage) - 1;
    }
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
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
      }
    }
  },
};
</script>

<style scoped>
.product-image {
  width: 100%;
  height: 12rem; /* Adjust height as needed */
  object-fit: cover;
  margin-bottom: 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.product-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
