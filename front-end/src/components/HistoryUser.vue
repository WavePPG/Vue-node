<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Purchase History</h1>
    <div v-if="transactions.length > 0">
      <div v-for="transaction in transactions" :key="transaction.id" class="mb-4">
        <div class="border rounded p-4">
          <h2 class="text-lg font-bold text-gray-800">Transaction ID: {{ transaction.id }}</h2>
          <p class="text-gray-600">Total: {{ transaction.amount }} บาท</p>
          <p class="text-gray-600">Date: {{ formatDate(transaction.date) }}</p>
          <p :class="statusClass(transaction.status)">Status: {{ transaction.status }}</p>
          <button @click="toggleDetails(transaction.id)" class="bg-blue-500 text-white px-2 py-1 mt-2 rounded hover:bg-blue-700">
            {{ transaction.showDetails ? 'Hide Details' : 'Show Details' }}
          </button>
          <div v-show="transaction.showDetails" class="mt-4">
            <h3 class="text-md font-bold text-gray-800">Items:</h3>
            <div v-for="item in transaction.items" :key="item.id" class="mt-2">
              <p>{{ item.pro_name }} - {{ item.quantity }} x {{ item.price }} บาท</p>
            </div>
            <h3 class="text-md font-bold text-gray-800 mt-4">Shipping Address:</h3>
            <p v-if="transaction.address" class="text-gray-600">
              {{ transaction.address.address_line1 }}, {{ transaction.address.address_line2 }}, 
              {{ transaction.address.city }}, {{ transaction.address.state }}, 
              {{ transaction.address.postal_code }}, {{ transaction.address.country }}
            </p>
            <p v-if="transaction.address" class="text-gray-600">Phone: {{ transaction.address.phone_number }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">No transactions found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HistoryUser',
  data() {
    return {
      transactions: []
    };
  },
  async created() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      await this.fetchTransactions(userId);
    }
  },
  methods: {
    async fetchTransactions(userId) {
      try {
        const response = await axios.get(`http://localhost:3004/transactions/${userId}`);
        this.transactions = response.data.Result.map(transaction => ({
          ...transaction,
          showDetails: false
        }));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    },
    formatDate(dateString) {
      const months = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear() + 543; // พ.ศ. บวก 543 ปี
      return `${day} ${month} ${year}`;
    },
    toggleDetails(transactionId) {
      const transaction = this.transactions.find(t => t.id === transactionId);
      transaction.showDetails = !transaction.showDetails;
    },
    statusClass(status) {
      switch (status) {
        case 'กำลังจัดเตรียมสินค้า':
          return 'text-yellow-600';
        case 'จัดส่งสินค้า':
          return 'text-blue-600';
        case 'ส่งสิ้นค้าสำเร็จ':
          return 'text-green-600';
        default:
          return 'text-gray-600';
      }
    }
  }
};
</script>

<style scoped>
/* No scoped styles needed as we're using Tailwind CSS */
</style>
