<template>
  <div class="flex h-screen bg-gray-100">
    <aside class="w-64 bg-white p-4 shadow-lg">
      <ul class="space-y-4">
        <li class="cursor-pointer font-semibold text-gray-700 hover:text-blue-500 transition duration-200" @click="selectSection('profile')">
          <i class="fas fa-user mr-2"></i>My Profile
        </li>
        <li class="cursor-pointer font-semibold text-gray-700 hover:text-blue-500 transition duration-200" @click="selectSection('addressBook')">
          <i class="fas fa-address-book mr-2"></i>Address Book
        </li>
        <li class="cursor-pointer font-semibold text-gray-700 hover:text-blue-500 transition duration-200" @click="selectSection('paymentOptions')">
          <i class="fas fa-credit-card mr-2"></i>My Payment Options
        </li>
        <li class="cursor-pointer font-semibold text-gray-700 hover:text-blue-500 transition duration-200" @click="selectSection('returns')">
          <i class="fas fa-undo-alt mr-2"></i>My Returns
        </li>
        <li class="cursor-pointer font-semibold text-gray-700 hover:text-blue-500 transition duration-200" @click="goToHistory">
          <i class="fas fa-history mr-2"></i>Order History
        </li>
        <li class="cursor-pointer font-semibold text-gray-700 hover:text-blue-500 transition duration-200" @click="selectSection('wishlist')">
          <i class="fas fa-heart mr-2"></i>My Wishlist
        </li>
        <li class="cursor-pointer font-semibold text-red-500 hover:text-red-700 transition duration-200" @click="logout">
          <i class="fas fa-sign-out-alt mr-2"></i>Logout
        </li>
      </ul>
    </aside>
    <main class="flex-grow p-8 bg-gray-50">
      <div v-if="selectedSection === 'profile'" class="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mt-10">
        <h1 class="text-3xl font-bold mb-5">Edit Your Profile</h1>
        <p class="text-xl mb-5">Username: {{ username }}</p>
        <form>
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" value="Md">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">Last Name</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" value="Rimel">
            </div>
            <div class="mb-4 col-span-2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value="rimel111@gmail.com">
            </div>
            <div class="mb-4 col-span-2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="address">Address</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" value="Kingston, 5236, United State">
            </div>
            <div class="mb-4 col-span-2">
              <h2 class="text-xl font-bold mb-4">Password Changes</h2>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="currentPassword">Current Password</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="currentPassword" type="password" placeholder="Enter current password">
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="newPassword">New Password</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newPassword" type="password" placeholder="Enter new password">
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmNewPassword">Confirm New Password</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmNewPassword" type="password" placeholder="Confirm new password">
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mt-6">
            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Cancel
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Save Changes
            </button>
          </div>
        </form>
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
    goToHistory() {
      this.$router.push({ name: 'HistoryUser' });
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
