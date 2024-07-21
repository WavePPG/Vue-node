<template>
  <div class="container mx-auto py-8 pl-20"> <!-- Updated padding -->
    <h2 class="text-2xl font-bold mb-6">Upload Product</h2>
    <form @submit.prevent="uploadProduct" class="bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="pro_name" class="block text-sm font-medium text-gray-700">Product Name:</label>
        <input 
          type="text" 
          id="pro_name" 
          v-model="product.pro_name" 
          required 
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
      </div>
      <div class="mb-4">
        <label for="type_id" class="block text-sm font-medium text-gray-700">Product Type:</label>
        <select 
          id="type_id" 
          v-model="product.type_id" 
          required 
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700">Price:</label>
        <input 
          type="number" 
          id="price" 
          v-model="product.price" 
          required 
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount:</label>
        <input 
          type="number" 
          id="amount" 
          v-model="product.amount" 
          required 
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
      </div>
      <div class="mb-4">
        <label for="pro_description" class="block text-sm font-medium text-gray-700">Description:</label>
        <textarea 
          id="pro_description" 
          v-model="product.pro_description" 
          required 
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">Image:</label>
        <input 
          type="file" 
          id="image" 
          @change="handleFileUpload" 
          required 
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        >
      </div>
      <button 
        type="submit" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Upload
      </button>
    </form>
    
    <transition name="modal-fade">
      <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal-fade-enter-active">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg v-if="modalType === 'success'" class="h-6 w-6 text-green-600 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="h-6 w-6 text-red-600 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 animate-pulse" id="modal-title">
                    {{ modalTitle }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 animate-pulse">
                      {{ modalMessage }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button @click="closeModal" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                Close
              </button>
            </div>
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
      types: [],
      product: {
        pro_name: '',
        type_id: '',
        price: '',
        amount: '',
        pro_description: '',
      },
      image: null,
      showModal: false,
      modalType: 'success',
      modalTitle: '',
      modalMessage: '',
    };
  },
  created() {
    this.fetchTypes();
  },
  methods: {
    fetchTypes() {
      axios.get('http://localhost:3001/types')
        .then(response => {
          this.types = response.data;
        })
        .catch(error => {
          console.error('Error fetching types:', error);
        });
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    uploadProduct() {
      const formData = new FormData();
      formData.append('pro_name', this.product.pro_name);
      formData.append('type_id', this.product.type_id);
      formData.append('price', this.product.price);
      formData.append('amount', this.product.amount);
      formData.append('pro_description', this.product.pro_description);
      formData.append('image', this.image);

      axios.post('http://localhost:3001/upload', formData)
        .then(response => {
          // Check if the response indicates success
          if (response.data.success) {
            this.modalType = 'success';
            this.modalTitle = 'Upload Successful';
            this.modalMessage = response.data.message;
          } else {
            this.modalType = 'error';
            this.modalTitle = 'Upload Failed';
            this.modalMessage = 'There was an error uploading your product. Please try again.';
          }
          this.showModal = true;
          this.resetForm();
        })
    },
    resetForm() {
      this.product = {
        pro_name: '',
        type_id: '',
        price: '',
        amount: '',
        pro_description: '',
      };
      this.image = null;
      this.$refs.image.value = '';
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
@import 'tailwindcss/tailwind.css';

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.95);
}
.modal-fade-enter-active {
  animation: modal-expand 0.5s ease-out forwards;
}

@keyframes modal-expand {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
