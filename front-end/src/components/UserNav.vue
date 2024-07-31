<template>
  <div>
    <div class="bg-black text-white text-center py-2">
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
      <a href="/shop" class="text-white font-bold underline">ShopNow</a>
    </div>
    <nav class="p-5 shadow-md flex items-center justify-between w-full">
      <div class="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <div class="text-2xl font-bold font-serif mr-10">Furniro</div>
        <div class="hidden md:flex space-x-5">
          <router-link to="/shop" class="text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline">Home</router-link>
          <router-link to="/home" class="text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline">Shop</router-link>
          <router-link to="/about" class="text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline">About</router-link>
          <router-link to="/contact" class="text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline">Contact</router-link>
        </div>
        <div class="hidden md:flex space-x-5 relative items-center">
          <input v-model="searchQuery" @keyup.enter="search" type="text" placeholder="Search..." class="border rounded-lg py-1 px-3 text-gray-800" />
          <div @click="search" class="cursor-pointer text-gray-800 text-2xl hover:text-blue-500">
            <i class="fas fa-search"></i>
          </div>
          <div @click="checkAuth" class="cursor-pointer text-gray-800 text-2xl hover:text-blue-500">
            <i class="fas fa-user"></i>
          </div>
          <div @click="goToCart" class="cursor-pointer text-gray-800 text-2xl hover:text-blue-500 relative">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartItemCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ cartItemCount }}</span>
          </div>
        </div>
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="outline-none mobile-menu-button">
            <svg class="w-6 h-6 text-gray-800 hover:text-blue-500" v-if="!isOpen" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            <svg class="w-6 h-6 text-gray-800 hover:text-blue-500" v-else fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    <div :class="isOpen ? 'block' : 'hidden'" class="md:hidden mobile-menu">
      <router-link @click="toggleMenu" to="/shop" class="block text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline py-2">Home</router-link>
      <router-link @click="toggleMenu" to="/home" class="block text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline py-2">shop</router-link>
      <router-link @click="toggleMenu" to="/about" class="block text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline py-2">About</router-link>
      <router-link @click="toggleMenu" to="/contact" class="block text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline py-2">Contact</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserNav',
  data() {
    return {
      cartItemCount: 0,
      isOpen: false,
      searchQuery: '',
    };
  },
  methods: {
    search() {
      if (this.searchQuery.trim() === '') {
        alert('Please enter a search query.');
        return;
      }
      this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery } });
    },
    checkAuth() {
      const loggedIn = localStorage.getItem('token');
      if (!loggedIn) {
        this.$router.push({ name: 'UserLogin' });
      } else {
        this.$router.push({ name: 'UserProfile' });
      }
    },
    goToCart() {
      const loggedIn = localStorage.getItem('token');
      if (!loggedIn) {
        alert('Please log in to view your cart.');
        this.$router.push({ name: 'UserLogin' });
      } else {
        this.$router.push({ name: 'UserCart' });
      }
    },
    updateCartItemCount() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      this.cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  },
  mounted() {
    this.updateCartItemCount();
  },
  watch: {
    '$route'() {
      this.updateCartItemCount();
    },
  },
};
</script>

<style scoped>
/* No scoped styles needed as we're using Tailwind CSS */
</style>
