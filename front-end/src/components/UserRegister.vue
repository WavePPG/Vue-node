<template>
  <div class="user-register">
    <h2>Register</h2>
    <form @submit.prevent="register">
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
      <button @click="goToLogin" class="btn-secondary">Already a member  Login</button>
    </div>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import axiosInstance from '../services/axiosInstance';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.message = "Passwords do not match!";
        return;
      }

      try {
        const response = await axiosInstance.post('/register', {
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.message || 'Registration failed';
      }
    },
    goToLogin() {
      this.$router.push({ name: 'UserLogin' });
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
</style>
