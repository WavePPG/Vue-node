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
    <div @click="checkAuth" class="cursor-pointer text-gray-800 text-2xl hover:text-blue-500">
      <i class="fas fa-user"></i>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'UserNav',
  methods: {
    checkAuth() {
      const loggedIn = localStorage.getItem('token');
      if (!loggedIn) {
        this.$router.push({ name: 'UserLogin' });
      } else {
        this.$router.push({ name: 'UserProfile' });
      }
    },
  },
};
</script>

<style scoped>
/* No scoped styles needed as we're using Tailwind CSS */
</style>
