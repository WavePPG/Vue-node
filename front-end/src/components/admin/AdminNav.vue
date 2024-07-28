<template>
  <div>
    <div class="fixed top-2 left-2 cursor-pointer text-2xl z-50" @click="toggleSidebar">
      <i class="fas fa-bars icon-spacing"></i>
    </div>
    <div :class="['fixed top-0 left-0 h-full transition-width duration-300 overflow-hidden z-40 bg-white shadow-lg flex flex-col justify-between', isOpen ? 'w-64' : 'w-16']">
      <div>
        <div v-if="isOpen" class="text-xl font-bold text-gray-900 my-6 text-center"></div>
        <div :class="['flex flex-col mt-16 space-y-8', isOpen ? 'items-start pl-4' : 'items-center']">
          <router-link to="/admin/dashboard" class="flex items-center w-full px-4 py-2 hover:bg-gray-100 dashboard-icon-spacing">
            <i class="fas fa-tachometer-alt text-gray-600"></i>
            <span v-if="isOpen" class="ml-4 text-gray-700">Dashboard</span>
          </router-link>
          <router-link to="/admin/upload-product" class="flex items-center w-full px-4 py-2 hover:bg-gray-100">
            <i class="fas fa-upload text-gray-600"></i>
            <span v-if="isOpen" class="ml-4 text-gray-700">Upload Product</span>
          </router-link>
          <router-link to="/admin/orders" class="flex items-center w-full px-4 py-2 hover:bg-gray-100">
            <i class="fas fa-list text-gray-600"></i>
            <span v-if="isOpen" class="ml-4 text-gray-700">Orders</span>
          </router-link>
        </div>
      </div>
      <div @click="logout" class="flex items-center w-full px-4 py-2 mb-6 cursor-pointer hover:bg-gray-100">
        <i class="fas fa-sign-out-alt text-gray-600"></i>
        <span v-if="isOpen" class="ml-4 text-gray-700">Logout</span>
      </div>
    </div>
    <div :class="['main-content transition-margin duration-300', isOpen ? 'ml-64' : 'ml-16']">
      <!-- Main content goes here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/adminlogin');
    },
  },
};
</script>

<style scoped>
.icon-spacing {
  margin-left: 1rem; /* Adjust this value to increase or decrease spacing */
}
.dashboard-icon-spacing {
  margin-bottom: 10px;
}
.fixed.top-0.left-0.h-full.transition-width.duration-300.overflow-hidden.z-40.bg-white.shadow-lg.flex.flex-col.justify-between {
  display: flex;
  align-items: center; /* Center icons horizontally when collapsed */
}
.flex.flex-col.mt-16.space-y-8.items-center {
  align-items: center;
}
.flex.flex-col.mt-16.space-y-8.items-start {
  align-items: flex-start;
}
.main-content {
  margin-left: 16rem; /* Adjust this value to match the sidebar width */
}
</style>
