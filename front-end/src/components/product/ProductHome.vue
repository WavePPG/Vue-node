<template>
  <div class="container mx-auto p-4">
    <!-- Hero Section -->
    <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-8 relative">
      <img src="https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2023/03/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg" alt="Hero Image" class="w-full h-64 object-cover rounded-lg">
      <div class="absolute top-0 left-0 p-6">
        <h1 class="text-4xl font-bold text-white">Summer Sale For All Swim Suits And Free Express Delivery</h1>
        <p class="text-lg text-white mt-2">Categories</p>
        <div class="flex space-x-4 mt-4">
        
        </div>
        <button class="mt-6 bg-green-500 text-white px-4 py-2 rounded">Buy Now!</button>
      </div>
    </div>

    <!-- Categories Section -->
<div class="bg-white p-6 rounded-lg shadow-md text-center mb-8">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">Category</h2>
  <div class="flex justify-center space-x-4">
    <button class="bg-gray-200 text-gray-800 p-4 rounded-lg flex flex-col items-center">
      <i class="fas fa-mobile-alt text-2xl mb-2"></i>
      Phones
    </button>
    <button class="bg-gray-200 text-gray-800 p-4 rounded-lg flex flex-col items-center">
      <i class="fas fa-laptop text-2xl mb-2"></i>
      Computers
    </button>
    
    <button class="bg-gray-200 text-gray-800 p-4 rounded-lg flex flex-col items-center">
      <i class="fas fa-camera text-2xl mb-2"></i>
      Camera
    </button>
    <button class="bg-gray-200 text-gray-800 p-4 rounded-lg flex flex-col items-center">
      <i class="fas fa-headphones text-2xl mb-2"></i>
      HeadPhones
    </button>
    <button class="bg-gray-200 text-gray-800 p-4 rounded-lg flex flex-col items-center">
      <i class="fas fa-gamepad text-2xl mb-2"></i>
      Gaming
    </button>
  </div>
</div>


    <!-- Products Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">Explore Our Products</h2>
      <div class="flex justify-center space-x-4 mb-4">
        <button @click="filterCategory('all')" :class="{'text-green-500': activeCategory === 'all'}">All</button>
        <button @click="filterCategory('newest')" :class="{'text-green-500': activeCategory === 'newest'}">Newest</button>
        <button @click="filterCategory('trending')" :class="{'text-green-500': activeCategory === 'trending'}">Trending</button>
        <button @click="filterCategory('best-sellers')" :class="{'text-green-500': activeCategory === 'best-sellers'}">Best Sellers</button>
        <button @click="filterCategory('featured')" :class="{'text-green-500': activeCategory === 'featured'}">Featured</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md cursor-pointer relative product-box"
          @click="goToProductDetail(product.id)"
        >
          <div class="relative">
            <img
              :src="`http://localhost:3001/uploads/${product.image}`"
              :alt="product.pro_name"
              class="product-image"
            />
            <div v-if="product.isNew" class="absolute top-0 right-0 m-4 bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-full">New</div>
            <div v-if="product.discount" class="absolute top-0 left-0 m-4 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">-{{ product.discount }}%</div>
            <div class="absolute bottom-4 right-4 flex space-x-2">
              <button class="bg-gray-200 text-gray-700 p-2 rounded-full"><i class="fas fa-heart"></i></button>
              <button class="bg-gray-200 text-gray-700 p-2 rounded-full"><i class="fas fa-cart-plus"></i></button>
            </div>
          </div>
          <div class="p-4 text-center">
            <h3 class="text-xl font-semibold text-gray-800 truncate">{{ truncateText(product.pro_name, 20) }}</h3>
            <p class="text-gray-600">{{ product.description }}</p>
            <p class="text-gray-800 font-bold">
              {{ product.price }} บาท
              <span v-if="product.originalPrice" class="line-through text-gray-500">{{ product.originalPrice }}</span>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  </div>

  <footer class="bg-white text-gray-800 py-8 shadow-footer mt-8">
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
</template>

<script>
export default {
  data() {
    return {
      products: [],
      currentPage: 0,
      itemsPerPage: 8,
      activeCategory: 'all',
    };
  },
  computed: {
    filteredProducts() {
      if (this.activeCategory === 'all') {
        return this.products;
      } else {
        return this.products.filter(product => product.category === this.activeCategory);
      }
    },
    paginatedProducts() {
      const start = this.currentPage * this.itemsPerPage;
      return this.filteredProducts.slice(start, start + this.itemsPerPage);
    },
    maxPage() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage) - 1;
    },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetch('http://localhost:3001/products')
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
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
    },
    filterCategory(category) {
      this.activeCategory = category;
      this.currentPage = 0;
    },
    truncateText(text, maxLength) {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
  justify-content: space-between;
  height: 100%;
  transition: transform 0.2s;
}

.product-box:hover {
  transform: scale(1.05);
}

.product-box .p-4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-box .p-4 h3, .product-box .p-4 p {
  margin-bottom: 0.5rem;
}

.product-box .p-4 .flex {
  margin-top: auto;
}

.product-box .flex button {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.shadow-divider {
  height: 10px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0));
}
.shadow-footer {
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2); /* Adjust the shadow values as needed */
}
</style>
