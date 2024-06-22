<template>
    <div>
      <user-nav />
      <router-view />
    </div>
  </template>
  
  <script>
  import UserNav from '../components/UserNav.vue';
  
  export default {
    name: 'UserLayout',
    components: {
      UserNav,
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  