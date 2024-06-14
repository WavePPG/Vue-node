<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from './services/axios'

export default {
  data() {
    return {
      message: 'Loading...'
    }
  },
  created() {
    axios
      .get('/api/message')
      .then((response) => {
        this.message = response.data.message
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
