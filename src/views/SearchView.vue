<template>
    <div>
      <HeaderPart />
      <main class="main">
        <div class="container">
          <section class="section">
            <h2 class="section-title">Guitars</h2>
            <div v-if="loadingGuitars">Loading...</div>
            <div v-else-if="guitars.length === 0">No matching guitars found.</div>
            <div v-else class="grid-container">
              <div v-for="guitar in guitars" :key="guitar._id" class="grid-item">
                <router-link :to="`/product/guitar/${guitar._id}`" class="product-link">
                  <div class="guitar-image-container">
                    <img :src="guitar.image" alt="Guitar" class="guitar-image">
                  </div>
                  <h3>{{ guitar.name }}</h3>
                  <p>{{ guitar.price }} $</p>
                </router-link>
              </div>
            </div>
          </section>
  
          <section class="section">
            <h2 class="section-title">Accessories</h2>
            <div v-if="loadingAccessories">Loading...</div>
            <div v-else-if="accessories.length === 0">No matching accessories found.</div>
            <div v-else class="grid-container">
              <div v-for="accessory in accessories" :key="accessory._id" class="grid-item">

                <router-link :to="`/product/accessory/${accessory._id}`" class="product-link">
                  <div class="accessory-image-container">
                    <img :src="accessory.image" alt="Accessory" class="accessory-image">
                  </div>
                  <h3>{{ accessory.name }}</h3>
                  <p>{{ accessory.price }} $</p>
                </router-link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterPart />
    </div>
  </template>
  
  <script>
  import HeaderPart from './elem/HeaderView.vue';
  import FooterPart from './elem/FooterView.vue';
  import axios from 'axios';
  
  export default {
    components: {
      HeaderPart,
      FooterPart,
    },
    data() {
      return {
        guitars: [],
        accessories: [],
        loadingGuitars: true,
        loadingAccessories: true,
      };
    },
    mounted() {
      const searchQuery = this.$route.params.query;
      this.fetchGuitars(searchQuery);
      this.fetchAccessories(searchQuery);
    },
    methods: {
      fetchGuitars(searchQuery) {
        axios
          .get(`http://localhost:3000/api/guitars?search=${encodeURIComponent(searchQuery)}`)
          .then((response) => {
            this.guitars = response.data;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.loadingGuitars = false;
          });
      },
      fetchAccessories(searchQuery) {
        axios
          .get(`http://localhost:3000/api/accessories?search=${encodeURIComponent(searchQuery)}`)
          .then((response) => {
            this.accessories = response.data;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.loadingAccessories = false;
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
    justify-items: center;
    align-items: start;
  }
  
  .grid-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  .guitar-image-container,
  .accessory-image-container {
    margin-bottom: 10px;
  }
  
  .guitar-image,
  .accessory-image {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
  }
  
  .product-link {
    text-decoration: none;
    color: #333;
  }
  
  .section-title {
    margin-bottom: 10px;
  }

  </style>
  