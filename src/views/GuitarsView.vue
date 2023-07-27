<template>
    <div>
      <HeaderPart />
      <main class="main">
        <div class="product">
          <div class="grid">
            <!-- Use router-links instead of anchor tags -->
            <router-link
              v-for="guitar in guitars"
              :key="guitar._id"
              :to="`/product/guitar/${guitar._id}`"
              class="guitar-item"
            >
              <img :src="guitar.image" alt="Guitar" class="guitar-image">
              <h3>{{ guitar.name }}</h3>
              <p>{{ guitar.price }} $</p>
            </router-link>
          </div>
        </div>
      </main>
      <FooterPart />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderPart from './elem/HeaderView.vue';
  import FooterPart from './elem/FooterView.vue';
  
  export default {
    components: {
      HeaderPart,
      FooterPart,
    },
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
        axios
          .get('http://localhost:3000/api/guitars')
          .then((response) => {
            this.guitars = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  
  <style>
  /* Your existing styles... */
  
  /* Override default link styles */
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Adjust the grid layout and items */
  .product {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    max-width: 800px; /* Set a max width for the grid */
    margin: 0 auto; /* Center the grid horizontally */
  }
  
  .guitar-item {
    padding: 1rem;
    text-align: center;
    text-decoration: none;
    color: inherit;
  }
  
  .guitar-image {
    width: 250px; /* Adjust the size of the guitar image */
    height: auto;
  }
  </style>
  