<template>
  <div class="user-register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit" class="btn-register">Register</button>
    </form>
    <div class="extra-options">
      <button @click="goToLogin" class="btn-secondary">Already a member? Login</button>
    </div>
    <div v-if="message" :class="['message', { 'success': isSuccess }]">{{ message }}</div>
  </div>
  <div class="footer-wrapper">
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
  </div>
</template>

<script>
import axiosInstance from '../services/axiosInstance';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
      isSuccess: false,
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.message = "Passwords do not match!";
        this.isSuccess = false;
        return;
      }

      try {
        const response = await axiosInstance.post('/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
        this.isSuccess = true;
        this.showPopup();
      } catch (error) {
        this.message = error.response.data.message || 'Registration failed';
        this.isSuccess = false;
      }
    },
    goToLogin() {
      this.$router.push({ name: 'UserLogin' });
    },
    showPopup() {
      setTimeout(() => {
        this.message = '';
      }, 3000); // Hide the message after 3 seconds
    },
  },
};
</script>

<style scoped>
.user-register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-register {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-register:hover {
  background-color: #45a049;
}

.extra-options {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.message {
  margin-top: 20px;
  text-align: center;
  color: red;
}

.message.success {
  color: green;
}

.footer-wrapper {
  margin-top: 20px; /* Adjusts the spacing between the form and the footer */
  padding: 20px;
}

.shadow-divider {
  height: 10px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0));
}

.shadow-footer {
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2); /* Adjust the shadow values as needed */
}
</style>
