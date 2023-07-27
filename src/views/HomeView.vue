<template>
  <div>
    <HeaderPart />

    <main class="main">
      <div class="container">
        

        <section class="section">
          <h2 class="section-title">Best of Guitars</h2>
          <SwiperComponent :options="swiperOptionsGuitars" ref="swiperGuitars">
            <SwiperSlide v-for="guitar in guitars" :key="guitar._id" class="swiper-slide">
              <!-- Guitar Slide Content -->
              <router-link :to="{ name: 'GuitarProduct', params: { id: guitar._id } }" class="product-link">
                <div class="guitar-image-container">
                  <img :src="guitar.image" alt="Guitar" class="guitar-image">
                </div>
                
                <h3>{{ guitar.name }}</h3>
                <p>{{ guitar.price }} $</p>
                
              </router-link>
            </SwiperSlide>
          </SwiperComponent>
        </section>

        <section class="section">
          <h2 class="section-title">Best of Accessories</h2>
          <SwiperComponent :options="swiperOptionsAccessories" ref="swiperAccessories">
            <SwiperSlide v-for="accessory in accessories" :key="accessory._id" class="swiper-slide">
              <!-- Accessory Slide Content -->
              <router-link :to="{ name: 'AccessoryProduct', params: { id: accessory._id } }" class="product-link">
                <div class="guitar-image-container">
                  <img :src="accessory.image" alt="Accessory" class="access-image">
                </div>
                
                <h3>{{ accessory.name }}</h3>
                <p>{{ accessory.price }} $</p>
              </router-link>
            </SwiperSlide>
          </SwiperComponent>
        </section>
      </div>
    </main>

    <FooterPart />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderPart from './elem/HeaderView.vue';
import FooterPart from './elem/FooterView.vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    HeaderPart,
    FooterPart,
    SwiperComponent: Swiper,
    SwiperSlide,
  },
  data() {
    return {
      guitars: [],
      accessories: [],
    };
  },
  methods: {
    fetchGuitars() {
      axios.get('http://localhost:3000/api/guitars')
        .then(response => {
          this.guitars = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchAccessories() {
      axios.get('http://localhost:3000/api/accessories')
        .then(response => {
          this.accessories = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    setupSwiper() {
      this.$nextTick(() => {
        this.$refs.swiperGuitars.swiper.params.autoplay = {
          delay: 2000,
          disableOnInteraction: false,
        };
        this.$refs.swiperGuitars.swiper.autoplay.start();

        this.$refs.swiperAccessories.swiper.params.autoplay = {
          delay: 2000,
          disableOnInteraction: false,
        };
        this.$refs.swiperAccessories.swiper.autoplay.start();
      });
    },
  },
  computed: {
    swiperOptionsGuitars() {
      return {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
    },
    swiperOptionsAccessories() {
      return {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
    },
  },
  mounted() {
    this.fetchGuitars();
    this.fetchAccessories();
    this.setupSwiper();
  },
};
</script>

<style src="../assets/css/home.css"></style>
