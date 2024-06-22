<template>
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <!-- Admin dashboard content here -->
      <form @submit.prevent="uploadProduct">
        <div>
          <label for="pro_name">Product Name:</label>
          <input type="text" v-model="product.pro_name" required />
        </div>
        <div>
          <label for="type_id">Product Type:</label>
          <select v-model="product.type_id" required>
            <option v-for="type in types" :key="type.type_id" :value="type.type_id">
              {{ type.type_name }}
            </option>
          </select>
        </div>
        <div>
          <label for="price">Price:</label>
          <input type="number" v-model="product.price" required />
        </div>
        <div>
          <label for="amount">Amount:</label>
          <input type="number" v-model="product.amount" required />
        </div>
        <div>
          <label for="pro_description">Description:</label>
          <textarea v-model="product.pro_description" required></textarea>
        </div>
        <div>
          <label for="image">Image:</label>
          <input type="file" @change="onFileChange" required />
        </div>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          pro_name: '',
          type_id: '',
          price: 0,
          amount: 0,
          pro_description: '',
          image: null
        },
        types: []
      };
    },
    methods: {
      fetchTypes() {
        fetch('http://localhost:3000/types')
          .then(response => response.json())
          .then(data => {
            this.types = data;
          });
      },
      onFileChange(event) {
        this.product.image = event.target.files[0];
      },
      uploadProduct() {
        const formData = new FormData();
        formData.append('pro_name', this.product.pro_name);
        formData.append('type_id', this.product.type_id);
        formData.append('price', this.product.price);
        formData.append('amount', this.product.amount);
        formData.append('pro_description', this.product.pro_description);
        formData.append('image', this.product.image);
  
        fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    },
    mounted() {
      this.fetchTypes();
    }
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  .admin-dashboard h1 {
    text-align: center;
  }
  
  .admin-dashboard form {
    display: flex;
    flex-direction: column;
  }
  
  .admin-dashboard form div {
    margin-bottom: 15px;
  }
  
  .admin-dashboard form label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .admin-dashboard form input,
  .admin-dashboard form select,
  .admin-dashboard form textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .admin-dashboard form button {
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .admin-dashboard form button:hover {
    background-color: #0056b3;
  }
  </style>
  