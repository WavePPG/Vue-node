<template>
  <div class="login-container">
    <h1 class="text-xl font-semibold mb-5 text-center">Login</h1>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-lg font-semibold mb-2">Email:</label>
        <input type="email" id="email" v-model="email" class="border-2 border-gray-300 p-2 w-full rounded" required>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-lg font-semibold mb-2">Password:</label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="border-2 border-gray-300 p-2 w-full rounded pr-10" required>
          <button type="button" @click="togglePassword" class="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full mb-4">Login</button>
    </form>
    <div class="flex justify-between">
      <button @click="goToRegister" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Register</button>
      <button @click="goToForgotPassword" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Forgot Password</button>
    </div>
  </div>
  <footer class="bg-white text-gray-800 py-8 shadow-footer">
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
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.user_id) {
          localStorage.setItem('user_id', response.data.user_id); // เก็บ user_id ใน localStorage
          console.log('User ID:', response.data.user_id); // แสดง user_id ในคอนโซล
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        console.log('Username:', response.data.username); // แสดงชื่อผู้ใช้ในคอนโซล
        this.$router.push({ name: 'UserProfile' });
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    goToRegister() {
      this.$router.push({ name: 'UserRegister' });
    },
    goToForgotPassword() {
      this.$router.push({ name: 'UserResetPassword' });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto; /* Adjusted to move the login form further down */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.shadow-divider {
  height: 10px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0));
}
.shadow-footer {
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2); /* Adjust the shadow values as needed */
}
</style>
