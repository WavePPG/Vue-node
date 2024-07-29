<template>
    <div class="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Admin Orders</h1>
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.id" class="mb-6 border rounded p-4">
          <h2 class="text-lg font-bold text-gray-800">Order ID: {{ order.id }}</h2>
          <p class="text-gray-600">User: {{ order.username }} ({{ order.email }})</p>
          <p class="text-gray-600">Total: {{ order.amount }} บาท</p>
          <p class="text-gray-600">Date: {{ formatDate(order.date) }}</p>
          <p :class="statusClass(order.status)">Status: {{ order.status }}</p>
          <div>
            <label for="status" class="block text-gray-700">Change Status:</label>
            <select v-model="order.status" @change="updateStatus(order.id, order.status)" class="w-full border-2 border-gray-300 p-2 rounded">
              <option>กำลังจัดเตรียมสินค้า</option>
              <option>จัดส่งสินค้า</option>
              <option>ส่งสิ้นค้าสำเร็จ</option>
            </select>
          </div>
          <h3 class="text-md font-bold text-gray-800 mt-4">Items:</h3>
          <div v-for="item in order.items" :key="item.product_id" class="ml-4 mt-2">
            <p>{{ item.pro_name }} - {{ item.quantity }} x {{ item.price }} บาท</p>
          </div>
          <h3 class="text-md font-bold text-gray-800 mt-4">Shipping Address:</h3>
          <p class="text-gray-600">{{ order.address.address_line1 }}, {{ order.address.address_line2 }}, {{ order.address.city }}, {{ order.address.state }}, {{ order.address.postal_code }}, {{ order.address.country }}</p>
          <p class="text-gray-600">Phone: {{ order.address.phone_number }}</p>
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
        orders: []
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
        } catch (error) {
          console.error('Error updating order status:', error);
        }
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
  