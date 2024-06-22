<template>
    <div>
      <admin-nav />
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
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  