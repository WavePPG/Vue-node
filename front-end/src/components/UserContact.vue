<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row items-start">
        <div class="w-full md:w-1/2 p-4">
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex items-center mb-4">
              <i class="fas fa-phone-alt text-red-500 text-2xl mr-3"></i>
              <h2 class="text-xl font-bold">Call To Us</h2>
            </div>
            <p class="text-gray-600">We are available 24/7, 7 days a week.</p>
            <p class="text-gray-600">Phone: +886011112222</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <i class="fas fa-envelope text-red-500 text-2xl mr-3"></i>
              <h2 class="text-xl font-bold">Write To Us</h2>
            </div>
            <p class="text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
            <p class="text-gray-600">Email: customer@exclusive.com</p>
            <p class="text-gray-600">Email: support@exclusive.com</p>
          </div>
        </div>
        <div class="w-full md:w-1/2 p-4">
          <form @submit.prevent="sendMessage" class="bg-white rounded-lg shadow p-6 max-w-full">
            <h2 class="text-xl font-bold mb-4">Send a Message</h2>
            <div class="mb-4">
              <input type="text" v-model="name" placeholder="Your Name *" class="w-full p-3 border rounded" required>
            </div>
            <div class="mb-4">
              <input type="email" v-model="email" placeholder="Your Email *" class="w-full p-3 border rounded" required>
            </div>
            <div class="mb-4">
              <input type="tel" v-model="phone" placeholder="Your Phone *" class="w-full p-3 border rounded" required>
            </div>
            <div class="mb-4">
              <textarea v-model="message" placeholder="Your Message" class="w-full p-3 border rounded h-32" required></textarea>
            </div>
            <button type="submit" class="w-full bg-red-500 text-white px-4 py-2 rounded">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <footer class="bg-white text-gray-800 py-8 shadow-footer mt-8">
      <div class="container mx-auto flex flex-wrap justify-between items-start">
        <!-- Company Info -->
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h2 class="text-2xl font-bold">Comforty</h2>
          <p class="mt-2 text-gray-600">Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum. Cras egestas purus.</p>
          <div class="flex mt-4 space-x-4">
            <a href="#" class="text-gray-600"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-pinterest"></i></a>
            <a href="#" class="text-gray-600"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <!-- Category Links -->
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 class="text-xl font-semibold">Category</h3>
          <ul class="mt-2 space-y-2">
            <li><a href="#" class="hover:underline">Sofa</a></li>
            <li><a href="#" class="hover:underline">Armchair</a></li>
            <li><a href="#" class="hover:underline">Wing Chair</a></li>
            <li><a href="#" class="hover:underline">Desk Chair</a></li>
            <li><a href="#" class="hover:underline">Wooden Chair</a></li>
            <li><a href="#" class="hover:underline">Park Bench</a></li>
          </ul>
        </div>
        <!-- Support Links -->
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 class="text-xl font-semibold">Support</h3>
          <ul class="mt-2 space-y-2">
            <li><a href="#" class="hover:underline">Help & Support</a></li>
            <li><a href="#" class="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" class="hover:underline">Privacy Policy</a></li>
            <li><a href="#" class="hover:underline">Help</a></li>
          </ul>
        </div>
        <!-- Newsletter -->
        <div class="w-full md:w-1/4">
          <h3 class="text-xl font-semibold">Newsletter</h3>
          <form class="mt-2">
            <input type="email" class="p-2 rounded w-full mb-2 border border-gray-300" placeholder="Your email">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Subscribe</button>
          </form>
          <p class="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.</p>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'UserContact',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  },
  methods: {
    sendMessage() {
      // Here you can add the logic to send the message
      console.log('Message sent', this.name, this.email, this.phone, this.message);
      // Reset form
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.shadow-divider {
  height: 10px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0));
}
.shadow-footer {
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2); /* Adjust the shadow values as needed */
}
</style>
