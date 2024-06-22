<template>
  <div class="admin-login">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" class="btn-login">Login</button>
    </form>
    <div v-if="message" :class="{'message-success': isSuccess, 'message-error': !isSuccess}">{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      isSuccess: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3002/admin/login', {
          username: this.username,
          password: this.password,
        });
        this.message = 'Login successful';
        this.isSuccess = true;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setTimeout(() => {
          this.$router.push({ name: 'AdminDashboard' });
        }, 1000);
      } catch (error) {
        this.message = error.response.data.message;
        this.isSuccess = false;
      }
    },
  },
};
</script>

<style scoped>
.admin-login {
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

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #45a049;
}

.message {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
}

.message-success {
  color: green;
}

.message-error {
  color: red;
}
</style>
