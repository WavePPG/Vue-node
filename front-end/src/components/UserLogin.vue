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
        <input type="password" id="password" v-model="password" class="border-2 border-gray-300 p-2 w-full rounded" required>
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full mb-4">Login</button>
    </form>
    <div class="flex justify-between">
      <button @click="goToRegister" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Register</button>
      <button @click="goToForgotPassword" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Forgot Password</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
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
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
