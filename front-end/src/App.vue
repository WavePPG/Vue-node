<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav a {
  color: #333;
  text-decoration: none;
  margin-right: 15px;
  font-weight: bold;
}

nav a:hover {
  color: #007BFF;
}

#app {
  text-align: center;
  padding: 20px;
}

router-view {
  margin-top: 20px;
}
</style>
