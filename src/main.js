import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

// Import the required styles for swiper
import 'swiper/swiper-bundle.css';

const app = createApp(App);
app.component('SwiperComponent', Swiper);
app.component('SwiperSlide', SwiperSlide);

app.use(router).mount('#app');
