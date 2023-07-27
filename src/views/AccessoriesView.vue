<template>
    <div class="product">
      <h1>This is a Product page</h1>
      <div class="grid">
        <div v-for="guitar in guitars" :key="guitar._id" class="guitar-item">
          <img :src="guitar.image" alt="Guitar" class="guitar-image">
          <h3>{{ guitar.name }}</h3>
          <p>{{ guitar.price }} $</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        guitars: [],
      };
    },
    mounted() {
      // Fetch guitars when the component is mounted
      this.fetchGuitars();
    },
    methods: {
      fetchGuitars() {
        // Make a GET request to your API to retrieve all guitars
        axios.get('http://your-api-url/api/guitars')
          .then(response => {
            this.guitars = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  
  <style>
  @media (min-width: 1024px) {
    .product {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
  
    .guitar-item {
      border: 1px solid #ccc;
      padding: 1rem;
      text-align: center;
    }
  
    .guitar-image {
      width: 100px; /* Adjust the size of the guitar image */
      height: auto;
    }
  }
  </style>
  