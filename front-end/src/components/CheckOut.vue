<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Check Out</h1>
    <div v-if="showQrCode">
      <div class="text-center">
        <img :src="qrCodeUrl" alt="QR Code for payment" class="w-64 h-64 mx-auto"/>
        <p class="text-lg font-bold text-gray-800 mt-4">Total: {{ totalPrice }} บาท</p>
        <p class="text-gray-600 mt-4">Scan the QR code to complete your payment.</p>
        <button @click="paymentComplete" class="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-700">จ่ายเงินแล้ว</button>
      </div>
    </div>
    <div v-else>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.productId" class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img :src="`http://localhost:3001/uploads/${item.image}`" alt="product image" class="w-20 h-20 rounded-lg shadow-md"/>
            <div class="ml-4">
              <h2 class="text-lg font-bold text-gray-800">{{ item.pro_name }}</h2>
              <p class="text-gray-600">Price: {{ item.price.toFixed(2) }} บาท</p>
              <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Select Shipping Address</h2>
          <div v-if="addresses.length > 0">
            <div v-for="address in addresses" :key="address.id" class="mb-4">
              <input type="radio" :value="address.id" v-model="selectedAddress" />
              <label>{{ address.address_line1 }}, {{ address.city }}, {{ address.state }}, {{ address.postal_code }}, {{ address.country }} ({{ address.phone_number }})</label>
              <button @click="editAddress(address)" class="bg-blue-500 text-white px-2 py-1 ml-2 rounded hover:bg-blue-700">Edit</button>
              <button @click="deleteAddress(address.id)" class="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Edit Address' : 'Add a New Address' }}</h2>
            <form @submit.prevent="saveAddress">
              <div class="mb-4">
                <label class="block text-gray-700">Address Line 1</label>
                <input v-model="newAddress.address_line1" class="w-full border-2 border-gray-300 p-2 rounded">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Address Line 2</label>
                <input v-model="newAddress.address_line2" class="w-full border-2 border-gray-300 p-2 rounded">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">City</label>
                <input v-model="newAddress.city" class="w-full border-2 border-gray-300 p-2 rounded">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">State</label>
                <input v-model="newAddress.state" class="w-full border-2 border-gray-300 p-2 rounded">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Postal Code</label>
                <input v-model="newAddress.postal_code" class="w-full border-2 border-gray-300 p-2 rounded">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Country</label>
                <input v-model="newAddress.country" class="w-full border-2 border-gray-300 p-2 rounded">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">Phone Number</label>
                <input v-model="newAddress.phone_number" class="w-full border-2 border-gray-300 p-2 rounded">
              </div>
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">{{ isEditing ? 'Update Address' : 'Save Address' }}</button>
              <button v-if="isEditing" @click="cancelEdit" class="bg-gray-500 text-white px-4 py-2 ml-2 rounded hover:bg-gray-700">Cancel</button>
            </form>
          </div>
        </div>
        <div class="flex justify-between items-center mt-6">
          <p class="text-lg font-bold text-gray-800">Total: {{ totalPrice }} บาท</p>
          <button @click="generateQR" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Pay Now</button>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-600">Your cart is empty.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CheckOut',
  data() {
    return {
      cartItems: [],
      userId: null,
      addresses: [],
      selectedAddress: null,
      newAddress: {
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone_number: ''
      },
      isEditing: false,
      editingAddressId: null,
      qrCodeUrl: null,
      showQrCode: false
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity, 10);
        return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
      }, 0).toFixed(2);
    }
  },
  async created() {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      if (isNaN(this.userId)) {
        console.error('Failed to parse userId from localStorage');
      } else {
        console.log('User ID:', this.userId);
        await this.fetchCartItems();
        await this.fetchAddresses();
      }
    } else {
      console.error('No userId found in localStorage');
    }
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await axios.get(`http://localhost:3003/cart/${this.userId}`);
        this.cartItems = response.data.items.map(item => ({
          ...item,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity, 10)
        }));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    async fetchAddresses() {
      try {
        const response = await axios.get(`http://localhost:3004/addresses/${this.userId}`);
        this.addresses = response.data.Result;
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    },
    async saveAddress() {
      try {
        if (this.isEditing) {
          await axios.post(`http://localhost:3004/updateAddress`, {
            id: this.editingAddressId,
            ...this.newAddress
          });
          this.isEditing = false;
          this.editingAddressId = null;
        } else {
          await axios.post('http://localhost:3004/saveAddress', {
            user_id: this.userId,
            ...this.newAddress
          });
        }
        console.log('Address saved/updated');
        await this.fetchAddresses();
        this.resetNewAddress();
      } catch (error) {
        console.error('Error saving/updating address:', error);
      }
    },
    async deleteAddress(addressId) {
      try {
        await axios.post(`http://localhost:3004/deleteAddress`, {
          id: addressId
        });
        console.log('Address deleted');
        await this.fetchAddresses();
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    },
    editAddress(address) {
      this.newAddress = { ...address };
      this.isEditing = true;
      this.editingAddressId = address.id;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingAddressId = null;
      this.resetNewAddress();
    },
    resetNewAddress() {
      this.newAddress = {
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone_number: ''
      };
    },
    async generateQR() {
      if (!this.selectedAddress) {
        alert('Please select or add an address.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3004/generateQR', {
          userId: this.userId, // ส่ง userId ไปยังเซิร์ฟเวอร์
          amount: this.totalPrice,
          cartItems: this.cartItems
        });
        this.qrCodeUrl = response.data.Result;
        this.showQrCode = true;
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    },
    paymentComplete() {
      this.$router.push({ name: 'HistoryUser' });
    }
  }
};
</script>

<style scoped>
/* No scoped styles needed as we're using Tailwind CSS */
</style>
