<template>
  <nav class="bg-gray-100 p-5 shadow-md flex items-center">
    <div class="text-2xl font-bold font-serif mr-10">DESIGN</div>
    <div class="flex-grow"></div>
    <div class="flex space-x-5">
      <router-link to="/home" class="text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline">Home</router-link>
      <router-link to="/product" class="text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline">Shop</router-link>
      <router-link to="/contact" class="text-lg font-bold font-serif text-gray-800 hover:text-blue-500 hover:underline">Contact</router-link>
    </div>
    <div class="flex-grow"></div>
    <div class="flex space-x-5 relative">
      <div @click="goToCart" class="cursor-pointer text-gray-800 text-2xl hover:text-blue-500 relative">
        <i class="fas fa-shopping-cart"></i>
        <span v-if="cartItemCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ cartItemCount }}</span>
      </div>
      <div @click="checkAuth" class="cursor-pointer text-gray-800 text-2xl hover:text-blue-500">
        <i class="fas fa-user"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'UserNav',
  data() {
    return {
      cartItemCount: 0,
    };
  },
  methods: {
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
      // Assuming you have a function to get the cart items count
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      this.cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
  mounted() {
    this.updateCartItemCount();
  },
  watch: {
    // Watch for changes in localStorage and update the cart count accordingly
    '$route'() {
      this.updateCartItemCount();
    },
  },
};
</script>

<style scoped>
/* No scoped styles needed as we're using Tailwind CSS */
</style>
