<template>
  <div class="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Admin Orders</h1>
    <div v-if="orders.length > 0">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ order.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.username }} ({{ order.email }})</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.amount }} บาท</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(order.date) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <select :class="['w-full', statusClass(order.status)]" @change="updateStatus(order.id, $event.target.value)" v-model="order.status">
                <option value="กำลังจัดเตรียมสินค้า">กำลังจัดเตรียมสินค้า</option>
                <option value="จัดส่งสินค้า">จัดส่งสินค้า</option>
                <option value="ส่งสิ้นค้าสำเร็จ">ส่งสิ้นค้าสำเร็จ</option>
              </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openDetails(order)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Details</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedOrder" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <div class="mt-3 sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">Order Details</h3>
                <div class="mt-4">
                  <h3 class="text-md font-bold text-gray-800">Items:</h3>
                  <div v-for="item in selectedOrder.items" :key="item.product_id" class="mt-4 flex items-center border-b pb-4 mb-4">
                    <img :src="getImageUrl(item.image)" alt="Product Image" class="w-20 h-20 object-cover rounded mr-4">
                    <div>
                      <p class="font-semibold">{{ item.pro_name }}</p>
                      <p>{{ item.quantity }} x {{ item.price }} บาท</p>
                    </div>
                  </div>
                  <h3 class="text-md font-bold text-gray-800 mt-4">Shipping Address:</h3>
                  <p v-if="selectedOrder.address" class="text-gray-600 mt-2">
                    {{ selectedOrder.address.address_line1 }}, {{ selectedOrder.address.address_line2 }},
                    {{ selectedOrder.address.city }}, {{ selectedOrder.address.state }},
                    {{ selectedOrder.address.postal_code }}, {{ selectedOrder.address.country }}
                  </p>
                  <p v-if="selectedOrder.address" class="text-gray-600">Phone: {{ selectedOrder.address.phone_number }}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6 text-center">
              <button @click="selectedOrder = null" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">No orders found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminOrders',
  data() {
    return {
      orders: [],
      selectedOrder: null
    };
  },
  async created() {
    await this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('http://localhost:3004/admin/orders');
        this.orders = response.data.Result;
      } catch (error) {
        console.error('Error fetching orders:', error);
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
    async updateStatus(orderId, status) {
      try {
        await axios.post('http://localhost:3004/admin/orders/updateStatus', {
          orderId,
          status
        });
        console.log('Order status updated');
        await this.fetchOrders(); // Refresh orders after status update
      } catch (error) {
        console.error('Error updating order status:', error);
      }
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
    },
    openDetails(order) {
      this.selectedOrder = order;
    }
  }
};
</script>

<style scoped>
/* No scoped styles needed as we're using Tailwind CSS */
</style>
