<template>
    <nav>
      <div class="logo">ADMIN</div>
      <div class="spacer"></div>
      <div class="nav-links">
        <router-link to="/admin/dashboard">Dashboard</router-link>
      </div>
      <div class="spacer"></div>
      <div @click="logout" class="logout-icon">
        <i class="fas fa-sign-out-alt"></i>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'AdminNav',
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push('/adminlogin');
      },
    },
  };
  </script>
  
  <style scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .spacer {
    flex: 1;
  }
  
  .nav-links a {
    margin-right: 20px;
    text-decoration: none;
    color: #333;
    font-size: 1rem;
  }
  
  .nav-links a:hover {
    color: #007BFF;
  }
  
  .logout-icon {
    cursor: pointer;
    font-size: 1.2rem;
    color: #333;
  }
  
  .logout-icon:hover {
    color: #007BFF;
  }
  </style>
  