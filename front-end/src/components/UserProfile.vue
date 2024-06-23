<template>
    <div class="flex h-screen bg-gray-100">
      <aside class="w-64 bg-gray-100 p-4 shadow-lg">
        <ul class="space-y-4">
          <li class="cursor-pointer font-semibold hover:text-blue-500" @click="selectSection('profile')">Profile</li>
          <li class="cursor-pointer font-semibold hover:text-blue-500" @click="selectSection('changePassword')">Change Password</li>
          <li class="cursor-pointer font-semibold hover:text-blue-500" @click="selectSection('uploadPicture')">Upload Picture</li>
          <li class="cursor-pointer font-semibold hover:text-blue-500" @click="selectSection('changeUsername')">Change Username</li>
          <li class="cursor-pointer font-semibold text-red-500 hover:text-red-700" @click="logout">Logout</li>
        </ul>
      </aside>
      <main class="flex-grow p-8 flex items-center justify-center bg-gray-50">
        <div v-if="selectedSection === 'profile'" class="bg-white shadow-lg rounded-lg p-6 a4-size">
          <h1 class="text-3xl font-bold mb-5">User Profile</h1>
          <p class="text-xl mb-5">Welcome, {{ username }}</p>
        </div>
        <div v-if="selectedSection === 'changePassword'" class="bg-white shadow-lg rounded-lg p-6 a4-size">
          <h2 class="text-2xl font-bold mb-5">Change Password</h2>
          <!-- Add change password form here -->
        </div>
        <div v-if="selectedSection === 'uploadPicture'" class="bg-white shadow-lg rounded-lg p-6 a4-size">
          <h2 class="text-2xl font-bold mb-5">Upload Picture</h2>
          <!-- Add upload picture form here -->
        </div>
        <div v-if="selectedSection === 'changeUsername'" class="bg-white shadow-lg rounded-lg p-6 a4-size">
          <h2 class="text-2xl font-bold mb-5">Change Username</h2>
          <!-- Add change username form here -->
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserProfile',
    data() {
      return {
        username: '',
        selectedSection: 'profile', // Default section
      };
    },
    methods: {
      selectSection(section) {
        this.selectedSection = section;
      },
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.$router.push({ name: 'UserLogin' });
      },
    },
    created() {
      this.username = localStorage.getItem('username');
    },
  };
  </script>
  
  <style scoped>
  .a4-size {
    width: 210mm;
    height: 297mm;
    max-width: 100%;
    max-height: 100%;
    padding-top: 20px;
  }
  </style>
  