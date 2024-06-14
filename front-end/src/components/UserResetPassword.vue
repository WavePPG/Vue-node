<template>
    <div class="user-reset-password">
      <h2>Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <button type="submit">Request Password Reset</button>
      </form>
      <form v-if="showResetForm" @submit.prevent="submitNewPassword">
        <div>
          <label for="token">Reset Token:</label>
          <input type="text" v-model="token" required />
        </div>
        <div>
          <label for="newPassword">New Password:</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        token: '',
        newPassword: '',
        message: '',
        showResetForm: false,
      };
    },
    methods: {
      async resetPassword() {
        try {
          const response = await axios.post('http://localhost:3000/request-password-reset', {
            email: this.email,
          });
          this.message = response.data.message;
          this.showResetForm = true;
        } catch (error) {
          this.message = error.response.data.message;
        }
      },
      async submitNewPassword() {
        try {
          const response = await axios.post('http://localhost:3000/reset-password', {
            token: this.token,
            newPassword: this.newPassword,
          });
          this.message = response.data.message;
        } catch (error) {
          this.message = error.response.data.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  