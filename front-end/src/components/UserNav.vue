<template>
    <nav>
      <div class="logo">DESIGN</div>
      <div class="spacer"></div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/product">Shop</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="spacer"></div>
      <router-link to="/login" class="login-icon">
        <i class="fas fa-user"></i>
      </router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'UserNav',
  };
  </script>
  
  <style scoped>
  body {
    background-color: #ffffff;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  nav {
    background-color: #f8f8f8;
    padding: 20px 40px; /* Increased padding */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slightly larger shadow */
    display: flex;
    align-items: center;
  }
  
  .logo {
    font-family: 'Times New Roman', Times, serif;
    font-size: 28px; /* Larger font size */
    font-weight: bold;
    margin-right: 30px;
  }
  
  .spacer {
    flex: 1;
  }
  
  .nav-links {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .nav-links a {
    color: #333;
    text-decoration: none;
    margin-right: 20px; /* Increased margin */
    font-size: 18px; /* Larger font size */
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
  }
  
  .nav-links a:hover {
    color: #007BFF;
    text-decoration: underline; /* Added underline on hover */
  }
  
  .nav-links a:last-child {
    margin-right: 0;
  }
  
  .login-icon {
    color: #333;
    text-decoration: none;
    font-size: 20px; /* Larger icon size */
  }
  
  .login-icon:hover {
    color: #007BFF;
  }
  
  #app {
    text-align: center;
    padding: 20px;
  }
  
  router-view {
    margin-top: 20px;
  }
  
  i {
    font-size: 24px; /* Larger icon size */
  }
  </style>
  