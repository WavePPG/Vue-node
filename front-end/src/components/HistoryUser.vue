<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Purchase History</h1>
    <div v-if="transactions.length > 0">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.amount }} บาท</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(transaction.date) }}</td>
            <td :class="['px-6 py-4 whitespace-nowrap text-sm', statusClass(transaction.status)]">{{ transaction.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openDetails(transaction)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Show Details</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedTransaction" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <div class="mt-3 sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">Transaction Details</h3>
                <div class="mt-4">
                  <h3 class="text-md font-bold text-gray-800">Items:</h3>
                  <div v-for="item in selectedTransaction.items" :key="item.id" class="mt-4 flex items-center border-b pb-4 mb-4">
                    <img :src="getImageUrl(item.image)" alt="Product Image" class="w-20 h-20 object-cover rounded mr-4">
                    <div>
                      <p class="font-semibold">{{ item.pro_name }}</p>
                      <p>{{ item.quantity }} x {{ item.price }} บาท</p>
                    </div>
                  </div>
                  <h3 class="text-md font-bold text-gray-800 mt-4">Shipping Address:</h3>
                  <p v-if="selectedTransaction.address" class="text-gray-600 mt-2">
                    {{ selectedTransaction.address.address_line1 }}, {{ selectedTransaction.address.address_line2 }},
                    {{ selectedTransaction.address.city }}, {{ selectedTransaction.address.state }},
                    {{ selectedTransaction.address.postal_code }}, {{ selectedTransaction.address.country }}
                  </p>
                  <p v-if="selectedTransaction.address" class="text-gray-600">Phone: {{ selectedTransaction.address.phone_number }}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6 text-center">
              <button @click="selectedTransaction = null" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                Close
              </button>
            </div>
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
      transactions: [],
      selectedTransaction: null
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
        this.transactions = response.data.Result;
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
    openDetails(transaction) {
      this.selectedTransaction = transaction;
    },
    getImageUrl(imageName) {
      return `http://localhost:3004/uploads/${imageName}`; // Adjust the URL to match your backend setup
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
