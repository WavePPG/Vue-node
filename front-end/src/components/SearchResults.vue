<template>
    <div class="max-w-screen-xl mx-auto p-5">
      <h1 class="text-3xl font-bold mb-5">Search Results for "{{ $route.query.q }}"</h1>
      <div v-if="results.length === 0">No results found.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="result in results" :key="result.id" class="border p-3 rounded-lg">
          <router-link :to="{ name: 'UserProductDetail', params: { id: result.id } }">
            <img :src="`http://localhost:3005/uploads/${result.image}`" alt="" class="w-full h-48 object-cover mb-4"/>
            <h2 class="text-xl font-semibold">{{ result.pro_name }}</h2>
            <p class="text-gray-700">Price: {{ result.price }}</p>
            <p class="text-gray-700">{{ result.pro_description }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SearchResults',
    data() {
      return {
        results: [],
        allResults: [],
      };
    },
    created() {
      this.fetchResults();
    },
    watch: {
      '$route.query.q'() {
        this.fetchResults();
      },
    },
    methods: {
      async fetchResults() {
        const query = this.$route.query.q.toLowerCase();
  
        // ดึงข้อมูลจาก API
        try {
          const response = await axios.get('http://localhost:3005/api/products');
          this.allResults = response.data;
  
          // กรองข้อมูลตามคำค้นหา
          this.results = this.allResults.filter(item =>
            item.pro_name.toLowerCase().includes(query) ||
            item.pro_description.toLowerCase().includes(query)
          );
        } catch (error) {
          console.error('Error fetching data:', error);
          this.results = [];
        }
      },
    },
  };
  </script>
  