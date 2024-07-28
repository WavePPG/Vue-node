<template>
    <div class="container mx-auto p-4">
      <div class="content-wrapper bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
        <div v-if="!qrCodeGenerated">
          <div class="mb-4">
            <ul class="mb-4">
              <li v-for="item in cartItems" :key="item.id" class="mb-2 flex items-center">
                <img :src="`http://localhost:3001/uploads/${item.product.image}`" alt="Product Image" class="w-16 h-16 object-cover mr-4 rounded-lg shadow-md">
                <div class="flex-1">
                  <div class="flex justify-between">
                    <div>{{ item.product.pro_name }} (x{{ item.quantity }})</div>
                    <div>{{ item.product.price }} Baht</div>
                  </div>
                </div>
              </li>
            </ul>
            <p class="text-xl font-semibold">Total Amount: {{ totalAmount }} Baht</p>
          </div>
          <button
            @click="generateQRCode"
            class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Pay Now
          </button>
        </div>
        <div v-else>
          <img
            class="AP w-24 mb-4"
            src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png"
            alt="Thai QR Payment Logo"
          />
          <h2 class="text-2xl font-bold mb-4">Thai QR Payment</h2>
          <div class="text-center text-xl font-semibold mb-4">
            Total Amount: {{ totalAmount }} Baht
          </div>
          <div class="qr-container mt-6 p-4 border rounded-lg shadow-sm">
            <img :src="qrCodeUrl" class="w-64 h-64 mx-auto" />
          </div>
          <div id="paymentStatus" class="footer mt-4 text-center text-gray-600">{{ paymentStatus }}</div>
          <button
            @click="confirmPayment"
            class="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300 mt-4"
          >
            I have made the payment
          </button>
          <button
            @click="goToHistory"
            class="w-full bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition duration-300 mt-4"
          >
            Go to History
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    name: 'CheckOut',
    data() {
      return {
        qrCodeUrl: '',
        paymentStatus: '',
        transactionId: null,
        checkPaymentInterval: null,
        totalAmount: 0,
        qrCodeGenerated: false,
        cartItems: [],
      };
    },
    created() {
      this.fetchCartItems();
    },
    methods: {
      fetchCartItems() {
        const totalAmount = this.$route.query.total; // Get total amount from route query
        if (totalAmount) {
          this.totalAmount = totalAmount;
        }
  
        fetch('http://localhost:3003/cart', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.cartItems = data.filter(item => item.product.pro_name !== 'Test Product');
          })
          .catch((error) => console.error('Error fetching cart items:', error));
      },
      generateQRCode() {
        fetch("http://localhost:3004/generateQR", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(this.totalAmount),
            cartItems: this.cartItems,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.qrCodeUrl = data.Result;
            this.transactionId = data.TransactionId;
            this.qrCodeGenerated = true;
            this.startCheckingPayment();
          })
          .catch((error) => console.error("Error:", error));
      },
      startCheckingPayment() {
        if (this.checkPaymentInterval) {
          clearInterval(this.checkPaymentInterval);
        }
        this.checkPaymentInterval = setInterval(this.checkPayment, 5000);
      },
      checkPayment() {
        fetch("http://localhost:3004/checkPaymentStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionId: this.transactionId,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.Result.status === "success") {
              this.paymentStatus = "Payment successful";
              clearInterval(this.checkPaymentInterval);
              this.notifyBackendPaymentSuccess();
              this.showThankYouPopup();
            } else {
              this.paymentStatus = "Payment pending";
            }
          })
          .catch((error) => console.error("Error:", error));
      },
      confirmPayment() {
        clearInterval(this.checkPaymentInterval);
        this.notifyBackendPaymentSuccess();
        this.showThankYouPopup();
      },
      notifyBackendPaymentSuccess() {
        fetch("http://localhost:3004/updateTransactionStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionId: this.transactionId,
            status: 'success',
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Backend notified of payment success:', data);
          })
          .catch((error) => console.error("Error:", error));
      },
      showThankYouPopup() {
        Swal.fire({
          title: 'Thank you!',
          text: 'Thank you for your payment.',
          icon: 'success',
          confirmButtonText: 'OK',
          willClose: () => {
            this.$router.push({
              name: 'HistoryUser',
              params: {
                transactionId: this.transactionId,
              }
            });
          }
        });
      },
      goToHistory() {
        this.$router.push({
          name: 'HistoryUser',
          params: {
            transactionId: this.transactionId,
          }
        });
      }
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
  
  .qr-container {
    text-align: center;
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .qr-container img {
    width: 300px;
    height: 300px;
    object-fit: contain;
  }
  
  .footer {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
  </style>
  