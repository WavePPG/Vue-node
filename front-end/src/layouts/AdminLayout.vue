<template>
  <div>
    <!-- Conditional rendering of AdminNav -->
    <admin-nav v-if="showSidebar" />
    <router-view />
  </div>
</template>

<script>
import AdminNav from '../components/admin/AdminNav.vue';

export default {
  name: 'AdminLayout',
  components: {
    AdminNav,
  },
  computed: {
    showSidebar() {
      // Check the current route's meta property to determine whether to show the sidebar
      return !this.$route.meta.hideSidebar;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
