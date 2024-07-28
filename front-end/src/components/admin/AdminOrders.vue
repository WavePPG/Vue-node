<template>
    <div class="container mx-auto p-4">
        <div class="content-wrapper bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-4">All Orders</h2>
            <div v-if="orders.length === 0">
                <p>No orders found.</p>
            </div>
            <div v-else>
                <div v-for="order in orders" :key="order.transactionId" class="mb-4 border-b pb-4">
                    <h3 class="text-xl font-semibold mb-2">Order ID: {{ order.transactionId }}</h3>
                    <ul class="mb-4">
                        <li v-for="item in order.cartItems" :key="item.id" class="mb-2 flex items-center">
                            <img :src="`http://localhost:3001/uploads/${item.product.image}`" alt="Product Image" class="w-16 h-16 object-cover mr-4 rounded-lg shadow-md">
                            <div class="flex-1">
                                <div class="flex justify-between">
                                    <div>{{ item.product.pro_name }} (x{{ item.quantity }})</div>
                                    <div>{{ item.product.price }} Baht</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p class="text-xl font-semibold">Total Amount: {{ order.amount }} Baht</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminOrders',
    data() {
        return {
            orders: [],
        };
    },
    created() {
        this.fetchAllOrders();
    },
    methods: {
        fetchAllOrders() {
            fetch('http://localhost:3004/orderDetails')
                .then((response) => response.json())
                .then((data) => {
                    if (data.RespCode === 200) {
                        this.orders = data.Result;
                    } else {
                        console.error(data.RespMessage);
                    }
                })
                .catch((error) => console.error('Error fetching all orders:', error));
        },
    },
};
</script>

<style scoped>
.content-wrapper {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
