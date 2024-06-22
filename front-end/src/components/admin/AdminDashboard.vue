<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6">Product Dashboard</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="'http://localhost:3001/uploads/' + product.image" alt="Product Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ product.pro_name }}</h3>
          <p class="text-gray-600">Type: {{ product.type_id }}</p>
          <p class="text-gray-600">Price: {{ product.price }}</p>
          <p class="text-gray-600">Amount: {{ product.amount }}</p>
          <p class="text-gray-600 mb-4">{{ product.pro_description }}</p>
          <button @click="editProduct(product)" class="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
          <button @click="showDeleteModal(product.id)" class="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <transition name="modal">
      <div v-if="editingProduct" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <transition name="expand">
          <div class="bg-white p-8 rounded-lg shadow-lg w-1/2" v-if="editingProduct">
            <h3 class="text-xl font-bold mb-4">Edit Product</h3>
            <form @submit.prevent="updateProduct">
              <div class="mb-4">
                <label class="block text-gray-700">Name:</label>
                <input type="text" v-model="editingProduct.pro_name" class="w-full border rounded px-3 py-2">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Type:</label>
                <select v-model="editingProduct.type_id" class="w-full border rounded px-3 py-2">
                  <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Price:</label>
                <input type="text" v-model="editingProduct.price" class="w-full border rounded px-3 py-2">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Amount:</label>
                <input type="text" v-model="editingProduct.amount" class="w-full border rounded px-3 py-2">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Description:</label>
                <textarea v-model="editingProduct.pro_description" class="w-full border rounded px-3 py-2"></textarea>
              </div>
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
              <button @click="cancelEdit" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
            </form>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="modal">
      <div v-if="showingDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded-lg shadow-lg w-1/3">
          <h3 class="text-xl font-bold mb-4">Confirm Deletion</h3>
          <p class="mb-4">Are you sure you want to delete this product?</p>
          <div class="flex justify-end">
            <button @click="confirmDelete" class="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
            <button @click="cancelDelete" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      types: [],
      editingProduct: null,
      showingDeleteModal: false,
      productToDelete: null
    };
  },
  created() {
    this.fetchProducts();
    this.fetchTypes();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:3001/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    fetchTypes() {
      axios.get('http://localhost:3001/types')
        .then(response => {
          this.types = response.data;
        })
        .catch(error => {
          console.error('Error fetching types:', error);
        });
    },
    editProduct(product) {
      this.editingProduct = { ...product };
    },
    updateProduct() {
      axios.put(`http://localhost:3001/products/${this.editingProduct.id}`, this.editingProduct)
        .then(() => {
          this.fetchProducts();
          this.editingProduct = null;
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    },
    showDeleteModal(productId) {
      this.productToDelete = productId;
      this.showingDeleteModal = true;
    },
    confirmDelete() {
      axios.delete(`http://localhost:3001/products/${this.productToDelete}`)
        .then(() => {
          this.fetchProducts();
          this.showingDeleteModal = false;
          this.productToDelete = null;
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    },
    cancelDelete() {
      this.showingDeleteModal = false;
      this.productToDelete = null;
    },
    cancelEdit() {
      this.editingProduct = null;
    }
  }
};
</script>

<style scoped>
@import 'tailwindcss/tailwind.css';

/* Animation for modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.modal-enter, .modal-leave-to /* .modal-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.9);
}

/* Animation for expanding form */
.expand-enter-active, .expand-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.expand-enter, .expand-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
