<template>
    <div class="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row items-start">
        <div class="w-full md:w-1/2 p-4">
          <h1 class="text-4xl font-bold mb-6">Our Story</h1>
          <p class="text-gray-600 mb-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, placeat blanditiis porro iusto accusamus quas soluta sint nisi velit voluptas modi temporibus esse earum doloremque voluptatem eaque quidem numquam. Doloribus!
          </p>
          <p class="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptatem alias non porro dignissimos hic laboriosam dolore molestiae. Pariatur, expedita!
          </p>
        </div>
        <div class="w-full md:w-1/2 p-4">
          <img src="https://patreeda.com/wp-content/uploads/2020/11/cover-nologo.jpg" alt="Our Story Image" class="w-full rounded-lg shadow-md" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <i class="fas fa-users text-4xl text-gray-800 mb-4"></i>
          <h2 class="text-2xl font-bold">10.5k</h2>
          <p class="text-gray-600">Sellers active our site</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <i class="fas fa-dollar-sign text-4xl text-red-500 mb-4"></i>
          <h2 class="text-2xl font-bold">33k</h2>
          <p class="text-gray-600">Monthly Product Sale</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <i class="fas fa-user-check text-4xl text-gray-800 mb-4"></i>
          <h2 class="text-2xl font-bold">45.5k</h2>
          <p class="text-gray-600">Customer active in our site</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <i class="fas fa-chart-line text-4xl text-gray-800 mb-4"></i>
          <h2 class="text-2xl font-bold">25k</h2>
          <p class="text-gray-600">Annual gross sale in our site</p>
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
    name: 'AboutUser',
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
  