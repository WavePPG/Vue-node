<template>
  <div class="product">
    <h2>Product Page</h2>
    <p>Welcome to the product page.</p>
    <!-- Add your product-related content here -->
    <button @click="logout" class="btn-logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'UserProduct',
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push({ name: 'UserLogin' }); // Redirect to login page
    }
  }
};
</script>

<style scoped>
.product {
  max-width: 800px;
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

p {
  text-align: center;
  color: #555;
}

.btn-logout {
  display: block;
  width: 100px;
  margin: 20px auto 0;
  padding: 10px;
  background-color: #FF5733;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #FF4500;
}
</style>
